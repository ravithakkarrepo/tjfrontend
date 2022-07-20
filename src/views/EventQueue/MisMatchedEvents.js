/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner";
import "bootstrap-daterangepicker/daterangepicker.css";

const cellEditProp = {
  mode: "click",
  blurToSave: true,
  afterSaveCell: (oldValue, newValue, row, column) => {
    var keys = Object.keys(oldValue); //get keys from object as an array
    keys.forEach(function(key, i) {
      //loop through keys array
      if (key === newValue) oldValue[newValue] = row;
    });
  }
};
const urlFormatter = (cell, row) => {
  return (
    <a
      href={
        row.eventUrl !== undefined &&
        row.eventUrl !== null &&
        row.eventUrl !== ""
          ? row.eventUrl
          : row.ticketMasterUrl
      }
      target="_blank"
    >
      {row.eventId}
    </a>
  );
};

const MisMatchedEvents = ({
  isFetching,
  misMatchedEventsQueue,
  totalListings,
  currentPage,
  fetchMisMatchedEventQueueRequest,
  createManagedQueueEventsRequest,
  isEventFetching,
  isLoadingFrom,
  setIsLoadingFrom
}) => {
  // eslint-disable-next-line no-unused-vars
  const [sizePerPage, setSizePerPage] = useState(20);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  const refMisMatchedEvent = useRef(null);

  const buttonFormatter = (cell, row, colIndex, column) => {
    return (
      <div className="tbl_btn bbtn_cls">
        <Button
          className="viewLog_btn"
          color="primary"
          aria-pressed="true"
          onClick={() => {
            createManagedQueueEventsRequest({
              events: {
                eventInfo: [
                  {
                    eventDate: row.eventDate,
                    eventAddress: row.eventAddress,
                    eventId: row.eventId,
                    timeZone: row.timeZone,
                    eventName: row.eventName
                  }
                ]
              }
            });
            setIsLoadingFrom("MisMatchEvent");
          }}
        >
          Match
        </Button>
      </div>
    );
  };

  useEffect(() => {
    fetchMisMatchedEventQueueRequest({
      page,
      limit: sizePerPage
    });
  }, []);

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>SkyBox VenueId</label>{" "}
          <span className="row_val">{`${row.skyboxVenueId}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>Available To Purchase</label>{" "}
          <span className="row_val">{`${row.availableToPurchase}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>Available Offer</label>{" "}
          <span className="row_val">{`${row.availableOffers}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>PreSale</label>{" "}
          <span className="row_val"> {`${row.presale}`} </span>
        </div>

        <div className="expand_row_inner">
          <label>Monitor Time</label>{" "}
          <span className="row_val"> {`${row.monitorTime}`} </span>
        </div>
      </div>
    );
  };

  const isExpandRow = () => {
    return true;
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
  };
  const onPageChange = (page, sizePerPage) => {
    fetchMisMatchedEventQueueRequest({
      page,
      limit: sizePerPage
    });
  };
  const options = {
    page: currentPage, // which page you want to show as default
    // sizePerPageList: [10,  30, 50, 60],
    sizePerPage: sizePerPage,
    pageStartIndex: 1, // where to start counting the pages
    paginationSize: 3, // the pagination bar size.
    prePage: "Prev", // Previous page button text
    nextPage: "Next", // Next page button text
    firstPage: "First", // First page button text
    lastPage: "Last", // Last page button text
    paginationShowsTotal: true, // Accept bool or function
    hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true, //> Hide the going to First and Last page button
    expandBy: "column",
    noDataText: noDataHandler(),
    onPageChange: onPageChange
  };

  function remote(remoteObj) {
    // it means that only pagination you will handle by your own
    remoteObj.pagination = true;
    remoteObj.cellEdit = false;
    return remoteObj;
  }

  return (
    <div>
      {isFetching ? (
        <Spinner spinnerTime={false} />
      ) : isEventFetching && isLoadingFrom === "MisMatchEvent" ? (
        <Spinner spinnerTime={false} />
      ) : (
        <BootstrapTable
          data={misMatchedEventsQueue}
          version="4"
          striped
          hover
          pagination
          options={options}
          expandableRow={isExpandRow}
          expandComponent={expandRow}
          fetchInfo={{ dataTotalSize: totalListings || 0 }}
          expandColumnOptions={{ expandColumnVisible: true }}
          ref={refMisMatchedEvent}
          tableHeaderClass="custom-select-header-class"
          tableBodyClass="custom-select-body-class"
          search
          blurToSave={true}
          remote={remote}
          cellEdit={cellEditProp}
        >
          <TableHeaderColumn dataField="_id" hidden>
            _id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="eventId"
            isKey
            expandable={false}
            dataFormat={urlFormatter}
            editable={false}
          >
            EventId/TM URL
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="eventName"
            expandable={false}
            editable={false}
          >
            Event
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="eventAddress"
            expandable={false}
            editable={false}
          >
            Location
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="formattedEventDate"
            dataSort
            expandable={false}
            editable={false}
            sort={"asc"}
          >
            Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="venueId"
            // dataSort
            expandable={false}
            // dataFormat={percentFormatter}
            editable={false}
          >
            tMasterVenueId
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="skyboxVenueId"
            expandable={false}
            editable={false}
          >
            skyboxVenueId
          </TableHeaderColumn>
          <TableHeaderColumn
            expandable={false}
            dataField="button"
            dataFormat={buttonFormatter}
            dataAlign="center"
            editable={false}
          >
            Action
          </TableHeaderColumn>
        </BootstrapTable>
      )}
    </div>
  );
};

export default withRouter(MisMatchedEvents);
