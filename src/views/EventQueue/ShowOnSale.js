/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useRef } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Accordion from "react-bootstrap/Accordion";
import { Button, Form, Card } from "react-bootstrap";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment-timezone";
import useStateRef from "react-usestateref";
import "bootstrap-daterangepicker/daterangepicker.css";

//import DatetimeRangePicker from "react-bootstrap-daterangepicker"
// import DateTimeRangeContainer from "react-advanced-datetimerange-picker"
// import ReactAutocomplete from "react-autocomplete"
// import moment from "moment-timezone"
// import { getDatesRange } from "../../utils/validation"
// const selectRow = {
//   mode: "checkbox",
//   clickToExpand: true,
//   customComponent: CustomMultiSelectTable
// }

// const cellEditProp = {
//   mode: "click",
//   blurToSave: true,
//   afterSaveCell: (oldValue, newValue, row, column) => {
//     var keys = Object.keys(oldValue) //get keys from object as an array
//     keys.forEach(function(key, i) {
//       //loop through keys array
//       if (key == newValue) oldValue[newValue] = row
//     })
//   }
// }
const urlFormatter = (cell, row) => {
  return (
    <a
      href={row.eventUrl !== undefined ? row.eventUrl : row.ticketMasterUrl}
      target="_blank"
    >
      {row.eventId}
    </a>
  );
};

const venueUrlFormatter = (cell, row) => {
  return (
    <a
      href={`https://www.ticketmaster.com/venue/${row.tMasterVenueId}`}
      target="_blank"
    >
      {row.tMasterVenueId}
    </a>
  );
};

