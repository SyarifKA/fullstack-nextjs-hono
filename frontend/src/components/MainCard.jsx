"use client";

import { useState } from "react";
import Image from "next/image";

export default function MainCard({ data, onEdit, onDelete }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (id) => {
    document.getElementById(id)?.showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id)?.close();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const payload = {
      title: selectedProduct.title,
      image: selectedProduct.image,
      description: selectedProduct.description,
      pricepromo: selectedProduct.pricepromo ?? null,
      price: selectedProduct.price,
    };

    if (onEdit) onEdit(selectedProduct.id, payload);
    closeModal("editModal");
  };

  const handleDeleteConfirm = () => {
    if (onDelete) onDelete(selectedProduct.id);
    closeModal("deleteModal");
  };

  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              <figure>
                <Image
                  src={"/img/menu2.png"}
                  alt={item.title || "Produk"}
                  width={400}
                  height={300}
                  className="object-cover h-48 w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title || "Tanpa Nama"}</h2>
                <p className="text-sm text-gray-600">
                  {item.description || "Tidak ada deskripsi"}
                </p>

                <div className="mt-2">
                  {item.price_promo ? (
                    <div>
                      <p className="text-lg font-semibold text-primary">
                        Rp {Number(item.price_promo).toLocaleString("id-ID")}
                      </p>
                      <p className="text-sm line-through text-gray-400">
                        Rp {Number(item.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                  ) : (
                    <p className="text-lg font-semibold">
                      Rp {Number(item.price).toLocaleString("id-ID")}
                    </p>
                  )}
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn btn-sm btn-outline btn-warning"
                    onClick={() => {
                      setSelectedProduct(item);
                      openModal("editModal");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error"
                    onClick={() => {
                      setSelectedProduct(item);
                      openModal("deleteModal");
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Belum ada produk.
          </p>
        )}
      </div>

      <dialog id="editModal" className="modal">
        {selectedProduct && (
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Produk</h3>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Judul"
                className="input input-bordered w-full"
                value={selectedProduct.title || ""}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, title: e.target.value })
                }
              />
              <textarea
                placeholder="Deskripsi"
                className="textarea textarea-bordered w-full"
                value={selectedProduct.description || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Harga"
                className="input input-bordered w-full"
                value={selectedProduct.price || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Harga Promo (opsional)"
                className="input input-bordered w-full"
                value={selectedProduct.pricepromo || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    pricepromo: e.target.value,
                  })
                }
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => closeModal("editModal")}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}
      </dialog>

      <dialog id="deleteModal" className="modal">
        {selectedProduct && (
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Hapus Produk</h3>
            <p>
              Apakah Anda yakin ingin menghapus produk{" "}
              <strong>{selectedProduct.title}</strong>?
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDeleteConfirm}>
                Hapus
              </button>
              <button className="btn" onClick={() => closeModal("deleteModal")}>
                Batal
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
