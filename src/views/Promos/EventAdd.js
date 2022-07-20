/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardHeader, Button, Row } from "reactstrap"
import { Modal, Form } from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { checkValidation } from "../../utils/validation";
import Spinner from "../../components/Spinner";
const EventAdd = ({
  columns,
  Rowdata,
  onSave,
  onModalClose,
  appReceiveAlert,
  eventStatus,
  addEventPromoRequest,
  isEventAdd,
  fetchEventPromosRequest,
  deleteEventPromosFromAddPromoRequest,
  eventIdFromQueue,
  eventDBIdFromQueue,
  isCommingFromQueuePage,
  eventAvailablePromosFetching,
  fetchEventAvailablePromoRequest,
  clearAvailablePromos,
  isFromCountTable,
  availablePromoNames,
  isComingFromManagedEvents,
  eventIdFromManagedEvents,
  eventDBIdFromManagedEvents,
  isComingFromEventPromo,
  isComingFromAddNewEventPromo
}) => {
  var length = 1;
  if (Rowdata != undefined) {
    if (Rowdata.length != 0) {
      length = Rowdata.promoName.length;
    }
  }
  var obj = [];
  for (var i = 0; i < length; i++) {
    var item = {};
    item["promoName"] = "";
    item["promoCode"] = "";
    obj.push(item);
  }
  const [inputList, setInputList] = useState(obj);
  const [eventId, setEventId] = useState("");
  const [eventModal, setEventModal] = useState(true);
  const [disablePromoName, setDisablePromoName] = useState(false);
  const [isErrorEventId, setIsErrorEventId] = useState(false);
  const [isErrorEventPromoName, setIsErrorEventPromoName] = useState(false);

  useEffect(() => {
    updateInputList();
  }, [availablePromoNames]);

  useEffect(() => {
    if (eventIdFromQueue && eventDBIdFromQueue) {
      fetchEventAvailablePromoRequest(eventDBIdFromQueue);
    }

    if (Rowdata != undefined) {
      if (Rowdata.length != 0) {
        var promoName = Rowdata.promoName;
        var promoCode = Rowdata.promoCode;
        for (var i = 0; i < promoName.length; i++) {
          const list = [...inputList];
          list[i]["promoName"] = promoName[i];
          list[i]["promoCode"] = promoCode[i];
          setInputList(list);
        }
        setDisablePromoName(true);
      }
    }
  }, []);
  const headerStyle = {
    color: "black"
  };

  const LabelStyle = {
    margin: "0",
    width: "100%",
    maxWidth: "115px",
    float: "right",
    paddingRight: "10px",
    lineHeight: "40px",
    textAlign: "left",
    color: "rgba(25, 38, 48, 0.5)",
    fontWeight: "500"
  };

  const FormControlStyle = {
    height: "40px",
    width: "100%",
    padding: "0 10px",
    float: "left",
    fontSize: "15px",
    color: "#212529",
    background: "#fff !important",
    border: "1px solid rgba(25, 38, 48, 0.5)"
  };

  const updateInputList = () => {
    if (!inputList.length) return;
    let list = [...inputList];
    if (!availablePromoNames) return;
    for (let promos of availablePromoNames) {
      let existPromo = inputList.find(list => list.promoName === promos);
      if (existPromo) {
        // nothing to do
      } else {
        let index = inputList.findIndex(list => list.promoName === promos);

        if (index > -1) {
          list.splice(index, 1);
        }
        list.push({ promoName: promos, promoCode: "" });
      }
      let indexempty = list.findIndex(list => list.promoName === "");
      if (indexempty > -1 && list.length > 1) {
        list = list.filter(({ promoName }) => promoName !== "");
      }
    }
    setInputList(list);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index, eventDBId) => {
    setIsErrorEventId(false);
    setIsErrorEventPromoName(false);
    if (Rowdata != undefined) {
      var data = inputList[index];
      var obj = {};
      obj[data.promoName] = data.promoCode;

      deleteEventPromosFromAddPromoRequest({
        isFromCountdown: isFromCountTable === "isFromCountTable" ? true : false,
        isFromRemonitorPresaleTable:
          isFromCountTable === "isFromRemonitorPresaleTable" ? true : false,
        isCommingFromQueuePage,
        isComingFromManagedEvents,
        isComingFromEventPromo,
        isComingFromAddNewEventPromo,
        eventDBId,
        promos: obj
      });
    }
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setDisablePromoName(false);
    setIsErrorEventId(false);
    setIsErrorEventPromoName(false);
    if (inputList[0].promoName !== "") {
      setInputList([...inputList, { promoName: "", promoCode: "" }]);
    } else {
      setIsErrorEventPromoName(true);
    }
  };
  const handleSaveBtnClick = (eventDBId, isEventDBId = true, inputList) => {
    var obj = {};
    for (var i = 0; i < inputList.length; i++) {
      obj[inputList[i].promoName] = inputList[i].promoCode;
    }
    addEventPromoRequest({
      isFromCountdown: isFromCountTable === "isFromCountTable" ? true : false,
      isFromRemonitorPresaleTable:
        isFromCountTable === "isFromRemonitorPresaleTable" ? true : false,
      isCommingFromQueuePage,
      isComingFromManagedEvents,
      isComingFromEventPromo,
      isComingFromAddNewEventPromo,
      eventDBId,
      isEventDBId,
      promos: obj
    });

    if (availablePromoNames) {
      clearAvailablePromos();
    }

    // setInputList(obj)
    onModalClose(false);
    setEventModal(false);
    if (isEventAdd != undefined) isEventAdd(false);
  };

  return (
    <div>
      <div className="animated">
        <Modal
          className="ReactModalPortal"
          size="lg"
          centered
          show={eventModal}
          onHide={() => {
            onModalClose(false);
            setEventModal(false);
            if (availablePromoNames) {
              clearAvailablePromos();
            }
            setInputList(obj);
            if (isEventAdd != undefined) isEventAdd(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="EmailManagement_title" style={headerStyle}>
              {Rowdata != undefined ? "Update Event Promo" : "Add Event Promo"}
            </Modal.Title>
          </Modal.Header>
          {eventAvailablePromosFetching ? (
            <Spinner spinnerTime={false} />
          ) : (
            <Modal.Body
              style={{
                maxHeight: "calc(100vh - 110px)",
                overflowY: "auto"
              }}
            >
              <Form.Group>
                <div className="cls_main">
                  <div className="row">
                    <div className="col-sm-4">
                      <Form.Label style={LabelStyle}>
                        Event Id<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                    </div>
                    <div className="col-sm-8">
                      <Form.Control
                        type="text"
                        placeholder="Event Id"
                        style={FormControlStyle}
                        value={
                          Rowdata !== undefined
                            ? Rowdata.eventId
                            : eventIdFromQueue != undefined
                            ? eventIdFromQueue
                            : eventIdFromManagedEvents
                            ? eventIdFromManagedEvents
                            : eventId
                        }
                        onChange={e => setEventId(e.target.value)}
                      />
                      <div>
                        {isErrorEventId ? (
                          <span style={{ color: "red", float: "left" }}>
                            Event Id is Required
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                {/* <div className="cls_main">
                <div className="row">
                  <div className="col-sm-4">
                    <Form.Label>Available Promo Names:</Form.Label>
                  </div>
                  <div className="col-sm-8">
                    {availablePromoNames &&
                      availablePromoNames.map((name, i) => {
                        return (
                          <span>
                            [{i + 1}] {name}{" "}
                            <CopyToClipboard text={name} onCopy={() => ""}>
                              <div style={{}}>
                                <div className="tbl_btn">
                                  <OverlayTrigger
                                    placement="left"
                                    overlay={
                                      <Tooltip>Copy to ClipBoard</Tooltip>
                                    }
                                  >
                                    <Button
                                      className="icon_btn"
                                      active
                                      color="primary"
                                      aria-pressed="true"
                                    >
                                      <img
                                        src={require("./../../assets/img/sheet.png")}
                                        alt="copy Link"
                                      />
                                    </Button>
                                  </OverlayTrigger>
                                </div>
                              </div>
                            </CopyToClipboard>
                          </span>
                        )
                      })}
                  </div>
                </div>
              </div> */}

                {inputList.map((x, i) => {
                  return (
                    <div className="cls_main">
                      <Form.Group>
                        <div className="row">
                          <div className="col-sm-6">
                            <Form.Control
                              type="text"
                              name="promoName"
                              disabled={disablePromoName}
                              placeholder="PromoName"
                              style={FormControlStyle}
                              value={x.promoName}
                              onChange={e => handleInputChange(e, i)}
                            />
                            <div>
                              {isErrorEventPromoName ? (
                                <span style={{ color: "red", float: "left" }}>
                                  Promo Name is Required
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <Form.Control
                              type="text"
                              name="promoCode"
                              placeholder="PromoCode"
                              style={FormControlStyle}
                              value={x.promoCode}
                              onChange={e => handleInputChange(e, i)}
                            />
                          </div>
                        </div>
                      </Form.Group>
                      {/* <Form.Group> */}
                      {/* <div className="row">
                        <div className="col-sm-4">
                          <Form.Label style={LabelStyle}>Promo Code</Form.Label>
                        </div>
                        <div className="col-sm-8">
                          <Form.Control
                            type="text"
                            name="promoCode"
                            placeholder="PromoCode"
                            style={FormControlStyle}
                            value={x.promoCode}
                            onChange={e => handleInputChange(e, i)}
                          />
                        </div>
                      </div> */}
                      {/* </Form.Group> */}
                      <div className="btn-box">
                        {inputList.length !== 1 && (
                          // eslint-disable-next-line jsx-a11y/anchor-is-valid
                          <a
                            className="cs_icon rem_cs_icon"
                            onClick={() =>
                              handleRemoveClick(
                                i,
                                Rowdata !== undefined
                                  ? Rowdata._id
                                  : eventDBIdFromManagedEvents
                                  ? eventDBIdFromManagedEvents
                                  : ""
                              )
                            }
                          >
                            <div className="red_txt">
                              <i className="fa fa-times"></i>
                            </div>
                          </a>
                        )}
                        {inputList.length - 1 === i && (
                          // eslint-disable-next-line jsx-a11y/anchor-is-valid
                          <a
                            className="cs_icon add_cs_icon"
                            onClick={handleAddClick}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </Form.Group>
            </Modal.Body>
          )}
          <Modal.Footer>
            <button
              className="btn btn-default btn-secondary"
              onClick={() => {
                onModalClose(false);
                setEventModal(false);
                if (availablePromoNames) {
                  clearAvailablePromos();
                }
                if (isEventAdd != undefined) isEventAdd(false);
              }}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                var valid = "";
                valid = checkValidation(
                  Rowdata !== undefined
                    ? Rowdata.eventId
                    : eventIdFromQueue != undefined
                    ? eventIdFromQueue
                    : eventIdFromManagedEvents
                    ? eventIdFromManagedEvents
                    : eventId,
                  inputList
                );
                if (valid === "all") {
                  setIsErrorEventId(true);
                  setIsErrorEventPromoName(true);
                } else if (valid === "eventId") {
                  setIsErrorEventId(true);
                  setIsErrorEventPromoName(false);
                } else if (valid === "promoName") {
                  setIsErrorEventId(false);
                  setIsErrorEventPromoName(true);
                } else {
                  setIsErrorEventId(false);
                  setIsErrorEventPromoName(false);
                  handleSaveBtnClick(
                    Rowdata !== undefined
                      ? Rowdata._id
                      : eventDBIdFromQueue != undefined
                      ? eventDBIdFromQueue
                      : eventIdFromManagedEvents
                      ? eventIdFromManagedEvents
                      : eventId,
                    Rowdata || eventDBIdFromQueue ? true : false,
                    inputList
                  );
                }
              }}
            >
              {Rowdata !== undefined ? "Update" : " Save"}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default EventAdd;
