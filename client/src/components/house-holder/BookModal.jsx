import React, { useState, createContext } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "../ui/Button";
import useBook from "@/hooks/useBook";
import loadingImg from "/images/loading-3.gif";
import ButtonLoading from "../ui/ButtonLoading";
import FlashMessage from "../ui/FlashMessage";
import useFetchAll from "@/hooks/useFetchAll";
// for any validation I will have to retrieve book from parent then pass it here to check
// not all only for specific service we are in.
function BookModal({
  animate,
  handleCloseModal,
  client_id,
  service_id,
  worker_id,
  workers,
}) {
  // let worker_id = workers && workers[0].id;
  const closeModal = (e) => {
    if (e.target.className == `modal-house ${animate}`) {
      handleCloseModal();
    }
  };
  const timeSlot = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 AM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
  ];
  const [value, setValue] = useState(dayjs(Date.now()));
  // const [date, setDate] = useState(value.format("YYYY-MM-DD"))

  let date = value.format("YYYY-MM-DD");

  const { submitForm, message, isLoading, setForm, clearMessage } = useBook(
    service_id,
    client_id,
    worker_id,
    date
  );
  const handleDate = (valueDate) => {
    setValue(valueDate);

    setForm((oldForm) => {
      return {
        ...oldForm,
        date: valueDate.format("YYYY-MM-DD"),
      };
    });
  };

  const [clicked, setClicked] = useState({ status: false, id: null });
  const handleClicked = (index) => {
    setClicked({ status: true, id: index });
    setForm((oldForm) => {
      return {
        ...oldForm,
        time: timeSlot[index],
      };
    });
  };
  const {data:timeData} = useFetchAll(
    `/api/bookings/get/?service_id=${service_id}&date=${date}&client_id=${client_id}&worker_id=${worker_id}`
  );
  const bookedTime = timeData && timeData.time
  return (
    <div className={`modal-house ${animate}`} onClick={closeModal}>
      <div className="modal-house-contents">
        <div className="modal-header">
          <h3>Book a service </h3>
          <div className="modal-close-button" onClick={handleCloseModal}>
            <i className="fa fa-rectangle-xmark"></i>
          </div>
          <div className="message-booking">
            {message && (
              <FlashMessage
                message={message.message}
                isSuccess={message.success}
                clearMessage={clearMessage}
              />
            )}
          </div>
        </div>
        <span>Select Date and Time slot to book a service</span>
        <h5>Select Date</h5>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateCalendar", "DateCalendar"]}>
            <DemoItem>
              <DateCalendar
                value={value}
                onChange={(newValue) => handleDate(newValue)}
                sx={{ border: 1, borderColor: "black", borderRadius: 3 }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        </div>
        <h5>Select Time</h5>
        <div className="time--container">
          {timeSlot.map((item, i) => {
            let className = "time--slot";
            if (item == bookedTime) {
              className = "time--slot active";
            }
            if (clicked.status && i == clicked.id) {
              className = "time--slot clicked";
            }
            return (
              <div
                className={className}
                key={i}
                onClick={() => handleClicked(i)}
              >
                <span>{item}</span>
              </div>
            );
          })}
        </div>
        {isLoading && (
          <div className="loader--booking">
            <img src={loadingImg} width={100} height={100} />
          </div>
        )}
        <div className="buttons">
          <Button
            className="btn-danger"
            text="Cancel"
            height={30}
            width={100}
            onClick={handleCloseModal}
          />

          <Button
            className="btn-primary-book"
            text="Book"
            height={30}
            width={100}
            onClick={submitForm}
          />
        </div>
      </div>
    </div>
  );
}

export default BookModal;
