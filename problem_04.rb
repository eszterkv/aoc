# Part 1

class Room
  def initialize(encrypted_name)
    @checksum = encrypted_name.split('[')[1][0..-2]
    @secret_string = encrypted_name.split('[')[0].split('-')[0..-2].join.split(//).sort
    @sector_id = encrypted_name.split('[')[0].split('-')[-1].to_i
  end
  def is_real
    char_counts = Hash.new
    @secret_string.each do |ch|
      char_counts[ch] = @secret_string.count(ch) unless char_counts.has_key?(ch)
    end
    values = char_counts.map{|k, v| v}.uniq.sort.reverse
    chars = char_counts.map{|k, v| k}.uniq.sort
    top = []
    i = 0
    while top.length < 5
      top << chars.select{|ch| char_counts[ch] == values[i]}
      i += 1
    end
    return top.flatten[0..4].join == @checksum
  end
  attr_reader :sector_id
end

def sum_real_rooms(input)
  encrypted_names = input.split("\n")
  sum = 0
  encrypted_names.each do |string|
    room = Room.new(string)
    if room.is_real
      sum += room.sector_id
    end
  end
  return sum
end


# Part 2

