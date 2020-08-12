---
title: RLox - A Lox Interpreter in Rust
tags:
  - tech
summary: Lox is a programming language designed by Bob Nystrom for use in his excellent book, "Crafting Interpreters." Nystrom walks readers through building two Lox interpreters - a Tree-Walk interpreter written in Java and a Single Pass Bytecode Compiler + Stack-based VM written in C. After working my way through the book, I decided to implement a third version of the interpreter in Rust.
date: 2020-05-26
---

Lox is a dynamically-typed scripting language designed by [Bob Nystrom](http://journal.stuffwithstuff.com/) for use in his book, [Crafting Interpreters](http://craftinginterpreters.com/). The book is an excellent introduction to programming language design and implementation. It's free and extremely well-written. In it, Nystrom walks readers through building two Lox interpreters. The first, JLox, is a Tree-Walk interpreter written in Java. The second, CLox, is a more performant Single-Pass Bytecode Compiler + Stack-based VM written in C.

After working my way through the book, I decided to implement a third version of the interpreter in Rust. My implementation, imaginatively named RLox, is a hybrid of JLox and CLox. The parser builds an AST, then a compiler turns that AST into bytecode that is executed on a Stack-based VM similar to that of CLox. In the following sections, I will provide a brief overview of RLox, with a focus on the places where it differs the most from RLox and CLox. Along the way, I'll highlight some things I enjoyed about programming in Rust.

If you just want to check out the RLox source code, it is available [here](https://github.com/pulpdrew/rlox).

## The Scanner

```rust
pub struct Scanner<'a> {
    /// An Iterator over the source
    characters: Chars<'a>,

    /// The source that makes up the current Token
    current: String,

    /// The index in source where current begins
    current_start_index: usize,
}
```

The RLox scanner, like the CLox scanner, does scanning 'on-demand' instead of loading every token from a source file into a collection. It is implemented as a single struct that exposes a `new()` and a `next()` method. The `new()` method accepts a `&str` and initializes a new `Scanner` struct that owns an iterator over the characters in the source `&str`. The `next()` method then uses that iterator to return the next token in the source file. Instead of returning a special end-of-file token, `next()` returns `None` once there are no more tokens.

Having a `next()` implementation means that `Scanner` has Rust's `Iterator` trait. That means Rust provides implementations for a whole bunch of other potentially useful methods for free. For example, if we want to store all of the tokens in a collection instead of a scanning on-demand, we could use the `collect()` method on `Scanner`, without having to implement it.

```rust
pub struct Token {
    pub span: Span,
    pub kind: Kind,
}

pub struct Span {
    pub start: usize,
    pub end: usize,
}

pub enum Kind {
    LeftBrace,
    NumberLiteral(f64),
    ...
}
```

A `Token` is represented by a `Kind` and a `Span`. `Kind` is an enum with values like `Kind::LeftBrace`, `Kind::LessEqual`, and `Kind::NumberLiteral`. Rust enums variants can each hold their own state, so `Kind::NumberLiteral` holds the numeric value of the literal it represents. `Span` represents a range in the source file with a start and end index. My `Span` is a simplified version of the Rust Standard library `Span` type. Each `Token` is tagged with a `Span` so that later stages in the interpreter pipeline can output errors that indicate where in the source file the problem originated. RLox can output nicer errors than CLox or JLox, which only track the line number for each token.

## The Parser

```rust
pub struct Parser<'a> {
    scanner: Peekable<Scanner<'a>>,
}
```

The RLox Parser is a struct that owns a `Peekable<Scanner>`. The `Peekable` part is a Rust type that wraps any iterator and adds a `peek()` method to it. This is all the state we need to implement a recursive descent parser for the Lox's LL(1) grammar. Like the JLox parser, the RLox parser takes a source string and returns an abstract syntax tree (AST) representing the program described by the source string. There is no compilation in the parser module.

```rust
pub struct SpannedAstNode {
    pub span: Span,
    pub node: Option<AstNode>,
}

pub enum AstNode {
    Unary {
        operator: Token,
        expression: Box<SpannedAstNode>,
    },
    Binary {
        left: Box<SpannedAstNode>,
        operator: Token,
        right: Box<SpannedAstNode>,
    },
  ...
}
```

A `SpannedAstNode` is a lot like a `Token` - it owns some data and a `Span` that tells us where that data came from. In this case, though, the data is a node in an AST. Rust's `Box<T>` type is like a pointer to `T`. They're necessary here so that each `AstNode` variant is a fixed size, known at compile time.

As in most recursive descent parsers, each production in the [Lox Grammar](http://craftinginterpreters.com/appendix-i.html) gets its own method in the RLox parser. Each of these methods return a `Result<SpannedAstNode, ParsingError>`. If there is a syntax error, then the `Err` variant is returned with a relevant message and `Span`. In most of the parsing methods, these errors are propagated (using the convenient `?` operator) up the call chain. The top-level parsing method, which recognizes a sequence of declaration productions, handles the errors by adding them to a list of all detected errors, calling a `synchronize` method, and then attempting to parse more of the program so that any remaining errors can be detected as well.

## The Compiler

```rust
impl Compiler {
    fn compile_node(
            &mut self,
            bin: &mut Executable,
            spanned_node: &SpannedAstNode,
        ) -> Result<(), CompilerError> {
        ...
    }
}
```

If the source is syntactically valid, then the full AST is passed to the `Compiler`. Most of the work is done in the `compile_node()` method, which converts the AST into executable `OpCode`s, which it appends to the provided `Executable`. There are a few intermediate methods that wraps the `Executable` in an `ObjFunction` and an `ObjClosure` to simplify later stages of the interpreter pipeline.

```rust
pub enum OpCode {
    Constant(usize),
    Return,
    Add,
    ...
}
```

Unlike CLox `OpCode`s, RLox `OpCode`s are not true bytecodes - they are Rust enum variants, each of which are ~9 Bytes. I sacrificed some memory usage and portability to embedded devices in favor of simplicity.

Also unlike CLox, RLox does not aspire to be a single-pass compiler. This generally makes compilation easier, because more information is available during compilation. This is most apparent when compiling a for-loop. CLox generates some [intricate jumps](http://craftinginterpreters.com/jumping-back-and-forth.html#for-statements) when compiling a for-loop because it must compile statements as it sees them. RLox has full access to every statement making up the for-loop declaration at compile time and can compile them each individually, whenever it wants. This results in Bytecode that is more straightforward and identical to the bytecode generated by an equivalent while loop (cf. the following loops each result in the same bytecode).

```
{
    for (var i = 0; i < 5; i = i + 1) {
        print i;
    }

    var i = 0;
    while (i < 5) {
        print i;
        i = i + 1;
    }
}

Index  OpCode              Arguments
------------------------------------
00000  Constant            0[Number(0)]
00001  GetLocal            0
00002  Constant            1[Number(5)]
00003  Less
00004  JumpIfFalse        14
00005  Pop
00006  GetLocal            0
00007  Print
00008  GetLocal            0
00009  Constant            2[Number(1)]
00010  Add
00011  SetLocal            0
00012  Pop
00013  Jump                1
00014  Pop
00015  Pop
```

## The VM

```rust
pub struct VM {
    ip: usize,
    base: usize,
    stack: Vec<Value>,
    globals: HashMap<String, Value>,
}
```

The RLox `VM` is shown above. `ip` is an index into an `Executable` list of `OpCode`s, `base` is an index into the `stack` of `Value`s that points to the first `Value` related to the current function, and `globals` holds all of the currently defined global variables.

```rust
impl VM {
    pub fn execute<W: Write>(
        &mut self,
        closure: &ObjClosure,
        output_stream: &mut W,
    ) -> Result<(), RuntimeError> {
        ...
    }
}
```

The most important method on `VM` is `execute()`, which accepts a closure to execute and a `Write` stream to which any program output is written. The output stream is accepted as a parameter to enable end-to-end language tests that make assertions about program output. The body of `execute()` is simply a while loop that reads an `OpCode` from the provided `ObjClosure` (which holds an `ObjFunction`, which holds an `Executable`), matches it to some action, and takes that action.

## Memory

```rust
pub enum Value {
    Number(f64),
    Bool(bool),
    Nil,
    Function(Rc<ObjFunction>),
    Closure(Rc<ObjClosure>),
    String(Rc<ObjString>),
    Class(Rc<ObjClass>),
    Instance(Rc<ObjInstance>),
    BoundMethod(Rc<ObjBoundMethod>),
}
```

The `VM` is stack-based. It has no registers and all of the operations are done on `Value`s that live on the stack. `Value` is defined as yet another Rust enum. `Value`s hold either an immediate value (`Number`, `Bool`, `Nil`), or a reference-counted pointer to some memory that lives on the heap. The Rc pointers provide garbage collection (unfortunately susceptible to reference cycles) and enable cloning `Value`s whenever necessary.

Any `ObjX` type is a struct that lives on the heap. Each of these types implements the `fmt::Debug` and `fmt::Display` traits so that they can be printed. Some of these types, such as `ObjClosure` and `ObjInstance` require mutabilty. Since the VM can only access them through `Rc` pointers, they include `RefCell` type fields so that they can be borrowed mutably at runtime. Unfortunately, this means that we get slightly weaker compile-time guarantees.

## Conclusion

RLox was my first Rust project, and I learned a lot about the language while working with it. It's certainly frustrating at times, but I attribute that more to my own inexperience than to Rust itself. After implementing a hashtable and a dynamically sized array from scratch while implemented CLox, Rust's standard library types were a breath of fresh air. The trait system is extremely powerful, once you get used to it. And I never had to deal with a segfault.

I've become really interested in language design and implementation in the last year or so, and building these three interpreters was a valuable experience. Again, I strongly recommend Crafting Interpreters, it's approachable, well-written, and includes just enough thoery to learn something new while doing something practical. Lox itself is a straightforward language, but the inclusion of classes and closures made it a challenge beyond the simple imperative languages often found in university classes or other online tutorials.

If you want to check out the RLox source code, it is available [here](https://github.com/pulpdrew/rlox).
