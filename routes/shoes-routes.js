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

        res.render('pay', { shoes: shoesData});
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

    return{
        index,
        addShoe,
        addNewShoe,
        checkout,
        getShoes,
        pay
    }

}