def solve(input, disk_size)
  data = generate_data_from(input, disk_size)
  trimmed_data = data[0..disk_size-1]
  return checksum_of(trimmed_data)
end

def generate_data_from(data, disk_size)
  return data.length >= disk_size ? data : generate_data_from(data + '0' + data.reverse.gsub('0', 'x').gsub('1', '0').gsub('x', '1'), disk_size)
end

def checksum_of(data)
  checksum = ''
  i = 0
  while i < data.length
    checksum += data[i] == data[i.next] ? '1' : '0'
    i += 2
  end
  return checksum.length.odd? ? checksum : checksum_of(checksum)
end

puts solve('01111001100111011', 272)

# works for part 1 only, part 2 is too slow
