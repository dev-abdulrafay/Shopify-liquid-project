const Hapi = require('@hapi/hapi');
const Path = require('path');
const fs = require('fs');
const { Liquid } = require('liquidjs');
const engine = new Liquid({
    root: ['templates/'],
    extname: '.liquid'
});

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });
    
    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            try {
                const product = require('./product.json');
                const result = await engine.renderFile('product', { product });
                return result;
            } catch (e) {
                console.log(e);
                return e;
            }
            
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.'
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/cart/add.js',
        handler: (request, h) => {
            const payload = request.payload;
            console.log(payload);
            
            return { success: true };
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();