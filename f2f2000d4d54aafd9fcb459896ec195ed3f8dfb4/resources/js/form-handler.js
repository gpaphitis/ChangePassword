(function (global)
{
   let formHandler = {};
   function clearForm()
   {
      // Clears all empty field errors
      let inputs = document.querySelectorAll("input");
      let emptyErrors = document.querySelectorAll(".empty-error");
      for (let i = 0; i < emptyErrors.length; i++) {
         inputs[i].value = "";
         makeInvisible(emptyErrors[i]);
      }
   }
   function isFieldEmpty()
   {
      let inputs = document.querySelectorAll("input");
      let emptyErrors = document.querySelectorAll(".empty-error");
      let isEmpty = false;
      for (let i = 0; i < inputs.length; i++) {
         if (inputs[i].value === "") {
            makeVisible(emptyErrors[i]);
            isEmpty = true;
         }
         else
            makeInvisible(emptyErrors[i]);
      }
      return isEmpty;
   }
   function makeVisible(element)
   {
      element.classList.remove("hidden");
   }
   function makeInvisible(element)
   {
      element.classList.add("hidden");
   }
   function isEmailValid()
   {
      if (document.querySelector("#target-email:invalid") != null) {
         makeVisible(document.querySelector("#email-error"));
         return false;
      }
      makeInvisible(document.querySelector("#email-error"));
      return true;
   }
   formHandler.isEmailValid = isEmailValid;
   formHandler.clearForm = clearForm;
   formHandler.isFieldEmpty = isFieldEmpty;
   formHandler.makeInvisible = makeInvisible;
   formHandler.makeVisible = makeVisible;
   global.$formHandler = formHandler;
})(window);