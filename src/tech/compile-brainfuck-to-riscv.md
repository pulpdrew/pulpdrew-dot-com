---
title: How to Compile Brainfuck to RISC-V with Rust
tags: tech
topics: 
  - Programming
  - Compilers
  - Rust
summary: 
date: 2020-11-28
layout: tech
---

A couple of weeks ago, I worked through [Learn Assembly by Writing Entirely Too Many Brainfuck Compilers](https://github.com/pretzelhammer/rust-blog/blob/master/posts/too-many-brainfuck-compilers.md). That article covers the basics of compiling Brainfuck to target x86, ARM, wasm, and LLVM IR. Here, I will cover some of the same information, but with a focus on targeting RISC-V assembly.

## Brainfuck

Brainfuck is 

## RISC-V

RISC-V is an open-source instruction set architecture (ISA). An ISA is a specification for a computer architecture that defines the interface between a processor and the programmer. A processor *implements* the RISC-V ISA when it understands encoded RISC-V assembly code. RISC-V is a relatively new ISA that was developed at UC Berkeley in 2010. Its popularity is growing among hardware and software companies, primarily due to its lack of licensing costs.

We will be compiling brainfuck to RISC-V assembly. This means that we need to translate each `Instruction` into one or more RISC-V instructions that instruct a RISC-V processor to carry out the Brainfuck `Instruction`. 

First, let's take a look at what RISC-V Assembly looks like. RISC-V is a register-based ISA. That means that there are some number of registers, and that those registers are the operands for each instruction. Registers are word-sized (32, 64, or 128 bits, depending on which version of RISC-V you are using). RISC-V has 32 registers, serving a variety of purposes.

| Register Names | Register Descriptions |
|----------------|-----------------------|
|`s0, s1, .. s11`| callee-saved registers. Useful for storing values that must persist during function calls.|
|`t0, t1, .. t6` | caller-saved registers. Useful for storing temporary values.|
|`a0, a1, .. a7` | registers for storing function arguments and return values.|
|`zero, ra, sp, tp, pc`| special-purpose registers, which we will ignore.|

We will only use two of these registers to run our brainfuck programs: `s0` will hold the value of our pointer, and `s1` will hold the value of whatever byte of memory we are manipulating. 


To move bytes between memory and registers, we use load and store instructions:

```text
# Load ('l') the byte ('b') from the address stored in s1 into s0
lb    s0, (s1)

# Treat the byte as unsigned ('u')
lbu   s0, (s1)

# Load the 2 bytes ('h' = half word) starting at address 100 into s0
lh    s0, 100

# Load the 4 bytes ('w' = word) starting at address 100 into t1
lw    t1, 100

# Load the constant ('i' = immediate value) 104 into s1
li    s1, 104

# Load the address of the str: label into s0
la    s0, str

# Store the byte in s1 into the memory address stored in s0
sb    s1, (s0)
```


We will also need some arithmetic to manipulate the memory. Arithmetic operations in RISC-V operate only on registers. To modify a value in memory, first load it into a register, modify the value in the register, and store it back in memory. 

```text
# Add 200 ('i' = immediate value) to s0, store the result in s1
addi  s1, s0, 200

# Add the value in s1 to the value in s0, store the result in s1
add   s1, s1, s0

# Subtract the value in s1 from the value in s0, store in s2
sub   s2, s0, s1

# RISC-V doesn't have a subtract immediate instruction, instead, add a negative.
# Subtract 100 ('i' = immediate value) from the value in s0, store in s1
addi  s1, s0, -100
```

To implement our `LoopStart` and `LoopEnd` behavior, we need a way to conditionally branch, loop, and jump around our programs.
```text

#

```

Finally, to read and write from stdin and stdout, we will need to make system calls. We will use the ReadChar and WriteChar system calls from (TODO: where are these from, exactly?).
```text
```


Now let's take a look at how we can translate each brainfuck `Instruction` into RISC-V.

```text
```

In Rust, we have:
```rust
pub fn compile_risc_v(program: &[Instruction]) -> String {
  let mut output = String::new();

  // Generate code to allocate the 30KB memory space
  output.push_str(".data\n");
  output.push_str("memory: .space 30000\n\n");

  // Register s0 will be our pointer. Set it to point to the beginning of memory
  output.push_str(".text\n");
  output.push_str("main:\n");
  output.push_str("la s0, memory\n");

  // Generate assembly for each instruction
  for (index, inst) in program.iter().enumerate() {
    match inst {
      Instruction::AddPtr { count } => {
        output.push_str(&format!("addi s0, s0, {}\n\n", count));
      }
      Instruction::SubPtr { count } => {
        output.push_str(&format!("addi s0, s0, {}\n\n", -(*count as i64)));
      }
      Instruction::AddByte { count } => {
        output.push_str("lbu s1, (s0)\n");
        output.push_str(&format!("addi s1, s1, {}\n", count));
        output.push_str("sb s1, (s0)\n\n");
      }
      Instruction::SubByte { count } => {
        output.push_str("lbu s1, (s0)\n");
        output.push_str(&format!("addi s1, s1, {}\n", -(*count as i64)));
        output.push_str("sb s1, (s0)\n\n");
      }
      Instruction::Read { count } => {
        output.push_str("li a7, 12\n");

        for _ in 0..*count {
            output.push_str("ecall\n");
        }

        output.push_str("sb a0, (s0)\n\n")
      }
      Instruction::Write { count } => {
        output.push_str("lbu a0, (s0)\n");
        output.push_str("li a7, 11\n");

        for _ in 0..*count {
            output.push_str("ecall\n");
        }

        output.push('\n');
      }
      Instruction::LoopStart { end } => {
        output.push_str("lbu s1, (s0)\n");
        output.push_str(&format!("bnez s1, start_{}\n", index));
        output.push_str(&format!("la t0, end_{}\n", end));
        output.push_str("jr t0\n");
        output.push_str(&format!("start_{}:\n\n", index));
      }
      Instruction::LoopEnd { start } => {
        output.push_str("lbu s1, (s0)\n");
        output.push_str(&format!("beqz s1, end_{}\n", index));
        output.push_str(&format!("la t0, start_{}\n", start));
        output.push_str("jr t0\n");
        output.push_str(&format!("end_{}:\n\n", index));
      }
    }
  }

  // Generate code to exit
  output.push_str("li	a0, 0\n");
  output.push_str("li 	a7, 93\n");
  output.push_str("ecall\n\n");

  output
}

```