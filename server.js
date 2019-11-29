var rp = require('request-promise');
var express = require('express');
var cors = require('cors');
var app = express();

const SERVER_PORT = 3000;
const API_URL = 'https://api.mercadolibre.com/';
const SEARCH_API_EP =  `${API_URL}sites/MLA/search?q=`;
const DETAIL_API_EP =  `${API_URL}items/`;
const LIMIT  = 4;
const OFFSET = 0;

// Logg
app.use(function (req, res, next) {
    console.log(`Request | ${req.originalUrl} | `, new Date());
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

    const offset = (req.query.offset ? req.query.offset : OFFSET);

    var options = {
        uri: `${SEARCH_API_EP}${req.query.q}&limit=${LIMIT}&offset=${offset}`,
        json: true
    };

    rp(options)
    .then(data => {

        if(!data){
            res.status(404).send({ error: 'No se encontraron resultados' });
        }

        var items = [];
        items = Object.values(data.results).map(
            result => {
                return {
                    id: result.id,
                    title: result.title,
                    price: result.price,
                    thumbnail: result.thumbnail,
                    state_name: result.address.state_name,
                    condition: result.condition,
                    currency_id: result.currency_id,
                    category_id: result.category_id,
                    author: result.seller,
                    free_shipping : result.shipping.free_shipping
                };
                
            }
        );
        console.log(items);
        res.send({paging: data.paging, items: items, categories:data.available_filters[0].values});
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
    .then(result => {

        if(!result){
            res.status(404).send({ error: 'No se encontraron resultados' });
        }

        var item = {
            id: result.id,
            title: result.title,
            price: result.price,
            currency: result.currency_id,
            thumbnail: result.thumbnail,
            state_name: result.state_name,
            condition: result.condition,
            free_shipping : result.shipping.free_shipping,
            sold_quantity: result.sold_quantity,
            description: result.description
        };
    
        res.send(item);
    })
    .catch( err => {
        res.status(400).send({ error: err });
    });
      
});

app.listen(SERVER_PORT, function () {
  console.log(`API escuchando en puerto ${SERVER_PORT}`);
});