defmodule TaskTracker3Web.SessionController do
  use TaskTracker3Web, :controller
  alias TaskTracker3.Users.User

  def create(conn, %{"email" => email, "password" => password}) do
    with %User{} = user <- TaskTracker3.Users.get_and_auth_user(email, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskTracker3Web.Endpoint, "user_id", user.id),
          user: renderUser(user),
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end

  def renderUser(user) do
    TaskTracker3Web.UserView.render("show.json", %{user: user})
  end
end