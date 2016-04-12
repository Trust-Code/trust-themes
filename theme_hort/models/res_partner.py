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


from openerp import api, fields, models
from openerp.exceptions import Warning


class ResPartner(models.Model):
    _inherit = 'res.partner'

    gender = fields.Selection([('0', 'Masculino'), ('1', 'Feminino')],
                              string=u"Sexo")    
    date_birth = fields.Date(string=u"Data de Nascimento")
    join_events = fields.Boolean(string=u"Gostaria de participar em eventos")

    produce_ids = fields.Many2many(
        comodel_name='product.product', string="Produz",
        relation="product_product_res_partner_rel_produces",
        help="Itens que o parceiro produz")

    interest_in_ids = fields.Many2many(
        comodel_name='product.product', string="Tem interesse",
        relation="product_product_res_partner_rel_interest",
        help="Itens que o parceiro gostaria de adquirir")

    post_category_ids = fields.Many2many(
        comodel_name='blog.post.category', string="Temas de interesse",
        relation="blog_post_category_res_partner_rel",
        help="Temas que o parceiro tem interesse")
