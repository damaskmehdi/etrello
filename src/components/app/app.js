import React from 'react';

import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

const App = () => {
  const isLoggedIn = true;
  const loginBox = <span>log in please</span>;
  const welcomeBox = <span>Welcome back</span>;

  const todoStat = {
    toDo: 1,
    done: 3
  };
  const todoData = [
    { label: 'Learn React', important: false, id: 1 },
    { label: 'Build App', important: true, id: 2 },
    { label: 'Have a lunch', important: false, id: 3 }
  ];


  return (
    <div>
      <div>
        { isLoggedIn ? welcomeBox : loginBox }
      </div>
      <AppHeader toDo={todoStat.toDo} done={todoStat.done} />
      <SearchPanel />
      <ItemStatusFilter />
      <TodoList todos={todoData}/>
    </div>
  );
}

export default App;