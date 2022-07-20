/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { percentFormatter } from "../../components/TableColumnFormatter";

import Accordion from "react-bootstrap/Accordion";

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable";
import BlackListSection from "./BlackListSection";

// import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-daterangepicker/daterangepicker.css";

//import DatetimeRangePicker from "react-bootstrap-daterangepicker"
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import ReactAutocomplete from "react-autocomplete";
import { checkForBackWordPagination } from "../../utils/validation";
import moment from "moment-timezone";
import EventAdd from "../Promos/EventAdd";
import useStateRef from "react-usestateref";
import { ALERT_MSG_ERROR } from "../../constants";

let blackListData = [];
let paginationArray = [];

var rowdata = [];
const onRowSelect = (row, isSelected, e) => {
  if (isSelected) {
    rowdata.push(row._id);
  } else {
    rowdata = rowdata.filter(e => {
      return e != row._id;
    });
    // rowdata = []
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
  showOnlySelected: true,
  clickToExpand: true,
  customComponent: CustomMultiSelectTable,
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
      if (key == newValue) oldValue[newValue] = row;
    });
  }
};
const urlFormatter = (cell, row) => {
  return (
    <a
      href={
        row.eventUrl !== undefined && row.eventUrl !== null
          ? row.eventUrl
          : row.ticketMasterUrl
      }
      target="_blank"
    >
      {row.eventId}
    </a>
  );
};

