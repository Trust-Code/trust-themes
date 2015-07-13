# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2015-Trust-Code (<http://www.trustcode.com.br>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

{
    'name': 'TrustCode Theme',
    'category': 'Theme/Corporate',
    'summary': 'TrustCode WebSite Theme',
    'version': '1.0',
    'description': """TrustCode WebSite Theme""",
    'author': 'TrustCode',
    'depends': ['website', 'website_less'],
    'data': [
        'views/layout.xml',
        'views/pages.xml',
        'views/assets.xml',
        'views/templates.xml'
    ],
    'application': True,
}
