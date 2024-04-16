import React from "react";
import { CChart } from "@coreui/react-chartjs";

function getStyle(property) {
  return getComputedStyle(document.documentElement).getPropertyValue(property);
}

const PolarAreaChart = (props) => {
  // Trường hợp không có dữ liệu, hiển thị thông báo hoặc một biểu đồ mặc định
  if (!props.data || props.data.length === 0) {
    return <div>Không có dữ liệu để hiển thị biểu đồ</div>;
  }

  const chartData = {
    labels: props.data.map((product) => product.name),
    datasets: [
      {
        data: props.data.map((product) => product.totalQuantity),
        backgroundColor: [
          "#FF6384",
          "#4BC0C0",
          "#FFCE56",
          "#E7E9ED",
          "#36A2EB",
        ],
      },
    ],
  };

  return (
    <>
      <CChart
        type="polarArea" //loại biểu đồ
        data={chartData} //dữ liệu biểu đồ
        options={{ //tùy chọn cấu hình biểu đồ
          plugins: {
            legend: {
              labels: {
                color: getStyle("--cui-body-color"),
              },
            },
          },
          scales: {
            r: {
              grid: {
                color: getStyle("--cui-border-color"),
              },
            },
          },
        }}
      />
    </>
  );
};

export default PolarAreaChart;
