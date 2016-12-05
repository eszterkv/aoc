require 'digest'

input = 'abbhdwsy'

class Door
  def initialize(door_id)
    @hash = (Digest::MD5.new << door_id).to_s
  end
  def has_password_char
    return @hash[0..4] == '00000'
  end
  def password_char
    return @hash[5]
  end
end

def crack_password(input)
  pw = ''
  idx = 0
  while pw.length < 8
    door = Door.new(input + idx.to_s)
    if door.has_password_char
      pw += door.password_char
    end
    idx += 1
  end
  return pw
end

puts crack_password(input)
