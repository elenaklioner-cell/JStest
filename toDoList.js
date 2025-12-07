// Key for localStorage
const STORAGE_KEY = "myDynamicListItems";

// Our items array: { id, text, checked }
let items = [];

// Load items when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  renderList();
});

function addItem() {
  const input = document.getElementById("itemInput");
  const text = input.value.trim();
  if (text === "") return;

  const newItem = {
    id: Date.now(),    // unique id
    text: text,
    checked: false
  };

  items.push(newItem);
  saveToStorage();
  renderList();

  input.value = "";
}

function deleteItems() {
  let selectedIds = items.filter(i => i.checked).map(i => i.id);
  items = items.filter(i => !selectedIds.includes(i.id));
  saveToStorage();
  renderList();
}



function renderList() {
  const ul = document.getElementById("itemList");
  ul.innerHTML = ""; // clear list

  items.forEach(item => {
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.checked;
    checkbox.addEventListener("change", (e) => {
      toggleItem(item.id, e.target.checked);
    });

    // Text
    const span = document.createElement("span");
    span.textContent = item.text;
    

    li.appendChild(checkbox);
    li.appendChild(span);
    

    ul.appendChild(li);
  });
}

function toggleItem(id, checked) {
  const item = items.find(i => i.id === id);
  if (item) {
    item.checked = checked;
    saveToStorage();
  }
}

function deleteItem(id) {
  items = items.filter(i => i.id !== id);
  saveToStorage();
  renderList();
}

function selectAll(checked) {
  items.forEach(i => i.checked = checked);
  saveToStorage();
  renderList();
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    items = JSON.parse(data);
  } else {
    items = [];
  }
}
