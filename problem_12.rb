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
  variables = Hash.new
  lines = input.split("\n")
  i = 0
  while i < lines.length-1
    msg = lines[i].split(" ")
    case msg[0]
    when "cpy"
      variables[msg[2]] = variables.has_key?(msg[1]) ? variables[msg[1]] : msg[1].to_i
      i += 1
    when "inc"
      variables[msg[1]] += 1
      i += 1
    when "dec"
      variables[msg[1]] -= 1
      i += 1
    when "jnz"
      i += (variables[msg[1]] != 0 and variables.has_key?(msg[1])) ? msg[2].to_i : 1
    end
    puts "#{msg.join(" ")} --> #{variables}, next i = #{i}"
  end
  return variables.to_s
end

puts decode(input)
