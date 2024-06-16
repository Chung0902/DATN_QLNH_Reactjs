import React, { useEffect, useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateReview.css";
import { toast } from "react-hot-toast";

const UpdateReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosClient.get(`questions/pipeline/${id}`);
        console.log("API Response:", response);

        if (response.payload && Array.isArray(response.payload.reviews)) {
          setReviews(response.payload.reviews);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    console.log("Reviews state updated:", reviews);
  }, [reviews]);

  const handleUpdate = (reviewId) => {
    console.log("Update review:", reviewId);
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này không?")) {
      try {
        const response = await axiosClient.delete(`admin/reviews/${reviewId}`);
        if (response.data?.success) {
          // Tạo một mảng mới từ mảng reviews ban đầu, loại bỏ bình luận đã xóa
          const updatedReviews = reviews.filter((review) => review._id !== reviewId);
          setReviews(updatedReviews);
          toast.success("Bình luận đã được xóa thành công");
        } else {
          const errorMessage = response.data?.message || "Không thể xóa bình luận";
          toast.error(errorMessage);
        }
      } catch (error) {
        console.error("Lỗi khi xóa bình luận:", error);
        const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi khi xóa bình luận";
        toast.error(errorMessage);
      }
    }
  };
  
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const formattedDate = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${day}/${month}/${year}`;
    return formattedDate;
  };
  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb side">
          <li
            className="breadcrumb-item"
            onClick={() => navigate("/main/productsmanager")}
          >
            Danh sách món ăn
          </li>
          <li className="breadcrumb-item">
            <a href="#">Chi tiết đánh giá món ăn</a>
          </li>
        </ul>
        <div id="clock"></div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <div className="tile-body">
              <ul className="review-list">
                {currentReviews.length > 0 ? (
                  currentReviews.map((review, index) => (
                    <li key={index} className="review-item">
                      <div className="review-avatar">
                        <img
                          src={`https://datn-qlnh-nodejs.onrender.com/${review.customerAvatar}`}
                          alt=""
                        />
                      </div>
                      <div className="review-details">
                        <p className="review-name">{review.customerName}</p>
                        <p className="review-comment">
                          {formatDate(review.createdAt)}
                        </p>
                        <p className="review-rating">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </p>
                        <p className="review-comment">{review.comment}</p>
                        <div className="review-actions">
                          {/* <button
                            onClick={() => handleUpdate(review._id)}
                            className="btn-update"
                          >
                            Cập nhật
                          </button> */}
                          <button
                            onClick={() => {
                              console.log("Review ID to delete:", review.reviewId );
                              handleDelete(review.reviewId );
                            }}
                            className="btn-delete"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>Món ăn này chưa có đánh giá</li>
                )}
              </ul>

              {reviews.length > itemsPerPage && (
                <nav>
                  <ul className="pagination">
                    {[
                      ...Array(Math.ceil(reviews.length / itemsPerPage)).keys(),
                    ].map((number) => (
                      <li key={number + 1} className="page-item">
                        <button
                          onClick={() => paginate(number + 1)}
                          className="page-link"
                        >
                          {number + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateReview;
