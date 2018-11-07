import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from './api';

function EditTask(props) {
	function update(ev) {
		let data = {};
		data[target.attr('name')] = ev.target.val();
		props.dispatch({
			type: 'EDIT_EDIT',
			data: data,
		});
	}

	function submit(ev) {
		api.edit_task(props.edit, props.task.id);
	}

	let users = (_.map(props.users, (uu) => 
		<option key={uu.id} value={uu.id}>{uu.name}</option>));


  return (
    <div id="edit-form">
      <h3>Edit Task</h3>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" name="title" onChange={update} defaultValue={props.edit.title}/>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="text" name="description" onChange={update} defaultValue={props.edit.description}/>
      </FormGroup>
      <FormGroup>
        <Label for="status">
          <Input type="checkbox" name="status" onChange={update} defaultValue={props.edit.status}/>
          Status
        </Label>
      </FormGroup>
	  <FormGroup>
        <Label for="time">Time</Label>
        <Input type="number" name="time" min="0" step="15" onChange={update} defaultValue={props.edit.time}/>
      </FormGroup>
      <FormGroup>
        <Label for="user_name">User</Label>
        <Input type="select" name="user_name" onChange={update} defaultValue={props.edit.user_id}>
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
    edit: state.edit,
    users: state.users
  };
}

export default connect(state2props)(EditTask);