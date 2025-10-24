"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import MainCard from "../components/MainCard";
import AddProductModal from "../components/AddProductModal";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal]=useState(false)

  const router = useRouter()
  const token = Cookies.get("token");

  const [currentPage, setCurrentPage] = useState(1);

  const fetchProductsAPI = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}products?page=${page}`
      );

      const { data, pagination } = response.data;
      setProducts(data);
      setPagination(pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAPI(currentPage);
  }, []);

  const handleAddSuccess = () => {
    fetchProductsAPI(currentPage);
    setIsModalOpen(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.total_pages) {
      fetchProductsAPI(page);
    }
  };

  const handleEdit = async (id, payload) => {
    if(token){
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}products/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        fetchProductsAPI(currentPage);
      } catch (err) {
        console.error("Failed to update product:", err);
        alert("Gagal update produk");
      }
    }else{
      setShowLoginModal(true);
    }
  };

  const handleDelete = async (id) => {
    if(token){
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        fetchProductsAPI(currentPage);
      } catch (err) {
        console.error("Failed to update product:", err);
        alert("Gagal update produk");
      }
    }else{
      setShowLoginModal(true);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Produk</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Tambah Produk
        </button>
      </div>

      {/* Daftar Produk */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MainCard data={products} onEdit={handleEdit} onDelete={handleDelete}/>
      )}

      {/* Pagination DaisyUI */}
      {pagination && pagination.total_pages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join">
            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>

            {[...Array(pagination.total_pages)].map((_, i) => (
              <button
                key={i}
                className={`join-item btn ${
                  currentPage === i + 1 ? "btn-primary" : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="join-item btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.total_pages}
            >
              »
            </button>
          </div>
        </div>
      )}

      {/* Modal Tambah Produk */}
      {isModalOpen && (
        <AddProductModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      {/* 🔐 Modal Harus Login */}
      {showLoginModal && (
        <dialog id="login_required_modal" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center">Akses Dibatasi</h3>
            <p className="py-4 text-center">Anda harus login untuk melakukan aksi ini.</p>
            <div className="modal-action justify-center">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowLoginModal(false);
                  router.push("/login");
                }}
              >
                Login Sekarang
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setShowLoginModal(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
