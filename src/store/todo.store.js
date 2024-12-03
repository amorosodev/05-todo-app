
import { Todo } from '../todo/models/todo';

export const Filters ={
    All : 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo ('piedra del alma'),
        new Todo ('piedra del infinito'),
        new Todo ('piedra del tiempo'),
        new Todo ('piedra del poder'),
        new Todo ('piedra del realidad'),
    ],
    filter: Filters.All,
}
 

const initStore = () =>{
    loadStore();
    console.log('InitStore🥑');
}

const loadStore = () =>{
    if (!localStorage.getItem ('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse (localStorage.getItem ('state'));
    state.todos = todos;
    state.filter = filter
}

const saveStateLocalStorage = () => {
    localStorage.setItem ('state',JSON.stringify (state));

}

const getTodos = (filter = Filters.All) =>{
    switch (filter ){
        case Filters.All:
        return [...state.todos];

        case Filters.Completed:
            return state.todos.filter (todo => todo.done);


        case Filters.Pending:
            return state.todos.filter (todo => !todo.done);


        default:
            throw new Error (` option ${filter}  is not valid`);
    }

    

}


/**
 * 
 * @param {string} descrption 
 */
const addTodo = (descrption) =>{

    if (! descrption ) throw new Error ('description is required');
    state.todos.push (new Todo (descrption));
    saveStateLocalStorage();
}

/**
 * 
 * @param {string} todoId 
 */
const toggleTodo = (todoId) =>{
    state.todos = state.todos.map( todo =>{
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo;

    });

    saveStateLocalStorage();
}
/**
 * 
 * @param {string} deleteTodo
 * 
 * 
 */
const deleteTodo = (todoId) =>{
    state.todos = state.todos.filter (todo => todo.id !== todoId);
    saveStateLocalStorage();

}


const deletecompleted = () =>{
    state.todos = state.todos.filter (todo =>  ! todo.done);
    saveStateLocalStorage();
}

const setFilter = (newFilter = Filters.All) =>{
    state.filter = newFilter;
    saveStateLocalStorage();
}

const getCurrentFilter = () =>{
    return state.filter;
}




export default {
    initStore,
    getTodos,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deletecompleted,
    setFilter,
    getCurrentFilter,
}
