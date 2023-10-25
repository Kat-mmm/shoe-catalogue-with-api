export default function CartService(db) {
    async function addToCart(userId, shoeId) {
        const existingCartItem = await db.oneOrNone(
            `SELECT * FROM cart WHERE user_id = $1 AND shoe_id = $2`,
            [userId, shoeId]
        );
    
        if (existingCartItem) {
            await db.none(
                `UPDATE cart SET quantity = quantity + 1 WHERE user_id = $1 AND shoe_id = $2`,
                [userId, shoeId]
            );
        } 
        else{
            await db.none(`INSERT INTO cart (user_id, shoe_id, quantity) VALUES ($1, $2, $3)`, [userId, shoeId, 1]);
        }
    }    

    async function getCart(userId){
        const result = await db.any(`SELECT * FROM cart WHERE user_id=$1`, [userId]);

        return result;
    }

    async function getCartShoes(userId){
        const result = await db.any(`
            SELECT s.*, c.quantity 
            FROM cart c
            JOIN shoes s ON c.shoe_id = s.id 
            WHERE c.user_id=$1
        `, [userId]);

        return result;
    }
    
    async function removeFromCart(userId, shoeId){
        await db.none(`DELETE FROM cart WHERE user_id=$1 AND shoe_id=$2`, [userId, shoeId]);
    }
    
    async function clearCart(userId){
        await db.none(`DELETE FROM cart WHERE user_id=$1`, [userId]);
    }
    
    async function updateQuantity(userId, shoeId){
        await db.none(
            `UPDATE cart SET quantity = quantity - 1 WHERE user_id = $1 AND shoe_id = $2`,
            [userId, shoeId]
        );
    }

    return{
        addToCart,
        getCart,
        getCartShoes,
        clearCart,
        removeFromCart,
        updateQuantity
    }
}