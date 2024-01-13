import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './utils/db';
import auth from './routes/auth';
import category from './routes/product/category';
import product from './routes/product/product';
import banner from './routes/promotionals/banner';
import cart from './routes/product/cart';
import payment from './routes/payment';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000

app.use(cors({
    origin:'*',
    credentials: true,
}))

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/banner', banner);
app.use('/api/product', product);
app.use('/api/cart', cart);
app.use('/api/payment', payment);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
})