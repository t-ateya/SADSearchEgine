import * as Auth from '../controller/auth.js'
import * as Element from '../viewpage/element.js'
import * as FirebaseController from '../controller/firebase_controller.js'
import * as Constant from '../model/constant.js'
import * as Util from '../viewpage/util.js'



export function addThreadViewEvents(){
    const viewForms = document.getElementsByClassName('thread-view-form')
    for (let n = 0; n<viewForms.length; n++){
        viewForms[n].addEventListener('submit', e=> {
            e.preventDefault()
            const threadId = e.target.threadId.value
            thread_page(threadId)

        })
    }
}

export async function thread_page(threadId){
    if (!Auth.currentUser){
        Element.mainContent.innerHTML = '<h1>Protected Page </h1>'
        return 
    }

    //1. get thread from Firestore by threadId
    //2. get all reply messages to this thread from firestore
    //3. display this thread
    //4. a form to add a new reply

    let thread
    
    try{
        thread = await FirebaseController.getOneThread(threadId)
    }catch (e){
        if (Constant.DEV) console.log(e)
        Util.popupInfo('Error', JSON.stringify(e))
        return 
    }

    let html =`
        <h4  class="bg-primary text-white>${thread.title} </h4>
        <div>${thread.email} (At ${new Date(thread.timestamp).toString()})</div>
        <div class="bg-secondary text-white">${thread.content}</div>
    `;

    html += '<div id="message-reply-body">'
        //display all reply message
    html += '</div>'

    html += `
        <div>
            <textarea id="textarea-add-new-message" placeholder="Reply to this message"></textarea>
            <br>
            <button id="button-add-new-message" class="btn btn-outline-info">Post message</button>
            
        </div>
    `

   // Element.mainContent.innerHTML = `<h2>${threadId}</h2>`
    
}