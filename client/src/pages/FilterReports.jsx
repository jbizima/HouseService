import React from "react";
import ContentHeader from "../components/ContentHeader";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../components/ui/FlashMessage";
import useFetchPagination from "../hooks/useFetchPagination";
import PaginationLinks from "../components/ui/PaginationLinks";
import loaderPicture from "/images/loading-3.gif";
import InputField from "@/components/ui/InputField";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import BookingReportTable from "@/components/BookingReportTable";

export const serviceContext = createContext();

function FilterReports() {
  const navigate = useNavigate();
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
  if (search) {
    url = `/api/bookings/date/?page=${page}&search=${search}&from_date=${dates.fromDate}&to_date=${dates.toDate}`;
  } else {
    url = `/api/bookings/date/?page=${page}&from_date=${dates.fromDate}&to_date=${dates.toDate}`;
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
      <ContentHeader />
      <div className="hr"></div>
      <div className="header--content">
        <span>Generate a Filtering Report</span>
      </div>
      <div className="view-category-header filter">
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
        <div className="search-btn">
          <InputField
            type="search"
            name="search"
            id="search"
            label="Search"
            icon="fa-solid fa-search"
            placeholder="Search ... "
            height={36}
            handleChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <i
          className="btn-icon fa fa-print report-icon"
          onClick={() =>
            navigate(
              `/dashboard/print-filterReport/?fromDate=${dates.fromDate}&toDate=${dates.toDate}&search=${search}`
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
      <BookingReportTable bookings={data} />
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

export default FilterReports;
