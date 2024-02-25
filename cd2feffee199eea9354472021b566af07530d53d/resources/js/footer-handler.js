(function (global)
{
   let footerHandler = {};
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
   footerHandler.placeFooterEnd=resizePadding;
   global.$footerHandler=footerHandler;
})(window);