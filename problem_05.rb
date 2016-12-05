input = 'abbhdwsy'

require 'digest'

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
  def pw_char_index
    return '01234567'.index(@hash[5]) != nil ? @hash[5].to_i : false
  end
  def pw_char_in_place
    return @hash[6]
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

def crack_tricky_password(input)
  pw = '--------'
  idx = 0
  while pw.count('-') > 0
    door = Door.new(input + idx.to_s)
    if door.has_password_char and door.pw_char_index
      if pw[door.pw_char_index] == '-'
        pw[door.pw_char_index] =  door.pw_char_in_place
        puts pw
      end
    end
    idx += 1
  end
  return pw
end

puts crack_password(input)
puts crack_tricky_password(input)
