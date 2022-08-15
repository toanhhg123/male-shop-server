require('dotenv').config();
const morgan = require('morgan');
const express = require('expsdress');
const app = express();
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 8081;
const connect = require('./config/connectDB');
const { importUserRouter } = require('./dataImport');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/ProductRoute');
const orderRouter = require('./routes/OrderRouter');
const chatRouter = require('./routes/chatRouter');
const messageRouter = require('./routes/messageRouter');
const adminRouter = require('./routes/AdminRouter');

connect();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/order', orderRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);
app.use('/import', importUserRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
