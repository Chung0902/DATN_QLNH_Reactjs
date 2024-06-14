import React, { useEffect, useState } from "react";
import axiosClient from "../../../libraries/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateReview.css"; 

const UpdateReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

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
    // Thêm logic cập nhật tại đây
    console.log("Update review:", reviewId);
  };

  const handleDelete = async (reviewId) => {
    try {
      // Thêm logic xóa tại đây
      console.log("Delete review:", reviewId);
      // Cập nhật lại danh sách đánh giá sau khi xóa
      setReviews(reviews.filter(review => review._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
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
                {Array.isArray(reviews) && reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <li key={index} className="review-item">
                      <div className="review-avatar">
                        <img src={`https://datn-qlnh-nodejs.onrender.com/${review.customerAvatar}`} alt="" />
                      </div>
                      <div className="review-details">
                        <p className="review-name">{review.customerName}</p>
                        <p className="review-rating">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}</p>
                        <p className="review-comment">{review.comment}</p>
                        <div className="review-actions">
                          <button onClick={() => handleUpdate(review._id)} className="btn-update">Cập nhật</button>
                          <button onClick={() => handleDelete(review._id)} className="btn-delete">Xóa</button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>Món ăn này chưa có đánh giá</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateReview;