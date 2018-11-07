import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';


function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return Object.assign({}, state, action.data);
    case 'CLEAR_TOKEN':
      return null;
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USER_LIST':
    return [...action.data];
  default:
    return state;
  }
}

let emptyRegisterForm = { 
	name: "", 
	email: "", 
	password: "" 
};

function add_user(state = emptyRegisterForm, action) {
	switch (action.type) {
		case 'EDIT_USER':
			return Object.assign({}, state, action.data);
		default:
      		return state;
	}
}

let emptyLoginForm = {
	email: "", 
	password: "" 
};

function login_user(state = emptyLoginForm, action) {
	switch (action.type) {
		case 'LOGIN_USER':
			return Object.assign({}, state, action.data);
		default:
      		return state;
	}
}

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.data];
   case 'ADD_TASK':
   	return [action.data, ...state];
   case 'EDIT_TASK':
   	return _.map(state, (task) => {
   		if (task.id == action.data.id) {
   			return action.data;
   		} else {
   			return task;
   		}
   	});
  default:
    return state;
  }
}

let emptyTaskForm = {
	title: "",
	description: "",
	status: false,
	time: 0,
	user: null
};

function new_task(state = emptyTaskForm, action) {
	switch (action.type) {
		case 'EDIT_NEW':
			return Object.assign({}, state, action.data);
		default:
      		return state;
	}
}

function edit(state = emptyTaskForm, action) {
	switch (action.type) {
		case 'EDIT_EDIT':
			return Object.assign({}, state, action.data);
		default:
      		return state;
	}
}


// function session(state = null, action) {
//   switch (action.type) {
//   case 'NEW_SESSION':
//     return action.data;
//   default:
//     return state;
//   }
// }

// function add_item_forms(state = new Map(), action) {
//   switch (action.type) {
//   case 'UPDATE_ADD_CART_FORM':
//     let state1 = new Map(state);
//     state1.set(action.product_id, action.count);
//     return state1;
//   default:
//     return state;
//   }
// }

function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, new_task, edit, users, add_user, login_user, token});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;