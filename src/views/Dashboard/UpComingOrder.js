/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import { dateSortFunc } from "../../utils";
// import moment from "moment-timezone"
import Spinner from "../../components/Spinner";
// import DateTimeRangeContainer from "react-advanced-datetimerange-picker"

const UpComingOrders = ({
  fetchUpComingOrderRequest,
  upComingOrders
  // isFetching
}) => {
  const [showUpComingOrders, setShowUpComingOrders] = useState(false);

  useEffect(() => {
    // fetchUpComingOrderRequest()
  }, []);
  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: 20, // which size per page you want to locate as default
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
    defaultSortName: "eventDate", // default sort column name
    defaultSortOrder: "desc" // default sort order
  };

  const urlFormatter = (cell, row) => {
    return (
      <a href={row.invoiceIdUrl} target="_blank">
        {row.invoiceId}
      </a>
    );
  };

  const isExpandRow = () => {
    return true;
  };

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>Section</label>{" "}
          <span className="row_val"> {`${row.section || ""}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>Row</label> <span className="row_val"> {`${row.row}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>Quantity</label>{" "}
          <span className="row_val"> {`${row.quantity}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>Notes</label>{" "}
          <span className="row_val"> {`${row.notes}`} </span>
        </div>
      </div>
    );
  };

  return (
    <div className="animated">
      {showUpComingOrders === false ? (
        <div className="btn-group mrgbtm20">
          <Button
            onClick={() => {
              setShowUpComingOrders(true);
              fetchUpComingOrderRequest();
            }}
          >
            Click here to show upcoming orders
          </Button>
        </div>
      ) : (
        <div>
          {upComingOrders.length === 0 ? (
            <Spinner spinnerTime={false} />
          ) : (
            <BootstrapTable
              data={
                upComingOrders.length !== 0
                  ? Object.values(upComingOrders.dict)
                  : []
              }
              version="4"
              striped
              hover
              pagination
              expandableRow={isExpandRow}
              expandComponent={expandRow}
              expandColumnOptions={{ expandColumnVisible: true }}
              options={options}
              search
            >
              <TableHeaderColumn
                dataField="invoiceId"
                isKey
                dataFormat={urlFormatter}
              >
                InvoiceID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="eventName">
                EventName
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="eventDate"
                dataSort
                sortFunc={dateSortFunc}
              >
                EventDate
              </TableHeaderColumn>
            </BootstrapTable>
          )}
        </div>
      )}
    </div>
  );
};

export default UpComingOrders;
