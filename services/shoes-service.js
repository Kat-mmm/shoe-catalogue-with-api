export default function ShoesService(db){
    async function getAllShoes(){
       const result = await db.any(`SELECT * from shoes`);

       return result;
    }

    async function shoesByBrand(brand){
        brand = brand.toLowerCase();
        brand = brand.charAt(0).toUpperCase() + brand.slice(1);

        const result = await db.any(`SELECT * FROM shoes WHERE brand=$1`, [brand]);

        return result;
    }

    async function shoesBySize(size){
        const result = await db.any(`SELECT * FROM shoes WHERE size=$1`, [size]);

        return result;
    }

    async function Color(color){
        const result = await db.any(`SELECT * FROM shoes WHERE color=$1`, [color]);

        return result;
    }

    async function shoesByBrandSize(brand, size){
        brand = brand.toLowerCase();
        brand = brand.charAt(0).toUpperCase() + brand.slice(1);
        
        const result = await db.any(`SELECT * FROM shoes WHERE brand=$1 AND size=$2`, [brand, size]);

        return result;
    }
    
    async function shoesByColorSize(color, size){
        const result = await db.any(`SELECT * FROM shoes WHERE color=$1 AND size=$2`, [color, size]);

        return result;
    }

    async function shoesByBrandColor(brand, color){
        const result = await db.any(`SELECT * FROM shoes WHERE brand=$1 AND color=$2`, [brand, color]);

        return result;
    }

    async function shoesByBrandSizeColor(brand, size, color){
        const result = await db.any(`SELECT * FROM shoes WHERE brand=$1 AND size=$2 AND color=$3`, [brand, size, color]);

        return result;
    }

    async function addShoe(shoeData){
        let color = shoeData.color;
        let brand = shoeData.brand;
        let price = shoeData.price;
        let size = shoeData.size;
        let in_stock = shoeData.in_stock;
        let img_url = shoeData.img_url;

        brand = brand.toLowerCase();
        brand = brand.charAt(0).toUpperCase() + brand.slice(1);

        await db.none(`INSERT INTO shoes (color, brand, price, size, in_stock, img_url) VALUES ($1, $2, $3, $4, $5, $6)`, [color, brand, price, size, in_stock, img_url]);
    }

    async function updateStock(id){
        await db.none(`UPDATE shoes SET in_stock = in_stock - 1 WHERE id = $1`, [id]);
    }

    return{
        getAllShoes,
        shoesByBrand,
        shoesBySize,
        Color,
        shoesByBrandSize,
        shoesByColorSize,
        shoesByBrandColor,
        shoesByBrandSizeColor,
        addShoe,
        updateStock
    }
}