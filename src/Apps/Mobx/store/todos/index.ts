import { autorun, makeAutoObservable } from 'mobx';

// api
import { apiGetTodos, apiCreateTodo, apiUpdateTodo, apiDeleteTodo } from 'shared/api/apiRequests';

// utils
import { showToast } from 'shared/components/Toast';
import { prepareQuery } from 'shared/utils/query';

// types
import Ttodo from 'shared/api/models/todo';
import TCreateTodo from "shared/api/models/createTodo";
import TFilters from 'shared/api/models/filters';


class TodoStore {
    items: Ttodo[] = [];
    loading: Record<string, boolean> = {};
    isFetching: boolean = false;
    filters: TFilters = {
        status: '',
        search: ''
    }

    constructor() {
        makeAutoObservable(this)
        autorun(() => {
            this.fetchTodos()
        })
    }

    private index = (id: string) => this.items.findIndex(todo => todo.id === id)
    private enableLoading = (id: string) => this.loading[id] = true;
    private disableLoading = (id: string) => this.loading[id] = false;
    private sortByStatus = () => this.items.sort((a, b) => a.status === b.status ? 0 : a.status === 'active' ? -1 : 1);

    updateTodo = async (data: Ttodo) => {
        this.items[this.index(data.id)] = data;
        this.enableLoading(data?.id);
        try {
            await apiUpdateTodo(data);
            showToast({
                description: 'Todo updated!',
                status: 'success'
            })
            this.sortByStatus()
        } catch (e) {
            console.error(e);
            showToast({
                description: 'Something went wrong!',
                status: 'error'
            })
        } finally {
            this.disableLoading(data.id);
        }

    }

    setFilters = (data: TFilters) => {
        this.filters = data
    }

    deleteTodo = async (data: Ttodo) => {
        this.enableLoading(data.id);
        try {
            await apiDeleteTodo(data);
            this.items.splice(this.index(data.id), 1);
            showToast({
                description: 'Todo deleted!',
                status: 'info'
            })
        } catch (e) {
            console.error(e);
            showToast({
                description: 'Something went wrong!',
                status: 'error'
            })
        } finally {
            this.disableLoading(data.id);
        }
    }

    fetchTodos = async () => {
        this.isFetching = true;
        try {
            const data = await apiGetTodos(prepareQuery(this.filters));
            this.items = data
            this.sortByStatus()
        } catch (e) {
            console.error(e);
            showToast({
                description: 'Something went wrong!',
                status: 'error'
            })
        } finally {
            this.isFetching = false;
        }
    }

    createTodo = async (data: TCreateTodo) => {
        this.enableLoading('todoForm')
        try {
            const { data: newTodo} = await apiCreateTodo(data);
            this.items.push(newTodo);
            this.sortByStatus();
            showToast({
                description: 'Todo created!',
                status: 'success'
            })
        } catch (e) {
            console.error(e);
        } finally {
            this.disableLoading('todoForm');
        }
    }
}

export type { TodoStore } ;

export default TodoStore;