import React from "react";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const AdminProducts = () => {
  /* ---------------- MOCK DATA ---------------- */
  const products = [
    {
      id: "1",
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
    },
    {
      id: "2",
      title: "Deep Work",
      author: "Cal Newport",
      price: 399,
    },
    {
      id: "3",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 450,
    },
  ];

  return (
    <div className="container mt-4">

      {/* PAGE HEADER */}
      <PageHeader
        title="Admin Products"
        subtitle="Manage your bookstore inventory"
      />

      {/* ADD PRODUCT BUTTON */}
      <div className="mb-3">
        <Button>Add New Product</Button>
      </div>

      {/* PRODUCT TABLE */}
      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.author}</td>
                <td>₹{product.price}</td>

                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline">Edit</Button>
                    <Button variant="danger">Delete</Button>
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