import fetch from 'node-fetch';
import objofconnection from './config/db';

async function seedtodb() {
    try {
        //fetch data 
        console.log("Fetching Products.............");
        const result = await fetch("https://fakestoreapi.com/products");
        const products = await result.json();

        //step 1---extract category
        console.log("Extracting Categories.............");
        const categories = [...new Set(products.map((item) => item.category))];//duplicate items

        console.log("inserting categories.............");

        const categorymap={};

        for (let catname of categories) {
            const result = await objofconnection.query(`INSERT INTO public.categories(name) VALUES($1) returning id`, [catname]);
            categorymap[catname]=result.row[0].id;

        }

        console.log("inserting products.............");

        for (let p of products) {
            const result = await objofconnection.query(`INSERT INTO public.products(name,description,price,image,category_id) VALUES($1,$2,$3,$4,$5) `,
                                                        [p.title,p.description,p.price,p.image,categorymap[p.category]]);
        }

          console.log("seeding completed.............");

    }
    catch (err) {

        console.error("error ........",err);

    }
}