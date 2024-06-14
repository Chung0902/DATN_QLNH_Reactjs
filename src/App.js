//import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import Layout from "./components/Main/Layout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import MainDashboardAdmin from "./pages/owner/MainDashboardAdmin";
import EmployeeManager from "./pages/owner/EmployeeManager";
import AddEmployee from "./pages/owner/employees/AddEmployee";
import CustomerManagement from "./pages/owner/CustomerManagement";
import AddCustomer from './pages/owner/customer/AddCustomer';
import CategoriesManager from "./pages/owner/CategoriesManager";
import ProductsManager from "./pages/owner/ProductsManager";
import AddProduct from "./pages/owner/products/AddProduct";
import OrderManagement from "./pages/owner/OrderManagement";
import RevenueManagement from "./pages/owner/RevenueManagement";
import ProfileManager from "./pages/employee/ProfileManager";
import ChatOnline from "./pages/owner/ChatOnline/index"
import TablesManager from './pages/owner/TablesManager';
import AddTable from "./pages/owner/table/AddTable";
import OrderDetails from './pages/owner/orders/OrderDetails';
import AddOrders from "./pages/owner/orders/AddOrders";
import UpdateReview from "./pages/owner/products/UpdateReview";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Layout />}>
          <Route path="/main/amindashboard" element={<MainDashboardAdmin/>} />
          <Route path="/main/employeemanager" element={<EmployeeManager/>} />
          <Route path="/main/employeemanager/addemployee" element={<AddEmployee/>} />
          <Route path="/main/customermanagement" element={<CustomerManagement/>} />
          <Route path="/main/customermanagement/addcustomer" element={<AddCustomer/>} />
          <Route path="/main/categoriesmanager" element={<CategoriesManager/>} />
          <Route path="/main/productsmanager" element={<ProductsManager/>} />
          <Route path="/main/productsmanager/addproducts" element={<AddProduct/>} />
          <Route path="/main/ordermanagement" element={<OrderManagement/>} />
          <Route path="/main/ordermanagement/orderdetails/:id" element={<OrderDetails/>} />
          <Route path="/main/ordermanagement/addorders" element={<AddOrders/>} />

          <Route path="/main/revenuemanagement" element={<RevenueManagement/>} />
          <Route path="/main/chat" element={<ChatOnline/>} />


          <Route path="/main/employeedashboard" element={<MainDashboardAdmin/>} />
          <Route path="/main/profilemanager" element={<ProfileManager/>} />

          <Route path="/main/tablesmanager" element={<TablesManager/>} />
          <Route path="/main/tablesmanager/addtables" element={<AddTable/>} />

          <Route path="/main/productsmanager/reviews/:id" element={<UpdateReview/>} />


          

        </Route>
        

        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
