import React from "react";
import ContentHeader from "../components/ContentHeader";
import InputField from "../components/ui/InputField";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import CategoyTable from "../components/CategoryTable";
import FlashMessage from "../components/ui/FlashMessage";
import useFetchPagination from "../hooks/useFetchPagination";
import PaginationLinks from "../components/ui/PaginationLinks";
import loaderPicture from "/images/loading-3.gif";
import EditCategoryModal from "../components/EditCategoryModal";
import DeleteCategoryModal from "../components/DeleteCategoryModal";
import PhotosModal from "../components/PhotosModal";
export const categoryContext = createContext();
function ViewCategory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  let url = "";
  if (search) {
    url = `/api/categories/?search=${search}&page=${page}`;
  } else {
    url = `/api/categories/?page=${page}`;
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
  } = useFetchPagination(url, reload);

  // handle modals
  const [animation, setAnimation] = useState("animated fadeIn");
  const [clickedRow, setClickedRow] = useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openPhotosModal, setOpenPhotosModal] = useState(false);

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
      setAnimation(openPhotosModal ? "animated fadeOut" : "animated fadeIn");
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
            type="search"
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
          onClick={() => navigate("/dashboard/add-category")}
        ></i>
      </div>
      {message && (
        <FlashMessage
          message={message.message}
          isSuccess={message.success}
          clearMessage={clearMessage}
        />
      )}
      <CategoyTable
        categories={data}
        openEditModal={handleModal}
        openDeleteModal={handleModal}
        openPhotosModal={handleModal}
      />
      {isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}
      <categoryContext.Provider value={{ setData, setIsLoading, setMessage }}>
        {openEditModal && (
          <EditCategoryModal
            allCategories={data}
            categoryIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
          />
        )}
      </categoryContext.Provider>

      <categoryContext.Provider value={{ setData, setIsLoading, setMessage }}>
        {openDeleteModal && (
          <DeleteCategoryModal
            allCategories={data}
            categoryIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
          />
        )}
      </categoryContext.Provider>

      <categoryContext.Provider
        value={{ setData, setIsLoading, setMessage, setReload }}
      >
        {openPhotosModal && (
          <PhotosModal
            allCategories={data}
            categoryIndex={clickedRow}
            closeModal={handleModal}
            animate={animation}
          />
        )}
      </categoryContext.Provider>
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

export default ViewCategory;