var Rowdata = [];
const ManagedEvents = ({
  managedEvents,
  saveSelectEvent,
  saveSelectedEventFrom,
  fetchManagedEventsRequest,
  fetchManagedEventsByKeywordRequest,
  fetchManagedEventsFilterRequest,
  fetchManagedEventsSearchRequest,
  updateManagedEventsRequest,
  deleteManagedEventsRequest,
  history,
  match,
  broadcastListingRequest,
  userOverrideAvaiRequest,
  clearManagedEvents,
  isFetching,
  updateIsBlackListRequest,
  fetchEventInfoByEventIdRequest,
  groups,
  validListings,
  trackedListings,
  isBlackListingFetching,
  isAddBlackListFetching,
  FetchBlackListPriceSectionRequest,
  deleteBlackListSectionRequest,
  fetchValidListingsRequest,
  blackListInfo,
  addBlackListPriceSectionRequest,
  fetchAvailableOfferRequest,
  updatePriceMarkUpPctRequest,
  availableOffers,
  fetchEventPromosRequest,
  deleteEventPromosFromAddPromoRequest,
  fetchEventAvailablePromoRequest,
  addEventPromoRequest,
  appReceiveAlert,
  availablePromoNames,
  clearAvailablePromoNames,
  updateEventBySkyboxEventIdRequest,
  bulkUpdatePriceMarkUpPctRequest,
  fetchEventsPerformersRequest,
  eventsPerformers
}) => {
  // if (managedEvents.bookMarks != undefined) {
  //   if (!paginationArray.includes(managedEvents.bookMarks)) {
  //     paginationArray.push(managedEvents.bookMarks)
  //   }
  // }
  const { keyword } = match.params;
  const [eventKey, setEventKey, eventKeyRef] = useStateRef(
    keyword ? keyword : ""
  );
  const [tmEventIdKey, settmEventIdKey, tmEventIdKeyRef] = useStateRef("");
  const [venueKey, setvenueKey, venueKeyRef] = useStateRef("");
  const [
    skyBoxEventIdKey,
    setskyBoxEventIdKey,
    skyBoxEventIdKeyRef
  ] = useStateRef("");

  const [
    searchStartDate,
    setSearchStartDate,
    searchStartDateRef
  ] = useStateRef();
  const [searchEndDate, setSearchEndDate, searchEndDateRef] = useStateRef();
  const [isSearch, setIsSearch] = useState(keyword ? true : false);
  const [
    presaleSearchKey,
    setPresaleSearchKey,
    presaleSearchKeyRef
  ] = useStateRef("");
  const [availableOffer, setAvailableOffer, availableOfferRef] = useStateRef(
    ""
  );
  const [blackList, setBlackList, blackListRef] = useStateRef("");
  const [
    availableOfferKey,
    setAvailableOfferKey,
    availableOfferKeyRef
  ] = useStateRef("");
  const [blackListSectionModel, setBlackListSectionModal] = useState(false);
  const [eventId, setEventId] = useState("");
  const [eventDBId, setEventDBId] = useState("");
  const [is_blackList, setIsBlackList] = useState("");
  const [blacklistedSections, setBlacklistedSections] = useState("");
  const [marketType, setMarketType, marketTypeRef] = useStateRef("");
  const btnSearchRef = useRef(null);
  const [ModalClose, onModalClose] = useState(true);
  const [showEventPromo, setShowEventPromo] = useState(false);

  // const [totalSize, setTotalSize] = useState()
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
  const [isSkyBoxEventId, setIsSkyBoxEventId] = useState(false);
  const [skyboxEventId, setSkyboxEventId] = useState("");
  const [eventPerformer, setEventPerformer, eventPerformerRef] = useStateRef(
    ""
  );

  var blacklistReason = "";
  var blacklistReasonSelected = "";

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

  const resetFilters = e => {
    e.preventDefault();
    setEventKey("");
    setSearchStartDate();
    setSearchEndDate();
    settmEventIdKey("");
    setvenueKey("");
    setskyBoxEventIdKey("");
    setPresaleSearchKey("");
    setAvailableOfferKey("");
    setAvailableOffer("");
    setBlackList("");
    setMarketType("");
    setIsSearch(false);
    clearManagedEvents();
    setEventPerformer("");
    initialSearchCall();
    setSizePerPage(20);
  };

  const initialSearchCall = () => {
    fetchManagedEventsRequest({
      searchStartDate: searchStartDateRef.current
        ? searchStartDateRef.current
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss")
        : "",
      searchEndDate: searchEndDateRef.current
        ? searchEndDateRef.current.endOf("day").format("YYYY-MM-DD HH:mm:ss")
        : "",
      eventKey: eventKeyRef.current,
      tmEventIdKey: tmEventIdKeyRef.current,
      venueKey: venueKeyRef.current,
      skyBoxEventIdKey: skyBoxEventIdKeyRef.current,
      availableOffer: availableOfferRef.current,
      availableOfferKey: availableOfferKeyRef.current,
      presaleSearchKey: presaleSearchKeyRef.current,
      blackList: blackListRef.current,
      marketType: marketTypeRef.current,
      eventPerformer: eventPerformerRef.current,
      page,
      sizePerPage
    });
  };

  // var bookMarks = ""
  useEffect(() => {
    function fetchInitial() {
      fetchManagedEventsRequest({
        searchStartDate: searchStartDate
          ? searchStartDate.startOf("day").format("YYYY-MM-DD HH:mm:ss")
          : "",
        searchEndDate: searchEndDate
          ? searchEndDate.endOf("day").format("YYYY-MM-DD HH:mm:ss")
          : "",
        eventKey: keyword ? keyword : eventKey,
        tmEventIdKey,
        venueKey,
        skyBoxEventIdKey,
        presaleSearchKey,
        availableOffer,
        availableOfferKey,
        blackList,
        marketType,
        eventPerformer,
        // bookMarks,
        page,
        sizePerPage
      });

      fetchAvailableOfferRequest();
      fetchEventsPerformersRequest();
    }
    fetchInitial();
  }, []);

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          <span>
            {dropRowKeys === undefined
              ? next.row.is_blackList === true
                ? "Are you sure you want to unblackList this managed events"
                : "Are you sure you want to blackList this managed events?"
              : "Are you sure you want to delete these managed events?"}
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
          label: "Cancel"
        },
        {
          label: "Confirm",
          onClick: () => {
            if (dropRowKeys !== undefined) {
              updateIsBlackListRequest({
                eventId: dropRowKeys,
                is_blackList: true,
                blacklistReason,
                searchPayload: {
                  searchStartDate: searchStartDate
                    ? searchStartDate
                        .startOf("day")
                        .format("YYYY-MM-DD HH:mm:ss")
                    : "",
                  searchEndDate: searchEndDate
                    ? searchEndDate.endOf("day").format("YYYY-MM-DD HH:mm:ss")
                    : "",
                  eventKey,
                  tmEventIdKey,
                  venueKey,
                  skyBoxEventIdKey,
                  presaleSearchKey,
                  availableOffer,
                  availableOfferKey,
                  blackList,
                  marketType,
                  // bookMarks,
                  page,
                  sizePerPage
                }
              });
              next();
            } else {
              updateIsBlackListRequest({
                eventId: [next.row._id],
                is_blackList: next.is_blackList,
                blacklistReason,
                searchPayload: {
                  searchStartDate: searchStartDate
                    ? searchStartDate
                        .startOf("day")
                        .format("YYYY-MM-DD HH:mm:ss")
                    : "",
                  searchEndDate: searchEndDate
                    ? searchEndDate.endOf("day").format("YYYY-MM-DD HH:mm:ss")
                    : "",
                  eventKey,
                  tmEventIdKey,
                  venueKey,
                  skyBoxEventIdKey,
                  presaleSearchKey,
                  availableOffer,
                  availableOfferKey,
                  blackList,
                  marketType,
                  // bookMarks,
                  page,
                  sizePerPage
                }
              });
            }
          }
        }
      ]
    });
  };

  const onCustomPricingClick = () => {
    let pctValue, isPriceMarkupPct;
    if (rowdata.length !== 0) {
      console.log("rowdata :", rowdata);
      confirmAlert({
        title: "Bulk Pricing Update",
        message: (
          <div className="pricing-popup">
            <div className="row">
              <div className="col-sm-12 fl_eq_box">
                <label className="searchHead"></label>
                <Form.Control
                  type="Number"
                  placeholder="Custom Pricing"
                  onChange={evt => {
                    pctValue = evt.target.value;
                  }}
                />
              </div>
              <div className="pricing-status">
                <label className="searchHead">Custom Pricing Status</label>
                <div className="is_blackList tbl_btn">
                  <div className="switch btn on btn-primary custom_price_toggle">
                    <BootstrapSwitchButton
                      checked={false}
                      onChange={evt => {
                        isPriceMarkupPct = evt;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        closeOnClickOutside: false,
        buttons: [
          {
            label: "Cancel"
          },
          {
            label: "Confirm",
            onClick: () => {
              let selectedEventIdList = rowdata;
              rowdata = [];
              bulkUpdatePriceMarkUpPctRequest({
                eventIds: selectedEventIdList,
                priceMarkupPct: pctValue,
                is_priceMarkupPct: isPriceMarkupPct,
                filter: {
                  searchStartDate: searchStartDate
                    ? searchStartDate
                        .startOf("day")
                        .format("YYYY-MM-DD HH:mm:ss")
                    : "",
                  searchEndDate: searchEndDate
                    ? searchEndDate.endOf("day").format("YYYY-MM-DD HH:mm:ss")
                    : "",
                  eventKey,
                  tmEventIdKey,
                  venueKey,
                  skyBoxEventIdKey,
                  presaleSearchKey,
                  availableOffer,
                  availableOfferKey,
                  blackList,
                  marketType,
                  eventPerformer,
                  page,
                  sizePerPage
                }
              });
            }
          }
        ]
      });
    }
  };

  const buttonFormatter = (cell, row, colIndex, column) => {
    return (
      <div className="tbl_btn bbtn_cls" id={row.eventId}>
        <Button
          className="icon_btn"
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            saveSelectEvent(row);
            saveSelectedEventFrom("ManagedEvents");
            var win = window.open(`/#/event/${row.eventId}`, "_blank");
            win.window.from = "ManagedEvents";
            win.focus();
          }}
        >
          Details
        </Button>

        <Button
          className="icon_btn"
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            const {
              eventId,
              skyBoxEventId,
              stockType,
              markupPct,
              priceMarkupPct,
              _id,
              promoName,
              promoCode
            } = row;
            updateManagedEventsRequest({
              eventId: _id,
              body: {
                skyBoxEventId,
                stockType,
                markupPct,
                priceMarkupPct
              }
            });
          }}
        >
          Update
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
            blackListData = row.blackListData;
            setBlackListSectionModal(true);
          }}
        >
          BlackList Info
        </Button>

        <Button
          className="icon_btn"
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            setShowEventPromo(true);
            if (row.promoName === "") {
              Rowdata = undefined;
              setEventId(row.eventId);
              setEventDBId(row._id);
            } else {
              Rowdata = row;
              setEventId(row.eventId);
              setEventDBId(row._id);
            }
          }}
        >
          Edit Promos
        </Button>
      </div>
    );
  };

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner with_button">
          <label>SkyBox EventId</label>{" "}
          {isSkyBoxEventId && skyboxEventId === row.eventId ? (
            <>
              <Form.Control
                type="text"
                className="orderFlowDetails_form_control"
                id={row.eventId}
                defaultValue={`${row.skyBoxEventId || ""}`}
                onChange={evt => {
                  row.skyBoxEventId = evt.target.value;
                }}
              />
              <Button
                className="orderFlowDetails_tm_btn"
                variant="primary"
                id={row.eventId}
                onClick={() => {
                  let skyBoxEventId = row.skyBoxEventId;
                  if (skyBoxEventId !== "") {
                    updateEventBySkyboxEventIdRequest({
                      data: {
                        skyBoxEventId: skyBoxEventId,
                        eventId: row._id
                      }
                    });
                    setIsSkyBoxEventId(false);
                  } else {
                    appReceiveAlert({
                      type: ALERT_MSG_ERROR,
                      message: "Please enter Skybox Event Id"
                    });
                  }
                }}
              >
                Update
              </Button>
            </>
          ) : (
            <>
              <span className="row_val">
                <a
                  href={`https://www.vividseats.com/production/${row.skyBoxEventId}`}
                  target="_blank"
                >
                  {row.skyBoxEventId ? `${row.skyBoxEventId}` : <>&nbsp;</>}
                </a>
                <Button
                  className="orderFlowDetails_tm_btn"
                  variant="primary"
                  onClick={() => {
                    setIsSkyBoxEventId(true);
                    setSkyboxEventId(row.eventId);
                  }}
                  style={{ cursor: "pointer", display: "block" }}
                >
                  Edit
                </Button>
              </span>
            </>
          )}
        </div>
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
          <span className="row_val">{`${
            row.availableOffers !== null &&
            row.availableOffers !== undefined &&
            row.availableOffers !== ""
              ? true
              : false
          }`}</span>
        </div>
        {/* <div className="expand_row_inner">
          <label>AISuggested Markup</label>{" "}
          <span className="row_val"> {`${row.aiSuggestedMarkup}`} </span>
        </div> */}
        <div className="expand_row_inner">
          <label>PreSale</label>{" "}
          <span className="row_val">
            {" "}
            {`${
              row.presales !== null && Array.isArray(row.presales)
                ? true
                : false
            }`}{" "}
          </span>
        </div>

        <div className="expand_row_inner">
          <label>Monitor Time</label>{" "}
          <span className="row_val"> {`${row.monitorTime}`} </span>
        </div>
      </div>
    );
  };

  const iconFormatter = (cell, row) => {
    if (cell) {
      return (
        <div className="green_txt">
          <i className="fa fa-check"></i>
        </div>
      );
    } else {
      return (
        <div className="red_txt">
          <i className="fa fa-times"></i>
        </div>
      );
    }
  };

  const backListFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.is_blackList === true ? true : false}
            onChange={evt => {
              const payload = {
                eventId: row.eventId,
                is_blackList: evt,
                row: row
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

  const customPricingFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <div className="custom_price_toggle">
          <BootstrapSwitchButton
            checked={row.is_priceMarkupPct === true ? true : false}
            onChange={evt => {
              updatePriceMarkUpPctRequest({
                eventId: row._id,
                pctValue: row.priceMarkupPct,
                isPctValue: evt
              });
            }}
          />
        </div>
      </div>
    );
  };

  const jockeyAlgoRepriceFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <div className="jockeyAlgoReprice_toggle">
          <BootstrapSwitchButton
            checked={row.is_JokeyAlgo === true ? true : false}
            onChange={evt => {
              const is_JockeyAlgoReprice = evt;
              const eventId = row._id;
              updateManagedEventsRequest({
                eventId,
                body: {
                  is_JokeyAlgo: is_JockeyAlgoReprice
                }
              });
            }}
          />
        </div>
      </div>
    );
  };

  const broadcastFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <BootstrapSwitchButton
          checked={row.is_broadcast}
          onChange={evt => {
            const payload = {
              eventIds: [row._id],
              isBroadcasting: evt
            };

            broadcastListingRequest(payload);
          }}
        />
      </div>
    );
  };

  const handlePageChange = (page, sizePerPage) => {
    // setSizePerPage(sizePerPage)

    fetchManagedEventsRequest({
      searchStartDate: searchStartDate
        ? searchStartDate.startOf("day").format("YYYY-MM-DD HH:mm:ss")
        : "",
      searchEndDate: searchEndDate
        ? searchEndDate.endOf("day").format("YYYY-MM-DD HH:mm:ss")
        : "",
      eventKey,
      tmEventIdKey,
      venueKey,
      skyBoxEventIdKey,
      availableOffer,
      availableOfferKey,
      presaleSearchKey,
      blackList,
      marketType,
      eventPerformer,
      // bookMarks:
      //   managedEvents.bookMarks != undefined && managedEvents.bookMarks != ""
      //     ? managedEvents.bookMarks
      //     : "",
      page,
      sizePerPage
    });
    // }
  };

  const isExpandRow = () => {
    return true;
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
  };

  const handleApply = (event, picker) => {
    setSearchStartDate(picker.startDate);
    setSearchEndDate(picker.endDate);
  };

  const applyCallback = (startDate, endDate) => {
    // setStart(startDate)
    // setEnd(endDate)
    setSearchStartDate(startDate);
    setSearchEndDate(endDate);
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
          onClick={onCustomPricingClick}
        >
          Apply Custom Pricing
        </Button>
      </>
    );
  };

  const options = {
    page: managedEvents.page, // which page you want to show as default
    // sizePerPageList: [20, 50, 100, 250, 500],
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
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: customConfirm,
    // defaultSortName: "formattedEventDate", // default sort column name
    // defaultSortOrder: "asc", // default sort order
    expandBy: "column",
    onPageChange: handlePageChange,
    // onSizePerPageChange : handleSizePerPage,
    noDataText: noDataHandler(),
    onRowClick: function(row, columnIndex, rowIndex, e) {
      if (
        e.target.parentNode.parentElement.parentElement.className ===
        "jockeyAlgoReprice_toggle"
      ) {
        if (e.target.offsetParent.className === "switch-group") {
          if (row.is_JokeyAlgo === true) return (row.is_JokeyAlgo = false);
          else return (row.is_JokeyAlgo = true);
        }
      } else if (
        e.target.parentNode.parentElement.parentElement.className ===
        "custom_price_toggle"
      ) {
        if (e.target.offsetParent.className === "switch-group") {
          if (row.is_priceMarkupPct === true)
            return (row.is_priceMarkupPct = false);
          else return (row.is_priceMarkupPct = true);
        }
      } else if (
        e.target.parentNode.parentElement.parentElement.className !==
        "is_blackList"
      ) {
        if (e.target.offsetParent.className === "switch-group") {
          if (row.is_broadcast === true) return (row.is_broadcast = false);
          else return (row.is_broadcast = true);
        }
      } else {
        if (row.is_blackList === true) return (row.is_blackList = false);
        else return (row.is_blackList = true);
      }
    }
  };
  function remote(remoteObj) {
    // it means that only pagination you will handle by your own
    remoteObj.pagination = true;
    remoteObj.cellEdit = true;
    return remoteObj;
  }

  const handleKeypress = () => {
    btnSearchRef.current.click();
  };

  const promoNameFormatter = (cell, row) => {
    var str = [];
    for (var i = 0; i < cell.length; i++) {
      str.push(
        <>
          <span>{`${cell[i]} ${
            i !== cell.length - 1 &&
            cell[i] !== undefined &&
            cell[i] !== null &&
            cell[i] !== "" &&
            cell[i + 1] !== undefined &&
            cell[i + 1] !== null &&
            cell[i + 1] !== ""
              ? ","
              : ""
          }`}</span>
          <br />
        </>
      );
    }
    return <div>{str}</div>;
  };

  const promoCodeFormatter = (cell, row) => {
    var str = [];
    for (var i = 0; i < cell.length; i++) {
      str.push(
        <>
          <span>{`${cell[i]} ${
            i !== cell.length - 1 &&
            cell[i] !== undefined &&
            cell[i] !== null &&
            cell[i] !== "" &&
            cell[i + 1] !== undefined &&
            cell[i + 1] !== null &&
            cell[i + 1] !== ""
              ? ","
              : ""
          }`}</span>
          <br />
        </>
      );
    }
    return <div>{str}</div>;
  };

  return (
    <div className="full_width">
      <div className="page_name">
        <h2>Managed Events Info</h2>
      </div>
      <div className="inner_main">
        <div className="full_width">
          <div className="row">
            <div className="col-sm-12">
              <div className="white_box mrgbtm50">
                <div className="cm_ttl">
                  <h2>Managed Events</h2>
                </div>
                <div className="inner_box_body padL3T5">
                  <div className="tbl_main  order_tbl_main nw_od_cls">
                    <div className="inner_tbl">
                      <div className="table_head acc_main">
                        <div className="filterCV">
                          <Accordion defaultActiveKey={keyword ? "0" : ""}>
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
                                  <div className="fl_eq_box">
                                    <label className="searchHead">
                                      Event Name
                                    </label>
                                    <Form.Control
                                      // className="search_icon"
                                      type="text"
                                      value={eventKey}
                                      placeholder="Search..."
                                      onChange={evt =>
                                        setEventKey(evt.target.value)
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
                                      TM Event Id
                                    </label>
                                    <Form.Control
                                      // className="search_icon"
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
                                    <label className="searchHead">Venue</label>
                                    <Form.Control
                                      // className="search_icon"
                                      type="text"
                                      value={venueKey}
                                      placeholder="Search..."
                                      onChange={evt =>
                                        setvenueKey(evt.target.value)
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
                                      SkyBox Event Id
                                    </label>
                                    <Form.Control
                                      // className="search_icon"
                                      type="text"
                                      value={skyBoxEventIdKey}
                                      placeholder="Search..."
                                      onChange={evt =>
                                        setskyBoxEventIdKey(evt.target.value)
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
                                  <div
                                    className="fl_eq_box autoComplete"
                                    style={{ position: "relative" }}
                                  >
                                    <label className="searchHead">
                                      Offer Name
                                    </label>
                                    {/* <Form.Control
                                // className="search_icon"
                                type="text"
                                value={availableOfferKey}
                                placeholder="Search..."
                                onChange={evt =>
                                  setAvailableOfferKey(evt.target.value)
                                }
                              /> */}

                                    <ReactAutocomplete
                                      getItemValue={item => item.label}
                                      items={availableOffers}
                                      shouldItemRender={(item, value) =>
                                        item
                                          .toLowerCase()
                                          .indexOf(value.toLowerCase()) > -1
                                      }
                                      getItemValue={item => item}
                                      renderItem={(item, isHighlighted) => (
                                        <div
                                          className="autoDropdown"
                                          key={item}
                                        >
                                          {item}
                                        </div>
                                      )}
                                      value={availableOffer}
                                      onChange={e =>
                                        setAvailableOffer(e.target.value)
                                      }
                                      onSelect={val => setAvailableOffer(val)}
                                      placeholder="Offers"
                                      menuStyle={{
                                        borderRadius: "3px",
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 2px 12px",
                                        background: "rgba(255, 255, 255, 0.9)",
                                        padding: "2px 0px",
                                        fontSize: "90%",
                                        position: "absolute",
                                        overflow: "auto",
                                        maxHeight: "350px",
                                        minWidth: "199px",
                                        zIndex: 1000,
                                        left: 0,
                                        top: "55px"
                                      }}
                                    />
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
                                      onChange={evt =>
                                        setPresaleSearchKey(evt.target.value)
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
                                    >
                                      <option value="">Show All</option>
                                      <option value="true">Show True</option>
                                      <option value="false">Show False</option>
                                    </Form.Control>
                                  </div>

                                  <div className="fl_eq_box">
                                    <label className="searchHead">
                                      Available Offer
                                    </label>
                                    <Form.Control
                                      // className="search_icon"
                                      as="select"
                                      value={availableOfferKey}
                                      // placeholder="Search..."
                                      onChange={evt =>
                                        setAvailableOfferKey(evt.target.value)
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
                                    >
                                      <option value="">Show All</option>
                                      <option value="true">Show True</option>
                                      <option value="false">Show False</option>
                                    </Form.Control>
                                  </div>
                                  <div className="fl_eq_box">
                                    <label className="searchHead">
                                      BlackList
                                    </label>
                                    <Form.Control
                                      // className="search_icon"
                                      as="select"
                                      value={blackList}
                                      // placeholder="Search..."
                                      onChange={evt =>
                                        setBlackList(evt.target.value)
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
                                    >
                                      <option value="">Show All</option>
                                      <option value="1">Show True</option>
                                      <option value="0">Show False</option>
                                    </Form.Control>
                                  </div>
                                  <div className="fl_eq_box">
                                    <label className="searchHead">
                                      Market Type
                                    </label>
                                    <Form.Control
                                      // className="search_icon"
                                      as="select"
                                      value={marketType}
                                      // placeholder="Search..."
                                      onChange={evt =>
                                        setMarketType(evt.target.value)
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
                                    >
                                      <option value="">Show All</option>
                                      <option value="AXS">AXS</option>
                                      <option value="eVenue">E-Venue</option>
                                      <option value="TM">TM</option>
                                      <option value="metopera">Metopera</option>
                                      <option value="nycballet">
                                        NYC Ballet
                                      </option>
                                      <option value="mlb">MLB</option>
                                      <option value="seatgeek_broadway">
                                        SeatGeek
                                      </option>
                                      <option value="broadway.com">
                                        Broadway.com
                                      </option>
                                    </Form.Control>
                                  </div>
                                  <div
                                    className="fl_eq_box autoComplete"
                                    style={{ position: "relative" }}
                                  >
                                    <label className="searchHead">
                                      Performers
                                    </label>
                                    <ReactAutocomplete
                                      items={eventsPerformers}
                                      getItemValue={item => item.performerName}
                                      shouldItemRender={(item, value) =>
                                        item.performerName
                                          .toLowerCase()
                                          .indexOf(value.toLowerCase()) > -1
                                      }
                                      renderItem={(item, isHighlighted) => (
                                        <div
                                          className="autoDropdown"
                                          key={item._id}
                                        >
                                          {item.performerName}
                                        </div>
                                      )}
                                      value={eventPerformer}
                                      onChange={e =>
                                        setEventPerformer(e.target.value)
                                      }
                                      onSelect={val => setEventPerformer(val)}
                                      placeholder="Offers"
                                      menuStyle={{
                                        borderRadius: "3px",
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 2px 12px",
                                        background: "rgba(255, 255, 255, 0.9)",
                                        padding: "2px 0px",
                                        fontSize: "90%",
                                        position: "absolute",
                                        overflow: "auto",
                                        maxHeight: "350px",
                                        minWidth: "199px",
                                        zIndex: 1000,
                                        left: 0,
                                        top: "55px"
                                      }}
                                    />
                                  </div>
                                  <div className="fl_eq_box">
                                    <label className="searchHead">
                                      Events Per Page
                                    </label>
                                    <Form.Control
                                      as="select"
                                      value={sizePerPage}
                                      onChange={evt =>
                                        setSizePerPage(evt.target.value)
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
                                    >
                                      <option value="20">20</option>
                                      <option value="50">50</option>
                                      <option value="100">100</option>
                                      <option value="250">250</option>
                                      <option value="500">500</option>
                                    </Form.Control>
                                  </div>

                                  <div className="fl_eq_box src_btn">
                                    <label className="searchHead">&nbsp;</label>
                                    <div className="fl_w">
                                      <Button
                                        color="primary"
                                        className="btn-pill"
                                        ref={btnSearchRef}
                                        onClick={() => {
                                          clearManagedEvents();
                                          setIsSearch(true);
                                          fetchManagedEventsRequest({
                                            searchStartDate: searchStartDate
                                              ? searchStartDate
                                                  .startOf("day")
                                                  .format("YYYY-MM-DD HH:mm:ss")
                                              : "",
                                            searchEndDate: searchEndDate
                                              ? searchEndDate
                                                  .endOf("day")
                                                  .format("YYYY-MM-DD HH:mm:ss")
                                              : "",
                                            eventKey,
                                            tmEventIdKey,
                                            venueKey,
                                            skyBoxEventIdKey,
                                            presaleSearchKey,
                                            availableOffer,
                                            availableOfferKey,
                                            blackList,
                                            marketType,
                                            eventPerformer,
                                            // bookMarks,
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
                        <div className="inner_tbl">
                          {isFetching ? (
                            <Spinner />
                          ) : (
                            <BootstrapTable
                              data={managedEvents.eventInfo}
                              version="4"
                              striped
                              hover
                              pagination
                              options={options}
                              cellEdit={cellEditProp}
                              selectRow={selectRow}
                              deleteRow
                              tableHeaderClass="custom-select-header-class"
                              tableBodyClass="custom-select-body-class"
                              expandableRow={isExpandRow}
                              expandComponent={expandRow}
                              expandColumnOptions={{
                                expandColumnVisible: true
                              }}
                              // search
                              fetchInfo={{
                                dataTotalSize: managedEvents.totalRow
                              }}
                              // cellClick={handleTableChange}
                              remote={remote}
                              blurToSave={true}
                            >
                              <TableHeaderColumn
                                dataField="formattedEventDate"
                                hidden
                              >
                                Date
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="_id" hidden isKey>
                                _id
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="eventId" hidden>
                                EventId/TM URL
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="eventName" hidden>
                                Event
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="eventAddress"
                                hidden
                              >
                                Location
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="skyBoxEventId"
                                hidden
                              >
                                SkyBoxEventId
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="presale" hidden>
                                PreSale
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="is_blackList"
                                hidden
                              >
                                BlackList
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="availableOffers"
                                hidden
                              >
                                availableOffers
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="marketType" hidden>
                                marketType
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
                                // sortFunc={dateSortFuncForEvent}
                              >
                                Date
                              </TableHeaderColumn>
                              {/* <TableHeaderColumn
                        expandable={false}
                        dataField="markupPct"
                        dataSort
                      >
                        MarkupPct
                      </TableHeaderColumn> */}
                              {/* <TableHeaderColumn
                        expandable={false}
                        dataField="aiSuggestedMarkup"
                      >
                        AISuggestedMarkup
                      </TableHeaderColumn> */}
                              {/* <TableHeaderColumn
                        dataField="pctVenueAvail"
                        dataSort
                        expandable={false}
                        dataFormat={percentFormatter}
                        editable={false}
                      >
                        PctAvail
                      </TableHeaderColumn> */}
                              {/* <TableHeaderColumn
                        dataField="stockType"
                        editable={false}
                        expandable={false}
                        editable={{
                          type: "select",
                          options: { values: stockTypes }
                        }}
                      >
                        StockType
                      </TableHeaderColumn> */}
                              {/* <TableHeaderColumn
                              expandable={false}
                              dataField="skyBoxEventId"
                            >
                              SkyBoxEventId
                            </TableHeaderColumn> */}

                              <TableHeaderColumn
                                dataField="pctVenueAvail"
                                // dataSort
                                expandable={false}
                                dataFormat={percentFormatter}
                                editable={false}
                              >
                                PctAvail
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField="promoName"
                                // dataSort
                                expandable={false}
                                //dataFormat={formatPromoName}
                                dataFormat={promoNameFormatter}
                                editable={false}
                              >
                                Promo Name
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                dataField="promoCode"
                                // dataSort
                                expandable={false}
                                editable={false}
                                dataFormat={promoCodeFormatter}
                              >
                                Promo Code
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                expandable={false}
                                //dataField="is_deleted"
                                dataField="priceMarkupPct"
                              >
                                Custom Pricing
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                expandable={false}
                                dataField="is_priceMarkupPct"
                                editable={false}
                                dataFormat={customPricingFormatter}
                              >
                                Custom Pricing Status
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                expandable={false}
                                //dataField="is_deleted"
                                dataField="is_blackList"
                                editable={false}
                                dataFormat={backListFormatter}
                              >
                                BlackList
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                expandable={false}
                                //dataField="is_deleted"
                                dataField="is_blackList"
                                editable={false}
                                dataFormat={broadcastFormatter}
                              >
                                BroadCast
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                expandable={false}
                                //dataField="is_deleted"
                                dataField="is_JokeyAlgo"
                                editable={false}
                                dataFormat={jockeyAlgoRepriceFormatter}
                              >
                                JockeyAlgo Only
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                expandable={false}
                                dataField="button"
                                dataFormat={buttonFormatter}
                                dataAlign="center"
                                editable={false}
                                width="10%"
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
                    Rowdata={Rowdata}
                    onModalClose={onModalClose}
                    appReceiveAlert={appReceiveAlert}
                    eventIdFromManagedEvents={eventId}
                    eventDBIdFromManagedEvents={eventDBId}
                    availablePromoNames={availablePromoNames}
                    addEventPromoRequest={addEventPromoRequest}
                    fetchEventPromosRequest={fetchEventPromosRequest}
                    deleteEventPromosFromAddPromoRequest={
                      deleteEventPromosFromAddPromoRequest
                    }
                    isEventAdd={isEventAddOpen =>
                      setShowEventPromo(isEventAddOpen)
                    }
                    fetchEventAvailablePromoRequest={
                      fetchEventAvailablePromoRequest
                    }
                    clearAvailablePromos={clearAvailablePromoNames}
                    isComingFromManagedEvents={true}
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
  );
};

export default withRouter(ManagedEvents);
