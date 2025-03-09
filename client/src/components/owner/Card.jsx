import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function Card({ data, bookings, statusL }) {
  
  const arrData = [];
  let i = 0;
  let tot = 0;
  for (const [key, value] of Object.entries(data)) {
    if (i == 0) {
      arrData.push({ id: i, value: value["nbr"], label: key, color: "orange" });
    } else {
      arrData.push({ id: i, value: value["nbr"], label: key });
    }
    tot += value["nbr"];
    i++;
  }

  return (
    <div className="card-home--container">
      <div className="card-home">
        <PieChart
          series={[
            {
              arcLabel: (item) => `${Math.round(item.value*100/tot)}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: "60%",
              data: arrData,
            },
          ]}
          width={450}
          height={200}
        />
      </div>
      <div className="card-home">
        <Gauge
          value={statusL.length}
          valueMax={bookings.length}
          startAngle={-110}
          endAngle={110}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 20,
              transform: "translate(0px, 0px)",
            },
          }}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
          width={150}
          height={200}
        />
      </div>
    </div>
  );
}

export default Card;
