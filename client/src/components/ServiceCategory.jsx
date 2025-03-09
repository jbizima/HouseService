import React, { useState } from "react";
import loaderPicture from "/images/loading-3.gif";
import useFetchAll from "../hooks/useFetchAll";
import FlashMessage from "./ui/FlashMessage";

function ServiceCategory({
  data,
  isLoading,
  message,
  clearMessage,
  handleClicked,
  isClicked,
}) {
  return (
    <div className="service-category" style={{ marginTop: "1%" }}>
      <div className="category-header">
        <i className="line"></i>
        <h3 className="category-h3">Service Category</h3>
        <i className="line"></i>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
      </div>
      <div className="category-section">
        {isLoading && (
          <div className="loader--category">
            <img src={loaderPicture} width={100} height={100} />
          </div>
        )}

        <div className="category-list">
          {data.length > 0 &&
            data.map((item, i) => {
              let style = {
                backgroundImage: `url(${item.images[0].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              };
              return (
                <div
                  className={
                    isClicked.id == item.id && isClicked.status
                      ? "grid active"
                      : "grid"
                  }
                  onClick={() => handleClicked(item.id, item.name)}
                  key={i}
                >
                  <div className="cate-image" style={style}>
                    <div className="cate-mask"></div>
                  </div>
                  {/* <img
                    src={item.images[0].image}
                    alt={`photo${i}`}
                    width={100}
                    height={100}
                  /> */}
                  <span className="cate--text">{item.name}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ServiceCategory;
