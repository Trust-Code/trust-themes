'''
Created on 1 de set de 2015

@author: danimar
'''

from openerp.addons.web import http
from openerp.addons.web.http import request
from openerp.addons.website_blog.controllers.main import WebsiteBlog


class WebsiteBlogTrustCode(WebsiteBlog):

    @http.route()
    def blog(self, blog=None, tag=None, page=1, **opt):
        result = super(
            WebsiteBlogTrustCode,
            self).blog(
            blog=blog,
            tag=tag,
            page=page,
            **opt)

        blog_post_obj = request.env['blog.post']
        posts = blog_post_obj.search(
            [('blog_id', '=', blog.id)], limit=6, order='visits desc')

        result.qcontext['last_posts'] = posts
        return result
