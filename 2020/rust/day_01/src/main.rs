use std::io::{self, Read};
use std::time::{Instant};

fn main() -> io::Result<()> {
    let start = Instant::now();

    let mut numbers = String::new();
    io::stdin()
        .read_to_string(&mut numbers)
        .ok()
        .expect("read error");

    let numbers: Vec<i64> = numbers
        .split_whitespace()
        .map(|num| num.parse().expect("parse error"))
        .collect();

    println!("Part 1: {}", part1(numbers.clone(), 2020));
    println!("Part 2: {}", part2(numbers.clone(), 2020));

    let duration = start.elapsed();

    println!("Time elapsed: {:?}", duration);
    Ok(())
}

fn part1(numbers: Vec<i64>, sum: i64) -> i64 {
    let mut seen: Vec<i64> = Vec::new();

    for i in 0..numbers.len() {
        if seen.contains(&numbers[i]) {
            return numbers[i] * (sum - numbers[i]);
        } else {
            seen.push(sum - numbers[i]);
        }
    }

    return 0;
}

fn part2(mut numbers: Vec<i64>, sum: i64) -> i64 {
    for _i in 0..numbers.len() {
        let num: i64 = numbers.pop().unwrap();
        let other_two = part1(numbers.clone(), sum - num);
        if other_two != 0 {
            return num * other_two;
        } else {
            continue;
        }
    }

    return 0;
}
