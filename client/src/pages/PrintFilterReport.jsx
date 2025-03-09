import React, { useRef } from "react";
import FlashMessage from "../components/ui/FlashMessage";
import useFetchAll from "../hooks/useFetchAll";
import loaderPicture from "/images/loading-3.gif";
import BookingReportTable from "@/components/BookingReportTable";
import { useReactToPrint } from "react-to-print";

function PrintFilterReports() {
  const queryParams = new URLSearchParams(window.location.search);
  const fromDate = queryParams.get("fromDate");
  const toDate = queryParams.get("toDate");
  const search = queryParams.get("search");

  const { data, isLoading, message, clearMessage } = useFetchAll(
    `/api/bookings/date/print/?from_date=${fromDate}&to_date=${toDate}&search=${search}`
  );
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="dashboard--content category reports">
      <div className="" style={{ display: "flex", justifyContent: "flex-end" }}>
        <i
          className="btn-icon fa fa-print report-icon"
          onClick={reactToPrintFn}
        ></i>
      </div>
      <div className="dashboard--content category reports" ref={contentRef}>
        <div className="header--content">
          <span>Generate a filtering report</span>
        </div>
        <div className="view-category-header">
          <div className="">
            Date:{" "}
            <span style={{ fontWeight: "bold", fontSize: "12px" }}>
              {fromDate} - {toDate}
            </span>{" "}
            with a key word{" "}
            <span style={{ fontWeight: "bold", fontSize: "12px" }}>
              {search}
            </span>
          </div>
        </div>
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
        <BookingReportTable bookings={data} />
        {isLoading && (
          <div className="loader">
            <img src={loaderPicture} width={100} height={100} />
          </div>
        )}
      </div>
    </div>
  );
}

export default PrintFilterReports;
