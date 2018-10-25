defmodule TaskTracker1.Timeblocks.Timeblock do
  use Ecto.Schema
  import Ecto.Changeset

  alias TaskTracker1.Tasks.Task
  alias TaskTracker1.Timeblocks.Timeblock


  schema "timeblocks" do
    field :end, :utc_datetime
    field :start, :utc_datetime
    belongs_to :task, TaskTracker1.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(%Timeblock{} = timeblock, attrs) do
    timeblock
    |> cast(attrs, [:end, :start, :task_id])
    |> validate_required([:start, :task_id])
    |> validate_time()
  end

  def validate_time(changeset) do
    start = get_field(changeset, :start)
    end_time = get_field(changeset, :end)
    val = DateTime.compare(start, end_time)
    if (val == :lt || end_time == nil) do
      changeset
    else 
      add_error(changeset, :time_violation, "Start time must be before end time.")
    end
  end
end
