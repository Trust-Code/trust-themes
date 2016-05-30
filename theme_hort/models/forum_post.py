

from openerp import api, models
from openerp.addons.website.models.website import slug


class ForumPost(models.Model):
    _inherit = 'forum.post'

    @api.multi
    def last_comment(self):
        last_message = self.message_ids.sorted(key=lambda r: r.id)[0]
        return last_message.body

    @api.one
    def url_post(self):
        base_url = self.env['ir.config_parameter'].get_param('web.base.url')
        return '%s/forum/%s/question/%s' % (base_url, slug(self.forum_id),
                                            slug(self))
