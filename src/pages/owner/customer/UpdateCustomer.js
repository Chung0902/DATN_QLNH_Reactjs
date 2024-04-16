import React from "react";

const UpdateCustomer = () => {
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
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="form-group  col-md-12">
                  <span className="thong-tin-thanh-toan">
                    <h5>Chỉnh sửa thông tin khách hàng cơ bản</h5>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">ID khách hàng</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value="#CD2187"
                    disabled
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Họ và tên</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value="Nguyễn Thị Chung"
                  />
                </div>
                <div className="form-group  col-md-6">
                  <label className="control-label">Số điện thoại</label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    value="09267312388"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Địa chỉ email</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    value="chung@gmail.com"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Ngày sinh</label>
                  <input className="form-control" type="date" value="13/09/2002" />
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
              <button type="button" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
