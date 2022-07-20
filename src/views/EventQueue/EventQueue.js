/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import { Button, Form, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";
import { percentFormatter } from "../../components/TableColumnFormatter";
import { dateSortFuncForEvent, dateFormatter } from "../../utils";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment-timezone";

import BlackListSection from "../ManagedEvents/BlackListSection";
import EventAdd from "../Promos/EventAdd";
import "bootstrap-daterangepicker/daterangepicker.css";
import UnMatchedEvents from "./UnMatchedEvents";
import MisMatchedEvents from "./MisMatchedEvents";
import { ALERT_MSG_ERROR } from "../../constants";
import {
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CardBody,
  CardHeader
} from "reactstrap";
import ShowOnSale from "./ShowOnSale";

const dateFormatStr = "MM/DD/YY, hh:mm a";
const defaultTimeZone = "America/New_York";

var rowdata = [];
var RowdataForPromo;
var extraDataForEventAdd;
const onRowSelect = (row, isSelected, e) => {
  if (isSelected) {
    rowdata.push(row._id);
  } else {
    rowdata = [];
  }
};

export const dateFormatterWithTZ = time => timezone =>
  moment(time)
    .tz(timezone || defaultTimeZone)
    .format(dateFormatStr);

const onSelectAll = (isSelected, rows) => {
  if (isSelected) {
    rows.map(item => rowdata.push(item._id));
  } else {
    rowdata = [];
  }
};

const selectRow = {
  mode: "checkbox",
  // showOnlySelected: true,
  clickToExpand: true,
  // customComponent: CustomMultiSelectTable,
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
  var ticketMasterUrl = `https://www1.ticketmaster.com/event/${row.eventId}`;
  var hasSkyboxEventId = false;
  if (row.skyBoxEventId) {
    hasSkyboxEventId = true;
    var skyboxEventURL = `https://www.vividseats.com/production/${row.skyBoxEventId}`;
  }
  return (
    <div>
      <a
        href={
          row.eventUrl !== undefined && row.eventUrl !== null
            ? row.eventUrl
            : ticketMasterUrl
        }
        target="_blank"
      >
        {row.eventId}
      </a>
      {hasSkyboxEventId && (
        <>
          <br />
          <br />
          <Form.Label className="custom_form_label">Vivid Event Id</Form.Label>
          <a href={skyboxEventURL} target="_blank">
            {row.skyBoxEventId}
          </a>
        </>
      )}
    </div>
  );
};

let blackListData = [];
//var EventId = "";
const EventQueue = ({
  isShowsOnSaleMatchedEventFetching,
  isFetching,
  isEventQueueFetching,
  isRemonitorPresaleFetching,
  isUnmatchedEventFetching,
  isMisMatchEventFetching,
  updateIsBlackListRequest,
  isBlackListingFetching,
  isAddBlackListFetching,
  eventAvailablePromosFetching,
  FetchBlackListPriceSectionRequest,
  fetchEventMonitorRequest,
  fetchEventReMonitorPresaleRequest,
  eventMonitor,
  updateIsMonitorRequest,
  blackListInfo,
  addBlackListPriceSectionRequest,
  fetchEventPromosRequest,
  deleteEventPromosFromAddPromoRequest,
  addEventPromoRequest,
  appReceiveAlert,
  unmatchedEventsQueue,
  misMatchedEventsQueue,
  fetchUnmatchedEventQueueRequest,
  fetchMisMatchedEventQueueRequest,
  saveSelectEvent,
  clearSelectEvent,
  clearSearchEvents,
  createManagedQueueEventsRequest,
  selectModalSkyboxEvents,
  closeModalSkyBoxEventsNotFounded,
  fetchEventAvailablePromoRequest,
  skyBoxEventsDup,
  noSkyboxEvents,
  isEventFetching,
  fetchShowOnSaleRequest,
  showsOnSaleEvents,
  availablePromoNames,
  clearAvailablePromoNames,
  updateByMismatchFromEventQueueRequest,
  updateEventBySkyboxEventIdRequest,
  archiveEventsRequest
}) => {
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const [searchCreateStartDate, setSearchCreateStartDate] = useState();
  const [searchCreateEndDate, setSearchCreateEndDate] = useState();
  const [blackListSectionModel, setBlackListSectionModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [eventId, setEventId] = useState("");
  const [eventDBId, setEventDBId] = useState("");

  const [is_blackList, setIsBlackList] = useState("");
  const [blacklistedSections, setBlacklistedSections] = useState("");
  const [presaleSearchKey, setPresaleSearchKey] = useState("");
  const [data, setData] = useState(false);
  const [newData, setNewData] = useState([]);
  const [newDataCountdown, setNewDataCountdown] = useState([]);
  const [newDataRemonitorPresale, setNewDataRemonitorPresale] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [ModalClose, onModalClose] = useState(true);
  const [showEventPromo, setShowEventPromo] = useState(false);
  const [isLoadingFrom, setIsLoadingFrom] = useState("");
  // const [page, setPage] = useState(1)
  // const [sizePerPage, setSizePerPage] = useState(20)

  var blacklistReason = "";
  var blacklistReasonSelected = "";

  let selectedSkyBoxEvents = {};

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
  useEffect(() => {
    fetchEventMonitorRequest();
    fetchEventReMonitorPresaleRequest();
    return () => {
      clearSearchEvents();
    };
  }, []);

  const handleRadioChange = (evt, selectedEvent) => {
    const { name } = evt.target;
    selectedSkyBoxEvents[name] = selectedEvent;
  };
  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          <span>
            {dropRowKeys === undefined
              ? next.row.is_blackList === true
                ? "Are you sure you want to unblackList this events"
                : "Are you sure you want to blackList this events?"
              : "Are you sure you want to delete these  events?"}
          </span>
          <span className="blacklistHeader">Blacklist Reason</span>
          <Form.Check
            type="radio"
            className="check_row_cls"
            id={1}
            name="radVenue"
            value={`Will Call`}
            onChange={evt => {
              blacklistReason = evt.target.value;
              blacklistReasonSelected = evt.target.value;
            }}
            label={`Will Call`}
          />
          <Form.Check
            type="radio"
            className="check_row_cls"
            id={2}
            name="radVenue"
            value={`Event Mismatch`}
            onChange={evt => {
              blacklistReason = evt.target.value;
              blacklistReasonSelected = evt.target.value;
            }}
            label={`Event Mismatch`}
          />

          <Form.Check
            type="radio"
            className="check_row_cls"
            id={3}
            name="radVenue"
            value={`No Seats Available`}
            onChange={evt => {
              blacklistReason = evt.target.value;
              blacklistReasonSelected = evt.target.value;
            }}
            label={`No Seats Available`}
          />
          <Form.Check
            type="radio"
            className="check_row_cls"
            id={4}
            name="radVenue"
            value={`Verified Resale`}
            onChange={evt => {
              blacklistReason = evt.target.value;
              blacklistReasonSelected = evt.target.value;
            }}
            label={`Verified Resale`}
          />

          <Form.Group>
            <Form.Check
              type="radio"
              className="check_row_cls"
              id={5}
              name="radVenue"
              value={`Other`}
              onChange={evt => {
                blacklistReasonSelected = evt.target.value;
              }}
              label={`Other`}
            />
            <Form.Control
              style={{ color: "#666", backgroundColor: "white" }}
              type="text"
              id={6}
              name="radVenue"
              onChange={evt => {
                blacklistReason =
                  blacklistReasonSelected === "Other"
                    ? evt.target.value
                    : blacklistReason;
              }}
            />
          </Form.Group>
        </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            return false;
          }
        },
        {
          label: "Confirm",
          onClick: () => {
            if (dropRowKeys !== undefined) {
              updateIsBlackListRequest({
                eventId: dropRowKeys,
                is_blackList: true,
                blacklistReason
              });
              next();
            } else {
              updateIsBlackListRequest({
                eventId: [next.row._id],
                is_blackList: next.is_blackList,
                blacklistReason,
                fromEventQueue: next.fromEventQueue || false,
                isFromCountdown:
                  next.isFromCountdown === "isFromCountTable" ? true : false,
                isFromRemonitorPresaleTable:
                  next.isFromCountdown === "isFromRemonitorPresaleTable"
                    ? true
                    : false
              });
            }
          }
        }
      ]
    });
  };

  const updateIsMonitorEventQueue = () => {
    if (rowdata.length !== 0) {
      var rowValue = rowdata;
      rowdata = [];
      updateIsMonitorRequest({
        body: {
          eventIds: rowValue,
          is_monitor: true
        }
      });
    }
  };

  const createCustomDeleteButton = onBtnClick => {
    return (
      <>
        <Button color="primary" className="btn-pill" onClick={onBtnClick}>
          BlackList
        </Button>

        <Button
          color="primary"
          className="btn-pill"
          onClick={updateIsMonitorEventQueue}
        >
          Monitor
        </Button>
      </>
    );
  };

  const buttonFormatter = (cell, row, extraData, column) => {
    let skyBoxEventId = "";
    let showWarning =
      !extraData &&
      row.presale == false &&
      (!row.pctVenueAvail || row.pctVenueAvail == 0) &&
      (!row.gaAvailability || row.gaAvailability == 0);
    return (
      <div className="tbl_btn bbtn_cls">
        {/* {row.onSaleDate === undefined || row.presale === undefined ? ( */}
        {/* {!row.onSaleDate || row.presale === undefined ? ( */}
        {showWarning ? (
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>No Time Announced</Tooltip>}
          >
            <i className="fa fa-warning" aria-hidden="true"></i>
          </OverlayTrigger>
        ) : (
          ""
        )}

        {extraData !== "isFromRemonitorPresaleTable" ? (
          <>
            <Button
              className="viewLog_btn"
              color="primary"
              aria-pressed="true"
              style={{ backgroundColor: row.is_monitor ? "grey" : "" }}
              disabled={row.is_monitor}
              onClick={evt => {
                confirmAlert({
                  title: "Warning",
                  message: (
                    <span>
                      Are you sure you want to start monitoring this event ?
                    </span>
                  ),
                  closeOnClickOutside: false,
                  buttons: [
                    {
                      label: "Cancel"
                    },
                    {
                      label: "Confirm",
                      onClick: () => {
                        if (row.is_monitor === true) {
                          evt.preventDefault();
                          return false;
                        } else {
                          row.is_monitor = true;
                          rowdata.push(row._id);
                          updateIsMonitorRequest({
                            extraData: extraData ? extraData : undefined,
                            row: row,
                            body: {
                              eventIds: rowdata,
                              is_monitor: row.is_monitor
                            }
                          });
                        }
                      }
                    }
                  ]
                });
              }}
            >
              Monitor
            </Button>
            <Button
              className="icon_btn"
              active
              color="primary"
              aria-pressed="true"
              onClick={() => {
                setEventId(row.eventId);
                setEventDBId(row._id);
                setIsBlackList(row.is_blackList);
                setBlacklistedSections(row.blacklistedSections);
                setBlackListSectionModal(true);

                if (row.blackListData) {
                  // setBlackListData(row.blackListData)
                  blackListData = row.blackListData;
                } else {
                  blackListData = [];
                }
              }}
            >
              BlackList
            </Button>
            <Button
              active
              color="primary"
              aria-pressed="true"
              onClick={() => {
                setShowEventPromo(true);

                extraDataForEventAdd = extraData ? extraData : undefined;
                if (row.promos) {
                  var rowForPromo = formatEventPromos([row]);
                  RowdataForPromo = rowForPromo[0];
                } else {
                  RowdataForPromo = undefined;
                }

                // Rowdata = row
                setEventId(row.eventId);
                setEventDBId(row._id);
              }}
            >
              Add Promos
            </Button>
            <Button
              active
              color="primary"
              aria-pressed="true"
              onClick={() => {
                confirmAlert({
                  title: "Warning",
                  message: (
                    <span>
                      Are you sure you want to mark this event as MisMatch ?
                    </span>
                  ),
                  closeOnClickOutside: false,
                  buttons: [
                    {
                      label: "Cancel",
                      onClick: () => {
                        return false;
                      }
                    },
                    {
                      label: "Confirm",
                      onClick: () => {
                        updateByMismatchFromEventQueueRequest({
                          eventId: row._id,
                          isFromCountdown:
                            extraData === "isFromCountTable" ? true : false,
                          isFromRemonitorPresaleTable:
                            extraData === "isFromRemonitorPresaleTable"
                              ? true
                              : false
                        });
                      }
                    }
                  ]
                });
              }}
            >
              MisMatch
            </Button>
            <Button
              active
              color="primary"
              aria-pressed="true"
              style={{ height: "fit-content", lineHeight: "1.9" }}
              onClick={() => {
                confirmAlert({
                  title: "Update Vivid Event Id",
                  message: (
                    <div>
                      <span>Enter SkyBox Event Id</span>

                      <Form.Control
                        style={{
                          color: "#666",
                          backgroundColor: "white",
                          width: "60%",
                          marginLeft: "20%",
                          marginBottom: "5%"
                        }}
                        type="text"
                        onChange={evt => {
                          skyBoxEventId = evt.target.value;
                        }}
                      />
                    </div>
                  ),
                  closeOnClickOutside: false,
                  buttons: [
                    {
                      label: "Cancel",
                      onClick: () => {
                        return false;
                      }
                    },
                    {
                      label: "Confirm",
                      onClick: () => {
                        if (
                          skyBoxEventId === "" ||
                          skyBoxEventId === null ||
                          skyBoxEventId === undefined
                        ) {
                          appReceiveAlert({
                            type: ALERT_MSG_ERROR,
                            message: "Please Enter Skybox Event Id"
                          });
                          return;
                        }
                        setShowLoader(true);
                        closeLoaderIn5Seconds();
                        updateEventBySkyboxEventIdRequest({
                          data: {
                            skyBoxEventId: skyBoxEventId,
                            eventId: row._id
                          },
                          isFromCountdown:
                            extraData === "isFromCountTable" ? true : false,
                          isFromRemonitorPresaleTable:
                            extraData === "isFromRemonitorPresaleTable"
                              ? true
                              : false
                        });
                        skyBoxEventId = "";
                      }
                    }
                  ]
                });
              }}
            >
              Update
              <br />
              Vivid Id
            </Button>{" "}
          </>
        ) : (
          <Button
            active
            color="primary"
            aria-pressed="true"
            onClick={() => {
              setShowEventPromo(true);

              extraDataForEventAdd = extraData ? extraData : undefined;
              if (row.promos) {
                var rowForPromo = formatEventPromos([row]);
                RowdataForPromo = rowForPromo[0];
              } else {
                RowdataForPromo = undefined;
              }

              // Rowdata = row
              setEventId(row.eventId);
              setEventDBId(row._id);
            }}
          >
            Add Promos
          </Button>
        )}
      </div>
    );
  };

  const formatEventPromos = data => {
    var jsonObj = [];
    var item = {};
    for (var j = 0; j < data.length; j++) {
      var promoName = Object.keys(data[j].promos);
      var promoCode = Object.values(data[j].promos);
      item["eventDate"] = data[j].eventDate;
      item["eventId"] = data[j].eventId;
      item["_id"] = data[j]._id;
      item["promoName"] = promoName;
      item["promoCode"] = promoCode;
      jsonObj.push(item);
      item = {};
    }
    return jsonObj.map(({ eventId, eventDate, promoName, promoCode, _id }) => ({
      eventId,
      eventDate: dateFormatterWithTZ(eventDate)(),
      promoName,
      promoCode,
      _id
    }));
  };

  const createdDateFormatter = (cell, row, extraData, column) => {
    return (
      <div>
        <span>{dateFormatter(row.created_date)}</span>
        <br />
        <br />
        <Form.Label
          style={{
            color: "black",
            fontSize: "14px",
            fontWeight: "200"
          }}
        >
          BlackList
        </Form.Label>
        <div className="tbl_btn" id={row.eventId}>
          <div className="is_blackList">
            <BootstrapSwitchButton
              checked={row.is_blackList === true ? true : false}
              onChange={evt => {
                const payload = {
                  eventId: row.eventId,
                  is_blackList: evt,
                  row: row,
                  fromEventQueue: true,
                  isFromCountdown:
                    extraData === "isFromCountTable" ? true : false,
                  isFromRemonitorPresaleTable:
                    extraData === "isFromRemonitorPresaleTable" ? true : false
                };

                if (evt === false) {
                  updateIsBlackListRequest({
                    eventId: row._id,
                    is_blackList: false,
                    blacklistReason
                  });
                } else {
                  customConfirm(payload);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const expandRow = row => {
    let skyBoxEventId = "";

    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>PreSale</label>{" "}
          <span className="row_val">
            {row.presale ? (
              <div className="green_txt">
                <i className="fa fa-check"></i>
              </div>
            ) : (
              <div className="red_txt">
                <i className="fa fa-times"></i>
              </div>
            )}
          </span>
        </div>
        <div className="expand_row_inner">
          <label>Pct Avail</label>{" "}
          <span className="row_val">{percentFormatter(row.pctVenueAvail)}</span>
        </div>
        <div className="expand_row_inner">
          <label>SkyBox VenueId</label>{" "}
          <span className="row_val">{`${row.skyboxVenueId || ""}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>Available To Purchase</label>{" "}
          <span className="row_val">{`${row.availableToPurchase || ""}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>Available Offer</label>{" "}
          <span className="row_val">{`${row.availableOffers || ""}`}</span>
        </div>
        {/* <div className="expand_row_inner tbl_btn bbtn_cls">
          <label>Sky Box EventId</label>{" "}
          <div className="row_val" style={{ display: "inline-flex" }}>
            <span>{`${row.skyBoxEventId || ""}`}</span>
            <div>
              <Button
                active
                color="primary"
                aria-pressed="true"
                onClick={() => {
                  confirmAlert({
                    title: "Warning",
                    message: (
                      <div>
                        <span>Enter SkyBox Event Id</span>
                        <Input
                          type="text"
                          onChange={e => {
                            skyBoxEventId = e.target.value
                          }}
                        />
                      </div>
                    ),
                    closeOnClickOutside: false,
                    buttons: [
                      {
                        label: "Cancel",
                        onClick: () => {
                          return false
                        }
                      },
                      {
                        label: "Confirm",
                        onClick: () => {
                          console.log(row._id, row.skyBoxEventId, skyBoxEventId)
                          skyBoxEventId = ""
                        }
                      }
                    ]
                  })
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </div> */}

        {/* <div className="expand_row_inner">
          <label> PctAvail</label>{" "}
          <span className="row_val">{`${percentFormatter(row.pctVenueAvail) || ""}`}</span>
        </div> */}
        {/* <div className="expand_row_inner">
          <label>Created Date</label>{" "}
          <span className="row_val">
            {" "}
            {`${dateFormatter(row.created_date) || ""}`}{" "}
          </span>
        </div> */}
        {/* <div className="expand_row_inner">
          <label>AISuggested Markup</label>{" "}
          <span className="row_val"> {`${row.aiSuggestedMarkup}`} </span>
        </div> */}
        {/* <div className="expand_row_inner">
          <label>Pre Sale</label>{" "}
          <span className="row_val"> {`${row.presale}`} </span>
        </div> */}
      </div>
    );
  };

  // const iconFormatter = (cell, row) => {
  //   if (cell) {
  //     return (
  //       <div className="green_txt">
  //         <i className="fa fa-check"></i>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div className="red_txt">
  //         <i className="fa fa-times"></i>
  //       </div>
  //     )
  //   }
  // }

  const backListFormatter = (cell, row, extraData) => {
    return (
      <div className="tbl_btn" id={row.eventId}>
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.is_blackList === true ? true : false}
            onChange={evt => {
              const payload = {
                eventId: row.eventId,
                is_blackList: evt,
                row: row,
                fromEventQueue: true,
                isFromCountdown:
                  extraData === "isFromCountTable" ? true : false,
                isFromRemonitorPresaleTable:
                  extraData === "isFromRemonitorPresaleTable" ? true : false
              };

              if (evt === false) {
                updateIsBlackListRequest({
                  eventId: row._id,
                  is_blackList: false,
                  blacklistReason
                });
              } else {
                customConfirm(payload);
              }
            }}
          />
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
  const options = {
    page: 1,
    sizePerPage: 20,
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
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: customConfirm,
    // defaultSortName: "created_date", // default sort column name
    // defaultSortOrder: "desc", // default sort order
    expandBy: "column",
    noDataText: noDataHandler(),
    onRowClick: function(row, columnIndex, rowIndex, e) {
      if (
        e.target.parentNode.parentElement.parentElement.className !==
        "is_blackList"
      ) {
        if (e.target.offsetParent.className === "switch-group") {
          if (row.broadcastState === true) return (row.broadcastState = false);
          else return (row.broadcastState = true);
        }
      } else {
        if (row.is_blackList === true) return (row.is_blackList = false);
        else return (row.is_blackList = true);
      }
    }
  };

  const optionCountDown = {
    ...options,
    sizePerPage: 10
  };
  const optionRemonitorPresale = {
    page: 1,
    sizePerPage: 15,
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
    onRowClick: function(row, columnIndex, rowIndex, e) {
      if (
        e.target.parentNode.parentElement.parentElement.className !==
        "is_blackList"
      ) {
        if (e.target.offsetParent.className === "switch-group") {
          if (row.broadcastState === true) return (row.broadcastState = false);
          else return (row.broadcastState = true);
        }
      } else {
        if (row.is_blackList === true) return (row.is_blackList = false);
        else return (row.is_blackList = true);
      }
    }
  };
  const applyCallback = (startDate, endDate) => {
    setSearchStartDate(startDate);
    setSearchEndDate(endDate);
  };

  const applyCreateCallback = (startDate, endDate) => {
    // setStart(startDate)
    // setEnd(endDate)
    setSearchCreateStartDate(startDate);
    setSearchCreateEndDate(endDate);
  };

  const closeLoaderIn5Seconds = () => {
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  };

  const detailsFormatter = (cell, row) => {
    let hasSkyboxInfo = false;
    if (row.hasOwnProperty("skyboxEventInfo") && row.skyboxEventInfo != null) {
      hasSkyboxInfo = true;
    }
    let detailsHTML = (
      <div>
        <span>{row.eventName}</span>
        <br />
        <span>{row.eventAddress}</span>
        <br />
        <span>{dateFormatterWithTZ(row.eventDate)(row.timeZone)}</span>

        {hasSkyboxInfo && (
          <>
            <br />
            <br />
            <Form.Label className="custom_form_label">
              Vivid Event Info
            </Form.Label>
            <span>{row.skyboxEventInfo.name}</span>
            <br />
            <span>{row.skyboxEventInfo.venueName}</span>
            <br />
            <span>{dateFormatter(row.skyboxEventInfo.date)}</span>
            <br />
          </>
        )}
      </div>
    );
    return detailsHTML;
  };

  const eventDateFormatter = (cell, row) => {
    return dateFormatterWithTZ(row.eventDate)(row.timeZone);
  };

  const buttonFormatterMatch = (cell, row, colIndex, column) => {
    return (
      <div>
        <Button
          active
          color="primary"
          aria-pressed="true"
          style={{ backgroundColor: "black" }}
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
          }}
        >
          Match
        </Button>
      </div>
    );
  };

  const onFilterSearch = () => {
    setShowLoader(true);
    closeLoaderIn5Seconds();
    setData(true);
    let array = [];
    let arrayCountDown = [];
    var arrayRemonitorPresale = [];
    if (searchStartDate) {
      array = eventMonitor.eventsAdded.sortedEventQueueListings.filter(function(
        i,
        n
      ) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate)
        );
      });

      arrayCountDown = eventMonitor.onCountPresale.filter(function(i, n) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate)
        );
      });

      arrayRemonitorPresale = eventMonitor.reMonitorPresale.filter(function(
        i,
        n
      ) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate)
        );
      });
    }

    if (searchCreateStartDate) {
      array = eventMonitor.eventsAdded.sortedEventQueueListings.filter(function(
        i,
        n
      ) {
        return (
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate)
        );
      });

      arrayCountDown = eventMonitor.onCountPresale.filter(function(i, n) {
        return (
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate)
        );
      });

      arrayRemonitorPresale = eventMonitor.reMonitorPresale.filter(function(
        i,
        n
      ) {
        return (
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate)
        );
      });
    }
    if (presaleSearchKey) {
      var presale = false;
      if (presaleSearchKey === "true") presale = true;
      else presale = false;
      array = eventMonitor.eventsAdded.sortedEventQueueListings.filter(function(
        i,
        n
      ) {
        return i.presale === presale;
      });

      arrayCountDown = eventMonitor.onCountPresale.filter(function(i, n) {
        return i.presale === presale;
      });

      arrayRemonitorPresale = eventMonitor.reMonitorPresale.filter(function(
        i,
        n
      ) {
        return i.presale === presale;
      });
    } else if (
      !searchCreateStartDate &&
      !searchCreateEndDate &&
      !searchStartDate &&
      !searchEndDate
    ) {
      array = eventMonitor.eventsAdded.sortedEventQueueListings;
      arrayCountDown = eventMonitor.onCountPresale;
      arrayRemonitorPresale = eventMonitor.reMonitorPresale;
    }

    if (searchStartDate && searchCreateStartDate && presaleSearchKey) {
      // eslint-disable-next-line no-redeclare
      var presale = false;
      if (presaleSearchKey === "true") presale = true;
      else presale = false;
      array = eventMonitor.eventsAdded.sortedEventQueueListings.filter(function(
        i,
        n
      ) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate) &&
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate) &&
          i.presale === presale
        );
      });

      arrayCountDown = eventMonitor.onCountPresale.filter(function(i, n) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate) &&
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate) &&
          i.presale === presale
        );
      });

      arrayRemonitorPresale = eventMonitor.reMonitorPresale.filter(function(
        i,
        n
      ) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate) &&
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate) &&
          i.presale === presale
        );
      });
    }
    if (searchStartDate && searchCreateStartDate) {
      array = eventMonitor.eventsAdded.sortedEventQueueListings.filter(function(
        i,
        n
      ) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate) &&
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate)
        );
      });

      arrayCountDown = eventMonitor.onCountPresale.filter(function(i, n) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate) &&
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate)
        );
      });

      arrayRemonitorPresale = eventMonitor.reMonitorPresale.filter(function(
        i,
        n
      ) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate) &&
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate)
        );
      });
    }
    if (searchStartDate && presaleSearchKey) {
      // eslint-disable-next-line no-redeclare
      var presale = false;
      if (presaleSearchKey === "true") presale = true;
      else presale = false;
      array = eventMonitor.eventsAdded.sortedEventQueueListings.filter(function(
        i,
        n
      ) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate) &&
          i.presale === presale
        );
      });

      arrayCountDown = eventMonitor.onCountPresale.filter(function(i, n) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate) &&
          i.presale === presale
        );
      });

      arrayRemonitorPresale = eventMonitor.reMonitorPresale.filter(function(
        i,
        n
      ) {
        return (
          i.eventDateUnix >= +new Date(searchStartDate) &&
          i.eventDateUnix <= +new Date(searchEndDate) &&
          i.presale === presale
        );
      });
    }
    if (searchCreateStartDate && presaleSearchKey) {
      // eslint-disable-next-line no-redeclare
      var presale = false;
      if (presaleSearchKey === "true") presale = true;
      else presale = false;
      array = eventMonitor.eventsAdded.sortedEventQueueListings.filter(function(
        i,
        n
      ) {
        return (
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate) &&
          i.presale === presale
        );
      });

      arrayCountDown = eventMonitor.onCountPresale.filter(function(i, n) {
        return (
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate) &&
          i.presale === presale
        );
      });

      arrayRemonitorPresale = eventMonitor.reMonitorPresale.filter(function(
        i,
        n
      ) {
        return (
          +new Date(i.created_date) >= +new Date(searchCreateStartDate) &&
          +new Date(i.created_date) <= +new Date(searchCreateEndDate) &&
          i.presale === presale
        );
      });
    }
    setNewData(array);
    setNewDataCountdown(arrayCountDown);
    setNewDataRemonitorPresale(arrayRemonitorPresale);
  };

  const sortByOnsaleDate = (a, b) => {
    return new Date(b.onSaleDate).getTime() - new Date(a.onSaleDate).getTime();
  };

  return (
    <div>
      <Modal
        isOpen={!!Object.keys(skyBoxEventsDup).length}
        className={"modal-danger"}
        size="lg"
        centered
      >
        <ModalHeader>Please select the right skybox event</ModalHeader>
        <ModalBody>
          {Object.entries(skyBoxEventsDup).map(([eventId, skyboxEvents]) => {
            return (
              <Card key={`${eventId}`} style={{ backgroundColor: "white" }}>
                <CardHeader style={{ backgroundColor: "grey" }}>
                  EventId: {eventId}
                </CardHeader>
                <CardBody>
                  {skyboxEvents.map((event, idx) => {
                    const { name, date, venue, id } = event;

                    return (
                      <FormGroup
                        style={{ marginLeft: "1rem" }}
                        className="radio"
                        key={`${eventId}-${idx}`}
                      >
                        <Input
                          className="form-check-input"
                          type="radio"
                          id={`${eventId}-${idx}`}
                          name={eventId}
                          value={event}
                          onChange={evt => handleRadioChange(evt, event)}
                        />
                        <Label
                          className="form-check-label"
                          htmlFor={`${eventId}-${idx}`}
                        >
                          {`id:${id}
                            Event: ${name}
                            Date: ${dateFormatter(date)} Location: ${
                            venue.name
                          }`}
                        </Label>
                      </FormGroup>
                    );
                  })}
                </CardBody>
              </Card>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            style={{ backgroundColor: "black" }}
            onClick={() => {
              selectedSkyBoxEvents = {};
              selectModalSkyboxEvents(selectedSkyBoxEvents);
            }}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "black" }}
            color="secondary"
            onClick={() => {
              if (Object.entries(selectedSkyBoxEvents).length !== 0) {
                selectModalSkyboxEvents(selectedSkyBoxEvents);
              } else {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Please Select atleast One Event"
                });
              }
            }}
          >
            Add Event
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={noSkyboxEvents.length > 0}
        // style={{ maxWidth: "60%", fontSize: "20px" }}
        className={"ReactModalPortal width_cls"}
        size="lg"
        centered
      >
        <ModalHeader>
          Please Manage Event Again (Not Found In Skybox)
        </ModalHeader>
        <ModalBody>
          <div className="tbl_main cm_tbl_btn_main">
            <div className="inner_tbl">
              <BootstrapTable
                data={noSkyboxEvents}
                version="4"
                striped
                hover
                pagination
                options={options}
                cellEdit={cellEditProp}
              >
                <TableHeaderColumn
                  dataField="eventId"
                  isKey
                  editable={false}
                  // width="15%"
                >
                  EventID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="eventName" editable={true}>
                  Event
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="eventAddress"
                  // width="40%"
                  editable={true}
                >
                  Location
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="eventDate"
                  //  width="40%"
                  dataFormat={eventDateFormatter}
                  editable={true}
                >
                  Date
                </TableHeaderColumn>
                <TableHeaderColumn
                  expandable={false}
                  dataField="button"
                  dataFormat={buttonFormatterMatch}
                  dataAlign="center"
                  editable={false}
                >
                  Action
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              closeModalSkyBoxEventsNotFounded();
              setIsLoadingFrom("");
            }}
          >
            close
          </Button>
        </ModalFooter>
      </Modal>
      <div className="full_width">
        <div className="page_name">
          <h2>Event Queue</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12">
                <div className="inner_box_body padL3T5">
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
                                  <div className="fl_eq_box rangeCls">
                                    <label className="searchHead">
                                      Start & End Date(Created Date)
                                    </label>
                                    <div className="date_picker dateCls">
                                      <DateTimeRangeContainer
                                        ranges={ranges}
                                        start={start}
                                        end={end}
                                        local={local}
                                        applyCallback={applyCreateCallback}
                                      >
                                        <div className="input-group">
                                          <Form.Control
                                            id="formControlsTextB"
                                            type="text"
                                            label="Text"
                                            readOnly
                                            value={
                                              searchCreateStartDate &&
                                              searchCreateEndDate !== undefined
                                                ? searchCreateStartDate.format(
                                                    "MM/DD/YYYY"
                                                  ) +
                                                  " to " +
                                                  searchCreateEndDate.format(
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

                                  <div
                                    className="fl_eq_box"
                                    style={{ marginRight: "1%" }}
                                  >
                                    <label className="searchHead">
                                      Presale
                                    </label>
                                    <Form.Control
                                      // className="search_icon"
                                      as="select"
                                      value={presaleSearchKey}
                                      // placeholder="Search..."
                                      onChange={evt => {
                                        setPresaleSearchKey(evt.target.value);
                                      }}
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
                                        onClick={() => onFilterSearch()}
                                      >
                                        Search
                                      </Button>
                                      <button
                                        color="primary"
                                        type="button"
                                        className="btn-pill btn btn-primary clr_fil red_txt"
                                        onClick={() => {
                                          setShowLoader(true);
                                          closeLoaderIn5Seconds();
                                          setData(false);
                                          setSearchStartDate();
                                          setSearchEndDate();
                                          setSearchCreateStartDate();
                                          setSearchCreateEndDate();
                                          setPresaleSearchKey("");
                                          setStart(start);
                                          setEnd(end);
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

                  <div className="col-sm-12">
                    <div className="fl_w">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="white_box mrgbtm50">
                            <div className="cm_ttl dis_inline">
                              <h2>Presale/Onsale Event Queue</h2>
                            </div>

                            <div className="inner_box_body padL3T5 dashboard-table-body">
                              <div className="tbl_main order_tbl_main nw_od_cls">
                                <div className="inner_tbl">
                                  <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                                    <div className="inner_tbl">
                                      {isEventQueueFetching ? (
                                        <Spinner spinnerTime={false} />
                                      ) : showLoader ? (
                                        <Spinner spinnerTime={false} />
                                      ) : (
                                        <BootstrapTable
                                          data={
                                            !data
                                              ? eventMonitor.eventsAdded
                                                ? eventMonitor.eventsAdded
                                                    .sortedEventQueueListings
                                                : []
                                              : newData
                                          }
                                          version="4"
                                          striped
                                          hover
                                          pagination
                                          options={options}
                                          cellEdit={cellEditProp}
                                          selectRow={selectRow}
                                          deleteRow
                                          insertBtn
                                          tableHeaderClass="custom-select-header-class"
                                          tableBodyClass="custom-select-body-class"
                                          expandableRow={isExpandRow}
                                          expandComponent={expandRow}
                                          expandColumnOptions={{
                                            expandColumnVisible: true
                                          }}
                                          search
                                          blurToSave={true}
                                        >
                                          <TableHeaderColumn
                                            dataField="_id"
                                            isKey
                                            hidden
                                            expandable={false}
                                            // dataFormat={urlFormatter}
                                            editable={false}
                                          >
                                            EventId/TM URL
                                          </TableHeaderColumn>
                                          <TableHeaderColumn
                                            dataField="eventId"
                                            expandable={false}
                                            dataFormat={urlFormatter}
                                            editable={false}
                                          >
                                            EventId/TM URL
                                          </TableHeaderColumn>

                                          <TableHeaderColumn
                                            dataFormat={detailsFormatter}
                                            dataField="eventDetails"
                                            sort={"asc"}
                                            dataSort
                                            sortFunc={dateSortFuncForEvent}
                                          >
                                            Event Details
                                          </TableHeaderColumn>

                                          <TableHeaderColumn
                                            dataField="created_date"
                                            dataSort
                                            expandable={false}
                                            editable={false}
                                            sort={"asc"}
                                            // dataFormat={dateFormatter}
                                            dataFormat={createdDateFormatter}
                                            //width="8%"
                                          >
                                            Blacklist
                                          </TableHeaderColumn>

                                          {/* <TableHeaderColumn
                                            expandable={false}
                                            //dataField="is_deleted"
                                            dataField="is_blackList"
                                            editable={false}
                                            //  width="12%"
                                            dataFormat={backListFormatter}
                                          >
                                            BlackList
                                          </TableHeaderColumn> */}
                                          <TableHeaderColumn
                                            dataField="eventId"
                                            hidden
                                          >
                                            eventId
                                          </TableHeaderColumn>
                                          <TableHeaderColumn
                                            dataField="eventName"
                                            hidden
                                          >
                                            EventName
                                          </TableHeaderColumn>
                                          <TableHeaderColumn
                                            dataField="eventAddress"
                                            hidden
                                          >
                                            Venue
                                          </TableHeaderColumn>
                                          <TableHeaderColumn
                                            expandable={false}
                                            dataField="button"
                                            dataFormat={buttonFormatter}
                                            dataAlign="center"
                                            editable={false}
                                            width="20%"
                                          >
                                            Action
                                          </TableHeaderColumn>
                                        </BootstrapTable>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="white_box mrgbtm50">
                                <div className="cm_ttl dis_inline">
                                  <h2>Re-Monitor presale Events</h2>
                                </div>

                                <div className="inner_box_body padL3T5 dashboard-table-body">
                                  <div className="tbl_main  order_tbl_main">
                                    <div className="inner_tbl">
                                      <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                                        <div className="inner_tbl">
                                          {showLoader ? (
                                            <Spinner spinnerTime={false} />
                                          ) : isRemonitorPresaleFetching ? (
                                            <Spinner spinnerTime={false} />
                                          ) : (
                                            <BootstrapTable
                                              data={
                                                !data
                                                  ? eventMonitor.reMonitorPresale
                                                    ? eventMonitor.reMonitorPresale
                                                    : []
                                                  : newDataRemonitorPresale
                                              }
                                              version="4"
                                              striped
                                              hover
                                              pagination
                                              options={optionRemonitorPresale}
                                              cellEdit={cellEditProp}
                                              tableHeaderClass="custom-select-header-class"
                                              tableBodyClass="custom-select-body-class"
                                              expandableRow={isExpandRow}
                                              expandComponent={expandRow}
                                              expandColumnOptions={{
                                                expandColumnVisible: true
                                              }}
                                              search
                                              blurToSave={true}
                                            >
                                              <TableHeaderColumn
                                                dataField="_id"
                                                isKey
                                                hidden
                                                expandable={false}
                                                // dataFormat={urlFormatter}
                                                editable={false}
                                              >
                                                EventId/TM URL
                                              </TableHeaderColumn>
                                              <TableHeaderColumn
                                                dataField="eventId"
                                                expandable={false}
                                                dataFormat={urlFormatter}
                                                editable={false}
                                              >
                                                EventId/TM URL
                                              </TableHeaderColumn>

                                              <TableHeaderColumn
                                                dataFormat={detailsFormatter}
                                                dataField="eventDetails"
                                                sort={"asc"}
                                                dataSort
                                                sortFunc={dateSortFuncForEvent}
                                              >
                                                Event Details
                                              </TableHeaderColumn>

                                              <TableHeaderColumn
                                                dataField="created_date"
                                                dataSort
                                                expandable={false}
                                                editable={false}
                                                sort={"asc"}
                                                // dataFormat={dateFormatter}
                                                dataFormat={
                                                  createdDateFormatter
                                                }
                                                formatExtraData="isFromRemonitorPresaleTable"
                                                //width="8%"
                                              >
                                                Blacklist
                                              </TableHeaderColumn>

                                              {/* <TableHeaderColumn
                                                expandable={false}
                                                //dataField="is_deleted"
                                                dataField="is_blackList"
                                                editable={false}
                                                // width="5%"
                                                dataFormat={backListFormatter}
                                                formatExtraData="isFromRemonitorPresaleTable"
                                              >
                                                BlackList
                                              </TableHeaderColumn> */}
                                              <TableHeaderColumn
                                                dataField="eventId"
                                                hidden
                                              >
                                                eventId
                                              </TableHeaderColumn>
                                              <TableHeaderColumn
                                                dataField="eventName"
                                                hidden
                                              >
                                                EventName
                                              </TableHeaderColumn>
                                              <TableHeaderColumn
                                                dataField="eventAddress"
                                                hidden
                                              >
                                                Venue
                                              </TableHeaderColumn>
                                              <TableHeaderColumn
                                                expandable={false}
                                                dataField="button"
                                                dataFormat={buttonFormatter}
                                                formatExtraData="isFromRemonitorPresaleTable"
                                                dataAlign="center"
                                                editable={false}
                                                width="20%"
                                              >
                                                Action
                                              </TableHeaderColumn>
                                            </BootstrapTable>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="white_box mrgbtm50">
                                <div className="cm_ttl dis_inline">
                                  <h2>On Countdown Event Queue</h2>
                                </div>
                                {/* <OnCountDownEventQueue
                              isEventQueueFetching={isEventQueueFetching}
                              eventMonitor={eventMonitor}
                              options={options}
                              cellEditProp={cellEditProp}
                              isExpandRow={isExpandRow}
                              expandRow={expandRow}
                              urlFormatter={urlFormatter}
                              detailsFormatter={detailsFormatter}
                              dateSortFuncForEvent={dateSortFuncForEvent}
                              dateFormatter={dateFormatter}
                              buttonFormatter={buttonFormatter}
                            /> */}

                                <div className="inner_box_body padL3T5 dashboard-table-body">
                                  <div className="tbl_main  order_tbl_main">
                                    <div className="inner_tbl">
                                      <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                                        <div className="inner_tbl">
                                          {isEventQueueFetching ? (
                                            <Spinner spinnerTime={false} />
                                          ) : showLoader ? (
                                            <Spinner spinnerTime={false} />
                                          ) : (
                                            <BootstrapTable
                                              data={
                                                !data
                                                  ? eventMonitor.onCountPresale
                                                    ? eventMonitor.onCountPresale
                                                    : []
                                                  : newDataCountdown
                                              }
                                              version="4"
                                              striped
                                              hover
                                              pagination
                                              options={optionCountDown}
                                              cellEdit={cellEditProp}
                                              selectRow={selectRow}
                                              deleteRow
                                              insertBtn
                                              tableHeaderClass="custom-select-header-class"
                                              tableBodyClass="custom-select-body-class"
                                              expandableRow={isExpandRow}
                                              expandComponent={expandRow}
                                              expandColumnOptions={{
                                                expandColumnVisible: true
                                              }}
                                              search
                                              blurToSave={true}
                                            >
                                              <TableHeaderColumn
                                                dataField="_id"
                                                isKey
                                                hidden
                                                expandable={false}
                                                // dataFormat={urlFormatter}
                                                editable={false}
                                              >
                                                EventId/TM URL
                                              </TableHeaderColumn>
                                              <TableHeaderColumn
                                                dataField="eventId"
                                                expandable={false}
                                                dataFormat={urlFormatter}
                                                editable={false}
                                              >
                                                EventId/TM URL
                                              </TableHeaderColumn>

                                              <TableHeaderColumn
                                                dataFormat={detailsFormatter}
                                                dataField="eventDetails"
                                                sort={"asc"}
                                                dataSort
                                                sortFunc={dateSortFuncForEvent}
                                              >
                                                Event Details
                                              </TableHeaderColumn>

                                              <TableHeaderColumn
                                                dataField="created_date"
                                                dataSort
                                                expandable={false}
                                                editable={false}
                                                sort={"asc"}
                                                // dataFormat={dateFormatter}
                                                dataFormat={
                                                  createdDateFormatter
                                                }
                                                formatExtraData="isFromCountTable"
                                                //width="8%"
                                              >
                                                Blacklist
                                              </TableHeaderColumn>

                                              {/* <TableHeaderColumn
                                                expandable={false}
                                                //dataField="is_deleted"
                                                dataField="is_blackList"
                                                editable={false}
                                                // width="5%"
                                                dataFormat={backListFormatter}
                                                formatExtraData="isFromCountTable"
                                              >
                                                BlackList
                                              </TableHeaderColumn> */}
                                              <TableHeaderColumn
                                                dataField="eventId"
                                                hidden
                                              >
                                                eventId
                                              </TableHeaderColumn>
                                              <TableHeaderColumn
                                                dataField="eventName"
                                                hidden
                                              >
                                                EventName
                                              </TableHeaderColumn>
                                              <TableHeaderColumn
                                                dataField="eventAddress"
                                                hidden
                                              >
                                                Venue
                                              </TableHeaderColumn>
                                              <TableHeaderColumn
                                                expandable={false}
                                                dataField="button"
                                                dataFormat={buttonFormatter}
                                                formatExtraData="isFromCountTable"
                                                dataAlign="center"
                                                editable={false}
                                                width="20%"
                                              >
                                                Action
                                              </TableHeaderColumn>
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

                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl dis_inline">
                      <h2>UnMatched Events Table</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                        <div className="inner_tbl">
                          <UnMatchedEvents
                            isFetching={isUnmatchedEventFetching}
                            unmatchedEventsQueue={
                              unmatchedEventsQueue.unmatchedEventsAdded
                            }
                            totalListings={unmatchedEventsQueue.totalListing}
                            currentPage={unmatchedEventsQueue.page}
                            fetchUnmatchedEventQueueRequest={
                              fetchUnmatchedEventQueueRequest
                            }
                            archiveEventsRequest={archiveEventsRequest}
                            createManagedQueueEventsRequest={
                              createManagedQueueEventsRequest
                            }
                            saveSelectEvent={saveSelectEvent}
                            clearSelectEvent={clearSelectEvent}
                            isEventFetching={isEventFetching}
                            isLoadingFrom={isLoadingFrom}
                            setIsLoadingFrom={setIsLoadingFrom}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="white_box mrgbtm50">
                    <div className="cm_ttl dis_inline">
                      <h2>MisMatch Events Table</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                        <div className="inner_tbl">
                          <MisMatchedEvents
                            isFetching={isMisMatchEventFetching}
                            misMatchedEventsQueue={
                              misMatchedEventsQueue.misMatchedEvents
                            }
                            totalListings={misMatchedEventsQueue.totalEvent}
                            currentPage={misMatchedEventsQueue.page}
                            fetchMisMatchedEventQueueRequest={
                              fetchMisMatchedEventQueueRequest
                            }
                            createManagedQueueEventsRequest={
                              createManagedQueueEventsRequest
                            }
                            isEventFetching={isEventFetching}
                            isLoadingFrom={isLoadingFrom}
                            setIsLoadingFrom={setIsLoadingFrom}
                          />
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl dis_inline">
                      <h2>ShowOnSale missing</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                        <div className="inner_tbl">
                          <ShowOnSale
                            fetchShowOnSaleRequest={fetchShowOnSaleRequest}
                            showsOnSaleEvents={
                              showsOnSaleEvents.unMatchedEvents
                            }
                            isFetching={isFetching}
                            isShowsOnSaleMatchedEventFetching={
                              isShowsOnSaleMatchedEventFetching
                            }
                            createManagedQueueEventsRequest={
                              createManagedQueueEventsRequest
                            }
                            isEventFetching={isEventFetching}
                            isFetchedFromUnmatch={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl dis_inline">
                      <h2>ShowOnSale Matched Events</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                        <div className="inner_tbl">
                          <ShowOnSale
                            fetchShowOnSaleRequest={fetchShowOnSaleRequest}
                            showsOnSaleEvents={showsOnSaleEvents.matchedEvents}
                            isFetching={isFetching}
                            createManagedQueueEventsRequest={
                              createManagedQueueEventsRequest
                            }
                            isEventFetching={isEventFetching}
                            isShowsOnSaleMatchedEventFetching={
                              isShowsOnSaleMatchedEventFetching
                            }
                            isFetchedFromMatch={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {blackListSectionModel ? (
                    <BlackListSection
                      isBlackListingFetching={isBlackListingFetching}
                      isAddBlackListFetching={isAddBlackListFetching}
                      addBlackListPriceSectionRequest={
                        addBlackListPriceSectionRequest
                      }
                      FetchBlackListPriceSectionRequest={
                        FetchBlackListPriceSectionRequest
                      }
                      updateIsBlackListRequest={updateIsBlackListRequest}
                      blackListInfo={blackListInfo}
                      // eventId={eventId}
                      eventDBId={eventDBId}
                      blackListData={blackListData}
                      is_blackList={is_blackList}
                      blacklistedSections={blacklistedSections}
                      isBlackListModal={isBlackListModalOpen =>
                        setBlackListSectionModal(isBlackListModalOpen)
                      }
                    />
                  ) : (
                    ""
                  )}

                  {showEventPromo ? (
                    <EventAdd
                      Rowdata={RowdataForPromo}
                      onModalClose={onModalClose}
                      appReceiveAlert={appReceiveAlert}
                      eventIdFromQueue={eventId}
                      eventDBIdFromQueue={eventDBId}
                      addEventPromoRequest={addEventPromoRequest}
                      fetchEventPromosRequest={fetchEventPromosRequest}
                      deleteEventPromosFromAddPromoRequest={
                        deleteEventPromosFromAddPromoRequest
                      }
                      isEventAdd={isEventAddOpen =>
                        setShowEventPromo(isEventAddOpen)
                      }
                      isCommingFromQueuePage={true}
                      eventAvailablePromosFetching={
                        eventAvailablePromosFetching
                      }
                      fetchEventAvailablePromoRequest={
                        fetchEventAvailablePromoRequest
                      }
                      isFromCountTable={extraDataForEventAdd}
                      availablePromoNames={availablePromoNames}
                      clearAvailablePromos={clearAvailablePromoNames}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventQueue;
