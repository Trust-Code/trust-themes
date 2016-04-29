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
    'name': 'Trustcode New Product Theme',
    'category': 'Theme/Corporate',
    'summary': 'Trustcode WebSite Theme',
    'version': '1.0',
    'description': """Trustcode WebSite Theme""",
    'author': 'Trustcode',
    'depends': ['website', 'website_less'],
    'data': [        
        'views/main.xml',                
    ],
    'application': True,
}
