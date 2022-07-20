/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";
import {
  dateSortFuncForEvent,
  dateFormatter,
  numberFormatterwithoutFraction
} from "../../utils";
import TicketPurchased from "./ticketPurchased";

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

const RedListingsDataTable = ({
  data,
  actions,
  deleteOpenListingsRequest,
  ticketPurchasedRequest,
  userInfo,
  type,
  saveSelectEvent,
  saveSelectedEventFrom,
  history,
  updateEventTmOrderNumber,
  updateIsBlackListRequest
}) => {
  const isNotEmpty = Array.isArray(data)
    ? data.length
    : Object.keys(data).length;

  const [showTicketPurchased, setShowTicketPurchased] = useState(false);
  const [purchasedKey, setPurchasedKey] = useState("");
  const [OrderNotes, setOrderNotes] = useState(false);
  const [tmOrderEventId, setTmOrderEventId] = useState("");
  var blacklistReason = "";
  var blacklistReasonSelected = "";

  // const trStyle = (row, rowIndex) => {
  //   if (!row) return { backgroundColor: "rgba(0, 0, 0, 0)" }

  //   if (type === TYPE_SALE_LISTING) {
  //     const { currentlyTryingToBuy, problemBuying } = row

  //     if (currentlyTryingToBuy) {
  //       return { backgroundColor: "rgb(255, 193, 7)" }
  //     }

  //     if (problemBuying) {
  //       return { backgroundColor: "rgb(248, 108, 107)" }
  //     }

  //     return { backgroundColor: "rgb(77, 189, 116)" }
  //   } else if (type === TYPE_TRANSFER_LISTING) {
  //     return { backgroundColor: "rgba(0, 0, 0, 0)" }
  //   }
  // }

  const isExpandRow = () => {
    return true;
  };

  const customConfirmBlackList = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          <span>Are you sure you want to blackList this events?</span>{" "}
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
              eventId: next.eventId,
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
          <label>Problem Notes</label>{" "}
          <span className="row_val"> {`${row.problemNotes}`} </span>
        </div>
        <div className="expand_row_inner">
          <label>Reason Problem Buying</label>{" "}
          <span className="row_val"> {`${row.reasonProblemBuying}`} </span>
        </div>
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
            <Button
              className="problematic_btn"
              variant="primary"
              onClick={() => {
                saveSelectEvent(row);
                saveSelectedEventFrom("RedListingsDataTable");
                var win = window.open(`/#/event/${row.eventId}`, "_blank");
                win.window.from = "RedListingsDataTable";
                win.focus();
                // history.push({
                //   pathname: `/event/${row.eventId}`,
                //   state: { from: "RedListingsDataTable" }
                // })
              }}
            >
              View Event
            </Button>
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
                  var orderNum = row.orderNum || null;
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
          </span>
        </div>
      </div>
    );
  };

  const trClassName = (row, rowIndex) => {
    if (!row) return "";

    if (type === TYPE_SALE_LISTING) {
      const {
        currentlyTryingToBuy,
        problemBuying,
        readyToBuy,
        isPurchasedFromSecondaryMarket
      } = row;

      if (currentlyTryingToBuy) {
        return "yellow-bg-cl";
      }

      if (problemBuying && isPurchasedFromSecondaryMarket) {
        return "blue-bg-cl";
      }

      if (problemBuying) {
        return "red-bg-cl blink-red";
      }

      if (readyToBuy != undefined && !readyToBuy) {
        return "purple-bg-cl";
      }

      return "green-bg-cl blink-gn";
    } else if (type === TYPE_TRANSFER_LISTING) {
      return "";
    }

    // if (!row || type !== TYPE_SALE_LISTING) return ""

    // const { currentlyTryingToBuy, problemBuying } = row

    // if (!currentlyTryingToBuy && !problemBuying) return "blink"

    // return ""
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
            fromRedTable={true}
            purchasedKey={purchasedKey}
            userInfo={userInfo}
            isPurchasedFromRedOrder={true}
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
      setPurchasedKey(dropRowKeys[0]);
      // ticketPurchasedRequest(dropRowKeys)
    }
    // next()
  };

  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: 5, // which size per page you want to locate as default
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

  // const urlFormatter = text => (cell, row) => {
  //   return (
  //     <a href={cell} target="_blank">
  //       {text}
  //     </a>
  //   )
  // }

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
          {" "}
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

  return (
    <div className="animated">
      {isNotEmpty ? (
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
        )}
        <TableHeaderColumn dataField="highestRowsBack">
          TMRowsBack/GA availability
        </TableHeaderColumn> */}
          {/* <TableHeaderColumn
          width="10%"
          dataField="baseCost"
          dataFormat={priceFormat}
        >
          BaseCost
        </TableHeaderColumn> */}
          {actions && actions()}
        </BootstrapTable>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default withRouter(RedListingsDataTable);
