import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api from './api';

function RegistrationForm(props) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_REGISTRATION_FORM',
      data: data
    };
    props.dispatch(action);
  }

  function submit(ev) {
    api.register_user(props.form);
  }

  function cancel() {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
    $("#registration-form").hide();
  }

  return (
    <div id="registration-form">
      <h2>Register</h2>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" value={props.form.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" value={props.form.email} onChange={update} placeholder="user@example.com" />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" value={props.form.password} onChange={update} />
      </FormGroup>
      <Button onClick={submit} color="primary">Submit</Button>
      <Button onClick={cancel} color="primary">Cancel</Button>
    </div>
  );
};

function state2props(state) {
  console.log("STATE");
  console.log(state);
  return {
    form: state.register
  };
}

export default connect(state2props)(RegistrationForm);