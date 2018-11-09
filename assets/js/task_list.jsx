import React from 'react';
import { connect } from 'react-redux';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';

import api from './api';

function TaskList(props) {
  let {root, tasks, dispatch} = props;
  let tks = _.map(tasks, (tt) =>
    <Task root={root} key={tt.id} task={tt} dispatch={dispatch} />);
  return <div className="row">
    {tks}
  </div>;
}

function Task(props) {
  let {task, root, dispatch} = props;
  function changed(ev) {
    dispatch({
      task_id: task.id,
    });
  }

  let status;
  if (task.status) {
    status = <p>Done</p>
  } else {
    status = <p>In Progress</p>
  }

  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-text">
        Description: {task.description} <br />
        User: {task.user} <br />
        Time: {task.time} <br />
        Status: {status} <br />
      </p>
      <div className="col">
          <Link to={"/edit/" + task.id}>Edit</Link>
      </div>
      <Link to={"/tasks"} onClick={() => api.delete_task(task.id)}>Delete</Link>
    </div>
  </div>;
}

function state2props(state) {
  console.log("render TaskList", state);

  return {
    tasks: state.tasks,
  };
}

export default connect(state2props)(TaskList);