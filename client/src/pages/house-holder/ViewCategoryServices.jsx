import React, { useState } from "react";
import useFetchAll from "@/hooks/useFetchAll";
import { useParams, Navigate } from "react-router-dom";
import ServiceCategory from "@/components/house-holder/ServiceCategoryH";
import ServicesList from "@/components/ServicesList";

function ViewCategoryServices() {
  const params = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const accessId = queryParams.get("id");
  const accessName = queryParams.get("name");
  if (!accessId) {
    return <Navigate to="/house-holder/" replace />;
  }
  const { data, isLoading, message, clearMessage } = useFetchAll(
    "/api/categories/no_pagination/"
  );
  const [categoryId, setCategoryId] = useState({ id: accessId });
  let url = `/api/workers/filter/?category=${accessId}`;
  const {
    data: serviceData,
    isLoading: serviceIsLoading,
    message: serviceMessage,
    clearMessage: serviceClearMessage,
  } = useFetchAll(url);

  return (
    <div className="house-content">
      <ServiceCategory
        data={data}
        isLoading={isLoading}
        message={message}
        clearMessage={clearMessage}
        category_id={accessId}
      />
      <ServicesList
        data={serviceData}
        isLoading={serviceIsLoading}
        category_name={accessName}
        category_id={accessId}
      />
    </div>
  );
}

export default ViewCategoryServices;
