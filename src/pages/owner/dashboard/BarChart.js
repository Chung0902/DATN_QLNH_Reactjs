import React from "react";
import { CChart } from "@coreui/react-chartjs";

const BarChart = ({ weekDays, revenueData }) => {
  // Code của thành phần BarChart ở đây
  // Đảm bảo rằng weekDays và revenueData có giá trị hợp lệ và không rỗng trước khi sử dụng.

  return (
    <>
       <CChart
        type="bar"
        data={{
          labels: weekDays,
          datasets: [
            {
              label: "Doanh thu",
              backgroundColor: "#f87979",
              data: revenueData.map(dayData => dayData.totalRevenue), // Lấy totalRevenue từ mảng revenueData
            },
          ],
        }}
        labels="week days"
        options={{
          plugins: {
            legend: {
              labels: {},
            },
          },
          scales: {
            x: {
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                color: "#333",
              },
            },
            y: {
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
              ticks: {
                color: "#333",
              },
            },
          },
        }}
      />
    </>
  );
};

export default BarChart;
