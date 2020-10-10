import React, { useState } from 'react';


export default function Form(props) {
  // const [name, setName] = useState('');
  function handleChange(e) {
    console.log('Typing!');
    // setName(e.target.value);
  }

  function addTask(evt) {
    evt.preventDefault();
    let input = document.getElementById('new-todo-input');
    if (input.value.length > 0) {
      props.onSubmit(document.getElementById('new-todo-input').value);
      // setName("");
    } else {
      alert('please enter somethhing');
    }
  }

  return (
    <form onSubmit={addTask}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
          </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
        </button>
    </form>
  );
}