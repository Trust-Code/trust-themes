'''
Created on 1 de set de 2015

@author: danimar
'''

from openerp.addons.web import http
from openerp.addons.web.http import request
from openerp.addons.website_blog.controllers.main import WebsiteBlog


class LeadCapture(http.Controller):

    @http.route('/coming_soon', type='http', auth='public', website=True)
    def coming_soon(self):
        return request.render('theme_coming_product.page_coming_product')

    @http.route('/lead_capture', type='http', auth="public", website=True)
    def lead_capture(self, **post):
        lead = {'name': 'Lead coming soon page', 'email_from': post['email'],
                'type': 'lead'}
        request.env['crm.lead'].sudo().create(lead)
        request.cr.commit()
        return ""
