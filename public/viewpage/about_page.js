import * as Element from '../viewpage/element'

export function addEventListeners(){
    Element.menuAbout.addEventListener('click', ()=>{
        about_page()
    })

}

function about_page(){
    Element.mainContent.innerHTML = '<h1>About Page </h1>'
}