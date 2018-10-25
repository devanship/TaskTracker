defmodule TaskTracker1.Repo.Migrations.CreateManages do
  use Ecto.Migration

  def change do
    create table(:manages) do
      add :manager_id, references(:users, on_delete: :delete_all), null: false
      add :employee_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:manages, [:manager_id])
    create index(:manages, [:employee_id])
  end
end
