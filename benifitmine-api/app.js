const express = require("express")
const dotenv = require('dotenv');
const app = express();
const connectDB = require("./db/connect");
const bodyParser = require('body-parser');
 const referral_route = require('./routes/referral');
 const usdtReferral_route = require('./routes/usdtReferalRoute');
const errorHandler = require('./middleware/errorHandler');
var cors = require('cors')
const corsOptions = {
    origin: "*",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
dotenv.config();
app.use(bodyParser.json());
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

 app.use('/api', referral_route);
 app.use('/api', usdtReferral_route);
 

    app.get("/", (req, res) => {
        res.send("Hi,I am benifit.me api 0~0");
    });


const Start = async () => {
    try {
        await connectDB(process.env.MANGODB_URL);
        app.listen(PORT, () => {
            console.log(`Running on port ${PORT}`);
        });
    } catch (error) {
        console.log('error', error);
    }
}

Start();