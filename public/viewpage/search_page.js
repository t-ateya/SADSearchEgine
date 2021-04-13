 import * as Element from './element.js'
 import * as Util from './util.js'

 export function addEventListeners(){
     Element.formSearch.addEventListener('submit', e=> {
         e.preventDefault()
         const keywords = e.target.searchKeywords.value.trim()
         if (keywords.length == 0){
            Util.popupInfo('No search keyword', 'Enter search keyword(s) separated by a space')
            return 
         }


     })
 }