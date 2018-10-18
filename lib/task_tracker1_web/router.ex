defmodule TaskTracker1Web.Router do
  use TaskTracker1Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug TaskTracker1Web.Plugs.FetchSession
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TaskTracker1Web do
    pipe_through :browser

    get "/", PageController, :index
    resources "/users", UserController
    resources "/tasks", TaskController
    resources "/sessions", SessionController, only: [:create, :delete], singleton: true
  end

  # Other scopes may use custom stacks.
  # scope "/api", TaskTracker1Web do
  #   pipe_through :api
  # end
end
