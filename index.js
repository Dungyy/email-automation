const express = require('express');
const app = express();
const Bree = require('bree');
const PORT = process.env.PORT || 9000;

require("dotenv").config()

const bree = new Bree({
    jobs : [{
        name: 'sendEmail',
        cron: '* * * * *',
        worker: {
            workerDate: {
                description : "This jo wil send emails"
            }
        }
    }]
})

bree.start()

app.listen(PORT, () => console.log(`SERVER RUNNING | ${PORT}`))