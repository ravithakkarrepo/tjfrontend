/* eslint-disable eqeqeq */
import React, { useState } from "react";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button, Modal, Form } from "react-bootstrap";
import { ALERT_MSG_ERROR } from "../../constants";

const OtherVenuesEdit = ({
  updateOtherVenueRequest,
  rowToEdit,
  isOtherVenuesEdit,
  appReceiveAlert,
  fetchOtherVenuesRequest,
  marketSourceOption
}) => {
  const [otherVenuesModal, setotherVenuesModal] = useState(true);
  const [is_group_checked, setIsGroupChecked] = useState(rowToEdit.is_group);
  const [is_daylight_checked, setDaylightChecked] = useState(
    rowToEdit.is_group
  );

  return (
    <div className="animated">
      <Modal
        size="lg"
        centered
        show={otherVenuesModal}
        onHide={() => {
          setotherVenuesModal(false);
          if (isOtherVenuesEdit != undefined) isOtherVenuesEdit(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="E-Venue_title" style={{ color: "black" }}>
            Edit Other-Venue
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
                      Market Source <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      as="select"
                      defaultValue={rowToEdit.type}
                      onChange={evt => (rowToEdit.type = evt.target.value)}
                    >
                      <option value="">Select Type</option>
                      {marketSourceOption.map(({ id, name }, i) => (
                        <option key={id} value={name}>
                          {name}
                        </option>
                      ))}
                    </Form.Control>
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

              {/* <Form.Group>
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
                      onChange={e => {
                        setDaylightChecked(true)
                        rowToEdit.daylightSavingsTime = true
                      }}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="daylightSavingsTime"
                      id="radio2"
                      checked={is_daylight_checked === false}
                      onChange={e => {
                        setDaylightChecked(false)
                        rowToEdit.daylightSavingsTime = false
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
                      onChange={e => {
                        setIsGroupChecked(true)
                        rowToEdit.is_group = true
                      }}
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="is_group"
                      id="radio2is_group"
                      checked={is_group_checked === false}
                      onChange={e => {
                        setIsGroupChecked(false)
                        rowToEdit.is_group = false
                      }}
                    />
                  </div>
                </div>
              </Form.Group> */}

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
                      Additional Fee
                      {/* <span style={{ color: "red" }}>*</span> */}
                    </Form.Label>
                  </div>
                  <div className="col-sm-8">
                    <Form.Control
                      type="text"
                      disabled={false}
                      placeholder="Additional Fee"
                      style={{
                        height: "50px",
                        padding: "0 10px",
                        float: "left",
                        fontSize: "15px",
                        color: "#212529",
                        background: "#fff !important",
                        border: "1px solid rgba(25, 38, 48, 0.5)"
                      }}
                      defaultValue={rowToEdit.additionalFee}
                      onChange={evt =>
                        (rowToEdit.additionalFee = evt.target.value)
                      }
                    />
                  </div>
                </div>
              </Form.Group>

              {/* <Form.Group>
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
              </Form.Group> */}
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setotherVenuesModal(false);
              if (isOtherVenuesEdit !== undefined) isOtherVenuesEdit(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (
                rowToEdit.name === "" &&
                rowToEdit.url === "" &&
                rowToEdit.type === "" &&
                rowToEdit.daylightSavingsTime === "" &&
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
                setotherVenuesModal(true);
              } else if (rowToEdit.name === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Name is Required"
                });

                setotherVenuesModal(true);
              } else if (rowToEdit.venueId === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "VenueId is Required"
                });

                setotherVenuesModal(true);
              } else if (rowToEdit.skyboxVenueId === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Skybox Venue Id is Required"
                });

                setotherVenuesModal(true);
              } else if (rowToEdit.timezone === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Time Zone is Required"
                });

                setotherVenuesModal(true);
              } else if (rowToEdit.city === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "City is Required"
                });

                setotherVenuesModal(true);
              } else if (rowToEdit.state === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "State is Required"
                });

                setotherVenuesModal(true);
              } else if (rowToEdit.zip === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Zip Code is Required"
                });

                setotherVenuesModal(true);
              } else if (rowToEdit.address === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Address is Required"
                });
                setotherVenuesModal(true);
              } else if (rowToEdit.country === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Country is Required"
                });
                setotherVenuesModal(true);
              } else if (rowToEdit.type === "") {
                appReceiveAlert({
                  type: ALERT_MSG_ERROR,
                  message: "Market Source is Required"
                });
              } else {
                updateOtherVenueRequest(rowToEdit);
                setotherVenuesModal(false);
                if (isOtherVenuesEdit !== undefined) isOtherVenuesEdit(false);
              }
              fetchOtherVenuesRequest();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OtherVenuesEdit;
