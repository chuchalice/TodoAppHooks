/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-unused-class-component-methods */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewTaskForm({ onAdd }) {
  NewTaskForm.defaultProps = {
    onAdd: {},
  };

  NewTaskForm.propTypes = {
    onAdd: PropTypes.func,
  };

  const [todoValue, setTodoValue] = useState('');
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  function inputValueHandler(e) {
    setTodoValue(e.target.value);
  }

  function addNewTodoHandler(e) {
    e.preventDefault();
    const minValue = document.querySelector('.min');
    const secValue = document.querySelector('.sec');
    minValue.value = '';
    secValue.value = '';
    onAdd({ taskText: todoValue, min, sec });
    setTodoValue('');
    setMin(0);
    setSec(0);
  }

  function secValueHandler(e) {
    setSec(+e.target.value);
  }

  function minValueHandler(e) {
    setMin(+e.target.value);
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form
        onSubmit={(e) => addNewTodoHandler(e)}
        className="new-todo-form"
      >
        <input
          className="new-todo"
          placeholder="What needs to be done?"
            //
          value={todoValue}
          onChange={(e) => inputValueHandler(e)}
        />
        <input type="submit" hidden />
        <input type="number" onChange={(e) => minValueHandler(e)} className="new-todo-form__timer min" placeholder="Min" />
        <input type="number" onChange={(e) => secValueHandler(e)} className="new-todo-form__timer sec" placeholder="Sec" />
      </form>
    </header>
  );
}
