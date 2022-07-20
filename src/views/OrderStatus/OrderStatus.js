/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// import { dateSortFuncForEvent } from "../../utils"
import "bootstrap-daterangepicker/daterangepicker.css";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import Spinner from "../../components/Spinner";
import moment from "moment-timezone";

import Accordion from "react-bootstrap/Accordion";
import { numberFormatterwithoutFraction } from "../../utils";

function remote(remoteObj) {
  // it means that only pagination you will handle by your own
  remoteObj.pagination = true;
  return remoteObj;
}
const OrderStatus = ({
  fetchOrderStatusRequest,
  orderStatuslistings,
  isFetching
}) => {
  // const refOrderStatus = useRef(null)
  const refEventDate = useRef(null);
  const refEventDate1 = useRef(null);
  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [spinnerTime, setSpinnerTime] = useState(false);
  const [statusType, setStatus] = useState("Sold");
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [sizePerPage, setSizePerPage] = useState(20);
  const [eventName, setEventName] = useState("");
  const [eventId, setEventId] = useState("");
  const [invoiceId, setInvoicedId] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  let now = new Date();
  let local = {
    format: "MM/DD/YYYY",
    sundayFirst: false
  };
  // eslint-disable-next-line no-unused-vars
  const [start, setStart] = useState(
    moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    )
  );
  // eslint-disable-next-line no-unused-vars
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  );
  let ranges = {
    Today: [moment(), moment()],
    "Yesterday Only": [
      moment().subtract(1, "days"),
      moment().subtract(1, "days")
    ],
    "7 Days": [moment().subtract(6, "days"), moment()],
    "30 Days": [moment().subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment()
        .subtract(1, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .endOf("month")
    ],
    Year: [moment().subtract(1, "years"), moment()]
  };

  useEffect(() => {
    var startDate = searchStartDate ? searchStartDate.format("YYYY-MM-DD") : "";
    var endDate = searchEndDate ? searchEndDate.format("YYYY-MM-DD") : "";
    fetchOrderStatusRequest({
      statusType,
      eventName,
      eventId,
      invoiceId,
      eventAddress,
      startDate,
      endDate,
      page,
      sizePerPage
    });
  }, []);
  // const selectRow = {
  //   mode: "checkbox",
  //   clickToExpand: true
  // }
  // const trClassName = (row, rowIndex) => {
  //   if (!row) return ""
  //   const { problemBuying, status } = row
  //   if (status === "Rescinded") {
  //     return "red-bg-cl"
  //   }
  //   if (status === "Sold") {
  //     return "green-bg-cl"
  //   }
  //   if (status === "Tracking") {
  //     return "purple-bg-cl"
  //   }
  //   if (problemBuying === true) {
  //     return "yellow-bg-cl"
  //   }
  // }
  const newUrlFormatter = (cell, row) => {
    return (
      <a
        href={row.eventUrl !== "" ? row.eventUrl : row.ticketMasterUrl}
        target="_blank"
      >
        {row.eventId}
      </a>
    );
  };

  const invoicedUrlFormatter = (cell, row) => {
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
        <span>{row.eventAddress}</span>
        <br />
        <span>{row.eventDate}</span>
      </div>
    );
  };

  const stepBar = (cell, row) => {
    var activeStep = "";
    var status = "";
    if (row.readyToBuy) {
      activeStep = "1st";
      status = "Ready To Buy";
    }
    if (row.purchaseSuccessStatus) {
      activeStep = "2nd";
      status = "Ticket Purchased";
    }
    if (row.pdfTransferred) {
      activeStep = "3rd";
      status = "PO Attached To Invoice";
    }
    if (row.fulfillmentCompleted) {
      activeStep = "4th";
      status = "Order Fullfiled";
    }
    if (
      (row.readyToBuy ||
        row.purchaseSuccessStatus ||
        row.pdfTransferred ||
        row.fulfillmentCompleted) === undefined
    )
      activeStep = "NA";
    return (
      <div>
        {activeStep}
        <br />
        {status}
        <br />
      </div>
    );
  };

  const sectionFormatter = (cell, row) => {
    return (
      <div>
        <span>
          <b>Seat:</b> {row.seat}
        </span>
        <br />
        <span>
          <b>Qty:</b> {row.quantitySold}
        </span>
        <br />
        <span>
          <b> Base Cost: </b>
          {row.baseCost ? numberFormatterwithoutFraction(row.baseCost) : ""}
        </span>
        <br />
        <span>
          <b>Final Cost: </b>
          {row.unitCost ? numberFormatterwithoutFraction(row.unitCost) : ""}
        </span>
        <br />
        <span>
          <b>Sale Time:</b>
          {`${row.saleTime}`}{" "}
        </span>
      </div>
    );
  };

  // const isExpandRow = () => {
  //   return true
  // }

  // const expandRow = row => {
  //   return (
  //     <div className="expand_row_main">
  //       <div className="expand_row_inner">
  //         <label>External Reference</label>{" "}
  //         <span className="row_val"> {`${row.externalReference || ""}`} </span>
  //       </div>
  //       <div className="expand_row_inner">
  //         <label>Sale Time</label>{" "}
  //         <span className="row_val"> {`${row.saleTime}`} </span>
  //       </div>
  //       {/* <div className="expand_row_inner">
  //         <label>InvoiceId</label>{" "}
  //         <span className="row_val">
  //           <a href={row.invoiceIdUrl} target="_blank">
  //             {row.invoiceId}
  //           </a>
  //         </span>
  //       </div> */}
  //     </div>
  //   )
  // }

  const noDataHandler = () => {
    if (isFetching) return <Spinner />;
    else return "No Data Found To Display";
  };

  const handlePageChange = (page, sizePerPage) => {
    var startDate = searchStartDate ? searchStartDate.format("YYYY-MM-DD") : "";
    var endDate = searchEndDate ? searchEndDate.format("YYYY-MM-DD") : "";
    fetchOrderStatusRequest({
      statusType,
      eventId,
      invoiceId,
      eventName,
      eventAddress,
      startDate,
      endDate,
      page,
      sizePerPage
    });
  };

  const options = {
    page:
      Object.values(orderStatuslistings).length !== 0
        ? orderStatuslistings[0].page
        : 1,

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
    noDataText: noDataHandler(),
    onPageChange: handlePageChange
  };

  const applyCallback = (startDate, endDate) => {
    // setStart(startDate)
    // setEnd(endDate)
    setSearchStartDate(startDate);
    setSearchEndDate(endDate);
  };

  const handlerClickCleanFiltered = () => {
    // var startDate = searchStartDate ? searchStartDate.format("YYYY-MM-DD") : ""
    // var endDate = searchEndDate ? searchEndDate.format("YYYY-MM-DD") : ""
    var startDate = "";
    var endDate = "";
    var statusType = "Sold";
    var eventId = "";
    var invoiceId = "";
    var eventName = "";
    var eventAddress = "";
    fetchOrderStatusRequest({
      statusType,
      eventId,
      invoiceId,
      eventName,
      eventAddress,
      startDate,
      endDate,
      page,
      sizePerPage
    });
  };

  return (
    <div className="animated">
      <div className="full_width">
        <div className="page_name">
          <h2>Order History Info</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12">
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>Order History</h2>
                  </div>

                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main order_tbl_main nw_od_cls">
                      <div className="inner_tbl">
                        <div className="table_head acc_main">
                          <div className="filterCV">
                            <Accordion>
                              <Card>
                                <Accordion.Toggle
                                  className="cm_ttl"
                                  as={Card.Header}
                                  eventKey="0"
                                  // onClick={setToggleValue("collapse")}
                                >
                                  <h2>Filter Options</h2>
                                </Accordion.Toggle>

                                <Accordion.Collapse
                                  //className={toggleClass}
                                  eventKey="0"
                                >
                                  <div className="select_eq filter_filed">
                                    <div className="fl_eq_box">
                                      <label className="searchHead">
                                        Start & End Date
                                      </label>
                                      <div className="date_picker dateCls">
                                        <DateTimeRangeContainer
                                          ranges={ranges}
                                          start={start}
                                          end={end}
                                          local={local}
                                          // maxDate={maxDate}
                                          applyCallback={applyCallback}
                                        >
                                          <div className="input-group">
                                            <Form.Control
                                              id="formControlsTextB"
                                              type="text"
                                              label="Text"
                                              value={
                                                searchStartDate &&
                                                searchEndDate !== undefined
                                                  ? searchStartDate.format(
                                                      "MM/DD/YYYY"
                                                    ) +
                                                    " to " +
                                                    searchEndDate.format(
                                                      "MM/DD/YYYY"
                                                    )
                                                  : "Enter Start Date - End Date"
                                              }
                                              placeholder="Search...."
                                            />
                                            <span className="input-group-btn">
                                              <Button className="default date-range-toggle">
                                                <i className="fa fa-calendar" />
                                              </Button>
                                            </span>
                                          </div>
                                        </DateTimeRangeContainer>
                                      </div>
                                    </div>
                                    <div className="fl_eq_box">
                                      <label className="searchHead">
                                        Event Name
                                      </label>
                                      <Form.Control
                                        className="search_icon"
                                        type="text"
                                        value={eventName}
                                        placeholder="Search..."
                                        onChange={evt =>
                                          setEventName(evt.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="fl_eq_box">
                                      <label className="searchHead">
                                        Event Id
                                      </label>
                                      <Form.Control
                                        className="search_icon"
                                        type="text"
                                        value={eventId}
                                        placeholder="Search..."
                                        onChange={evt =>
                                          setEventId(evt.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="fl_eq_box">
                                      <label className="searchHead">
                                        Event Address
                                      </label>
                                      <Form.Control
                                        className="search_icon"
                                        type="text"
                                        value={eventAddress}
                                        placeholder="Search..."
                                        onChange={evt =>
                                          setEventAddress(evt.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="fl_eq_box">
                                      <label className="searchHead">
                                        Invoiced Id
                                      </label>
                                      <Form.Control
                                        className="search_icon"
                                        type="text"
                                        value={invoiceId}
                                        placeholder="Search..."
                                        onChange={evt =>
                                          setInvoicedId(evt.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="fl_eq_box">
                                      <label className="searchHead">
                                        Status
                                      </label>
                                      <Form.Control
                                        // className="search_icon"
                                        as="select"
                                        value={statusType}
                                        onChange={evt => {
                                          setStatus(evt.target.value);
                                          // handleInputChange(evt.target.value)
                                        }}
                                      >
                                        <option value="Sold">
                                          {" "}
                                          Sold Order{" "}
                                        </option>
                                        <option value="Rescinded">
                                          {" "}
                                          Cancel Order{" "}
                                        </option>
                                        <option value="Problematic">
                                          Problematic Order
                                        </option>
                                        {/* <option value="Tracking"> Tracking Order </option> */}
                                      </Form.Control>
                                    </div>
                                    <div className="fl_eq_box src_btn">
                                      <label className="searchHead">
                                        &nbsp;
                                      </label>
                                      <div className="fl_w">
                                        <Button
                                          color="primary"
                                          className="btn-pill"
                                          onClick={() => {
                                            var startDate = searchStartDate
                                              ? searchStartDate.format(
                                                  "YYYY-MM-DD"
                                                )
                                              : "";
                                            var endDate = searchEndDate
                                              ? searchEndDate.format(
                                                  "YYYY-MM-DD"
                                                )
                                              : "";
                                            fetchOrderStatusRequest({
                                              statusType,
                                              eventId,
                                              invoiceId,
                                              eventName,
                                              eventAddress,
                                              startDate,
                                              endDate,
                                              page,
                                              sizePerPage
                                            });
                                          }}
                                        >
                                          Search
                                        </Button>
                                        <button
                                          color="primary"
                                          type="button"
                                          className="btn-pill btn btn-primary clr_fil red_txt"
                                          onClick={() => {
                                            setSearchStartDate("");
                                            setSearchEndDate("");
                                            setStatus("Sold");
                                            setEventName("");
                                            setEventId("");
                                            setInvoicedId("");
                                            setEventAddress("");
                                            handlerClickCleanFiltered();
                                          }}
                                        >
                                          <i className="fa fa-times"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                          </div>
                        </div>

                        <div className="tbl_main date_tbl">
                          <div className="inner_tbl">
                            {isFetching ? (
                              // <div>
                              <Spinner spinnerTime={spinnerTime} />
                            ) : (
                              // </div>
                              <BootstrapTable
                                data={Object.values(orderStatuslistings)}
                                version="4"
                                striped
                                hover
                                pagination
                                options={options}
                                // trClassName={trClassName}
                                //  selectRow={selectRow}
                                //  expandableRow={isExpandRow}
                                // expandComponent={expandRow}
                                // expandColumnOptions={{
                                //   expandColumnVisible: true
                                // }}
                                //  search
                                fetchInfo={{
                                  dataTotalSize:
                                    Object.values(orderStatuslistings)
                                      .length !== 0
                                      ? orderStatuslistings[0].totalRow
                                      : ""
                                }}
                                remote={remote}
                              >
                                <TableHeaderColumn
                                  dataField="listingId"
                                  isKey
                                  hidden
                                >
                                  ID
                                </TableHeaderColumn>
                                {/* <TableHeaderColumn
                          dataField="filter"
                          ref={refOrderStatus}
                          width="50%"
                          filterFormatted
                          dataFormat={enumFormatter}
                          formatExtraData={qualityType}
                          filter={{
                            type: "SelectFilter",
                            options: qualityType,
                            delay: 1000
                          }}
                          hidden
                        >
                          orderStatus
                        </TableHeaderColumn> */}
                                <TableHeaderColumn
                                  dataField="eventDate"
                                  ref={refEventDate}
                                  // width="50%"
                                  filter={{
                                    type: "DateFilter"
                                  }}
                                  hidden
                                >
                                  eventDate
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="eventDate1"
                                  ref={refEventDate1}
                                  // width="50%"
                                  filter={{
                                    type: "DateFilter"
                                  }}
                                  hidden
                                >
                                  eventDate
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  // width="50%"
                                  dataField="eventId"
                                  dataFormat={newUrlFormatter}
                                  expandable={false}
                                >
                                  EventID
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="invoiceId"
                                  dataFormat={invoicedUrlFormatter}
                                >
                                  InvoiceId
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataFormat={detailsFormatter}
                                  expandable={false}
                                  dataField="eventDetails"
                                  // sort={"asc"}
                                  // width="50%"
                                  // dataSort
                                  //sortFunc={dateSortFuncForEvent}
                                >
                                  Event Details
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  // width="50%"
                                  dataFormat={sectionFormatter}
                                  expandable={false}
                                >
                                  Ticket Details
                                </TableHeaderColumn>

                                <TableHeaderColumn
                                  // width="50%"
                                  // dataField="status"
                                  dataFormat={stepBar}
                                  dataAlign="center"
                                  expandable={false}
                                >
                                  Order Details
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="eventName" hidden>
                                  EventName
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="eventAddress"
                                  hidden
                                >
                                  Venue
                                </TableHeaderColumn>

                                {/* {actions && actions()} */}
                              </BootstrapTable>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
