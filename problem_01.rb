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
