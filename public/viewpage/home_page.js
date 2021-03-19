import * as Element from '../viewpage/element.js'

export function addEventListeners(){
    Element.menuHome.addEventListener('click', ()=>{
        home_page()
    })

}

export function home_page(){
    Element.mainContent.innerHTML = '<h1>Home Page </h1>'
}