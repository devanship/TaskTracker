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
    |> validate_time(:time)
  end

  #https://stackoverflow.com/questions/45754213/how-to-make-ecto-changeset-validate-required-accept-blank-values
  def validate_time(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, time ->
      if rem(time, 15) == 0 do
        []
      else
        [{field, options[:message] || "Must be in increments of 15"}]
      end
    end)
  end
end
