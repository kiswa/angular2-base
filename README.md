# angular2-base
A simple base project for Angular 2 apps, using Gulp to automate tasks.

## Usage
Clone the repo to where you want to use it, then install the npm packages with `npm install`.

To generate the output directory `dist/` run the command `gulp`.

## Tests

Tests are in the `test` directory, with one already there as an example. To run the tests, use the command `gulp test`. This generates the JavaScript files, then runs the tests against them.

You can have the tests auto-run when tests or ts files change by running the `gulp watchtests` command.

## Production

For a production setup, uncomment the lines in `boot.ts` to put Angular in production mode. Then, run the minification task to minify vendor files `gulp minify`.

## Auto-Refresh when Developing

You may run `gulp watch` in a stand-alone terminal to have the output automatically updated when you save changes.

If you install the [fb-flo plugin](https://chrome.google.com/webstore/detail/fb-flo/ahkfhobdidabddlalamkkiafpipdfchp) on Chromium (Chrome) you can have automatic browser refresh as well.
