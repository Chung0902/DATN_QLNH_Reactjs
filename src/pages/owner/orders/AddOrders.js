import React, { useState, useEffect } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useNavigate } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { toast } from "react-hot-toast";
import mongoose from "mongoose";


const AddOrders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [tables, setTables] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tableId, setTableId] = useState();
  const [customerId, setCustomerId] = useState();
  const [productId, setProductId] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

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
        row.price * row.quantity * (1 - row.productDiscount / 100);
    });
    return newSubtotal;
  };

  useEffect(() => {
    const newSubtotal = calculateSubtotal(newRows, discount);
    setSubtotal(newSubtotal);
    if (discount || discount === 0) {
      const discountFactor = (100 - discount) / 100;
      setTotalAfterDiscount(newSubtotal * discountFactor);
    } else {
      setTotalAfterDiscount(newSubtotal);
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

  const getAllCustomers = async () => {
    try {
      const response = await axiosClient.get("admin/customers");
      setCustomers(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCustomers();
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

  const handleAddNewItem = () => {
    setShowNewRow(true);
    setNewRows((prevRows) => [
      ...prevRows,
      {
       productId: "",
        quantity: 1,
        price: 0,
        productDiscount: 0,
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
          price: product.price,
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
          updatedRows[index]?.price *
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosClient.post("admin/orders", {
//         customerId,
//         employeeId,
//         discount,
//         orderDetails: [{
//           productId,
//           price,
//           quantity,
//         }]
//         ,
//         tableId
//       });
//       console.log(response?.payload);
//       if (response?.payload) {
//         toast.success("Order created successfully");
//         console.log("Order created successfully");
//         setOrders([...orders, response.payload]); 
//         navigate("/main/ordermanagement");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong in input form");
//     }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axiosClient.post("admin/orders", {
      customerId,
      employeeId,
      discount,
      orderDetails: newRows.map((row) => ({
        productId: row.productId,
        quantity: row.quantity,
        price: row.price,
      })),
      tableId
    });
    console.log(response?.payload);
    if (response?.payload) {
      toast.success("Tạo đơn hàng thành công");
      console.log("Tạo đơn hàng thành công");
      setOrders([...orders, response.payload]); 
      navigate("/main/ordermanagement");
    }
  } catch (error) {
    console.log(error);
    toast.error("Đã xảy ra lỗi khi nhập dữ liệu");
  }
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
            <h3 className="tile-title">Tạo mới đơn hàng</h3>
            <div className="tile-body">
              <form className="row" onSubmit={handleSubmit}>
                <div className="invoice-container">
                  <div className="invoice-header">
                    <div>
                      <label>Bàn</label>
                      <select
                        className="form-control"
                        id="exampleSelect3"
                        required
                        onChange={(event) => {
                          setTableId(event.target.value);
                        }}
                      >
                        <option value="">-- Chọn bàn --</option>
                        {tables &&
                          tables?.map((table) => {
                            if (
                              (table.status !== "Đã đặt" &&
                                table.setup === "Có sẵn") ||
                              (table.status !== "Đã đặt" &&
                                table.setup === "Không có sẵn")
                            ) {
                              return (
                                <option key={table._id} value={table._id}>
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
                      <select
                        className="form-control"
                        id="exampleSelect1"
                        required
                        onChange={(event) => {
                          setCustomerId(event.target.value);
                        }}
                      >
                        <option value="">-- Chọn khách hàng --</option>
                        {customers &&
                          customers?.map((customer) => (
                            <option key={customer._id} value={customer._id}>
                              {customer.firstName} {customer.lastName}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label>Nhân viên</label>
                      <select
                        className="form-control"
                        id="exampleSelect2"
                        required
                        onChange={(event) => {
                          console.log("Selected employee ID:", event.target.value);
                          setEmployeeId(event.target.value);
                        }}
                      >
                        <option value="">-- Chọn nhân viên --</option>
                        {employees &&
                          employees?.map((employee) => (
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
                                  value={row.price}
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
                <button className="btn btn-save" type="submit">
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
