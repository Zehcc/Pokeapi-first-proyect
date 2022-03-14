const toDoItem = () => {
    const inputText = document.querySelector('.toDoInput')
    const toDoListItem = document.createElement('li');
    toDoListItem.className = 'toDoListItem';
    toDoListItem.innerHTML = `<p class="toDoListText">${inputText.value}</p>`
    let removeLastButton = document.createElement('button');
    removeLastButton.textContent = 'X';
    removeLastButton.className = 'listItemButton'
    removeLastButton.addEventListener('click', () => removeLast(toDoListItem));
    const toDoList = document.querySelector('.toDoList');
    toDoList.appendChild(toDoListItem);
    toDoListItem.appendChild(removeLastButton);
    inputText.value = "";
}

const removeLast = (item) => {
    item.remove();
}