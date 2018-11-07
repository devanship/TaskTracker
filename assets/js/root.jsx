import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';
import UserList from './user_list';
import TaskList from './task_list';
import Header from './header';
import api from './api';
import TaskForm from './task_form';
import EditTask from './edit_task';
import RegistrationForm from './login_form';
import Login from './login';
import { Row } from 'reactstrap';


export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tracker state={store.getState()}/>
    </Provider>,
    document.getElementById('root'),
  );
}

function Dashboard(props) {
  // Tasks assigned to the user
  let assigned = _.map(props.tasks, function(tt) {
    if (props.user == tt.user.id) {
      return <Task key={tt.id} task={tt} id={tt.id} type={"self"} />;
    }
  });
  // Tasks created by the user and assigned to other users
  let created = _.map(props.tasks, function(tt) {
    <Task key={tt.id} task={tt} id={tt.id} type={"other"} />;
  });

  return (
    <div>
      <Route path="/" exact={true} render={() =>
        <EditTask />
      } />
    </div>
  );
}

function Main(props) {
  return (
    <div>
      <Route path="/" exact={true} render={() =>
        <Dashboard tasks={props.tasks} user={props.user} />
      } />
      <Route path="/tasks" exact={true} render={() =>
        <TaskForm />
      } />
    </div>
  );
}

let Tracker = connect((state) => state)((props) => {
  // Choose what to render depending on whether or not the user is logged in
  
 return (
    <Router>
      <div>
        <Route path="/register" exact={true} render={() =>
          <RegistrationForm />
        } />
        <Route path="/login" exact={true} render={() =>
          <Login />
        } />
        <Route path="/tasks" exact={true} render={() =>
          <TaskList tasks={props.tasks} />
        } />
        <Route path="/edit/:id" render={({match}) => 
          <EditForm users={props.users} task={_.find(props.tasks, (task) => task.id == match.params.id)} />
        } /> 
        <Route path="/new" exact={true} render={() =>
          <TaskForm users={props.users}/>
        } />
      </div>
    </Router>
  );
})

// class Root extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tasks: props.tasks,
//       users: [],
//       task: [],
//       session: null,
//       email: "",
//       password: "",
//     };

//     api.create_session();
//     api.fetch_tasks();
//     api.fetch_users();
//   }

//   onLogin(e) {
//     e.preventDefault();
//     api.create_session(this.state.email, this.state.password);
//   }

//   updateEmail(e) {
//     e.preventDefault();
//     this.setState({
//       email: e.target.value
//     })
//   }

//   updatePass(e) {
//     e.preventDefault();
//     this.setState({
//       password: e.target.value
//     })
//   }

//   render() {
//     let header = <HeaderLoggedOut root={this} email={this.state.email} password={this.state.password}/>;
//     if(this.state.session) {
//       header = 
//       <div>
//           <HeaderLoggedIn root={this} email={this.state.session.user.data.email}/>
//           <Route path="/tasks" exact={true} render={() =>
//             <TaskList root={this} tasks={this.state.tasks} />
//           } />
//           <Route path="/users" exact={true} render={() =>
//             <UserList users={this.state.users}/>
//           } />
//       </div>
//     }

//     return <div>
//       <Router>
//         {header}
//       </Router>
//     </div>;
//   }
// }

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

// render() {
//     return <div>
//       <Router>
//         <div>
//           <Header root={this} />
//           <div className="row">
//             <div className="col-8">
//               <Route path="/tasks" exact={true} render={() =>
//                 <TaskList root={this}
//                              tasks={this.state.tasks}/>
//               } />
//               <Route path="/users" exact={true} render={() =>
//                 <UserList users={this.state.users} />
//               } />

//             </div>
//           </div>
//         </div>
//       </Router>
//     </div>;
//   }
// }
// function Header(props) {
//   let {root} = props;

//   let session_view = <div className="form-inline my-2">
//     <input id="login-email" type="email" placeholder="email" />
//     <input id="login-pass" type="password" placeholder="password" />
//     <button className="btn btn-secondary">Login</button>
//     <Route path="/register" exact={true} render={() =>
//           <Register />
//     } />
//   </div>;

//   return <div className="row my-2">
//     <div className="col-4">
//       <h1><Link to={"/"} onClick={root.fetch_tasks.bind(root)}>Task Tracker</Link></h1>
//     </div>
//     <div className="col-2">
//       <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
//     </div>
//     <div className="col-2">
//       <p><Link to={"/tasks"} onClick={root.fetch_tasks.bind(root)}>Tasks</Link></p>
//     </div>
//     <div className="col-6">
//     </div>
//   </div>;
// }