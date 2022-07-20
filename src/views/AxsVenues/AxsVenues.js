/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardHeader, Button, Row } from "reactstrap"
import { Form, Card, Button, Modal } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";

import Spinner from "../../components/Spinner";
import { strToArr } from "../../utils";

import Accordion from "react-bootstrap/Accordion";

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable";

const AxsVenue = ({
  axsVenues,
  history,
  fetchAxsVenuePagingRequest,
  fetchAxsVenueSearchRequest,
  isFetching,
  searchAxsVenueData,
  skyBoxAxsVenuesDup,
  fetchAxsVenueRequest,
  updateAxsVenueRequest,
  deleteAxsVenueRequest,
  searchSkyboxAxsVenueRequest,
  closeModalSkyBoxAxsVenue,
  selectSkyboxAxsVenue,
  closeSkyboxAxsVenueModal,
  clearAxsVenues
}) => {
  const [typeSearchKey, setTypeSearchKey] = useState("");
  const [nameSearchKey, setNameSearchKey] = useState("");
  const [_idSearchKey, set_idSearchKey] = useState("");
  const [zipSearchKey, setZipSearchKey] = useState("");
  const [addressSearchKey, setAddressSearchKey] = useState("");
  const [citySearchKey, setCitySearchKey] = useState("");
  const [stateSearchKey, setStateSearchKey] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [sizePerPage, setSizePerPage] = useState(20);
  const [isSearch, setIsSearch] = useState(false);

  var selectedSkyBoxAxsVenue = {};
  const selectRow = {
    mode: "checkbox",
    customComponent: CustomMultiSelectTable
  };

  const cellEditProp = {
    mode: "click",
    blurToSave: true,
    afterSaveCell: (oldValue, newValue, row, column) => {
      var keys = Object.keys(oldValue); //get keys from object as an array
      keys.forEach(function(key, i) {
        //loop through keys array
        if (key === newValue) oldValue[newValue] = row;
        else oldValue[newValue] = row;
      });
    }
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
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

  const urlFormatter = (cell, row) => {
    return (
      <a href={row.detailsUrl} target="_blank">
        {row._id}
      </a>
    );
  };

  const handleRadioChange = (evt, selectedAxsVenue) => {
    selectedSkyBoxAxsVenue = selectedAxsVenue;
  };

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: <span> Are you sure you want to delete these Axs venues? </span>,
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            dropRowKeys.forEach(key => {
              deleteAxsVenueRequest({ _id: key });
            });
            next();
          }
        }
      ]
    });
  };

  const buttonFormatter = (cell, row) => {
    return (
      <div className="tbl_btn bbtn_cls">
        {row.type === "venue" ? (
          <Button
            active
            color="primary"
            aria-pressed="true"
            onClick={() => {
              window.open(row.detailsUrl, "_blank");
            }}
          >
            View
          </Button>
        ) : (
          <Button
            active
            color="primary"
            aria-pressed="true"
            // disabled={true}
            onClick={() => {
              searchSkyboxAxsVenueRequest(row);
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
              keyword,
              filters,
              blacklistedEvents,
              stockType,
              skyboxVenueId,
              _id,
              city,
              state,
              zip,
              address
            } = row;
            updateAxsVenueRequest({
              keyword,
              filters: strToArr(filters),
              blacklistedEvents: strToArr(blacklistedEvents),
              stockType,
              skyboxVenueId,
              _id,
              city,
              state,
              zip,
              address
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
            closeModalSkyBoxAxsVenue();
            searchSkyboxAxsVenueRequest(row);
          }}
        >
          Match
        </Button>
      </div>
    );
  };
  const handlePageChange = (page, sizePerPage) => {
    if (!isSearch) {
      clearAxsVenues();
      fetchAxsVenuePagingRequest({
        typeKey: "AXS",
        index: page,
        limit: sizePerPage
      });
    } else {
      clearAxsVenues();
      fetchAxsVenueSearchRequest({
        typeKey: "AXS",
        nameKey: nameSearchKey,
        _idKey: _idSearchKey,
        addressKey: addressSearchKey,
        zipKey: zipSearchKey,
        cityKey: citySearchKey,
        stateKey: stateSearchKey,
        limit: sizePerPage,
        index: page
      });
    }
  };

  const options = {
    page: axsVenues.page, // which page you want to show as default
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
    onPageChange: handlePageChange
  };

  useEffect(() => {
    fetchAxsVenuePagingRequest({
      typeKey: "AXS",
      index: page,
      limit: sizePerPage
    });
  }, []);

  return (
    <div>
      <Modal
        show={skyBoxAxsVenuesDup.length > 0}
        size="xl"
        centered
        className={"ReactModalPortal "}
      >
        <Modal.Header>
          <h4 className="modal-title">
            Please select the right skybox Axs Venue
          </h4>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {skyBoxAxsVenuesDup.map((data, index) => {
              const { name, address, state, upcommingEvents } = data;
              return (
                <div className="up_row">
                  <Form.Check
                    type="radio"
                    className="check_row_cls"
                    id={index}
                    name="radVenue"
                    value={data}
                    onChange={evt => handleRadioChange(evt, data)}
                    label={`Venue: ${name}, Address: ${address}, State: ${state}`}
                  />
                  <div className="up_event_cnt">
                    <h4 className="up_event_title"> Upcomming Events </h4>

                    {/* eslint-disable-next-line array-callback-return */}
                    {upcommingEvents.map((data, index) => {
                      if (index < 5) {
                        return (
                          <ul>
                            <li>Name: {data.name}</li>
                            <li>Date: {data.date}</li>
                          </ul>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-default btn-secondary"
            color="secondary"
            onClick={() => {
              closeSkyboxAxsVenueModal();
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-primary"
            color="secondary"
            onClick={() => {
              selectSkyboxAxsVenue(selectedSkyBoxAxsVenue);
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={searchAxsVenueData.length > 0}
        style={{ fontSize: "20px" }}
        className={"ReactModalPortal"}
        size="lg"
        centered
      >
        <Modal.Header>
          <h4 className="modal-title">
            Axs Venue Not Found In Skybox Please Try Again.
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="tbl_main cm_tbl_btn_main">
            <div className="inner_tbl">
              <BootstrapTable
                data={searchAxsVenueData}
                version="4"
                striped
                hover
                pagination
                cellEdit={cellEditProp}
              >
                <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
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
              closeModalSkyBoxAxsVenue();
            }}
          >
            close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="full_width">
        <div className="page_name">
          <h2>Axs Venue Info</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12">
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>Axs Venue</h2>
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
                                    Axs Venue Type
                                  </label>
                                  <Form.Control
                                    // className="search_icon"
                                    as="select"
                                    value={typeSearchKey}
                                    // placeholder="Search..."
                                    onChange={evt =>
                                      setTypeSearchKey(evt.target.value)
                                    }
                                  >
                                    <option value="">Show All Venue</option>
                                    <option value="venue">
                                      Show Skybox Match Venue
                                    </option>
                                    <option value="unmatchedVenue">
                                      Show UnMatch Skybox Venue
                                    </option>
                                  </Form.Control>
                                </div>
                                <div className="fl_eq_box">
                                  <label className="searchHead">
                                    Axs Venue Name
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
                                    Axs Venue ID
                                  </label>
                                  <Form.Control
                                    // className="search_icon"
                                    type="text"
                                    value={_idSearchKey}
                                    placeholder="Search..."
                                    onChange={evt =>
                                      set_idSearchKey(evt.target.value)
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
                                        //  clearManagedVenues()
                                        setIsSearch(true);
                                        fetchAxsVenueSearchRequest({
                                          typeKey: "AXS",
                                          nameKey: nameSearchKey,
                                          _idKey: _idSearchKey,
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
                                        setTypeSearchKey("");
                                        setNameSearchKey("");
                                        set_idSearchKey("");
                                        setZipSearchKey("");
                                        setAddressSearchKey();
                                        setCitySearchKey();
                                        setStateSearchKey("");
                                        setIsSearch(false);
                                        clearAxsVenues();
                                        fetchAxsVenuePagingRequest({
                                          typeKey: "AXS",
                                          index: page,
                                          limit: sizePerPage
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
                        {isFetching ? (
                          <Spinner spinnerTime={false} />
                        ) : (
                          <BootstrapTable
                            data={axsVenues.axsVenueInfo}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            fetchInfo={{ dataTotalSize: axsVenues.totalRow }}
                            cellEdit={cellEditProp}
                            selectRow={selectRow}
                            deleteRow
                            remote
                            blurToSave={true}
                          >
                            <TableHeaderColumn
                              dataField="_id"
                              isKey
                              dataFormat={urlFormatter}
                            >
                              Axs Id
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

                            <TableHeaderColumn dataField="skyboxVenueId">
                              SkyboxVenueId
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
                        )}{" "}
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

export default withRouter(AxsVenue);
