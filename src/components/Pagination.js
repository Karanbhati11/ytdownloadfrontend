import React, { useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import AudioPlayer1 from "react-h5-audio-player";

export default function Pagination({ items, itemsPerPage }) {
  const PER_PAGE = itemsPerPage;

  const [currentPage, setCurrentPage] = useState(0);
  const player = useRef();

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  const currentPageData = items
    .slice(offset, offset + PER_PAGE)
    .map(({ ImageUrl, AudioUrl }) => (
      <div
        key={Math.random() * 89898}
        className="card"
        style={{
          width: "22rem",
          display: "flex",
          margin: "20px",
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          className={`card-img-top mycardinfo `}
          src={ImageUrl}
          alt="Thumbnail"
          style={{ alignSelf: "center" }}
        />
        <div className="card-body">
          <AudioPlayer1
            src={AudioUrl}
            className="adio"
            // other props here
            ref={player}
          />
        </div>
      </div>
    ));

  const pageCount = Math.ceil(items.length / PER_PAGE);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {currentPageData}
        </div>
        <div>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            disabledClassName={"pagination__link--disabled"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
