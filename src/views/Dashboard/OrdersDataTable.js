/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Form, Button } from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import { dateSortFunc, numberFormatterwithoutFraction } from "../../utils";
import moment from "moment-timezone";
import Spinner from "../../components/Spinner";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";

const OrdersDataTable = ({ fetchSlipOrderRequest, slipOrders, isFetching }) => {
  let now = new Date();
  let local = {
    format: "MM/DD/YYYY",
    sundayFirst: false
  };
  const [startOnLoad, setStartOnLoad] = useState(true);

  const [showSlippedOrders, setShowSlippedOrders] = useState(false);

  const [start, setStart] = useState(
    moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    )
  );
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  );
  const [onloadStart, setOnloadStart] = useState(
    moment(start).subtract(29, "days")
  );
  let ranges = {
    Today: [moment(start), moment(end)],
    "Yesterday Only": [
      moment(start).subtract(1, "days"),
      moment(end).subtract(1, "days")
    ],
    "7 Days": [moment(start).subtract(6, "days"), moment(end)],
    "30 Days": [moment(start).subtract(29, "days"), moment(end)],
    "This Month": [moment(start).startOf("month"), moment(end).endOf("month")],
    "Last Month": [
      moment()
        .subtract(1, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .endOf("month")
    ],
    Year: [moment(start).subtract(1, "years"), moment(end)]
  };

  useEffect(() => {
    // fetchSlipOrderRequest({
    //   startDate: moment(start)
    //     .subtract(29, "days")
    //     .format("YYYY-MM-DD HH:mm:ss"),
    //   endDate: moment(end).format("YYYY-MM-DD HH:mm:ss")
    // })
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
    withFirstAndLast: true //> Hide the going to First and Last page button
    // defaultSortName: "eventDate", // default sort column name
    // defaultSortOrder: "desc" // default sort order
  };

  const urlFormatter = (cell, row) => {
    return (
      <a href={row.invoiceIdUrl} target="_blank">
        {row.invoiceId}
      </a>
    );
  };

  const detailsFormatter = (cell, row) => {
    return (
      <div>
        <span>{row.eventName}</span>
        <br />
        <span>{row.eventDate}</span>
      </div>
    );
  };

  const newUrlFormatter = (cell, row) => {
    var ticketMasterUrl = "https://www.ticketmaster.com/event/" + row.tmEventId;
    return (
      <a href={ticketMasterUrl} target="_blank">
        {row.tmEventId}
      </a>
    );
  };

  const sectionFormatter = (cell, row) => {
    return (
      <div>
        <span>
          <b>Section:</b> {`${row.section || ""}`}{" "}
        </span>
        <br />
        <span>
          <b>Row:</b> {`${row.row}`}{" "}
        </span>
        <br />
        <span>
          <b>Quantity:</b> {`${row.quantity}`}{" "}
        </span>
        <br />
        <span>
          <b>Final Cost:</b>{" "}
          {row.unitCostAverage
            ? numberFormatterwithoutFraction(row.unitCostAverage)
            : ""}
        </span>
      </div>
    );
  };

  const applyCallback = (startDate, endDate) => {
    setStart(startDate);
    setEnd(endDate);
    fetchSlipOrderRequest({
      startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(endDate).format("YYYY-MM-DD HH:mm:ss")
    });
    setStartOnLoad(false);
  };
  const isExpandRow = () => {
    return true;
  };

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>External Ref.</label>{" "}
          <span className="row_val"> {`${row.invoiceExternalRef || ""}`} </span>
        </div>
        {/* <div className="expand_row_inner">
          <label>Final Price</label>{" "}
          <span className="row_val"> {`${row.unitCostAverage || ""}`} </span>
        </div>
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
        </div> */}
        <div className="expand_row_inner">
          <label>Notes</label>{" "}
          <span className="row_val"> {`${row.notes}`} </span>
        </div>
      </div>
    );
  };
  return (
    <div className="animated">
      {showSlippedOrders === false ? (
        <div className="btn-group mrgbtm20">
          <Button
            onClick={() => {
              setShowSlippedOrders(true);
              fetchSlipOrderRequest({
                startDate: moment(start)
                  .subtract(29, "days")
                  .format("YYYY-MM-DD HH:mm:ss"),
                endDate: moment(end).format("YYYY-MM-DD HH:mm:ss")
              });
            }}
          >
            Click here to show slipped orders
          </Button>
        </div>
      ) : (
        <div>
          <div className="fl_eq_box slip_rangeCls">
            <div className="date_picker dateCls">
              <DateTimeRangeContainer
                ranges={ranges}
                start={startOnLoad ? onloadStart : start}
                end={end}
                local={local}
                // maxDate={maxDate}
                applyCallback={applyCallback}
              >
                <Form.Control
                  readOnly
                  id="formControlsTextB"
                  type="text"
                  label="Text"
                  value={
                    startOnLoad
                      ? moment(start)
                          .subtract(29, "days")
                          .format("MM/DD/YYYY") +
                        " To " +
                        moment(end).format("MM/DD/YYYY")
                      : moment(start).format("MM/DD/YYYY") +
                        " To " +
                        moment(end).format("MM/DD/YYYY")
                  }
                  placeholder="Search...."
                />
              </DateTimeRangeContainer>
            </div>
          </div>
          {isFetching ? (
            <Spinner spinnerTime={false} />
          ) : (
            <BootstrapTable
              data={
                slipOrders.length !== 0 ? Object.values(slipOrders.dict) : []
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
                width="15%"
                isKey
                dataFormat={urlFormatter}
              >
                InvoiceID
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="eventId"
                dataFormat={newUrlFormatter}
              >
                EventId
              </TableHeaderColumn>
              <TableHeaderColumn
                dataFormat={detailsFormatter}
                dataField="eventDetails"
              >
                Event Details
              </TableHeaderColumn>
              <TableHeaderColumn dataFormat={sectionFormatter}>
                Ticket Details
              </TableHeaderColumn>
            </BootstrapTable>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersDataTable;
