const uri = 'api/todoitems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');

    if (addNameTextbox.value.length === 0) return;

    const item = {
        isComplete: false,
        name: addNameTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    if (document?.getElementById("cancel")?.firstChild?.innerText === "Cancel") {
        getItems();
        return;
    }
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    let tr = document.getElementById(`${id}`);

    if (tr.childNodes[2].firstChild.innerText === "Save") {
        item.name = document.getElementById("editField").value;
        item.isComplete = document.getElementById("editCheckbox").checked;
        if (item.name.length === 0) return;
        updateItem(id,item);
        return;
    }

    let td0 = tr.childNodes[0];
    td0.firstChild.remove();
    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.id = "editCheckbox";
    isCompleteCheckbox.checked = item.isComplete;
    td0.appendChild(isCompleteCheckbox);

    let td1 = tr.childNodes[1];
    td1.firstChild.remove();
    let textField = document.createElement('input');
    textField.type = 'text';
    textField.id = "editField";
    textField.value = item.name;
    td1.appendChild(textField);

    let td2 = tr.childNodes[2];
    td2.firstChild.innerText = "Save";

    let td3 = tr.childNodes[3];
    td3.id = "cancel";
    td3.firstChild.innerText = "Cancel";
}

function updateItem(itemId, item) {

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));
    return false;
}

function _displayCount(itemCount) {
    const name = (itemCount <= 1) ? 'item' : 'items';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();
        tr.id = `${item.id}`;

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    todos = data;
}