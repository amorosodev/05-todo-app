
import { todo } from '../todo/models/todo';

const Filters ={
    All : 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new todo ('piedra del alma'),
        new todo ('piedra del infinito'),
        new todo ('piedra del tiempo')
    ],
    filter: Filters.All,
}


const initStore = () =>{
    console.log (state);
    console.log('InitStore🥑');
}


export default {
    initStore,
}
