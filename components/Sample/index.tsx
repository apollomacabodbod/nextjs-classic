"use client";

import { useState, useEffect } from "react";

type Product = {
  id: string;
  product: string;
  price: number;
};

export default function ProductForm() {
  const [formData, setFormData] = useState<Product>({
    id: "",
    product: "",
    price: 0,
  });
  const [message, setMessage] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]); // State to store all products
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to store a selected product

  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://66efbac3f2a8bce81be3efe8.mockapi.io/api/v1/products"
      );
      const data = await res.json();
      setProducts(data); // Set the fetched products
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage("Error occurred while fetching the products.");
    }
  };

  // Fetch a specific product by its ID
  const fetchProductById = async (id: string) => {
    try {
      const res = await fetch(
        `https://66efbac3f2a8bce81be3efe8.mockapi.io/api/v1/products/${id}`
      );
      const data = await res.json();
      setSelectedProduct(data); // Set the selected product
      console.log(data);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      setMessage("Error occurred while fetching the product.");
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for update
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, product, price } = formData;

    if (!id || !product || price <= 0) {
      setMessage("Please provide valid product information.");
      return;
    }
    try {
      const res = await fetch(
        `https://66efbac3f2a8bce81be3efe8.mockapi.io/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product, price }),
        }
      );

      const data = await res.json(); // Parse the response

      if (res.ok) {
        console.log("Update data:", data); // Log the inserted data
        setMessage("Product updated successfully!");
        fetchProducts(); // Refresh product list after update
      } else {
        setMessage("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Error occurred while updating the product.");
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    const { id } = formData;

    if (!id) {
      setMessage("Please provide a product ID to delete.");
      return;
    }

    try {
      const res = await fetch(
        `https://66efbac3f2a8bce81be3efe8.mockapi.io/api/v1/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setMessage("Product deleted successfully!");
        setFormData({ id: "", product: "", price: 0 });
        fetchProducts(); // Refresh product list after delete
      } else {
        setMessage("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error occurred while deleting the product.");
    }
  };

  // Handle product insertion
  const handleInsert = async () => {
    const { product, price } = formData;

    if (!product || price <= 0) {
      setMessage("Please provide valid product information.");
      return;
    }

    try {
      const res = await fetch(
        `https://66efbac3f2a8bce81be3efe8.mockapi.io/api/v1/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product, price }),
        }
      );

      const data = await res.json(); // Parse the response

      if (res.ok) {
        console.log("Inserted data:", data); // Log the inserted data
        setMessage("Product inserted successfully!");
        setFormData({ id: "", product: "", price: 0 });
        fetchProducts(); // Refresh product list after insert
      } else {
        setMessage("Failed to insert product.");
      }
    } catch (error) {
      console.error("Error inserting product:", error);
      setMessage("Error occurred while inserting the product.");
    }
  };

  return (
    <div>
      <h1>Manage Products</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label htmlFor="id">Product ID (For Update/Delete)</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange} // Corrected here
            className="border rounded p-2"
          />
        </div>
        <div>
          <label htmlFor="product">Product Name</label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
        </div>

        {/* Submit form to update product */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Product
        </button>
      </form>

      {/* Separate buttons for delete and insert */}
      <div className="flex space-x-4 mt-4">
        <button
          type="button"
          className="bg-red-500 text-white p-2 rounded"
          onClick={handleDelete}
        >
          Delete Product
        </button>
        <button
          type="button"
          className="bg-green-500 text-white p-2 rounded"
          onClick={handleInsert}
        >
          Insert Product
        </button>
      </div>

      {/* Message display */}
      {message && <p className="mt-4">{message}</p>}

      {/* Display all products */}
      <div className="mt-8">
        <h2>All Products</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                className="border p-2 rounded my-2 cursor-pointer"
                onClick={() => fetchProductById(product.id)} // Click to fetch single product
              >
                <strong>ID:</strong> {product.id} <br />
                <strong>Product:</strong> {product.product} <br />
                <strong>Price:</strong> ${product.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Display selected product */}
      {selectedProduct && (
        <div className="mt-8">
          <h2>Selected Product</h2>
          <div className="border p-4 rounded">
            {Object.keys(selectedProduct).map((key) => (
              <div key={key}>
                <strong>{key}: </strong>{" "}
                {selectedProduct[key as keyof Product]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
