import React, { Component } from 'react';

import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddListItem from '../add-list-item';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Learn React'),
      this.createTodoItem('Build App'),
      this.createTodoItem('Have a lunch')
    ],
    filterText: '',
    filter: 'all', // active, all, done
  };

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      done:false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newTodoData
      }
    });
  }

  onItemAdded = (text) => {
    this.setState(({ todoData }) => {
      const todoDataNew = [
        ...todoData,
        this.createTodoItem(text)
      ];

      return {
        todoData: todoDataNew
      }
    });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    }

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
  }

  search(items, filterText) {
    if (filterText.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;

      case 'active':
        return items.filter((item) => {
          return !item.done;
        });

      case 'done':
        return items.filter((item) => {
          return item.done;
        });

      default:
        return items;
    }
  }

  onSearchChange = (filterText) => {
    this.setState({
      filterText
    });
  }

  onFilterChange = (filter) => {
    this.setState({
      filter
    });
  }

  render() {
    const { todoData, filterText, filter } = this.state;

    const visibleItems = this.filter(
      this.search(todoData, filterText),
      filter
    ) ;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="main-div">
        <AppHeader toDo={ todoCount } done={ doneCount  } />
        <div className="filter-div">
          <SearchPanel
            onSearchChange={ this.onSearchChange } />
          <ItemStatusFilter
            filter={ filter }
            onFilterChange={ this.onFilterChange } />
        </div>
        <TodoList todos={ visibleItems }
                  filterText={ filterText }
                  onDeleted={ this.deleteItem }
                  onToggleImportant={ this.onToggleImportant }
                  onToggleDone={ this.onToggleDone } />
        <AddListItem
          onItemAdded={ this.onItemAdded } />
      </div>
    );
  }
}
