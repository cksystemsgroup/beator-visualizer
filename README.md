# Beatle

A visualization tool for the BEATOR2 model format.

Read the [thesis](thesis.pdf) for an in depth look at the features.

# How to use

In the browser:

- Open the [website](https://cksystemsgroup.github.io/beator-visualizer/)

EITHER

- Click the _upload file_ button
- Select desired model
- Click _evaluate model_ button

OR

- Click _use example file_ button

Locally:

- **Prerequisites**: [Node.js](https://nodejs.org/en/) and npm
- Clone repository
- Run `npm install` to install dependencies
- Run `npm start` to start local server
- Load model like in the browser

The example file models the following C\* source code:

```c
uint64_t* x;

uint64_t main() {
  uint64_t a;
  x = malloc(1);
  *x = 0;
  read(0, x, 1);
  a = *x;

  return *(x + a);
}
```

# How to create a model

Please follow the steps described [here](https://github.com/cksystemsgroup/unicorn#Usage).

In this guide the the **unicorn** tool is referred to for generation of the model file. There are other options out there such as [monster](https://github.com/cksystemsgroup/monster) and [beator](https://github.com/cksystemsteaching/selfie/blob/main/tools/beator.c).
