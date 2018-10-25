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

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_flash
    plug TaskTracker1Web.Plugs.FetchSession
  end

  scope "/", TaskTracker1Web do
    pipe_through :browser

    get "/", PageController, :index
    resources "/users", UserController
    resources "/tasks", TaskController
    resources "/manages", ManageController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create, :delete], singleton: true
  end

  scope "/ajax", TaskTracker1Web do
    pipe_through :ajax
    resources "/manages", ManageController, except: [:new, :edit]
    resources "/timeblocks", TimeblockController, except: [:new, :edit]
  end

  # Other scopes may use custom stacks.
  # scope "/api", TaskTracker1Web do
  #   pipe_through :api
  # end
end
