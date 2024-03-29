import React, { FC, useEffect } from 'react';
import { observer } from "mobx-react-lite"

// hooks
import useStore from 'apps/Mobx/hooks/useStore';

// utils
import { prepareQuery } from 'shared/utils/query';

// components
import TodoList from 'shared/components/TodoList';


const TodoListObserved = observer(TodoList)


const Todos: FC = () => {
    const model = useStore('todos');

    useEffect(() => {
        model.fetchTodos(prepareQuery({ filters: model.filters }));
    }, [])

    return (
        <TodoListObserved
            loading={model.loading}
            isFecthing={model.isFetching}
            todos={model.items} 
            onChange={model.updateTodo}
            onDelete={model.deleteTodo}
        />
    );
}

export default observer(Todos);