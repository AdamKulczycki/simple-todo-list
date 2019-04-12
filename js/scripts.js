let todoList = null;
let todoElements = null;
let todoForm = null;
let searchForm = null;
let sortInc = true;
let sortIcon = null

function addTask(value) {

    if (todoList.children.length > 0) {
        sortBtn.disabled = '';
        sortIcon.style.color = '';
    }
    const li = document.createElement('li');
    li.classList.add('todo__item');

    let bar = document.createElement('div');
    bar.classList.add('todo__bar');

    const dateObj = new Date();
    const date = document.createElement('div');
    date.classList.add('todo__date');
    date.innerHTML = dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear() + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes();
    const del = document.createElement('button');
    del.classList.add('todo__delete');
    del.innerHTML = '<i class="fas fa-times"></i>';

    const content = document.createElement('div');
    content.classList.add('todo__content');
    content.innerText = value;

    bar.appendChild(date);
    bar.appendChild(del)

    li.appendChild(bar);
    li.appendChild(content);

    if (sortInc) {
        todoList.appendChild(li);
    } else {
        todoList.prepend(li);
    }

};

function sortList() {
    const list = document.querySelector('#todoList');
    if (list) {
        if (sortInc) {
            [...list.children]
            .sort((a,b) => new Date(a.querySelector('.todo__date').innerText) - new Date(b.querySelector('.todo__date').innerText) ? -1 : 1)
            .map(node => list.appendChild(node));
            sortInc = false;
            sortIcon.className = 'fas fa-sort-amount-up todo__sort-icon';
        } else {
            [...list.children]
            .sort((a,b) => new Date(a.querySelector('.todo__date').innerText) - new Date(b.querySelector('.todo__date').innerText) ? -1 : 1)
            .map(node => list.appendChild(node));
            sortInc = true;
            sortIcon.className = 'fas fa-sort-amount-down todo__sort-icon';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    todoList = document.querySelector('#todoList');
    todoForm = document.querySelector('#todoForm');
    searchForm = document.querySelector('#todo-search');
    sortIcon = document.querySelector('#sortIcon');
    sortBtn = document.querySelector('#sortBtn');

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let textarea = this.querySelector('#todo-input');

        if (textarea.value !== '') {
            addTask(textarea.value);
            textarea.value = '';
        }
    });

    todoList.addEventListener('click', function(e) {
        if (e.target.closest('.todo__delete')) {
            e.target.closest('.todo__item').remove();
        }
        if (todoList.children.length === 0) {
            sortBtn.disabled = 'false';
            sortIcon.style.color = 'grey';
        }
    });

    searchForm.addEventListener('input', function(e) {
        let input = this.value;
        let items = todoList.querySelectorAll('.todo__item');

        [].forEach.call(items, function(li) {
            let text = li.querySelector('.todo__content').innerText;
            
            if(text.indexOf(input) === -1) {
                li.style.display = 'none';
            } else {
                li.style.display = '';
            }
        });
    });


    sortBtn.addEventListener('click', function(e) {
        sortList();
    });
});