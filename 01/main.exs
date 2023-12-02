defmodule Part1 do
  def run(input) do
    input
    |> String.split("\n")
    |> Enum.filter(fn x -> String.length(x) > 0 end)
    |> Enum.map(&listToDigit/1)
    |> Enum.sum()
  end

  defp listToDigit(line) do
    digits =
      line
      |> String.split("")
      |> Enum.filter(fn x -> Regex.match?(~r/[0-9]/, x) end)
      |> then(fn x -> List.first(x) <> List.last(x) end)

    String.to_integer(digits)
  end
end

example1 = """
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
"""

result = Part1.run(example1)
IO.inspect(result)

defmodule Part2 do
  def run(input) do
    input
    |> String.split("\n")
    |> Enum.filter(fn x -> String.length(x) > 0 end)
    |> Enum.map(&listToDigit/1)
    |> Enum.sum()
  end

  defp listToDigit(line) do
    digits =
      line
      |> then(fn x -> writtenDigits(x) end)
      |> String.split("")
      |> Enum.filter(fn x -> Regex.match?(~r/[0-9]/, x) end)
      |> then(fn x -> List.first(x) <> List.last(x) end)

    String.to_integer(digits)
  end

  def writtenDigits(line), do: writtenDigits(line, 0)

  defp writtenDigits(line, i) do
    digits = %{
      "one" => "1",
      "two" => "2",
      "three" => "3",
      "four" => "4",
      "five" => "5",
      "six" => "6",
      "seven" => "7",
      "eight" => "8",
      "nine" => "9"
    }

    head = String.slice(line, 0, i)
    tail = String.slice(line, i, String.length(line))

    # IO.puts("--------------------")
    # IO.puts("head: #{head}")
    # IO.puts("tail: #{tail}")
    # IO.puts("curChar: #{String.at(tail, 0)}")

    cond do
      String.length(line) <= i ->
        line

      String.length(tail) == 0 ->
        line

      String.at(tail, 0) |> Integer.parse() != :error ->
        writtenDigits(line, i + 1)

      Enum.find(Map.keys(digits), fn x -> String.starts_with?(tail, x) end) ->
        matchWritten = Enum.find(Map.keys(digits), fn x -> String.starts_with?(tail, x) end)
        matchedDigit = digits[matchWritten]

        newLine =
          head <>
            matchedDigit <>
            String.slice(tail, String.length(matchWritten) - 1, String.length(line))

        writtenDigits(newLine, i + String.length(matchedDigit))

      true ->
        writtenDigits(line, i + 1)
    end
  end
end

example2 = """
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
"""

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

IO.inspect(Part2.run(example2))
IO.inspect(Part2.run(Read.read_file("./input")))
