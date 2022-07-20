/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardHeader, Button, Row } from "reactstrap"
import { Button } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";
import EventAdd from "./EventAdd";

var Rowdata = [];
const selectRow1 = {
  mode: "checkbox",
  onSelect: onRowSelect
};

function onRowSelect(row, isSelected, e) {
  Rowdata = row;
}

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

const EventPromos = ({
  eventPromos,
  fetchEventPromosRequest,
  deleteEventPromosRequest,
  addEventPromoRequest,
  appReceiveAlert,
  eventStatus,
  isFetching,
  deleteEventPromosFromAddPromoRequest
}) => {
  useEffect(() => {
    fetchEventPromosRequest();
  }, []);
  // eslint-disable-next-line no-unused-vars
  const [ModalClose, onModalClose] = useState(true);
  const [showEventPromo, setShowEventPromo] = useState(false);

  const createCustomDeleteButton = onBtnClick => {
    return (
      <Button
        color="primary"
        className="btn-pill react-bs-table-del-btn"
        onClick={onBtnClick}
      >
        Delete
      </Button>
    );
  };

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: <span>Are you sure you want to delete these promos?</span>,
      closeOnClickOutside: false,
      buttons: [
        {
          label: "Cancel"
        },
        {
          label: "Confirm",
          onClick: () => {
            deleteEventPromosRequest({
              body: {
                eventIds: dropRowKeys
              }
            });
            next();
          }
        }
      ]
    });
  };

  const handleInsertedRow = row => {
    var eventId = row.eventId;
    var obj = {};
    obj[row.promoName] = row.promoCode;
    addEventPromoRequest({
      eventId,
      promos: obj
    });
  };

  const buttonFormatter = (cell, row) => {
    return (
      <div className="tbl_btn bbtn_cls">
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            setShowEventPromo(true);
            Rowdata = row;
          }}
        >
          Update
        </Button>
      </div>
    );
  };
  const promoNameFormatter = (cell, row) => {
    var str = [];
    for (var i = 0; i < cell.length; i++) {
      str.push(
        <>
          <span>{cell[i]}</span>
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
          <span>{cell[i]}</span>
          <br />
        </>
      );
    }
    return <div>{str}</div>;
  };

  const createCustomModal = (onModalClose, onSave, columns) => {
    return (
      <EventAdd
        onModalClose={onModalClose}
        appReceiveAlert={appReceiveAlert}
        eventStatus={eventStatus}
        addEventPromoRequest={addEventPromoRequest}
        fetchEventPromosRequest={fetchEventPromosRequest}
        isEventAdd={isEventAddOpen => setShowEventPromo(isEventAddOpen)}
        deleteEventPromosFromAddPromoRequest={
          deleteEventPromosFromAddPromoRequest
        }
        isComingFromAddNewEventPromo={true}
      />
    );
  };

  const newUrlFormatter = (cell, row) => {
    return (
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
    );
  };

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
    withFirstAndLast: true, //> Hide the going to First and Last page button
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: customConfirm,
    afterInsertRow: handleInsertedRow,
    insertText: "Add New Event Promo",
    insertModal: createCustomModal
  };

  return (
    <div className="promoTbl">
      {showEventPromo ? (
        <EventAdd
          Rowdata={Rowdata}
          onModalClose={onModalClose}
          appReceiveAlert={appReceiveAlert}
          eventStatus={eventStatus}
          addEventPromoRequest={addEventPromoRequest}
          fetchEventPromosRequest={fetchEventPromosRequest}
          deleteEventPromosRequest={deleteEventPromosRequest}
          isEventAdd={isEventAddOpen => setShowEventPromo(isEventAddOpen)}
          deleteEventPromosFromAddPromoRequest={
            deleteEventPromosFromAddPromoRequest
          }
          isComingFromEventPromo={true}
        />
      ) : (
        ""
      )}

      {isFetching ? (
        <Spinner spinnerTime={false} />
      ) : (
        <BootstrapTable
          data={eventPromos}
          version="4"
          striped
          hover
          pagination
          options={options}
          deleteRow
          insertRow
          selectRow={selectRow1}
          cellEdit={cellEditProp}
          search
        >
          <TableHeaderColumn dataField="_id" isKey hidden>
            _id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventId" dataFormat={newUrlFormatter}>
            EventId
          </TableHeaderColumn>
          <TableHeaderColumn dataField="eventDate" editable={false} dataSort>
            Event Date
          </TableHeaderColumn>

          <TableHeaderColumn
            dataField="promoName"
            editable={false}
            dataFormat={promoNameFormatter}
          >
            PromoName
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="promoCode"
            editable={false}
            dataFormat={promoCodeFormatter}
          >
            PromoCode
          </TableHeaderColumn>

          <TableHeaderColumn
            // dataField="button"
            dataFormat={buttonFormatter}
            dataAlign="center"
            editable={false}
          >
            Action
          </TableHeaderColumn>
        </BootstrapTable>
      )}
    </div>
  );
};

export default EventPromos;
