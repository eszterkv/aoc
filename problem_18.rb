def solve(input, lines)
  count = input.count(".")
  $prev_line = input
  $last_idx = input.length-1
  (lines-1).times do
    line = ""
    for tile in 0..input.length-1
      left = (tile == 0) ? "." : $prev_line[tile-1]
      center = $prev_line[tile]
      right = (tile == $last_idx) ? "." : $prev_line[tile+1]
      line += ["^^.", ".^^", "^..", "..^"].include?(left + center + right) ? "^" : "."
    end
    count += line.count(".")
    $prev_line = line
  end
  return count
end

input = ".^.^..^......^^^^^...^^^...^...^....^^.^...^.^^^^....^...^^.^^^...^^^^.^^.^.^^..^.^^^..^^^^^^.^^^..^"

puts solve(input, 40)
puts solve(input, 400000)
