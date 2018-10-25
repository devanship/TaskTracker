defmodule TaskTracker1Web.ManageController do
  use TaskTracker1Web, :controller

  alias TaskTracker1.Manages
  alias TaskTracker1.Manages.Manage

  def index(conn, _params) do
    manages = Manages.list_manages()
    render(conn, "index.html", manages: manages)
  end

  def new(conn, _params) do
    changeset = Manages.change_manage(%Manage{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"manage" => manage_params}) do
    case Manages.create_manage(manage_params) do
      {:ok, manage} ->
        conn
        |> put_flash(:info, "Manage created successfully.")
        |> redirect(to: Routes.manage_path(conn, :show, manage))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    manage = Manages.get_manage!(id)
    render(conn, "show.html", manage: manage)
  end

  def edit(conn, %{"id" => id}) do
    manage = Manages.get_manage!(id)
    changeset = Manages.change_manage(manage)
    render(conn, "edit.html", manage: manage, changeset: changeset)
  end

  def update(conn, %{"id" => id, "manage" => manage_params}) do
    manage = Manages.get_manage!(id)

    case Manages.update_manage(manage, manage_params) do
      {:ok, manage} ->
        conn
        |> put_flash(:info, "Manage updated successfully.")
        |> redirect(to: Routes.manage_path(conn, :show, manage))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", manage: manage, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    manage = Manages.get_manage!(id)
    {:ok, _manage} = Manages.delete_manage(manage)

    conn
    |> put_flash(:info, "Manage deleted successfully.")
    |> redirect(to: Routes.manage_path(conn, :index))
  end
end
