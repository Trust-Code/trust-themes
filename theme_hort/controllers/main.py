# -*- coding: utf-8 -*-
###############################################################################
#                                                                             #
# Copyright (C) 2016 TrustCode - www.trustcode.com.br                         #
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


from datetime import datetime
from openerp.addons.web import http
from openerp.addons.web.http import request
from openerp.addons.website_blog.controllers.main import WebsiteBlog
from openerp.tools import DEFAULT_SERVER_DATE_FORMAT


class UserProfile(http.Controller):

    @http.route('/user/update', type='json', auth="user", cors="*")
    def user_update(self, **post):
        user = request.env.user.sudo()
        user.name = post['name']
        user.partner_id.write({
            'street': post['address'],
            'street2': post['number'],
            'city': post['city'],
            #'state_id': post['state_id'],
            #'country_id': post['country_id'],
            'gender': post['gender'],
            'function': post['occupation'],
            'date_birth': post['birthday'],
            'profile': post['profile'],
        })
        user.partner_id.product_ids.unlink()
        user.partner_id.interest_in_ids.unlink()
        user.partner_id.product_ids = [int(x) for x in post['produce_ids']]
        user.partner_id.interest_in_ids = [
            int(x) for x in post['interest_in_ids']]
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
            products.append({'id': product.id, 'name': product.name})
        produces = []
        for produce in user.partner_id.produce_ids:
            produces.append(produce.id)

        interests = []
        for interest in user.partner_id.interest_in_ids:
            interests.append(interest.id)

        return {
            'id': user.id, 'name': user.name, 'email': user.login,
            'birthday': birthday,
            'gender': user.partner_id.gender,
            'join_events': user.partner_id.join_events,
            'profile': user.partner_id.profile,
            'address': user.partner_id.street or '',
            'number': user.partner_id.street2 or '',
            'city': user.partner_id.city or '',
            'state': user.partner_id.state_id.name or '',
            'country': user.partner_id.country_id.name or '',
            'occupation': user.partner_id.function,
            'phone': user.partner_id.phone,
            'mobile': user.partner_id.mobile,
            'karma': user.karma,
            'comment': user.partner_id.comment,
            'image': "/website/image/res.partner/%s/image_small" % user.partner_id.id,
            'products': products,
            'produce_ids': produces,
            'interest_in_ids': interests,
        }

    @http.route('/forum/users', type='json', auth="public", cors="*")
    def forum_top_users(self):
        users = request.env['res.users'].sudo().search([], limit=10,
                                                       order='karma desc')
        result = []
        for user in users:
            result.append(
                {'id': user.id, 'name': user.name, 'karma': user.karma,
                 'image': "/website/image/res.partner/%s/image_small" % user.id})
        return result
