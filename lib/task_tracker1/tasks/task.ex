defmodule TaskTracker1.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  alias TaskTracker1.Tasks.Task


  schema "tasks" do
    field :description, :string
    field :status, :boolean, default: false
    field :time, :integer
    field :title, :string
    belongs_to :user, TaskTracker1.Users.User


    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :status, :time, :user_id])
    |> validate_required([:title, :description, :status, :time, :user_id])
  end
end
