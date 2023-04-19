/* eslint-disable no-console */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import Task from './task';

export default function TaskList({
  onDelete, onToggleDone, taskData, onAdd, newEditItem, startTimer, stopTimer,
}) {
  TaskList.defaultProps = {
    onDelete: {},
    onToggleDone: {},
    taskData: [],
    onAdd: {},
    newEditItem: {},
    startTimer: {},
    stopTimer: {},
  };
  TaskList.propTypes = {
    onDelete: PropTypes.func,
    onToggleDone: PropTypes.func,
    taskData: PropTypes.arrayOf(PropTypes.shape),
    onAdd: PropTypes.func,
    newEditItem: PropTypes.func,
    stopTimer: PropTypes.func,
    startTimer: PropTypes.func,
  };

  const elements = taskData.map((el) => (
    <Task
      newEditItem={newEditItem}
      key={el.id}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...el}
      onDelete={() => onDelete({ id: el.id })}
      onToggleDone={() => onToggleDone({ id: el.id })}
      startTimer={() => startTimer(el.id)}
      stopTimer={() => stopTimer(el.id)}
      onAdd={onAdd}
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
}
