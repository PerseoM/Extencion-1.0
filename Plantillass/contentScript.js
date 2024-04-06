// contentScript.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "pasteTemplate") {
      // Crear un elemento de textarea temporal
      const tempInput = document.createElement("textarea");
      tempInput.value = message.template;
      document.body.appendChild(tempInput);
      
      // Seleccionar el texto en el textarea y copiarlo al portapapeles
      tempInput.select();
      document.execCommand("copy");
      
      // Eliminar el elemento de textarea temporal
      document.body.removeChild(tempInput);
      
      // Pegar la plantilla en el campo de texto activo
      document.activeElement.focus();
      document.execCommand("paste");
    }
  });
  
  
  
  