def count_lit_pixels(input)
  screen = Array.new
  h = 6
  w = 50
  for row in 0..h-1
    screen << "."*w
  end
  
  input.split("\n").each do |instruction|
    type = instruction.split(" ")[0]
    
    case type
    
    when "rect"
      rw = instruction.split(" ")[1].split("x")[0].to_i
      rh = instruction.split(" ")[1].split("x")[1].to_i
      for row in 0..rh-1
        for col in 0..rw-1
          screen[row][col] = "#"
        end
      end
      
    when "rotate"
      dimension = instruction.split(" ")[1]
      chosen = instruction.split(" ")[2].split("=")[1].to_i
      offset = instruction.split(" ")[4].to_i
      
      case dimension
      
      when "row"
        pattern = screen.select{|row| screen.index(row)==chosen}[0].split(//).join
        for col in 0..w-1
          screen[chosen][(col + offset) % w] = pattern[col]
        end
        
      when "column"
        pattern = screen.map{|row| row[chosen]}.join
        for row in 0..h-1
          screen[row][chosen] = pattern[row - offset]
        end
      end
      
    end
  end
  
  return screen.join.count('#')
end

puts count_lit_pixels(input)
