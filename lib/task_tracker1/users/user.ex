defmodule TaskTracker1.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias TaskTracker1.Users.User
  alias TaskTracker1.Manages.Manage

  schema "users" do
    field :email, :string
    field :name, :string
    has_one :manager_manages, TaskTracker1.Manages.Manage, foreign_key: :manager_id
    has_many :employee_manages, TaskTracker1.Manages.Manage, foreign_key: :employee_id
    has_one :managers, through: [:employee_manages, :manager]
    has_many :employees, through: [:manager_manages, :employee]

    timestamps()
  end

  @doc false
  def changeset(%User{} =user, attrs) do
    user
    |> cast(attrs, [:name, :email])
    |> validate_required([:name, :email])
    |> unique_constraint(:email)
  end
end
