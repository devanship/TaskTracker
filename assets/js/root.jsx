import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import api from './api';
import UserList from './user_list';
import TaskList from './task_list';
import NewTask from './task_form';
import EditTask from './edit_task';
import Header from './header';
import Register from './register_form'


export default function root_init(store) {

  ReactDOM.render(
     <Provider store={store}>
      <Root state={store.getState()}/>
    </Provider>, document.getElementById('root'),);
}

let Root = connect((state) => state)((props) => {
  return <div>
      <Router>
        <div>
          <Header />
          <div className="row">
            <div className="col-8">
              <Route path="/users" exact={true} render={() =>
                <UserList />
              } />
            </div>
            <div className="col-8">
              <Route path="/tasks" exact={true} render={() =>
                <TaskList />
              } />
            </div>
            <div className="col-8">
              <Route path="/edit/:id" render={({match}) => 
                <EditTask users={props.users} task={_.find(props.tasks, (task) => task.id == match.params.id)} />
              } /> 
            </div>
            <div className="col-8">
              <Route path="/new" exact={true} render={() =>
                <NewTask />
              } />
            </div>
             <div className="col-8">
              <Route path="/register" exact={true} render={() =>
                <Register />
              } />
             </div>
          </div>
        </div>
      </Router>
    </div>
  })