import React, { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------- FETCH PRODUCTS ---------- */
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      // ✅ Remove duplicate products (quick fix)
      const uniqueProducts = Array.from(
        new Map(res.data.map((item) => [item.title, item])).values()
      );

      setProducts(uniqueProducts);

    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ---------- DELETE PRODUCT ---------- */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  /* ---------- EDIT (TEMP FIX) ---------- */
  const handleEdit = () => {
    alert("Edit feature coming soon");
  };

  /* ---------- UI STATES ---------- */
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  /* ---------- MAIN UI ---------- */
  return (
    <div className="container mt-4">

      <PageHeader
        title="Admin Products"
        subtitle="Manage your bookstore inventory"
      />

      <div className="mb-3">
        <Button onClick={() => alert("Coming Soon")}>
          Add New Product
        </Button>
      </div>

      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th style={{ width: "180px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    width="50"
                    style={{ borderRadius: "5px" }}
                  />
                </td>

                <td>{product.title}</td>
                <td>{product.author}</td>
                <td>₹{product.price}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline" onClick={handleEdit}>
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

    </div>
  );
};

export default AdminProducts;