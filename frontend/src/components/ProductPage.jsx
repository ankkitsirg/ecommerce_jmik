import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid";
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("All");
  const [uniqueCategories, setUniqueCategories] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getProducts() {
      try {
        let response = await fetch("https://fakestoreapi.com/products");
        let productsData = await response.json();

        setProducts(productsData);
        let uniqueCategories = Array.from(
          new Set(productsData.map((product) => product.category)),
        );
        setCategories(uniqueCategories);
      } catch (err) {
        console.log(err);
        setError("Something went wrong | Try again later. ");
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setLoading(false);
      setError("");
    }
    if (error) {
      setLoading(false);
    }
  }, [categories, error]);

 const filteredProducts = useMemo(() => {
  return products.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategories === "All" || p.category === selectedCategories;

    return matchesSearch && matchesCategory;
  });
}, [products, search, selectedCategories]);
  return (
    <>
      <h1>Store-X</h1>
      <label>Choose By Category</label>
      <select
        className="border mx-4"
        value={selectedCategories}
        onChange={(e) => setSelectedCategories(e.target.value)}
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        className="rounded-lg border-2"
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    <Link to="/cart"> 
       <button className="bg-green-500 text-white px-5 ml-5 rounded" >Go To Cart</button>
    </Link>
      <ProductGrid products={filteredProducts} />
    </>
  );
};

export default ProductPage;
