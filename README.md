# Codinsky

Code inforgraphics. Cognition-driven.

[Playground](https://codinsky.js.org/)

<div align="center">
  <img alt="A sunburst diagram showing Redux createStore script" src="art/createStore.png">
</div>

[`redux/createStore.js`](https://github.com/reduxjs/redux/blob/a58aa4eba546429c3e48dedc2368e4c1083b5ca4/src/createStore.js)

# Motivation

> Can't see the forest for the trees.

Immersed in a sea of statements, it is natural for developers to overlook the higher-level qualities of their code.

Codinsky provides a concise graphical overview of your script.

It can reveal a host of possible issues, and usher you to the land of cleaner, better structured, and more intelligible code.

# Example

Below is [`react-dom/client/ReactDOMComponent.js`](https://github.com/facebook/react/blob/c954efa70f44a44be9c33c60c57f87bea6f40a10/packages/react-dom/src/client/ReactDOMComponent.js).

With all due respect to Dan Abramov, this is a-hashtag-mess.

<div align="center">
  <img alt="A sunburst diagram showing React's dom component script" src="art/ReactDOMComponent.svg">
</div>

Insights:

## Excess

Generally speaking, if the sunburst visual is intimidating, so is the script.

There is just too much happening here, length and breadth.

Breaking such script down will allow readers to better assimilate the code and will make navigation easier. (Our spatial memory is potent, but it goes out of the window with scripts as such.)

## Nested Branching

<div align="center">
  <img alt="A sunburst diagram showing React's dom component script" src="art/ReactDOMComponent-branching.svg">
</div>

Testing nightmare. Nested branches are also hard to comprehend because they consume both working-memory slots and logical reasoning cycles.

If you look at the code, much is wrapped with:

```javascript
if (__DEV__) {
  // Anything from 1 to 100 line block here.
}
```

A few concepts pop to mind:

- **Seperation of concerns**: dev/no dev.
- **Validation**: A cross-cutting concern for which this pattern is often used: `Client > Validation > Implementation`. In OOP decorators do this; it's much easier with functional style.
- **Masking**: All these dev blocks are in the way for someone wishing to understand the production code.

So perhaps anything dev should live in its own script. Doing so would leave us with:

<div align="center">
  <img alt="A sunburst diagram showing React's dom component script" src="art/ReactDOMComponent-prod.svg">
</div>

That's better. With the exception of the flare around 8:00, this is very much a few functions with case statement (or else-if trains in this script).

## High Coupling

<div align="center">
  <img alt="A sunburst diagram showing React's dom component script" src="art/ReactDOMComponent-imports.svg">
</div>

You many need to zoom to see it, but between 0:00-2:00 it's nearly all import.

This script has a-hashtag-lots of imports from quite a few sources. Suggesting:

- Perhaps it is doing too much.
- It could be hard to test because you may have too much to mock.

Again, possibly breaking this script down is the way forward.
