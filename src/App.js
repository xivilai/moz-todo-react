import React, { useState, useRef, useEffect } from 'react';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import Todo from './components/Todo';
import { nanoid } from 'nanoid';

const FILTER_MAP = {
  'All': () => true,
  'Active': task => !task.completed,
  'Completed': task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
      ref.current = value;
  });
  return ref.current;
}

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task =>
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
      key={task.id}
    />
  );

  const filterList = props.filters.map(f =>
    <FilterButton
      filterName={f.name}
      isPressed={f.name === filter}
      setFilter={setFilter}
      key={f.name}
    />
  );

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTasksList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (task.id === id) {
        task.name = newName;
      }
      return task;
    });
    setTasks(editedTasksList);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const tasksHeading = `${taskList.length} ${tasksNoun} remaining`;

  useEffect(() => {
    let taskWasDeleted = tasks.length - prevTaskLength === -1;
    if (taskWasDeleted) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength])

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form onSubmit={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {tasksHeading}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
