const path = require("path");
module.exports = {
    entry: [
        "./js/backend.js",
        "./js/debounce.js",
        "./js/pin.js",
        "./js/filter.js",
        "./js/utils.js",
        "./js/page-mode-module.js",
        "./js/move-pin.js",
        "./js/card.js",
        "./js/form.js",
    ],

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname),
        iife: true
    },
    devtool: false
};
