import * as Auth from './controller/auth.js'
import * as Home from './viewpage/home_page.js'
import * as About from './viewpage/about_page.js'

Auth.addEventListeners()
Home.addEventListeners()
About.addEventListeners()

