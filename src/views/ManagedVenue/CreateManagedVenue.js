/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import { FormGroup, Button, Modal } from "react-bootstrap";
import { Input } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Spinner from "../../components/Spinner";
const CreateVenueForm = ({
  onModalClose,
  onSave,
  columns,
  isFetching,
  searchVenueRequest,
  searchTmManagedVenue,
  searchVenueInSkyBoxRequest,
  isModal,
  skyBoxVenuesDup
}) => {
  const [keyName, setKeyName] = useState("");
  useEffect(() => {}, []);

  const headerStyle = {
    color: "black"
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
    withFirstAndLast: true //> Hide the going to First and Last page button
  };

  const buttonFormatter = (cell, row) => {
    return (
      <div>
        <Button
          active
          color="primary"
          aria-pressed="true"
          style={{ backgroundColor: "black" }}
          onClick={() => {
            searchVenueInSkyBoxRequest(row);
          }}
        >
          Match
        </Button>
      </div>
    );
  };

  const urlFormatter = (cell, row) => {
    return (
      <a href={row.url} target="_blank">
        {row.tMasterVenueId}
      </a>
    );
  };

  return (
    <div>
      <div className="animated">
        <Modal
          size="xl"
          className={"dash-popup"}
          centered
          show={skyBoxVenuesDup.length > 0 ? false : true}
          onHide={() => {
            isModal(true);
            onModalClose(true);
          }}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title
              className="EmailManagement_title"
              style={headerStyle}
              id="example-modal-sizes-title-lg"
            >
              Add TM Venues
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-12">
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>Search TM Venue</h2>
                  </div>
                  <div className="select_eq filter_filed">
                    <label className="searchHead">Venue Name</label>
                    <FormGroup>
                      <Input
                        type="text"
                        value={keyName}
                        placeholder="Search..."
                        onChange={evt => setKeyName(evt.target.value)}
                      ></Input>
                    </FormGroup>
                    <div className="fl_eq_box src_btn">
                      <label className="searchHead">&nbsp;</label>
                      <div className="fl_w">
                        <Button
                          color="primary"
                          disabled={keyName === ""}
                          className="btn-pill"
                          onClick={() => {
                            searchTmManagedVenue = [];
                            isModal(false);
                            searchVenueRequest({ keyword: keyName });
                          }}
                        >
                          Search
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tbl_main cm_tbl_btn_main">
              <div className="inner_tbl">
                {isFetching ? (
                  <Spinner spinnerTime={false} />
                ) : searchTmManagedVenue.length !== 0 ? (
                  <BootstrapTable
                    data={searchTmManagedVenue}
                    version="4"
                    striped
                    hover
                    pagination
                    options={options}
                    tableHeaderClass="custom-select-header-class"
                    tableBodyClass="custom-select-body-class"
                  >
                    <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="city">City</TableHeaderColumn>
                    <TableHeaderColumn dataField="stateCode">
                      State
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="address">
                      Address
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="zip">
                      Zip Code
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="venueId"
                      isKey
                      dataFormat={urlFormatter}
                    >
                      TMasterVenueId
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataFormat={buttonFormatter}
                      dataAlign="center"
                      editable={false}
                    >
                      Action
                    </TableHeaderColumn>
                  </BootstrapTable>
                ) : (
                  ""
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

export default CreateVenueForm;
