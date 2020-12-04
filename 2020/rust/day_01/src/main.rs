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

    part1(numbers).ok();

    let duration = start.elapsed();

    println!("Time elapsed: {:?}", duration);
    Ok(())
}

fn part1(numbers: Vec<i64>) -> io::Result<()> {
    let mut seen: Vec<i64> = Vec::new();

    for i in 0..numbers.len() {
        if seen.contains(&numbers[i]) {
            println!("{}", numbers[i] * (2020 - numbers[i]));
        } else {
            seen.push(2020 - numbers[i]);
        }
    }

    Ok(())
}
