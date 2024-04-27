import React from "react";
import { useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaPlusSquare } from "react-icons/fa";

const AddOrders = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  // Hàm xử lý thay đổi khi nhập giá trị chiết khấu
const handleDiscountChange = (e) => {
    const { value } = e.target;
    setDiscount(value);
    const newSubtotal = calculateSubtotal(newRows, value); // Tính toán tổng tiền dựa trên giá trị chiết khấu mới
    setSubtotal(newSubtotal);
  };
  
  // Hàm tính tổng tiền dựa trên các hàng và giá trị chiết khấu mới
  const calculateSubtotal = (rows, discount) => {
    let newSubtotal = 0;
    rows.forEach((row) => {
      newSubtotal +=
        row.productPrice * row.quantity * (1 - row.productDiscount / 100);
    });
    const discountedSubtotal = newSubtotal * (1 - discount / 100); // Tính toán tổng tiền sau chiết khấu
    return discountedSubtotal;
  };
  

  const getAllProducts = async () => {
    try {
      const response = await axiosClient.get("admin/products");
      if (response?.payload) {
        setProducts(response.payload);
      } else {
        alert("Không có dữ liệu!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleAddNewItem = () => {
    setShowNewRow(true);
    setNewRows((prevRows) => [
      ...prevRows,
      {
        productName: "",
        productId: "",
        quantity: 1, // Đặt số lượng mặc định là 1 khi thêm hàng mới
        productPrice: "",
        productDiscount: "",
        totalOrderDetailPrice: "",
      },
    ]);
  };

  // Hàm xử lý thay đổi khi chọn sản phẩm hoặc thay đổi số lượng
  const handleNewRowChange = (e, index, field) => {
    const { value } = e.target;
    let updatedRows = [...newRows]; // Initialize updatedRows with newRows

    if (field === "productId") {
      const product = products.find((product) => product._id === value);
      if (product) {
        updatedRows[index] = {
          ...updatedRows[index],
          [field]: value,
          productPrice: product.price,
          productDiscount: product.discount,
          totalOrderDetailPrice:
            product.price *
            updatedRows[index]?.quantity *
            (1 - product.discount / 100), // Tính tổng tiền cho hàng mới
        };
        // Cập nhật tổng tiền của đơn hàng
        const newSubtotal =
          subtotal +
          product.price *
            updatedRows[index]?.quantity *
            (1 - product.discount / 100);
        setSubtotal(newSubtotal);
      }
    } else if (field === "quantity") {
      updatedRows[index] = {
        ...updatedRows[index],
        [field]: value,
        totalOrderDetailPrice:
          updatedRows[index]?.productPrice *
          value *
          (1 - updatedRows[index]?.productDiscount / 100), // Cập nhật tổng tiền khi số lượng thay đổi
      };
      // Cập nhật tổng tiền của đơn hàng
      const newSubtotal =
        subtotal +
        updatedRows[index]?.productPrice *
          value *
          (1 - updatedRows[index]?.productDiscount / 100);
      setSubtotal(newSubtotal);
    }

    setNewRows(updatedRows); // Update newRows with updatedRows
  };

  const handleDeleteNewRow = (index) => {
    setNewRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(index, 1);
      return updatedRows;
    });
  };

  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li
            className="breadcrumb-item"
            onClick={() => navigate("/main/ordermanagement")}
          >
            Danh sách đơn hàng
          </li>
          <li className="breadcrumb-item">
            <a href="#">Thêm đơn hàng</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo mới món ăn</h3>
            <div className="tile-body">
              <form className="row">
                <div className="invoice-container">
                  <div className="invoice-header">
                    <div>
                      <label>Bàn</label>
                      <select>
                        <option value="table1">Bàn 1</option>
                        <option value="table2">Bàn 2</option>
                        <option value="table3">Bàn 3</option>
                      </select>
                    </div>
                    <div>
                      <label>Khách hàng</label>
                      <select>
                        <option value="customer1">Apricot Hotel</option>
                      </select>
                    </div>
                    <div>
                      {/* <span>Ngày tạo: 2020-03-04</span> */}
                      <button
                        type="button"
                        title="Thêm món ăn"
                        onClick={handleAddNewItem}
                      >
                        <FaPlusSquare />
                      </button>
                    </div>
                  </div>
                  <div className="invoice-body">
                    <table>
                      <thead>
                        <tr>
                          <th>Sản phẩm</th>
                          <th>Số lượng</th>
                          <th>Giá</th>
                          <th>Giảm giá</th>
                          <th>Tổng tiền</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showNewRow &&
                          newRows.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <select
                                  className="form-control"
                                  type="text"
                                  required
                                  value={row.productId}
                                  onChange={(e) =>
                                    handleNewRowChange(e, index, "productId")
                                  }
                                >
                                  <option>-- Chọn món ăn --</option>
                                  {products &&
                                    products.map((product) => (
                                      <option
                                        key={product._id}
                                        value={product._id}
                                      >
                                        {product.name}
                                      </option>
                                    ))}
                                </select>
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="number"
                                  required
                                  value={row.quantity}
                                  onChange={(e) =>
                                    handleNewRowChange(e, index, "quantity")
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="number"
                                  required
                                  value={row.productPrice}
                                  readOnly
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="number"
                                  required
                                  value={row.productDiscount}
                                  onChange={(e) =>
                                    handleNewRowChange(
                                      e,
                                      index,
                                      "productDiscount"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  required
                                  value={row.totalOrderDetailPrice}
                                  readOnly
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  title="Xóa món ăn"
                                  onClick={() => handleDeleteNewRow(index)}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="invoice-totals">
                    <div>
                      <label>Tạm tính</label>
                      <input
                        // className="form-control"
                        type="text"
                        required
                        value={subtotal}
                        readOnly
                      />
                    </div>
                    <div>
                      <label>Chiết khấu</label>
                      <input
                        // className="form-control"
                        type="text"
                        required
                        value={discount}
                        onChange={handleDiscountChange}
                      />
                    </div>

                    <div>
                      <label>Thành tiền</label>
                      <input
                        // className="form-control"
                        type="text"
                        required
                        value={subtotal}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <button className="btn btn-save" type="button">
                  Lưu
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/main/ordermanagement")}
                >
                  Trở về
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddOrders;
