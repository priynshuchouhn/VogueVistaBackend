"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./utils/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const category_1 = __importDefault(require("./routes/product/category"));
const product_1 = __importDefault(require("./routes/product/product"));
const banner_1 = __importDefault(require("./routes/promotionals/banner"));
const push_notification_1 = __importDefault(require("./routes/promotionals/push-notification"));
const cart_1 = __importDefault(require("./routes/product/cart"));
const wishlist_1 = __importDefault(require("./routes/product/wishlist"));
const payment_1 = __importDefault(require("./routes/payment"));
const address_1 = __importDefault(require("./routes/user/address"));
const order_1 = __importDefault(require("./routes/order"));
const extra_1 = require("./controller/extra");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.use(express_1.default.json());
app.get('/api/check', extra_1.checkServerWorking);
app.use('/api/auth', auth_1.default);
app.use('/api/category', category_1.default);
app.use('/api/banner', banner_1.default);
app.use('/api/product', product_1.default);
app.use('/api/cart', cart_1.default);
app.use('/api/wishlist', wishlist_1.default);
app.use('/api/payment', payment_1.default);
app.use('/api/address', address_1.default);
app.use('/api/order', order_1.default);
app.use('/api/promotional', push_notification_1.default);
(0, db_1.default)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
    // setInterval(async () => {
    //     const res = await fetch('https://api.voguevista.live/api/check')
    //     const data = await res.json()
    //     console.log(new Date().toISOString(), data)
    //     await fetch('https://vogue-vista-other-services.onrender.com')
    // }, 60 * 1000)
    yield fetch('https://vogue-vista-other-services.onrender.com');
    console.log("Services Started");
}))
    .catch(err => {
    console.log(err);
});
