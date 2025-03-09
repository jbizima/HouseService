import React from "react";
import picture from "/images/download (1).jpeg";
import Button from "../components/ui/Button";
import loaderPicture from "/images/loading-3.gif";
import { addComma } from "@/utils/addComma.mjs";
import { useNavigate } from "react-router-dom";

function ServicesList({ data, isLoading, category_name, category_id }) {
  const navigate = useNavigate();
  return (
    <div className="services-list">
      <div className="services--header">
        <span>
          {category_name ? category_name : "All services"} ({data.length}):
        </span>
      </div>
      <div className="services--list">
        {isLoading && (
          <div className="loader--category">
            <img src={loaderPicture} width={100} height={100} />
          </div>
        )}
        {data.length > 0 ? (
          data.map((item, i) => {
            //  swing  bounceIn bouceInDown biLeft, Right1
            // bouceInUp2 fadeInDown3 fadeInDownBig1a rotateIn rotateInDownLeft1aa

            let style = {
              backgroundImage: `url(${item.service.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            };
            return (
              <div className="grid--service animated rotateInDownLeft" key={i}>
                <div className="grid-image" style={style}>
                  <div className="grid-mask"></div>
                </div>
                {/* <img src={item.image} alt="home" width={100} height={100} /> */}
                <div className="grid-service-body">
                  <div className="category-header">
                    <i className="line-grid"></i>
                    <span> {item.category_name}</span>
                    <i className="line-grid"></i>
                  </div>
                  <div className="grid-header">{item.service_name}</div>

                  <ul>
                    <li>
                      <i className="fa fa-user"></i> <span>{item.name}</span>
                      <span className="service-list--left">
                        <i className="green">{addComma(item.price)}</i>{" "}
                        rwf/session
                      </span>
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>
                      <span>{item.email}</span>
                    </li>
                    <li>
                      <i className="fa fa-location-dot"></i>
                      <span>{item.address}</span>
                    </li>
                  </ul>

                  <a
                    href={`/house-holder/service/?category_id=${item.category}&category_name=${item.category_name}&worker_id=${item.id}&service_id=${item.service.id}`}
                    className="btn-grid"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ color: "red", textAlign: "center" }}>
            No services for the {category_name ? category_name : "moment"}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesList;
