document.addEventListener("DOMContentLoaded", () => {
  const templateList = document.getElementById("templateList");
  const templateForm = document.getElementById("templateForm");
  const templateNameInput = document.getElementById("templateName");
  const templateContentInput = document.getElementById("templateContent");

  function renderTemplates(templates) {
    templateList.innerHTML = "";
    for (const key in templates) {
      const templateDiv = document.createElement("div");
      templateDiv.innerHTML = `<strong>${key}</strong>: ${templates[key]} <button class="editBtn" data-key="${key}">Editar</button>`;
      templateList.appendChild(templateDiv);
    }
    bindEditButtons();
  }

  function bindEditButtons() {
    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const key = event.target.getAttribute("data-key");
        const template = templates[key];
        templateNameInput.value = key;
        templateContentInput.value = template;
      });
    });
  }

  templateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = templateNameInput.value;
    const content = templateContentInput.value;

    chrome.storage.sync.get(["templates"], (data) => {
      const templates = data.templates || {};
      templates[name] = content;
      chrome.storage.sync.set({ templates });
      renderTemplates(templates);
      templateForm.reset();
    });
  });

  chrome.storage.sync.get(["templates"], (data) => {
    renderTemplates(data.templates || {});
  });
});
