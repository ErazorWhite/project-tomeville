
const LOCALSTORAGE_KEY = "feedback-form-state";

const formField = document.querySelector(".feedback-form");
const input = document.querySelector("input");
const textArea = document.querySelector("textarea");
const email = formField.addEventListener("input", throttle(onInput,500));
const submit = formField.addEventListener("submit", onSubmit);

let formArr = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {};

if (localStorage.getItem(LOCALSTORAGE_KEY)) {
    
    input.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).email || "";
    textArea.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).message || "";
}

function onInput(evt) {
   
    if (evt.target.name === "email") {
        
        formArr.email = evt.target.value
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formArr))
        return;
        
    } else if (evt.target.name === "message") {
            
        formArr.message = evt.target.value
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formArr))
           
        }
    
    }

function onSubmit(evt) {
    
    if (formField.elements.message.value && formField.elements.email.value) {
        
        evt.preventDefault();
        console.log(formArr);
        formField.reset();
        localStorage.removeItem(LOCALSTORAGE_KEY);
        formArr = {};
    } else {alert(" Fill in all fields. Please!")}
        
    }
