defmodule TaskTracker1.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias TaskTracker1.Repo

  alias TaskTracker1.Users.User
  alias TaskTracker1.Manages.Manage

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_user(id), do: Repo.get(User, id)
  
  def get_user_by_email(email) do
    Repo.get_by(User, email: email)
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  #Gets given user's manager from Manage data
  #https://hexdocs.pm/ecto/Ecto.Query.html
  def get_manager(user_id)  do
    Repo.all(from u in User,
      join: m in Manage, where: u.id == m.manager_id, where: m.employee_id == ^user_id, select: {u.id, u.name, u.email})
  end

  #Gets given user's employees
  def get_employees(user_id) do
    Repo.all(from m in Manage, join: u in User, where: m.employee_id == u.id, where: m.manager_id == ^user_id, 
      select: {u.id, u.name, u.email})
  end

  #Gets all users without managers
  def get_unmanaged(user_id) do
    query = Repo.all(from m in Manage, select: m.employee_id)
    unmanaged = Repo.all(from u in User, where: not u.id in ^query, select: {u.id, u.name, u.email})
    employees = get_employees(user_id)
    Enum.concat(unmanaged, employees)
  end
end
