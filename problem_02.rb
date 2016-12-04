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

def get_code_from(instructions)
  keypad = [[1],[2,3,4],[5,6,7,8,9],['A','B','C'],['D']]
  vpos = 2
  hpos = 0
  code = ''
  instructions.each do |step|
    step.split(//).each do |dir|
      if dir == 'U' and (vpos > 2 or (hpos > 0 and hpos < keypad[vpos].length - 1))
        hpos += vpos > 2 ? 1 : -1
        vpos -= 1
      elsif dir == 'D' and (vpos < 2 or (hpos > 0 and hpos < keypad[vpos].length - 1))
        hpos += vpos < 2 ? 1 : -1
        vpos += 1
      elsif dir == 'L' and hpos > 0
        hpos -= 1
      elsif dir == 'R' and hpos < keypad[vpos].length - 1
        hpos += 1
      end
    end
    code += keypad[vpos][hpos].to_s
  end
  return code
end
