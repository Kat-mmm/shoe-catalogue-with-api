export default function ShoesApi(ShoesService){
    async function all(req, res){
        try{
            const shoes = await ShoesService.getAllShoes();

            res.json({
                status: 'success',
                data: shoes
            })
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            })
        }
    }

    async function getShoesByBrand(req, res){
        try{
            const shoesByBrand = await ShoesService.shoesByBrand(req.params.brandname);

            res.json({
                status: 'success',
                data: shoesByBrand
            })
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            })
        }
    }

    async function getShoesBySize(req, res){
        try{
            const shoesBySize = await ShoesService.shoesBySize(req.params.size);

            res.json({
                status: 'success',
                data: shoesBySize
            })
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            })
        }
    }

    async function getShoesByColor(req, res){
        try{
            const shoesByColor = await ShoesService.ShoesByColor(req.params.color);

            res.json({
                status: 'success',
                data: shoesByColor
            })
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            })
        }
    }

    async function getShoesByBrandAndSize(req, res){
        try{
            const shoesByBrandSize = await ShoesService.shoesByBrandSize(req.params.brandname, req.params.size);

            res.json({
                status: 'success',
                data: shoesByBrandSize
            })
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            })
        }
    }

    async function getShoesByColorSize(req, res){
        try{
            const shoesByColorSize = await ShoesService.shoesByColorSize(req.params.color, req.params.size);

            res.json({
                status: 'success',
                data: shoesByColorSize
            })
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            })
        }
    }

    async function getShoesByBrandColor(req, res){
        try{
            const shoesByBrandColor = await ShoesService.shoesByBrandColor(req.params.brandname, req.params.color);

            res.json({
                status: 'success',
                data: shoesByBrandColor
            })
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            })
        }
    }

    async function getShoesByBrandSizeColor(req, res){
        try{
            const shoesByBrandSizeColor = await ShoesService.shoesByBrandSizeColor(req.params.brandname, req.params.size, req.params.color);

            res.json({
                status: 'success',
                data: shoesByBrandSizeColor
            })
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            })
        }
    }

    async function addShoeToStock(req, res){
        try{
            await ShoesService.addShoe({
                color: req.body.color,
                brand: req.body.brand,
                price: req.body.price,
                size: req.body.size,
                in_stock: req.body.in_stock,
                img_url: req.body.img_url,
            })

            res.json({
                status: 'success',
            })
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            })
        }
    }

    async function updateStockLevel(req, res){
        try{
            await ShoesService.updateStock(req.params.id);

            res.json({
                status: 'success',
            })
        }
        catch(err){
            res.json({
                status: 'error',
                error: err.stack
            })
        }
    }

    return{
        all,
        getShoesByBrand,
        getShoesBySize,
        getShoesByColor,
        getShoesByBrandAndSize,
        getShoesByColorSize,
        getShoesByBrandColor,
        getShoesByBrandSizeColor,
        addShoeToStock,
        updateStockLevel
    }
}