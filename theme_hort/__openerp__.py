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

{
    'name': 'Hort Theme',
    'category': 'Theme/Corporate',
    'summary': 'Trustcode Theme',
    'version': '1.0',
    'description': """Trustcode WebSite Theme""",
    'author': 'Trustcode',
    'depends': ['website', 'website_less',
                'website_blog',
                'website_crm', 'website_slides'],
    'data': [
        'views/assets.xml',
        'views/main_layout.xml',
        'views/footer.xml',
        'views/menu.xml',
    ],
    'application': True,
}