const ShowOnSale = ({
  showsOnSaleEvents,
  fetchShowOnSaleRequest,
  isFetching,
  isShowsOnSaleMatchedEventFetching,
  createManagedQueueEventsRequest,
  isEventFetching,
  isFetchedFromMatch,
  isFetchedFromUnmatch
}) => {
  const [
    searchStartDate,
    setSearchStartDate,
    searchStartDateRef
  ] = useStateRef();

  const btnSearchRef = useRef(null);

  const [searchEndDate, setSearchEndDate, searchEndDateRef] = useStateRef();

  const [start, setStart] = useState(
    moment(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
        0,
        0
      )
    )
  );
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  );

  let ranges = {
    Today: [moment(start), moment(end)],
    Tommorow: [moment(start).add(1, "days"), moment(start).add(1, "days")],
    "Next 7 Days": [moment(start), moment(end).add(6, "days")],
    "Next 30 Days": [moment(start), moment(end).add(29, "days")],
    "This Month": [moment(start).startOf("month"), moment(end).endOf("month")],
    "Next Month": [
      moment(start)
        .add(1, "month")
        .startOf("month"),
      moment(end)
        .add(1, "month")
        .endOf("month")
    ],
    Year: [moment(start), moment(end).add(1, "years")]
  };

  useEffect(() => {
    if (isFetchedFromMatch) {
      fetchShowOnSaleRequest({
        startDate: moment(start).format("YYYY-MM-DD"),
        endDate: moment(end).format("YYYY-MM-DD")
      });
    }
  }, []);

  const applyCallback = (startDate, endDate) => {
    setSearchStartDate(startDate);
    setSearchEndDate(endDate);
  };

  // const buttonFormatter = (cell, row, colIndex, column) => {
  //   if (row.type === "unmatchedEvents") {
  //     return (
  //       <div className="tbl_btn bbtn_cls">
  //         <Button
  //           className="viewLog_btn"
  //           color="primary"
  //           aria-pressed="true"
  //           onClick={() => {
  //             createManagedQueueEventsRequest({
  //               events: {
  //                 eventInfo: [
  //                   {
  //                     eventDate: row.eventDate,
  //                     eventAddress: row.eventAddress,
  //                     eventId: row.eventId,
  //                     timeZone: row.timeZone,
  //                     eventName: row.eventName
  //                   }
  //                 ]
  //               }
  //             })
  //           }}
  //         >
  //           Match
  //         </Button>
  //       </div>
  //     )
  //   } else if (row.type === "missing") {
  //     return (
  //       <div className="tbl_btn bbtn_cls">
  //         <Button
  //           className="viewLog_btn"
  //           color="primary"
  //           aria-pressed="true"
  //           onClick={() => {}}
  //         >
  //           Add
  //         </Button>
  //       </div>
  //     )
  //   } else return ""
  // }

  // const expandRow = row => {
  //   return <div className="expand_row_main"></div>
  // }

  // const isExpandRow = () => {
  //   return true
  // }

  const trClassName = (row, rowIndex) => {
    if (!row) return "";

    const { type } = row;

    if (type === "unmatchedEvents") {
      return "greenBackground";
    }

    return "";
  };

  const handleKeypress = () => {
    btnSearchRef.current.click();
  };

  const resetFilters = e => {
    e.preventDefault();
    setSearchStartDate();
    setSearchEndDate();
    fetchShowOnSaleRequest({
      startDate: moment(start).format("YYYY-MM-DD"),
      endDate: moment(end).format("YYYY-MM-DD"),
      isFetchedFromMatch,
      isFetchedFromUnmatch
    });
  };

  // const noDataHandler = () => {
  //   if (isFetching) return <Spinner spinnerTime={false} />
  //   else return "No Data Found To Display"
  // }
  const options = {
    page: 1, // which page you want to show as default
    // sizePerPageList: [10,  30, 50, 60],
    sizePerPage: 30,
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

    expandBy: "column"
  };

  return (
    <div>
      <div className="tbl_main  order_tbl_main nw_od_cls">
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
                      <div className="fl_eq_box rangeCls">
                        <label className="searchHead">Start & End Date</label>
                        <div className="date_picker dateCls">
                          <DateTimeRangeContainer
                            ranges={ranges}
                            start={start}
                            end={end}
                            local={{
                              format: "MM/DD/YYYY",
                              sundayFirst: false
                            }}
                            // maxDate={maxDate}
                            applyCallback={applyCallback}
                          >
                            <div className="input-group">
                              <Form.Control
                                id="formControlsTextB"
                                type="text"
                                label="Text"
                                readOnly
                                value={
                                  searchStartDate && searchEndDate !== undefined
                                    ? searchStartDate.format("MM/DD/YYYY") +
                                      " to " +
                                      searchEndDate.format("MM/DD/YYYY")
                                    : "Enter Start Date - End Date"
                                }
                                onKeyPress={evt => {
                                  if (
                                    evt.key === "Enter" ||
                                    evt.charCode === 13 ||
                                    evt.which === 13 ||
                                    evt.keyCode === 13
                                  ) {
                                    handleKeypress();
                                  }
                                }}
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

                      <div className="fl_eq_box src_btn">
                        <label className="searchHead">&nbsp;</label>
                        <div className="fl_w">
                          <Button
                            color="primary"
                            className="btn-pill"
                            ref={btnSearchRef}
                            onClick={() => {
                              fetchShowOnSaleRequest({
                                startDate:
                                  searchStartDate !== undefined
                                    ? searchStartDate.format("YYYY-MM-DD")
                                    : undefined,
                                endDate:
                                  searchEndDate !== undefined
                                    ? searchEndDate.format("YYYY-MM-DD")
                                    : undefined,
                                isFetchedFromMatch,
                                isFetchedFromUnmatch
                              });
                            }}
                          >
                            Search
                          </Button>
                          <button
                            color="primary"
                            type="button"
                            className="btn-pill btn btn-primary clr_fil red_txt"
                            onClick={resetFilters}
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
          <div className="tbl_main date_tbl cm_tbl_btn_main">
            {isFetchedFromMatch ? (
              <div className="inner_tbl">
                {isShowsOnSaleMatchedEventFetching ? (
                  <Spinner spinnerTime={false} />
                ) : (
                  <BootstrapTable
                    data={showsOnSaleEvents}
                    version="4"
                    striped
                    hover
                    pagination
                    options={options}
                    // cellEdit={cellEditProp}
                    // selectRow={selectRow}
                    tableHeaderClass="custom-select-header-class"
                    tableBodyClass="custom-select-body-class"
                    trClassName={trClassName}
                    // expandableRow={isExpandRow}
                    // expandComponent={expandRow}
                    // expandColumnOptions={{ expandColumnVisible: true }}
                    search
                    // blurToSave={true}
                  >
                    {/* <TableHeaderColumn dataField="formattedEventDate" hidden>
                      Date
                    </TableHeaderColumn> */}
                    {/* <TableHeaderColumn dataField="eventId" hidden>
                      EventId/TM URL
                    </TableHeaderColumn> */}
                    {/* <TableHeaderColumn dataField="eventName" hidden>
                      Event
                    </TableHeaderColumn> */}
                    {/* <TableHeaderColumn dataField="eventAddress" hidden>
                      Location
                    </TableHeaderColumn> */}
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
                    {/* <TableHeaderColumn
                      dataField="eventAddress"
                      expandable={false}
                      editable={false}
                    >
                      Location
                    </TableHeaderColumn> */}
                    <TableHeaderColumn
                      dataField="formattedEventDate"
                      dataSort
                      expandable={false}
                      editable={false}
                      sort={"asc"}
                    >
                      Event Date
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="formattedCreatedDate"
                      dataSort
                      expandable={false}
                      editable={false}
                      sort={"asc"}
                    >
                      Created Date
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="formattedScrapedDate"
                      dataSort
                      expandable={false}
                      editable={false}
                      sort={"asc"}
                    >
                      Scarped Date
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="formattedMonitorDate"
                      dataSort
                      expandable={false}
                      editable={false}
                      sort={"asc"}
                    >
                      Monitor Date
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataField="tMasterVenueId"
                      expandable={false}
                      editable={false}
                      dataFormat={venueUrlFormatter}
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
                      dataField="skyboxEventId"
                      expandable={false}
                      editable={false}
                    >
                      skyboxEventId
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="eventStatus"
                      expandable={false}
                      editable={false}
                    >
                      Event Status
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="is_blackList"
                      expandable={false}
                      editable={false}
                    >
                      Blacklist
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="is_cancel"
                      expandable={false}
                      editable={false}
                    >
                      Cancel
                    </TableHeaderColumn>
                  </BootstrapTable>
                )}
              </div>
            ) : (
              <div className="inner_tbl">
                {isFetching ? (
                  <Spinner spinnerTime={false} />
                ) : (
                  <BootstrapTable
                    data={showsOnSaleEvents}
                    version="4"
                    striped
                    hover
                    pagination
                    options={options}
                    // cellEdit={cellEditProp}
                    // selectRow={selectRow}
                    tableHeaderClass="custom-select-header-class"
                    tableBodyClass="custom-select-body-class"
                    trClassName={trClassName}
                    // expandableRow={isExpandRow}
                    // expandComponent={expandRow}
                    // expandColumnOptions={{ expandColumnVisible: true }}
                    search
                    // blurToSave={true}
                  >
                    {/* <TableHeaderColumn dataField="formattedEventDate" hidden>
                      Date
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="eventId" hidden>
                      EventId/TM URL
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="eventName" hidden>
                      Event
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="eventAddress" hidden>
                      Location
                    </TableHeaderColumn> */}
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
                      Event Date
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="formattedScrapedDate"
                      dataSort
                      expandable={false}
                      editable={false}
                      sort={"asc"}
                    >
                      Scarped Date
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="tMasterVenueId"
                      expandable={false}
                      editable={false}
                      dataFormat={venueUrlFormatter}
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
                  </BootstrapTable>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ShowOnSale);
