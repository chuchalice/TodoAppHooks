/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */

import {
  React, useState, useEffect, useRef,
} from 'react';
// import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// eslint-disable-next-line import/no-extraneous-dependencies
import Footer from './footer';
import NewTaskForm from './new-task-form';
import TaskList from './task-list';

let newId = 100;
export default function ToDo() {
  // constructor() {
  //   super();
  //   this.state = {
  //     todoData: [],
  //     filterSelected: 'all',
  //     min: 0,
  //     sec: 0,
  //   };
  // }

  const [todoData, setToDoData] = useState([]);
  const [filterSelected, setFilter] = useState('all');

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    const newData = todoData.map((el) => {
      if (!el.pause && el.time > 0) {
        el.time -= 1;
      }
      return el;
    });
    setToDoData(newData);
  }, 1000);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newData = todoData.map((el) => {
  //       if (!el.pause && el.time > 0) {
  //         el.time -= 1;
  //       }
  //       return el;
  //     });
  //     setToDoData(newData);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // // eslint-disable-next-line react-hooks/esxhaustive-deps
  // }, []);

  function createTodoItem(label, min, sec) {
    return {
      pause: false,
      time: min * 60 + sec,
      label,
      id: newId++,
      done: false,
      created: `${formatDistanceToNow(new Date())}`,
      editing: false,
    };
  }

  function deleteItem(id) {
    const newArr = todoData.filter((el) => el.id !== id);
    setToDoData(newArr);
  }

  function addItem({ taskText, min, sec }) {
    const newItem = createTodoItem(taskText, min, sec);

    const newArr = [newItem, ...todoData];
    setToDoData(newArr);
  }

  function startTimer(id) {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, pause: false };
    const newArr = [
      ...todoData.slice(0, idx),
      newItem,
      ...todoData.slice(idx + 1),
    ];
    setToDoData(newArr);
  }

  function stopTimer(id) {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, pause: true };
    const newArr = [
      ...todoData.slice(0, idx),
      newItem,
      ...todoData.slice(idx + 1),
    ];
    setToDoData(newArr);
  }

  function onToggleDone(id) {
    console.log(id);
    const idx = todoData.findIndex((el) => el.id === id);

    const oldItem = todoData[idx];
    const newItem = { ...oldItem, done: !oldItem.done, pause: !oldItem.pause };

    const newArr = [
      ...todoData.slice(0, idx),
      newItem,
      ...todoData.slice(idx + 1),
    ];
    setToDoData(newArr);
  }

  function todoFilter(status) {
    setFilter(status);
  }

  function clearCompleted() {
    const newArr = todoData.filter((el) => !el.done);
    setToDoData(newArr);
  }

  function newEditItem(id, value) {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, label: value };
    const newArr = [
      ...todoData.slice(0, idx),
      newItem,
      ...todoData.slice(idx + 1),
    ];
    setToDoData(newArr);
  }

  // function getMinSec({ min, sec }) {
  //   setTime(() => ({
  //     min,
  //     sec,
  //   }));
  // }

  // const {
  //   todoData, filterSelected, min, sec,
  // } = this.state;
  const doneCount = todoData.filter((el) => !el.done).length;
  let filteredArr = [];
  if (
    typeof filterSelected === 'string'
      && filterSelected.toLowerCase() === 'all'
  ) {
    filteredArr = todoData;
  } else if (filterSelected) {
    filteredArr = todoData.filter((el) => el.done);
  } else {
    filteredArr = todoData.filter((el) => !el.done);
  }
  return (
    <section className="todoapp">
      <NewTaskForm onAdd={(data) => addItem(data)} />
      <section className="main">
        <TaskList
          taskData={filteredArr}
          onDelete={({ id }) => deleteItem(id)}
          onToggleDone={({ id }) => onToggleDone(id)}
            // onEdit={this.onEdit}
          onAdd={(data) => addItem(data)}
          newEditItem={newEditItem}
          startTimer={(id) => startTimer(id)}
          stopTimer={(id) => stopTimer(id)}
        />
        <Footer
          doneCount={doneCount}
          clearCompleted={() => clearCompleted()}
          todoFilter={(status) => todoFilter(status)}
          filterSelected={filterSelected}
        />
      </section>
    </section>
  );
}

// ToDo.defaultProps = {
//   min: 0,
// };
// ToDo.propTypes = {
//   min: PropTypes.number,
// }
