fx_version "cerulean"

description 'Mailbox system for FiveM'
author "@ttar-dev"
version '1.0.0-alpha'
repository 'https://github.com/ttar-dev/bb-mailbox'

lua54 'yes'

games {
  "gta5",
  "rdr3"
}

ui_page 'web/build/index.html'

client_scripts {
   "client/**/*"
}
server_scripts {
	'@oxmysql/lib/MySQL.lua',
	"server/**/*"
}

files {
	'web/build/index.html',
	'web/build/**/*',
}

dependencies {
    'oxmysql'
}