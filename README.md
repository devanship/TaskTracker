# TaskTracker1

How the app works: 
  * To register, click Register on main page. Enter a name and email.
  * To login in, enter email on main page.
  * After completeing the first two steps, you will be redirected to the tasks page, where you will see:
  	* A list of tasks and their titles, descriptions, status (in progress or done), how much time it took (incrememnts of 15), ajd the assigned user
  	* Three buttons, show, edit, or delete, which do their respective actions.
  * The navbar will show the user name and a logout button, which will take you back to the login page if clicked.
  * To create a new task, click New Task button. Enter title, description, and a user to assign the task to. Hit save to create task or back if you don't want to create the task anymore. 
  * When you hit Save, the created task will be shown. You can click edit to edit the task or back to return to the task list page. 
  * When Edit is clicked, if the logged in user is assigned to the task, he/she will be able to edit the time and check off the status box if completed.
  * However, if the logged in user is not assigned the task, he/she will not be able to see a time input box or the status checkbox.
  * Any user has the ability to change the assigned user to a task. Therefore, if someone wants to mark a task as done or change the time, he/she will have to change the assigned user to himself/herself. 

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
