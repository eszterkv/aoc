def decode_message(input)
  repetitions = input.split("\n")
  message_length = repetitions[0].length
  message = '-'*message_length
  for idx in 0..message_length-1
    letters_count = Hash.new
    repetitions.each do |message|
      letters_count[message[idx]] = letters_count.has_key?(message[idx]) ? letters_count[message[idx]] + 1 : 1
    end
    message[idx] = letters_count.map{|k,v| [k,v]}.select{|x| x[1] == letters_count.map{|k,v| v}.max}.flatten[0]
    # To find by least common character:
    # message[idx] = letters_count.map{|k,v| [k,v]}.select{|x| x[1] == letters_count.map{|k,v| v}.min}.flatten[0]
  end
  return message
end

puts decode_message(input)
