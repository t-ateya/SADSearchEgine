import * as Element from "../viewpage/element.js";

export function addEventListeners() {
  Element.formSignin.addEventListener("submit", (e) => {
    const email = Element.formSignin.email.value;
    const password = Element.formSignin.password.value;
  });
}
