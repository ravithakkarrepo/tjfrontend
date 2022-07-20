/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap-daterangepicker/daterangepicker.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const urlFormatter = (cell, row) => {
  return (
    <a
      href={
        row.eventUrl !== undefined &&
        row.eventUrl !== null &&
        row.eventUrl !== ""
          ? row.eventUrl
          : row.ticketMasterUrl
      }
      target="_blank"
    >
      {row.eventId}
    </a>
  );
};

const venueUrlFormatter = (cell, row) => {
  return (
    <a href={row.url} target="_blank">
      {row.venueId}
    </a>
  );
};

const selectRow = {
  mode: "checkbox"
};

const DuplicateVenues = ({
  isFetching,
  duplicateVenueQueue,
  totalListings,
  currentPage,
  fetchDuplicateVenueSearchRequest,
  deleteDuplicateVenueRequest,
  updateDuplicateVenueIsBlackListRequest,
  updateVenueBySkyboxVenueIdRequest
}) => {
  const [typeSearchKey, setTypeSearchKey] = useState("TM");
  const [isMatchedKey = "", setIsMatchedKey] = useState();
  const [nameSearchKey, setNameSearchKey] = useState("");
  const [tmVenueIdSearchKey, setTmVenueIdSearchKey] = useState("");
  const [zipSearchKey, setZipSearchKey] = useState("");
  const [addressSearchKey, setAddressSearchKey] = useState("");
  const [citySearchKey, setCitySearchKey] = useState("");
  const [stateSearchKey, setStateSearchKey] = useState("");
  const [skyboxVenueIdKey, setSkyboxVenueIdKey] = useState("");
  const btnSearchRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [sizePerPage, setSizePerPage] = useState(20);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  const refUnmatchedEvent = useRef(null);
  const [showDuplicateVenues, setShowDuplicateVenues] = useState(false);

  const buttonFormatter = (cell, row, colIndex, column) => {
    return (
      <div className="tbl_btn bbtn_cls">
        <Button
          className="viewLog_btn"
          color="danger"
          aria-pressed="true"
          onClick={() => {
            confirmAlert({
              title: "Warning",
              message: (
                <span> Are you sure you want to start this venue? </span>
              ),
              closeOnClickOutside: false,
              buttons: [
                { label: "Cancel" },
                {
                  label: "Confirm",
                  onClick: () => {
                    updateVenueBySkyboxVenueIdRequest({
                      data: {
                        skyboxVenueId: row.skyboxVenueId,
                        venueDBId: row._id
                      },
                      page: currentPage
                    });
                  }
                }
              ]
            });
          }}
        >
          Start
        </Button>
        <Button
          className="viewLog_btn"
          color="danger"
          aria-pressed="true"
          onClick={() => {
            confirmAlert({
              title: "Warning",
              message: (
                <span> Are you sure you want to delete these venue? </span>
              ),
              closeOnClickOutside: false,
              buttons: [
                { label: "Cancel" },
                {
                  label: "Confirm",
                  onClick: () => {
                    deleteDuplicateVenueRequest({
                      deleteIds: [row._id],
                      page: currentPage
                    });
                  }
                }
              ]
            });
          }}
        >
          Delete
        </Button>
      </div>
    );
  };

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

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          {dropRowKeys === undefined
            ? next.row.is_blacklist === true
              ? "Are you sure you want to unblackList this venue"
              : "Are you sure you want to blackList this venues?"
            : "Are you sure you want to delete these venues?"}
        </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            if (dropRowKeys !== undefined) {
              deleteDuplicateVenueRequest({
                deleteIds: dropRowKeys,
                page: currentPage
              });
              next();
            } else {
              updateDuplicateVenueIsBlackListRequest({
                venueId: next.row._id,
                is_blacklist: next.is_blacklist
              });
            }
          }
        }
      ]
    });
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
  };
  const onPageChange = (page, sizePerPage) => {
    fetchDuplicateVenueSearchRequest({
      typeKey: typeSearchKey,
      isMatchedKey:
        isMatchedKey === "" ? null : isMatchedKey == "true" ? true : false,
      nameKey: nameSearchKey,
      tmVenueIdKey: tmVenueIdSearchKey,
      skyboxVenueIdKey,
      addressKey: addressSearchKey,
      zipKey: zipSearchKey,
      cityKey: citySearchKey,
      stateKey: stateSearchKey,
      limit: sizePerPage,
      index: page
    });
  };
  const options = {
    page: currentPage, // which page you want to show as default
    // sizePerPageList: [10,  30, 50, 60],
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
    expandBy: "column",
    noDataText: noDataHandler(),
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: customConfirm,
    onPageChange: onPageChange
  };

  function remote(remoteObj) {
    // it means that only pagination you will handle by your own
    remoteObj.pagination = true;
    remoteObj.cellEdit = true;
    return remoteObj;
  }

  const backListFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <div className="is_blackList">
          {row.is_match ? (
            <BootstrapSwitchButton
              checked={row.is_blacklist === true ? true : false}
              onChange={evt => {
                const payload = {
                  venueId: row.tMasterVenueId,
                  is_blacklist: evt,
                  row: row
                };
                customConfirm(payload);
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {showDuplicateVenues === false ? (
        <div className="btn-group mrgbtm20">
          <Button
            onClick={() => {
              setShowDuplicateVenues(true);
              fetchDuplicateVenueSearchRequest({
                typeKey: typeSearchKey,
                isMatchedKey:
                  isMatchedKey === ""
                    ? null
                    : isMatchedKey === "true"
                    ? true
                    : false,
                nameKey: nameSearchKey,
                tmVenueIdKey: tmVenueIdSearchKey,
                skyboxVenueIdKey,
                addressKey: addressSearchKey,
                zipKey: zipSearchKey,
                cityKey: citySearchKey,
                stateKey: stateSearchKey,
                limit: sizePerPage,
                index: page
              });
            }}
          >
            Click here to show duplicate venues
          </Button>
        </div>
      ) : (
        <div>
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
                        // onClick={setToggleValue("collapse")}
                      >
                        <h2>Filter Options</h2>
                      </Accordion.Toggle>

                      <Accordion.Collapse
                        //className={toggleClass}
                        eventKey="0"
                      >
                        <div className="select_eq filter_filed">
                          <div className="fl_eq_box">
                            <label className="searchHead">Venue Type</label>
                            <Form.Control
                              // className="search_icon"
                              as="select"
                              value={isMatchedKey}
                              // placeholder="Search..."
                              onChange={evt =>
                                setIsMatchedKey(evt.target.value)
                              }
                            >
                              <option value="">Show All Venue</option>
                              <option value={true}>
                                Show Skybox Match Venue
                              </option>
                              <option value={false}>
                                Show UnMatch Skybox Venue
                              </option>
                            </Form.Control>
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">Venue Name</label>
                            <Form.Control
                              // className="search_icon"
                              type="text"
                              value={nameSearchKey}
                              placeholder="Search..."
                              onChange={evt =>
                                setNameSearchKey(evt.target.value)
                              }
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">TM Venue ID</label>
                            <Form.Control
                              // className="search_icon"
                              type="text"
                              value={tmVenueIdSearchKey}
                              placeholder="Search..."
                              onChange={evt =>
                                setTmVenueIdSearchKey(evt.target.value)
                              }
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">
                              Skybox Venue Id
                            </label>
                            <Form.Control
                              type="text"
                              value={skyboxVenueIdKey}
                              placeholder="Search..."
                              onChange={evt =>
                                setSkyboxVenueIdKey(evt.target.value)
                              }
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">Zip</label>
                            <Form.Control
                              // className="search_icon"
                              type="text"
                              value={zipSearchKey}
                              placeholder="Search..."
                              onChange={evt =>
                                setZipSearchKey(evt.target.value)
                              }
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">Address</label>
                            <Form.Control
                              // className="search_icon"
                              type="text"
                              value={addressSearchKey}
                              placeholder="Search..."
                              onChange={evt =>
                                setAddressSearchKey(evt.target.value)
                              }
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">City</label>
                            <Form.Control
                              // className="search_icon"
                              type="text"
                              value={citySearchKey}
                              placeholder="Search..."
                              onChange={evt =>
                                setCitySearchKey(evt.target.value)
                              }
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">State</label>
                            <Form.Control
                              // className="search_icon"
                              type="text"
                              value={stateSearchKey}
                              placeholder="Search..."
                              onChange={evt =>
                                setStateSearchKey(evt.target.value)
                              }
                            />
                          </div>
                          <div className="fl_eq_box src_btn">
                            <label className="searchHead">&nbsp;</label>
                            <div className="fl_w">
                              <Button
                                color="primary"
                                className="btn-pill"
                                onClick={() => {
                                  fetchDuplicateVenueSearchRequest({
                                    typeKey: typeSearchKey,
                                    isMatchedKey:
                                      isMatchedKey === ""
                                        ? null
                                        : isMatchedKey == "true"
                                        ? true
                                        : false,
                                    nameKey: nameSearchKey,
                                    tmVenueIdKey: tmVenueIdSearchKey,
                                    skyboxVenueIdKey,
                                    addressKey: addressSearchKey,
                                    zipKey: zipSearchKey,
                                    cityKey: citySearchKey,
                                    stateKey: stateSearchKey,
                                    limit: sizePerPage,
                                    index: page
                                  });
                                }}
                              >
                                Search
                              </Button>
                              <button
                                color="primary"
                                type="button"
                                className="btn-pill btn btn-primary clr_fil red_txt"
                                onClick={() => {
                                  setIsMatchedKey("");
                                  setNameSearchKey("");
                                  setTmVenueIdSearchKey("");
                                  setSkyboxVenueIdKey("");
                                  setZipSearchKey("");
                                  setAddressSearchKey("");
                                  setCitySearchKey("");
                                  setStateSearchKey("");
                                  fetchDuplicateVenueSearchRequest({
                                    typeKey: typeSearchKey,
                                    limit: sizePerPage,
                                    index: page
                                  });
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

          {isFetching ? (
            <Spinner spinnerTime={false} />
          ) : (
            <BootstrapTable
              data={duplicateVenueQueue}
              version="4"
              striped
              hover
              pagination
              options={options}
              fetchInfo={{ dataTotalSize: totalListings }}
              ref={refUnmatchedEvent}
              cellEdit={cellEditProp}
              tableHeaderClass="custom-select-header-class"
              tableBodyClass="custom-select-body-class"
              blurToSave={true}
              remote={remote}
              selectRow={selectRow}
              deleteRow
            >
              <TableHeaderColumn hidden isKey dataField="_id">
                Id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" editable={false}>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="city" editable={false}>
                City
              </TableHeaderColumn>
              <TableHeaderColumn dataField="state" editable={false}>
                State
              </TableHeaderColumn>
              <TableHeaderColumn dataField="address" editable={false}>
                Address
              </TableHeaderColumn>
              <TableHeaderColumn dataField="zip" editable={false}>
                Zip Code
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="venueId"
                editable={false}
                dataFormat={venueUrlFormatter}
              >
                TMasterVenueId
              </TableHeaderColumn>
              <TableHeaderColumn dataField="skyboxVenueId" editable>
                SkyboxVenueId
              </TableHeaderColumn>
              <TableHeaderColumn editable={false} dataField="eventsCount">
                eventsCount
              </TableHeaderColumn>
              <TableHeaderColumn
                expandable={false}
                //dataField="is_deleted"
                dataField="is_blacklist"
                editable={false}
                dataFormat={backListFormatter}
              >
                BlackList
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="button"
                dataFormat={buttonFormatter}
                dataAlign="center"
                editable={false}
              >
                Action
              </TableHeaderColumn>
            </BootstrapTable>
          )}
        </div>
      )}
    </>
  );
};

export default withRouter(DuplicateVenues);
