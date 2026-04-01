import React, { useEffect, useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import api from "../../api/api";

import "../../style/Admin.css";

const fallbackImg = "https://dummyimage.com/60x80/cccccc/000000&text=Book";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ===============================
     MODAL + FORM STATE
  ============================== */
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
    description: "",
  });

  /* ===============================
     FETCH PRODUCTS
  ============================== */
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

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

  /* ===============================
     DELETE PRODUCT
  ============================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch {
      alert("Failed to delete product");
    }
  };

  /* ===============================
     OPEN EDIT MODAL (PREFILL)
  ============================== */
  const handleEdit = (product) => {
    setEditMode(true);
    setEditId(product._id);
    setShowModal(true);

    setFormData({
      title: product.title,
      author: product.author,
      price: product.price,
      image: product.image,
      description: product.description || "",
    });
  };

  /* ===============================
     HANDLE INPUT CHANGE
  ============================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ===============================
     ADD / UPDATE PRODUCT
  ============================== */
  const handleSubmit = async () => {
    try {
      if (editMode) {
        await api.put(`/products/${editId}`, formData);
      } else {
        await api.post("/products", formData);
      }

      handleCloseModal();
      fetchProducts();

    } catch {
      alert("Operation failed");
    }
  };

  /* ===============================
     RESET + CLOSE MODAL
  ============================== */
  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId(null);

    setFormData({
      title: "",
      author: "",
      price: "",
      image: "",
      description: "",
    });
  };

  /* ===============================
     UI STATES
  ============================== */
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  /* ===============================
     MAIN UI
  ============================== */
  return (
    <div className="container mt-4">

      <PageHeader
        title="Admin Products"
        subtitle="Manage your bookstore inventory"
      />

      {/* ADD BUTTON */}
      <div className="mb-3 d-flex justify-content-end">
        <Button
          className="admin-add-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Product
        </Button>
      </div>

      <Card className="p-3">
        <div className="table-responsive">

          <table className="table admin-table align-middle">
            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Price</th>
                <th style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>

                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={product.image || fallbackImg}
                        alt={product.title}
                        className="admin-product-img"
                      />
                      <span className="fw-semibold">
                        {product.title}
                      </span>
                    </div>
                  </td>

                  <td>{product.author}</td>

                  <td className="fw-semibold">₹{product.price}</td>

                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline"
                        className="admin-edit-btn px-3"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        className="admin-delete-btn px-3"
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

        </div>
      </Card>

      {/* ===============================
         MODAL (ADD + EDIT)
      ============================== */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">

            <h5>{editMode ? "Edit Product" : "Add New Product"}</h5>

            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
            <input name="author" placeholder="Author" value={formData.author} onChange={handleChange} />
            <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
            <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

            <div className="d-flex gap-2 mt-3">
              <Button onClick={handleSubmit}>
                {editMode ? "Update" : "Add"}
              </Button>

              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;