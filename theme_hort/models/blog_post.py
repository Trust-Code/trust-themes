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


from openerp import api, fields, models


class BlogBlog(models.Model):
    _inherit = 'blog.blog'

    writer_id = fields.Many2one('res.partner', string="Escritor")
    writer_partner_ids = fields.Many2many(
        comodel_name='res.partner', string="Escritores",
        relation="res_partner_blog_blog_rel_writer",
        help="Parceiros que tem permissão de escrver no blog")


class BlogPostCategory(models.Model):
    _name = 'blog.post.category'

    name = fields.Char('Nome', size=50, required=True)


class BlogPost(models.Model):
    _inherit = 'blog.post'

    category_id = fields.Many2one('blog.post.category', string="Categoria")
