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


import datetime, re
from openerp import models, fields, exceptions, api
from openerp.tools.translate import _
from openerp.addons.auth_signup.controllers.main import AuthSignupHome
from openerp.addons.auth_signup.res_users import SignupError

from openerp.http import request

class Extension(AuthSignupHome):
    
    def do_signup(self, qcontext):
        """ Shared helper that creates a res.partner out of a token """
        values = dict((key, qcontext.get(key)) for key in ('login', 'name', 'password', 'company_name'))
        assert any([k for k in values.values()]), "The form was not properly filled in."
        assert values.get('password') == qcontext.get('confirm_password'), "Passwords do not match; please retype them."        
        try:
            self._signup_with_values(qcontext.get('token'), values)
            request.cr.commit()
        except:
            request.cr.rollback()
            raise        

class res_users(models.Model):
    _inherit = 'res.users'        
    
    @api.model
    def signup(self, values, token=None, context=None):        
        try:
            users = self.search([('login', '=', values["login"])])
            if len(users) > 0:
                raise Exception('Este e-mail já está cadastrado em nosso sistema.')
            
            created_user = super(res_users, self).signup(values, token)
        
            user = self.search([('login', '=', created_user[1])])[0]
            user.partner_id.gender = values["gender"] if "gender" in values else False
            user.partner_id.profile = values["profile"] if "profile" in values else False
            user.partner_id.date_birth = values["date_birth"] if "date_birth" in values else False
            user.partner_id.date_birth = values["join_events"] if "join_events" in values else False
            
            config = self.env['base.config.settings'].search([])
            if len(config) > 0 and config.signup_email_template_id.id:
                mail_template = config.signup_email_template_id
                mail_template.send_mail(self.id, force_send=True, raise_exception=True)
                        
            return created_user
        except Exception as e:
            raise SignupError(e.message or str(e))