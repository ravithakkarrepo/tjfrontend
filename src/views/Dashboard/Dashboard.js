/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
// import { AppSwitch } from "@coreui/react"
import { Button, FormGroup, Input } from "reactstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  Modal,
  Image
} from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// import styled from "styled-components"

import Spinner from "../../components/Spinner";
import ListingsDataTable from "./ListingsDataTable";
import RedListingsDataTable from "./RedListingsDataTable";
import OrdersDataTable from "./OrdersDataTable";
import OrderFlowDataTable from "./OrderFlowDataTable";
// import DataTableWithCollapseAndFetching from "../../components/DataTableWithCollapseAndFetching"
import { TYPE_SALE_LISTING } from "../../constants";
// import { RoleManger } from "../../effects"
import {
  PROBLEM_BUYING_REASON,
  SECONDARY_MARKET_LOCATION,
  setBackendUrl
} from "../../constants";

import { ALERT_MSG_ERROR } from "../../constants";
import { confirmAlert } from "react-confirm-alert";

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Statistics from "./Statistics";
import UpComingOrders from "./UpComingOrder";
import ManualPdfTransfer from "./ManuaPDFTransfer";
import moment from "moment-timezone";
import { withRouter } from "react-router-dom";
import ClockTimer from "./ClockTimer";
// import { getEvenuePDF } from "../../reducers/listings"
import {
  dateFormatterWithTZ,
  numberFormatterwithoutFraction
} from "./../../utils";
import SystemHealthStatus from "./SystemHealthStatus";

var generator = require("generate-password");

