import React, { useState } from "react";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Modal, Form } from "react-bootstrap";
import { checkValidationForGlobal } from "../../utils/validation";
import { ALERT_MSG_ERROR } from "../../constants";
const AddGlobalConfigModel = ({
  onModalClose,
  onSave,
  columns,
  global_tab,
  addGlobalConfigRequest,
  appReceiveAlert
}) => {
  const [tabName, setTabName] = useState("");
  const [keyName, setKeyName] = useState("");
  const [value, setValue] = useState("");
  const handleSaveBtnClick = () => {
    if (checkValidationForGlobal(keyName, value, tabName)) {
      addGlobalConfigRequest({
        keyName: keyName,
        value: value,
        tabName: tabName
      });
      onModalClose(false);
    } else {
      appReceiveAlert({
        type: ALERT_MSG_ERROR,
        message: 'All  "*"  Information are required'
      });
    }
  };
  const headerStyle = {
    color: "black"
  };
  return (
    <div>
      <div className="animated">
        <Modal
          className="ReactModalPortal addTimePop"
          size="lg"
          centered
          show={true}
          onHide={onModalClose}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title
              className="EmailManagement_title"
              style={headerStyle}
              id="example-modal-sizes-title-lg"
            >
              Add Global Configration
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <div className="row">
                <div className="col-sm-4">
                  <Form.Label>
                    Key Name<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                </div>
                <div className="col-sm-8">
                  <Form.Control
                    type="text"
                    placeholder="Key Name"
                    defaultValue={keyName}
                    onChange={evt => setKeyName(evt.target.value)}
                  />
                </div>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="row">
                <div className="col-sm-4">
                  <Form.Label>
                    Value<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                </div>
                <div className="col-sm-8">
                  <Form.Control
                    type="text"
                    defaultValue={value}
                    placeholder="Value"
                    onChange={evt => setValue(evt.target.value)}
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group>
              <div className="row">
                <div className="col-sm-4">
                  <Form.Label>
                    Tab Name<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                </div>
                <div className="col-sm-8">
                  <Form.Control
                    as="select"
                    value={tabName}
                    onChange={evt => setTabName(evt.target.value)}
                  >
                    <option value="">--Select--</option>
                    {global_tab.map(global => {
                      return (
                        <>
                          <option value={global.tabName}>
                            {global.tabName}
                          </option>
                        </>
                      );
                    })}
                  </Form.Control>
                </div>
              </div>
            </Form.Group>
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
              onClick={() => handleSaveBtnClick(columns, onSave)}
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddGlobalConfigModel;
