/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Spinner from "../../components/Spinner";
import { dateFormatter, dateFormatterWithTZ } from "../../utils";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { confirmAlert } from "react-confirm-alert";

const Alert = ({
  isFetching,
  alertTriggerInfo,
  alertInfoTypes,
  isAlertInfoFetching,
  fetchTriggerAlertForEventsRequest,
  createTriggerAlertForEventsRequest,
  fetchAllAlertInfosRequest,
  updateAlertInfoRequest,
  deleteAlertInfoRequest,
  saveSelectEvent,
  saveSelectedEventFrom
}) => {
  const [percentage, setPercentage] = useState("");
  const [day, setDay] = useState("");
  const [minPriceQuantity, setMinPriceQuantity] = useState("");
  const [alertName, setAlertName] = useState("");
  const [checkType, setCheckType] = useState("-");
  let rowdata = [];

  const noDataHandler = () => {
    if (isFetching) return <Spinner />;
    else return "No Data Found To Display";
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
      <Button
        color="primary"
        className="btn-pill"
        onClick={onBtnClick}
        disabled={!rowdata.length}
      >
        Delete
      </Button>
    );
  };

  const onDeleteAction = (next, dropRowsKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          <span style={{ fontSize: "large" }}>
            Are you sure you want to delete this ?
          </span>
        </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            rowdata = [];
          }
        },
        {
          label: "Confirm",
          onClick: () => {
            deleteAlertInfoRequest({
              Ids: dropRowsKeys
            });
            rowdata = [];
          }
        }
      ]
    });
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
            saveSelectedEventFrom("Alert");
            var win = window.open(`/#/event/${row.eventId}`, "_blank");
            win.focus();
          }}
        >
          Details
        </Button>
      </div>
    );
  };

  const urlFormatter = (cell, row) => {
    return (
      <a
        href={`https://www1.ticketmaster.com/event/${row.eventId}`}
        target="_blank"
      >
        {row.eventId}
      </a>
    );

    /* row.eventUrl !== undefined &&
        row.eventUrl !== null &&
        row.eventUrl !== ""
        ? row.eventUrl
        : row.ticketMasterUrl */
  };

  const eventDateFormatter = (cell, row) => {
    return dateFormatterWithTZ(row.eventDate)(row.eventTimeZone);
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
    noDataText: noDataHandler(),
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: onDeleteAction
  };

  const isStartFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.is_start === true ? true : false}
            onChange={evt => {
              if (evt === false) {
                console.log("evt", evt);
              } else {
                console.log("evt", evt);
              }
              const payload = {
                is_start: evt
              };
              updateAlertInfoRequest({
                Id: row._id,
                body: payload
              });
            }}
          />
        </div>
      </div>
    );
  };

  const dataTocheckFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.dataToCheck === true ? true : false}
            onlabel="Event"
            offlabel="Price Point"
            width={row.dataToCheck === true ? 90 : 100}
            onChange={evt => {
              if (evt === false) {
                console.log("evt", evt);
              } else {
                console.log("evt", evt);
              }
              const payload = {
                dataToCheck: evt
              };
              updateAlertInfoRequest({
                Id: row._id,
                body: payload
              });
            }}
          />
        </div>
      </div>
    );
  };

  const updateDropDownFormatter = (cell, row) => {
    return (
      <Form.Control
        as="select"
        defaultValue={cell ? "-" : "+"}
        onChange={event => {
          row.is_check_decrease = event.target.value === "+" ? false : true;
        }}
      >
        <option value="-">-</option>
        <option value="+">+</option>
      </Form.Control>
    );
  };

  const updateButtonFormatter = (cell, row) => {
    return (
      <div className="tbl_btn bbtn_cls">
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            updateAlertInfoRequest({
              Id: row._id,
              body: row
            });
            console.log(row);
          }}
        >
          Update Information
        </Button>
      </div>
    );
  };

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

  const isNullOrEmptyFields = () => {
    const data = [alertName, percentage, day, minPriceQuantity];
    return data.some(ele => ele === "" || ele === null || ele === undefined);
  };

  const selectRow = {
    mode: "checkbox",
    onSelect: onRowSelect,
    onSelectAll: onSelectAll
  };

  useEffect(() => {
    fetchTriggerAlertForEventsRequest();
    fetchAllAlertInfosRequest();
  }, []);

  return (
    <div>
      <div className="full_width">
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12 mb_full_991">
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>Event Alert</h2>
                  </div>
                  <div className="inner_box_body">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="filter_filed_profile">
                          <div className="fl_eq_box">
                            <label className="searchHead">
                              Alert Name
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <Form.Control
                              type="text"
                              placeholder="Alert Name..."
                              value={alertName}
                              onChange={evt => setAlertName(evt.target.value)}
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">
                              Quantity Percent Change
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <Form.Control
                              type="text"
                              value={percentage}
                              placeholder="Percentage..."
                              onChange={evt => {
                                if (
                                  Number(evt.target.value) ||
                                  evt.target.value === ""
                                ) {
                                  setPercentage(evt.target.value);
                                }
                              }}
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">
                              Days to Check
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <Form.Control
                              type="text"
                              placeholder="Day..."
                              value={day}
                              onChange={evt => {
                                if (
                                  Number(evt.target.value) ||
                                  evt.target.value === ""
                                ) {
                                  setDay(evt.target.value);
                                }
                              }}
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">
                              Minimum Price Point Quantity
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <Form.Control
                              type="text"
                              placeholder="Minimum Price Point Quantity..."
                              value={minPriceQuantity}
                              onChange={evt => {
                                if (
                                  Number(evt.target.value) ||
                                  evt.target.value === ""
                                ) {
                                  setMinPriceQuantity(evt.target.value);
                                }
                              }}
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">
                              Drop Type
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <Form.Control
                              as="select"
                              value={checkType}
                              onChange={event =>
                                setCheckType(event.target.value)
                              }
                            >
                              <option value="-">-</option>
                              <option value="+">+</option>
                            </Form.Control>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="fl_eq_box src_btn">
                          <div className="fl_w">
                            <Button
                              color="primary"
                              className="btn-pill"
                              disabled={isNullOrEmptyFields()}
                              onClick={() => {
                                if (isNullOrEmptyFields()) return false;
                                createTriggerAlertForEventsRequest({
                                  alertName,
                                  percentage,
                                  days: day,
                                  minPriceQnty: minPriceQuantity,
                                  is_check_decrease:
                                    checkType === "+" ? false : true
                                });
                                setAlertName("");
                                setPercentage("");
                                setDay("");
                                setMinPriceQuantity("");
                                setCheckType("-");
                              }}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isAlertInfoFetching ? (
              <Spinner />
            ) : (
              <div className="white_box mrgbtm50">
                <div className="cm_ttl">
                  <h2>Alert Information</h2>
                </div>
                <div className="inner_box_body padL3T5">
                  <div className="tbl_main  order_tbl_main nw_od_cls">
                    <div className="inner_tbl">
                      <div className="tbl_main date_tbl cm_tbl_btn_main">
                        <div className="inner_tbl">
                          {isFetching ? (
                            <Spinner />
                          ) : (
                            <BootstrapTable
                              data={alertInfoTypes || []}
                              version="4"
                              striped
                              hover
                              pagination
                              options={options}
                              deleteRow
                              cellEdit={cellEditProp}
                              selectRow={selectRow}
                              tableHeaderClass="custom-select-header-class"
                              tableBodyClass="custom-select-body-class"
                              search
                            >
                              <TableHeaderColumn dataField="_id" hidden isKey>
                                _id
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="alertName">
                                Alert Name
                              </TableHeaderColumn>
                              {/* <TableHeaderColumn dataField="type">
                                Type
                              </TableHeaderColumn> */}
                              <TableHeaderColumn dataField="daysToCheck">
                                Days To Check
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="minPriceQnty">
                                Min. Price Quantity
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="percentage">
                                Percentage %
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="is_start"
                                editable={false}
                                dataFormat={isStartFormatter}
                              >
                                Enable
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="dataToCheck"
                                editable={false}
                                dataFormat={dataTocheckFormatter}
                              >
                                Data To Check
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="is_check_decrease"
                                editable={false}
                                dataFormat={updateDropDownFormatter}
                              >
                                Drop Type
                              </TableHeaderColumn>

                              <TableHeaderColumn
                                //  dataField="button"
                                dataFormat={updateButtonFormatter}
                                dataAlign="center"
                                editable={false}
                                width="300"
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
            )}
            {isFetching ? (
              <Spinner />
            ) : (
              <div className="fl_w cm_tbl_btn_main">
                {alertTriggerInfo &&
                  alertTriggerInfo.length &&
                  alertTriggerInfo.map(alertInfo => {
                    return (
                      <div className="row">
                        <div className="col-sm-12" key={alertInfo._id}>
                          <div className="white_box mrgbtm50 acc_main min_inherit">
                            <Accordion>
                              <Card style={{ maxHeight: "unset" }}>
                                <Accordion.Toggle
                                  className="cm_ttl"
                                  as={Card.Header}
                                  eventKey={alertInfo._id.toString()}
                                >
                                  <h2>{alertInfo.alertName}</h2>
                                </Accordion.Toggle>

                                <Accordion.Collapse
                                  eventKey={alertInfo._id.toString()}
                                >
                                  <div className="inner_box_body padL3T5">
                                    <div className="tbl_main">
                                      <div className="inner_tbl">
                                        <BootstrapTable
                                          data={alertInfo.eventAlertData || []}
                                          version="4"
                                          options={options}
                                          pagination
                                          search
                                          striped
                                          hover
                                        >
                                          <TableHeaderColumn
                                            dataField="_id"
                                            isKey
                                            hidden
                                          >
                                            ID
                                          </TableHeaderColumn>
                                          <TableHeaderColumn
                                            dataField="triggerCreatedDate"
                                            dataFormat={dateFormatter}
                                          >
                                            Date & time
                                          </TableHeaderColumn>
                                          <TableHeaderColumn
                                            dataField="eventId"
                                            dataFormat={urlFormatter}
                                            editable={false}
                                          >
                                            EventId
                                          </TableHeaderColumn>
                                          <TableHeaderColumn dataField="eventName">
                                            Event Name
                                          </TableHeaderColumn>
                                          <TableHeaderColumn
                                            dataField="eventDate"
                                            dataFormat={eventDateFormatter}
                                          >
                                            Event Date
                                          </TableHeaderColumn>
                                          <TableHeaderColumn dataField="pricePoint">
                                            Price Point
                                          </TableHeaderColumn>
                                          <TableHeaderColumn dataField="percentageDrop">
                                            Drop Amount %
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
                                      </div>
                                    </div>
                                  </div>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Alert);
