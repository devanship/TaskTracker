# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker1.Repo.insert!(%TaskTracker1.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TaskTracker1.Repo
alias TaskTracker1.Users.User
alias TaskTracker1.Manages.Manage

Repo.insert!(%User{email: "alice@example.com", name: "Alice"})
Repo.insert!(%User{email: "bob@example.com", name: "Bob"})
Repo.insert!(%User{email: "michael@example.com", name: "Michael"})
Repo.insert!(%User{email: "kevin@example.com", name: "Kevin"})
Repo.insert!(%User{email: "pam@example.com", name: "Pam"})
Repo.insert!(%User{email: "jim@example.com", name: "Jim"})

Repo.insert!(%Manage{manager_id: 1, employee_id: 2})

