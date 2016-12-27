class Tile
  def initialize(pos)
    @left = ( (pos[1] == 0) ? "." : $tiles[pos[0]-1][pos[1]-1] )
    @center = $tiles[pos[0]-1][pos[1]]
    @right = ( (pos[1] == $last_idx) ? "." : $tiles[pos[0]-1][pos[1]+1] )
  end
  def get_str
    return ( ["^^.", ".^^", "^..", "..^"].include?(@left + @center + @right) ? "^" : "." )
  end
end

def solve(input, lines)
  $tiles = [input]
  $last_idx = input.length-1
  while $tiles.length < lines
    line = ""
    for tile in 0..input.length-1
      line += Tile.new([$tiles.length, tile]).get_str
    end
    $tiles << line
  end
  return $tiles.join.count(".")
end

input = ".^.^..^......^^^^^...^^^...^...^....^^.^...^.^^^^....^...^^.^^^...^^^^.^^.^.^^..^.^^^..^^^^^^.^^^..^"

puts solve(input, 40)
