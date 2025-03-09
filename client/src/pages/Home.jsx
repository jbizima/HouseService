import ServicesListHome from "@/components/ServiceListHome";
import React, { useState } from "react";
import HomePageNav from "../components/HomePageNav";
import HomeText from "../components/HomeText";
import ServiceCategory from "../components/ServiceCategory";
import ServicesList from "../components/ServicesList";
import useFetchAll from "../hooks/useFetchAll";
import useFetchAllTwo from "../hooks/useFetchAllTwo";

function Home() {
  const { data, isLoading, message, clearMessage } = useFetchAll(
    "/api/categories/no_pagination/"
  );
  const [categoryId, setCategoryId] = useState({ id: null, name: null });
  let url = "";
  if (categoryId.id) {
    url = `/api/workers/filter/?category=${categoryId.id}`;
  } else {
    url = `/api/workers/no_pagination/`;
  }
  const {
    data: serviceData,
    isLoading: serviceIsLoading,
    message: serviceMessage,
    clearMessage: serviceClearMessage,
  } = useFetchAll(url);

  const [isClicked, setIsClicked] = useState({ id: null, status: false });

  const handleClicked = (id, name) => {
    setIsClicked({ id: id, status: true });
    setCategoryId({ id: id, name: name });
  };
  return (
    <div className="app-container">
      <div className="intro">
        <div className="mask">
          <HomePageNav />
          <HomeText />
        </div>
      </div>
      <ServiceCategory
        data={data}
        isLoading={isLoading}
        message={message}
        clearMessage={clearMessage}
        handleClicked={handleClicked}
        isClicked={isClicked}
      />
      <ServicesListHome
        data={serviceData}
        isLoading={serviceIsLoading}
        category_name={categoryId.name}
        category_id={categoryId.id}
      />
    </div>
  );
}

export default Home;
