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


from openerp.osv import osv, fields
from openerp.tools.safe_eval import safe_eval


class base_config_settings(osv.TransientModel):
    _inherit = 'base.config.settings'

    _columns = {
        'signup_email_template_id': fields.many2one(
            'email.template',
            string='Template user for new users created through signup'),
    }

    def get_signup_email_template_id(
            self, cr, uid, fields, context=None):
        icp = self.pool.get('ir.config_parameter')
        return {
            'signup_email_template_id': safe_eval(icp.get_param(
                cr, uid, 'theme_hort.signup_email_template_id', 'False')),
        }

    def set_signup_email_template_id(self, cr, uid, ids, context=None):
        config = self.browse(cr, uid, ids[0], context=context)
        icp = self.pool.get('ir.config_parameter')
        icp.set_param(cr, uid, 'theme_hort.signup_email_template_id',
                      repr(config.signup_email_template_id))
