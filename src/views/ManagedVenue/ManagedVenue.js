/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardHeader, Button, Row } from "reactstrap"
import { Form, Card, Button, Modal } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";
import { ALERT_MSG_ERROR } from "../../constants";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import Spinner from "../../components/Spinner";
// import { stockTypes } from "../../constants"
import Accordion from "react-bootstrap/Accordion";
import CreateManagedVenue from "./CreateManagedVenue";
import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable";

const ManagedVenue = ({
  managedVenues,
  history,
  searchVenueData,
  skyBoxVenuesDup,
  fetchManagedVenueRequest,
  fetchManagedVenuePagingRequest,
  fetchManagedVenueSearchRequest,
  updateManagedVenueRequest,
  deleteManagedVenueRequest,
  searchSkyboxVenueRequest,
  closeModalSkyBoxVenue,
  selectSkyboxVenue,
  closeSkyboxVenueModal,
  clearManagedVenues,
  isFetching,
  searchVenueRequest,
  searchTmManagedVenue,
  searchVenueInSkyBoxRequest,
  searchVenueInSkyBox,
  appReceiveAlert,
  updateVenueIsBlackListRequest,
  isCalledFromCreateVenue,
  updatePriceMarkUpPctForVenueRequest,
  bulkUpdatePriceLETRequest
}) => {
  // eslint-disable-next-line no-unused-vars
  const [typeSearchKey, setTypeSearchKey] = useState("TM");
  const [isMatchedKey = "", setIsMatchedKey] = useState();
  const [nameSearchKey, setNameSearchKey] = useState("");
  const [tmVenueIdSearchKey, setTmVenueIdSearchKey] = useState("");
  const [zipSearchKey, setZipSearchKey] = useState("");
  const [addressSearchKey, setAddressSearchKey] = useState("");
  const [citySearchKey, setCitySearchKey] = useState("");
  const [stateSearchKey, setStateSearchKey] = useState("");
  const [skyboxVenueIdKey, setSkyboxVenueIdKey] = useState("");
  // const [totalSize, setTotalSize] = useState()
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [sizePerPage, setSizePerPage] = useState(20);
  // eslint-disable-next-line no-unused-vars
  const [isSearch, setIsSearch] = useState(false);
  const [isCraeteVenueModalClose, setIsCraeteVenueModalClose] = useState(false);
  const [isMatchFetching, setIsMatchFetching] = useState(false);
  const [eventCounts, setEventCounts] = useState(0);

  var selectedSkyBoxVenue = {};

  var rowdata = [];
  const onRowSelect = (row, isSelected, e) => {
    if (isSelected) {
      rowdata.push(row._id);
    } else {
      rowdata = rowdata.filter(e => {
        return e != row._id;
      });
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
        if (key === newValue) oldValue[newValue] = row;
      });
    }
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner />;
    else return "No Data Found To Display";
  };
  const createCustomDeleteButton = onBtnClick => {
    return (
      <>
        <Button
          color="primary"
          className="btn-pill react-bs-table-del-btn"
          onClick={onBtnClick}
        >
          Delete
        </Button>
        <Button color="primary" className="btn-pill" onClick={onAddLETClick}>
          Add the LET
        </Button>
      </>
    );
  };

  const onAddLETClick = () => {
    let let_pricing = 0,
      is_let = false;
    if (rowdata.length !== 0) {
      // console.log("rowdata :", rowdata)
      confirmAlert({
        title: "Bulk Add the LET",
        message: (
          <div className="pricing-popup">
            <div className="row">
              <div className="col-sm-12 fl_eq_box">
                <label className="searchHead"></label>
                <Form.Control
                  type="Number"
                  placeholder="Add LET"
                  onChange={evt => {
                    let_pricing = Number(evt.target.value);
                  }}
                />
              </div>
              <div className="pricing-status">
                <label className="searchHead">LET Status</label>
                <div className="is_blackList tbl_btn">
                  <div className="switch btn on btn-primary custom_price_toggle">
                    <BootstrapSwitchButton
                      checked={false}
                      onChange={evt => {
                        is_let = evt;
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
              let selectedVenueIdList = rowdata;
              rowdata = [];
              const payload = {
                venueIds: selectedVenueIdList,
                let_pricing,
                is_let,
                filter: {
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
                  index: page,
                  eventCounts: eventCounts
                }
              };
              bulkUpdatePriceLETRequest(payload);
            }
          }
        ]
      });
    }
  };

  const urlFormatter = (cell, row) => {
    return (
      <a href={row.url} target="_blank">
        {row.venueId}
      </a>
    );
  };

  const handleRadioChange = (evt, selectedVenue) => {
    selectedSkyBoxVenue = selectedVenue;
  };

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          {dropRowKeys === undefined
            ? next.row.is_blacklist === true
              ? "Are you sure you want to unblackList this managed venues"
              : "Are you sure you want to blackList this managed venues?"
            : "Are you sure you want to delete these managed venues?"}
        </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            if (dropRowKeys !== undefined) {
              deleteManagedVenueRequest({ deleteIds: dropRowKeys });
              next();
            } else {
              updateVenueIsBlackListRequest({
                venueId: next.row._id,
                is_blacklist: next.is_blacklist
              });
            }
          }
        }
      ]
    });
  };

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

  const letFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <div className="is_let">
          {row.is_match ? (
            <BootstrapSwitchButton
              checked={row.is_let === true ? true : false}
              onChange={evt => {
                updateManagedVenueRequest({
                  _id: row._id,
                  is_let: evt,
                  let_pricing: Number(row.let_pricing)
                });
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  };

  const buttonFormatter = (cell, row) => {
    return (
      <div className="tbl_btn bbtn_cls">
        {row.is_match ? (
          <Button
            active
            color="primary"
            aria-pressed="true"
            onClick={() => {
              // history.push({
              //   pathname: `/managedEvents/${row.keyword}`
              // })

              window.open(row.url, "_blank");
            }}
          >
            View
          </Button>
        ) : (
          <Button
            active
            color="primary"
            aria-pressed="true"
            onClick={() => {
              setIsMatchFetching(true);
              searchSkyboxVenueRequest(row);
            }}
          >
            Match
          </Button>
        )}

        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            const {
              name,
              skyboxVenueId,
              city,
              state,
              zip,
              address,
              _id,
              is_let,
              let_pricing
            } = row;
            updateManagedVenueRequest({
              name,
              skyboxVenueId,
              _id,
              city,
              state,
              zip,
              address,
              is_let,
              let_pricing: Number(let_pricing)
            });
          }}
        >
          Update
        </Button>
      </div>
    );
  };

  const popupButtonFormatter = (cell, row) => {
    return (
      <div className="tbl_btn bbtn_cls">
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            closeModalSkyBoxVenue();
            if (isCalledFromCreateVenue) {
              searchVenueInSkyBoxRequest(row);
            } else {
              searchSkyboxVenueRequest(row);
            }
          }}
        >
          Match
        </Button>
      </div>
    );
  };
  const handlePageChange = (page, sizePerPage) => {
    clearManagedVenues();
    fetchManagedVenueSearchRequest({
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
      index: page,
      eventCounts: eventCounts
    });
  };

  const createCustomModal = (onModalClose, onSave, columns) => {
    if (isCraeteVenueModalClose) {
      searchTmManagedVenue = [];
    }
    const attr = {
      onModalClose,
      onSave,
      columns
    };
    return (
      <CreateManagedVenue
        {...attr}
        isFetching={isFetching}
        searchVenueRequest={searchVenueRequest}
        searchTmManagedVenue={searchTmManagedVenue}
        searchVenueInSkyBoxRequest={searchVenueInSkyBoxRequest}
        searchVenueInSkyBox={searchVenueInSkyBox}
        searchSkyboxVenueRequest={searchSkyboxVenueRequest}
        isModal={isViewModalClose =>
          setIsCraeteVenueModalClose(isViewModalClose)
        }
        skyBoxVenuesDup={skyBoxVenuesDup}
      />
    );
  };

  const options = {
    page: managedVenues.page, // which page you want to show as default
    sizePerPage: sizePerPage, // which size per page you want to locate as default
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
    noDataText: noDataHandler(),
    onPageChange: handlePageChange,
    insertModal: createCustomModal,
    insertText: "Add Venue",
    onRowClick: function(row, columnIndex, rowIndex, e) {
      if (
        e.target.parentNode.parentElement.parentElement.className !==
          "is_blackList" &&
        e.target.parentNode.parentElement.parentElement.className !==
          "custom_price_toggle" &&
        e.target.parentNode.parentElement.parentElement.className !== "is_let"
      ) {
        if (e.target.offsetParent.className === "switch-group") {
          if (row.broadcastState === true) return (row.broadcastState = false);
          else return (row.broadcastState = true);
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
        e.target.parentNode.parentElement.parentElement.className ===
        "is_blackList"
      ) {
        if (row.is_blacklist === true) return (row.is_blacklist = false);
        else return (row.is_blacklist = true);
      } else if (
        e.target.parentNode.parentElement.parentElement.className === "is_let"
      ) {
        if (row.is_let === true) return (row.is_let = false);
        else return (row.is_let = true);
      }
    }
  };

  useEffect(() => {
    // fetchManagedVenuePagingRequest({ index: page, limit: sizePerPage })
    fetchManagedVenueSearchRequest({
      typeKey: typeSearchKey,
      isMatchedKey:
        isMatchedKey === "" ? null : isMatchedKey === "true" ? true : false,
      nameKey: nameSearchKey,
      tmVenueIdKey: tmVenueIdSearchKey,
      skyboxVenueIdKey,
      addressKey: addressSearchKey,
      zipKey: zipSearchKey,
      cityKey: citySearchKey,
      stateKey: stateSearchKey,
      limit: sizePerPage,
      index: page,
      eventCounts: eventCounts
    });
  }, []);

  const customPricingFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <div className="custom_price_toggle">
          {row.is_match ? (
            <BootstrapSwitchButton
              checked={row.is_priceMarkupPct === true ? true : false}
              onChange={evt => {
                updatePriceMarkUpPctForVenueRequest({
                  venueId: row.venueId,
                  pctValue: row.priceMarkupPct,
                  isPctValue: evt
                });
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
    <div>
      <Modal
        show={skyBoxVenuesDup.length > 0}
        size="xl"
        centered
        className={"dash-popup"}
        onHide={() => {
          if (isCraeteVenueModalClose) {
            searchTmManagedVenue = [];
          }
          setIsMatchFetching(false);
          closeSkyboxVenueModal();
        }}
      >
        <Modal.Header closeButton>
          <h4 className="modal-title">Please select the right skybox venue</h4>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {skyBoxVenuesDup.map((data, index) => {
              const { id, name, address, state, upcommingEvents } = data;
              return (
                <div className="up_row">
                  <Form.Check
                    type="radio"
                    className="check_row_cls"
                    id={index}
                    name="radVenue"
                    value={data}
                    onChange={evt => handleRadioChange(evt, data)}
                    label={`venueId:${id},Venue: ${name}, Address: ${address}, State: ${state}`}
                  />
                  <div className="up_event_cnt">
                    <h4 className="up_event_title"> Upcomming Events </h4>
                    {/* <span> Upcomming Events </span> */}

                    {upcommingEvents && upcommingEvents !== undefined
                      ? // eslint-disable-next-line array-callback-return
                        upcommingEvents.map((data, index) => {
                          if (index < 5) {
                            return (
                              <ul>
                                <li>Name: {data.name}</li>
                                <li>Date: {data.date}</li>
                              </ul>
                            );
                          }
                        })
                      : "No Event Found"}
                  </div>
                </div>
              );
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col-sm-6">
              <Button
                className="btn btn-default btn-secondary"
                color="secondary"
                onClick={() => {
                  setIsMatchFetching(false);
                  closeSkyboxVenueModal();
                }}
              >
                Cancel
              </Button>
            </div>
            <div className="col-sm-6">
              <Button
                className="btn btn-primary"
                color="secondary"
                onClick={() => {
                  if (Object.keys(selectedSkyBoxVenue).length !== 0) {
                    setIsMatchFetching(false);
                    selectSkyboxVenue(selectedSkyBoxVenue);
                  } else {
                    appReceiveAlert({
                      type: ALERT_MSG_ERROR,
                      message: "Please select The correct tm venue"
                    });
                  }
                }}
              >
                Add TM Venue
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={searchVenueData.length > 0}
        // style={{ maxWidth: "60%", fontSize: "20px" }}
        className={"ReactModalPortal width_cls"}
        size="lg"
        centered
      >
        <Modal.Header>
          <h4 className="modal-title">
            Venue Not Found In Skybox Please Try Again.
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="tbl_main cm_tbl_btn_main">
            <div className="inner_tbl">
              <BootstrapTable
                data={searchVenueData}
                version="4"
                striped
                hover
                pagination
                // options={options}
                cellEdit={cellEditProp}
                // deleteRow
                // insertRow
                // selectRow={selectRow}
              >
                <TableHeaderColumn dataField="name">Keyword</TableHeaderColumn>
                <TableHeaderColumn dataField="zip" isKey>
                  Zip
                </TableHeaderColumn>
                <TableHeaderColumn dataField="address">
                  Address
                </TableHeaderColumn>
                <TableHeaderColumn dataField="city">City</TableHeaderColumn>
                <TableHeaderColumn dataField="state">State</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="button"
                  dataFormat={popupButtonFormatter}
                  dataAlign="center"
                  editable={false}
                >
                  Action
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-default btn-secondary"
            color="secondary"
            onClick={() => {
              setIsMatchFetching(false);
              closeModalSkyBoxVenue();
            }}
          >
            close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="full_width">
        <div className="page_name">
          <h2>Venue Info</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12">
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>Managed Venue</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
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
                                  <label className="searchHead">
                                    Venue Type
                                  </label>
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
                                  <label className="searchHead">
                                    Venue Name
                                  </label>
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
                                  <label className="searchHead">
                                    TM Venue ID
                                  </label>
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
                                <div className="fl_eq_box">
                                  <label className="searchHead">
                                    Event Counts
                                  </label>
                                  <Form.Control
                                    type="number"
                                    value={eventCounts}
                                    placeholder="Search..."
                                    onChange={evt =>
                                      setEventCounts(Number(evt.target.value))
                                    }
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
                                      onClick={() => {
                                        clearManagedVenues();
                                        setIsSearch(true);
                                        fetchManagedVenueSearchRequest({
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
                                          index: page,
                                          eventCounts: eventCounts
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
                                        setEventCounts(0);
                                        setIsSearch(false);
                                        clearManagedVenues();
                                        fetchManagedVenueSearchRequest({
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

                    <div className="tbl_main cm_tbl_btn_main">
                      <div className="inner_tbl">
                        {isMatchFetching || isFetching ? (
                          <Spinner spinnerTime={false} />
                        ) : (
                          <BootstrapTable
                            data={managedVenues.venueInfo}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            fetchInfo={{
                              dataTotalSize: managedVenues.totalRow
                            }}
                            // expandableRow={isExpandableRow}
                            // expandComponent={expandComponent}
                            cellEdit={cellEditProp}
                            selectRow={selectRow}
                            insertRow
                            deleteRow
                            remote
                            blurToSave={true}
                            // search
                          >
                            <TableHeaderColumn hidden isKey dataField="_id">
                              Id
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="name">
                              Name
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="city">
                              City
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="state">
                              State
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="address">
                              Address
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="zip">
                              Zip Code
                            </TableHeaderColumn>
                            {/* <TableHeaderColumn
                          dataField="stockType"
                          dataAlign="center"
                          editable={false}
                          editable={{
                            type: "select",
                            options: { values: stockTypes }
                          }}
                        >
                          StockType
                        </TableHeaderColumn> */}
                            <TableHeaderColumn
                              dataField="venueId"
                              editable={false}
                              dataFormat={urlFormatter}
                            >
                              TMasterVenueId
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="skyboxVenueId">
                              SkyboxVenueId
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              editable={false}
                              dataField="eventsCount"
                            >
                              eventsCount
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
                              dataField="is_blacklist"
                              editable={false}
                              dataFormat={backListFormatter}
                            >
                              BlackList
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
                              dataField="let_pricing"
                            >
                              LET Pricing
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
                              dataField="is_let"
                              editable={false}
                              dataFormat={letFormatter}
                            >
                              LET
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

export default withRouter(ManagedVenue);
