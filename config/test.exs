use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :task_tracker3, TaskTracker3Web.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :task_tracker3, TaskTracker3.Repo,
  username: "task_tracker3",
  password: "abcd1234",
  database: "task_tracker3_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
