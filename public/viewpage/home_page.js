import * as Element from '../viewpage/element.js'
import * as Routes from '../controller/routes.js'
import * as Auth from '../controller/auth.js'
import * as Constant from '../model/constant.js'
import {Thread} from '../model/thread.js'
import * as  FirebaseController from '../controller/firebase_controller.js'
import * as Util from './util.js'
import * as ThreadPage from './thread_page.js'


export function addEventListeners(){
    Element.menuHome.addEventListener('click', ()=>{
        history.pushState(null, null, Routes.routePath.HOME)
        home_page()
    })
    Element.formCreateThread.addEventListener('submit', async e=>{
        e.preventDefault()
        const uid = Auth.currentUser.uid
        const email = Auth.currentUser.email
        const timestamp = Date.now()
        const title = Element.formCreateThread.title.value
        const content = Element.formCreateThread.content.value
        const keywords = Element.formCreateThread.keywords.value
        const keywordsArray = keywords.toLowerCase().match(/\S+/g)
        const thread = new Thread(
            {uid, email, title, timestamp, content, keywordsArray }
        )
        try {
            const docId = await FirebaseController.addThread(thread)
            thread.docId = docId
            //home_page() //we will improve later
            const trTag = document.createElement('tr')// creates <tr> ... </tr> -blank tag
            trTag.innerHTML = buildThreadView(thread)  //content between two tags
            const threadBodyTag = document.getElementById('thread-body-tag')
            threadBodyTag.prepend(trTag)
            const threadForms = document.getElementsByClassName('thread-view-form');
            ThreadPage.addThreadFormEvent(threadForms[0])
            Element.formCreateThread.reset()


            Util.popupInfo('Success', 'A new thread has been added', Constant.iDmodalCreateNewThread)
        } catch (e) {
            if (Constant.DEV) console.log(e)
            Util.popupInfo('Failed to add', JSON.stringify(e))
            
        }
    })
}

export async function home_page(){
    if (!Auth.currentUser){
        Element.mainContent.innerHTML = '<h1>Protected Page</>'
        return 
    }

     Element.mainContent.innerHTML = `
            <button class="btn btn-danger" data-toggle="modal" data-target="#${Constant.iDmodalCreateNewThread}">+ New Thread </button>
        `
    let threadList
     try {
       threadList = await FirebaseController.getThreadlist()
    } catch (e) {
        if (Constant.DEV) console.log(e)
        Util.popupInfo('Error to get thread', JSON.stringify(e))
    }

    Element.mainContent.innerHTML += `
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Action</th>
        <th scope="col">Title</th>
        <th scope="col">KeyWords</th>
        <th scope="col">Posted By</th>
        <th scope="col">Content</th>
        <th scope="col">Posted At</th>
      </tr>
    </thead>
    <tbody id="thread-body-tag">
    `

    threadList.forEach(thread =>{
        Element.mainContent.innerHTML += '<tr>' + buildThreadView(thread) + '</tr>'
    })

    Element.mainContent.innerHTML += `
        </tbody></table>
    `
   //Element.mainContent.innerHTML = html

   ThreadPage.addThreadViewEvents()
    

    
}

function buildThreadView(thread){
    return `
            <td>
                <form method="post" class="thread-view-form">
                    <input type="hidden" name="threadId" value="${thread.docId}"
                    <button type="submit" class="btn btn-outline-primary">View</button>
                </form>
            </td>
            <td>${thread.title}</td>
            <td>${thread.keywordsArray.join('')}</td>
            <td>${thread.email}</td>
            <td>${thread.content}</td>
            <td>${new Date(thread.timestamp).toString()}</td>
    `
}