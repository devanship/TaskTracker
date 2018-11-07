import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from './api';

function TaskForm(props) {
	function update(ev) {
		let data = {};
		data[target.attr('name')] = ev.target.val();
		props.dispatch({
			type: 'EDIT_NEW',
			data: data,
		});
	}

	function submit(ev) {
		api.add_task(props.new_task);
	}

	let users = (_.map(props.users, (uu) => 
		<option key={uu.id} value={uu.id}>{uu.name}</option>));


  return (
    <div>
      <h3>New Task</h3>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" name="title" onChange={update}/>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="text" name="description" onChange={update}/>
      </FormGroup>
      <FormGroup>
        <Label for="status">
          <Input type="checkbox" name="status" onChange={update}/>
          Status
        </Label>
      </FormGroup>
	  <FormGroup>
        <Label for="time">Time</Label>
        <Input type="number" name="time" min="0" step="15" onChange={update}/>
      </FormGroup>
      <FormGroup>
        <Label for="user_name">User</Label>
        <Input type="select" name="user_name" onChange={update}>
          <option />
          {users}
        </Input>
      </FormGroup>
      <Button onClick={submit} color="primary">Submit</Button>
    </div>
  );
}

function state2props(state) {
  console.log("rerender", state);
  return {
    new_task: state.new_task,
    users: state.users
  };
}

export default connect(state2props)(TaskForm);

