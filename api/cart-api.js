export default function CartApi(cartService) {
    async function addToCart(req, res){
        try {
            const userId = req.session.user.id;
            const shoeId = req.params.shoeId;
    
            await cartService.addToCart(userId, shoeId);
    
            res.json({
                status: 'success',
            });
        } catch(err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async function getCart(req, res){
        try {
            const userId = req.session.user.id;
    
            const cart = await cartService.getCart(userId);
    
            res.json({
                status: 'success',
                data: cart
            });
        } catch(err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async function getCartShoes(req, res){
        try {
            const userId = req.session.user.id;
    
            let cartShoes = await cartService.getCartShoes(userId);
    
            const total = cartShoes.reduce((acc, item) => {
                return acc + (item.price * item.quantity);
            }, 0);

            cartShoes = cartShoes.map(shoe => {
                return {
                    ...shoe,
                    total: shoe.price * shoe.quantity
                };
            });
    
            res.json({
                status: 'success',
                data: cartShoes,
                total
            });
        } catch(err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async function removeFromCart(req, res){
        try {
            const userId = req.session.user.id;
            const shoeId = req.params.shoeid; 
    
            await cartService.removeFromCart(userId, shoeId);
    
            res.json({
                status: 'success',
            });
        } catch(err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async function reduceQuantity(req, res){
        try{
            const userId = req.session.user.id;
            const shoeId = req.params.shoeid;

            await cartService.updateQuantity(userId, shoeId);

            res.json({
                status: 'success',
            });
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async function clearCart(req, res){
        try {
            const userId = req.session.user.id;
    
            await cartService.clearCart(userId);
    
            res.json({
                status: 'success',
            });
        } catch(err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }

    async function payCart(req, res) {
        try {
            let userAmount = req.body.amount;
            const userId = req.session.user.id;
    
            let cartShoes = await cartService.getCartShoes(userId);
    
            const total = cartShoes.reduce((acc, item) => {
                return acc + (item.price * item.quantity);
            }, 0);
    
            let msg = '';
    
            if (userAmount >= total) {
                await cartService.clearCart(userId);
                msg = 'Paid successfully!';
                res.json({
                    status: 'success',
                    msg
                });
            } else {
                msg = 'Not enough funds, please try again!';
                res.json({
                    status: 'error',
                    msg
                });
            }
    
        } catch (err) {
            res.json({
                status: 'error',
                error: err.stack
            });
        }
    }    

    return{
        addToCart,
        getCart,
        getCartShoes,
        removeFromCart,
        clearCart,
        reduceQuantity,
        payCart
    }
}