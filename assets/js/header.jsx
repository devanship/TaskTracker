import React from 'react';
import { Link } from 'react-router-dom';
import api from './api';
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