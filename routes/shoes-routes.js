export default function ShoesRoutes(ShoesService){
    async function index(req, res){
        const shoesData = await ShoesService.getAllShoes();

        res.render('index', { shoes: shoesData })
    }

    async function getShoes(req, res){
        const shoesData = await ShoesService.getAllShoes();

        res.render('shoes', { shoes: shoesData, name: req.session.user.name})
    }

    async function addShoe(req, res){
        res.render('add-shoe');
    }

    async function checkout(req, res){
        let shoesData = await ShoesService.getCartShoes(req.session.user.id);

        shoesData = shoesData.map(shoe => {
            return {
                ...shoe,
                total: shoe.price * shoe.quantity
            };
        });

        res.render('cart', { shoes: shoesData});
    }

    async function pay(req, res) {
        let shoesData = await ShoesService.getCartShoes(req.session.user.id);

        let cartItemsCount = shoesData.length;

        const total = shoesData.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);

        const messages = {
            success: req.flash('success')[0],
            error: req.flash('error')[0]
        };

        res.render('pay', { shoes: shoesData, cartItemsCount, messages, total});
    }

    async function addNewShoe(req, res){
        try{
            await ShoesService.addShoe(req.body);
            req.flash('success', 'Shoe added successfully');
        }
        catch(err){
            console.log(err);
        }

        res.redirect('/shoe/add');
    }

    async function cartPay(req, res) {
        try{
            let userId = req.session.user.id;
            let amountToPay = req.body.amount;
            let cartShoes = await ShoesService.getCartShoes(userId);

            const total = cartShoes.reduce((acc, item) => {
                return acc + (item.price * item.quantity);
            }, 0);

            if(amountToPay >= total){
                await ShoesService.clearCart(userId);
                req.flash('success', 'Payment successful!');
            }
            else{
                req.flash('error', 'Insufficient funds!');
            }

            res.redirect('/shoes/cart/pay');
        }
        catch(err){
            console.log(err);
        }
    }

    return{
        index,
        addShoe,
        addNewShoe,
        checkout,
        getShoes,
        pay,
        cartPay
    }

}