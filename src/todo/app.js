
import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store'
import { renderTodos,renderPending } from './usecases';


const ElementIDs = {
    clearCompleted : '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput : '#new-todo-input',
    todoFilters : '.filtro',
    pendingCountLabel : '#pending-count',
   
}

export const App = (elementId) =>{

const displayTodos = () =>{
    const todos = todoStore.getTodos( todoStore.getCurrentFilter()  );
    renderTodos(ElementIDs.TodoList, todos );
    updatePending();
}

const updatePending = () => {
renderPending(ElementIDs.pendingCountLabel);

}


    (()=>{
        const app = document.createElement ('div');
        app.innerHTML = html ;
        document.querySelector(elementId).append ( app );
        displayTodos();
    }) ();


    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput );
    const todoListUl = document.querySelector(ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector(ElementIDs.clearCompleted );
    const filtersLIs = document.querySelectorAll(ElementIDs.todoFilters );
   



    newDescriptionInput. addEventListener('keyup', ( event ) =>{


        if (event.keyCode !==13 ) return ;
        if (event.target.value.trim().length === 0 ) return;


        todoStore.addTodo (event.target.value);
        displayTodos();
        event.target.value = '';
    });

todoListUl.addEventListener('click', (event )=> {
const element = event.target.closest('[data-id]');
todoStore.toggleTodo (element.getAttribute ('data-id'));
displayTodos();
});


    

todoListUl.addEventListener('click', (event) => {
    const isDestroyElement = event.target.className === 'destroy';
    const element = event.target.closest('[data-id]');
    if ( !element || !isDestroyElement ) return;

    todoStore.deleteTodo( element.getAttribute('data-id') );
    displayTodos();
});


clearCompletedButton.addEventListener('click', () => {
  todoStore.deletecompleted()
    displayTodos();
});

filtersLIs.forEach( element => {

    element.addEventListener('click', (element) => {
        filtersLIs.forEach( el => el.classList.remove('selected') );
        element.target.classList.add('selected');

        switch( element.target.text ){
            case 'Todos':
                todoStore.setFilter( Filters.All )
            break;
            case 'Pendientes':
                todoStore.setFilter( Filters.Pending )
            break;
            case 'Completados':
                todoStore.setFilter( Filters.Completed )
            break;
        }

        displayTodos();

    });


});




}

//referencia HTML

