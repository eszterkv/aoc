# cpy x y / y = x
# inc x / x += 1
# dec x / x -= 1
# jnz x y / if x != 0: jump y instructions further

test = "cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a"

input = "cpy 1 a
cpy 1 b
cpy 26 d
jnz c 2
jnz 1 5
cpy 7 c
inc d
dec c
jnz c -2
cpy a c
inc a
dec b
jnz b -2
cpy c b
dec d
jnz d -6
cpy 19 c
cpy 14 d
inc a
dec d
jnz d -2
dec c
jnz c -5"

def decode(input)
  $a = 0
  $b = 0
  $c = 0
  $d = 0
  lines = input.split("\n")
  i = 0
  while i < lines.length-1
    msg = lines[i].split(" ")
    case msg[0]
    when "cpy"
      case msg[2]
      when "a"
        $a = msg[1].to_i
      when "b"
        $b = msg[1].to_i
      when "c"
        $c = msg[1].to_i
      when "d"
        $d = msg[1].to_i
      end
    when "inc", "dec"
      x = msg[0] == "inc" ? 1 : -1
      case msg[1]
      when "a"
        $a+= x
      when "b"
        $b += x
      when "c"
        $c += x
      when "d"
        $d += x
      end
    when "jnz"
      i += var_from(msg[1]) == 0 ? 0 : msg[2].to_i
    end
    i += 1
  end
  return $a
end

def var_from(string)
  case string
  when "a"
    return $a
  when "b"
    return $b
  when "c"
    return $c
  when "d"
    return $d
  end
end
