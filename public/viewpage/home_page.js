import * as Element from '../viewpage/element.js'
import * as Routes from '../controller/routes.js'
import * as Auth from '../controller/auth.js'
import * as Constant from '../model/constant.js'
import {Thread} from '../model/thread.js'



export function addEventListeners(){
    Element.menuHome.addEventListener('click', ()=>{
        history.pushState(null, null, Routes.routePath.HOME)
        home_page()
    })
    Element.formCreateThread.addEventListener('submit', e=>{
        e.preventDefault()
        const uid = Auth.currentUser.uid
        const email = Auth.currentUser.email
        const timestamp = Date.now()
        const title = Element.formCreateThread.title.value
        const content = Element.formCreateThread.content.value
        const keywords = Element.formCreateThread.keywords.value
        const keywordsArray = keywords.toLowerCase().match(/\s+/g)
        const thread = new Thread(
            {uid, email, title, keywordsArray, content, timestamp}
        )
    })
}

export function home_page(){
    if (!Auth.currentUser){
        Element.mainContent.innerHTML = '<h1>Protected Page</>'
        return 
    }

    Element.mainContent.innerHTML = `
        <button class="btn btn-danger" data-toggle="modal" data-target="#${Constant.iDmodalCreateNewThread}">+ New Thread </button>
    `
}