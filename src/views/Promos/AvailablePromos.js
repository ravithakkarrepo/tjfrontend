import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardHeader, Button, Row } from "reactstrap"
import { Button, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import PromoList from "./PromoList";

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

const AvailablePromo = ({
  isFetching,
  isEventsByPromoFetching,
  fetchAvailableEventPromosRequest,
  availablePromos,
  addEventPromoRequest,
  fetchEventsByPromoNameRequest,
  fetchEventPromosRequest,
  events
}) => {
  useEffect(() => {
    fetchAvailableEventPromosRequest();
  }, []);
  const [promoListModal, setPromoListModal] = useState(false);
  const [eventIds, setEventIds] = useState([]);
  const [promoName, setPromoName] = useState("");

  const buttonFormatter = (cell, row) => {
    return (
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Check Event Promos</Tooltip>}
      >
        <Button
          className="viewLog_btn"
          color="primary"
          aria-pressed="true"
          onClick={() => {
            setPromoListModal(true);
            setEventIds(row.eventId);
            setPromoName(row.promoName);
          }}
        >
          Check Event
        </Button>
      </OverlayTrigger>
    );
  };

  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: 10, // which size per page you want to locate as default
    pageStartIndex: 1, // where to start counting the pages
    paginationSize: 3, // the pagination bar size.
    prePage: "Prev", // Previous page button text
    nextPage: "Next", // Next page button text
    firstPage: "First", // First page button text
    lastPage: "Last", // Last page button text
    paginationShowsTotal: true, // Accept bool or function
    hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true //> Hide the going to First and Last page button
    // deleteBtn: createCustomDeleteButton,
    // handleConfirmDeleteRow: customConfirm,
    // afterInsertRow: handleInsertedRow,
    // insertText: "Add New Event Promo",
    // insertModal: createCustomModal
  };

  return (
    <div>
      {isFetching ? (
        <Spinner />
      ) : (
        <BootstrapTable
          data={availablePromos}
          version="4"
          striped
          hover
          pagination
          options={options}
          // selectRow={selectRow1}
          cellEdit={cellEditProp}
          search
        >
          <TableHeaderColumn
            dataField="_id"
            editable={false}
            hidden
            isKey={true}
          >
            Id
          </TableHeaderColumn>
          <TableHeaderColumn dataField="promoName" editable={false}>
            PromoName
          </TableHeaderColumn>
          <TableHeaderColumn dataFormat={buttonFormatter} editable={false}>
            Action
          </TableHeaderColumn>
        </BootstrapTable>
      )}

      {promoListModal ? (
        <PromoList
          isFetching={isEventsByPromoFetching}
          events={events}
          promoName={promoName}
          isPromoListModal={setPromoListModal}
          addEventPromoRequest={addEventPromoRequest}
          fetchEventsByPromoNameRequest={fetchEventsByPromoNameRequest}
          fetchEventPromosRequest={fetchEventPromosRequest}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AvailablePromo;
