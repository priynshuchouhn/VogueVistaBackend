import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './utils/db';
import auth from './routes/auth';
import category from './routes/product/category';
import product from './routes/product/product';
import banner from './routes/promotionals/banner';
import pushNotification from './routes/promotionals/push-notification';
import cart from './routes/product/cart';
import wishlist from './routes/product/wishlist';
import payment from './routes/payment';
import address from './routes/user/address';
import order from './routes/order';


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
app.use('/api/wishlist', wishlist);
app.use('/api/payment', payment);
app.use('/api/address', address);
app.use('/api/order', order);
app.use('/api/promotional', pushNotification);

connectDB().then(() => {
    return fetch('https://vogue-vista-other-services.onrender.com')
    
}).then(res => {
    console.log("Services Started");
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);    
    })
}).catch(err => {
    console.log(err);
})