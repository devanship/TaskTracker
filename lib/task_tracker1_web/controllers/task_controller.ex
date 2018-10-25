defmodule TaskTracker1Web.TaskController do
  use TaskTracker1Web, :controller

  alias TaskTracker1.Tasks
  alias TaskTracker1.Tasks.Task
  alias TaskTracker1.Manages
  alias TaskTracker1.Timeblocks


  def index(conn, _params) do
    current_user = conn.assigns[:current_user]
    tasks = Tasks.employee_tasks(current_user.id)
    managers = Tasks.manager_ids()
    render(conn, "index.html", tasks: tasks, managers: managers)
  end

  def new(conn, _params) do
    changeset = Tasks.change_task(%Task{})
    render(conn, "new.html", changeset: changeset, form_type: "Create")
  end

  def create(conn, %{"task" => task_params}) do
    case Tasks.create_task(task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task created successfully.")
        |> redirect(to: Routes.task_path(conn, :index))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset, form_type: "Create")
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    managers = Tasks.manager_ids()
    timeblocks = Tasks.get_timelog(task.id)
    render(conn, "show.html", task: task, timeblocks: timeblocks, managers: managers)
  end

  def edit(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    changeset = Tasks.change_task(task)
    current_user = conn.assigns[:current_user]
    render(conn, "edit.html", task: task, changeset: changeset, current_user: current_user, form_type: "Edit")
  end

  def update(conn, %{"id" => id, "task" => task_params}) do
    task = Tasks.get_task!(id)

    case Tasks.update_task(task, task_params) do
      {:ok, task} ->
        conn
        |> put_flash(:info, "Task updated successfully.")
        |> redirect(to: Routes.task_path(conn, :index))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", task: task, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    {:ok, _task} = Tasks.delete_task(task)

    conn
    |> put_flash(:info, "Task deleted successfully.")
    |> redirect(to: Routes.task_path(conn, :index))
  end
end
