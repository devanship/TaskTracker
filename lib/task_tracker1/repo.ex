defmodule TaskTracker1.Repo do
  use Ecto.Repo,
    otp_app: :task_tracker1,
    adapter: Ecto.Adapters.Postgres
end
