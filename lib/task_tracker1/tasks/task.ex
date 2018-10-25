defmodule TaskTracker1.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  alias TaskTracker1.Tasks.Task
  alias TaskTracker1.Users.User

  schema "tasks" do
    field :description, :string
    field :status, :boolean, default: false
    field :title, :string
    belongs_to :user, TaskTracker1.Users.User
    has_many :timeblocks, TaskTracker1.Timeblocks.Timeblock

    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    task
    |> cast(attrs, [:title, :description, :status, :user_id])
    |> validate_required([:title, :description, :status, :user_id])
  end
end
