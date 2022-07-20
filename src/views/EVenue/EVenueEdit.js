/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button, Modal, Form } from "react-bootstrap";
import { ALERT_MSG_ERROR } from "../../constants";

const EVenuesEdit = ({
  updateEVenueRequest,
  rowToEdit,
  isEVenueEdit,
  appReceiveAlert,
  fetchEVenueRequest
}) => {
  const [eVenueModal, seteVenueModal] = useState(true);
  const [is_group_checked, setIsGroupChecked] = useState(rowToEdit.is_group);
  const [is_daylight_checked, setDaylightChecked] = useState(
    rowToEdit.is_group
  );

  return (
    <div className="animated">
      <Modal
        size="lg"
        centered
        show={eVenueModal}
        onHide={() => {
          seteVenueModal(false);
          // fetchEVenueRequest()
          if (isEVenueEdit != undefined) isEVenueEdit(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="E-Venue_title" style={{ color: "black" }}>
            Edit E-Venue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ maxHeight: "calc(100vh - 110px)", overflowY: "auto" }}
        >
          <div>
            <Form>
              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Name <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      // placeholder={key}
                      disabled={false}
                      placeholder="Name"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.name}
                      onChange={evt => (rowToEdit.name = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Event List URL <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="Scraper URL"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.scraperURL}
                      onChange={evt =>
                        (rowToEdit.scraperURL = evt.target.value)
                      }
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      URL <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={true}
                      placeholder="URL"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.url}
                      onChange={evt => (rowToEdit.url = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Link ID <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="Link Id"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.linkID}
                      onChange={evt => (rowToEdit.linkID = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      ITC <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="ITC"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.itC}
                      onChange={evt => (rowToEdit.itC = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Distributor Id <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="Distributor Id"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.distributorId}
                      onChange={evt =>
                        (rowToEdit.distributorId = evt.target.value)
                      }
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Data Account Id <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="Data account Id"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.dataAccountId}
                      onChange={evt =>
                        (rowToEdit.dataAccountId = evt.target.value)
                      }
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Daylight savings time{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div
                    className="col-sm-8"
                    style={{
                      height: "50px",
                      padding: "0 10px",
                      float: "left",
                      fontSize: "15px",
                      color: "#212529",
                      background: "#fff !important"
                    }}
                  >
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="daylightSavingsTime"
                      id="radio1"
                      checked={is_daylight_checked === true}
                      onClick={e => {
                        setDaylightChecked(true);
                        rowToEdit.daylightSavingsTime = true;
                      }}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="daylightSavingsTime"
                      id="radio2"
                      checked={is_daylight_checked === false}
                      onClick={e => {
                        setDaylightChecked(false);
                        rowToEdit.daylightSavingsTime = false;
                      }}
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Host
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="your.venueDomain.net"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.host}
                      onChange={evt => (rowToEdit.host = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      API Base URL
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="Base URL"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.APIBASEURL}
                      onChange={evt =>
                        (rowToEdit.APIBASEURL = evt.target.value)
                      }
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Is Group
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>

                  <div
                    className="col-sm-8"
                    style={{
                      height: "50px",
                      padding: "0 10px",
                      float: "left",
                      fontSize: "15px",
                      color: "#212529",
                      background: "#fff !important"
                    }}
                  >
                    <Form.Check
                      type="radio"
                      label="Yes"
                      name="is_group"
                      id="radio1is_group"
                      checked={is_group_checked === true}
                      onClick={e => {
                        setIsGroupChecked(true);
                        rowToEdit.is_group = true;
                      }}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="is_group"
                      id="radio2is_group"
                      checked={is_group_checked === false}
                      onClick={e => {
                        setIsGroupChecked(false);
                        rowToEdit.is_group = false;
                      }}
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      VenueID
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="venue_id_in_lower_case"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.venueId}
                      onChange={evt => (rowToEdit.venueId = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Timezone
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="America/Los_Angeles"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.timezone}
                      onChange={evt => (rowToEdit.timezone = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Skybox VenueId
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="Skybox VenueId"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.skyboxVenueId}
                      onChange={evt =>
                        (rowToEdit.skyboxVenueId = evt.target.value)
                      }
                    />
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Address
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="401, John Walk Road"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.address}
                      onChange={evt => (rowToEdit.address = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      City
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="City"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.city}
                      onChange={evt => (rowToEdit.city = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      State
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="State"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.state}
                      onChange={evt => (rowToEdit.state = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Zip
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="Zip / Postal Code"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.zip}
                      onChange={evt => (rowToEdit.zip = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Country
                      <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="Country"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.country}
                      onChange={evt => (rowToEdit.country = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label
                      style={{
                        margin: "0",
                        width: "250px",
                        float: "left",
                        paddingRight: "15px",
                        lineHeight: "50px",
                        textAlign: "right",
                        color: "rgba(25, 38, 48, 0.5)",
                        fontWeight: "500"
                      }}
                    >
                      Filter Keywords
                      {/* <span style={{ color: "red" }}>*</span> */}
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="KEYONE|KEYTWO|KEYTHREE"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.filterKeyword}
                      onChange={evt =>
                        (rowToEdit.filterKeyword = evt.target.value)
                      }
                    />
                    <span style={{ color: "grey" }}>
                      Please seprate your keyword using | (OR) symbol, e.g
                      KEYONE|KEYTWO|KEYTHREE
                    </span>
                  </div>
                </div>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              seteVenueModal(false);
              // fetchEVenueRequest()
              if (isEVenueEdit !== undefined) isEVenueEdit(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (
                rowToEdit.name === "" &&
                rowToEdit.scraperURL === "" &&
                rowToEdit.url === "" &&
                rowToEdit.linkID === "" &&
                rowToEdit.itC === "" &&
                rowToEdit.distributorId === "" &&
                rowToEdit.dataAccountId === "" &&
                rowToEdit.daylightSavingsTime === "" &&
                rowToEdit.host === "" &&
                rowToEdit.APIBASEURL === "" &&
                rowToEdit.is_group === "" &&
                rowToEdit.venueId === "" &&
                rowToEdit.timezone === "" &&
                rowToEdit.skyboxVenueId === "" &&
                rowToEdit.address === "" &&
                rowToEdit.city === "" &&
                rowToEdit.state === "" &&
                rowToEdit.zip === "" &&
                rowToEdit.country === ""
              ) {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: 'All  "*"  Information is Required!'
                });
                seteVenueModal(true);
              } else if (rowToEdit.name === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Name is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.scraperURL === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Event List Url is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.linkID === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Link Id is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.itC === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "ITC is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.distributorId === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Distributor Id is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.dataAccountId === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Dart Account Id is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.host === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Host URL is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.APIBASEURL === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "APIBASEURL is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.venueId === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "VenueId is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.skyboxVenueId === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Skybox Venue Id is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.timezone === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Time Zone is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.city === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "City is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.state === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "State is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.zip === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Zip Code is Required"
                });

                seteVenueModal(true);
              } else if (rowToEdit.address === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Address is Required"
                });
                seteVenueModal(true);
              } else if (rowToEdit.country === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Country is Required"
                });
                seteVenueModal(true);
              } else {
                updateEVenueRequest(rowToEdit);
                seteVenueModal(false);
                if (isEVenueEdit !== undefined) isEVenueEdit(false);
              }
              fetchEVenueRequest();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EVenuesEdit;
