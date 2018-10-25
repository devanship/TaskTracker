defmodule TaskTracker1.Tasks do
  @moduledoc """
  The Tasks context.
  """

  import Ecto.Query, warn: false
  alias TaskTracker1.Repo

  alias TaskTracker1.Tasks.Task
  alias TaskTracker1.Manages.Manage
  alias TaskTracker1.Users.User
  alias TaskTracker1.Timeblocks
  alias TaskTracker1.Timeblocks.Timeblock

  @doc """
  Returns the list of tasks.

  ## Examples

      iex> list_tasks()
      [%Task{}, ...]

  """
  # https://hexdocs.pm/ecto/Ecto.Query.html#preload/3
  def list_tasks do
    Repo.all(Task)
    |> Repo.preload(:user)
  end

  @doc """
  Gets a single task.

  Raises `Ecto.NoResultsError` if the Task does not exist.

  ## Examples

      iex> get_task!(123)
      %Task{}

      iex> get_task!(456)
      ** (Ecto.NoResultsError)

  """

  # https://hexdocs.pm/ecto/Ecto.Query.html#preload/3
  def get_task!(id), do: 
    Repo.get!(Task, id)
    |> Repo.preload(:user)

  @doc """
  Creates a task.

  ## Examples

      iex> create_task(%{field: value})
      {:ok, %Task{}}

      iex> create_task(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_task(attrs \\ %{}) do
    task = %Task{}
    |> Task.changeset(attrs)
    |> Repo.insert()

    if(elem(task, 0) != :error) do
      id = elem(task, 1).id
      timeblock = %{}
      |> Map.put("start", attrs["starts"])
      |> Map.put("end", attrs["end"])
      |> Map.put("task_id", id)
      Timeblocks.create_timeblock(timeblock) 
    end
    task
  end

  @doc """
  Updates a task.

  ## Examples

      iex> update_task(task, %{field: new_value})
      {:ok, %Task{}}

      iex> update_task(task, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, attrs) do
    id = elem(task, 1).id
      timeblock = %Timeblock{}
      |> Map.put("start", attrs["starts"])
      |> Map.put("end", attrs["end"])
      |> Map.put("task_id", id) 
      Timeblocks.create_timeblock(timeblock)

    task
    |> Task.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Task.

  ## Examples

      iex> delete_task(task)
      {:ok, %Task{}}

      iex> delete_task(task)
      {:error, %Ecto.Changeset{}}

  """
  def delete_task(%Task{} = task) do
    Repo.delete(task)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking task changes.

  ## Examples

      iex> change_task(task)
      %Ecto.Changeset{source: %Task{}}

  """
  def change_task(%Task{} = task) do
    Task.changeset(task, %{})
  end

  def get_timelog(task_id) do
    Repo.all(from tb in Timeblock, join: t in Task, where: tb.task_id == t.id, where: tb.task_id == ^task_id, 
      select: {tb.start, tb.end, tb.id})
  end

  def manager_ids do
    Repo.all(from m in Manage, select: m.manager_id)
  end

  def manages_map(user_id) do
    Repo.all(from m in Manage, where: m.manager_id == ^user_id)
    |> Enum.map(&({&1.employee_id, &1.id}))
    |> Enum.into(%{})
  end

  def employee_tasks(user_id) do
    employees = Repo.all(from t in Task, join: m in Manage, where: t.user_id == m.employee_id, where: m.manager_id == ^user_id)
    |> Repo.preload(:user)

    task = Repo.all(from t in Task, where: t.user_id == ^user_id)
    |> Repo.preload(:user)

    Enum.concat(employees, task)
  end

end
