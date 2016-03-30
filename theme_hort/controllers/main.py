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


from openerp.addons.web import http
from openerp.addons.web.http import request
from openerp.addons.website_blog.controllers.main import WebsiteBlog


class UserProfile(http.Controller):

    @http.route('/user/profile', type='json', auth="user", cors="*")
    def user_profile(self):
        user = request.env.user.sudo()

        return {
            'id': user.id, 'name': user.name, 'email': user.login,
            'birthday': user.partner_id.date_birth,
            'gender': user.partner_id.gender,
            'join_events': user.partner_id.join_events,
            'profile': user.partner_id.profile,
            'address': "%s - %s" % (user.partner_id.street or '', user.partner_id.street2 or ''),
            'city': user.partner_id.city or '',
            'state': user.partner_id.state_id.name or '',
            'country': user.partner_id.country_id.name or '',
            'occupation': user.partner_id.function,
            'phone': user.partner_id.phone,
            'mobile': user.partner_id.mobile,
            'karma': user.karma,
            'comment': user.partner_id.comment,
            'image': "/website/image/res.partner/%s/image_small" % user.partner_id.id,
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
