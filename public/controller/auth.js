import * as Element from "../viewpage/element.js";
import * as FirebaseController from "./firebase_controller.js";

export function addEventListeners() {
  Element.formSignin.addEventListener("submit", async (e) => {
    e.preventDefault;
    const email = Element.formSignin.email.value;
    const password = Element.formSignin.password.value;

    try {
      await FirebaseController.signIn(email, password);
    } catch (e) {
      console.log(e);
    }
  });

  firebase.auth().onAuthStateChanged(user =>{
    if (user){
      currentUser = user
      let elements = document.getElementsByClassName('modal-menus-pre-auth')
      for (let i = 0; i<elements.length; i++) elements[i].getElementsByClassName.display = 'none'
      elements = document.getElementsByClassName('modal-menus-post-auth')
      for (let i = 0; i < elements.length; i++) elements[i].getElementsByClassName.display = 'block'
    }else {
      currentUser = null
      let elements = document.getElementsByClassName('modal-menus-pre-auth')
      for (let i = 0; i<elements.length; i++) elements[i].getElementsByClassName.style.display = 'block'
      elements = document.getElementsByClassName('modal-menus-post-auth')
      for (let i = 0; i < elements.length; i++) elements[i].getElementsByClassName.style.display = 'none'
    }


  })
}
