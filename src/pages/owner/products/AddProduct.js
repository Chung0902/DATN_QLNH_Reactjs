import React from "react";
import { useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [stock, setStock] = useState();
  const [categoryId, setCategoryId] = useState();
  const [supplierId, setSupplierId] = useState();
  const [photo, setPhoto] = useState();
  const navigate = useNavigate();
  const [subphoto, setSubphoto] = useState([]);

  const handleAddSubphoto = () => {
    const newSubphotos = [...subphoto, ""];
    setSubphoto(newSubphotos);
  };

  const handleSubphotoChange = (index, value) => {
    const newSubphotos = [...subphoto];
    newSubphotos[index] = value;
    setSubphoto(newSubphotos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("admin/products", {
        name,
        description,
        price,
        discount,
        stock,
        categoryId,
        supplierId,
        photo,
        subphoto,
      });
      console.log(response.payload);
      if (response?.payload) {
        toast.success(response.message);
        console.log(response.message);
        // setName(response.payload);
        setProducts([...products, response.payload]); // Thêm danh mục mới vào danh sách
        navigate("/main/productsmanager");
      }
      console.log(subphoto);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

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
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li
            className="breadcrumb-item"
            onClick={() => navigate("/main/productsmanager")}
          >
            Danh sách món ăn
          </li>
          <li className="breadcrumb-item">
            <a href="#">Thêm món ăn</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo mới món ăn</h3>
            <div className="tile-body">
              <div className="row element-button"></div>
              <form className="row" onSubmit={handleSubmit}>
                <div className="form-group col-md-3">
                  <label className="control-label">Tên món ăn</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group  col-md-3">
                  <label className="control-label">Số lượng</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className="form-group  col-md-3">
                  <label className="control-label">Image</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-3">
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
                <div className="form-group col-md-3 ">
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
                <div className="form-group col-md-3">
                  <label className="control-label">Giá bán</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Giảm giá</label>
                  <input
                    className="form-control"
                    type="text"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Mô tả món ăn</label>
                  <textarea
                    className="form-control"
                    name="mota"
                    id="mota"
                    onChange={(e) => setDescription(e.target.value)}
                  >
                    {description}
                  </textarea>
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Hình ảnh phụ:</label>
                  {subphoto.map((subphoto, index) => (
                    <div key={index}>
                      <input
                        className="form-control mb-2"
                        type="text"
                        value={subphoto}
                        onChange={(event) =>
                          handleSubphotoChange(index, event.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddSubphoto}
                    className="btn btn-primary"
                  >
                    Thêm hình ảnh
                  </button>
                </div>
                <button className="btn btn-info" type="submit">
                  Lưu lại
                </button>
                <a
                  className="btn btn-danger"
                  onClick={() => navigate("/main/productsmanager")}
                >
                  Trở về
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;
