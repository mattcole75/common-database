const express = require('express');
const app = express();
const port = 8080;

// app.use(express.static('public'));
// app.use('/static', express.static('public'))
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('Static file server is running');
});

app.listen(port, () => console.log(`Static file server running on port: ${port}`));