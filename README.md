# TaskTracker1

How the app works: 
  * To register, click Register on main page. Enter a name and email.
  * To login in, enter email on main page.
  * After completeing the first two steps, you will be redirected to the tasks page, where you will see:
  	* A list of tasks and their titles, descriptions, status (in progress or done). 
   * If you are a manager, a New Task button will be available for your use. Otherwise, you will not see this button.
  	* Buttons next to each task: start/end, time log, edit, delete. If start is clicked, a start time entry will be created and the button will change to end. When end is clicked, an end time entry will be created. When Time log is clicked, this start and end entry will be shown along with edit and delete functions. If edit is clicked, a form will show up and the time entries can be changed. 
  * The navbar will show the user name, profile, tasks, and logout button, which will take you back to the login page if clicked.
   * The profile button will show the current user his/her manager, the people he/she manages, and a list of all the unmanaged users and the current user's employees with manage buttons. If the manage button is clicked for an employee that is already managed by the current user, the employee will disappear from the Your Employees list. If the manage button is clicked for an employee that is not managed by the current user, the employee will be added to the Your Employees list. 
  * To create a new task, click New Task button. Enter title, description, and a user to assign the task to. Hit save to create task or back if you don't want to create the task anymore.
  * When Edit is clicked, if the logged in user is assigned to the task, he/she will be able to edit the time and check off the status box if completed.
  * However, if the logged in user is not assigned the task, he/she will not be able to see the status checkbox.

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
