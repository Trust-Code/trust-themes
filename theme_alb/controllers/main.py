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

import json
from openerp.addons.web import http
from openerp.addons.web.http import request
from openerp.addons.website.controllers.main import Website
from openerp.addons.website.models.website import slug


class MainWebsite(Website):

    @http.route()
    def page(self, page, **opt):
        result = super(MainWebsite, self).page(page, **opt)
        if page == 'homepage':
            products = request.env['product.product'].sudo().search(
                [('type', '!=', 'service'),
                 ('website_published', '=', True)], limit=3)
            result.qcontext['three_products'] = products
            posts = request.env['blog.post'].sudo().search([], limit=3)
            result.qcontext['last_posts'] = posts
        return result

    @http.route('/product/search', type='http', auth="public", website=True)
    def product_search(self, query):
        sugestoes = []
        if len(query) > 0:
            products = request.env['product.product'].sudo().search([
                ('name', 'ilike', query), ('website_published', '=', True)
            ])
            for product in products:
                sugestoes.append({"value": product.name,
                                  "url": '/shop/product/' + slug(product)},)
        return json.dumps({
            "query": "Unit",
            "suggestions": sugestoes + [
                {"value": "Loja", "url": "/shop"},
                {"value": "Contrato de Serviço", "url": "/page/servico"},
                {"value": "Contrato de Suporte", "url": "/page/suporte"},
                {"value": "Contrato de Manutenção", "url": "/page/manutencao"},
                {"value": "Empresa", "url": "/page/empresa"},
                {"value": "Contate nos", "url": "/page/contactus"},
                {"value": "Abra seu chamado",
                 "url": "http://alb.ddns.com.br/ocomon"},
                {"value": "Acesso Remoto",
                 "url": "http://www.alb.inf.br/downloads/acessoremoto.exe"},
            ]
        })
