import React from "react";
import ContentHeader from "../components/ContentHeader";
import InputField from "../components/ui/InputField";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import FlashMessage from "../components/ui/FlashMessage";
import useFetchPagination from "../hooks/useFetchPagination";
import PaginationLinks from "../components/ui/PaginationLinks";
import loaderPicture from "/images/loading-3.gif";
import EditWorkerModal from "../components/EditWorkerModal";
import DeleteWorkerModal from "../components/DeleteWorkerModal";
import PhotoModal from "../components/PhotoModal";
import WorkerTable from "../components/WorkerTable";

export const workerContext = createContext();

function WorkerReports() {
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  let url = "";
  if (search) {
    url = `/api/workers/?search=${search}&page=${page}`;
  } else {
    url = `/api/workers/?page=${page}`;
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

  // handle modals
  const [animation, setAnimation] = useState("animated fadeIn");
  const [clickedRow, setClickedRow] = useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPhotoModal, setOpenPhotosModal] = useState(false);

  const handleModal = (index, typeOfModal) => {
    // get the targeted item id
    setClickedRow(index);

    if (typeOfModal == "edit") {
      setAnimation(openEditModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenEditModal((oldModalState) => !oldModalState);
      }, 1000);
    } else if (typeOfModal == "delete") {
      setAnimation(openDeleteModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenDeleteModal((oldModalState) => !oldModalState);
      }, 1000);
    } else {
      setAnimation(openPhotoModal ? "animated fadeOut" : "animated fadeIn");
      setTimeout(() => {
        setOpenPhotosModal((oldModalState) => !oldModalState);
      }, 1000);
    }
  };

  return (
    <div className="dashboard--content category">
      <ContentHeader />
      <div className="hr"></div>
      <div className="header--content">
        <span>List Service Category</span>
      </div>
      <div className="view-category-header">
        <div className="search-btn">
          <InputField
            type="text"
            name="search"
            id="search"
            label="Search"
            icon="fa-solid fa-search"
            placeholder="Search ... "
            handleChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <i
          className="btn-icon fa fa-plus"
          onClick={() => navigate("/dashboard/add-worker")}
        ></i>
      </div>
      {message && (
        <FlashMessage
          message={message.message}
          isSuccess={message.success}
          clearMessage={clearMessage}
        />
      )}
      <WorkerTable
        workers={data}
        openEditModal={handleModal}
        openDeleteModal={handleModal}
        openPhotoModal={handleModal}
        page="reports"
      />
      {isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
      <workerContext.Provider
        value={{ setData, setIsLoading, setMessage, setReload }}
      >
        {openEditModal && (
          <EditWorkerModal
            allWorkers={data}
            workerIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
          />
        )}
      </workerContext.Provider>

      <workerContext.Provider value={{ setData, setIsLoading, setMessage }}>
        {openDeleteModal && (
          <DeleteWorkerModal
            allWorkers={data}
            workerIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
          />
        )}
      </workerContext.Provider>

      <workerContext.Provider
        value={{ setData, setIsLoading, setMessage, setReload }}
      >
        {openPhotoModal && (
          <PhotoModal
            allItems={data}
            itemIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
            pageName="worker"
          />
        )}
      </workerContext.Provider>
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

export default WorkerReports;
