/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner";
// import { percentFormatter } from "../../components/TableColumnFormatter"
import Accordion from "react-bootstrap/Accordion";
// import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable"
import "bootstrap-daterangepicker/daterangepicker.css";

//import DatetimeRangePicker from "react-bootstrap-daterangepicker"
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment-timezone";
// import { getDatesRange } from "../../utils/validation"
import { confirmAlert } from "react-confirm-alert"; // Import

var rowdata = [];
const onRowSelect = (row, isSelected, e) => {
  if (isSelected) {
    rowdata.push(row._id);
  } else {
    rowdata = [];
  }
};

const onSelectAll = (isSelected, rows) => {
  if (isSelected) {
    rows.map(item => rowdata.push(item._id));
  } else {
    rowdata = [];
  }
};

const selectRow = {
  mode: "checkbox",
  clickToExpand: true,
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
};

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
const UnMatchedEvents = ({
  isFetching,
  unmatchedEventsQueue,
  fetchUnmatchedEventQueueRequest,
  createManagedQueueEventsRequest,
  isEventFetching,
  currentPage,
  totalListings,
  isLoadingFrom,
  setIsLoadingFrom,
  archiveEventsRequest
}) => {
  const [eventKey, setEventKey] = useState("");
  const [tmEventIdKey, settmEventIdKey] = useState("");
  const [skyboxVenueIdKey, setSkyboxVenueIdKey] = useState(null);
  const [venueKey, setvenueKey] = useState("");
  const [onPresaleSearchKey, setOnPresaleSearchKey] = useState("");

  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const [isArchived, setIsArchived] = useState("false");
  // eslint-disable-next-line no-unused-vars
  const [showLoader, setShowLoader] = useState(false);
  const btnSearchRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [sizePerPage, setSizePerPage] = useState(20);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  const refUnmatchedEvent = useRef(null);
  const [showUnMatchedEvents, setShowUnMatchedEvents] = useState(false);

  let now = new Date();
  let local = {
    format: "MM/DD/YYYY",
    sundayFirst: false
  };
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
  let ranges = {
    Today: [moment(start), moment(end)],
    Tommorow: [moment(start).add(1, "days"), moment(end).add(1, "days")],
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
            setIsLoadingFrom("UmatchedEvent");
          }}
        >
          Match
        </Button>
        <Button
          className="viewLog_btn"
          color="danger"
          aria-pressed="true"
          onClick={() => customArchiveConfirm(row._id)}
        >
          Archive
        </Button>
      </div>
    );
  };

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

  const venueUrlFormatter = (cell, row) => {
    return (
      <a
        href={`https://www.ticketmaster.com/venue/${row.venueId}`}
        target="_blank"
      >
        {row.venueId}
      </a>
    );
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
  };

  const createCustomArchiveButton = onBtnClick => {
    return (
      <Button
        color="primary"
        className="btn-pill react-bs-table-del-btn"
        onClick={onBtnClick}
      >
        Archive
      </Button>
    );
  };

  const customArchiveConfirm = id => {
    let condition = id ? id : rowdata.length;

    if (condition) {
      confirmAlert({
        title: "Warning",
        message: <span> Are you sure you want to archive these events? </span>,
        closeOnClickOutside: false,
        buttons: [
          { label: "Cancel" },
          {
            label: "Confirm",
            onClick: () => {
              var selectedEventIdList = id ? [id] : rowdata;
              rowdata = [];
              archiveEventsRequest({
                Ids: selectedEventIdList,
                fromUnMatched: true,
                page: currentPage,
                filter: getFilterData()
              });
            }
          }
        ]
      });
    }
  };

  const getFilterData = () => {
    return {
      eventKey,
      tmEventIdKey,
      skyboxVenueIdKey,
      venueKey,
      onPresaleSearchKey,
      startDate:
        searchStartDate !== undefined
          ? searchStartDate.format("YYYY-MM-DD")
          : undefined,
      endDate:
        searchEndDate !== undefined
          ? searchEndDate.format("YYYY-MM-DD")
          : undefined,
      archive: isArchived
    };
  };

  const onPageChange = (page, sizePerPage) => {
    fetchUnmatchedEventQueueRequest({
      page,
      limit: sizePerPage,
      filter: getFilterData()
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
    deleteBtn: createCustomArchiveButton,
    handleConfirmDeleteRow: customArchiveConfirm,
    onPageChange: onPageChange
  };

  const applyCallback = (startDate, endDate) => {
    setSearchStartDate(startDate);
    setSearchEndDate(endDate);
  };

  const handleKeypress = () => {
    btnSearchRef.current.click();
  };

  function remote(remoteObj) {
    // it means that only pagination you will handle by your own
    remoteObj.pagination = true;
    remoteObj.cellEdit = false;
    return remoteObj;
  }

  return (
    <>
      {showUnMatchedEvents === false ? (
        <div className="btn-group mrgbtm20">
          <Button
            onClick={() => {
              setShowUnMatchedEvents(true);
              fetchUnmatchedEventQueueRequest({
                page,
                limit: sizePerPage
              });
            }}
          >
            Click here to show unmatched events
          </Button>
        </div>
      ) : (
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
                      >
                        <h2>Filter Options</h2>
                      </Accordion.Toggle>

                      <Accordion.Collapse eventKey="0">
                        <div className="select_eq filter_filed">
                          <div className="fl_eq_box rangeCls">
                            <label className="searchHead">
                              Start & End Date(EventDate)
                            </label>
                            <div className="date_picker dateCls">
                              <DateTimeRangeContainer
                                ranges={ranges}
                                start={start}
                                end={end}
                                local={local}
                                applyCallback={applyCallback}
                              >
                                <div className="input-group">
                                  <Form.Control
                                    id="formControlsTextB"
                                    type="text"
                                    label="Text"
                                    readOnly
                                    value={
                                      searchStartDate &&
                                      searchEndDate !== undefined
                                        ? searchStartDate.format("MM/DD/YYYY") +
                                          " to " +
                                          searchEndDate.format("MM/DD/YYYY")
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
                            <label className="searchHead">Event Name</label>
                            <Form.Control
                              type="text"
                              value={eventKey}
                              placeholder="Search..."
                              onChange={evt => setEventKey(evt.target.value)}
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
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">TM Event Id</label>
                            <Form.Control
                              type="text"
                              value={tmEventIdKey}
                              placeholder="Search..."
                              onChange={evt =>
                                settmEventIdKey(evt.target.value)
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
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">
                              Skybox Venue Id
                            </label>
                            <Form.Control
                              type="text"
                              value={skyboxVenueIdKey}
                              placeholder="Search..."
                              onChange={evt =>
                                setSkyboxVenueIdKey(evt.target.value)
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
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">Venue</label>
                            <Form.Control
                              type="text"
                              value={venueKey}
                              placeholder="Search..."
                              onChange={evt => setvenueKey(evt.target.value)}
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
                            />
                          </div>
                          <div
                            className="fl_eq_box"
                            style={{ marginRight: "1%" }}
                          >
                            <label className="searchHead">Presale</label>
                            <Form.Control
                              as="select"
                              value={onPresaleSearchKey}
                              onChange={evt => {
                                setOnPresaleSearchKey(evt.target.value);
                              }}
                            >
                              <option value="">Show All</option>
                              <option value="true">Show True</option>
                              <option value="false">Show False</option>
                            </Form.Control>
                          </div>

                          <div
                            className="fl_eq_box"
                            style={{ marginRight: "1%" }}
                          >
                            <label className="searchHead">Archived</label>
                            <Form.Control
                              as="select"
                              value={isArchived}
                              onChange={evt => setIsArchived(evt.target.value)}
                            >
                              <option value="">Show All</option>
                              <option value="true">Show True</option>
                              <option value="false">Show False</option>
                            </Form.Control>
                          </div>

                          <div className="fl_eq_box src_btn">
                            <label className="searchHead">&nbsp;</label>
                            <div className="fl_w">
                              <Button
                                color="primary"
                                className="btn-pill"
                                onClick={() => {
                                  fetchUnmatchedEventQueueRequest({
                                    page,
                                    limit: sizePerPage,
                                    filter: getFilterData()
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
                                  setSearchStartDate();
                                  setSearchEndDate();
                                  setEventKey("");
                                  setvenueKey("");
                                  settmEventIdKey("");
                                  setSkyboxVenueIdKey("");
                                  setOnPresaleSearchKey("");
                                  setIsArchived("false");
                                  setStart(start);
                                  setEnd(end);
                                  fetchUnmatchedEventQueueRequest({
                                    page,
                                    limit: sizePerPage
                                  });
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
            </div>
          </div>

          {isFetching ? (
            <Spinner spinnerTime={false} />
          ) : isEventFetching && isLoadingFrom === "UmatchedEvent" ? (
            <Spinner spinnerTime={false} />
          ) : showLoader ? (
            <Spinner spinnerTime={false} />
          ) : (
            <BootstrapTable
              data={unmatchedEventsQueue}
              version="4"
              striped
              hover
              pagination
              options={options}
              // trClassName={trClassName}
              expandableRow={isExpandRow}
              expandComponent={expandRow}
              fetchInfo={{ dataTotalSize: totalListings }}
              expandColumnOptions={{ expandColumnVisible: true }}
              ref={refUnmatchedEvent}
              tableHeaderClass="custom-select-header-class"
              tableBodyClass="custom-select-body-class"
              // search
              blurToSave={true}
              remote={remote}
              cellEdit={cellEditProp}
              selectRow={selectRow}
              deleteRow
              // expandableRow={isExpandRow}
              // expandComponent={expandRow}
            >
              <TableHeaderColumn
                dataField="_id"
                // isKey
                hidden
                expandable={false}
                editable={false}
              ></TableHeaderColumn>
              <TableHeaderColumn dataField="formattedEventDate" hidden>
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
                dataFormat={venueUrlFormatter}
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
      )}
    </>
  );
};

export default withRouter(UnMatchedEvents);
