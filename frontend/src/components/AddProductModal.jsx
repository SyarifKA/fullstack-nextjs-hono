"use client"
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AddProductModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    pricepromo: "",
    price: "",
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  const router = useRouter();
  const token = Cookies.get("token");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Cek login dulu
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}products`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onSuccess();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Gagal menambahkan produk.");
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    router.push("/login");
  };

  return (
    <>
      <dialog id="addProduct" className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Tambah Produk</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="Nama produk"
              className="input input-bordered"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="desc"
              placeholder="Deskripsi produk"
              className="textarea textarea-bordered"
              value={formData.desc}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Harga sebelum promo"
              className="input input-bordered"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="pricepromo"
              placeholder="Harga promo"
              className="input input-bordered"
              value={formData.pricepromo}
              onChange={handleChange}
              required
            />
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" className="btn" onClick={onClose}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* 🧩 Modal DaisyUI: Harus Login */}
      {showLoginModal && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Login Diperlukan</h3>
            <p className="py-2">Silakan login terlebih dahulu untuk menambah produk.</p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleLoginRedirect}>
                OK
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
