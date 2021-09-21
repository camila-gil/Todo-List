
import './styles.css';
import { Todo, TodoList } from './classes/index-class';
import {crearTodoHtml} from './js/componentes';


export const todoList = new TodoList();

// todoList.todos.forEach( todo => {
//     crearTodoHtml(todo)
// });

todoList.todos.forEach (crearTodoHtml) // Es lo mismo. Solo sirve cuando hay un solo argumento

console.log(`todoList`, todoList.todos)