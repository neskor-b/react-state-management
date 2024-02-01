import React from 'react';
import { observer } from "mobx-react-lite"

// components
import Layout from 'shared/components/Layout';

// components
import CreateTodo from 'apps/Mobx/components/CreateTodo';
import Todos from 'apps/Mobx/components/Todos';
import Filter from 'apps/Mobx/components/Filter';
import Pagination from 'apps/Mobx/components/Pagination';



const App = () => {
    return (
        <Layout>
            <Layout.App>
                <CreateTodo />
                <Filter/>
                <Todos />
                <Pagination />
            </Layout.App>
            <Layout.Widget>
                widget
            </Layout.Widget>
        </Layout>
    );
}

export default observer(App);