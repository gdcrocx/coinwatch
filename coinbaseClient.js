var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('*', function (req, res, next) {
    next();
});

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var Client = require('./node_modules/coinbase').Client;

var cbApiKey = process.env.cbApiKey;
var cbApiSecret = process.env.cbApiSecret;
var cbVersion = process.env.cbVersion;

console.log(cbApiKey + " / " + cbApiSecret + " / " + cbVersion);

var client = new Client({
    'apiKey': cbApiKey,
    'apiSecret': cbApiSecret,
    'version': cbVersion
});

app.get('/getBTCUSDBuyPrice', function (req, res) {
    client.getBuyPrice({ 'currencyPair': 'BTC-USD' }, function (err, obj) {
        console.log('Bitcoin USD Buy Price: ' + obj.data.amount);
        console.dir(obj.data);
        console.log(JSON.stringify(obj.data));
        return Promise.resolve(obj.data);
    });
});

app.get('/getLTCUSDBuyPrice', function (req, res) {
    client.getBuyPrice({ 'currencyPair': 'LTC-USD' }, function (err, obj) {
        console.log('LiteCoin USD Buy Price: ' + obj.data.amount);
        return Promise.resolve(res.status(200).send(obj.data.amount).end());
    });
});

app.get('/getETHUSDBuyPrice', function (req, res) {
    client.getBuyPrice({ 'currencyPair': 'ETH-USD' }, function (err, obj) {
        console.log('Etherium USD Buy Price: ' + obj.data.amount);
        return Promise.resolve(res.status(200).send(obj.data.amount).end());
    });
});

app.get('/getBTCUSDSellPrice', function (req, res) {
    client.getSellPrice({ 'currencyPair': 'BTC-USD' }, function (err, obj) {
        console.log('Bitcoin USD Sell Price: ' + obj.data.amount);
        return Promise.resolve(res.status(200).send(obj.data.amount).end());
    });
});

app.get('/getLTCUSDSellPrice', function (req, res) {
    client.getSellPrice({ 'currencyPair': 'LTC-USD' }, function (err, obj) {
        console.log('LiteCoin USD Sell Price: ' + obj.data.amount);
        return Promise.resolve(res.status(200).send(obj.data.amount).end());
    });
});

app.get('/getETHUSDSellPrice', function (req, res) {
    client.getSellPrice({ 'currencyPair': 'ETH-USD' }, function (err, obj) {
        console.log('Etherium USD Sell Price: ' + obj.data.amount);
        return Promise.resolve(res.status(200).send(obj.data.amount).end());
    });
});

var url = "192.168.10.5"
var port = "8080"

var server = app.listen(port, function () {
    console.log("Coinbase Service Server listening at http://%s:%s", url, port);
});

// client.getPaymentMethods(function(err, paymentMethods) {
// console.log(paymentMethods);
// });

// var buyPriceThreshold = 200;
// var sellPriceThreshold = 500;

// client.getAccount('primary', function (err, account) {

// client.getSellPrice({ 'currency': 'USD' }, function (err, sellPrice) {
//     //if (parseFloat(sellPrice['amount']) <= sellPriceThreshold) {
//     account.sell({ 'amount': '1', 'currency': 'BTC' }, function (err, sell) {
//         console.log(sell);
//     });
//     ///}
// });

// client.getCurrencies(function (err, currencies) {
//     console.log('Currencies: ' + JSON.stringify(currencies));
// });

//     client.getBuyPrice({ 'currency': 'USD' }, function (err, buyPrice) {
//         if (parseFloat(buyPrice['amount']) <= buyPriceThreshold) {
//             account.buy({ 'amount': '1', 'currency': 'BTC' }, function (err, buy) {
//                 console.log(buy);
//             });
//         }
//     });
// });
//return res.status(404).send("Err 404: File not found").end();
//});