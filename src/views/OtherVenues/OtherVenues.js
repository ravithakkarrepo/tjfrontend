/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Card } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { isUrlValid } from "../../utils/validation";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment-timezone";

import Accordion from "react-bootstrap/Accordion";

import { ALERT_MSG_ERROR } from "../../constants";
import { dateFormatter } from "../../utils";
import OtherVenuesEdit from "./OtherVenuesEdit";

class OtherVenuesModel extends React.Component {
  handleSaveBtnClick = rowToEdit => {
    const { onSave, appReceiveAlert } = this.props;

    if (
      rowToEdit.name === "" &&
      rowToEdit.url === "" &&
      rowToEdit.type === "" &&
      // rowToEdit.daylightSavingsTime === "" &&
      // rowToEdit.is_group === "" &&
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
    } else if (rowToEdit.name === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Name is Required"
      });
    } else if (rowToEdit.venueId === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "VenueId is Required"
      });
    } else if (rowToEdit.skyboxVenueId === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Skybox Venue Id is Required"
      });
    } else if (rowToEdit.timezone === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Time Zone is Required"
      });
    } else if (rowToEdit.city === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "City is Required"
      });
    } else if (rowToEdit.state === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "State is Required"
      });
    } else if (rowToEdit.zip === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Zip Code is Required"
      });
    } else if (rowToEdit.address === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Address is Required"
      });
    } else if (rowToEdit.country === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Country is Required"
      });
    } else if (rowToEdit.type === "") {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: "Market Source is Required"
      });
    } else {
      onSave(rowToEdit);
    }
  };

  rowToEdit = {
    name: "",
    url: "",
    type: "",
    // daylightSavingsTime: false,
    // is_group: false,
    venueId: "",
    timezone: "",
    skyboxVenueId: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    additionalFee: ""
    // filterKeyword: ""
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const {
      onModalClose,
      onSave,
      validateState,
      is_group_checked,
      setIsGroupChecked,
      is_daylight_checked,
      setDaylightChecked,
      addMarketSource,
      setAddMarketSource,
      marketSourceOption
    } = this.props;

    return (
      <div>
        <div className="animated">
          <Modal
            className="ReactModalPortal add_eVenue_popup"
            size="lg"
            centered
            show={true}
            onHide={onModalClose}
          >
            <Modal.Header closeButton>
              <Modal.Title className="E-Venue_title">
                Add Other-Venue
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "calc(100vh - 200px)",
                overflowY: "auto"
              }}
            >
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
                      value={this.rowToEdit.type}
                      onChange={evt => {
                        console.log(evt.target.value);
                        this.rowToEdit.type = evt.target.value;
                        setAddMarketSource(evt.target.value);
                      }}
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
                      defaultValue={this.rowToEdit.name}
                      onChange={evt => (this.rowToEdit.name = evt.target.value)}
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
                      disabled={false}
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
                      defaultValue={this.rowToEdit.url}
                      onChange={evt => (this.rowToEdit.url = evt.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>

              {/*
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
                          className="radioGroup"
                          label="Yes"
                          name="daylightSavingsTime"
                          id="radio1"
                          checked={is_daylight_checked === true}
                          onChange={e => {
                            setDaylightChecked(true)
                            this.rowToEdit.daylightSavingsTime = true
                          }}
                        />
                        <Form.Check
                          type="radio"
                          className="radioGroup"
                          label="No"
                          name="daylightSavingsTime"
                          id="radio2"
                          checked={is_daylight_checked === true}
                          onChange={e => {
                            setDaylightChecked(true)
                            this.rowToEdit.daylightSavingsTime = true
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
                            this.rowToEdit.is_group = true
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
                            this.rowToEdit.is_group = false
                          }}
                        />
                      </div>
                    </div>
                  </Form.Group>
                */}

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
                      defaultValue={this.rowToEdit.venueId}
                      onChange={evt =>
                        (this.rowToEdit.venueId = evt.target.value)
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
                      defaultValue={this.rowToEdit.timezone}
                      onChange={evt =>
                        (this.rowToEdit.timezone = evt.target.value)
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
                      defaultValue={this.rowToEdit.skyboxVenueId}
                      onChange={evt =>
                        (this.rowToEdit.skyboxVenueId = evt.target.value)
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
                      defaultValue={this.rowToEdit.address}
                      onChange={evt =>
                        (this.rowToEdit.address = evt.target.value)
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
                      defaultValue={this.rowToEdit.city}
                      onChange={evt => (this.rowToEdit.city = evt.target.value)}
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
                      defaultValue={this.rowToEdit.state}
                      onChange={evt =>
                        (this.rowToEdit.state = evt.target.value)
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
                      defaultValue={this.rowToEdit.zip}
                      onChange={evt => (this.rowToEdit.zip = evt.target.value)}
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
                      defaultValue={this.rowToEdit.country}
                      onChange={evt =>
                        (this.rowToEdit.country = evt.target.value)
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
                      defaultValue={this.rowToEdit.additionalFee}
                      onChange={evt =>
                        (this.rowToEdit.additionalFee = evt.target.value)
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
                      defaultValue={this.rowToEdit.filterKeyword}
                      onChange={evt =>
                        (this.rowToEdit.filterKeyword = evt.target.value)
                      }
                    />
                    <span style={{ color: "grey" }}>
                      Please seprate your keyword using | (OR) symbol, e.g
                      KEYONE|KEYTWO|KEYTHREE
                    </span>
                  </div>
                </div>
              </Form.Group> */}
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-default btn-secondary"
                onClick={onModalClose}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => this.handleSaveBtnClick(this.rowToEdit, onSave)}
              >
                Save
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

var rowToEdit = {};
const otherVenues = ({
  othervenues,
  globals,
  updateOtherVenueRequest,
  deleteOtherVenueRequest,
  fetchOtherVenuesRequest,
  isFetching,
  createOtherVenueRequest,
  updateIsBlackListOtherVenueRequest,
  appReceiveAlert,
  history,
  setSelectedOtherVenue
}) => {
  let now = new Date();
  let local = {
    format: "MM/DD/YYYY",
    sundayFirst: false
  };
  // eslint-disable-next-line no-unused-vars
  const [start, setStart] = useState(
    moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    )
  );
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  );
  let ranges = {
    Today: [moment(start), moment(end)],
    "Yesterday Only": [
      moment(start).subtract(1, "days"),
      moment(end).subtract(1, "days")
    ],
    "7 Days": [moment(start).subtract(6, "days"), moment(end)],
    "30 Days": [moment(start).subtract(29, "days"), moment(end)],
    "This Month": [moment(start).startOf("month"), moment(end).endOf("month")],
    "Last Month": [
      moment()
        .subtract(1, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .endOf("month")
    ],
    Year: [moment(start).subtract(1, "years"), moment(end)]
  };
  const [page, setPage] = useState(1);
  const [searchStartDate, setSearchStartDate] = useState();
  const [searchEndDate, setSearchEndDate] = useState();
  const [sizePerPage, setSizePerPage] = useState(20);
  const [showOtherVenuesEdit, setShowOtherVenuesEdit] = useState(false);
  const [emailExists, setEmailExists] = useState("");
  const [marketSource, setMarketSource] = useState("");
  const [skyboxVenueIdKey, setSkyboxVenueIdKey] = useState("");
  const [nameKey, setNameKey] = useState("");
  const [addressKey, setAddressKey] = useState("");
  const [cityKey, setCityKey] = useState("");
  const [stateKey, setStateKey] = useState("");
  const [zipKey, setZipKey] = useState("");
  const [is_group_checked, setIsGroupChecked] = useState(false);
  const [is_daylight_checked, setDaylightChecked] = useState(false);
  const [marketSourceOption, setMarketSourceOption] = useState([]);
  const [addMarketSource, setAddMarketSource] = useState("");

  useEffect(() => {
    let marketSourceConfigs = globals.find(
      global => global.keyName == "marketSource"
    );
    setMarketSourceOption(
      marketSourceConfigs ? JSON.parse(marketSourceConfigs.value) : []
    );
  }, [globals]);

  const selectRow = {
    mode: "checkbox",
    clickToExpand: true
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

  function remote(remoteObj) {
    // it means that only pagination you will handle by your own
    remoteObj.pagination = true;
    remoteObj.cellEdit = false;
    return remoteObj;
  }

  const noDataHandler = () => {
    if (isFetching) return <Spinner />;
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

  const customConfirmForBlacklist = data => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          {data.is_blackList === false
            ? "Are you sure you want to unblackList this Evenue"
            : "Are you sure you want to blackList this Evenue?"}
        </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        {
          label: "Cancel"
        },
        {
          label: "Confirm",
          onClick: () => {
            updateIsBlackListOtherVenueRequest({
              venueId: data.venueId,
              is_blackList: data.is_blackList
            });
          }
        }
      ]
    });
  };

  const backListFormatter = (cell, row) => {
    // if (row.is_blackList === 1) row.is_blackList = true
    // else row.is_blackList = false

    return (
      <div className="is_blackList tbl_btn">
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.is_blacklist === true ? true : false}
            onChange={evt => {
              const payload = {
                venueId: row._id,
                is_blackList: evt,
                row: row
              };
              customConfirmForBlacklist(payload);
            }}
          />
        </div>
      </div>
    );
  };

  const buttonFormatter = (cell, row) => {
    return (
      <div className="tbl_btn bbtn_cls">
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            delete row._id;
            delete row._rev;
            delete row.is_deleted;
            delete row.status;
            delete row.created_date;
            delete row.updated_date;
            delete row.timestamp;
            // delete row.type
            delete row.getEventsFromScraper;
            rowToEdit = row;
            setShowOtherVenuesEdit(true);
          }}
        >
          Update Other-Venue
        </Button>
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            setSelectedOtherVenue(row);
            history.push({
              pathname: `/otherVenueDetail/${row.venueId}`
            });
          }}
        >
          Details
        </Button>
      </div>
    );
  };

  const expandRow = row => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>Time Zone</label>{" "}
          <span className="row_val">{`${row.timezone}`}</span>
        </div>
        <div className="expand_row_inner">
          <label>Created Date</label>{" "}
          <span className="row_val">{`${dateFormatter(
            row.created_date
          )}`}</span>
        </div>
      </div>
    );
  };

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span> Are you sure you want to delete these managed venues? </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            dropRowKeys.forEach(key => {
              deleteOtherVenueRequest({ venueId: key });
            });
            next();
          }
        }
      ]
    });
  };

  const handlePageChange = (page, sizePerPage) => {
    fetchOtherVenuesRequest({
      typeKey: "other",
      createdStartDate: searchStartDate
        ? searchStartDate.format("YYYY-MM-DD")
        : "",
      createdEndDate: searchEndDate ? searchEndDate.format("YYYY-MM-DD") : "",
      marketSource,
      emailExists,
      skyboxVenueIdKey,
      nameKey,
      addressKey,
      zipKey,
      page,
      limit: sizePerPage
    });
  };

  const isExpandRow = () => {
    return true;
  };

  const handleInsertedRow = row => {
    if (row.hasOwnProperty("url")) {
      if (row.url.indexOf("www") === -1) {
        row.url = row.url.split("//")[0] + "//www." + row.url.split("//")[1];
      }
    }
    createOtherVenueRequest(row);
  };

  const createCustomModal = (
    onModalClose,
    onSave,
    columns,
    validateState,
    ignoreEditable
  ) => {
    const attr = {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable,
      is_group_checked,
      setIsGroupChecked,
      is_daylight_checked,
      setDaylightChecked,
      addMarketSource,
      setAddMarketSource,
      marketSourceOption
    };
    return <OtherVenuesModel {...attr} appReceiveAlert={appReceiveAlert} />;
  };

  const options = {
    page: othervenues.page, // which page you want to show as default
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
    insertText: "Add Other-Venue",
    expandBy: "column",
    afterInsertRow: handleInsertedRow,
    insertModal: createCustomModal,
    onRowClick: function(row, columnIndex, rowIndex, e) {
      if (
        e.target.parentElement.parentElement.parentElement.className ===
        "is_blackList"
      ) {
        if (row.is_blackList === true) return (row.is_blackList = false);
        else return (row.is_blackList = true);
      }
    }
  };
  useEffect(() => {
    fetchOtherVenuesRequest({
      typeKey: "other",
      createdStartDate: searchStartDate
        ? searchStartDate.format("YYYY-MM-DD")
        : "",
      createdEndDate: searchEndDate ? searchEndDate.format("YYYY-MM-DD") : "",
      marketSource,
      emailExists,
      skyboxVenueIdKey,
      nameKey,
      addressKey,
      zipKey,
      page: othervenues.page,
      limit: sizePerPage
    });
  }, []);

  const applyCallback = (startDate, endDate) => {
    setSearchStartDate(startDate);
    setSearchEndDate(endDate);
  };
  const checkEmailExistOrnor = (cell, row) => {
    var status = "";
    if (row.emailExists === true) {
      status = (
        <div className="green_txt">
          <i className="fa fa-check"></i>
        </div>
      );
    }
    if (row.emailExists === false || row.emailExists === "") {
      status = (
        <div className="red_txt">
          <i className="fa fa-times"></i>
        </div>
      );
    }
    return <div>{status}</div>;
  };
  return (
    <div>
      {showOtherVenuesEdit ? (
        <OtherVenuesEdit
          rowToEdit={rowToEdit}
          updateOtherVenueRequest={updateOtherVenueRequest}
          fetchOtherVenuesRequest={fetchOtherVenuesRequest}
          appReceiveAlert={appReceiveAlert}
          marketSourceOption={marketSourceOption}
          isOtherVenuesEdit={isOtherVenuesEditOpen =>
            setShowOtherVenuesEdit(isOtherVenuesEditOpen)
          }
        />
      ) : (
        ""
      )}
      <div className="full_width">
        <div className="page_name">
          <h2>Other-Venues</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12">
                <div className="white_box mrgbtm50">
                  <div className="cm_ttl">
                    <h2>Other-Venues</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main cm_tbl_btn_main nw_od_cls">
                      <div className="table_head acc_main">
                        <div className="filterCV">
                          <Accordion>
                            <Card>
                              <Accordion.Toggle
                                className="cm_ttl"
                                as={Card.Header}
                                eventKey="0"
                              >
                                <h2>Filter Options</h2>
                              </Accordion.Toggle>

                              <Accordion.Collapse eventKey="0">
                                <div className="select_eq filter_filed">
                                  <div className="fl_eq_box rangeCls">
                                    <label className="searchHead">
                                      Created Date
                                    </label>
                                    <div className="date_picker dateCls">
                                      <DateTimeRangeContainer
                                        ranges={ranges}
                                        start={start}
                                        end={end}
                                        local={local}
                                        applyCallback={applyCallback}
                                      >
                                        <div className="input-group">
                                          <Form.Control
                                            id="formControlsTextB"
                                            type="text"
                                            label="Text"
                                            readOnly
                                            value={
                                              searchStartDate &&
                                              searchEndDate !== undefined
                                                ? searchStartDate.format(
                                                    "MM/DD/YYYY"
                                                  ) +
                                                  " to " +
                                                  searchEndDate.format(
                                                    "MM/DD/YYYY"
                                                  )
                                                : "Enter Start Date - End Date"
                                            }
                                            placeholder="Search...."
                                          />
                                          <span className="input-group-btn">
                                            <Button className="default date-range-toggle">
                                              <i className="fa fa-calendar" />
                                            </Button>
                                          </span>
                                        </div>
                                      </DateTimeRangeContainer>
                                    </div>
                                  </div>

                                  <div
                                    className="fl_eq_box"
                                    style={{ marginRight: "1%" }}
                                  >
                                    <label className="searchHead">
                                      Market Source
                                    </label>
                                    <Form.Control
                                      as="select"
                                      value={marketSource}
                                      onChange={evt =>
                                        setMarketSource(evt.target.value)
                                      }
                                    >
                                      <option value="">Show All</option>
                                      {marketSourceOption.map(
                                        ({ id, name }, i) => (
                                          <option key={id} value={name}>
                                            {name}
                                          </option>
                                        )
                                      )}
                                    </Form.Control>
                                  </div>

                                  <div
                                    className="fl_eq_box"
                                    style={{ marginRight: "1%" }}
                                  >
                                    <label className="searchHead">
                                      Email Exists
                                    </label>
                                    <Form.Control
                                      // className="search_icon"
                                      as="select"
                                      value={emailExists}
                                      // placeholder="Search..."
                                      onChange={evt =>
                                        setEmailExists(evt.target.value)
                                      }
                                    >
                                      <option value="">Show All</option>
                                      <option value="true">Show True</option>
                                      <option value="false">Show False</option>
                                    </Form.Control>
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
                                    <label className="searchHead">
                                      Venue Name
                                    </label>
                                    <Form.Control
                                      type="text"
                                      value={nameKey}
                                      placeholder="Search..."
                                      onChange={evt =>
                                        setNameKey(evt.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="fl_eq_box">
                                    <label className="searchHead">
                                      Venue Address
                                    </label>
                                    <Form.Control
                                      type="text"
                                      value={addressKey}
                                      placeholder="Search..."
                                      onChange={evt =>
                                        setAddressKey(evt.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="fl_eq_box">
                                    <label className="searchHead">City</label>
                                    <Form.Control
                                      type="text"
                                      value={cityKey}
                                      placeholder="Search..."
                                      onChange={evt =>
                                        setCityKey(evt.target.value)
                                      }
                                    />
                                  </div>
                                  <div
                                    className="fl_eq_box"
                                    style={{ margin: "0 1% 15px 0" }}
                                  >
                                    <label className="searchHead">State</label>
                                    <Form.Control
                                      type="text"
                                      value={stateKey}
                                      placeholder="Search..."
                                      onChange={evt =>
                                        setStateKey(evt.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="fl_eq_box">
                                    <label className="searchHead">
                                      Zipcode
                                    </label>
                                    <Form.Control
                                      type="text"
                                      value={zipKey}
                                      placeholder="Search..."
                                      onChange={evt =>
                                        setZipKey(evt.target.value)
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
                                          fetchOtherVenuesRequest({
                                            typeKey: "other",
                                            createdStartDate: searchStartDate
                                              ? searchStartDate.format(
                                                  "YYYY-MM-DD"
                                                )
                                              : "",
                                            createdEndDate: searchEndDate
                                              ? searchEndDate.format(
                                                  "YYYY-MM-DD"
                                                )
                                              : "",
                                            marketSource,
                                            emailExists,
                                            skyboxVenueIdKey,
                                            nameKey,
                                            addressKey,
                                            cityKey,
                                            stateKey,
                                            zipKey,
                                            limit: sizePerPage
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
                                          setSearchStartDate();
                                          setSearchEndDate();
                                          setEmailExists("");
                                          setSkyboxVenueIdKey("");
                                          setNameKey("");
                                          setAddressKey("");
                                          setCityKey("");
                                          setStateKey("");
                                          setZipKey("");
                                          setMarketSource("");
                                          fetchOtherVenuesRequest({
                                            typeKey: "other",
                                            createdStartDate: "",
                                            createdEndDate: "",
                                            marketSource: "",
                                            emailExists: "",
                                            skyboxVenueIdKey: "",
                                            nameKey: "",
                                            addressKey: "",
                                            cityKey: "",
                                            stateKey: "",
                                            zipKey: "",
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
                      <div className="inner_tbl">
                        {isFetching ? (
                          <Spinner spinnerTime={false} />
                        ) : (
                          <BootstrapTable
                            data={Object.values(othervenues.othervenues)}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            fetchInfo={{
                              dataTotalSize: othervenues.totalVenues || 0
                            }}
                            cellEdit={cellEditProp}
                            selectRow={selectRow}
                            deleteRow
                            insertRow
                            remote={remote}
                            blurToSave={true}
                            // search
                            expandableRow={isExpandRow}
                            expandComponent={expandRow}
                            expandColumnOptions={{ expandColumnVisible: true }}
                          >
                            <TableHeaderColumn
                              dataField="venueId"
                              hidden
                              isKey
                              hiddenOnInsert
                            >
                              venueId
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="name"
                              expandable={false}
                              editable={false}
                            >
                              Name
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="skyboxVenueId"
                              expandable={false}
                              editable={false}
                            >
                              SkyboxVenueId
                            </TableHeaderColumn>
                            {}

                            {/* <TableHeaderColumn
                              dataField="created_date"
                              expandable={false}
                              editable={false}
                              dataFormat={dateFormatter}
                              dataSort
                              sort={"asc"}
                            >
                              Created Date
                            </TableHeaderColumn> */}

                            <TableHeaderColumn
                              dataField="type"
                              expandable={false}
                              editable={false}
                              dataSort
                              sort={"asc"}
                            >
                              Market Source
                            </TableHeaderColumn>

                            {}

                            <TableHeaderColumn
                              dataField="city"
                              expandable={false}
                              editable={false}
                            >
                              City
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="state"
                              expandable={false}
                              editable={false}
                            >
                              State
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="zip"
                              expandable={false}
                              editable={false}
                            >
                              Zip Code
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="address"
                              expandable={false}
                              editable={false}
                            >
                              Address
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="emailExits"
                              dataFormat={checkEmailExistOrnor}
                            >
                              Email Exist
                            </TableHeaderColumn>

                            {}

                            <TableHeaderColumn dataField="scraperURL" hidden>
                              scraperURL
                            </TableHeaderColumn>

                            {}
                            <TableHeaderColumn
                              expandable={false}
                              dataField="is_blackList"
                              editable={false}
                              dataFormat={backListFormatter}
                            >
                              BlackList
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataFormat={buttonFormatter}
                              dataAlign="center"
                              editable={false}
                              expandable={false}
                              width="32%"
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

export default withRouter(otherVenues);
