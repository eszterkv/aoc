class Bot
  def initialize(id)
    @id = id
    @microchips = []
    @rules = Hash.new
    @string_rules = ""
  end

  def add_chip(value)
    @microchips << value
    if @microchips.index(17) != nil
      puts @id, @microchips.to_s
    end
    if @microchips.count > 1
      puts @microchips.sort.to_s
      # if @microchips.sort == $values
      #   $winner = @id
      # end
      self.dispatch_chips
    end
  end

  def assign_chips(low, high)
    @rules["low"] = low
    @rules["high"] = high
  end

  def dispatch_chips
    @rules.each do |chip, dest|
      if dest.kind_of?(Bot)
        dest.add_chip(chip == "low" ? @microchips.min : @microchips.max)
      end
      @microchips.delete(chip)
    end
  end

  attr_reader :id
  attr_reader :microchips
  attr_reader :rules
  attr_accessor :string_rules
end

class Output
  def initialize(id)
    @id = id
  end
  attr_reader :id
end

def balance_bots(input)
  bots = Hash.new
  $values = [17, 61]
  $winner = nil
  instructions = input.split("\n")
  instructions.each do |i|
    # puts "\n"
    # puts i
    if i.split(" ")[0] == "value"
      value = i.split(" ")[1].to_i
      id = i.split(" ")[5]
      bots[id] = Bot.new(id) unless bots[id]
      bots[id].add_chip(i.split(" ")[1].to_i)
      # puts "Bot #{bots[id].id}: #{bots[id].microchips.to_s}, #{bots[id].string_rules}"
    else
      id = i.split(" ")[1]
      id_low = i.split(" ")[6]
      id_high = i.split(" ")[11]
      bots[id] = Bot.new(id) unless bots[id]
      bots[id].string_rules = i
      if i.split(" ")[5] == "output"
        low = Output.new(id_low)
      else
        bots[id_low] = Bot.new(id_low) unless bots[id_low]
        low = bots[id_low]
      end
      if i.split(" ")[10] == "output"
        high = Output.new(id_high)
      else
        bots[id_high] = Bot.new(id_high) unless bots[id_high]
        high = bots[id_high]
      end
      bots[id].assign_chips(low, high)
    end
  end
  return $winner
end

puts balance_bots(input)
