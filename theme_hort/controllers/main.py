# -*- coding: utf-8 -*-
###############################################################################
#                                                                             #
# Copyright (C) 2016 Trustcode - www.trustcode.com.br                         #
#              Danimar Ribeiro <danimaribeiro@gmail.com>                      #
#                                                                             #
# This program is free software: you can redistribute it and/or modify        #
# it under the terms of the GNU Affero General Public License as published by #
# the Free Software Foundation, either version 3 of the License, or           #
# (at your option) any later version.                                         #
#                                                                             #
# This program is distributed in the hope that it will be useful,             #
# but WITHOUT ANY WARRANTY; without even the implied warranty of              #
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the               #
# GNU General Public License for more details.                                #
#                                                                             #
# You should have received a copy of the GNU General Public License           #
# along with this program.  If not, see <http://www.gnu.org/licenses/>.       #
#                                                                             #
###############################################################################


import re
from datetime import datetime
from openerp.addons.web import http
from openerp.addons.web.http import request
from openerp.tools import DEFAULT_SERVER_DATE_FORMAT
from openerp.addons.website.models.website import slug


class BlogController(http.Controller):

    @http.route('/blog/list', type='http', auth="public", website=True)
    def blog_list(self, **params):
        filtro = 'temas'
        if 'filtro' in params:
            filtro = params['filtro']
        if filtro == 'temas':
            blogs = request.env['blog.blog'].sudo().search([])
            return request.website.render("theme_hort.blog_list", {
                'blogs': blogs,
                'filtro': 'temas',
            })
        else:
            last_posts = request.env['blog.post'].sudo().search(
                [], limit=20, order='id desc')
            return request.website.render("theme_hort.blog_list", {
                'last_posts': last_posts,
                'filtro': 'postagens',
            })


