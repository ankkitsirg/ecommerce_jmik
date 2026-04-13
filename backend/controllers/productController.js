import objofconnection from "../config/db.js";

export const getProducts = async (req, res) => {

    try {

        //sql query
        const result = await objofconnection.query(`select products.id,products.name,products.price,products.image,categories.name as category
 from products 
join categories
on products.category_id=categories.id`);

        res.json(result.rows);

    }
    catch (err) {
        console.error("error ........", err);
        res.json({ error: "server error" });
    }

}