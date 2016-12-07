class IPv7
  def initialize(address)
    @address = address
    @strings_outside = address.split(/[\[\]]/).keep_if{|s| address.split(/[\[\]]/).index(s) % 2 == 0}
    @strings_inside = address.split(/[\[\]]/).keep_if{|s| address.split(/[\[\]]/).index(s) % 2 == 1}
  end
  def is_abba(s)
    return (s[0] != s[1] and s[0] == s[3] and s[1] == s[2])
  end
  def supports_tls
    @strings_inside.each do |s|
      for i in 0..s.length-4
        if is_abba(s[i..i+3])
          return false
        end
      end
    end
    @strings_outside.each do |s|
      for i in 0..s.length-4
        if is_abba(s[i..i+3])
          return true
        end
      end
    end
    return false
  end
end

def count_tls_ips(input)
  count = 0
  input.split("\n").each do |ip|
    ip = IPv7.new(ip)
    count += ip.supports_tls ? 1 : 0
  end
  return count
end

puts count_tls_ips(input)
