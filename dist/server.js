"use strict";
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
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/api/auth', auth_1.default);
app.use('/api/category', category_1.default);
app.use('/api/banner', banner_1.default);
app.use('/api/product', product_1.default);
(0, db_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
});
