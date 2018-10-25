// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"
import jQuery from 'jquery';
window.jQuery = window.$ = jQuery; // Bootstrap requires a global "$" object.
import "bootstrap";
import _ from "lodash";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

$(function () {
   $('.manage-btn').click((ev) => {
      var text = $(this).text();
      console.log(text);
      let user_id = $(ev.target).data('user-id');
      let manager_id = $(ev.target).data('manage');

      if(manager_id != "") {
        console.log(manage_path)
          $.ajax(manage_path + "/" + manager_id, {
          method: "delete",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify({_csrf_token: window.csrfToken}),
          success: () => {$(ev.target).text('Manage');
            $('.manage-btn').each((_,btn) => {
              if(user_id == $(btn).data('user-id')) {
                $(btn).data('manage', "");
              }
            });
          },
        });
      } else {
        let text = JSON.stringify({
            _csrf_token: window.csrfToken,
            manage: {
              manager_id: current_user_id,
              employee_id: user_id
            },
          });

        $.ajax(manage_path, {
          method: "post",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: text,
          success: (resp) => {$(ev.target).text('Unmanage');
            $('.manage-btn').each((_,btn) => {
              if(user_id == $(btn).data('user-id')) {
                $(btn).data('manage', resp.data.id);
              }
            });
          },
        });
      }
      if (text == 'Manage') {
        $(this).text('Unmanage');
      }
      else if(text == 'Unmanage') {
        $(this).text('Manage');
      }

      location.reload();
   });
 });

var START_TIME = "";
var TIME_ID = "";

$(function () {
  $('.time-btn').click((ev) => {
    let btn = $(ev.target);
    let type = btn.data('type');
    let task_id = btn.data('task-id');
    let time = btn.data('time');
    let time_id = btn.data('time-id');
    if (type === "Start") {
      START_TIME = time;
        let text = JSON.stringify({
        timeblock: {
          start: time,
          end: null,
          task_id: task_id
        },
      });
      $.ajax(timeblock_path, {
        method: "post",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: text,
        success: (resp) => {
          TIME_ID = resp.data.id;
          $('.time-btn').each((_, btn) => {
            if (task_id == $(btn).data('task-id') && $(btn).data('type') === "Start") {
              $(btn).data('clicked', "Yes");
            }
          });
        },
        error: (resp) => { console.log(resp); }
      });


    } else if (type == "End") {
      if (TIME_ID == "") {
        alert("You haven't started the task yet.");
      }

      else {
        let text = JSON.stringify({
          timeblock: {
            start: START_TIME,
            end: time
          },
        });

        $.ajax(timeblock_path + "/" + TIME_ID, {
          method: "put",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: text,
          success: (resp) => { 
            $('.time-btn').each((_, btn) => {
              if (task_id == $(btn).data('task-id') && $(btn).data('type') === "Start") {
                $(btn).data('clicked', "No");
                TIME_ID = "";
              }
            });
          },
          error: (resp) => { console.log(resp); }
        });
      }
    } else if (type == "Edit") {
      let start_time = btn.data('start-time');
      let end_time = btn.data('end-time');
      let text = JSON.stringify({
        timeblock: {
          start: start_time,
          end: end_time,
          convert: true
        },
      });

      $.ajax(timeblock_path + "/" + time_id, {
        method: "put",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: text,
        success: (resp) => { 
          $('.time-btn').each((_, btn) => {
            if (task_id == $(btn).data('task-id') && $(btn).data('type') === "Start") {
              $(btn).data('clicked', "No");
              TIME_ID = "";
            }
          });
        },
        error: (resp) => { console.log(resp); }
      });
    } else {
      $.ajax(timeblock_path + "/" + time_id, {
        method: "delete",
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        data: "",
        success: () => { 
          $('.time-btn').each( (_, btn) => {
            if (task_id == $(btn).data('task-id') && $(btn).data('type') === "Start") {
              $(btn).data('clicked', "No");
              TIME_ID = "";
            }
          });
        },
      });
      location.reload();
    }
  })
})