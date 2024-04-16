import React from "react";

const BrowsOrder = () => {
  return (
    <div
      className="modal fade"
      id="ModalUP"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="form-group  col-md-12">
                <span className="thong-tin-thanh-toan">
                  <h5>Duyệt đơn hàng</h5>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label className="control-label">Mã đơn hàng </label>
                <p>1283920</p>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Tên khách hàng</label>
                <p>Nguyễn Thị Chung</p>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Đơn hàng</label>
                <p>Son 3CE</p>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Số lượng</label>
                <p>2</p>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Tổng tiền</label>
                <p>500000 đ</p>
              </div>
              <div className="form-group col-md-6">
                <label className="control-label">Tình trạng</label>
                <p>Đang chờ duyệt</p>
              </div>
            </div>

            <button className="btn btn-save" type="button">
              Duyệt đơn hàng
            </button>
            <button className="btn btn-save" type="button">
              Từ chối duyệt đơn hàng
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default BrowsOrder;
