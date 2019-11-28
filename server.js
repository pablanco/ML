var rp = require('request-promise');
var express = require('express');
var cors = require('cors');
var app = express();

const SERVER_PORT = 3000;
const API_URL = 'https://api.mercadolibre.com/';
const SEARCH_API_EP =  `${API_URL}sites/MLA/search?q=`;
const DETAIL_API_EP =  `${API_URL}items/`;

// Logg
app.use(function (req, res, next) {
    console.log(`Request | ${req.originalUrl} | `, Date.now());
    next();
});

// Set CORS options
const corsOptions = {
    origin: true,
    methods: ['GET', 'OPTIONS']
};
// Activate CORS for specific paths
app.all('/api/*', cors(corsOptions));

app.get('/api/items', function (req, res) {
  
    if(!req.query.q){
        res.status(404).send({ error: 'Ingrese un dato a buscar' });
    }

    var options = {
        uri: `${SEARCH_API_EP}${req.query.q}`,
        json: true
    };

    rp(options)
    .then(data => {

        var response = [];
        //console.log(data.results);
        response = Object.values(data.results).map(
            r => {
                return {
                    id: r.id,
                    title: r.title,
                    price: r.price,
                    thumbnail: r.thumbnail,
                    state_name: r.address.state_name,
                    condition: r.condition,
                    currency_id: r.currency_id
                };
                
            }
        );
        res.send(response);
    })
    .catch( err => {
        res.status(400).send({ error: err });
    });
      
});

app.get('/api/items/:id', function (req, res) {
    
    if(!req.params.id){
        res.status(404).send({ error: 'Debe establecer la id del item a buscar' });
    }

    var options = {
        uri: `${DETAIL_API_EP}${req.params.id}`,
        json: true
    };

    rp(options)
    .then(r => {

        var response = {
                id: r.id,
                title: r.title,
                price: r.price,
                currency: r.currency_id,
                thumbnail: r.thumbnail,
                state_name: r.state_name,
                condition: r.condition,
                free_shipping : r.shipping.free_shipping,
                sold_quantity: r.sold_quantity,
                description: r.description
            };
        
        res.send(response);
    })
    .catch( err => {
        res.status(400).send({ error: err });
    });
      
});

app.listen(SERVER_PORT, function () {
  console.log(`API escuchando en puerto ${SERVER_PORT}`);
});