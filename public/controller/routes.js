import * as Home from '../viewpage/home_page.js'
import * as About from '../viewpage/about_page.js'
import * as ThreadPage from '../viewpage/thread_page.js'

export const routePath = {
    HOME: '/',
    ABOUT: '/about',
    THREAD: '/thread'
}

export const routes = [
    {path: routePath.HOME, page: Home.home_page},
    {path: routePath.ABOUT, page: About.about_page},
    {path: routePath.THREAD, page: ThreadPage.thread_page}
]

export function routing (pathname, href){
    const threadIdIndex = href.indexOf(routePath.THREAD) 
    let threadId
    if (threadIdIndex >0){
        //thread view
        const len = routePath.THREAD.length
        const threadId = href.substr(threadIdIndex + len + 1)
    }
    const route = routes.find(r => r.path == pathname)
    if (route) route.page(threadId)
    else routes[0].page()
}