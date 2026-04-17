const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No Products found.</p>;
  }

  const additem = async (itemid) => {
                 
        await fetch("http://localhost:5000/api/cart/add",{ method:"POST",
                                                  headers:{'Content-Type':'application/json'},
                                                  body:JSON.stringify({user_id:1,product_id:itemid,quantity:1  })   
                   })
      
      alert("Added To Cart");             
  }

  return (
    <div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((item) => (
            <div className="border rounded-xl p-4 text-center" key={item.id}>
              <img className="mb-6 w-40 h-40 mx-auto" src={item.image} alt={item.title} />
              <h3 className="mb-6 min-h-[60px]">{item.title}</h3>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <button className="bg-blue-500 text-white px-3 rounded" onClick={() => { additem(item.id) }}>Add To Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductGrid; 