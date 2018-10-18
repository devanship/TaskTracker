defmodule TaskTracker1Web.PageController do
  use TaskTracker1Web, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
