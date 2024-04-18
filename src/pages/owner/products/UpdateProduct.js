import React from "react";
import { useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useEffect } from "react";

const UpdateProduct = ({
  handleSubmit,
  name,
  description,
  price,
  stock,
  photo,
  discount,
  setName,
  setPrice,
  setStock,
  setDiscount,
  setPhoto,
  setDescription,
  setCategoryId,
  setSupplierId,
}) => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const getAllSuppliers = async () => {
    try {
      const response = await axiosClient.get("admin/suppliers");
      if (response?.payload) {
        setSuppliers(response.payload);
      } else {
        alert("khong co du lieu!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axiosClient.get("admin/categories");
      if (response?.payload) {
        setCategories(response.payload);
      } else {
        alert("khong co du lieu!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllSuppliers();
  }, []);
  return (
    <div
      className="modal fade"
      id="ModalUP"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <form className="modal-body" onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group  col-md-12">
                <span className="thong-tin-thanh-toan">
                  <h5>Chỉnh sửa thông tin món ăn cơ bản</h5>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="control-label">Tên món ăn</label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Mô tả món ăn</label>
                <input
                  className="form-control"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group  col-md-6">
                <label className="control-label">Số lượng</label>
                <input
                  className="form-control"
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="form-group  col-md-6">
                <label className="control-label">Giảm giá</label>
                <input
                  className="form-control"
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Giá bán</label>
                <input
                  className="form-control"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Hình ảnh</label>
                <input
                  className="form-control"
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label for="exampleSelect1" className="control-label">
                  Danh mục
                </label>
                <select
                  className="form-control"
                  id="exampleSelect1"
                  required
                  onChange={(event) => {
                    setCategoryId(event.target.value);
                  }}
                >
                  <option>-- Chọn danh mục --</option>
                  {categories &&
                    categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-md-6 ">
                <label for="exampleSelect1" className="control-label">
                  Nhà cung cấp
                </label>
                <select
                  className="form-control"
                  id="exampleSelect1"
                  required
                  onChange={(event) => {
                    setSupplierId(event.target.value);
                  }}
                >
                  <option>-- Chọn nhà cung cấp --</option>
                  {suppliers &&
                    suppliers?.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <button className="btn btn-save" type="submit">
              Lưu lại
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy bỏ
            </button>
          </form>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
