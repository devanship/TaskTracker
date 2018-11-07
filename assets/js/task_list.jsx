import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Row, Col, Button } from 'reactstrap';
import _ from 'lodash';

import api from './api';

// Renders the details of an individual task as a card
function Task(props) {
  let task = props.task;

  // Sends a request to delete the task
  function delete_task() {
    api.delete_task(task.id);
  }

  // Displays the edit form, populates the hidden field with the task id, and
  // clears all other fields
  function edit_task() {
    $("#edit-form").show();
      props.dispatch({
        type: 'CLEAR_FORM',
      });
    $('input[name="id"]').val(task.id);
  }

  // Returns the task details as a Bootstrap card element
  return (
    <Col md="6">
      <Card>
        <CardHeader>
          <Row>
            <Col md="7">
              {task.title}
            </Col>
            <Col md="5">
              <Button type="button" onClick={edit_task}>Edit</Button>
              <Button type="button" onClick={delete_task}>Delete</Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div>
            {assign}
            <p><b>Status: </b>{task.status ? "Yes" : "No"}</p>
            <p><b>Minutes Spent: </b>{task.time}</p>
            <p><b>Description: </b>{task.description}</p>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

// function Task(props) {
//   let {root, task} = props;
//   return <div className="card col-4">
//     <div className="task-body">
//       <h2 className="task-title">{task.title}</h2>
//       <p className="task-text">
//         {task.description} <br />
//         status: {task.status} <br />
//         time: {task.time} <br />
//         user: {task.user} <br />
//       </p>
//       <p className="form-inline">
//         <button className="btn btn-primary"
//                 onClick={() => root.add_task(task.id)}>
//           Add Task
//         </button>
//       </p>
//     </div>
//   </div>;
// }