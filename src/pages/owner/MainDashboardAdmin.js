import React, { useEffect, useState } from "react";
import axiosClient from "../../libraries/axiosClient";
import "../../../src/styles/main.css";
import {
  FaHouseUser,
  FaDatabase,
  FaShoppingBag,
  FaBandcamp,
} from "react-icons/fa";
import BarChart from "./dashboard/BarChart";
import PolarAreaChart from "./dashboard/PolarAreaChart";

const MainDashboardAdmin = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalorder, setTotalorder] = useState(0);
  const [totalcustomer, setTotalcustomer] = useState(0);
  const [outstock, setOutstock] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [top5Customers, setTop5Customers] = useState([]);
  const [countNewCustomer, setCountNewCustomer] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

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

  //tổng khách hàng
  const getTotalcustomer = async () => {
    try {
      const response = await axiosClient.get("questions/totalcustomer");
      if (response && response.payload) {
        const totalcustomer = response.payload.length;
        setTotalcustomer(totalcustomer);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //tổng sản phẩm sắp hết hàng
  const getOutStock = async () => {
    try {
      const response = await axiosClient.get("questions/outstock1");
      if (response && response.totalOutstock !== undefined) {
        const outstock = parseFloat(response.totalOutstock);
        setOutstock(outstock);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //hiển thị danh sách nhân viên mới
  const getNewCustomer = async () => {
    try {
      const response = await axiosClient.get("questions/countNewCustomer");
      setCountNewCustomer(response.newCustomer);
    } catch (error) {
      console.error(error);
    }
  };

  //hiển thị danh sách khách hàng mới
  const getNewEmployees = async () => {
    try {
      const response = await axiosClient.get("questions/countNewEmployees");
      setEmployees(response.newEmployees);
    } catch (error) {
      console.error(error);
    }
  };

  //hiển thị danh sách top 5 khách hàng mua nhiều nhất
  const getTop5Customers = async () => {
    try {
      const response = await axiosClient.get("questions/getTop5Customers");
      setTop5Customers(response.payload);
    } catch (error) {
      console.error(error);
    }
  };

  //Kết nối vs PolarAreaChart
  const fetchBestSellers = async () => {
    try {
      const response = await axiosClient.get("questions/bestsellerlist");
      setBestSellers(response.payload);
    } catch (error) {
      console.error("Error fetching best-sellers:", error);
    }
  };

 // Hiển thị doanh thu theo 1 tuần hiện tại
 const calculateRevenueInAWeek = async () => {
  try {
    const response = await axiosClient.get(
      "questions/calculateRevenueInAWeek"
    );
    if (response && response.weeklyRevenue) {
      const formattedRevenueData = Object.keys(response.weeklyRevenue).map(date => ({
        date: date,
        totalRevenue: response.weeklyRevenue[date].totalRevenue
      }));
      setRevenueData(formattedRevenueData); // Cập nhật dữ liệu doanh thu vào biến state
    }
  } catch (error) {
    console.error("Error fetching revenue data:", error);
  }
};

  useEffect(() => {
    getGrossProduct();
    getTotalOrder();
    getTotalcustomer();
    getOutStock();
    getNewEmployees();
    getTop5Customers();
    getNewCustomer();
    fetchBestSellers();
    calculateRevenueInAWeek();
  }, []);

  return (
    <main className="app-content">
      <div className="row">
        <div className="col-md-12">
          <div className="app-title">
            <ul className="app-breadcrumb breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">
                  <b>Bảng điều khiển</b>
                </a>
              </li>
            </ul>
            <div id="clock"></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <div className="row">
            <div className="col-md-6">
              <div className="widget-small primary coloured-icon">
                <div className="iicon">
                  <i className="icon">
                    <FaHouseUser />
                  </i>
                </div>
                <div className="info">
                  <h4>Tổng khách hàng</h4>
                  <p>
                    <b>{totalcustomer} khách hàng</b>
                  </p>
                  <p className="info-tong">Tổng số khách hàng được quản lý.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="widget-small info coloured-icon">
                <div className="iicon">
                  <i className="icon">
                    <FaDatabase />
                  </i>
                </div>
                <div className="info">
                  <h4>Tổng món ăn</h4>
                  <p>
                    <b>{totalProducts} món ăn</b>
                  </p>
                  <p className="info-tong">Tổng số món ăn được quản lý.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="widget-small warning coloured-icon">
                <div className="iicon">
                  <i className="icon">
                    <FaShoppingBag />
                  </i>
                </div>
                <div className="info">
                  <h4>Tổng đơn hàng</h4>
                  <p>
                    <b>{totalorder} đơn hàng</b>
                  </p>
                  <p className="info-tong">
                    Tổng số hóa đơn bán hàng trong tháng.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="widget-small danger coloured-icon">
                <div className="iicon">
                  <i className="icon">
                    <FaBandcamp />
                  </i>
                </div>
                <div className="info">
                  <h4>Sắp hết hàng</h4>
                  <p>
                    <b>{outstock} món ăn</b>
                  </p>
                  <p className="info-tong">
                    Số món ăn cảnh báo hết cần nhập thêm.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">
                  Khách hàng có lượt mua nhiều nhất
                </h3>
                <div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        {/* <th>ID khách hàng</th> */}
                        <th>Tên khách hàng</th>
                        <th>Số lượt mua</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {top5Customers &&
                        top5Customers.map((e) => (
                          <tr key={e.customerId}>
                            {/* <td>{e.customerId}</td> */}
                            <td>
                              {e.firstName} {e.lastName}
                            </td>
                            <td>{e.totalPurchase}</td>
                            <td>{e.totalPrice} đ</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Khách hàng mới</h3>
                <div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Họ và tên</th>
                        <th>Địa chỉ</th>
                        <th>SĐT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {countNewCustomer &&
                        countNewCustomer.map((e) => (
                          <tr key={e._id}>
                            <td>
                              {e.firstName} {e.lastName}
                            </td>
                            <td>{e.address} </td>
                            <td>{e.phoneNumber}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="row">
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Top 5 món ăn bán chạy</h3>
                <div className="embed-responsive embed-responsive-16by9">
                  <PolarAreaChart data={bestSellers} />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="tile">
                <h3 className="tile-title">Thống kê doanh thu theo ngày trong 1 tuần hiện tại</h3>
                <div className="embed-responsive embed-responsive-16by9">
                  {/* Truyền dữ liệu doanh thu vào BarChart */}
                  <BarChart
                    weekDays={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                    revenueData={revenueData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainDashboardAdmin;