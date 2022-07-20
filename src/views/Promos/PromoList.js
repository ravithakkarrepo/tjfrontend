/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button, Modal, Form } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";
import { TICKETMASTERURL } from "../../constants/listings";
import { dateFormatter } from "../../utils";

const PromoList = ({
  isFetching,
  isPromoListModal,
  events,
  promoName,
  addEventPromoRequest,
  fetchEventsByPromoNameRequest,
  fetchEventPromosRequest
}) => {
  // if (eventIds != undefined) {
  //   eventIds = eventIds.map(id => {
  //     return { eventId: id, }
  //   })
  // }

  useEffect(() => {
    fetchEventsByPromoNameRequest({
      offerName: promoName
    });
  }, []);

  // events.map(item => (item.promoCode = ""))
  const [PromoListModal, setPromoListModal] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [spinnerTime, setSpinnerTime] = useState(false);

  // const selectRow = {
  //   mode: "checkbox"
  // }

  const cellEdit = {
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

  const buttonFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn bbtn_cls">
        <Button
          onClick={() => {
            var eventId = row._id;
            var obj = {};
            obj["" + promoName + ""] = row.promoCode;
            addEventPromoRequest({
              eventDBId: eventId,
              promos: obj
            });
          }}
        >
          Save
        </Button>
      </div>
    );
  };

  const inputFormatter = (cell, row) => {
    return (
      <div>
        <Form.Control
          type="text"
          defaultValue={row.promoCode}
          onChange={evt => {
            row.promoCode = evt.target.value;
          }}
        />
      </div>
    );
  };

  const eventDeatils = (cell, row) => {
    return (
      <div>
        <span>{row.eventName}</span>
        <br />
        <span>{row.eventAddress}</span>
        <br />
        <span>{dateFormatter(row.eventDate)}</span>
      </div>
    );
  };

  const urlFormater = (cell, row) => {
    var ticketMasterUrl = TICKETMASTERURL + row.eventId;
    return (
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
    );
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />;
    else return "There is no data to display";
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
    withFirstAndLast: true, //> Hide the going to First and Last page button
    noDataText: noDataHandler()
  };

  return (
    <div className="animated">
      <div className="inner_main">
        <Modal
          size="lg"
          centered
          show={PromoListModal}
          onHide={() => {
            isPromoListModal(false);
            setPromoListModal(false);
          }}
          className="promoListModal"
        >
          <Modal.Header className="eventLog" style={{ background: "black" }}>
            <Modal.Title
              className="order_title"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <span> Promo List </span>
              <span
                onClick={() => {
                  isPromoListModal(false);
                  setPromoListModal(false);
                }}
              >
                <i className="fa fa-times"></i>
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="tbl_main cm_tbl_btn_main">
              <div className="inner_tbl">
                {isFetching ? (
                  <Spinner spinnerTime={spinnerTime} />
                ) : (
                  <BootstrapTable
                    data={events}
                    version="4"
                    striped
                    hover
                    pagination
                    options={options}
                    // selectRow={selectRow}
                    cellEdit={cellEdit}
                  >
                    <TableHeaderColumn
                      dataField="eventId"
                      dataFormat={urlFormater}
                      isKey
                    >
                      EventId
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataField="eventDetails"
                      editable={false}
                      dataFormat={eventDeatils}
                    >
                      Event Details
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataField="promoCode"
                      //editable={true}
                      dataFormat={inputFormatter}
                    >
                      Promo Code
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      expandable={false}
                      editable={false}
                      dataFormat={buttonFormatter}
                    >
                      Action
                    </TableHeaderColumn>
                  </BootstrapTable>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PromoList;
