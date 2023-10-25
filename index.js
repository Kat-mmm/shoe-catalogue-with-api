import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import bcrypt from 'bcrypt';
import db from './config.js';
import ShoesService from './services/shoes-service.js';
import ShoesRoutes from './routes/shoes-routes.js';
import ShoesApi from './api/shoes-api.js';
import AuthRoutes from './routes/authRoutes.js';
import UserService from './services/user-service.js';
import CartService from './services/cart-service.js';
import CartApi from './api/cart-api.js';

//Service Instances
const shoesService = ShoesService(db);
const userService = UserService(db);
const cartService =  CartService(db);

//Routes Instances
const authRoutes = AuthRoutes(userService, bcrypt);
const shoesRoutes = ShoesRoutes(shoesService);
const cartRoutes = ShoesRoutes(cartService);
const shoesAPI = ShoesApi(shoesService);
const cartAPI = CartApi(cartService);

let app = express();

app.engine('handlebars', engine({ 
    defaultLayout: false,
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

//Auth Routes
app.get('/login', authRoutes.getLogin)
app.get('/register', authRoutes.getRegister)
app.post('/register', authRoutes.register)
app.post('/login', authRoutes.login);
app.get('/logout', authRoutes.logout);

//shoes catalogue app routes
app.get('/', authenticateUser, authRoutes.getLogin);
app.get('/admin', authenticateUser, checkAdmin, shoesRoutes.index)
app.get('/shoes', authenticateUser, shoesRoutes.getShoes)
app.get('/shoe/add', authenticateUser, checkAdmin, shoesRoutes.addShoe);
app.get('/shoe/checkout', authenticateUser, cartRoutes.checkout)
app.post('/shoe/add', shoesRoutes.addNewShoe);

//shoes api routes
app.get('/api/shoes', shoesAPI.all);
app.get('/api/shoes/brand/:brandname', shoesAPI.getShoesByBrand)
app.get('/api/shoes/size/:size', shoesAPI.getShoesBySize)
app.get('/api/shoes/color/:color', shoesAPI.getShoesByColor)
app.get('/api/shoes/brand/:brandname/size/:size', shoesAPI.getShoesByBrandAndSize)
app.get('/api/shoes/color/:color/size/:size', shoesAPI.getShoesByColorSize)
app.get('/api/shoes/brand/:brandname/color/:color', shoesAPI.getShoesByBrandColor)
app.get('/api/shoes/brand/:brandname/size/:size/color/:color', shoesAPI.getShoesByBrandSizeColor)
app.post('/api/shoes/sold/:id', shoesAPI.updateStockLevel)
app.post('/api/shoes', shoesAPI.addShoeToStock)

//cart api routes
app.get('/api/cart/get', cartAPI.getCart);
app.get('/api/cart/shoes/get', cartAPI.getCartShoes);
app.post('/api/cart/add/:shoeId', cartAPI.addToCart);
app.post('/api/cart/remove/:shoeid', cartAPI.removeFromCart);

function authenticateUser(req, res, next) {
    if (req.session.user) {
        next(); 
    } else {
        res.redirect('/login');
    }
}

function checkAdmin(req, res, next) {
    if (req.session.user && req.session.user.is_admin) {
        next();
    } else {
        res.redirect('/');
    }
}

let PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('App running on port ' + PORT);
})