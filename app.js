// Dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
// Config
const { routes } = require('./config.json');

const app = express();

for (route of routes) {
    app.use(route.route,
        createProxyMiddleware({
            target: route.address,
            pathRewrite: (path, req) => {
                return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
            }
        })
    );
}

app.listen(80, () => {
    console.log('Proxy listening on port 80');
});