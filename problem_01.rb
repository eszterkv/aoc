# Part 1

def calculate_distance_of(path)
  deg = 0
  distance_in_direction = { 0 => 0, 90 => 0, 180 => 0, 270 => 0 }
  path.each do |step|
    deg = step[0] == 'R' ? ((deg < 270) ? deg + 90 : 0) : ((deg > 0) ? deg - 90 : 270)
    distance_in_direction[deg] += step[1..-1].to_i
  end
  return (distance_in_direction[0] - distance_in_direction[180]).abs +
    (distance_in_direction[90] - distance_in_direction[270]).abs
end


# Part 2

def first_loc_visited_twice_in(path)
  deg = 0
  visited_points = []
  distance_in_direction = { 0 => 0, 90 => 0, 180 => 0, 270 => 0 }
  path.each do |step|
    deg = step[0] == 'R' ? ((deg < 270) ? deg + 90 : 0) : ((deg > 0) ? deg - 90 : 270)
    for block in 1..step[1..-1].to_i
      distance_in_direction[deg] += 1
      location = "N#{distance_in_direction[0] - distance_in_direction[180]}, E#{distance_in_direction[90] - distance_in_direction[270]}"
      visited_points << location
      if visited_points.count(location) > 1
        return (distance_in_direction[0] - distance_in_direction[180]).abs +
          (distance_in_direction[90] - distance_in_direction[270]).abs
      end
    end
  end
end
