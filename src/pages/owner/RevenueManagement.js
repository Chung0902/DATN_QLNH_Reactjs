import React, { useEffect, useState } from "react";
import axiosClient from "../../libraries/axiosClient";
import {
  FaHospitalUser,
  FaBandcamp,
  FaFirstOrderAlt,
  FaRegMoneyBillAlt,
  FaUserCheck,
  FaTimesCircle,
  FaCalendarDay,
  FaIdCard,
} from "react-icons/fa";

const RevenueManagement = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalstaff, setTotalstaff] = useState(0);
  const [totalorder, setTotalorder] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [newemployees, setNewEmployees] = useState(0);
  const [outstock, setOutstock] = useState(0);
  const [canceledorder, setCanceledorder] = useState(0);
  const [bestsellerlist, setBestsellerlist] = useState([]);
  const [totalsupplier, setTotalsupplier] = useState(0);
  const [CompletedOrders, setCompletedOrders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [outstockk, setOutstockk] = useState([]);

  //tổng nhà cung cấp
  const getTotalsupplier = async () => {
    try {
      const response = await axiosClient.get("questions/totalsupplier");
      if (response && response.payload) {
        const totalsupplier = response.payload.length;
        setTotalsupplier(totalsupplier);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //tổng sản phẩm
  const getGrossProduct = async () => {
    try {
      const response = await axiosClient.get("questions/grossproduct");
      if (response && response.payload) {
        // Lấy độ dài của mảng sản phẩm để tính tổng số sản phẩm
        const totalProducts = response.payload.length;
        setTotalProducts(totalProducts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //tổng nhân viên
  const getTotalStaff = async () => {
    try {
      const response = await axiosClient.get("questions/totalstaff");
      if (response && response.payload) {
        // Lấy độ dài của mảng nhân viên để tính tổng số nhân viên
        const totalstaff = response.payload.length;
        setTotalstaff(totalstaff);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //tổng đơn hàng
  const getTotalOrder = async () => {
    try {
      const response = await axiosClient.get("questions/totalorder");
      if (response && response.payload) {
        const totalorder = response.payload.length;
        setTotalorder(totalorder);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //tổng thu nhập
  const getTotalIncome = async () => {
    try {
      const response = await axiosClient.get("questions/CompletedOrders");
      if (response && response.totalIncome !== undefined) {
        const totalIncomeValue = parseFloat(response.totalIncome);
        setTotalIncome(totalIncomeValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //tổng nhân viên mới cập nhật theo tuần gần nhất
  const getCountNewEmployees = async () => {
    try {
      const response = await axiosClient.get("questions/countNewEmployees");
      if (response && response.totalNewEmployees !== undefined) {
        const newemployees = parseFloat(response.totalNewEmployees);
        setNewEmployees(newemployees);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //hiển thị danh sách nhân viên mới
  const getNewEmployees = async () => {
    try {
      const response = await axiosClient.get("questions/countNewEmployees");
      setEmployees(response.newEmployees);
    } catch (error) {
      console.error(error);
    }
  };

  //tổng sản phẩm hết hàng
  const getOutStock = async () => {
    try {
      const response = await axiosClient.get("questions/outstock");
      if (response && response.totalOutstock !== undefined) {
        const outstock = parseFloat(response.totalOutstock);
        setOutstock(outstock);
      }
    } catch (error) {
      console.error(error);
    }
  };

   //Hiển thị danh sách sản phẩm hết hàng
   const getOutStockk = async () => {
    try {
      const response = await axiosClient.get("questions/outstock");
      setOutstockk(response.newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  //tổng sản phẩm bị hủy
  const getCanceledOrder = async () => {
    try {
      const response = await axiosClient.get("questions/canceledorder");
      if (response && response.totalResult !== undefined) {
        const canceledorder = parseFloat(response.totalResult);
        setCanceledorder(canceledorder);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //hiển thị danh sách đơn hàng đã hoàn thành
  const getCompletedOrders = async () => {
    try {
      const response = await axiosClient.get("questions/CompletedOrders");
      setCompletedOrders(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  //hiển thị danh sách bán chạy nhất
  const getbestsellerlist = async () => {
    try {
      const response = await axiosClient.get("questions/bestsellerlist");
      setBestsellerlist(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm biến đổi định dạng ngày sinh
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(0);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    getGrossProduct();
    getTotalStaff();
    getTotalOrder();
    getTotalIncome();
    getCountNewEmployees();
    getOutStock();
    getCanceledOrder();
    getbestsellerlist();
    getTotalsupplier();
    getCompletedOrders();
    getNewEmployees();
    getOutStockk();
  }, []);

  return (
    <main className="app-content">
      <div className="row">
        <div className="col-md-12">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">
                  <b>Báo cáo doanh thu </b>
                </a>
              </li>
            </ul>
            <div id="clock"></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-lg-3">
          <div className="widget-small primary coloured-icon">
            <div className="iicon ">
              <i className="icon ">
                <FaHospitalUser />
              </i>
            </div>
            <div className="info">
              <h4>Tổng Nhân viên</h4>
              <p>
                <b>{totalstaff} nhân viên</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-lg-3">
          <div className="widget-small info coloured-icon">
            <div className="iicon ">
              <i className="icon ">
                <FaBandcamp />
              </i>
            </div>
            <div className="info">
              <h4>Tổng món ăn</h4>
              <p>
                <b>{totalProducts} món ăn</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-lg-3">
          <div className="widget-small warning coloured-icon">
            <div className="iicon ">
              <i className="icon ">
                <FaFirstOrderAlt />
              </i>
            </div>

            <div className="info">
              <h4>Tổng đơn hàng</h4>
              <p>
                <b>{totalorder} đơn hàng</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-lg-3">
          <div className="widget-small danger coloured-icon">
            <div className="iicon ">
              <i className="icon ">
                <FaIdCard />
              </i>
            </div>

            <div className="info">
              <h4>Tổng NCC</h4>
              <p>
                <b>{totalsupplier} nhà cung cấp</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-lg-3">
          <div className="widget-small primary coloured-icon">
            <div className="iicon ">
              <i className="icon ">
                <FaRegMoneyBillAlt />
              </i>
            </div>
            <div className="info">
              <h4>Tổng thu nhập</h4>
              <p>
                <b>{totalIncome} đ</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-lg-3">
          <div className="widget-small info coloured-icon">
            <div className="iicon ">
              <i className="icon ">
                <FaUserCheck />
              </i>
            </div>

            <div className="info">
              <h4>Nhân viên mới</h4>
              <p>
                <b>{newemployees} nhân viên</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-lg-3">
          <div className="widget-small warning coloured-icon">
            <div className="iicon ">
              <i className="icon ">
                <FaTimesCircle />
              </i>
            </div>

            <div className="info">
              <h4>Hết hàng</h4>
              <p>
                <b>{outstock} món ăn</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-lg-3">
          <div className="widget-small danger coloured-icon">
            <div className="iicon ">
              <i className="icon ">
                <FaCalendarDay />
              </i>
            </div>

            <div className="info">
              <h4>Đơn hàng hủy</h4>
              <p>
                <b>{canceledorder} đơn hàng</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div>
              <h3 className="tile-title">MÓN ĂN BÁN CHẠY</h3>
            </div>
            <div className="tile-body">
              <table
                className="table table-hover table-bordered"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th>Mã món ăn</th>
                    <th>Tên món ăn</th>
                    <th>Giá tiền</th>
                    <th>Đã bán</th>
                  </tr>
                </thead>
                <tbody>
                  {bestsellerlist &&
                    bestsellerlist.map((e) => (
                      <tr key={e._id}>
                        <td>{e._id}</td>
                        <td>{e.name}</td>
                        <td>{e.price} đ</td>
                        <td>{e.totalQuantity}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div>
              <h3 className="tile-title">TỔNG ĐƠN HÀNG ĐÃ HOÀN THÀNH</h3>
            </div>
            <div className="tile-body">
              <table
                className="table table-hover table-bordered"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th>ID đơn hàng</th>
                    <th>Khách hàng</th>
                    <th>Món Ăn</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {CompletedOrders &&
                    CompletedOrders.map((e) => (
                      <React.Fragment key={e.order._id}>
                        {/* Hiển thị thông tin khách hàng cho mỗi đơn hàng */}
                        <tr>
                          <td rowSpan={e.orderDetails.length + 1}>
                            {e.order._id}
                          </td>
                          <td rowSpan={e.orderDetails.length + 1}>
                            {e.order.customer.firstName}{" "}
                            {e.order.customer.lastName}
                          </td>
                        </tr>
                        {/* Hiển thị thông tin sản phẩm cho mỗi đơn hàng */}
                        {e.orderDetails.map((orderDetail) => (
                          <tr key={orderDetail.productId}>
                            <td>{orderDetail.productName}</td>
                            <td>{orderDetail.quantity}</td>
                            <td>{orderDetail.totalOrderDetailPrice} đ</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="4">Tổng cộng:</th>
                    <td>{totalIncome} đ</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div>
              <h3 className="tile-title">MÓN ĂN ĐÃ HẾT</h3>
            </div>
            <div className="tile-body">
              <table
                className="table table-hover table-bordered"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th>Mã món ăn</th>
                    <th>Tên món ăn</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Tình trạng</th>
                    <th>Giá tiền</th>
                  </tr>
                </thead>
                <tbody>
                {outstockk &&
                    outstockk.map((e) => (
                  <tr key={e._id}>
                    <td>{e._id}</td>
                    <td>{e.name}</td>
                    <td>
                      <img
                        src={e.photo}
                        alt=""
                        width="100px;"
                        height={"100px"}
                      />
                    </td>
                    <td>{e.stock}</td>
                    <td>
                      <span className="badge bg-danger">Hết hàng</span>
                    </td>
                    <td>{e.price} đ</td>
                  </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div>
              <h3 className="tile-title">NHÂN VIÊN MỚI</h3>
            </div>
            <div className="tile-body">
              <table
                className="table table-hover table-bordered"
                id="sampleTable"
              >
                <thead>
                  <tr>
                    <th>Họ và tên</th>
                    <th>Địa chỉ</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>SĐT</th>
                  </tr>
                </thead>
                <tbody>
                  {employees &&
                    employees.map((e) => (
                      <tr key={e._id}>
                        <td>
                          {e.firstName }{" "}
                          {e.lastName }
                        </td>
                        <td>{e.address} </td>
                        <td>{formatDate(e.birthday)}</td>
                        <td>{e.sex}</td>
                        <td>{e.phoneNumber}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RevenueManagement;
