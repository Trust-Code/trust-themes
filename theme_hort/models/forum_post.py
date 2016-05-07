

from openerp import api, models


class ForumPost(models.Model):
    _inherit = 'forum.post'

    @api.multi
    def last_comment(self):
        last_message = self.message_ids.sorted(key=lambda r: r.id)[0]
        return last_message.body
