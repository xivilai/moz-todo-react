import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];

const FILTERS = [
  { id: "filter-0", name: "Active", ariaPressed: "true" },
  { id: "filter-1", name: "All", ariaPressed: "false" },
  { id: "filter-2", name: "Completed", ariaPressed: "false" }
]

ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} filters={FILTERS} />
  </React.StrictMode>,
  document.getElementById('root')
);