defmodule TaskTracker3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :description, :string
    field :status, :boolean, default: false
    field :time, :integer
    field :title, :string
    belongs_to :user, TaskTracker3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :status, :time, :user_id])
    |> validate_required([:title, :description, :status, :time, :user_id])
    |> validate_time(:time)
  end

  def validate_time(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, time ->
      case rem(time, 15) == 0 do
        true -> []
        false -> [{field, options[:message] || "Increment by 15"}]
      end
    end)
  end
end
