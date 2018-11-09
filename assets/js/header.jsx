import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import Register from './register_form'
import api from './api';

// Taken for Prof. Tuck's notes from last year - https://github.com/NatTuck/microblog-spa/blob/lec20-end/assets/js/cs/nav.jsx
let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="email" placeholder="email"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" placeholder="password"
               value={props.login.password} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
      <NavLink to="/register" activeClassName="active" className="nav-link">Register</NavLink>
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {
  function destroy_token() {
    props.dispatch({
      type: 'DESTROY_TOKEN'
    });
  }

  return (
    <div className="navbar-text">
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to={"/tasks"} onClick={() => api.fetch_tasks()} exact={true} activeClassName="active" className="nav-link">All Tasks</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={"/new"} activeClassName="active" className="nav-link">Create Task</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" onClick={() => api.fetch_users()} className="nav-link">All Users</NavLink>
        </NavItem>
        <NavItem>
          <a href="javascript:void(0)" onClick={destroy_token}>Log Out</a>
        </NavItem>
      </ul>
  </div>
  );
});

function Header(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Task Tracker
      </span>
      { session_info }

    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Header);


// import React from 'react';
// import { Link } from 'react-router-dom';
// import api from './api';
// function HeaderLoggedOut(props) {
//   let {root, password, email} = props;
//   return <div className="row my-2">
//     <div className="col-4">
//       <h1><Link to={"/"}>Task Tracker 3</Link></h1>
//     </div>
//     <div className="col-6">
//       <form id="login" className="form-inline my-2" onSubmit={root.onLogin.bind(root)}>
//         <input type="email" value={email} placeholder="email" onChange={root.updateEmail.bind(root)}/>
//         <input type="password" value={password} placeholder="password" onChange={root.updatePass.bind(root)}/>
//         <input type="submit" value="Login" className="btn btn-secondary"/>
//       </form>
//     </div>
//   </div>;
// }

// function HeaderLoggedIn(props) {
//   let {root, email} = props;
//   return <div className="row my-2">
//     <div className="col-4">
//       <h1><Link to={"/"}>Task Tracker 3</Link></h1>
//     </div>
//     <div className="col-2">
//       <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
//       <p><Link to={"/tasks"} onClick={root.fetch_tasks.bind(root)}>Tasks</Link></p>
//     </div>
//     <div className="col-6">
//       {props.email}
//     </div>
//   </div>;
// }