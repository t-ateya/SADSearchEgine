import * as Element from '../viewpage/element'

export function addEventListeners(){
    Element.menuHome.addEventListener('click', ()=>{
        home_page()
    })

}

function home_page(){
    Element.mainContent.innerHTML = '<h1>Home Page </h1>'
}