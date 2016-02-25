'''
Created on 1 de set de 2015

@author: danimar
'''

from openerp.addons.web import http
from openerp.addons.web.http import request
from openerp.addons.website_blog.controllers.main import WebsiteBlog


class LeadCapture(http.Controller):

    @http.route('/coming-soon', type='http', auth='public', website=True)
    def coming_soon(self, **params):
        return request.render('theme_coming_product.page_coming_product')
