import React from "react";
import ContentHeaderOwner from "@/components/owner/ContentHeaderOwner";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import FlashMessage from "@/components/ui/FlashMessage";
import useFetchPagination from "@/hooks/useFetchPagination";
import PaginationLinks from "@/components/ui/PaginationLinks";
import loaderPicture from "/images/loading-3.gif";
import ServiceTable from "@/components/ServiceTable";
import Button from "@/components/ui/Button";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import BookingReportTable from "@/components/owner/BookingReportTable";
import { useProtectPage } from "@/hooks/useProtectPage";

export const serviceContext = createContext();

function AllReportsO() {
  const navigate = useNavigate();
  const { userData } = useProtectPage();
  const [search, setSearch] = useState(null);
  const [reload, setReload] = useState(false);
  const [page, setPage] = useState(1);
  let currentDate = new Date().toJSON().slice(0, 10);
  const [dates, setDates] = useState({
    fromDate: currentDate,
    toDate: currentDate,
  });

  const [value, setValue] = React.useState([
    dayjs(Date.now()),
    dayjs(Date.now()),
  ]);

  const handleDate = (valueDate) => {
    setValue(valueDate);
    let from = dates.fromDate;
    let to = dates.toDate;

    if (valueDate[0] != null) {
      from = valueDate[0].format("YYYY-MM-DD");
    }
    if (valueDate[1] != null) {
      to = valueDate[1].format("YYYY-MM-DD");
      console.log("here");
    } else {
      to = from;
    }
    if (valueDate[0] != null && valueDate[1] != null) {
      setReload((old) => !old);
      setDates((oldForm) => {
        return {
          ...oldForm,
          fromDate: from,
          toDate: to,
        };
      });
    }
  };

  let url = "";
  if (userData.worker && userData.worker.id) {
    url = `/api/bookings/date/worker/?page=${page}&from_date=${dates.fromDate}&to_date=${dates.toDate}&worker_id=${
      userData.worker && userData.worker.id
    }`;
  }

  const {
    data,
    links,
    isLoading,
    message,
    setData,
    setLinks,
    setMessage,
    setIsLoading,
    clearMessage,
  } = useFetchPagination(url, reload, search);

  return (
    <div className="dashboard--content category reports">
      <ContentHeaderOwner />
      <div className="hr"></div>
      <div className="header--content">
        <span>Generate Date Range Report</span>
      </div>
      <div className="view-category-header">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
              value={value}
              onChange={(newValue) => handleDate(newValue)}
              localeText={{ start: "From", end: "To" }}
              slotProps={{ textField: { size: "small" } }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <i
          className="btn-icon fa fa-print report-icon"
          onClick={() =>
            navigate(
              `/owner/print-allReport/?fromDate=${dates.fromDate}&toDate=${dates.toDate}&worker_id=${userData.worker && userData.worker.id}`
            )
          }
        ></i>
      </div>
      {message && (
        <FlashMessage
          message={message.message}
          isSuccess={message.success}
          clearMessage={clearMessage}
        />
      )}
      <BookingReportTable bookings={data ? data : []} />
      {isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}

      <PaginationLinks
        count={links.count}
        next={links.next}
        previous={links.previous}
        setPage={setPage}
        page={page}
      />
    </div>
  );
}

export default AllReportsO;
