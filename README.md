# Shopify Developer Challenge

Welcome, potential Shopify Expert!

This challenge aims to gauge your Shopify skills through the creation of a simple Product Detail Page (PDP) using Shopify Liquid Syntax and the AJAX cart API, all contained within this repository.
## Setup

As mentioned, the challenge is self contained within this repository so there will be no need to create a dev store or anything like that. Instead we created a little module that will show rendered liquid code, serve static assets, and handle the cart POST request for you. And while it helps if you have an understanding of node-js, it should be simple enough to run without any help.

Simply follow these instructions to get the project running:

1. Fork this repository into your own github profile and make any changes in that repository space.
2. Clone the repository onto your development environment.
3. From the new folder, install the required modules using `npm install` (Or your favorite package manager).
4. Start the development server using `npm run dev`.

You should now have a development server running on port `3000` that will display the default information.

## Challenge Instructions

*Congratulations! You have made it this far!* Now for the actual fun part.

The simple app is a single route web server that serves liquid templates out of the `templates` folder. Inside that folder there is a base `template.liquid` folder as well as the main file, `product.liquid` which serves as the main template file. It would be best to keep the template files simple, but you should be able to add additional templates or template parts as required.

The data for the product page comes from the `product.json` file in the root of the main directory. This is a product object taken from an actual Shopify store and is passed to the rendering engine as the variable `product` which you should see in the `product.liquid` file.

Any static files can be placed inside the `public` folder and they will be served from there. The images referenced in the product object are already inside that folder and can be accessed at `/images/{filename}.png`.

So here is what we are looking for.

* Using the liquid templates and whatever static assets you need, create a single simple product detail page that renders the product details.
* Make sure to add some style. You can do this with a simple vanilla CSS file, a `<style>` tagin the head of the page, or if you are comfortable - with your favorite css compiler.
* The PDP should have an add to cart button that is clearly visible.
* Using some front end javascript, attach a handler to the add to cart button that posts the appropriate information the `cart/add.js` route. That route will simply return the data `{ success: 1 }` so display a success message to let the user know their product was added correctly!
* Make sure the add to cart request sends the appropriate data to the endpoint to add an item to the cart (Using the shopify API paradigm).


## Troubleshooting tips

Since this is not _actually_ a shopify site, we can't expect it to behave exactly like a shopify site in terms of error handling. If an error occurs (as in a mis-typed variable, or bad liquid syntax) the page will return a 500 error. All errors are logged in the console so look out there for what might be going wrong. 

To stop the development server, simlpy do a `ctrl` + `c` and the node process will stop.

# LASTLY: THE MOST IMPORTANT PART

When you are done - remove _ALL_ of the text from this README, and replace it with a description of what you did. Tell us why you made the choices you did, what you would have liked to do better, what was your favorite part, and most importantly, what would you change if this we're _ACTUALLY_ a shopify theme.

Once you have that done - Commit a new branch - and send us a link to your repo so that we can review what you did.
