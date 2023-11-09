import assert from 'assert';
import pgPromise from 'pg-promise';
import CartService from '../services/cart-service.js';
import ShoesService from '../services/shoes-service.js';
import UserService from '../services/user-service.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const password = process.env.Password;
const encodedPassword = encodeURIComponent(password);


const DATABASE_URL = `postgresql://postgres:${encodedPassword}@localhost:5432/shoesdb`;

const connectionString = process.env.DATABASE_URL || DATABASE_URL;
const db = pgPromise()(connectionString);

describe("Shoe Catalogue Tests", function () {
    beforeEach(async function () {
        try {
            await db.none("DELETE FROM cart;");
            await db.none("DELETE FROM users WHERE name <> $1", ['admin']);
            await db.none('DELETE FROM shoes;')
        } catch (err) {
            console.log(err);
            throw err;
        }
    });
    
    it("should be able to add a user", async function () {
        let userService = UserService(db);

        const hashedPassword = await bcrypt.hash('user1234', 10);

        await userService.addUser('Liam Carter', 'Liam@gmail.com', hashedPassword);

        const users = await userService.getUsers();

        assert.strictEqual(1, users.length);
    });

    it("should be able to get a user by email", async function () {
        let userService = UserService(db);

        const hashedPassword = await bcrypt.hash('userFrank', 10);

        await userService.addUser('Frank', 'Frank@gmail.com', hashedPassword);
        const user = await userService.getUserByEmail('Frank@gmail.com');

        assert.strictEqual(user.name, 'Frank');
    });

    it("should be able to get a user by id", async function () {
        let userService = UserService(db);

        const hashedPassword = await bcrypt.hash('userJim', 10);

        const user = await userService.addUser('Jim', 'Jim@gmail.com', hashedPassword);
        const fetchedUser = await userService.getUserById(user.id);

        assert.strictEqual(fetchedUser.email, 'Jim@gmail.com');
    });

    it("should be able to add a new shoe", async function () {
        let shoesService = ShoesService(db);

        const shoeData = {
            color: 'red',
            brand: 'nike',
            price: 1600,
            size: 10,
            in_stock: 5,
            img_url: 'https://limitedsupply.co.za/cdn/shop/products/ba0cdf_9db9d578949b415fae42e9d2bb87c707_mv2_grande.jpg?v=1675198357'
        };

        await shoesService.addShoe(shoeData);

        const shoes = await shoesService.getAllShoes();

        assert.strictEqual(1, shoes.length);
        assert.strictEqual(shoes[0].color, 'red');
        assert.strictEqual(shoes[0].brand, 'nike');
        assert.strictEqual(shoes[0].price, 1600);
        assert.strictEqual(shoes[0].size, 10);
        assert.strictEqual(shoes[0].in_stock, 5);
        assert.strictEqual(shoes[0].img_url, 'https://limitedsupply.co.za/cdn/shop/products/ba0cdf_9db9d578949b415fae42e9d2bb87c707_mv2_grande.jpg?v=1675198357');
    });

    it("should be able to get shoes by brand", async function () {
        let shoesService = ShoesService(db);

        const shoeData1 = {
            color: 'blue',
            brand: 'nike',
            price: 1600,
            size: 11,
            in_stock: 8,
            img_url: 'https://limitedsupply.co.za/cdn/shop/products/dunk-low-university-blue-release-date_1200x1200.jpg?v=1630790201'
        };

        const shoeData2 = {
            color: 'red',
            brand: 'adidas',
            price: 1500,
            size: 9,
            in_stock: 6,
            img_url: 'https://assets.adidas.com/images/w_940,f_auto,q_auto/d72ad965ccad4cf2aafbaf8f009d0743_9366/HQ4263_01_standard.jpg'
        };

        await shoesService.addShoe(shoeData1);
        await shoesService.addShoe(shoeData2);

        const nikeShoes = await shoesService.shoesByBrand('nike');
        const adidasShoes = await shoesService.shoesByBrand('adidas');

        assert.strictEqual(nikeShoes.length, 1);
        assert.strictEqual(adidasShoes.length, 1);
    });

    it("should be able to get shoes by size", async function () {
        let shoesService = ShoesService(db);

        const shoeData1 = {
            color: 'blue',
            brand: 'nike',
            price: 1600,
            size: 11,
            in_stock: 8,
            img_url: 'https://limitedsupply.co.za/cdn/shop/products/dunk-low-university-blue-release-date_1200x1200.jpg?v=1630790201'
        };

        const shoeData2 = {
            color: 'red',
            brand: 'adidas',
            price: 1500,
            size: 9,
            in_stock: 6,
            img_url: 'https://assets.adidas.com/images/w_940,f_auto,q_auto/d72ad965ccad4cf2aafbaf8f009d0743_9366/HQ4263_01_standard.jpg'
        };

        await shoesService.addShoe(shoeData1);
        await shoesService.addShoe(shoeData2);
    
        const size11Shoes = await shoesService.shoesBySize(11);
    
        assert.equal(size11Shoes.length, 1);
    });
    
    it("should be able to get shoes by color", async function () {
        let shoesService = ShoesService(db);

        const shoeData1 = {
            color: 'blue',
            brand: 'nike',
            price: 1600,
            size: 11,
            in_stock: 8,
            img_url: 'https://limitedsupply.co.za/cdn/shop/products/dunk-low-university-blue-release-date_1200x1200.jpg?v=1630790201'
        };

        const shoeData2 = {
            color: 'red',
            brand: 'adidas',
            price: 1500,
            size: 9,
            in_stock: 6,
            img_url: 'https://assets.adidas.com/images/w_940,f_auto,q_auto/d72ad965ccad4cf2aafbaf8f009d0743_9366/HQ4263_01_standard.jpg'
        };

        await shoesService.addShoe(shoeData1);
        await shoesService.addShoe(shoeData2);
    
        const redShoes = await shoesService.Color('red');
        const blueShoes = await shoesService.Color('blue');
    
        assert.strictEqual(redShoes.length, 1);
        assert.strictEqual(blueShoes.length, 1);
    });
    
    it("should be able to get shoes by brand, size, and color", async function () {
        let shoesService = ShoesService(db);

        const shoeData1 = {
            color: 'blue',
            brand: 'nike',
            price: 1600,
            size: 11,
            in_stock: 8,
            img_url: 'https://limitedsupply.co.za/cdn/shop/products/dunk-low-university-blue-release-date_1200x1200.jpg?v=1630790201'
        };

        const shoeData2 = {
            color: 'red',
            brand: 'adidas',
            price: 1500,
            size: 9,
            in_stock: 6,
            img_url: 'https://assets.adidas.com/images/w_940,f_auto,q_auto/d72ad965ccad4cf2aafbaf8f009d0743_9366/HQ4263_01_standard.jpg'
        };

        await shoesService.addShoe(shoeData1);
        await shoesService.addShoe(shoeData2);
    
        const nikeSize11BlueShoes = await shoesService.shoesByBrandSizeColor('nike', 11, 'blue');
    
        assert.strictEqual(nikeSize11BlueShoes.length, 1);
    });

    it("should be able to add a shoe to the cart", async function () {
        let cartService = CartService(db);
        let userService = UserService(db);
        let shoesService = ShoesService(db);

        const hashedPassword = await bcrypt.hash('user1234', 10);

        await userService.addUser('Liam Carter', 'Liam@gmail.com', hashedPassword);
        const user = await userService.getUserByEmail('Liam@gmail.com');

        const shoeData2 = {
            color: 'red',
            brand: 'adidas',
            price: 1500,
            size: 9,
            in_stock: 6,
            img_url: 'https://assets.adidas.com/images/w_940,f_auto,q_auto/d72ad965ccad4cf2aafbaf8f009d0743_9366/HQ4263_01_standard.jpg'
        };

        await shoesService.addShoe(shoeData2);
        const blueShoes = await shoesService.Color('red');

        const userId = user.id;
        const shoeId = blueShoes[0].id;

        await cartService.addToCart(userId, shoeId);

        const cartItems = await cartService.getCart(userId);

        assert.strictEqual(cartItems.length, 1);
        assert.strictEqual(cartItems[0].user_id, userId);
        assert.strictEqual(cartItems[0].shoe_id, shoeId);
        assert.strictEqual(cartItems[0].quantity, 1);
    });

    it("should be able to get cart items for a user", async function () {
        let cartService = CartService(db);
        let userService = UserService(db);
        let shoesService = ShoesService(db);

        const hashedPassword = await bcrypt.hash('user1234', 10);

        await userService.addUser('Liam Carter', 'Liam@gmail.com', hashedPassword);
        const user = await userService.getUserByEmail('Liam@gmail.com');

        const shoeData2 = {
            color: 'red',
            brand: 'adidas',
            price: 1500,
            size: 9,
            in_stock: 6,
            img_url: 'https://assets.adidas.com/images/w_940,f_auto,q_auto/d72ad965ccad4cf2aafbaf8f009d0743_9366/HQ4263_01_standard.jpg'
        };

        await shoesService.addShoe(shoeData2);
        const blueShoes = await shoesService.Color('red');

        const userId = user.id;
        const shoeId = blueShoes[0].id;
    
        await cartService.addToCart(userId, shoeId);
    
        const cartItems = await cartService.getCart(userId);
    
        assert.strictEqual(cartItems.length, 1);
    });

    it("should be able to get cart shoes for a user", async function () {
        let cartService = CartService(db);
        let userService = UserService(db);
        let shoesService = ShoesService(db);

        const hashedPassword = await bcrypt.hash('user1234', 10);

        await userService.addUser('Liam Carter', 'Liam@gmail.com', hashedPassword);
        const user = await userService.getUserByEmail('Liam@gmail.com');

        const shoeData2 = {
            color: 'red',
            brand: 'adidas',
            price: 1500,
            size: 9,
            in_stock: 6,
            img_url: 'https://assets.adidas.com/images/w_940,f_auto,q_auto/d72ad965ccad4cf2aafbaf8f009d0743_9366/HQ4263_01_standard.jpg'
        };

        await shoesService.addShoe(shoeData2);
        const blueShoes = await shoesService.Color('red');

        const userId = user.id;
        const shoeId = blueShoes[0].id;
    
        await cartService.addToCart(userId, shoeId);
    
        const cartShoes = await cartService.getCartShoes(userId);
    
        assert.strictEqual(cartShoes.length, 1);
        assert.strictEqual(cartShoes[0].quantity, 1);
    });

    it("should be able to remove a shoe from the cart", async function () {
        let cartService = CartService(db);
        let userService = UserService(db);
        let shoesService = ShoesService(db);

        const hashedPassword = await bcrypt.hash('user1234', 10);

        await userService.addUser('Liam Carter', 'Liam@gmail.com', hashedPassword);
        const user = await userService.getUserByEmail('Liam@gmail.com');

        const shoeData2 = {
            color: 'red',
            brand: 'adidas',
            price: 1500,
            size: 9,
            in_stock: 6,
            img_url: 'https://assets.adidas.com/images/w_940,f_auto,q_auto/d72ad965ccad4cf2aafbaf8f009d0743_9366/HQ4263_01_standard.jpg'
        };

        await shoesService.addShoe(shoeData2);
        const blueShoes = await shoesService.Color('red');

        const userId = user.id;
        const shoeId = blueShoes[0].id;
    
        await cartService.addToCart(userId, shoeId);
    
        await cartService.removeFromCart(userId, shoeId);
    
        const cartItems = await cartService.getCart(userId);
    
        assert.strictEqual(cartItems.length, 0);
    });

    it("should be able to clear the cart for a user", async function () {
        let cartService = CartService(db);
        let userService = UserService(db);
        let shoesService = ShoesService(db);

        const hashedPassword = await bcrypt.hash('user1234', 10);

        await userService.addUser('Liam Carter', 'Liam@gmail.com', hashedPassword);
        const user = await userService.getUserByEmail('Liam@gmail.com');

        const shoeData2 = {
            color: 'red',
            brand: 'adidas',
            price: 1500,
            size: 9,
            in_stock: 6,
            img_url: 'https://assets.adidas.com/images/w_940,f_auto,q_auto/d72ad965ccad4cf2aafbaf8f009d0743_9366/HQ4263_01_standard.jpg'
        };

        await shoesService.addShoe(shoeData2);
        const blueShoes = await shoesService.Color('red');

        const userId = user.id;
        const shoeId = blueShoes[0].id;
    
        await cartService.addToCart(userId, shoeId);
    
        await cartService.clearCart(userId);
    
        const cartItems = await cartService.getCart(userId);
    
        assert.strictEqual(cartItems.length, 0);
    });

    after(function () {
        db.$pool.end;
    });
})