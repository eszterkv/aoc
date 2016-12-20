class Disc
  def initialize(delay, size, initial_pos)
    @delay = delay
    @size = size
    @initial_pos = initial_pos
  end
  def get_pos
    return (@initial_pos + $time + @delay) % @size
  end
end

def get_discs_from(input)
  discs = []
  input.split("\n").each do |line|
    delay = line.split(" ")[1][1].to_i
    size = line.split(" ")[3].to_i
    initial_pos = line.split(" ")[11][0..-1].to_i
    discs << Disc.new(delay, size, initial_pos)
  end
  return discs
end

def solve(input)
  $time = 0
  discs = get_discs_from(input)
  # discs << Disc.new(7, 11, 0) # for part 2
  while true
    $time += 1
    open_slots = 0
    discs.each do |d|
      open_slots += 1 unless d.get_pos > 0
      return $time unless open_slots < discs.count
    end
  end
end

input = "Disc #1 has 13 positions; at time=0, it is at position 11.
Disc #2 has 5 positions; at time=0, it is at position 0.
Disc #3 has 17 positions; at time=0, it is at position 11.
Disc #4 has 3 positions; at time=0, it is at position 0.
Disc #5 has 7 positions; at time=0, it is at position 2.
Disc #6 has 19 positions; at time=0, it is at position 17."

puts solve(input)
