
from openerp import api, models


class ResCompany(models.Model):
    _inherit = "res.company"

    @api.multi
    def google_map_img(self, zoom=8, width=298, height=298):
        return super(ResCompany, self).google_map_img(zoom=15)

    @api.multi
    def google_map_link(self, zoom=10):
        return super(ResCompany, self).google_map_link(zoom=15)
