defmodule TaskTracker1.Manages.Manage do
  use Ecto.Schema
  import Ecto.Changeset

  alias TaskTracker1.Manages.Manage
  alias TaskTracker1.Users.User


  schema "manages" do
    belongs_to :manager, TaskTracker1.Users.User
    belongs_to :employee, TaskTracker1.Users.User

    timestamps()
  end

  @doc false
  def changeset(%Manage{} = manage, attrs) do
    manage
    |> cast(attrs, [:manager_id, :employee_id])
    |> validate_required([:manager_id, :employee_id])
  end
end
