# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTracker3.Repo.insert!(%TaskTracker3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TaskTracker3.Repo
alias TaskTracker3.Users.User
alias TaskTracker3.Tasks.Task

pwhash = Argon2.hash_pwd_salt("pass1")

a = Repo.insert!(%User{email: "alice@example.com", name: "Alice", password_hash: pwhash})
b = Repo.insert!(%User{email: "bob@example.com", name: "Bob", password_hash: pwhash})

Repo.insert!(%Task{title: "Task 1", description: "Do Stuff", status: true, time: 15, user_id: a.id})
Repo.insert!(%Task{title: "Task 2", description: "Do More Stuff", status: false, time: 30, user_id: b.id})



