extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn main() -> String {
    return "Hello, world!!".to_string();
}

// #[no_mangle]
// pub fn add(a: i32, b:i32) -> i32{
//     return a + b
// }
