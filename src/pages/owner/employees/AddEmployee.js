import React,{useState} from 'react'
import { toast } from 'react-hot-toast';
import axiosClient from '../../../libraries/axiosClient';
import { useNavigate, useNavigation } from 'react-router-dom';


const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [firstName,setFirstName] = useState();
  const [birthday,setBirthday]= useState();
  const [address,setAddress] = useState();
  const [lastName,setLastName] = useState();
  const [phoneNumber,setPhoneNumber]= useState();
  const [email,setEmail] = useState();
  const [sex,setSex]= useState();
  const [role,setRole] = useState();
  const [question,setQuestion] = useState();
  const [password,setPassword] = useState ();
  const navigate = useNavigate()

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    let roleCode;

    if (selectedRole === 'Bán hàng') {
      roleCode = 0;
    } else if (selectedRole === 'Shipper') {
      roleCode = 2;
    } else if (selectedRole === 'Chủ shop') {
      roleCode = 1;
    }

    setRole(roleCode);
  };

    //handle Form
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        const response = await axiosClient.post("admin/employees", { firstName, lastName, phoneNumber, address, email,birthday,password,sex,role,question });
        if (response?.payload) {
          toast.success(response.message);
           console.log(response.message)
          // setName(response.payload);
          setEmployees([...employees, response.payload]); // Thêm danh mục mới vào danh sách
          navigate('/main/employeemanager')
        } 
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in input form");
      }
    };
  return (
    <main className="app-content">
        <div className="app-title">
            <ul className="app-breadcrumb breadcrumb ">
                <li className="breadcrumb-item" onClick={()=>navigate("/main/employeemanager")}>Danh sách nhân viên</li>
                <li className="breadcrumb-item"><a href="#">Thêm nhân viên</a></li>
            </ul>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="tile">
                <h3 className="tile-title">Tạo mới nhân viên</h3>
          <div className="tile-body">
            <div className="row element-button">
              <div className="col-sm-2">
                <a className="btn btn-add btn-sm" data-toggle="modal" data-target="#exampleModalCenter"><b><i
                      className="fas fa-folder-plus"></i> Tạo chức vụ mới</b></a>
              </div>

            </div>
            <form className="row" onSubmit={handleSubmit}>
              <div className="form-group col-md-4">
                <label className="control-label">Họ</label>
                <input className="form-control" type="text" required  value = {firstName}
                    onChange={(e)=> setFirstName(e.target.value)}/>
              </div>
              <div className="form-group col-md-4">
                <label className="control-label">Tên</label>
                <input className="form-control" type="text" required value = {lastName}
                    onChange={(e)=> setLastName(e.target.value)}/>
              </div>
              <div className="form-group col-md-4">
                <label className="control-label">Địa chỉ email</label>
                <input className="form-control" type="text" required value = {email}
                    onChange={(e)=> setEmail(e.target.value)}/>
              </div>
               <div className="form-group col-md-4">
                <label className="control-label">Địa chỉ thường trú</label>
                <input className="form-control" type="text" required value = {address}
                    onChange={(e)=> setAddress(e.target.value)}/> 
              </div>
              <div className="form-group  col-md-4">
                <label className="control-label">Số điện thoại</label>
                <input className="form-control" type="number" required value = {phoneNumber}
                    onChange={(e)=> setPhoneNumber(e.target.value)}/>
              </div>
              <div className="form-group col-md-4">
                <label className="control-label">Ngày sinh</label>
                <input className="form-control" type="date" value = {birthday}
                    onChange={(e)=> setBirthday(e.target.value)} required/>
              </div> 
              <div className="form-group col-md-3">
                <label className="control-label">Mật khẩu</label>
                <input className="form-control" type="password" value = {password}
                    onChange={(e)=> setPassword(e.target.value)} required/>
              </div> 
              <div className="form-group col-md-3">
                <label className="control-label">Sở thích</label>
                <input className="form-control" type="text" value = {question}
                    onChange={(e)=> setQuestion(e.target.value)} required/>
              </div> 
              <div className="form-group col-md-3">
                <label className="control-label">Giới tính</label>
                <select className="form-control" id="exampleSelect2" required onChange={(event) => {setSex(event.target.value)}}>
                  <option>-- Chọn giới tính --</option>
                  <option>Nam</option>
                  <option>Nữ</option>
                </select>
              </div> 
              <div className="form-group  col-md-3">
                <label for="exampleSelect1" className="control-label">Chức vụ</label>
                <select className="form-control" id="exampleSelect1" required onChange={handleRoleChange}>
                  <option>-- Chọn chức vụ --</option>
                  <option>Bán hàng</option>
                  <option>Shipper</option>
                  <option>Chủ shop</option>
                </select>
              </div>

              {/* <div className="form-group col-md-12">
                <label className="control-label">Ảnh 3x4 nhân viên</label>
                <div id="myfileupload">
                  <input type="file" id="uploadfile" name="ImageUpload" onchange="readURL(this);" />
                </div>
              </div> */}
              <button className="btn btn-info" type="submit" >Lưu lại</button>
              <button className="btn btn-danger" type="button" onClick={()=>navigate("/main/employeemanager")}>Trở về</button>
            </form>

             
          </div>
          
                </div>
            </div>
        </div>
    </main>
  )
}

export default AddEmployee