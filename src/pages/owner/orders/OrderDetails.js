import React, { useEffect, useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";
import { FaPlusSquare } from "react-icons/fa";
import { toast } from "react-hot-toast";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState([]);
  const { id } = useParams(); // Lấy id từ đường dẫn
  const [udiscount, setUDiscount] = useState();
  const [uquantity, setUQuantity] = useState();
  const [orderDetailsId, setOrderDetailsId] = useState();
  const [tableId, setTableId] = useState();
  const [customerId, setCustomerId] = useState();
  const [showNewRow, setShowNewRow] = useState(false);
  const [newRows, setNewRows] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [newStatus, setNewStatus] = useState("");

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
    const parsedValue = parseInt(value, 10);

    if (field === "productId") {
      const product = products.find((product) => product._id === value);
      if (product) {
        setNewRows((prevRows) => {
          const updatedRows = [...prevRows];
          updatedRows[index] = {
            ...updatedRows[index],
            [field]: value,
            productPrice: product.price,
            productDiscount: product.discount,
            totalOrderDetailPrice:
              product.price *
              updatedRows[index].quantity *
              (1 - product.discount / 100), // Tính tổng tiền cho hàng mới
          };
          return updatedRows;
        });
      }
    } else if (field === "quantity") {
      setNewRows((prevRows) => {
        const updatedRows = [...prevRows];
        const currentRow = updatedRows[index];
        const product = products.find(
          (product) => product._id === currentRow.productId
        );

        if (product) {
          const newQuantity = Math.max(1, Math.min(parsedValue, product.stock));
          updatedRows[index] = {
            ...currentRow,
            [field]: newQuantity,
            totalOrderDetailPrice:
              currentRow.productPrice *
              newQuantity *
              (1 - currentRow.productDiscount / 100), // Cập nhật tổng tiền khi số lượng thay đổi
          };
        }
        return updatedRows;
      });
    }
  };

  const handleDeleteNewRow = (index) => {
    setNewRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows.splice(index, 1);
      return updatedRows;
    });
  };

  const handleSave = async () => {
    try {
      let statusUpdated = false;
      let itemsAdded = false;

      if (newStatus !== "") {
        // Cập nhật trạng thái của đơn hàng
        await axiosClient.patch(`admin/orders/${id}/status`, {
          status: newStatus,
        });
        statusUpdated = true;
      }

      if (newRows.length > 0) {
        // Thêm món ăn vào đơn hàng
        const newOrderDetails = newRows.map((row) => ({
          productId: row.productId,
          quantity: row.quantity,
          price: row.productPrice,
          discount: row.productDiscount, // Thêm thông tin giảm giá
        }));
        await axiosClient.patch(`admin/orders/${id}`, {
          orderDetails: newOrderDetails,
        });
        itemsAdded = true;
      }

      if (statusUpdated || itemsAdded) {
        // Nếu ít nhất một trong hai hoạt động đều thành công
        let successMessage = "";
        if (statusUpdated && itemsAdded) {
          successMessage =
            "Cập nhật trạng thái và thêm món ăn vào đơn hàng thành công!";
        } else if (statusUpdated) {
          successMessage = "Cập nhật trạng thái đơn hàng thành công!";
        } else {
          successMessage = "Thêm món ăn vào đơn hàng thành công!";
        }
        alert(successMessage);
        setNewStatus("");
        setNewRows([]);
        window.location.reload();
      } else {
        // Nếu không có gì để cập nhật
        alert("Không có thay đổi để lưu!");
      }
    } catch (error) {
      console.error(error);
      alert(
        "Đã xảy ra lỗi khi cập nhật trạng thái và thêm món ăn vào đơn hàng!"
      );
    }
  };

  const handleStatusChange = (e, id) => {
    const { value } = e.target;
    setNewStatus(value);
    setOrderDetails((prevDetails) => {
      const updatedDetails = prevDetails.map((detail) => {
        if (detail.order._id === id) {
          return {
            ...detail,
            order: {
              ...detail.order,
              status: value, // Cập nhật trạng thái mới
            },
          };
        }
        return detail;
      });
      return updatedDetails;
    });
  };

  const getOrders = async () => {
    try {
      const response = await axiosClient.get("admin/orders");
      setOrder(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getOrderDetails = async () => {
    try {
      const response = await axiosClient.get(`questions/listorders1?id=${id}`);
      setOrderDetails(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  const getAllOrders = async () => {
    try {
      const response = await axiosClient.get("questions/listorders1");
      setOrderDetails(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  // Thêm hàm tính tổng tiền sau khi áp dụng giảm giá cho mỗi mặt hàng
  const calculateTotalAmountDiscount = (orderDetails) => {
    let totalAmount = 0;
    orderDetails.forEach((orderDetail) => {
      const discountedPrice =
        orderDetail.productPrice *
        orderDetail.quantity *
        (1 - orderDetail.productDiscount / 100);
      totalAmount += discountedPrice;
    });
    return totalAmount;
  };

  // Hàm biến đổi định dạng ngày
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(0);
    return `${day}/${month}/${year}`;
  };

  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li
            className="breadcrumb-item"
            onClick={() => navigate("/main/ordermanagement")}
          >
            Danh sách đơn hàng
          </li>
          <li className="breadcrumb-item">
            <a href="#">Chi tiết đơn hàng</a>
          </li>
        </ul>
        <div id="clock"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <div className="tile-body">
                <div className="col-sm-2"></div>

                {orderDetails &&
                  orderDetails
                    .filter((order) => order.order._id === id)
                    .map((e) => (
                      <div key={e.order._id} className="invoice-container">
                        <div className="invoice-header ">
                          <div>
                            <label>Bàn</label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={e.order.table}
                              onChange={(e) => setTableId(e.target.value)}
                            />
                          </div>

                          <div>
                            <label>Khách hàng</label>
                            <input
                              className="form-control"
                              type="text"
                              required
                              value={`${e.order.customer.firstName}${e.order.customer.lastName}`}
                              onChange={(e) => setCustomerId(e.target.value)}
                            />
                          </div>
                          <div>
                            <span>
                              Ngày đặt: {formatDate(e.order.createdDate)}
                            </span>

                            {e.order.status !== "CANCELED" && (
                              <button
                                type="button"
                                title="Thêm món ăn"
                                onClick={handleAddNewItem}
                              >
                                <FaPlusSquare />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="invoice-body">
                          <table>
                            <thead>
                              <tr>
                                <th>Món ăn</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Giảm giá</th>
                                <th>Tổng tiền</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {e.orderDetails.map((orderDetail, index) => (
                                <tr key={index}>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="text"
                                      required
                                      value={orderDetail.productName}
                                      onChange={(e) =>
                                        setOrderDetailsId(e.target.value)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="number"
                                      required
                                      value={orderDetail.quantity}
                                      onChange={(e) =>
                                        setUQuantity(e.target.value)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="number"
                                      required
                                      value={orderDetail.productPrice}
                                      readOnly
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="number"
                                      required
                                      value={orderDetail.productDiscount}
                                      onChange={(e) =>
                                        setUDiscount(e.target.value)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      className="form-control"
                                      type="text"
                                      required
                                      value={
                                        orderDetail.productPrice *
                                        orderDetail.quantity *
                                        (1 - orderDetail.productDiscount / 100)
                                      }
                                      readOnly
                                    />
                                  </td>
                                </tr>
                              ))}
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
                                          handleNewRowChange(
                                            e,
                                            index,
                                            "productId"
                                          )
                                        }
                                      >
                                        <option>-- Chọn món ăn --</option>
                                        {products &&
                                          products.map((product) => {
                                            // Kiểm tra nếu số lượng trong kho của sản phẩm lớn hơn 0
                                            if (product.stock > 0) {
                                              return (
                                                <option
                                                  key={product._id}
                                                  value={product._id}
                                                >
                                                  {product.name}
                                                </option>
                                              );
                                            } else {
                                              // Nếu số lượng trong kho bằng 0, không hiển thị tên sản phẩm
                                              return null;
                                            }
                                          })}
                                      </select>
                                    </td>
                                    <td>
                                      <input
                                        className="form-control"
                                        type="number"
                                        required
                                        value={row.quantity}
                                        onChange={(e) =>
                                          handleNewRowChange(
                                            e,
                                            index,
                                            "quantity"
                                          )
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
                                        onClick={() =>
                                          handleDeleteNewRow(index)
                                        }
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
                              type="text"
                              required
                              value={calculateTotalAmountDiscount(
                                e.orderDetails
                              )}
                              readOnly
                            />
                          </div>
                          <div>
                            <label>Chiết khấu</label>
                            <input
                              // className="form-control"
                              type="text"
                              required
                              value={e.order.discount}
                              onChange={(e) => setUDiscount(e.target.value)}
                            />
                          </div>

                          <div>
                            <label>Thành tiền</label>
                            <input
                              type="text"
                              required
                              value={
                                e.orderDetails.reduce(
                                  (total, orderDetail) =>
                                    total +
                                    orderDetail.productPrice *
                                      orderDetail.quantity *
                                      (1 - orderDetail.productDiscount / 100),
                                  0
                                ) *
                                (1 - e.order.discount / 100)
                              }
                              readOnly
                            />
                          </div>
                          <div>
                            <label>Trạng thái</label>
                            <select
                              value={e.order.status}
                              onChange={(e) => handleStatusChange(e, id)}
                              disabled={e.order.status === "CANCELED"}
                            >
                              <option
                                value="WAITING"
                                disabled={
                                  e.order.status === "DELIVERING" ||
                                  e.order.status === "COMPLETED"
                                }
                              >
                                WAITING
                              </option>
                              <option
                                value="DELIVERING"
                                disabled={e.order.status === "COMPLETED"}
                              >
                                DELIVERING
                              </option>
                              <option
                                value="COMPLETED"
                                disabled={
                                  e.order.status === "WAITING" ||
                                  e.order.status === "CANCELED"
                                }
                              >
                                COMPLETED
                              </option>
                              <option
                                value="CANCELED"
                                disabled={
                                  e.order.status === "DELIVERING" ||
                                  e.order.status === "COMPLETED"
                                }
                              >
                                CANCELED
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                <button
                  className="btn btn-save"
                  type="button"
                  onClick={handleSave}
                >
                  Lưu
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/main/ordermanagement")}
                >
                  Trở về
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetails;
