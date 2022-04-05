const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

const fs = require('fs');
const path = require('path');

const homeDir = process.env.HOME;
const host = process.env.APP_URL.split('//')[1];

//Options and webpackConfig added for using Laravel Valet SSL routing

mix.js('resources/js/app.js', 'public/js').vue()
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]).options({
        hmrOptions: {
            host: host,
            port: '8080',
        }
    }).webpackConfig({
        devServer: {
            https: {
                key: fs.readFileSync(path.resolve(homeDir, `.config/valet/Certificates/${host}.key`)),
                cert: fs.readFileSync(path.resolve(homeDir, `.config/valet/Certificates/${host}.crt`)),
            }
        }
    });
