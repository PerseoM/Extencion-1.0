chrome.runtime.onInstalled.addListener(() => {
  const parentMenuId = "templates"; // ID del menú principal

  // Crear el menú principal
  chrome.contextMenus.create({
    id: parentMenuId,
    title: "Plantillas", // Título del menú principal
    contexts: ["editable"]
  });

  // Cargar plantillas desde el almacenamiento y agregarlas como opciones de submenu
  chrome.storage.sync.get(["templates"], (data) => {
    const templates = data.templates || {};
    for (const key in templates) {
      chrome.contextMenus.create({
        id: key,
        title: key,
        parentId: parentMenuId, // Asignar como submenú del menú principal
        contexts: ["editable"]
      });
    }
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Si se hace clic en una opción del submenu
  if (info.parentMenuItemId && info.parentMenuItemId === "templates") {
    const templateId = info.menuItemId;

    // Lógica para pegar la plantilla...
    // Aquí puedes acceder al ID de la plantilla seleccionada y realizar la lógica necesaria para pegarla en el campo de texto.
    // Obtener la plantilla desde el almacenamiento
    chrome.storage.sync.get(["templates"], (data) => {
      const templates = data.templates || {};
      const template = templates[templateId];
      if (template) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: function (template) {
            document.execCommand("insertText", false, template);
          },
          args: [template]
        });
      }
    });
  }
});











  
  
  
  
  
  
  
  