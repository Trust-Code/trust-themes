'''
Created on 1 de set de 2015

@author: danimar
'''

import lxml

from openerp import models, fields, api


class BlogPost(models.Model):
    _inherit = 'blog.post'

    @api.one
    @api.depends('content')
    def _compute_summary(self):
        if self.content:
            content = lxml.html.fragment_fromstring(
                self.content).text_content()
            self.summary = content[:300] + ' ...' if len(content) > 300 else content

    summary = fields.Char(u'Sumario', compute='_compute_summary')
