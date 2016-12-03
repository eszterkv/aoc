# Part 1

def get_code_from(instructions)
  keypad = [[1,2,3],[4,5,6],[7,8,9]]
  vpos = 1
  hpos = 1
  code = ''
  instructions.each do |step|
    step.split(//).each do |ch|
      if ch == 'U' and vpos > 0
        vpos -= 1
      elsif ch == 'D' and vpos < 2
        vpos += 1
      elsif ch == 'L' and hpos > 0
        hpos -= 1
      elsif ch == 'R' and hpos < 2
        hpos += 1
      end
    end
    code += keypad[vpos][hpos].to_s
  end 
  return code
end


# Part 2
