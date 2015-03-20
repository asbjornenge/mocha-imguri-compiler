# mocha-imguri-compiler

An img -> base64 uri compiler for mocha

## Install

```sh
npm install --save mocha-imguri-compiler
```

## Use

```sh
mocha --compilers png:mocha-imguri-compiler
```

***NOTE:*** *The compiler will register for a list supported image files, and not only the* ***png*** *specified in the compilers argument*

enjoy
