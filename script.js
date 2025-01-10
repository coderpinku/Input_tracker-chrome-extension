let myInput = [];
const inputItem = document.getElementById("myTextarea");
const saveInputItem = document.getElementById("save-input");
const deleteAllItemBtn = document.getElementById("delete-all-Item");
const saveTabBtn = document.getElementById("save-btn");
const Itemlist = document.getElementById("Item-list");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myInput"));

if (leadsFromLocalStorage) {
  myInput = leadsFromLocalStorage;
  render(myInput);
}

saveTabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myInput.unshift(tabs[0].url);
    localStorage.setItem("myInput", JSON.stringify(myInput));
    render(myInput);
  });
});

deleteAllItemBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myInput = [];
  render(myInput);
});
saveInputItem.addEventListener("click", function () {
  if(inputItem.value.trim() !== "") {
    myInput.unshift(inputItem.value);
  }
  inputItem.value = "";
  localStorage.setItem("myInput", JSON.stringify(myInput));
  render(myInput);
});

function render(Items) {
  let listItems = "";
  for (let i = 0; i < Items.length; i++) {
    listItems += `<li class="list-items">
      ${myInput[i]}
      <button class="copyItem" onclick="copyToClipBoard('${myInput[i]}')">📄</button>
      <button class="deleteItem" onclick="deleteItem(${i})">❌</button>
    </li>`;
  }

  Itemlist.innerHTML = listItems;

  // Add event listeners for copy and delete buttons
  const copyButtons = document.querySelectorAll(".copyItem");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const textToCopy = button.previousSibling.textContent.trim();
      copyToClipBoard(textToCopy);
    });
  });

  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      deleteItem(index);
    });
  });
}

function deleteItem(index) {
  myInput.splice(index, 1);
  localStorage.setItem("myInput", JSON.stringify(myInput));
  render(myInput);
}

function copyToClipBoard(text) {
  const textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
}
document.addEventListener("DOMContentLoaded", function () {
  var textareaElement = document.getElementById("myTextarea");
  textareaElement.addEventListener("input", function () {
    textareaElement.style.height = "auto";
    textareaElement.style.height = textareaElement.scrollHeight + "px";
  });
});
