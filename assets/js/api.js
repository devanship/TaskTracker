import store from './store';

class TheServer {
  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
      	store.dispatch({
      		type: 'TASKS_LIST',
          	tasks: resp.data,
      	});
      },
    });
  }

  fetch_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        store.dispatch({
      		type: 'USERS_LIST',
          	users: resp.data,
      	});
      },
    });
  }

  // create_session(email, password) {
  //   $.ajax("/api/v1/sessions", {
  //     method: "post",
  //     dataType: "json",
  //     contentType: "application/json; charset=UTF-8",
  //     data: JSON.stringify({email, password}),
  //     success: (resp) => {
  //       let state1 = _.assign({}, this.state, { session: resp.data, email: "", password: ""});
  //       this.setState(state1);
  //     }
  //   });
  // }

  create_session(email, password) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    });
  }

  send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  add_task(task) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(task),
      success: (resp) => {
        store.dispatch({
          type: 'ADD_TASK',
          data: resp.data,
        }); 
      },
    });
  }

  edit_task(task, id) {
    $.ajax("/api/v1/tasks/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(task),
      success: (resp) => {
        store.dispatch({
          type: 'EDIT_TASK',
          data: resp.data,
        }); 
      },
    });
  }

  delete_task(task) {
    $.ajax("/api/v1/tasks/", {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(task),
      success: (resp) => {
        store.dispatch({
          type: 'DELETE_TASK',
          data: resp.data,
        }); 
      },
    });
  }

  submit_login(login) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(login),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          data: resp.data,
        }); 
      },
    });
  }

  register_user(register) {
    $.ajax("/api/v1/user", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(register),
      success: (resp) => {
        store.dispatch({
          type: 'NEW_USER',
          data: resp.data,
        }); 
      },
    });
  }
}

export default new TheServer();