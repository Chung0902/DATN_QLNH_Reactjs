import React from "react";

const UpdateEmployee = ({handleSubmit,firstName,lastName,phoneNumber,email,address,handleRoleChange,setFirstName,setLastName,setPhoneNumber,setEmail,setAddress,setVisible}) => {
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="form-group  col-md-12">
                  <span className="thong-tin-thanh-toan">
                    <h5>Chỉnh sửa thông tin nhân viên cơ bản</h5>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Họ</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e)=> setFirstName(e.target.value)}
                    disabled
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tên</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e)=> setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group  col-md-6">
                  <label className="control-label">Số điện thoại</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value={phoneNumber}
                    onChange={(e)=> setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Địa chỉ email</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Địa chỉ thường trú</label>
                  <input className="form-control" type="text" value={address} onChange={(e)=> setAddress(e.target.value)}/>
                </div>
                <div className="form-group  col-md-6">
                  <label htmlFor="exampleSelect1" className="control-label">
                    Chức vụ
                  </label>
                  <select className="form-control" id="exampleSelect1" required onChange={handleRoleChange}>
                    <option>Bán hàng</option>
                    <option>Chủ shop</option>
                    <option>Shipper</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
