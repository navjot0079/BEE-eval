const express = require('express');
const fs = require('fs');
const app = express();


app.use((req, res, next) => {
    const logDetails = `
        Method: ${req.method}
        URL: ${req.url}
        IP: ${req.ip}
        Time: ${new Date()}
    `;

    fs.appendFile('user_logs.txt', logDetails, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Request details logged');
        }
    });

    next();
});

app.get('/', (req, res) => {
    res.send("Main Root");
});

app.get('/home', (req, res) => {
    res.send("home");
});

app.get('/about', (req, res) => {
    res.send("about");
});

app.get('/reddit/:data', (req, res) => {
    res.send("Reddit page");
    console.log(req.params);
    

    fs.appendFile('user_logs.txt', `Reddit Param Data: ${JSON.stringify(req.params)}\n`, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        }
    });
});


app.get('/reddit/:profile/:comments', (req, res) => {
    res.send("Reddit Page Comments");
    console.log(req.params);

    const { profile, comments } = req.params;
    console.log(profile, comments);

    fs.appendFile('user_logs.txt', `Reddit Profile: ${profile}, Comments: ${comments}\n`, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});