class UserProfile(http.Controller):

    @http.route('/zip/search', type='json', auth="user", cors="*")
    def zip_search(self, **post):
        if len(post['zip']) >= 8:
            cep = re.sub('[^0-9]', '', post['zip'])
            cep = cep[:5] + '-' + cep[5:]
            zip_ids = request.env['l10n_br.zip'].sudo().zip_search_multi(
                zip_code=cep)

            if len(zip_ids) == 1:
                return {'sucesso': True,
                        'street': zip_ids[0].street,
                        'district': zip_ids[0].district,
                        'city': zip_ids[0].l10n_br_city_id.name,
                        'city_id': zip_ids[0].l10n_br_city_id.id,
                        'state': zip_ids[0].state_id.name,
                        'country': zip_ids[0].country_id.name}

        return {'sucesso': False}

    @http.route('/user/update', type='json', auth="user", cors="*")
    def user_update(self, **post):
        user = request.env.user.sudo()
        user.name = post['name']
        birthday = None
        if post['birthday']:
            birthday = datetime.strptime(post['birthday'], '%d/%m/%Y')
        vals = {
            'zip': post['zip'],
            'street': post['address'],
            'street2': post['number'],
            'gender': '1' if post['gender'] == '1' else '0',
            'function': post['occupation'],
            'date_birth': birthday or datetime.now(),
            'supplier': post['supplier'],
            'customer': post['customer'],
        }
        if post['city_id']:
            city = request.env['l10n_br_base.city'].sudo().browse(
                post['city_id'])
            if city:
                vals.update({
                    'state_id': city.state_id.id,
                    'l10n_br_city_id': city.id,
                    'country_id': city.state_id.country_id.id,
                })
        if 'data:image' in post['image']:
            vals['image'] = post['image'].replace('data:image/png;base64,', '')
            vals['image'] = vals['image'].replace('data:image/jpg;base64', '')
        user.partner_id.write(vals)
        user.partner_id.write({
            'produce_ids': [[6, False, [int(x) for x in post['produce_ids']]]],
            'interest_in_ids': [[6, False, [int(x) for x in
                                            post['interest_in_ids']]]],
            'post_category_ids': [[6, False, [int(x) for x in
                                              post['post_category_ids']]]],
        })

        return ""

    @http.route('/password/update', type='json', auth="user", cors="*")
    def user_password_update(self, **post):
        user = request.env.user.sudo()
        user.password = post['new_password']
        return ""

    @http.route('/user/profile', type='json', auth="user", cors="*")
    def user_profile(self):
        user = request.env.user.sudo()
        birthday = ''
        if user.partner_id.date_birth:
            birthday = datetime.strptime(user.partner_id.date_birth,
                                         DEFAULT_SERVER_DATE_FORMAT)
            birthday = birthday.strftime('%d-%m-%Y')

        products = []
        product_ids = request.env['product.product'].sudo().search([])
        for product in product_ids:
            products.append({
                'id': product.id, 'name': product.name,
                'image': "/website/image/product.product/%s/image_medium" %
                product.id
            })
        produces = []
        produce_images = []
        for produce in user.partner_id.produce_ids:
            produces.append(produce.id)
            produce_images.append({
                'id': produce.id, 'name': produce.name,
                'image': "/website/image/product.product/%s/image_medium" %
                produce.id
            })

        interests = []
        interest_image = []
        for interest in user.partner_id.interest_in_ids:
            interests.append(interest.id)
            interest_image.append({
                'id': interest.id, 'name': interest.name,
                'image': "/website/image/product.product/%s/image_medium" %
                interest.id
            })

        categories = []
        category_ids = request.env['blog.post.category'].sudo().search([])
        for categ in category_ids:
            categories.append({'id': categ.id, 'name': categ.name})

        category_interest = []
        for cat in user.partner_id.post_category_ids:
            category_interest.append(cat.id)

        user_question_ids = request.env['forum.post'].search([
            ('parent_id', '=', False),
            ('create_uid', '=', user.id),
        ], order='create_date desc', limit=20)
        user_answer_ids = request.env['forum.post'].search([
            ('parent_id', '!=', False),
            ('create_uid', '=', user.id),
        ], order='create_date desc', limit=20)

        model, comment = request.env[
            'ir.model.data'].get_object_reference('mail', 'mt_comment')
        activities = []
        activity_ids = request.env['mail.message'].search(
            [('res_id', 'in', user_question_ids.ids + user_answer_ids.ids),
             ('model', '=', 'forum.post'),
             ('subtype_id', '!=', comment)], order='date DESC', limit=100)
        for act in activity_ids:
            post = request.env['forum.post'].browse(act.res_id)
            activities.append({'id': act.id, 'date': act.date,
                               'subtype': act.subtype_id.name,
                               'url': '/forum/%s/question/%s' %
                               (slug(post.forum_id), slug(post)),
                               'name': act.subject})

        return {
            'id': user.id, 'name': user.name, 'email': user.login,
            'partner_id': user.partner_id.id,
            'birthday': birthday,
            'gender': user.partner_id.gender,
            'join_events': user.partner_id.join_events,
            'supplier': user.partner_id.supplier,
            'customer': user.partner_id.customer,
            'zip': user.partner_id.zip or '',
            'address': user.partner_id.street or '',
            'number': user.partner_id.street2 or '',
            'city': user.partner_id.l10n_br_city_id.name or '',
            'city_id': user.partner_id.l10n_br_city_id.id or '',
            'state': user.partner_id.state_id.name or '',
            'country': user.partner_id.country_id.name or '',
            'occupation': user.partner_id.function or '',
            'phone': user.partner_id.phone or '',
            'mobile': user.partner_id.mobile or '',
            'karma': user.karma,
            'comment': user.partner_id.comment or '',
            'image': "/website/image/res.partner/%s/image_small" %
            user.partner_id.id,
            'products': products,
            'categories': categories,
            'produce_ids': produces,
            'interest_in_ids': interests,
            'produce_images': produce_images,
            'interest_images': interest_image,
            'post_category_ids': category_interest,
            'activities': activities,
        }

    @http.route('/forum/users', type='json', auth="public", cors="*")
    def forum_top_users(self):
        users = request.env['res.users'].sudo().search([], limit=10,
                                                       order='karma desc')
        result = []
        for user in users:
            result.append({
                'id': user.id, 'name': user.name, 'karma': user.karma,
                'image': "/website/image/res.partner/%s/image_small" %
                user.partner_id.id
            })
        return result
