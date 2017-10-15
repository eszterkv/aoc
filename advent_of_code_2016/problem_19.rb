# each elf has a present
# they start from 1..n, take the one to the left's gift (elf+1's)
# if elf does not have a gift, they are removed from the circle
# which elf gets all of the presents?

def white_elephant(n)
  elves = Array(1..n)
  last = n
  while elves.length > 2 do
    elves = elves.select.each_with_index { |_, i| i % 2 == 0 }
    if elves.include?(last)
      elves.shift
    end
    last = elves[elves.length-1]
  end
  return elves[0]
end

puts white_elephant(3004953)
