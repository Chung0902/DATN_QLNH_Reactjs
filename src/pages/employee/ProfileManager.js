import React, { useEffect, useState } from "react";
import axiosClient from './../../libraries/axiosClient';
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";

const ProfileManager = () => {
     //context
     const [auth,setAuth] = useAuth();
     //state
     const [firstName,setFirstName]= useState("")
     const [lastName,setLastName]= useState("")
     const [email,setEmail]= useState("")
     const [password,setPassword]= useState("")
     const [phoneNumber,setPhoneNumber]= useState("")
     const [address,setAddress]= useState("")
     //const [question,setQuestion]= useState("")
 
     //get user data
     useEffect(() =>{
         const {email,firstName,lastName,phoneNumber,address,}= auth?.user;
         setFirstName(firstName);
         setLastName(lastName)
         setPhoneNumber(phoneNumber);
         setEmail(email);
         setAddress(address);
     },[auth?.user])
 
     //form function
     const handleSubmit = async (e) => {
         e.preventDefault()
         if (!firstName || !lastName || !email || !password) {
          toast.error("Please fill in all required fields");
          return;
        }
      
        try {
          const response = await axiosClient.put("admin/employees/profile", {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            address,
          });
      
          if (response?.error) {
            toast.error(response?.error);
          } else {
            setAuth({ ...auth, user: response?.updatedUser });
            let ls = JSON.parse(localStorage.getItem("auth")) || {};
            ls.user = response.updatedUser;
            localStorage.setItem("auth", JSON.stringify(ls));
            toast.success("Profile updated successfully");
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
     };
  return (
    <main className="app-content">
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Thông tin cá nhân</h3>
            <div className="tile-body row">
              <form className="row col-md-6 ms-2" onSubmit={handleSubmit}>
                <div className="form-group col-md-12">
                  <label className="control-label">Họ</label>
                  <input className="form-control" type="text" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Tên</label>
                  <input className="form-control" type="text"  value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Địa chỉ email</label>
                  <input className="form-control" type="text"  value={email}
                    onChange={(e) => setEmail(e.target.value)} disabled/>
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Địa chỉ thường trú</label>
                  <input className="form-control" type="text"  value={address}
                    onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className="form-group  col-md-12">
                  <label className="control-label">Số điện thoại</label>
                  <input className="form-control" type="number"  value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <div className="form-group  col-md-12">
                  <label className="control-label">Mật khẩu</label>
                  <input className="form-control" type="password"  value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn btn-info mb-3 ms-5" type="submit">
                  Lưu lại
                </button>
              </form>
              <div className="col-md-5 shadow ms-5 border border-info">
                <img src="https://static.vecteezy.com/system/resources/previews/018/989/610/original/a-man-finishes-work-on-deadline-flat-cartoon-illustration-of-enterprising-man-working-on-laptop-vector.jpg" width="100%" className="mt-5"/>
              </div>

              {/* <div className="form-group  col-md-3">
                <label for="exampleSelect1" className="control-label">
                  Chức vụ
                </label>
                <select className="form-control" id="exampleSelect1">
                  <option>-- Chọn chức vụ --</option>
                  <option>Bán hàng</option>
                  <option>Tư vấn</option>
                  <option>Dịch vụ</option>
                  <option>Thu Ngân</option>
                  <option>Quản kho</option>
                  <option>Bảo trì</option>
                  <option>Kiểm hàng</option>
                  <option>Bảo vệ</option>
                  <option>Tạp vụ</option>
                </select>
              </div>

              <div className="form-group col-md-12">
                <label className="control-label">Ảnh 3x4 nhân viên</label>
                <div id="myfileupload">
                  <input
                    type="file"
                    id="uploadfile"
                    name="ImageUpload"
                    onchange="readURL(this);"
                  />
                </div>
              </div> */}
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileManager;
