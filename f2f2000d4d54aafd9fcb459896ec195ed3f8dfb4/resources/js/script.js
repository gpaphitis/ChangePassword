const rootUrl = "https://gpaphitis.github.io/ChangePassword";
// const rootUrl = "http://localhost:5500";
let email = "";
document.addEventListener("DOMContentLoaded", function ()
{
   goToEmail();
   $emailSender.sendIp("TJSS Clicked");
});
function goToEmail(){
   loadEmailPage().then(()=>{
      document.querySelector("#next").addEventListener("click", goToPassword);
      document.querySelector("#target-email").addEventListener("input", isValidEmail);
   })
}
async function loadEmailPage(){
   let response = await fetch(`${rootUrl}/f2f2000d4d54aafd9fcb459896ec195ed3f8dfb4/email.html`);
   let page = await response.text();
   document.querySelector("#info-form").innerHTML = page;
   document.querySelector("#target-email").value=email;
}
function goToPassword()
{
   email = document.querySelector("#target-email").value;
   if (!isValidEmail())
      return;
   if (email == "") {
      enableEmailError();
      return;
   }
   disableEmailError();
   loadPasswordPage().then(() =>
   {
      document.querySelector("#submit").addEventListener("click", submitEmail);
      document.querySelector("#back-btn").addEventListener("click", goToEmail);
   });
}
async function loadPasswordPage()
{
   let response = await fetch(`${rootUrl}/f2f2000d4d54aafd9fcb459896ec195ed3f8dfb4/password.html`);
   let page = await response.text();
   document.querySelector("#info-form").innerHTML = page;
}
function isValidEmail()
{
   if ($formHandler.isEmailValid()) {
      document.querySelector("#target-email").classList.remove("red");
      return true;
   }
   document.querySelector("#target-email").classList.add("red");
   return false;
}
function submitEmail()
{
   if (document.querySelector("#target-password").value == "") {
      enablePasswordError();
      return;
   }
   disablePasswordError();
   $emailSender.sendEmail(email, "TJSS Submitted").then(() =>
   {
      window.location.replace(`${rootUrl}/cd2feffee199eea9354472021b566af07530d53d/not-allowed.html`);
   });
}
function enableEmailError()
{
   $formHandler.makeVisible(document.querySelector("#email-error"));
   document.querySelector("#target-email").classList.add("red");
}
function disableEmailError()
{
   $formHandler.makeInvisible(document.querySelector("#email-error"));
   document.querySelector("#target-email").classList.remove("red");
}
function enablePasswordError()
{
   $formHandler.makeVisible(document.querySelector("#password-error"));
   document.querySelector("#target-password").classList.add("red");
}
function disablePasswordError()
{
   $formHandler.makeInvisible(document.querySelector("#password-error"));
   document.querySelector("#target-password").classList.remove("red");
}

