import * as Element from '../viewpage/element.js'
import * as Routes from '../controller/routes.js'
import * as Auth from '../controller/auth.js'
import * as Constant from '../model/constant.js'



export function addEventListeners(){
    Element.menuHome.addEventListener('click', ()=>{
        history.pushState(null, null, Routes.routePath.HOME)
        home_page()
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