const Dashboard = ({
  isFetching,
  isResetPasswordFetching,
  isOrderFlowFetching,
  isOpenOrderFetching,
  fetchOpenSalesRequest,
  fetchOpenTransfersRequest,
  openSaleslistings,
  openTransferslistings,
  tryBuyAgainRequest,
  manualTransferRequest,
  purchasedTicketInfo,
  fetchUserSummaryRequest,
  resetPurchasedTicketInfo,
  // deleteListing,
  deleteOpenListingsRequest,
  ticketPurchasedRequest,
  problemBuyingRequest,
  doneBuyingRequest,
  // fetchUpcomingOpenOrdersRequest,
  upcomingOpenOrders,
  fetchOpenListingsRequest,
  // fetchSimulateTrackedListingsRequest,
  trackedListings,
  simulateSoldListingRequest,
  fetchOrderFlowRequest,
  orderFlowListings,
  fetchPDFAttachmentRequest,
  fetchOrderfullfillmentRequest,
  fullfillOrder,
  pdfAttachment,
  sendEmailRequest,
  globals,
  fetchGlobalConfigRequest,
  cloakListings,
  fetchCloakListingRequest,
  fetchSoldStatisticsRequest,
  resetEmailPasswordRequest,
  soldStatisticsLog,
  fetchPDFDownlaodedRequest,
  pdfDownloaded,
  saveSelectEvent,
  saveSelectedEventFrom,
  userInfo,
  appReceiveAlert,
  updateEventTmOrderNumber,
  history,
  fetchClockTimerRequest,
  clockTimerList,
  createTimerRequest,
  fetchEvenuePDFRequest,
  broadcastOrUnbroadcastEventForDaysRequest,
  evenuePDf,
  getBroadCastUnbroadCastData,
  fetchBroadcastOrUnbroadcastEventForDaysRequest,
  slipOrders,
  fetchSlipOrderRequest,
  fetchUpComingOrderRequest,
  upComingOrders,
  updateIsBlackListRequest,
  fetchJockeyAccountsRequest,
  allJockeyUsers,
  clockInClockOutRequest,
  updateUserForBreakRequest,
  isSlipOrderFetching,
  fetchSaleMarginHealthReportRequest,
  saleMarginHealthReport,
  isSaleMarginFetching,
  fetchMarketwiseSaleMarginHealthReportRequest,
  marketwiseSaleMarginHealthReport,
  isMarketwiseSaleMarginFetching,
  fetchSBEventsHealthReportRequest,
  skyboxEventsHealthReport,
  isFetchingSkyboxEventsHealthReport,
  skyboxPostedEventsHealthReport,
  isFetchingSkyboxPostedEventsHealthReport,
  fetchSBPostedEventsHealthReportRequest,
  fetchEventQueueHealthReportRequest,
  eventQueueHealthReport,
  isFetchingEventQueueHealthReport,
  fetchCancelledSBEventsHealthReportRequest,
  cancelledSkyboxEventsHealthReport,
  isFetchingCancelledSkyboxEventsHealthReport,
  fetchPresaleEventsHealthReportRequest,
  presaleEventsHealthReport,
  isFetchingPresaleEventsHealthReport,
  fetchEventMonitoringHealthReportRequest,
  eventMonitoringHealthReport,
  isFetchingShortEventMonitoringHealthReport,
  isFetchingMediumEventMonitoringHealthReport,
  isFetchingLongEventMonitoringHealthReport,
  isFetchingNearEventMonitoringHealthReport
}) => {
  useEffect(() => {
    if (userPurchaseSummary && Object.values(userPurchaseSummary).length > 0) {
      setOpenOrderSpinner(false);
      setTempErrorOrderSpinner(false);
      setProblemOrderSpinner(false);
    }
    // fetchGlobalConfigRequest()
    fetchOpenSalesRequest({ username: userInfo.username, role: userInfo.role });
    fetchJockeyAccountsRequest();
    // fetchOpenTransfersRequest()
    // fetchOrderFlowRequest()

    // fetchClockTimerRequest({
    //   StartDate: moment(new Date()).format("YYYY-MM-DD"),
    //   EndDate: moment(new Date())
    //     .add(1, "days")
    //     .format("YYYY-MM-DD"),
    //   name: "",
    //   id: userInfo._id + ":" + moment().format("YYYY-MM-DD")
    // })
    fetchBroadcastOrUnbroadcastEventForDaysRequest();
    const tId = setInterval(() => {
      // fetchOpenListingsRequest()
      // fetchOpenSalesRequest({ stopSpinner: true })
      // fetchOrderFlowRequest({ stopSpinner: true })
      // fetchBroadcastOrUnbroadcastEventForDaysRequest()
      // fetchSlipOrderRequest({
      //   startDate: moment()
      //     .subtract(29, "days")
      //     .format("YYYY-MM-DD"),
      //   endDate: moment(new Date())
      //     .add(1, "days")
      //     .format("YYYY-MM-DD")
      // })
    }, 1000 * 60 * 5); //polling every 5 minutes

    return () => {
      tId && clearInterval(tId);
    };
  }, []);
  const [modal, setModal] = useState(false);
  const [soldQuantity, setSoldQuantity] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [secondaryMarketOrderNum, setSecondaryMarketOrderNum] = useState("");
  const [secondaryMarketLocation, setSecondaryMarketLocation] = useState("");
  // const [reason, setReason] = useState(PROBLEM_BUYING_REASON[0])
  const [reason, setReason] = useState("");
  // const [emailOption, setEmailOption] = useState("")
  const [problemNotes, setProblemNotes] = useState("");
  const [showPdfTransfer, setShowPdfTransfer] = useState(false);
  const [purchasedKey, setPurchasedKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [spinnerTime, setSpinnerTime] = useState(false);

  const [newPass, setNewPass] = useState("");
  const [eventKey, setEventKey] = useState("");
  const [showRowSec, setShowRowSec] = useState(false);
  const [purchaseSection, setPurchaseSection] = useState("");
  const [purchaseRow, setPurchaseRow] = useState("");
  const [isPurchaseSecRow, setIsPurchaseSecRow] = useState(false);
  const [days, setDays] = useState("");
  const [isBroadCast, setIsBroadCast] = useState(true);
  const [openOrderSpinner, setOpenOrderSpinner] = useState(false);
  const [tempErrorOrderSpinner, setTempErrorOrderSpinner] = useState(false);
  const [problemOrderSpinner, setProblemOrderSpinner] = useState(false);
  const [isAllField, setIsAllField] = useState(false);

  const seatNumber = useRef({});
  const noSeatValues = useRef(true);
  let passwordNew = "";
  var blacklistReason = "";
  var blacklistReasonSelected = "";

  // if (isFetching) return <Spinner />
  const {
    email, //the successful response from calling the "/buyingTicket" api
    password,
    one_ticket_password,
    phoneNumber,
    address,
    name,
    capOne,
    amex,
    comdata,
    citi1,
    citi2,
    locked,
    globalPromos,
    partialView,
    obstructedView,
    limitedView,
    eventInfo: {
      listingId,
      eventName,
      eventDate,
      eventAddress,
      seat,
      quantitySold,
      baseCost,
      unitCost,
      ticketMasterUrl,
      eventUrl,
      promos,
      venueId,
      eventId,
      marketType
    },
    userPurchaseSummary
  } = purchasedTicketInfo; //the state of the tickets that are about to being purchased

  const [section, row] = seat ? seat.split(", ") : [];

  const createCustomDeleteButton = onBtnClick => {
    return (
      <Button color="primary" className="btn-pill" onClick={onBtnClick}>
        Simulate
      </Button>
    );
  };

  const seatgeekBroadwayImg = () => {
    return (
      <>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Seatgeek Broadway Event</Tooltip>}
        >
          <img
            className="marketImg"
            src={require("./../../assets/img/seatgeek_broadway.png")}
            alt="Seatgeek Broadway Event"
          />
        </OverlayTrigger>
      </>
    );
  };

  const evenueImg = () => {
    return (
      <>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>EVenue Event</Tooltip>}
        >
          <div className="evenueIcon">
            <i className="fa fa-venus-mars" aria-hidden="true"></i>
          </div>
        </OverlayTrigger>
      </>
    );
  };

  const mlbImg = () => {
    return (
      <>
        <OverlayTrigger placement="left" overlay={<Tooltip>MLB Event</Tooltip>}>
          <div className="mlbIcon">
            <i className="fa fa-medium" aria-hidden="true"></i>
          </div>
        </OverlayTrigger>
      </>
    );
  };

  const seatgeekImg = () => {
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Seatgeek Event</Tooltip>}
      >
        <img
          className="marketImg"
          src={require("./../../assets/img/seetgreek.png")}
          alt="Seatgeek Event"
        />
      </OverlayTrigger>
    );
  };

  const ticketNetworkImg = () => {
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>TicketNetWork Event</Tooltip>}
      >
        <img
          className="marketImg"
          src={require("./../../assets/img/ticketNetwork.png")}
          alt="TicketNetWork Event"
        />
      </OverlayTrigger>
    );
  };

  const vividseatsImg = () => {
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>VividSeats Event</Tooltip>}
      >
        <img
          className="marketImg"
          src={require("./../../assets/img/vividSeat.png")}
          alt="VividSeat Event"
        />
      </OverlayTrigger>
    );
  };

  const nycballetImg = () => {
    return (
      <>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>NYC Ballet Event</Tooltip>}
        >
          <div className="nycbIcon">
            <i
              style={{
                fontSize: "24px"
              }}
              className="fa fa-hacker-news"
              aria-hidden="true"
            ></i>
          </div>
        </OverlayTrigger>
      </>
    );
  };

  const metoperaImg = () => {
    return (
      <>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Metopera Event</Tooltip>}
        >
          <div className="metoperaIcon">
            <i
              style={{
                fontSize: "24px"
              }}
              className="fa fa-meetup"
              aria-hidden="true"
            ></i>
          </div>
        </OverlayTrigger>
      </>
    );
  };

  const AXSImg = () => {
    return (
      <>
        <OverlayTrigger placement="left" overlay={<Tooltip>AXS Event</Tooltip>}>
          <div className="axsIcon">
            <i className="fa fa-globe" aria-hidden="true"></i>
          </div>
        </OverlayTrigger>
      </>
    );
  };

  const tickpickImg = () => {
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Tickpick Event</Tooltip>}
      >
        <img
          className="marketImg"
          src={require("./../../assets/img/tickpick.png")}
          alt="Tickpick Event"
        />
      </OverlayTrigger>
    );
  };

  const mytickettrackerImg = () => {
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>TicketTracker Event</Tooltip>}
      >
        <img
          className="marketImg"
          src={require("./../../assets/img/ticketTracker.png")}
          alt="TicketTracker Event"
        />
      </OverlayTrigger>
    );
  };

  const gametimeImg = () => {
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>GameTime Event</Tooltip>}
      >
        <img
          className="marketImg"
          src={require("./../../assets/img/gametime.png")}
          alt="GameTime Event"
        />
      </OverlayTrigger>
    );
  };

  const viagogoImg = () => {
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Viagogo Event</Tooltip>}
      >
        <img
          className="marketImg"
          src={require("./../../assets/img/viagogo.png")}
          alt="viagogo Event"
        />
      </OverlayTrigger>
    );
  };

  const stubhubImg = () => {
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Stubhub Event</Tooltip>}
      >
        <img
          className="marketImg"
          src={require("./../../assets/img/stubhub.png")}
          alt="Stubhub Event"
        />
      </OverlayTrigger>
    );
  };

  const broadwayComImg = () => {
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Broadway.com Event</Tooltip>}
      >
        <img
          className="marketImg"
          src={require("./../../assets/img/broadwaycom.png")}
          alt="Broadway.com Event"
        />
      </OverlayTrigger>
    );
  };

  const userRoleCharacter = role => {
    switch (role) {
      case "manager":
        return "M";

      case "buyer":
        return "B";

      case "admin":
        return "A";

      case "superadmin":
        return "SA";
      default:
        return "";
    }
  };

  const customConfirm = (key, row) => {
    simulateSoldListingRequest({ soldListing: row, quantity: soldQuantity });
  };

  const customConfirmBlackList = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          <span>Are you sure you want to blackList this events?</span>
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

          <Form.Group>
            <Form.Check
              type="radio"
              className="check_row_cls"
              id={3}
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
            updateIsBlackListRequest({
              eventId: [next.row.eventDBId],
              is_blackList: next.is_blackList,
              blacklistReason
            });
          }
        }
      ]
    });
  };
  const modalOptions = {
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
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: next => {
      next();
    },
    // onDeleteRow: customConfirm,
    afterDeleteRow: customConfirm,
    // afterInsertRow: handleInsertedRow,
    insertText: "Add Configration"
  };

  const selectRow = {
    mode: "checkbox",
    customComponent: CustomMultiSelectTable
  };

  const setValue = event => {
    const { name, value } = event.target;
    seatNumber.current = { ...seatNumber.current, [name]: Number(value) };

    if (quantitySold > 0) {
      let count = 0;
      for (let index = 0; index < quantitySold; index++) {
        let keyName = `seatNumber${index}`;
        let value = seatNumber.current[keyName];
        if (value) {
          count = count + 1;
        }
      }

      if (count == quantitySold) {
        setIsAllField(true);
        noSeatValues.current = false;
      } else {
        setIsAllField(false);
        noSeatValues.current = true;
      }
    }
  };

  const checkSeatNumber = () => {
    // if (isAllField) {
    doneBuyingRequest({
      listingId,
      orderNum,
      secondaryMarketOrderNum,
      secondaryMarketLocation,
      purchaseRow,
      purchaseSection,
      isPurchaseSecRow,
      seatNumber,
      username: userInfo.username
      // emailOption: emailOption || email,
      // problemNotes
    });
    resetPurchasedTicketInfo();
    setShowRowSec(false);
    setIsPurchaseSecRow(false);
    setPurchaseRow("");
    setPurchaseSection("");
    // }
  };

  const setDisabled = () => {
    let isDisabled;
    if (marketType.toLowerCase().includes("evenue")) {
      isDisabled =
        noSeatValues.current ||
        (!orderNum && !secondaryMarketOrderNum && !secondaryMarketLocation) ||
        noSeatValues.current ||
        (secondaryMarketOrderNum && !secondaryMarketLocation) ||
        noSeatValues.current ||
        (!secondaryMarketOrderNum && secondaryMarketLocation);
    } else {
      isDisabled =
        (!orderNum && !secondaryMarketOrderNum && !secondaryMarketLocation) ||
        (secondaryMarketOrderNum && !secondaryMarketLocation) ||
        (!secondaryMarketOrderNum && secondaryMarketLocation);
    }

    return isDisabled;
  };

  const creatSeatNumberFields = quantitySold => {
    if (quantitySold > 0) {
      let html = [];
      for (let index = 0; index < quantitySold; index++) {
        html.push(
          <div className="col-sm-4">
            <FormGroup>
              <Input
                type="text"
                placeholder="Seat Number"
                name={"seatNumber" + index}
                onChange={evt => setValue(evt)}
              ></Input>
            </FormGroup>
          </div>
        );
      }

      return html;
    }
  };

  return (
    <div className="animated fadeIn">
      <Modal
        onShow={() => {
          setOpenOrderSpinner(false);
          setTempErrorOrderSpinner(false);
          setProblemOrderSpinner(false);
        }}
        onHide={() => {
          setOpenOrderSpinner(false);
          setTempErrorOrderSpinner(false);
          setProblemOrderSpinner(false);
        }}
        show={
          //After clicking the actions button, pop up a modal either when the logged user has a email or the 'userPurchaseSummary' is fetched
          !!email ||
          (userPurchaseSummary && Object.values(userPurchaseSummary).length > 0)
        }
        size="lg"
        className={"dash-popup"}
        centered
        // style={{ maxWidth: "45%", fontSize: "20px" }}
      >
        <Modal.Header>
          <h4 className="modal-title">
            {email
              ? "Here is the information of the event"
              : "Here is the user summary of purchases"}{" "}
          </h4>

          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={resetPurchasedTicketInfo}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        {email ? (
          <Modal.Body>
            <form-group>
              <div className="row">
                <div className="col-10">
                  <label>Email:</label> <span>{email}</span>
                </div>
                {venueId !== undefined ? (
                  ""
                ) : (
                  <div className="col-2">
                    <div style={{ float: "right" }}>
                      <div className="tbl_btn" style={{ marginLeft: "26%" }}>
                        <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip>Reset Password</Tooltip>}
                        >
                          <Button
                            className="icon_btn"
                            active
                            color="primary"
                            aria-pressed="true"
                            onClick={() => {
                              var d = new Date();
                              var myTimezone = "America/New_York";
                              var myDatetimeFormat = "MM/DD/YYYY hh:mm a";
                              var new_date = moment(d)
                                .tz(myTimezone)
                                .format(myDatetimeFormat);
                              passwordNew = generator.generate({
                                length: 10,
                                numbers: true
                              });
                              setNewPass("1" + passwordNew);
                              resetEmailPasswordRequest({
                                email,
                                password: "1" + passwordNew,
                                updatedDate: new_date,
                                capOne,
                                amex,
                                comdata,
                                citi1,
                                citi2,
                                isActive: 1
                              });
                            }}
                          >
                            <img
                              src={require("./../../assets/img/refresh.png")}
                              alt="reset Password"
                            />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form-group>
            <form-group>
              <label>Password:</label>{" "}
              <span>{newPass === "" ? password : newPass}</span>
            </form-group>
            <form-group>
              <label style={{ width: "19%", marginLeft: "2%" }}>
                1Ticket TM Password:
              </label>{" "}
              <span style={{ width: "77%" }}>
                {one_ticket_password ? one_ticket_password : ""}
              </span>
            </form-group>
            {phoneNumber && phoneNumber ? (
              <form-group>
                <label>Phone Number:</label> <span>{phoneNumber}</span>
              </form-group>
            ) : (
              ""
            )}
            {address && address ? (
              <form-group>
                <label>Address:</label> <span>{address}</span>
              </form-group>
            ) : (
              ""
            )}
            {name && name ? (
              <form-group>
                <label>Name:</label> <span>{name}</span>
              </form-group>
            ) : (
              ""
            )}
            {/* <form-group>
              <div className="row">
                <div className="col-sm-2">
                  <span className="cc_title">Credit Card</span>
                </div>
                <div className="col-sm-10">
                  <div>
                    {"  "}
                    <b>Use credit cards, in this order of priority</b>
                  </div>
                  <div className="ov_scroll">
                    <table className="table">
                      <thead>
                        <th
                          style={{ border: "1px solid black", color: "black" }}
                        >
                          CapOne
                        </th>
                        <th
                          style={{ border: "1px solid black", color: "black" }}
                        >
                          Amex
                        </th>
                        <th
                          style={{ border: "1px solid black", color: "black" }}
                        >
                          Comdata
                        </th>
                        <th
                          style={{ border: "1px solid black", color: "black" }}
                        >
                          Citi #1
                        </th>
                        <th
                          style={{ border: "1px solid black", color: "black" }}
                        >
                          Citi #2
                        </th>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              border: "1px solid black",
                              color: "black"
                            }}
                          >
                            {" "}
                            <b> Card: </b>
                            {capOne === undefined
                              ? "NA"
                              : `${capOne.digit || "NA"}`}
                            <br /> <b> CVV: </b>
                            {capOne === undefined
                              ? "NA"
                              : `${capOne.cvv || "NA"}`}
                            <br /> <b> Exp Date: </b>
                            {capOne === undefined
                              ? "NA"
                              : `${capOne.month || "NA"}`}
                            /{" "}
                            {capOne === undefined
                              ? "NA"
                              : `${capOne.year || "NA"}`}
                            <br />
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              color: "black"
                            }}
                          >
                            <b> Card: </b>
                            {amex === undefined
                              ? "NA"
                              : `${amex.digit || "NA"}`}
                            <br />
                            <b> CVV: </b>
                            {amex === undefined ? "NA" : `${amex.cvv || "NA"}`}
                            <br /> <b> Exp Date: </b>
                            {amex === undefined
                              ? "NA"
                              : `${amex.month || "NA"}`}
                            /
                            {amex === undefined ? "NA" : `${amex.year || "NA"}`}
                            <br />
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              color: "black"
                            }}
                          >
                            {" "}
                            <b> Card: </b>
                            {comdata === undefined
                              ? "NA"
                              : `${comdata.digit || "NA"}`}
                            <br /> <b> CVV: </b>
                            {comdata === undefined
                              ? "NA"
                              : `${comdata.cvv || "NA"}`}
                            <br /> <b> Exp Date: </b>
                            {comdata === undefined
                              ? "NA"
                              : `${comdata.month || "NA"}`}
                            /
                            {comdata === undefined
                              ? "NA"
                              : `${comdata.year || "NA"}`}
                            <br />
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              color: "black"
                            }}
                          >
                            {" "}
                            <b> Card: </b>
                            {citi1 === undefined
                              ? "NA"
                              : `${citi1.digit || "NA"}`}
                            <br /> <b> CVV: </b>
                            {citi1 === undefined
                              ? "NA"
                              : `${citi1.cvv || "NA"}`}
                            <br /> <b> Exp Date: </b>
                            {citi1 === undefined
                              ? "NA"
                              : `${citi1.month || "NA"}`}
                            /
                            {citi1 === undefined
                              ? "NA"
                              : `${citi1.year || "NA"}`}
                            <br />
                          </td>
                          <td
                            style={{
                              border: "1px solid black",
                              color: "black"
                            }}
                          >
                            {" "}
                            <b> Card: </b>
                            {citi2 === undefined
                              ? "NA"
                              : `${citi2.digit || "NA"}`}
                            <br /> <b> CVV: </b>
                            {citi2 === undefined
                              ? "NA"
                              : `${citi2.cvv || "NA"}`}
                            <br /> <b> Exp Date: </b>
                            {citi2 === undefined
                              ? "NA"
                              : `${citi2.month || "NA"}`}
                            /
                            {citi2 === undefined
                              ? "NA"
                              : `${citi2.year || "NA"}`}
                            <br />
                          </td>
                        </tr>
                      </tbody>{" "}
                      <tbody />
                    </table>
                  </div>
                </div>
              </div>
            </form-group> */}
            <form-group>
              <label>Event Name:</label>

              <div className="row">
                <div className="col-8">
                  <span>{eventName}</span>
                </div>
                <div className="col-4">
                  <Button
                    className="btn_buy_ticket_dash_pop"
                    onClick={() => {
                      const payload = {
                        eventId: eventId,
                        is_blackList: true
                      };
                      //   resetPurchasedTicketInfo()
                      customConfirmBlackList(payload);
                    }}
                  >
                    BlackList Event
                  </Button>
                </div>
              </div>
            </form-group>
            <form-group>
              <label>Event Date:</label>
              <span> {eventDate}</span>
            </form-group>
            <form-group>
              <label>Event Address:</label>
              <span> {eventAddress}</span>
            </form-group>
            <form-group>
              <div className="fl_w">
                <label>Section:</label>
                <span>{section}</span>
              </div>
              <div className="fl_w">
                <label>Row: </label>
                <span>{row}</span>
              </div>
            </form-group>
            <form-group>
              <label>Quantity:</label>
              <span> {quantitySold}</span>
            </form-group>
            <form-group>
              <label>Base Cost:</label>
              <span>
                {" "}
                {baseCost ? numberFormatterwithoutFraction(baseCost) : ""}
              </span>
            </form-group>
            <form-group>
              <label>Final Cost:</label>
              <span>
                {" "}
                {unitCost ? numberFormatterwithoutFraction(unitCost) : ""}
              </span>
            </form-group>
            <form-group>
              {/* {venueId !== undefined && venueId !== null && venueId !== "" ? (
                <label>EVenue Link:</label>
              ) : (
                <label>TM Link:</label>
              )} */}
              <label>TM Link:</label>
              <div className="row">
                <div className="col-10">
                  <span>
                    {" "}
                    {eventUrl !== "" && eventUrl !== null
                      ? eventUrl
                      : ticketMasterUrl}
                  </span>
                </div>
                <div className="col-2 copy-link_btn">
                  <CopyToClipboard
                    text={
                      eventUrl !== "" && eventUrl !== null
                        ? eventUrl
                        : ticketMasterUrl
                    }
                    onCopy={() => ""}
                  >
                    <div style={{ float: "right" }}>
                      <div className="tbl_btn">
                        <OverlayTrigger
                          placement="left"
                          overlay={<Tooltip>Copy to ClipBoard</Tooltip>}
                        >
                          {/* <button className="copy-link_btn">Copy Link</button> */}
                          <Button
                            className="icon_btn"
                            active
                            color="primary"
                            aria-pressed="true"
                          >
                            <img
                              src={require("./../../assets/img/sheet.png")}
                              alt="copy Link"
                            />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </form-group>
            {locked ? (
              <form-group>
                <label>Promos:</label>
                <span>
                  {globalPromos && globalPromos
                    ? globalPromos.map(evt =>
                        Object.entries(evt).map(([key, value]) => (
                          <>
                            <span key={key}>
                              {key} : {value}
                            </span>
                            <br />
                          </>
                        ))
                      )
                    : ""}

                  {promos && promos
                    ? Object.entries(promos).map(([key, value]) => (
                        <>
                          <span key={key}>
                            {key} : {value}
                          </span>
                          <br />
                        </>
                      ))
                    : ""}
                </span>
              </form-group>
            ) : (
              ""
            )}
            {partialView || obstructedView || limitedView ? (
              <form-group>
                <label>Note:</label>
                <span>
                  <b>Obstructed View acceptable ticket</b>
                </span>
              </form-group>
            ) : (
              ""
            )}
          </Modal.Body>
        ) : (
          <Modal.Body>
            {Object.entries(userPurchaseSummary)
              .sort((a, b) => a[1] - b[1])
              .map(([key, value]) => (
                <Row key={key}>
                  <Col className="col-7">
                    <p>Email: {key}</p>
                  </Col>
                  <Col className="col-5">
                    <p>Ticket Purchased: {value}</p>
                  </Col>
                </Row>
              ))}
          </Modal.Body>
        )}
        <Modal.Footer>
          {email ? (
            <div>
              <div className="row">
                <div className="col-sm-4">
                  <FormGroup>
                    <Input
                      type="select"
                      name="reason"
                      onChange={evt => {
                        setReason(evt.target.value);
                        setErrorMessage("");
                      }}
                      value={reason}
                    >
                      <option value="">--Select Reason--</option>
                      {PROBLEM_BUYING_REASON.map((reason, i) => (
                        <option key={i}>{reason}</option>
                      ))}
                    </Input>
                    <span style={{ color: "red" }}>{errorMessage}</span>
                  </FormGroup>
                </div>
                <div className="col-sm-4">
                  <FormGroup>
                    <Input
                      type="text"
                      name="problemNotes"
                      onChange={evt => setProblemNotes(evt.target.value)}
                      placeholder="Add Problem Notes"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-sm-4">
                  <FormGroup>
                    <Button
                      color="danger"
                      onClick={() => {
                        if (reason === "") {
                          setErrorMessage("Please Select Reason");
                        } else {
                          problemBuyingRequest({
                            listingId,
                            reason,
                            problemNotes
                          });
                          resetPurchasedTicketInfo();
                        }
                      }}
                    >
                      {"Problem Buying"}
                    </Button>
                  </FormGroup>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-sm-8">
                  <div className="fl_w">
                    <div className="row">
                      <div className="col-sm-12">
                        <FormGroup controlId="secRowChk" className="chk-secRow">
                          <Form.Check
                            checked={isPurchaseSecRow}
                            type="checkbox"
                            id="secRowChk"
                            name="secRowChk"
                            onChange={evt => {
                              if (!evt.target.checked) {
                                setShowRowSec(false);
                              } else {
                                setShowRowSec(true);
                              }
                              setIsPurchaseSecRow(evt.target.checked);
                            }}
                            label="If You purchase different section and row then please check the checkbox"
                          />
                        </FormGroup>
                      </div>
                      {showRowSec ? (
                        <>
                          <div className="col-sm-6">
                            <FormGroup>
                              <Input
                                type="text"
                                placeholder="Section"
                                name="section"
                                onChange={evt =>
                                  setPurchaseSection(evt.target.value)
                                }
                              ></Input>
                            </FormGroup>
                          </div>
                          <div className="col-sm-6">
                            <FormGroup>
                              <Input
                                type="text"
                                placeholder="Row"
                                name="Row"
                                onChange={evt =>
                                  setPurchaseRow(evt.target.value)
                                }
                              ></Input>
                            </FormGroup>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      <div className="col-sm-12">
                        <FormGroup>
                          <Input
                            type="text"
                            placeholder="TM Order Number"
                            name="orderNumber"
                            onChange={evt => setOrderNum(evt.target.value)}
                          ></Input>
                        </FormGroup>
                      </div>

                      {marketType.toLowerCase().includes("evenue")
                        ? creatSeatNumberFields(quantitySold)
                        : ""}

                      <div className="col-sm-6">
                        <FormGroup>
                          <Input
                            type="text"
                            name="secondaryOrderNumber"
                            onChange={evt =>
                              setSecondaryMarketOrderNum(evt.target.value)
                            }
                            placeholder="Secondary market order number"
                          ></Input>
                        </FormGroup>
                      </div>
                      <div className="col-sm-6">
                        <FormGroup>
                          <Input
                            type="select"
                            name="secondaryMarketLocation"
                            onChange={evt => {
                              setSecondaryMarketLocation(evt.target.value);
                              setErrorMessage("");
                            }}
                            value={secondaryMarketLocation}
                          >
                            <option value="">
                              Secondary market purchase location
                            </option>
                            {SECONDARY_MARKET_LOCATION.map((location, i) => (
                              <option key={i}>{location}</option>
                            ))}
                          </Input>
                          <span style={{ color: "red" }}>{errorMessage}</span>
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <Button
                    color="success"
                    disabled={setDisabled()}
                    onClick={() => {
                      {
                        checkSeatNumber();
                      }
                    }}
                  >
                    {"I'm done purchasing!"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Row className=" container-fluid justify-content-center align-items-center">
              <Button
                color="secondary"
                onClick={() => {
                  resetPurchasedTicketInfo();
                }}
              >
                {"Done"}
              </Button>
            </Row>
          )}
        </Modal.Footer>
        {isResetPasswordFetching ? (
          <div className="overlay-buyTicket">
            <div className="row">
              <div className="col-sm-12">
                <Spinner spinnerTime={spinnerTime} />
              </div>
              <div
                className="col-sm-12"
                style={{ color: "black", textAlign: "center" }}
              >
                <b>Please Wait Resetting Your Password...</b>
              </div>
            </div>
          </div>
        ) : (
          <div>{""}</div>
        )}
      </Modal>

      <Modal
        show={modal}
        className={"modal-info"}
        centered
        // style={{ maxWidth: "70%", fontSize: "20px" }}
      >
        <Modal.Header>
          <h4 className="modal-title">Select Simulate Sold Listing</h4>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="number"
              name="soldquantity"
              value={soldQuantity}
              placeholder="Sold Quantity"
              onChange={evt => setSoldQuantity(evt.target.value)}
            />
          </Form.Group>
          <div className="tbl_main">
            <div className="inner_tbl">
              <BootstrapTable
                data={trackedListings}
                version="4"
                striped
                hover
                pagination
                options={modalOptions}
                deleteRow
                selectRow={selectRow}
              >
                <TableHeaderColumn dataField="skyBoxInventoryId" isKey>
                  skyBoxInventoryId
                </TableHeaderColumn>
                <TableHeaderColumn dataField="unitCost">
                  unitCost
                </TableHeaderColumn>
                <TableHeaderColumn dataField="quantity">
                  quantity
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Row className=" container-fluid justify-content-center align-items-center">
            <Button
              color="secondary"
              onClick={() => {
                setModal(false);
              }}
            >
              {"Close"}
            </Button>
          </Row>
        </Modal.Footer>
      </Modal>

      <div className="full_width">
        <div className="page_name">
          <div className="row">
            <div className="col-sm-7">
              <h2>Dashboard</h2>
            </div>
            <div className="col-sm-5">
              <div className="dashSearch search_btn">
                <Form.Control
                  type="text"
                  value={eventKey}
                  placeholder="Search Event Name"
                  onChange={evt => setEventKey(evt.target.value)}
                  onKeyPress={evt => {
                    if (evt.key === "Enter" && eventKey !== "") {
                      history.push({
                        pathname: `/managedEvents/${eventKey}`
                      });
                    }
                  }}
                />
                <Button
                  color="primary"
                  className="btn-pill"
                  disabled={eventKey === ""}
                  onClick={() => {
                    history.push({
                      pathname: `/managedEvents/${eventKey}`
                    });
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="inner_main dash_inner_main">
          <div className="full_width">
            <div className="row">
              <div
                className={
                  userInfo.role.toLowerCase() === "admin" ||
                  userInfo.role.toLowerCase() === "manager"
                    ? "col-sm-8"
                    : "col-sm-12"
                }
              >
                <div className="white_box">
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main">
                      <div className="inner_tbl overflo_scroll_cls">
                        {allJockeyUsers
                          .sort((a, b) => (b.role === "manager" ? 1 : -1))
                          .sort((a, b) => a.is_break - b.is_break)
                          .sort((a, b) => b.is_online - a.is_online)
                          .map((item, idx) => {
                            return (
                              <div className="dd_user_bx" key={idx}>
                                <OverlayTrigger
                                  placement="left"
                                  overlay={
                                    <Tooltip>
                                      {item.is_online && item.is_break
                                        ? "On Break"
                                        : item.is_online
                                        ? "Online"
                                        : "Offline"}
                                    </Tooltip>
                                  }
                                >
                                  <div className="dd_user_img_bx">
                                    <Image
                                      src={
                                        item.profile && item.profile !== ""
                                          ? item.profile.includes("base64")
                                            ? item.profile
                                            : setBackendUrl() + item.profile
                                          : require("./../../assets/img/profile1.png")
                                      }
                                      roundedCircle
                                      height="70"
                                      width="70"
                                    />

                                    <img
                                      alt=""
                                      className="status_img"
                                      src={
                                        item.is_online && item.is_break
                                          ? require("./../../assets/img/break.png")
                                          : item.is_online
                                          ? require("./../../assets/img/online.png")
                                          : require("./../../assets/img/offline.png")
                                      }
                                    />

                                    <span className="status_img">
                                      {userRoleCharacter(item.role)}
                                    </span>
                                  </div>
                                </OverlayTrigger>
                                <span className="dd_user_name">
                                  {item.username}
                                </span>
                              </div>
                            );
                            // return item
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {userInfo.role.toLowerCase() === "admin" ||
              userInfo.role.toLowerCase() === "manager" ? (
                <div className="col-sm-4">
                  <div
                    className="white_box price_sec"
                    // style={{ height: "77%" }}
                  >
                    <div className="cm_ttl">
                      <h2>Unbroadcast / Broadcast Events</h2>
                    </div>
                    <div className="inner_box_body padL3T5 tbl_main">
                      <div className="row">
                        <div className="col-sm-12">
                          <span style={{ color: "black", fontSize: "12px" }}>
                            {getBroadCastUnbroadCastData
                              ? getBroadCastUnbroadCastData.status
                                ? "Currently Broadcasted from " +
                                  dateFormatterWithTZ(
                                    getBroadCastUnbroadCastData.LastUpadtedUnBroadcastEstDate
                                  )() +
                                  " to " +
                                  dateFormatterWithTZ(
                                    moment(
                                      getBroadCastUnbroadCastData.LastUpadtedUnBroadcastEstDate
                                    )
                                      .add(
                                        getBroadCastUnbroadCastData.hours,
                                        "hours"
                                      )
                                      .tz("America/New_York")
                                      .format()
                                  )()
                                : "Currently Unbroadcasted from " +
                                  dateFormatterWithTZ(
                                    getBroadCastUnbroadCastData.LastUpadtedUnBroadcastEstDate
                                  )() +
                                  " to " +
                                  dateFormatterWithTZ(
                                    moment(
                                      getBroadCastUnbroadCastData.LastUpadtedUnBroadcastEstDate
                                    )
                                      .add(
                                        getBroadCastUnbroadCastData.hours,
                                        "hours"
                                      )
                                      .tz("America/New_York")
                                      .format()
                                  )()
                              : ""}
                          </span>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-sm-12">
                          <Form>
                            <Form.Control
                              type="Number"
                              min="0"
                              defaultValue={
                                getBroadCastUnbroadCastData
                                  ? getBroadCastUnbroadCastData.hours
                                  : days
                              }
                              placeholder="Hours"
                              onChange={evt => {
                                if (getBroadCastUnbroadCastData) {
                                  getBroadCastUnbroadCastData.hours =
                                    evt.target.value;
                                  // setDays(evt.target.value)
                                } else {
                                  setDays(evt.target.value);
                                }
                              }}
                              style={{ maxWidth: "100px" }}
                            />
                          </Form>

                          <div className="tbl_btn">
                            <BootstrapSwitchButton
                              checked={
                                getBroadCastUnbroadCastData &&
                                getBroadCastUnbroadCastData.status !== undefined
                                  ? getBroadCastUnbroadCastData.status
                                  : true
                              }
                              onChange={evt => {
                                setIsBroadCast(evt);
                              }}
                            />
                          </div>
                          <div className="btn-group">
                            <Button
                              // disabled={(getBroadCastUnbroadCastData && getBroadCastUnbroadCastData.hours === "") ? true : false}
                              onClick={() => {
                                if (
                                  getBroadCastUnbroadCastData &&
                                  getBroadCastUnbroadCastData.hours > 0
                                ) {
                                  broadcastOrUnbroadcastEventForDaysRequest({
                                    days: getBroadCastUnbroadCastData.hours,
                                    isBroadCast
                                  });
                                } else {
                                  appReceiveAlert({
                                    type: ALERT_MSG_ERROR,
                                    message:
                                      "Hours must be valid & greater than 0"
                                  });
                                }
                              }}
                            >
                              Update
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {userInfo.role.toLowerCase() === "admin" ||
              userInfo.role.toLowerCase() === "manager" ? (
                <div className="col-sm-12">
                  <div className="inner_box_body custom_padding">
                    <SystemHealthStatus
                      userInfo={userInfo}
                      globals={globals}
                      fetchMarketwiseSaleMarginHealthReportRequest={
                        fetchMarketwiseSaleMarginHealthReportRequest
                      }
                      marketwiseSaleMarginHealthReport={
                        marketwiseSaleMarginHealthReport
                      }
                      isMarketwiseSaleMarginFetching={
                        isMarketwiseSaleMarginFetching
                      }
                      fetchSBEventsHealthReportRequest={
                        fetchSBEventsHealthReportRequest
                      }
                      skyboxEventsHealthReport={skyboxEventsHealthReport}
                      isFetchingSkyboxEventsHealthReport={
                        isFetchingSkyboxEventsHealthReport
                      }
                      fetchSBPostedEventsHealthReportRequest={
                        fetchSBPostedEventsHealthReportRequest
                      }
                      skyboxPostedEventsHealthReport={
                        skyboxPostedEventsHealthReport
                      }
                      isFetchingSkyboxPostedEventsHealthReport={
                        isFetchingSkyboxPostedEventsHealthReport
                      }
                      fetchEventQueueHealthReportRequest={
                        fetchEventQueueHealthReportRequest
                      }
                      eventQueueHealthReport={eventQueueHealthReport}
                      isFetchingEventQueueHealthReport={
                        isFetchingEventQueueHealthReport
                      }
                      fetchCancelledSBEventsHealthReportRequest={
                        fetchCancelledSBEventsHealthReportRequest
                      }
                      cancelledSkyboxEventsHealthReport={
                        cancelledSkyboxEventsHealthReport
                      }
                      isFetchingCancelledSkyboxEventsHealthReport={
                        isFetchingCancelledSkyboxEventsHealthReport
                      }
                      fetchPresaleEventsHealthReportRequest={
                        fetchPresaleEventsHealthReportRequest
                      }
                      presaleEventsHealthReport={presaleEventsHealthReport}
                      isFetchingPresaleEventsHealthReport={
                        isFetchingPresaleEventsHealthReport
                      }
                    ></SystemHealthStatus>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div
                className={
                  userInfo.role.toLowerCase() === "manager"
                    ? "col-sm-8"
                    : "col-sm-8"
                }
                style={{
                  display: userInfo.role.toLowerCase() === "buyer" ? "none" : ""
                }}
              >
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>Order Processing WorkFlow</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main flow_table">
                      <div className="inner_tbl">
                        <OrderFlowDataTable
                          data={
                            orderFlowListings.sortedOverFlowListings ||
                            Object.values(orderFlowListings.dict)
                          }
                          totalListings={orderFlowListings.totalListing}
                          currentPage={orderFlowListings.page}
                          fetchOrderFlowRequest={fetchOrderFlowRequest}
                          //  data={Object.values(orderFlowListings.dict)}
                          fetchPDFAttachmentRequest={fetchPDFAttachmentRequest}
                          pdfAttachment={pdfAttachment}
                          sendEmailRequest={sendEmailRequest}
                          globals={globals}
                          ticketPurchasedRequest={ticketPurchasedRequest}
                          cloakListings={cloakListings}
                          fetchCloakListingRequest={fetchCloakListingRequest}
                          manualTransferRequest={manualTransferRequest}
                          isFetching={isOrderFlowFetching}
                          fetchPDFDownlaodedRequest={fetchPDFDownlaodedRequest}
                          deleteOpenListingsRequest={deleteOpenListingsRequest}
                          pdfDownloaded={pdfDownloaded}
                          saveSelectEvent={saveSelectEvent}
                          saveSelectedEventFrom={saveSelectedEventFrom}
                          appReceiveAlert={appReceiveAlert}
                          updateEventTmOrderNumber={updateEventTmOrderNumber}
                          fetchOrderfullfillmentRequest={
                            fetchOrderfullfillmentRequest
                          }
                          fullfillOrder={fullfillOrder}
                          fetchEvenuePDFRequest={fetchEvenuePDFRequest}
                          evenuePDf={evenuePDf}
                          isResetPasswordFetching={isResetPasswordFetching}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {userInfo.role.toLowerCase() === "manager" ? (
                ""
              ) : (
                <div
                  className="col-sm-4"
                  style={{
                    display:
                      userInfo.role.toLowerCase() === "buyer" ? "none" : ""
                  }}
                >
                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl">
                      <h2>Statistics</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <Statistics
                        ordersCostCount={openSaleslistings.ordersCostCount}
                        fetchSoldStatisticsRequest={fetchSoldStatisticsRequest}
                        soldStatisticsLog={soldStatisticsLog}
                        isFetching={isFetching}
                        globals={globals}
                      />
                      <div className="view_text">
                        <a href="#salesStatistic">View more statistics</a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {userInfo.role.toLowerCase() === "buyer" ||
              userInfo.role.toLowerCase() === "manager" ? (
                <div
                  // className={"col-sm-12"}
                  className={
                    userInfo.role.toLowerCase() === "buyer"
                      ? "col-sm-12"
                      : "col-sm-4"
                  }
                >
                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl">
                      <h2>Timer</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <ClockTimer
                        clockInClockOutRequest={clockInClockOutRequest}
                        fetchClockTimerRequest={fetchClockTimerRequest}
                        updateUserForBreakRequest={updateUserForBreakRequest}
                        clockTimerList={clockTimerList}
                        createTimerRequest={createTimerRequest}
                        userInfo={userInfo}
                        isFetching={isFetching}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="col-sm-12">
                <div className="fl_w">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="white_box mrgbtm50">
                        <div className="cm_ttl dis_inline">
                          <h2>Open Orders</h2>
                        </div>

                        <div className="inner_box_body padL3T5 dashboard-table-body">
                          <div className="tbl_main  order_tbl_main">
                            <div className="inner_tbl">
                              {isOpenOrderFetching || openOrderSpinner ? (
                                <Spinner />
                              ) : (
                                <ListingsDataTable
                                  data={
                                    openSaleslistings.sortedOtherListings ||
                                    Object.values(openSaleslistings.dict)
                                  }
                                  from={"openOrders"}
                                  type={TYPE_SALE_LISTING}
                                  ticketPurchasedRequest={
                                    ticketPurchasedRequest
                                  }
                                  userInfo={userInfo}
                                  isFetching={isFetching}
                                  saveSelectEvent={saveSelectEvent}
                                  saveSelectedEventFrom={saveSelectedEventFrom}
                                  updateEventTmOrderNumber={
                                    updateEventTmOrderNumber
                                  }
                                  updateIsBlackListRequest={
                                    updateIsBlackListRequest
                                  }
                                  actions={() => {
                                    return (
                                      <TableHeaderColumn
                                        width="10%"
                                        dataField="button"
                                        dataAlign="center"
                                        expandable={false}
                                        dataFormat={(cell, row) => {
                                          return (
                                            <div className="tbl_btn dash_btn">
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    {row.username == null
                                                      ? "NA"
                                                      : row.username}
                                                  </Tooltip>
                                                }
                                              >
                                                <Image
                                                  src={
                                                    row.profile == null
                                                      ? require("./../../assets/img/avatar-icon.png")
                                                      : setBackendUrl() +
                                                        row.profile
                                                  }
                                                  roundedCircle
                                                  height="40"
                                                  width="40"
                                                />
                                              </OverlayTrigger>
                                              {!row.currentlyTryingToBuy && (
                                                <OverlayTrigger
                                                  placement="left"
                                                  overlay={
                                                    <Tooltip>
                                                      Buy Ticket
                                                    </Tooltip>
                                                  }
                                                >
                                                  <Button
                                                    className="icon_btn"
                                                    active
                                                    color="primary"
                                                    aria-pressed="true"
                                                    onClick={() => {
                                                      setErrorMessage("");
                                                      tryBuyAgainRequest(row);
                                                      setOpenOrderSpinner(true);
                                                    }}
                                                  >
                                                    <i
                                                      className="fa fa-ticket"
                                                      aria-hidden="true"
                                                    ></i>
                                                  </Button>
                                                </OverlayTrigger>
                                              )}{" "}
                                              {row.presale ? (
                                                <OverlayTrigger
                                                  placement="left"
                                                  overlay={
                                                    <Tooltip>
                                                      Presale Order
                                                    </Tooltip>
                                                  }
                                                >
                                                  <i
                                                    className="fa fa-lock"
                                                    aria-hidden="true"
                                                    style={{ color: "Black" }}
                                                  ></i>
                                                </OverlayTrigger>
                                              ) : (
                                                ""
                                              )}
                                              <OverlayTrigger
                                                placement="left"
                                                overlay={
                                                  <Tooltip>
                                                    Buyer Summary
                                                  </Tooltip>
                                                }
                                              >
                                                <Button
                                                  className="icon_btn"
                                                  active
                                                  color="primary"
                                                  aria-pressed="true"
                                                  onClick={() => {
                                                    fetchUserSummaryRequest(
                                                      row.eventId
                                                    );
                                                  }}
                                                >
                                                  <i
                                                    className="fa fa-shopping-basket"
                                                    aria-hidden="true"
                                                  ></i>
                                                </Button>
                                              </OverlayTrigger>
                                              {row.eventPostponed ? (
                                                <OverlayTrigger
                                                  placement="left"
                                                  overlay={
                                                    <Tooltip>
                                                      Event PostPonded
                                                    </Tooltip>
                                                  }
                                                >
                                                  <i
                                                    className="fa fa-warning"
                                                    aria-hidden="true"
                                                    style={{ color: "yellow" }}
                                                  ></i>
                                                </OverlayTrigger>
                                              ) : (
                                                ""
                                              )}
                                              {row.marketType &&
                                              row.marketType
                                                .toLowerCase()
                                                .includes("evenue")
                                                ? evenueImg()
                                                : ""}
                                              {row.marketType &&
                                              row.marketType
                                                .toLowerCase()
                                                .includes("AXS")
                                                ? AXSImg()
                                                : ""}
                                              {row.marketType &&
                                              row.marketType
                                                .toLowerCase()
                                                .includes("metopera")
                                                ? metoperaImg()
                                                : ""}
                                              {row.marketType &&
                                              row.marketType
                                                .toLowerCase()
                                                .includes("nycballet")
                                                ? nycballetImg()
                                                : ""}
                                              {row.marketType &&
                                              row.marketType
                                                .toLowerCase()
                                                .includes("mlb")
                                                ? mlbImg()
                                                : ""}
                                              {row.marketType &&
                                              row.marketType
                                                .toLowerCase()
                                                .includes("seatgeek_broadway")
                                                ? seatgeekBroadwayImg()
                                                : ""}
                                              {row.marketType &&
                                              row.marketType
                                                .toLowerCase()
                                                .includes("broadway.com")
                                                ? broadwayComImg()
                                                : ""}
                                              {row.customerDisplayName
                                                .toLowerCase()
                                                .includes("seatgeek")
                                                ? seatgeekImg()
                                                : ""}
                                              {row.customerDisplayName
                                                .replace(/ /g, "")
                                                .toLowerCase()
                                                .includes("vividseats")
                                                ? vividseatsImg()
                                                : ""}
                                              {row.customerDisplayName
                                                .toLowerCase()
                                                .includes("tickpick")
                                                ? tickpickImg()
                                                : ""}
                                              {row.customerDisplayName
                                                .toLowerCase()
                                                .includes("mytickettracker")
                                                ? mytickettrackerImg()
                                                : ""}
                                              {row.customerDisplayName
                                                .toLowerCase()
                                                .includes("ticketnetwork") ||
                                              row.customerDisplayName
                                                .toLowerCase()
                                                .includes("ticket network")
                                                ? ticketNetworkImg()
                                                : ""}
                                              {row.customerDisplayName
                                                .toLowerCase()
                                                .includes("gametime")
                                                ? gametimeImg()
                                                : ""}
                                              {row.customerDisplayName
                                                .toLowerCase()
                                                .includes("viagogo")
                                                ? viagogoImg()
                                                : ""}
                                              {row.customerDisplayName
                                                .toLowerCase()
                                                .includes("stubhub")
                                                ? stubhubImg()
                                                : ""}
                                            </div>
                                          );
                                        }}
                                      >
                                        Actions
                                      </TableHeaderColumn>
                                    );
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="white_box mrgbtm20">
                            <div className="cm_ttl dis_inline">
                              <h2>Temporary Error Orders</h2>
                            </div>

                            <div className="inner_box_body padL3T5 dashboard-table-body">
                              <div className="tbl_main  order_tbl_main">
                                <div className="inner_tbl">
                                  {isOpenOrderFetching ||
                                  tempErrorOrderSpinner ? (
                                    <Spinner />
                                  ) : (
                                    <ListingsDataTable
                                      data={
                                        openSaleslistings.sortedTempErrorListings ||
                                        Object.values(openSaleslistings.dict)
                                      }
                                      from={"tempErrorOrders"}
                                      type={TYPE_SALE_LISTING}
                                      ticketPurchasedRequest={
                                        ticketPurchasedRequest
                                      }
                                      userInfo={userInfo}
                                      isFetching={isFetching}
                                      saveSelectEvent={saveSelectEvent}
                                      saveSelectedEventFrom={
                                        saveSelectedEventFrom
                                      }
                                      updateEventTmOrderNumber={
                                        updateEventTmOrderNumber
                                      }
                                      updateIsBlackListRequest={
                                        updateIsBlackListRequest
                                      }
                                      actions={() => {
                                        return (
                                          <TableHeaderColumn
                                            width="10%"
                                            dataField="button"
                                            dataAlign="center"
                                            expandable={false}
                                            dataFormat={(cell, row) => {
                                              return (
                                                <div className="tbl_btn dash_btn">
                                                  {!row.currentlyTryingToBuy && (
                                                    <OverlayTrigger
                                                      placement="left"
                                                      overlay={
                                                        <Tooltip>
                                                          Buy Ticket
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <Button
                                                        className="icon_btn"
                                                        active
                                                        color="primary"
                                                        aria-pressed="true"
                                                        onClick={() => {
                                                          setErrorMessage("");
                                                          tryBuyAgainRequest(
                                                            row
                                                          );
                                                          setTempErrorOrderSpinner(
                                                            true
                                                          );
                                                        }}
                                                      >
                                                        <i
                                                          className="fa fa-ticket"
                                                          aria-hidden="true"
                                                        ></i>
                                                      </Button>
                                                    </OverlayTrigger>
                                                  )}{" "}
                                                  {row.presale ? (
                                                    <OverlayTrigger
                                                      placement="left"
                                                      overlay={
                                                        <Tooltip>
                                                          Presale Order
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <i
                                                        className="fa fa-lock"
                                                        aria-hidden="true"
                                                        style={{
                                                          color: "Black"
                                                        }}
                                                      ></i>
                                                    </OverlayTrigger>
                                                  ) : (
                                                    ""
                                                  )}
                                                  <OverlayTrigger
                                                    placement="left"
                                                    overlay={
                                                      <Tooltip>
                                                        Buyer Summary
                                                      </Tooltip>
                                                    }
                                                  >
                                                    <Button
                                                      className="icon_btn"
                                                      active
                                                      color="primary"
                                                      aria-pressed="true"
                                                      onClick={() => {
                                                        fetchUserSummaryRequest(
                                                          row.eventId
                                                        );
                                                      }}
                                                    >
                                                      <i
                                                        className="fa fa-shopping-basket"
                                                        aria-hidden="true"
                                                      ></i>
                                                    </Button>
                                                  </OverlayTrigger>
                                                  {row.eventPostponed ? (
                                                    <OverlayTrigger
                                                      placement="left"
                                                      overlay={
                                                        <Tooltip>
                                                          Event PostPonded
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <i
                                                        className="fa fa-warning"
                                                        aria-hidden="true"
                                                        style={{
                                                          color: "yellow"
                                                        }}
                                                      ></i>
                                                    </OverlayTrigger>
                                                  ) : (
                                                    ""
                                                  )}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("evenue")
                                                    ? evenueImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("AXS")
                                                    ? AXSImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("metopera")
                                                    ? metoperaImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("nycballet")
                                                    ? nycballetImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("mlb")
                                                    ? mlbImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("seatgeek")
                                                    ? seatgeekBroadwayImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("broadway.com")
                                                    ? broadwayComImg()
                                                    : ""}
                                                  {row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("seatgeek")
                                                    ? seatgeekImg()
                                                    : ""}
                                                  {row.customerDisplayName
                                                    .replace(/ /g, "")
                                                    .toLowerCase()
                                                    .includes("vividseats")
                                                    ? vividseatsImg()
                                                    : ""}
                                                  {row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("tickpick")
                                                    ? tickpickImg()
                                                    : ""}
                                                  {row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("mytickettracker")
                                                    ? mytickettrackerImg()
                                                    : ""}
                                                  {row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes(
                                                      "ticketnetwork"
                                                    ) ||
                                                  row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("ticket network")
                                                    ? ticketNetworkImg()
                                                    : ""}
                                                  {row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("gametime")
                                                    ? gametimeImg()
                                                    : ""}
                                                  {row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("viagogo")
                                                    ? viagogoImg()
                                                    : ""}
                                                  {row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("stubhub")
                                                    ? stubhubImg()
                                                    : ""}
                                                </div>
                                              );
                                            }}
                                          >
                                            Actions
                                          </TableHeaderColumn>
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="white_box mrgbtm50">
                            <div className="cm_ttl dis_inline">
                              <h2>Problematic Open Orders</h2>
                            </div>

                            <div className="inner_box_body padL3T5 dashboard-table-body">
                              <div className="tbl_main  order_tbl_main">
                                <div className="inner_tbl">
                                  {problemOrderSpinner ? (
                                    <Spinner />
                                  ) : (
                                    <RedListingsDataTable
                                      data={
                                        openSaleslistings.sortedRedListings ||
                                        Object.values(openSaleslistings.dict)
                                      }
                                      type={TYPE_SALE_LISTING}
                                      ticketPurchasedRequest={
                                        ticketPurchasedRequest
                                      }
                                      userInfo={userInfo}
                                      isFetching={isFetching}
                                      saveSelectEvent={saveSelectEvent}
                                      saveSelectedEventFrom={
                                        saveSelectedEventFrom
                                      }
                                      updateEventTmOrderNumber={
                                        updateEventTmOrderNumber
                                      }
                                      updateIsBlackListRequest={
                                        updateIsBlackListRequest
                                      }
                                      actions={() => {
                                        return (
                                          <TableHeaderColumn
                                            width="10%"
                                            dataField="button"
                                            dataAlign="center"
                                            expandable={false}
                                            dataFormat={(cell, row) => {
                                              return (
                                                <div className="tbl_btn dash_btn">
                                                  {!row.currentlyTryingToBuy &&
                                                    !row.isPurchasedFromSecondaryMarket && (
                                                      <OverlayTrigger
                                                        placement="left"
                                                        overlay={
                                                          <Tooltip>
                                                            Buy Ticket
                                                          </Tooltip>
                                                        }
                                                      >
                                                        <Button
                                                          className="icon_btn"
                                                          active
                                                          color="primary"
                                                          aria-pressed="true"
                                                          onClick={() => {
                                                            setErrorMessage("");
                                                            tryBuyAgainRequest(
                                                              row
                                                            );
                                                            setProblemOrderSpinner(
                                                              true
                                                            );
                                                          }}
                                                        >
                                                          <i
                                                            className="fa fa-ticket"
                                                            aria-hidden="true"
                                                          ></i>
                                                        </Button>
                                                      </OverlayTrigger>
                                                    )}{" "}
                                                  {!row.isPurchasedFromSecondaryMarket && (
                                                    <OverlayTrigger
                                                      placement="left"
                                                      overlay={
                                                        <Tooltip>
                                                          Buyer Summary
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <Button
                                                        className="icon_btn"
                                                        active
                                                        color="primary"
                                                        aria-pressed="true"
                                                        onClick={() => {
                                                          fetchUserSummaryRequest(
                                                            row.eventId
                                                          );
                                                        }}
                                                      >
                                                        <i
                                                          className="fa fa-shopping-basket"
                                                          aria-hidden="true"
                                                        ></i>
                                                      </Button>
                                                    </OverlayTrigger>
                                                  )}{" "}
                                                  {row.isPurchasedFromSecondaryMarket && (
                                                    <div>
                                                      <OverlayTrigger
                                                        placement="left"
                                                        overlay={
                                                          <Tooltip>
                                                            Order Completed
                                                          </Tooltip>
                                                        }
                                                      >
                                                        <Button
                                                          className="icon_btn"
                                                          active
                                                          color="primary"
                                                          aria-pressed="true"
                                                          onClick={() => {
                                                            deleteOpenListingsRequest(
                                                              {
                                                                id:
                                                                  row.listingId,
                                                                isFromRedTable: true
                                                              }
                                                            );
                                                          }}
                                                        >
                                                          <i
                                                            className="fa fa-first-order"
                                                            aria-hidden="true"
                                                          ></i>
                                                        </Button>
                                                      </OverlayTrigger>

                                                      <OverlayTrigger
                                                        placement="left"
                                                        overlay={
                                                          <Tooltip>
                                                            Order Busted
                                                          </Tooltip>
                                                        }
                                                      >
                                                        <Button
                                                          className="icon_btn"
                                                          active
                                                          color="primary"
                                                          aria-pressed="true"
                                                          onClick={() => {
                                                            deleteOpenListingsRequest(
                                                              row._id
                                                            );
                                                          }}
                                                        >
                                                          <i
                                                            className="fa fa-adjust"
                                                            aria-hidden="true"
                                                          ></i>
                                                        </Button>
                                                      </OverlayTrigger>
                                                    </div>
                                                  )}{" "}
                                                  {row.eventDBId
                                                    .is_postponed ? (
                                                    <OverlayTrigger
                                                      placement="left"
                                                      overlay={
                                                        <Tooltip>
                                                          Event PostPonded
                                                        </Tooltip>
                                                      }
                                                    >
                                                      <i
                                                        className="fa fa-warning"
                                                        aria-hidden="true"
                                                        style={{
                                                          color: "yellow"
                                                        }}
                                                      ></i>
                                                    </OverlayTrigger>
                                                  ) : (
                                                    ""
                                                  )}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("AXS")
                                                    ? AXSImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("evenue")
                                                    ? evenueImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("metopera")
                                                    ? metoperaImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("nycballet")
                                                    ? nycballetImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("mlb")
                                                    ? mlbImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes(
                                                      "seatgeek_broadway"
                                                    )
                                                    ? seatgeekBroadwayImg()
                                                    : ""}
                                                  {row.marketType &&
                                                  row.marketType
                                                    .toLowerCase()
                                                    .includes("broadway.com")
                                                    ? broadwayComImg()
                                                    : ""}
                                                  {row.customerDisplayName &&
                                                  row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("seatgeek")
                                                    ? seatgeekImg()
                                                    : ""}
                                                  {row.customerDisplayName &&
                                                  row.customerDisplayName
                                                    .replace(/ /g, "")
                                                    .toLowerCase()
                                                    .includes("vividseats")
                                                    ? vividseatsImg()
                                                    : ""}
                                                  {row.customerDisplayName &&
                                                  row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("tickpick")
                                                    ? tickpickImg()
                                                    : ""}
                                                  {row.customerDisplayName &&
                                                  row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("mytickettracker")
                                                    ? mytickettrackerImg()
                                                    : ""}
                                                  {row.customerDisplayName &&
                                                  row.customerDisplayName
                                                    .replace(/ /g, "")
                                                    .toLowerCase()
                                                    .includes("ticketnetwork")
                                                    ? ticketNetworkImg()
                                                    : ""}
                                                  {row.customerDisplayName &&
                                                  row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("gametime")
                                                    ? gametimeImg()
                                                    : ""}
                                                  {row.customerDisplayName &&
                                                  row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("viagogo")
                                                    ? viagogoImg()
                                                    : ""}
                                                  {row.customerDisplayName &&
                                                  row.customerDisplayName
                                                    .toLowerCase()
                                                    .includes("stubhub")
                                                    ? stubhubImg()
                                                    : ""}
                                                </div>
                                              );
                                            }}
                                          >
                                            Actions
                                          </TableHeaderColumn>
                                        );
                                      }}
                                    />
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

              <div className="col-sm-12">
                <div className="fl_w">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="white_box mrgbtm50">
                        <div className="cm_ttl dis_inline">
                          <h2>Slipped Orders</h2>
                        </div>

                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main order_tbl_main nw_od_cls">
                            <div className="inner_tbl">
                              <OrdersDataTable
                                fetchSlipOrderRequest={fetchSlipOrderRequest}
                                slipOrders={
                                  slipOrders != undefined ? slipOrders : []
                                }
                                isFetching={isSlipOrderFetching}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="white_box mrgbtm50">
                        <div className="cm_ttl dis_inline">
                          <h2>Upcoming Orders</h2>
                        </div>

                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main  order_tbl_main">
                            <div className="inner_tbl">
                              <UpComingOrders
                                fetchUpComingOrderRequest={
                                  fetchUpComingOrderRequest
                                }
                                upComingOrders={
                                  upComingOrders != undefined
                                    ? upComingOrders
                                    : []
                                }
                                isFetching={isFetching}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {showPdfTransfer ? (
                <ManualPdfTransfer
                  cloakListings={cloakListings}
                  manualTransferRequest={manualTransferRequest}
                  purchasedKey={purchasedKey}
                  isPdfOpen={isPdfTransferOpen =>
                    setShowPdfTransfer(isPdfTransferOpen)
                  }
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
