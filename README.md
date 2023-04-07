# Deploying to GitHub Pages with Create React App

This project was created after several frustrating attempts to deploy the same app with [ViteJS](https://vitejs.dev/).

> Check it out live [here](https://lifebalance.github.io/shopping-cart-cra).

## Problem

After carefully following the instructions at [ViteJS/GitHub Pages](https://vitejs.dev/guide/static-deploy.html#github-pages) I ended up with 404 errors for the images.

## Solution

I decided to switch to [Create React App](https://github.com/facebook/create-react-app), following the instructions at [CRA/GitHub Pages](https://create-react-app.dev/docs/deployment#github-pages), and all worked as expected.

Before I forget, I had to use `require` for importing the images in the React components that needed them, which was fine in **CRA**, but forbidden in **Vite**.

## Conclusion
I love ViteJS, but I gotta give the win to CRA: well documented, more flexible (allowing the use of `require`), it just works. I'll keep trying to find a working approach in Vite tho 😕.
