# UI Kit
Using ReactJS mini-apps with custom .css

## Frontend Scrips
We are using webpack to pack .js files and .scss files into bundles. The setting for webpack is in `/webpack.config.js`

To install:
- set up nvm: `nvm use v16.13.0`
- install deps: `npm install`

To build .js bundles:
- for development `npm run dev`
- for production `npm run prod`

To build main.css bundle: 
- both dev/production `npm run css`

To serve locally the app:
- `make run-server`

Can access at `localhost:8080`