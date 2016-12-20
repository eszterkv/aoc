def generate_data_from(data, disk_size)
  return data.length >= disk_size ? data : generate_data_from(data + '0' + data.reverse.gsub('0', 'x').gsub('1', '0').gsub('x', '1'), disk_size)
end

def checksum(data, len)
  trimmed_data = data[0..len-1]
  pairs = trimmed_data.split(//)
  return pairs
end

puts checksum('1100101101000001011110101', 12)
