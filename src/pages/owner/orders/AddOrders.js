import React, { useState, useEffect } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useNavigate } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";

const AddOrders = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [tables, setTables] = useState([]);

  const handleDiscountChange = (e) => {
    const { value } = e.target;
    const discountValue = value === "" ? 0 : parseFloat(value);
    setDiscount(discountValue);
    const discountFactor = (100 - discountValue) / 100;
    setTotalAfterDiscount(subtotal * discountFactor);
  };

  const calculateSubtotal = (rows, discount) => {
    let newSubtotal = 0;
    rows.forEach((row) => {
      newSubtotal +=
        row.productPrice * row.quantity * (1 - row.productDiscount / 100);
    });
    return newSubtotal;
  };

  useEffect(() => {
    const newSubtotal = calculateSubtotal(newRows, discount);
    setSubtotal(newSubtotal);
    // Recalculate the total after discount if discount is applied
    if (discount || discount === 0) {
      // Check if discount is 0 as well
      const discountFactor = (100 - discount) / 100;
      setTotalAfterDiscount(newSubtotal * discountFactor);
    } else {
      setTotalAfterDiscount(newSubtotal); // If discount is not applied, set total after discount to subtotal
    }
  }, [newRows, discount]);

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

  const getAllEmployees = async () => {
    try {
      const response = await axiosClient.get("admin/employees");
      setEmployees(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllTable = async () => {
    try {
      const response = await axiosClient.get("admin/tables");
      setTables(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTable();
  }, []);

  const handleAddNewItem = () => {
    setShowNewRow(true);
    setNewRows((prevRows) => [
      ...prevRows,
      {
        productName: "",
        productId: "",
        quantity: 1,
        productPrice: "",
        productDiscount: "",
        totalOrderDetailPrice: "",
      },
    ]);
  };

  const handleNewRowChange = (e, index, field) => {
    const { value } = e.target;
    let updatedRows = [...newRows];

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
            (1 - product.discount / 100),
        };
      }
    } else if (field === "quantity") {
      updatedRows[index] = {
        ...updatedRows[index],
        [field]: value,
        totalOrderDetailPrice:
          updatedRows[index]?.productPrice *
          value *
          (1 - updatedRows[index]?.productDiscount / 100),
      };
    }

    setNewRows(updatedRows);
    const newSubtotal = calculateSubtotal(updatedRows, discount);
    setSubtotal(newSubtotal);
  };

  const handleDeleteNewRow = (index) => {
    setNewRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(index, 1);
      // Return the updated rows without recalculating the subtotal here
      return updatedRows;
    });
    const newSubtotal = calculateSubtotal(newRows, discount);
    setSubtotal(newSubtotal);
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
                        {/* Thêm một option mặc định */}
                        <option value="">-- Chọn bàn --</option>
                        {/* Sử dụng map để render danh sách bàn */}
                        {tables &&
                          tables.map((table) => {
                            // Kiểm tra trạng thái của bàn và chỉ hiển thị những bàn mà bạn muốn
                            if (
                              (table.status !== "Đã đặt" &&
                                table.setup === "Có sẵn") ||
                              (table.status !== "Đã đặt" &&
                                table.setup === "Không có sẵn")
                            ) {
                              return (
                                <option key={table.id} value={table.id}>
                                  {table.name}
                                </option>
                              );
                            } else {
                              return null;
                            }
                          })}
                      </select>
                    </div>

                    <div>
                      <label>Khách hàng</label>
                      <select>
                        <option value="">-- Chọn khách hàng --</option>
                        {employees &&
                          employees.map((employee) => (
                            <option key={employee._id} value={employee._id}>
                              {employee.firstName} {employee.lastName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
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
                      <input type="text" required value={subtotal} readOnly />
                    </div>
                    <div>
                      <label>Chiết khấu</label>
                      <input
                        type="text"
                        required
                        value={discount}
                        onChange={handleDiscountChange}
                      />
                    </div>

                    <div>
                      <label>Thành tiền</label>
                      <input
                        type="text"
                        required
                        value={totalAfterDiscount}
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
