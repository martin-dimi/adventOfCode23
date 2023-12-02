defmodule GameParser do
  def solve1(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(fn gameString ->
      gameString
      |> parseGame()
      |> calculateGame()
      |> validateGame()
    end)
    |> Enum.sum()
  end

  def solve2(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(fn gameString ->
      gameString
      |> parseGame()
      |> calculateGame()
      |> power()
    end)
    |> Enum.sum()
  end

  defp power({id, stats}) do
    stats["red"] * stats["green"] * stats["blue"]
  end

  defp parseGame(gameString) do
    [game, roundsString] = String.split(gameString, ":", trim: true)

    rounds =
      roundsString
      |> String.split(";", trim: true)
      |> Enum.map(fn roundString ->
        # 6 red, 1 blue, 3 green
        roundString
        |> String.split(",", trim: true)
        |> Enum.map(fn balls ->
          balls
          |> String.split(" ", trim: true)
          |> then(fn parts ->
            {
              List.last(parts),
              Integer.parse(List.first(parts)) |> elem(0)
            }
          end)
        end)
        |> Map.new()
      end)

    {
      game |> String.split(" ") |> List.last() |> Integer.parse() |> elem(0),
      rounds
    }
  end

  def calculateGame(game) do
    id = game |> elem(0)

    stats =
      game
      |> elem(1)
      |> Enum.reduce(%{}, fn round, stats ->
        Map.merge(stats, round, fn _, count1, count2 ->
          max(count1, count2)
        end)
      end)

    {
      id,
      stats
    }
  end

  def validateGame({id, stats}) do
    max = %{
      "red" => 12,
      "green" => 13,
      "blue" => 14
    }

    # If stats less than max return id, otherwise 0
    if stats |> Enum.all?(fn {color, count} -> count <= max[color] end) do
      id
    else
      0
    end
  end
end

input = """
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
"""

game = GameParser.solve1(input)
IO.inspect(game)

defmodule Read do
  def read_file(x) do
    case File.read(x) do
      {:ok, result} ->
        result

      {:error, error} ->
        IO.puts("Error: #{error}")
    end
  end
end

IO.inspect(GameParser.solve1(Read.read_file("./input")))
IO.inspect(GameParser.solve2(Read.read_file("./input")))
