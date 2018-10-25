defmodule TaskTracker1Web.UserController do
  use TaskTracker1Web, :controller

  alias TaskTracker1.Users
  alias TaskTracker1.Users.User
  alias TaskTracker1.Manages.Manage

  def index(conn, _params) do
    current_user = conn.assigns[:current_user]
    users = Users.list_users()
    manages = TaskTracker1.Tasks.manages_map(current_user.id)
    manager = TaskTracker1.Users.get_manager(current_user.id)
    employees = TaskTracker1.Users.get_employees(current_user.id)
    unmanaged = TaskTracker1.Users.get_unmanaged(current_user.id)
    render(conn, "index.html", users: users, users: users, manages: manages, manager: manager, employees: employees, unmanaged: unmanaged)
  end

  def new(conn, _params) do
    changeset = Users.change_user(%User{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"user" => user_params}) do
    case Users.create_user(user_params) do
      {:ok, user} ->
        conn
        |> IO.inspect
        |> put_flash(:info, "User created successfully.")
        |> put_session(:user_id, user.id)
        |> redirect(to: Routes.task_path(conn, :index))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.html", user: user)
  end

  def edit(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    changeset = Users.change_user(user)
    render(conn, "edit.html", user: user, changeset: changeset)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    case Users.update_user(user, user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "User updated successfully.")
        |> redirect(to: Routes.user_path(conn, :show, user))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", user: user, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    {:ok, _user} = Users.delete_user(user)

    conn
    |> put_flash(:info, "User deleted successfully.")
    |> redirect(to: Routes.user_path(conn, :index))
  end
end
