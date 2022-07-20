import React, { useEffect } from "react";
// import { Card, CardBody, CardHeader, Button, Row } from "reactstrap"
import { Button } from "react-bootstrap";
import {
  BootstrapTable,
  TableHeaderColumn,
  InsertModalHeader
} from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

// import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable"
import EventPromo from "./EventPromo";
import AvailablePromos from "./AvailablePromos";
import Spinner from "../../components/Spinner";

const selectRow = {
  mode: "checkbox"
  // customComponent: CustomMultiSelectTable
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

const Promos = ({
  promos,
  eventPromos,
  fetchPromosRequest,
  fetchEventPromosRequest,
  deletePromosRequest,
  addPromoRequest,
  deleteEventPromosFromPromotionRequest,
  addEventPromoRequest,
  fetchAvailableEventPromosRequest,
  availablePromos,
  isFetching,
  eventPromosFetching,
  fetchEventsByPromoNameRequest,
  isEventsByPromoFetching,
  events,
  deleteEventPromosFromAddPromoRequest
}) => {
  useEffect(() => {
    fetchPromosRequest();
  }, []);

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
            deletePromosRequest({ deleteIds: dropRowKeys });
            next();
          }
        }
      ]
    });
  };

  const handleInsertedRow = row => {
    if (row.hasOwnProperty("_id")) delete row._id;
    addPromoRequest(row);
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
  };
  const createCustomModalHeader = (closeModal, save) => {
    return <InsertModalHeader className="my-custom-class" title="Add Promo" />;
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
    insertText: "Add Promo",
    insertModalHeader: createCustomModalHeader,
    noDataText: noDataHandler()
  };

  return (
    <div className="full_width">
      <div className="page_name">
        <h2>Promotion</h2>
      </div>
      <div className="inner_main">
        <div className="full_width">
          <div className="row">
            <div className="col-sm-12">
              <div className="white_box mrgbtm50">
                <div className="cm_ttl">
                  <h2>Global Promotion</h2>
                </div>
                <div className="inner_box_body padL3T5">
                  <div className="tbl_main">
                    <div className="inner_tbl">
                      {isFetching ? (
                        <Spinner spinnerTime={false} />
                      ) : (
                        <BootstrapTable
                          data={Object.values(promos)}
                          // data={promos}
                          version="4"
                          striped
                          hover
                          pagination
                          options={options}
                          deleteRow
                          insertRow
                          selectRow={selectRow}
                          cellEdit={cellEditProp}
                          search
                        >
                          <TableHeaderColumn
                            dataField="_id"
                            editable={false}
                            autoValue
                            isKey
                            hidden
                          >
                            _id
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="promoName">
                            PromoName
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            editable={true}
                            dataField="promoCode"
                          >
                            PromoCode
                          </TableHeaderColumn>
                        </BootstrapTable>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12">
              <div className="fl_w">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="white_box mrgbtm50 acc_main min_inherit">
                      <div className="cm_ttl">
                        <h2>Available promos</h2>
                      </div>
                      <div className="inner_box_body padL3T5">
                        <div className="tbl_main">
                          <div className="inner_tbl">
                            <AvailablePromos
                              availablePromos={availablePromos}
                              fetchAvailableEventPromosRequest={
                                fetchAvailableEventPromosRequest
                              }
                              deleteEventPromosRequest={
                                deleteEventPromosFromPromotionRequest
                              }
                              addEventPromoRequest={addEventPromoRequest}
                              isFetching={isFetching}
                              isEventsByPromoFetching={isEventsByPromoFetching}
                              fetchEventsByPromoNameRequest={
                                fetchEventsByPromoNameRequest
                              }
                              events={events}
                              fetchEventPromosRequest={fetchEventPromosRequest}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="white_box mrgbtm50 acc_main min_inherit">
                      <div className="cm_ttl">
                        <h2>Event Promotion</h2>
                      </div>
                      <div className="inner_box_body padL3T5">
                        <div className="tbl_main cm_tbl_btn_main">
                          <div className="inner_tbl">
                            <EventPromo
                              eventPromos={eventPromos}
                              fetchEventPromosRequest={fetchEventPromosRequest}
                              deleteEventPromosRequest={
                                deleteEventPromosFromPromotionRequest
                              }
                              addEventPromoRequest={addEventPromoRequest}
                              isFetching={eventPromosFetching}
                              deleteEventPromosFromAddPromoRequest={
                                deleteEventPromosFromAddPromoRequest
                              }
                            />
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
  );
};

export default Promos;
