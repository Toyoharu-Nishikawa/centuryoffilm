import {login} from "/necoengine/scripts/necoengine/login/index.js"
import {initialize} from "./gui/index.js"


"use ustrict"
login.setLoginButton()
login.visit()

initialize()

