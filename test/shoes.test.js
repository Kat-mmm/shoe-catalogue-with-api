import assert from 'assert';
import pgPromise from 'pg-promise';
import CartService from '../services/cart-service.js';
import ShoesService from '../services/shoes-service.js';
import UserService from '../services/user-service.js';
import bcrypt from 'bcrypt';
import ShoesService from '../services/shoes-service.js';

const DATABASE_URL = 'postgresql://postgres:Delegates13@localhost:5432/shoesdb';

const connectionString = process.env.DATABASE_URL || DATABASE_URL;
const db = pgPromise()(connectionString);

describe("Shoe Catalogue Tests", function () {
    beforeEach(async function () {
        try {
            // clean the tables before each test run
            await db.none("DELETE FROM cart;");
            await db.none("DELETE FROM users WHERE name <> $1", ['admin']);
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

        assert.strictEqual(2, users.length);
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

    // it("should be able to get selected days for a waiter", async function () {
    //     let waiterScheduling = WaiterDatabase(db);

    //     const hashedPassword = await bcrypt.hash('userPrice', 10);

    //     const user = await waiterScheduling.addUser('Prince', 'Prince@gmail.com', hashedPassword);
    //     await waiterScheduling.addWaiterDays(user.id, 1);

    //     const selectedDays = await waiterScheduling.getSelectedDays(user.id);
    //     assert.strictEqual(selectedDays.length, 1);
    // });

    // it("should be able to get admin schedule", async function () {
    //     let waiterScheduling = WaiterDatabase(db);

    //     const hashedPassword = await bcrypt.hash('sammy', 10);

    //     const user = await waiterScheduling.addUser('Samuel Bryce', 'sam@gmail.com', hashedPassword);
    //     await waiterScheduling.addWaiterDays(user.id, 1);

    //     const adminSchedule = await waiterScheduling.getAdminSchedule();
    //     assert.strictEqual(adminSchedule.length, 1);
    // });

    // it("should be able to clear schedule", async function () {
    //     let waiterScheduling = WaiterDatabase(db);

    //     const hashedPassword = await bcrypt.hash('userTim', 10);

    //     const user = await waiterScheduling.addUser('Tim', 'Tim@gmail.com', hashedPassword);
    //     await waiterScheduling.addWaiterDays(user.id, 1);

    //     await waiterScheduling.clearSchedule();

    //     const selectedDays = await waiterScheduling.getSelectedDays(user.id);
    //     assert.strictEqual(selectedDays.length, 0);
    // });

    after(function () {
        db.$pool.end;
    });
})