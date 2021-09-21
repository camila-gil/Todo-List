import { Todo } from "../classes/index-class";
import { todoList } from '../index';

// Referencias al html
const divTodoList    = document.querySelector('.todo-list');
const txtInput       = document.querySelector('.new-todo')
const clearCompleted = document.querySelector('.clear-completed');
const ulFilters      = document.querySelector('.filters');
const anchorFilters  = document.querySelectorAll('.filtro')

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild); 

    return div.firstElementChild;
}


// Eventos

txtInput.addEventListener('keyup', (evento) => {

    if(evento.keyCode === 13 && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value)
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml(nuevoTodo)
        txtInput.value = ''

    }
})


divTodoList.addEventListener('click', (evento) => {

    const nombreElemento =  evento.target.localName; // input, label, button
    const todoElemento   =  evento.target.parentElement.parentElement;
    const todoId         =  todoElemento.getAttribute('data-id');

    if (  nombreElemento.includes('input') ){ // click en el check 
        console.log(todoElemento)
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if( nombreElemento.includes('button') ) { // hay que borrar el todo

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );

    }

})


clearCompleted.addEventListener('click', (evento) => {
    todoList.eliminarCompletados();

    for(let i=divTodoList.children.length - 1; i >= 0; i-- ){  // Empiezo desde atrás hacia adelante
        const elemento =  divTodoList.children[i]

        if(elemento.classList.contains('completed')){
             divTodoList.removeChild(elemento)
        }
    }
 })


ulFilters.addEventListener('click', (evento) => {
    
    const filtro = evento.target.text
    if(!filtro) {return; }

    for (const elemento of divTodoList.children) {
        
        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');

        anchorFilters.forEach(elem => elem.classList.remove('selected'));
        evento.target.classList.add('selected')

        switch(filtro){

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;
            
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }

    }

})