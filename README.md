# Slide Builder 

## Scriptable reveal.js fragments

### [Demo](http://benjaminbenben.com/slide-builder/example/)

A tiny wrapper to make it easier to generate slides & fragments for reveal.js

### Usage

```js
new slideBuilder(slideElement)
  .shown(() => console.log("setup slide"))
  .fragments([
    () => console.log("fragment #1"),
    () => console.log("fragment #2"),
    () => console.log("fragment #3")
  ])
  .hidden(() => console.log("teardown slide"))
```
