import React from "react";
import Content from "../components/Content";
import Profile from "../components/Profile";
import ContentHeader from "../components/ContentHeader";
import Card from "../components/Card";
import logoImage from "/images/logo.png";
import { useProtectPage } from "../hooks/useProtectPage";
import useFetchAll from "@/hooks/useFetchAll";

import { BarChart } from "@mui/x-charts/BarChart";

function DashboardHome() {
  const { userData } = useProtectPage();
  const { data: dataInfo } = useFetchAll("/api/categories/bookings/");
  const dataSet = {};
  // console.log(data);
  let url1 = "";
  let url2 = "";

  url1 = `/api/bookings/date/print/`;
  const { data: bookings } = useFetchAll(url1);

  url2 = `/api/bookings/date/print/?status=2`;
  const { data: statusList } = useFetchAll(url2);

  const listServiceBookings = (arr) => {
    const new_array = [];
    for (let j = 0; j < arr.length; j++) {
      new_array.push(arr[j]["service_bookings"].length);
    }
    return new_array;
  };
  for (let index = 0; index < dataInfo.length; index++) {
    const category = dataInfo[index]["name"];
    const service = dataInfo[index]["services"];
    dataSet[category] = {
      amount: dataInfo[index]["amount_bookings"],
      nbr: dataInfo[index]["nbr_bookings"],
      service_nbrs: listServiceBookings(service),
    };
  }
  console.log(dataSet);
  let keys = [];
  let valuesObj = {};

  for (const [key, value] of Object.entries(dataSet)) {
    if (value["nbr"] > 0) {
      keys.push(key);
      for (let index = 0; index < value["service_nbrs"].length; index++) {
        const element = value["service_nbrs"][index];
        if (index in valuesObj) {
          valuesObj[index] = {
            data: [...valuesObj[index]["data"], Number(element)],
          };
        } else {
          valuesObj[index] = { data: [Number(element)] };
        }
      }
    }

    console.log(`${key} = ${value["service_nbrs"]}`);
  }
  // manupilating
  return (
    <div className="dashboard-home--content">
      <ContentHeader />
      <div className="content--dashboard">
        <div className="side-graph">
          <Card
            data={dataSet}
            bookings={bookings.length ? bookings : []}
            statusL={statusList.length ? statusList : []}
          />
          <div className="graph">
            <BarChart
              xAxis={[{ scaleType: "band", data: keys }]}
              series={Object.values(valuesObj)}
              width={680}
              height={350}
            />
          </div>
        </div>
        <Profile />
      </div>
    </div>
  );
}

export default DashboardHome;
