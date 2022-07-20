/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardHeader, Button, Row } from "reactstrap"
import { Button, Tabs, Tab } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable";
//import getTabsForGlobalData from "../../constants/global"
import { formatedData } from "../../utils/validation";
import Spinner from "../../components/Spinner";
import AddGlobalConfigModel from "./AddGlobalConfig";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

var forDeleteData = {};
const GlobalConfig = ({
  globals,
  fetchGlobalConfigRequest,
  deleteGlobalConfigRequest,
  addGlobalConfigRequest,
  updateGlobalConfigRequest,
  fetchGlobal_tab_ConfigRequest,
  global_tab,
  isFetching,
  appReceiveAlert
}) => {
  useEffect(() => {
    fetchGlobalConfigRequest();
    fetchGlobal_tab_ConfigRequest();
  }, []);

  const toggleButtonArray = ["DisabledReprice", "jockeyRepriceONLY"];
  const [isTabClick, setIsTabClick] = useState(false);
  const [currentSelectedTab, setCurrentSelectedTab] = useState("");

  const changeSelectedTab = tabName => {
    setCurrentSelectedTab(prev => {
      if (prev !== tabName) {
        setIsTabClick(false);
        return tabName;
      } else if (prev === tabName) {
        return prev;
      } else {
        setIsTabClick(false);
        return prev;
      }
    });
  };

  const onRowSelect = (row, isSelected, e) => {
    var target = global_tab.find(code => {
      if (code.tabData[row.keyName]) return code;
    });
    if (target) {
      row["tabName"] = target.tabName;
      forDeleteData = row;
    }
  };
  const selectRow = {
    mode: "checkbox",
    // customComponent: CustomMultiSelectTable,
    onSelect: onRowSelect
  };
  const createCustomDeleteButton = (onBtnClick, row) => {
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

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>Are you sure you want to delete these global config?</span>
      ),
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            if (forDeleteData) {
              deleteGlobalConfigRequest({
                dropRowKeys,
                tabName: forDeleteData.tabName
              });
            }
            next();
          }
        }
      ]
    });
  };

  const cellEditProp = {
    mode: "click",
    blurToSave: true,
    nonEditableRows: function() {
      return toggleButtonArray;
    }
  };
  const buttonFormatter = (cell, row) => {
    return (
      <div className="tbl_btn bbtn_cls">
        <Button
          active
          color="primary"
          aria-pressed="true"
          onClick={() => {
            updateGlobalConfigRequest(row);
          }}
        >
          Update Configration
        </Button>
      </div>
    );
  };

  const createCustomModal = (onModalClose, onSave, columns) => {
    const attr = {
      onModalClose,
      onSave,
      columns
    };
    return (
      <AddGlobalConfigModel
        {...attr}
        addGlobalConfigRequest={addGlobalConfigRequest}
        global_tab={global_tab}
        fetchGlobal_tab_ConfigRequest={fetchGlobal_tab_ConfigRequest}
        appReceiveAlert={appReceiveAlert}
      />
    );
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
    deleteBtn: createCustomDeleteButton,
    handleConfirmDeleteRow: customConfirm,
    insertModal: createCustomModal,
    insertText: "Add Configration"
  };

  const formatKeyValue = (cell, row) => {
    return toggleButtonArray.includes(row.keyName) ? (
      <div className="is_blackList tbl_btn">
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.value === "1" ? true : false}
            onChange={evt => {
              updateGlobalConfigRequest({
                ...row,
                value: evt === true ? "1" : "0"
              });
            }}
          />
        </div>
      </div>
    ) : (
      <span>{cell}</span>
    );
  };
  return (
    <div className="inner_main">
      <div className="full_width">
        <div className="row">
          <div className="col-sm-12">
            <div className="white_box mrgbtm50">
              <div className="cm_ttl">
                <h2>Global Configration</h2>
              </div>
              <div className="inner_box_body padL3T5">
                {global_tab.length !== 0 && !isFetching && !isTabClick ? (
                  <div className="tbl_main cm_tbl_btn_main">
                    <div className="inner_tbl" id="tabContent">
                      <Tabs
                        defaultActiveKey={
                          currentSelectedTab !== ""
                            ? currentSelectedTab
                            : global.tabName
                        }
                        id="uncontrolled-tab-example"
                      >
                        {global_tab.length !== 0 && !isTabClick ? (
                          global_tab.map((global, i) => {
                            return (
                              <Tab
                                key={global.tabName}
                                eventKey={global.tabName}
                                onEnter={() => {
                                  setIsTabClick(true);
                                  fetchGlobalConfigRequest();
                                  fetchGlobal_tab_ConfigRequest();
                                  changeSelectedTab(global.tabName);
                                }}
                                title={global.tabName}
                              >
                                <div className="tbl_main">
                                  <div className="inner_tbl">
                                    <BootstrapTable
                                      data={
                                        global
                                          ? formatedData(
                                              global.tabData,
                                              global.tabName
                                            )
                                          : []
                                      }
                                      version="4"
                                      striped
                                      hover
                                      pagination
                                      options={options}
                                      cellEdit={cellEditProp}
                                      deleteRow
                                      insertRow
                                      selectRow={selectRow}
                                      search
                                    >
                                      <TableHeaderColumn
                                        dataField="keyName"
                                        isKey={true}
                                      >
                                        Key Name
                                      </TableHeaderColumn>
                                      <TableHeaderColumn
                                        dataFormat={formatKeyValue}
                                        dataField="value"
                                      >
                                        Value
                                      </TableHeaderColumn>
                                      <TableHeaderColumn
                                        hidden
                                        dataField="tabName"
                                      >
                                        global.tabName
                                      </TableHeaderColumn>
                                      <TableHeaderColumn
                                        //  dataField="button"
                                        dataFormat={buttonFormatter}
                                        dataAlign="center"
                                        editable={false}
                                        width="300"
                                      >
                                        Action
                                      </TableHeaderColumn>
                                    </BootstrapTable>
                                  </div>
                                </div>
                              </Tab>
                            );
                          })
                        ) : (
                          <Spinner spinnerTime={false} />
                        )}
                      </Tabs>
                    </div>
                  </div>
                ) : (
                  <Spinner spinnerTime={false} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalConfig;
