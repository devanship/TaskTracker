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
          type: 'TASK_LIST',
          data: resp.data,
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
          type: 'USER_LIST',
          data: resp.data,
        });
      },
    });
  }

  add_task(data) { 
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({token: data.token, task: data}),
      success: (resp) => {
        alert("Task created.");
        store.dispatch({
          type: 'ADD_TASK',
          task: resp.data,
        });
      },
      error: (resp) => {
        alert("Could not create tasks. Please check fields.");
      }
    });
  }

  edit_task(data) {
    $.ajax("/api/v1/tasks/" + data.id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({token: data.token, task: data}),
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  delete_task(data) {
    $.ajax("/api/v1/tasks/" + data, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        alert("Task deleted.");
        store.dispatch({
          type: 'TASK_LIST',
          task: resp.data,
        });
      },
    });
  };

  submit_login(data) {
    $.ajax("/api/v1/session", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
    });
  }

  register_user(data) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user: data}),
      success: (resp) => {
        alert("User registered.");
        store.dispatch({
          type: 'ADD_USER',
          user: resp.data,
        });
      },
    });
  }
}

export default new TheServer();