defmodule TaskTracker1.TasksTest do
  use TaskTracker1.DataCase

  alias TaskTracker1.Tasks

  describe "tasks" do
    alias TaskTracker1.Tasks.Task

    @valid_attrs %{description: "some description", status: true, time: 42, title: "some title", user: "some user"}
    @update_attrs %{description: "some updated description", status: false, time: 43, title: "some updated title", user: "some updated user"}
    @invalid_attrs %{description: nil, status: nil, time: nil, title: nil, user: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tasks.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Tasks.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Tasks.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Tasks.create_task(@valid_attrs)
      assert task.description == "some description"
      assert task.status == true
      assert task.time == 42
      assert task.title == "some title"
      assert task.user == "some user"
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tasks.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, %Task{} = task} = Tasks.update_task(task, @update_attrs)

      
      assert task.description == "some updated description"
      assert task.status == false
      assert task.time == 43
      assert task.title == "some updated title"
      assert task.user == "some updated user"
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Tasks.update_task(task, @invalid_attrs)
      assert task == Tasks.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Tasks.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Tasks.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Tasks.change_task(task)
    end
  end
end
