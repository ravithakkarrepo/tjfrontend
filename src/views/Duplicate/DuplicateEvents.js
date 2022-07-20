/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  BootstrapTable,
  TableHeaderColumn,
  InsertButton
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap-daterangepicker/daterangepicker.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment-timezone";

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
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
};

const DuplicateEvents = ({
  isFetching,
  duplicateEventsQueue,
  totalListings,
  currentPage,
  fetchDuplicateEventsRequest,
  deleteDuplicateEventsRequest,
  updateEventBySkyboxEventIdRequest,
  archiveEventsRequest
}) => {
  const [eventKey, setEventKey] = useState("");
  const [tmEventIdKey, settmEventIdKey] = useState("");
  const [skyboxVenueIdKey, setSkyboxVenueIdKey] = useState("");
  const [skyboxEventIdKey, setSkyboxEventIdKey] = useState("");
  const [venueKey, setvenueKey] = useState("");
  const [tmVenueIdSearchKey, setTmVenueIdSearchKey] = useState("");
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

  const statusFormatter = (cell, row) => {
    return (
      <div className="tbl_btn" style={{ cursor: "pointer" }}>
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip>
              Blacklisted :{" "}
              {row.is_blackList && row.is_blackList === true ? (
                <div>
                  <div className="green_txt">
                    <i className="fa fa-check"></i>
                  </div>

                  <div>
                    <span>
                      Blacklist Reason :
                      <br />
                      {row.blacklistReason}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="red_txt">
                  <i className="fa fa-times"></i>
                </div>
              )}
              <br />
              Cancelled :{" "}
              {row.is_cancel && row.is_cancel === true ? (
                <div>
                  {
                    <div className="green_txt">
                      <i className="fa fa-check"></i>
                    </div>
                  }
                </div>
              ) : (
                <div className="red_txt">
                  <i className="fa fa-times"></i>
                </div>
              )}
              <br />
              Postponed :{" "}
              {row.is_postponed && row.is_postponed === true ? (
                <div>
                  {
                    <div className="green_txt">
                      <i className="fa fa-check"></i>
                    </div>
                  }
                </div>
              ) : (
                <div className="red_txt">
                  <i className="fa fa-times"></i>
                </div>
              )}
              <br />
              Archived :{" "}
              {row.is_archived && row.is_archived === true ? (
                <div>
                  {
                    <div className="green_txt">
                      <i className="fa fa-check"></i>
                    </div>
                  }
                </div>
              ) : (
                <div className="red_txt">
                  <i className="fa fa-times"></i>
                </div>
              )}
            </Tooltip>
          }
        >
          <img
            src={require("./../../assets/img/fullfillment.png")}
            alt="Status"
          />
        </OverlayTrigger>
      </div>
    );
  };

  const skyboxUrlFormatter = (cell, row) => {
    return (
      <a
        href={`https://www.vividseats.com/production/${row.skyBoxEventId}`}
        target="_blank"
      >
        {row.skyBoxEventId}
      </a>
    );
  };

  useEffect(() => {
    fetchDuplicateEventsRequest({
      page,
      limit: sizePerPage
    });
  }, []);
  const buttonFormatter = (cell, row, colIndex, column) => {
    return (
      <div className="tbl_btn bbtn_cls">
        <Button
          className="viewLog_btn"
          color="danger"
          aria-pressed="true"
          onClick={() => {
            confirmAlert({
              title: "Warning",
              message: (
                <span> Are you sure you want to start this event? </span>
              ),
              closeOnClickOutside: false,
              buttons: [
                { label: "Cancel" },
                {
                  label: "Confirm",
                  onClick: () => {
                    console.log(row.skyBoxEventId, row._id);
                    updateEventBySkyboxEventIdRequest({
                      data: {
                        skyBoxEventId: row.skyBoxEventId,
                        eventId: row._id
                      },
                      fromMisMatch: false,
                      page: currentPage
                    });
                  }
                }
              ]
            });
          }}
        >
          Start
        </Button>
        <Button
          className="viewLog_btn"
          color="danger"
          aria-pressed="true"
          onClick={() => {
            confirmAlert({
              title: "Warning",
              message: (
                <span> Are you sure you want to delete these event? </span>
              ),
              closeOnClickOutside: false,
              buttons: [
                { label: "Cancel" },
                {
                  label: "Confirm",
                  onClick: () => {
                    deleteDuplicateEventsRequest({
                      Ids: [row._id],
                      fromMisMatch: false,
                      page: currentPage
                    });
                  }
                }
              ]
            });
          }}
        >
          Delete
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

  const cellEditProp = {
    mode: "click",
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, column) => {
      var keys = Object.keys(oldValue); //get keys from object as an array
      keys.forEach(function(key, i) {
        //loop through keys array
        if (key == newValue) oldValue[newValue] = row;
      });
    }
  };

  const createCustomDeleteButton = onBtnClick => {
    return (
      <>
        <Button
          color="primary"
          className="btn-pill react-bs-table-del-btn"
          onClick={onBtnClick}
        >
          Delete
        </Button>
        <Button
          color="primary"
          className="btn-pill react-bs-table-del-btn"
          onClick={() => customArchiveConfirm()}
        >
          Archive
        </Button>
      </>
    );
  };

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: <span> Are you sure you want to delete these events? </span>,
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            console.log(dropRowKeys);
            if (dropRowKeys.length)
              deleteDuplicateEventsRequest({
                Ids: dropRowKeys,
                fromMisMatch: false,
                page: currentPage
              });
            next();
          }
        }
      ]
    });
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
                fromDuplicate: true,
                page: currentPage,
                filter: getFilterData()
              });
            }
          }
        ]
      });
    }
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
  };

  const getFilterData = () => {
    return {
      eventKey,
      tmEventIdKey,
      skyboxVenueIdKey,
      skyboxEventIdKey,
      tmVenueIdSearchKey,
      venueKey,
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
    fetchDuplicateEventsRequest({
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
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: customConfirm,
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
    remoteObj.cellEdit = true;
    return remoteObj;
  }

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
                  >
                    <h2>Filter Options</h2>
                  </Accordion.Toggle>

                  <Accordion.Collapse eventKey="0">
                    <div className="select_eq filter_filed">
                      <div className="fl_eq_box rangeCls">
                        <label className="searchHead">
                          Start & End Date(Duplicate Date)
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
                                  searchStartDate && searchEndDate !== undefined
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
                          onChange={evt => settmEventIdKey(evt.target.value)}
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
                        <label className="searchHead">Skybox Venue Id</label>
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
                        <label className="searchHead">TM Venue Id</label>
                        <Form.Control
                          type="text"
                          value={tmVenueIdSearchKey}
                          placeholder="Search..."
                          onChange={evt =>
                            setTmVenueIdSearchKey(evt.target.value)
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
                        <label className="searchHead">Skybox Event Id</label>
                        <Form.Control
                          type="text"
                          value={skyboxEventIdKey}
                          placeholder="Search..."
                          onChange={evt =>
                            setSkyboxEventIdKey(evt.target.value)
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
                      <div className="fl_eq_box" style={{ marginRight: "1%" }}>
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
                              fetchDuplicateEventsRequest({
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
                              setSkyboxEventIdKey("");
                              setTmVenueIdSearchKey("");
                              setStart(start);
                              setEnd(end);
                              setIsArchived("false");
                              fetchDuplicateEventsRequest({
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
      ) : (
        <BootstrapTable
          data={duplicateEventsQueue}
          version="4"
          striped
          hover
          pagination
          options={options}
          cellEdit={cellEditProp}
          fetchInfo={{ dataTotalSize: totalListings }}
          ref={refUnmatchedEvent}
          tableHeaderClass="custom-select-header-class"
          tableBodyClass="custom-select-body-class"
          blurToSave={true}
          remote={remote}
          selectRow={selectRow}
          deleteRow
        >
          <TableHeaderColumn dataField="_id" hidden isKey>
            _id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="eventId"
            editable={false}
            dataFormat={urlFormatter}
          >
            EventId/TM URL
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventName" editable={false}>
            Event
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventAddress" hidden editable={false}>
            Location
          </TableHeaderColumn>
          <TableHeaderColumn dataField="formattedEventDate" editable={false}>
            Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="venueId"
            editable={false}
            dataFormat={venueUrlFormatter}
          >
            tMasterVenueId
          </TableHeaderColumn>
          <TableHeaderColumn dataField="skyboxVenueId" editable={false}>
            skyboxVenueId
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="skyBoxEventId"
            dataSort
            sort={"asc"}
            editable
            dataFormat={skyboxUrlFormatter}
          >
            Skybox Event Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="duplicate_by" editable={false}>
            Duplicate By
          </TableHeaderColumn>
          <TableHeaderColumn dataField="duplicate_date" editable={false}>
            Duplicate Date
          </TableHeaderColumn>
          <TableHeaderColumn dataField="duplicate_reason" editable={false}>
            Duplicate Reason
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="button"
            dataFormat={buttonFormatter}
            dataAlign="center"
            editable={false}
          >
            Actions
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="is_blackList"
            editable={false}
            dataFormat={statusFormatter}
          >
            Status
          </TableHeaderColumn>
        </BootstrapTable>
      )}
    </div>
  );
};

export default withRouter(DuplicateEvents);
