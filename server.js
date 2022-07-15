require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 8081;
const connect = require('./config/connectDB');
const { importUserRouter } = require('./dataImport');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/ProductRoute');
const orderRouter = require('./routes/OrderRouter');
const chatRouter = require('./routes/chatRouter');
const messageRouter = require('./routes/messageRouter');

connect();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/order', orderRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);
app.use('/import', importUserRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
