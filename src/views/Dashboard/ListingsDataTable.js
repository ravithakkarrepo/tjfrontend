/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";
import TicketPurchased from "./ticketPurchased";
import {
  dateSortFuncForEvent,
  dateFormatter,
  numberFormatterwithoutFraction
} from "../../utils";

import {
  TYPE_TRANSFER_LISTING,
  TYPE_SALE_LISTING,
  TYPE_PROBLEM_BUYING_LISTING
} from "../../constants";
import { withRouter } from "react-router-dom";

const selectRow = {
  mode: "checkbox",
  clickToExpand: true
};

// const priceFormat = cell => cell && <i>{`$${cell}`}</i>

const ListingsDataTable = ({
  data,
  actions,
  deleteOpenListingsRequest,
  ticketPurchasedRequest,
  type,
  saveSelectEvent,
  saveSelectedEventFrom,
  userInfo,
  history,
  updateEventTmOrderNumber,
  updateIsBlackListRequest,
  from
}) => {
  // const isNotEmpty = Array.isArray(data)
  //   ? data.length || 0
  //   : Object.keys(data).length || 0

  const [showTicketPurchased, setShowTicketPurchased] = useState(false);
  const [purchasedKey, setPurchasedKey] = useState("");
  const [OrderNotes, setOrderNotes] = useState(false);
  const [tmOrderEventId, setTmOrderEventId] = useState("");
  const [showSpinner, setShowSpinner] = useState(true);
  const [isNotEmpty, setIsNotEmpty] = useState(0);
  var blacklistReason = "";
  var blacklistReasonSelected = "";

  useEffect(() => {
    // isNotEmpty === 0 ? setShowSpinner(true) : setShowSpinner(false)
    // if (isNotEmpty === 0 && showSpinner) {
    //   setTimeout(() => {
    //     setShowSpinner(false)
    //     setIsNotEmpty(null)
    //   }, 10000)
    // } else {
    //   setIsNotEmpty(
    //     Array.isArray(data) ? data.length || 0 : Object.keys(data).length || 0
    //   )
    // }
    // console.log(`isNotEmpty`, isNotEmpty)
    // console.log(`showSpinner`, showSpinner)
  });
  const trClassName = (row, rowIndex) => {
    if (!row) return "";

    if (type === TYPE_SALE_LISTING) {
      const { currentlyTryingToBuy, problemBuying, readyToBuy, username } = row;

      if (currentlyTryingToBuy) {
        return "yellow-bg-cl";
      }

      if (problemBuying) {
        return from === "tempErrorOrders"
          ? "purple-bg-cl"
          : "red-bg-cl blink-red";
      }

      if (readyToBuy != undefined && !readyToBuy) {
        return "purple-bg-cl";
      }

      if (userInfo.role == "buyer") {
        if (userInfo.username == username) {
          return "green-bg-cl blink-gn";
        } else {
          return "skyblue-bg-cl";
        }
      }

      if (row.saleType == "Day of sale") {
        return "green-bg-cl blink-gn-fast";
      } else {
        return "green-bg-cl blink-gn";
      }
    } else if (type === TYPE_TRANSFER_LISTING) {
      return "";
    }
  };

  const createCustomDeleteButton = onBtnClick => {
    return (
      <>
        <Button color="primary" className="btn-pill" onClick={onBtnClick}>
          {type == TYPE_TRANSFER_LISTING
            ? "Complete Order"
            : "Ticket Purchased"}
        </Button>

        {showTicketPurchased ? (
          <TicketPurchased
            userInfo={userInfo}
            purchasedKey={purchasedKey}
            ticketPurchasedRequest={ticketPurchasedRequest}
            isTicketPurchase={isTicketPurchaseOpen =>
              setShowTicketPurchased(isTicketPurchaseOpen)
            }
          />
        ) : (
          ""
        )}
      </>
    );
  };

  const customConfirm = (next, dropRowKeys) => {
    if (type === TYPE_TRANSFER_LISTING) {
      deleteOpenListingsRequest(dropRowKeys);
    } else if (
      type === TYPE_SALE_LISTING ||
      type === TYPE_PROBLEM_BUYING_LISTING
    ) {
      setShowTicketPurchased(true);
      setPurchasedKey(dropRowKeys);
      // ticketPurchasedRequest(dropRowKeys)
    }
    // next()
  };

  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: from === "tempErrorOrders" ? 5 : 20, // which size per page you want to locate as default
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
    expandBy: "column",
    defaultSortName: "eventDetails" // default sort column name
    // defaultSortOrder: "desc" // default sort order
  };

  const TMAndGAFormatter = (cell, row) => {
    if (row.isGa == true) return row.gaAvailability;
    else return row.highestRowsBack;
  };

  const newUrlFormatter = (cell, row) => {
    var hasSkyboxEventId = false;
    if (row.skyBoxEventId) {
      hasSkyboxEventId = true;
      var skyboxEventURL = `https://www.vividseats.com/production/${row.skyBoxEventId}`;
    }
    return (
      <>
        <a
          href={
            row.eventUrl !== "" && row.eventUrl !== null
              ? row.eventUrl
              : row.ticketMasterUrl
          }
          target="_blank"
        >
          {row.eventId}
        </a>
        {hasSkyboxEventId && (
          <>
            <br />
            <br />
            <Form.Label className="custom_form_label">
              Vivid Event Id
            </Form.Label>
            <a href={skyboxEventURL} target="_blank">
              {row.skyBoxEventId}
            </a>
          </>
        )}
      </>
    );
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
        <span>{row.eventDate}</span>

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

  const sectionFormatter = (cell, row) => {
    return (
      <div>
        <span>Seat: {row.seat}</span>
        <br />
        <span>Qty: {row.quantitySold}</span>
        <br />
        <span>
          Base Cost:{" "}
          {row.baseCost ? numberFormatterwithoutFraction(row.baseCost) : ""}
        </span>
        <br />
        <span>
          Final Cost:{" "}
          {row.unitCost ? numberFormatterwithoutFraction(row.unitCost) : ""}
        </span>
      </div>
    );
  };

  const isExpandRow = () => {
    return true;
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

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>External Reference</label>{" "}
          <span className="row_val"> {`${row.externalReference || ""}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>Sale Time</label>{" "}
          <span className="row_val"> {`${row.saleTime}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>InvoiceId</label>{" "}
          <span className="row_val">
            <a href={row.invoiceIdUrl} target="_blank">
              {row.invoiceId}
            </a>
            {type === TYPE_TRANSFER_LISTING ? (
              ""
            ) : (
              <Button
                className="problematic_btn"
                variant="primary"
                onClick={() => {
                  saveSelectEvent(row);
                  saveSelectedEventFrom("ListingsDataTable");
                  const win = window.open(`/#/event/${row.eventId}`, "_blank");
                  win.window.from = "ListingsDataTable";
                  win.focus();
                  // history.push({
                  //   pathname: `/event/${row.eventId}`,
                  //   state: { from: "ListingsDataTable" }
                  // })
                }}
              >
                View Event
              </Button>
            )}
          </span>
        </div>
        <div className="expand_row_inner">
          <label>Order Notes </label>
          {OrderNotes && tmOrderEventId === row.eventId ? (
            <>
              <Form.Control
                type="text"
                className="problematic_form_control"
                id={row.eventId}
                defaultValue={`${row.orderNotes || ""}`}
                onChange={evt => {
                  row.orderNotes = evt.target.value;
                }}
              />
              <Button
                className="problematic_btn"
                variant="primary"
                id={row.eventId}
                onClick={() => {
                  var order_Notes = row.orderNotes;
                  var orderNum = row.orderNum;
                  var listingId =
                    row.listingId !== undefined ? row.listingId : "";
                  updateEventTmOrderNumber({
                    listingId: listingId,
                    orderNotes: order_Notes,
                    orderNum
                  });
                  setOrderNotes(false);
                }}
              >
                Update Notes
              </Button>
            </>
          ) : (
            <span
              className="row_val"
              onClick={() => {
                setOrderNotes(true);
                setTmOrderEventId(row.eventId);
              }}
              style={{ cursor: "pointer", display: "block" }}
            >
              {row.orderNotes ? `${row.orderNotes}` : <>&nbsp;</>}
            </span>
          )}
        </div>
        <div className="expand_row_inner">
          <label>BlackList</label>{" "}
          <span className="row_val">
            {type === TYPE_TRANSFER_LISTING ? (
              ""
            ) : (
              <Button
                className="problematic_btn"
                variant="primary"
                onClick={() => {
                  const payload = {
                    eventId: row.eventId,
                    is_blackList: true,
                    row: row
                  };
                  customConfirmBlackList(payload);
                }}
              >
                BlackList Event
              </Button>
            )}
          </span>
        </div>
      </div>
    );
  };
  if (type === TYPE_TRANSFER_LISTING) {
    return (
      <div className="animated">
        {/* {isNotEmpty ? ( */}
        <BootstrapTable
          data={data}
          version="4"
          striped
          hover
          pagination
          options={options}
          trClassName={trClassName}
          selectRow={selectRow}
          expandableRow={isExpandRow}
          expandComponent={expandRow}
          expandColumnOptions={{ expandColumnVisible: true }}
          deleteRow
          search
        >
          <TableHeaderColumn dataField="listingId" isKey hidden>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            width="12%"
            dataField="eventId"
            dataFormat={newUrlFormatter}
          >
            EventID
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
          <TableHeaderColumn width="25%" dataFormat={sectionFormatter}>
            Ticket Details
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventName" hidden>
            EventName
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventAddress" hidden>
            Venue
          </TableHeaderColumn>
          <TableHeaderColumn dataField="invoiceId" hidden>
            InvoiceId
          </TableHeaderColumn>
          <TableHeaderColumn dataField="customerDisplayName" hidden>
            CustomerDisplayName
          </TableHeaderColumn>
          {actions && actions()}
        </BootstrapTable>
        {/* ) : (  <Spinner />
         )} */}
      </div>
    );
  } else {
    return (
      <div className="animated">
        {/* {!showSpinner ? ( */}
        <BootstrapTable
          data={data}
          version="4"
          striped
          hover
          pagination
          options={options}
          // trStyle={trStyle}
          trClassName={trClassName}
          selectRow={selectRow}
          expandableRow={isExpandRow}
          expandComponent={expandRow}
          expandColumnOptions={{ expandColumnVisible: true }}
          deleteRow
          search
        >
          <TableHeaderColumn dataField="listingId" isKey hidden>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn
            width="12%"
            dataField="eventId"
            dataFormat={newUrlFormatter}
          >
            EventID
          </TableHeaderColumn>
          {/* <TableHeaderColumn
          dataField="ticketMasterUrl"
          dataFormat={urlFormatter("TicketMaster")}
        >
          TicketMasterUrl
        </TableHeaderColumn> */}
          <TableHeaderColumn
            dataFormat={detailsFormatter}
            dataField="eventDetails"
            sort={"asc"}
            dataSort
            sortFunc={dateSortFuncForEvent}
          >
            Event Details
          </TableHeaderColumn>
          <TableHeaderColumn width="25%" dataFormat={sectionFormatter}>
            Ticket Details
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventName" hidden>
            EventName
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventAddress" hidden>
            Venue
          </TableHeaderColumn>
          <TableHeaderColumn dataField="invoiceId" hidden>
            invoiceId
          </TableHeaderColumn>
          <TableHeaderColumn dataField="externalReference" hidden>
            externalReference
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventId" hidden>
            eventId
          </TableHeaderColumn>
          <TableHeaderColumn dataField="customerDisplayName" hidden>
            CustomerDisplayName
          </TableHeaderColumn>
          {/* <TableHeaderColumn dataField="eventDate" hidden>EventDate</TableHeaderColumn> */}
          {/* <TableHeaderColumn dataField="eventName">EventName</TableHeaderColumn>
        <TableHeaderColumn dataField="eventAddress">Venue</TableHeaderColumn>
        <TableHeaderColumn dataField="eventDate">EventDate</TableHeaderColumn>
        <TableHeaderColumn dataField="seat">Seat</TableHeaderColumn>
        <TableHeaderColumn dataField="quantitySold">Qty Sold</TableHeaderColumn>
        <TableHeaderColumn dataField="saleTime">SaleTime</TableHeaderColumn>
        <TableHeaderColumn
          dataField="invoiceId"
          dataFormat={urlFormatter("InvoceIdUrl")}
        >
          InvoiceId
        </TableHeaderColumn>
        <TableHeaderColumn dataField="problemNotes">
          ProblemNotes
        </TableHeaderColumn>
        {type === TYPE_TRANSFER_LISTING && (
          <TableHeaderColumn dataField="orderNum">OrderNum</TableHeaderColumn>
        )} */}
          {/* {type === TYPE_SALE_LISTING && (
          <TableHeaderColumn dataField="currentlyTryingToBuy">
            CurrentlyTryingToBuy
          </TableHeaderColumn>
        )} */}
          {/* {type === TYPE_SALE_LISTING && (
          <TableHeaderColumn dataField="reasonProblemBuying">
            ReasonProblemBuying
          </TableHeaderColumn>
        )}*/}
          <TableHeaderColumn width="12%" dataFormat={TMAndGAFormatter}>
            TMRowsBack/GA availability
          </TableHeaderColumn>
          {/* <TableHeaderColumn
          width="10%"
          dataField="baseCost"
          dataFormat={priceFormat}
        >
          BaseCost
        </TableHeaderColumn> */}
          {actions && actions()}
        </BootstrapTable>
        {/* ) : (
          <Spinner />
        )} */}
      </div>
    );
  }
};

export default withRouter(ListingsDataTable);
