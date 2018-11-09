// Adapted from Nat's lecture notes
import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state0 = [], action) {
  switch (action.type) {
  case 'TASK_LIST':
    return action.data;
  default:
    return state0;
  }
}

function users(state0 = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return action.data;
  default:
    return state0;
  }
}

// Taken from Prof. Tuck's notes from last year
let empty_form = {
  user_id: "",
  title: "",
  description: "",
  time: 0,
  status: false,
  token: "",
};

function form(state0 = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_TASK':
      return Object.assign({}, state0, action.data);
    case 'CLEAR_TASK':
      let cleared = {
        title: "",
        description: "",
        time: 0,
        status: false
      }
      return Object.assign({}, state0, cleared);
    case 'SET_TOKEN':
      let session = {
        token: action.token.token,
        user_id: action.token.user_id
      }
      return Object.assign({}, state0, session);
    case 'DESTROY_TOKEN':
      return empty_form;
    default:
      return state0;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'DESTROY_TOKEN':
      return null;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  password: "",
};

function login(state0 = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state0, action.data);
    case 'DESTROY_TOKEN':
      return empty_login;
    default:
      return state0;
  }
}

let empty_register = {
  email: "",
  name: "",
  password: ""
}

function register(state0 = empty_register, action) {
  switch (action.type) {
    case 'UPDATE_REGISTRATION_FORM':
      return Object.assign({}, state0, action.data);
    case 'CLEAR_FORM':
      return empty_register;
    default:
      return state0;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, users, form, token, login, register});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;