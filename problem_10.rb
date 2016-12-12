class Bot
  def initialize(id)
    @id = id
    @microchips = []
    @rules = Hash.new
  end

  def add_chip(value)
    @microchips << value
    if @microchips.count > 1
      self.check_if_wins
      self.dispatch_chips
    end
  end

  def check_if_wins
    if @microchips.sort == $values
      $winner = @id
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
class Bot
  def initialize(id)
    @id = id
    @microchips = []
    @rules = Hash.new
  end

  def add_chip(value)
    @microchips << value
    if @microchips.count > 1
      self.check_if_wins
      self.dispatch_chips
    end
  end

  def check_if_wins
    if @microchips.sort == $values
      $winner = @id
    end
  end

  def assign_chips(low, high)
    @rules["low"] = low
    @rules["high"] = high
  end

  def dispatch_chips
    @rules.each do |chip, dest|
      dest.add_chip(chip == "low" ? @microchips.min : @microchips.max)
      @microchips.delete(chip)
    end
  end

  attr_reader :id
  attr_reader :microchips
  attr_reader :rules
end

class Output
  def initialize(id)
    @id = id
    @microchips = []
  end
  def add_chip(value)
    @microchips << value
  end
  attr_reader :id
  attr_reader :microchips
end


def balance_bots(input)
  $bots = Hash.new
  $outputs = Hash.new
  $values = [17, 61]
  $winner = nil
  instructions = input.split("\n").sort_by{|line| line[0]}
  instructions.each do |instruction|
    if instruction.split(" ")[0] == "value"
      add_chip_to_bot_from(instruction)
    else
      assign_low_and_high_from(instruction)
    end
  end
  output_product = 1
  for idx in 0..2
    output_product *= $outputs[id=idx.to_s].microchips[0]
  end
  return $winner, output_product
end

def add_chip_to_bot_from(instruction)
  value = instruction.split(" ")[1].to_i
  id = instruction.split(" ")[5]
  $bots[id] = Bot.new(id) unless $bots[id]
  $bots[id].add_chip(instruction.split(" ")[1].to_i)
end

def assign_low_and_high_from(instruction)
  id = instruction.split(" ")[1]
  id_low = instruction.split(" ")[6]
  id_high = instruction.split(" ")[11]
  $bots[id] = Bot.new(id) unless $bots[id]
  if instruction.split(" ")[5] == "output"
    $outputs[id_low] = Output.new(id_low) unless $outputs[id_low]
    low = $outputs[id_low]
  else
    $bots[id_low] = Bot.new(id_low) unless $bots[id_low]
    low = $bots[id_low]
  end
  if instruction.split(" ")[10] == "output"
    $outputs[id_high] = Output.new(id_high) unless $outputs[id_high]
    high = $outputs[id_high]
  else
    $bots[id_high] = Bot.new(id_high) unless $bots[id_high]
    high = $bots[id_high]
  end
  $bots[id].assign_chips(low, high)
end

puts balance_bots(input)
