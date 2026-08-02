import React, {
  useEffect,
  useState
} from "react";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import api from "../../api/api";

import toast from "react-hot-toast";

import "../../style/Admin.css";

const fallbackImg =
  "https://dummyimage.com/60x80/cccccc/000000&text=Book";

const AdminProducts = () => {

  /* =====================================================
     STATE
  ===================================================== */

  const [products, setProducts] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =====================================================
     MODAL + FORM STATE
  ===================================================== */

  const [showModal, setShowModal] =
    useState(false);

  const [editMode, setEditMode] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      author: "",
      price: "",
      image: "",
      description: "",
    });

  /* =====================================================
     FETCH PRODUCTS
  ===================================================== */

  const fetchProducts = async () => {

    try {

      const res = await api.get("/products");

      setProducts(res.data);

    } catch (err) {

      setError("Failed to load products");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =====================================================
     DELETE PRODUCT
  ===================================================== */

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this product?"
      )
    ) return;

    const deleteToast =
      toast.loading(
        "Deleting product..."
      );

    try {

      await api.delete(
        `/products/${id}`
      );

      fetchProducts();

      toast.success(
        "Product deleted successfully",
        {
          id: deleteToast,
        }
      );

    } catch {

      toast.error(
        "Failed to delete product",
        {
          id: deleteToast,
        }
      );

    }

  };

  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (product) => {

    setEditMode(true);

    setEditId(product._id);

    setShowModal(true);

    setFormData({
      title: product.title,
      author: product.author,
      price: product.price,
      image: product.image,
      description:
        product.description || "",
    });

  };

  /* =====================================================
     HANDLE CHANGE
  ===================================================== */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async () => {

    try {

      if (editMode) {

        await api.put(
          `/products/${editId}`,
          formData
        );

      } else {

        await api.post(
          "/products",
          formData
        );

      }

      handleCloseModal();

      fetchProducts();

      toast.success(
        editMode
          ? "Product updated successfully"
          : "Product added successfully"
      );

    } catch {

      toast.error(
        "Operation failed"
      );

    }

  };

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

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

  /* =====================================================
     UI STATES
  ===================================================== */

  if (loading) {

    return (
      <p className="text-center mt-5">
        Loading...
      </p>
    );

  }

  if (error) {

    return (
      <p className="
        text-center
        text-danger
        mt-5
      ">
        {error}
      </p>
    );

  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="
      container
      mt-4
      admin-products-page
    ">

      <PageHeader
        title="Admin Products"
        subtitle="
          Manage your bookstore inventory
        "
      />

      {/* ADD BUTTON */}

      <div className="
        d-flex
        justify-content-between
        align-items-center
        flex-wrap
        gap-3
        mb-4
      ">

        <div className="
          admin-products-count
        ">
          {products.length} books available
        </div>

        <Button
          className="
            admin-add-btn
          "
          onClick={() =>
            setShowModal(true)
          }
        >
          + Add Product
        </Button>

      </div>

      {/* TABLE */}

      <Card className="
        admin-table-card
      ">

        <div className="
          table-responsive
        ">

          <table className="
            table
            admin-table
            align-middle
            mb-0
          ">

            <thead>

              <tr>

                <th>Book</th>

                <th>Author</th>

                <th>Price</th>

                <th>Status</th>

                <th
                  style={{
                    width: "220px"
                  }}
                >
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr key={product._id}>

                  {/* BOOK */}

                  <td>

                    <div className="
                      admin-book-cell
                    ">

                      <img
                        src={
                          product.image ||
                          fallbackImg
                        }
                        alt={product.title}
                        className="
                          admin-product-img
                        "
                      />

                      <div>

                        <p className="
                          admin-book-title
                        ">
                          {product.title}
                        </p>

                        <span className="
                          admin-book-meta
                        ">
                          Book Product
                        </span>

                      </div>

                    </div>

                  </td>

                  {/* AUTHOR */}

                  <td>

                    <span className="
                      admin-author
                    ">
                      {product.author}
                    </span>

                  </td>

                  {/* PRICE */}

                  <td>

                    <span className="
                      admin-price
                    ">
                      ₹{product.price}
                    </span>

                  </td>

                  {/* STATUS */}

                  <td>

                    <span className="
                      admin-status-badge
                    ">
                      Active
                    </span>

                  </td>

                  {/* ACTIONS */}

                  <td>

                    <div className="
                      admin-action-group
                    ">

                      <Button
                        variant="outline"
                        className="
                          admin-edit-btn
                        "
                        onClick={() =>
                          handleEdit(product)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        className="
                          admin-delete-btn
                        "
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }
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

      {/* =====================================================
          MODAL
      ===================================================== */}

      {showModal && (

        <div className="
          admin-modal-overlay
        ">

          <div className="
            admin-modal
          ">

            <h5 className="
              admin-modal-title
            ">
              {editMode
                ? "Edit Product"
                : "Add New Product"}
            </h5>

            <input
              name="title"
              placeholder="Book title"
              value={formData.title}
              onChange={handleChange}
            />

            <input
              name="author"
              placeholder="Author name"
              value={formData.author}
              onChange={handleChange}
            />

            <input
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />

            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={handleChange}
            />

            <div className="admin-modal-action">

              <Button
                onClick={handleSubmit}
              >
                {editMode
                  ? "Update Product"
                  : "Add Product"}
              </Button>

              <Button
                variant="outline"
                onClick={
                  handleCloseModal
                }
              >
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