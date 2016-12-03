def possible_vertical_triangles_in(input)
  nums = input.split(" ").map {|n| n.to_i}
  vertical_triangles = []
  (0..nums.length-1).step(9) do |i|
    for j in 0..2
      vertical_triangles << [nums[i+j], nums[i+j+3], nums[i+j+6]]
    end
  end
  vertical_triangles.keep_if {|sides| sides.sort[0] + sides.sort[1] > sides.sort[2]}
  return vertical_triangles.length
end
