import * as Element from '../viewpage/element.js'
import * as Routes from '../controller/routes.js'
import * as Auth from '../controller/auth.js'


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

    Element.mainContent.innerHTML = '<h1>Home Page </h1>'
}