(function (global)
{
   let formHandler = {};
   /**
    * @abstract Clears form fields and hides empty errors.
    * 
    * Only inputs and wrapped in an element with class name "form-field" are cleared
    */
   function clearForm()
   {
      let inputs = document.querySelectorAll(".form-field");
      for (let i = 0; i < inputs.length; i++) {
         for (let j = 0; j < inputs[i].children.length; j++) {
            if (inputs[i].children[j].tagName === "INPUT") {
               inputs[i].children[j].value = "";
               hideEmptyError(inputs[i]);
            }
         }
      }
   }
   /**
    * @abstract Checks if fields are empty and shows or hides their respective empty errors
    * 
    * Only inputs and wrapped in an element with class name "form-field" are checked
    */
   function isFieldEmpty()
   {
      let inputs = document.querySelectorAll(".form-field");
      let isEmpty = false;
      for (let i = 0; i < inputs.length; i++) {
         for (let j = 0; j < inputs[i].children.length; j++) {
            if (inputs[i].children[j].tagName === "INPUT") {
               if (inputs[i].children[j].value === "") {
                  isEmpty = true;
                  showEmptyError(inputs[i]);
                  break;
               }
               hideEmptyError(inputs[i]);
               break;
            }
         }
      }
      return isEmpty;
   }
   /**
    *@abstract Finds child with "empty-error" class and makes it visible

    * Makes error visible by removing "hidden" class
    * 
    * @param {HTMLElement} parent Parent element with the error as child
    */
   function showEmptyError(parent)
   {
      for (let i = 0; i < parent.children.length; i++) {
         if (parent.children[i].classList.contains("empty-error")) {
            parent.children[i].classList.remove("hidden");
            return;
         }
      }
   }
   /**
    * @abstract Finds child with empty-error class and makes it invisible
    * 
    * Makes error invisible by adding "hidden" class
    * 
    * @param {HTMLElement} parent Parent element with the error as child
    */
   function hideEmptyError(parent)
   {
      for (let i = 0; i < parent.children.length; i++) {
         if (parent.children[i].classList.contains("empty-error"))
            parent.children[i].classList.add("hidden");
      }
   }
   /**
    *@abstract  Makes element visible
    *
    * @param {HTMLElement} element Element to be made visible
    */
   function makeVisible(element)
   {
      element.classList.remove("hidden");
   }
   /**
    *@abstract  Makes element invisible
    *
    * @param {HTMLElement} element Element to be made invisible
    */
   function makeInvisible(element)
   {
      element.classList.add("hidden");
   }
   /**
    * @abstract Checks if email is valid and shows or hides error message
    * 
    * Email input must have id "target-email" and email error id ""
    */
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