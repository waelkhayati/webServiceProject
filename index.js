const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cheerio = require ('cheerio');

const app = express();


let ref = [
    { search: 'www.pinterest.com/search/pins/?q=var' },
    { search: 'www.behance.net/search/images?search=var' },
    { search: 'www.pexels.com/search/var' },
    { search: 'www.freepik.com/search?format=search&type=photo&query=var' },
    { search: 'stock.adobe.com/search?k=var' },
    { search: 'www.gettyimages.com/search/2/image?phrase=var' },
    { search: 'unsplash.com/s/photos/var' },
    { search: 'www.istockphoto.com/search/2/image?phrase=var' },
    { search: 'pixabay.com/images/search/var' },
    { search: 'www.dreamstime.com/photos-images/var' }
]


app.get('/api/:test', function(req, res) {
    res.send("tagId is set to " + req.params.test);
});



app.post('/api/color/:test', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.send('www.pinterest.com/search/pins/?q={photo}' + req.params.test)
            res.json({
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

    jwt.sign({user}, 'secretkey', { expiresIn: '3600s' }, (err, token) => {
        res.json({
            token
        });
    });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

app.listen(5000, () => console.log('Server started on port 5000'));