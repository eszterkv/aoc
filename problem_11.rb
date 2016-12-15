# elevator can carry min 1, max 2 pcs rtgs/chips at a time. stops on every floor
# start on F1
# Get everything to the 4th floor!

input = "The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, and a strontium generator.
The second floor contains a plutonium-compatible microchip and a strontium-compatible microchip.
The third floor contains a promethium generator, a promethium-compatible microchip, a ruthenium generator, and a ruthenium-compatible microchip.
The fourth floor contains nothing relevant."

# Floors look like this:
# F4 .  .  .  .  .  = floor 4
# F3 .  .  .  LG .  = lithium generator
# F2 .  HG .  .  .  = hydrogen generator
# F1 E  .  HM .  LM = hydrogen microchip, lithium microchip

test = "The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant."

class Elevator
  def initialize
    @items = []
    @full = false
    @location = 1
    @next = 1
    @floors_traveled = 0
  end

  def travel
    if @items.count > 0
      @location += @next
      if @location == 4 or @location == 1
        @next *= -1
      end
      @floors_traveled += 1
    end
  end

  def add(item)
    @items << $floors[@location].remove(item) unless @items.count > 1
    @full = @items.count > 1
  end

  def remove(item)
    @full = false
    $floors[@location].add(@items.slice!(@items.index(item)))
  end

  attr_reader :location, :full, :items, :floors_traveled
end

class Floor
  def initialize(items)
    @items = items
  end

  def add(item)
    @items << item
  end

  def remove(item)
    @items.slice!(@items.index(item))
  end

  attr_reader :id, :items
end

def transport_rtgs(input)
  pattern = /\w+-?\w+\s(generator|microchip)/
  $floors = input.split("\n").map { |line|
    [input.split("\n").index(line)+1, Floor.new(all_matches_of_pattern_in_str(pattern, line))] }.to_h
  steps = 0
  elevator = Elevator.new
  while steps < 10 and $floors.map {|id,floor| floor.items}.flatten.length != $floors[4].items.length
    steps += 1
    $floors[elevator.location].items.each do |item|
      if item.split(" ")[0] == $floors[elevator.location+1].items
        elevator.add(item)
      end
      puts elevator.items.to_s
    end
    elevator.travel
    elevator.items.each do |item|
      if item.split(" ")[0] == $floors[elevator.location+1].items
        elevator.remove(item)
      end
    end
  end
  return $floors
end

def all_matches_of_pattern_in_str(pattern, string)
  matches = []
  while string.match(pattern)
    matches << string.match(pattern).to_s
    string = string[string.index(string.match(pattern).to_s)+string.match(pattern).to_s.length..-1]
  end
  return matches
end

puts transport_rtgs(test)
