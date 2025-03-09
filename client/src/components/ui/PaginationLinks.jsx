import React from "react";
import { Link } from "react-router-dom";

function PaginationLinks({ count, next, previous, setPage, page }) {
  let rowsOnPage = 8;
  let nbr_links = Math.ceil(count / rowsOnPage);
  const linksArray = [];
  let nbrLink = 1;
  while (nbr_links > 0) {
    linksArray.push(nbrLink);
    nbrLink++;
    nbr_links--;
  }
  // to previous when page=2 to make previous 1
  if (previous) {
    if (previous.length > 2) {
      previous = 1;
    }
  }

  return (
    <div className="pagination--links">
      <div className="card-links--text">Pages:</div>
      <div className="card-links">
        {previous != null ? (
          <div
            className="card-link outsiders-links"
            onClick={() => setPage(previous)}
          >
            <i className="fa fa-angles-left"></i>
          </div>
        ) : (
          <div className="card-link outsiders-links no-link">
            <i className="fa fa-angles-left"></i>
          </div>
        )}

        {linksArray.map((pageNumber, i) => {
          return (
            <div
              className={page == pageNumber ? "card-link current" : "card-link"}
              key={i}
              onClick={() => setPage(pageNumber)}
            >
              <span className="link-text">{pageNumber}</span>
            </div>
          );
        })}
        {next != null ? (
          <div
            className="card-link outsiders-links"
            onClick={() => setPage(next)}
          >
            <i className="fa fa-angles-right" onClick={() => setPage(next)}></i>
          </div>
        ) : (
          <div className="card-link outsiders-links no-link ">
            <i className="fa fa-angles-right"></i>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaginationLinks;
