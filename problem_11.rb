# elevator can carry min 1, max 2 pcs rtgs/chips at a time. stops on every floor
# start on F1
# Get everything to the 4th floor!

test = "The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant."

input = "The first floor contains a thulium generator, a thulium-compatible microchip, a plutonium generator, and a strontium generator.
The second floor contains a plutonium-compatible microchip and a strontium-compatible microchip.
The third floor contains a promethium generator, a promethium-compatible microchip, a ruthenium generator, and a ruthenium-compatible microchip.
The fourth floor contains nothing relevant."

# Floors look like this:
# F4 .  .  .  .  .  = floor 4
# F3 .  .  .  LG .  = lithium generator
# F2 .  HG .  .  .  = hydrogen generator
# F1 E  .  HM .  LM = hydrogen microchip, lithium microchip

def transport_rtgs(input)
  floors = input.split("\n")
  floors.each do |floor|
    puts floor
    puts floor.split(" ")[5..-1].join(" ").match(/\w+-?\w+\s(generator|microchip)/)
  end
  return nil
end

puts transport_rtgs(test)
