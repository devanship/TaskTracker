defmodule TaskTracker1Web.TimeblockControllerTest do
  use TaskTracker1Web.ConnCase

  alias TaskTracker1.Timeblocks
  alias TaskTracker1.Timeblocks.Timeblock

  @create_attrs %{
    end: "2010-04-17 14:00:00.000000Z",
    start: "2010-04-17 14:00:00.000000Z"
  }
  @update_attrs %{
    end: "2011-05-18 15:01:01.000000Z",
    start: "2011-05-18 15:01:01.000000Z"
  }
  @invalid_attrs %{end: nil, start: nil}

  def fixture(:timeblock) do
    {:ok, timeblock} = Timeblocks.create_timeblock(@create_attrs)
    timeblock
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all timeblocks", %{conn: conn} do
      conn = get(conn, Routes.timeblock_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create timeblock" do
    test "renders timeblock when data is valid", %{conn: conn} do
      conn = post(conn, Routes.timeblock_path(conn, :create), timeblock: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.timeblock_path(conn, :show, id))

      assert %{
               "id" => id,
               "end" => "2010-04-17 14:00:00.000000Z",
               "start" => "2010-04-17 14:00:00.000000Z"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.timeblock_path(conn, :create), timeblock: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update timeblock" do
    setup [:create_timeblock]

    test "renders timeblock when data is valid", %{conn: conn, timeblock: %Timeblock{id: id} = timeblock} do
      conn = put(conn, Routes.timeblock_path(conn, :update, timeblock), timeblock: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.timeblock_path(conn, :show, id))

      assert %{
               "id" => id,
               "end" => "2011-05-18 15:01:01.000000Z",
               "start" => "2011-05-18 15:01:01.000000Z"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, timeblock: timeblock} do
      conn = put(conn, Routes.timeblock_path(conn, :update, timeblock), timeblock: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete timeblock" do
    setup [:create_timeblock]

    test "deletes chosen timeblock", %{conn: conn, timeblock: timeblock} do
      conn = delete(conn, Routes.timeblock_path(conn, :delete, timeblock))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.timeblock_path(conn, :show, timeblock))
      end
    end
  end

  defp create_timeblock(_) do
    timeblock = fixture(:timeblock)
    {:ok, timeblock: timeblock}
  end
end
