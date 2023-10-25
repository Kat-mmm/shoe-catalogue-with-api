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
    
            const cartShoes = await cartService.getCartShoes(userId);
    
            const total = cartShoes.reduce((acc, item) => {
                return acc + (item.price * item.quantity);
            }, 0);
    
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
            const shoeId = req.params.id; 
    
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

    return{
        addToCart,
        getCart,
        getCartShoes,
        removeFromCart,
        clearCart
    }
}