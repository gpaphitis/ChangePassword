(function (global)
{
   let footerHandler = {};
   /** 
    * @abstract Places footer at the bottom of the page
    * 
    * For accurate calculation:
    *     All content must be in an element with id "content" except the footer
    *     At the end of the content there must be an empty element with id "padding"
    *     The footer to be placed at the bottom must be in a footer element
    */
   function resizePadding()
   {
      // Remove previous height first for correct body height calculation
      let previousStyle = document.querySelector(".added-style");
      if (previousStyle != null)
         previousStyle.remove();
      let body = document.querySelector("body");
      let contentContainer = document.querySelector("#content");
      let footer = document.querySelector("footer");
      let currentPadding = document.querySelector("#padding");
      let paddingHeight = body.offsetHeight - contentContainer.offsetHeight - footer.offsetHeight + currentPadding.offsetHeight;
      let element = document.createElement("style");
      element.classList.add("added-style");
      element.innerText = `#padding{height:${paddingHeight}px;}`;
      document.head.appendChild(element);
   }
   footerHandler.placeFooterEnd = resizePadding;
   global.$footerHandler = footerHandler;
})(window);