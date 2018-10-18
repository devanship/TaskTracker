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

Repo.insert!(%User{email: "alice@example.com", name: "Alice"})
Repo.insert!(%User{email: "bob@example.com", name: "Bob"})
