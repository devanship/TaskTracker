import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api from './api';

function TaskForm(props) {
  function update(ev) {
    let target = $(ev.target);
    let data = {};
    if (target.attr('name') == "status") {
      data['status'] = target.is(':checked') ? true : false;
    }
    else {
      data[target.attr('name')] = target.val();
    }
    let action = {
      type: 'UPDATE_TASK',
      data: data
    };
    props.dispatch(action);
  }
  function submit(ev) {
    api.add_task(props.form);

  }

  let users = (_.map(props.users, (uu) =>
    <option key={uu.id} value={uu.id}>{uu.name}</option>));

  return (
    <div>
      <h2>New Task</h2>
      <FormGroup>
        <Label for="user_id">User</Label>
        <Input type="select" name="user_id" onChange={update}>
          {users}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="title">
          Title
        </Label>
        <Input type="text" name="title" onChange={update} />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" onChange={update} />
      </FormGroup>
      <FormGroup>
        <Label for="time">Increments of 15</Label>
        <Input type="number" name="time" min="0" step="15" onChange={update} />
      </FormGroup>
      <FormGroup check>
        <Label check>
        <Input type="checkbox" name="status" onChange={update} />
          Status
        </Label>
      </FormGroup>
      <br />
      <Button onClick={submit} color="primary">Submit</Button>
    </div>
  );
};

function state2props(state) {
  return {
    form: state.form,
    users: state.users
  };
}

export default connect(state2props)(TaskForm);