class Tile
  def initialize(options={})
    @type = options[:type] || "new"
    @pos = options[:pos] || "row0"
    @left = ( (@pos == "row0" or @pos[1] == 0) ? $safe_tile : $tiles[@pos[0]-1][@pos[1]-1] )
    @center = ( @pos == "row0" ? $safe_tile : $tiles[@pos[0]-1][@pos[1]] )
    @right = ( (@pos == "row0" or @pos[1] == $line_length-1) ? $safe_tile : $tiles[@pos[0]-1][@pos[1]+1] )
  end
  def is_trap
    return @type != "new" ? @type == "^" : ( (@left.is_trap and @center.is_trap and not @right.is_trap) or (@center.is_trap and @right.is_trap and not @left.is_trap) or (@left.is_trap and not (@center.is_trap or @right.is_trap)) or (@right.is_trap and not (@left.is_trap or @center.is_trap)) )
  end
end

def solve(input, lines)
  safe_tile_count = input.count(".")
  $line_length = input.length
  $safe_tile = Tile.new(type: ".")
  $tiles = [ input.split(//).map { |char| Tile.new(type: char) } ]
  while $tiles.length < lines
    line_of_tiles = []
    for tile in 0..input.length-1
      new_tile = Tile.new(pos: [$tiles.length, tile])
      safe_tile_count += 1 unless new_tile.is_trap
      line_of_tiles << new_tile
    end
    $tiles << line_of_tiles
  end
  return safe_tile_count
end

input = ".^.^..^......^^^^^...^^^...^...^....^^.^...^.^^^^....^...^^.^^^...^^^^.^^.^.^^..^.^^^..^^^^^^.^^^..^"
test = ".^^.^.^^^^"

puts solve(test, 5)
