require 'digest'

input = 'ihaygndm'

def solve_for(salt)
  idx = 0
  keys = []
  while keys.length < 64
    hash = Digest::MD5.new << salt + idx.to_s
    if has_3_in_a_row(hash)
      char = has_3_in_a_row(hash).to_s[0]
      next_idx = idx + 1
      while next_idx < idx + 1000
        next_hash = Digest::MD5.new << salt + next_idx.to_s
        if has_5_in_a_row(next_hash, char, next_idx)
          keys << idx
        end
        next_idx += 1
      end
    end
    idx += 1
  end
  return keys[63]
end

def has_3_in_a_row(hash)
  return hash.to_s.match(/(.)\1{2}/)
end

def has_5_in_a_row(hash, char, idx)
  return hash.to_s.index(char * 5) != nil
end

puts solve_for(input)
