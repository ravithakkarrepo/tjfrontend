/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import BlackListRowModal from "./BlackListRow";
import {
  filterUniqueSection,
  checkingforBlacklistSection
} from "../../utils/validation";

const BlackListSection = ({
  isBlackListModal,
  FetchBlackListPriceSectionRequest,
  // eventId,
  eventDBId,
  blackListInfo,
  isBlackListingFetching,
  isAddBlackListFetching,
  addBlackListPriceSectionRequest
}) => {
  const [blackListModal, setBlackListModal] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [spinnerTime, setSpinnerTime] = useState(false);
  const [blackListRowModal, setBlackListRowModal] = useState(false);
  const [pricePointSection, setPricePointSection] = useState("");
  useEffect(() => {
    FetchBlackListPriceSectionRequest({ eventId: eventDBId });
  }, []);
  const onRowSelect = (row, isSelected, e) => {
    setPricePointSection(row.pricePoint);
  };

  const onSelectAll = (isSelected, rows) => {
    setPricePointSection(rows[0].pricePoint);
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: onRowSelect,
    onSelectAll: onSelectAll
  };

  const backListFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <BootstrapSwitchButton
          checked={row.isBlackList === true ? true : false}
          onChange={evt => {
            const payload = {
              eventId: eventDBId,
              is_blackList: evt,
              row: row
            };
            let blacklistPrice = [];
            let sectionsAndRows = [];
            for (let secRow of row.secRows) {
              sectionsAndRows.push(secRow.key);
            }
            var sectionObj = {};
            sectionObj["pricePoint"] = row.price;
            sectionObj["isPricePointBlackList"] = evt;
            sectionObj["isBlackListSection"] = evt ? true : false;
            sectionObj["section"] = sectionsAndRows;
            blacklistPrice.push(sectionObj);
            addBlackListPriceSectionRequest({
              eventId: payload.eventId,
              body: {
                blackListData: blacklistPrice
              }
            });
            blacklistPrice = [];
            setBlackListModal(true);
          }}
        />
      </div>
    );
  };

  const priceFormatter = (cell, row) => {
    return (
      <div className="is_blackList tbl_btn">
        <i className="fa fa-chevron-down"></i>
        {row.price}
      </div>
    );
  };

  const backListSectionFormatter = (cell, row) => {
    return row.isPricePointBlackList ? (
      <div className="is_blackList tbl_btn" style={{ pointerEvents: "none" }}>
        <BootstrapSwitchButton
          checked={row.isBlackList === true ? true : false}
        />
      </div>
    ) : (
      <div className="is_blackList tbl_btn">
        <BootstrapSwitchButton
          checked={row.isBlackList === true ? true : false}
          onChange={evt => {
            let sectionsAndRows = [];
            let blackListSection = [];
            const payload = {
              eventId: eventDBId,
              isblackListSection: evt,
              row: row
            };
            sectionsAndRows.push(payload.row.key);
            var sectionObj = {};
            sectionObj["pricePoint"] = row.pricePoint;
            sectionObj["isPricePointBlackList"] = false;
            sectionObj["isBlackListSection"] = payload.isblackListSection;
            sectionObj["section"] = sectionsAndRows;
            blackListSection.push(sectionObj);
            addBlackListPriceSectionRequest({
              eventId: payload.eventId,
              body: {
                blackListData: blackListSection
              }
            });
            setBlackListModal(true);
          }}
        />
      </div>
    );
  };

  const customConfirm = (next, dropRowKeys) => {
    if (pricePointSection != undefined) {
      let blackListSection = [];
      var sectionObj = {};
      sectionObj["pricePoint"] = pricePointSection;
      sectionObj["isPricePointBlackList"] = false;
      sectionObj["isBlackListSection"] = true;
      sectionObj["section"] = dropRowKeys;
      blackListSection.push(sectionObj);
      addBlackListPriceSectionRequest({
        eventId: eventDBId,
        body: {
          blackListData: blackListSection
        }
      });
    } else {
      addBlackListPriceSectionRequest({
        eventId: eventDBId,
        body: {
          blackListSection: dropRowKeys
        }
      });
    }
  };

  const cellEdit = {
    mode: "click"
  };
  const noDataHandler = () => {
    if (isBlackListingFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
  };

  const isExpandableRow = row => {
    if (row) return true;
    else return false;
  };

  const createCustomDeleteButton = onBtnClick => {
    return (
      <Button color="primary" className="btn-pill" onClick={onBtnClick}>
        BlackList
      </Button>
    );
  };

  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: 10, // which size per page you want to locate as default
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
    onRowClick: function(row, columnIndex, rowIndex, e) {
      if (e.target.offsetParent.className === "switch-group") {
        if (row.isBlackList === true) return (row.isBlackList = false);
        else return (row.isBlackList = true);
      }
    }
  };
  const expandComponent = (row, cell) => {
    if (row.secRows != undefined) {
      row.secRows = row.secRows.map(item => {
        item["pricePoint"] = row.price;
        item["isPricePointBlackList"] = row.isBlackList;
        return item;
      });
    }
    return (
      <div className="inner_acc_main">
        <div className="inner_acc_cover">
          <h2 className="bg_green">Sections & Rows</h2>
          <div className="tbl_main">
            <div className="inner_tbl">
              <BootstrapTable
                data={row.secRows}
                version="4"
                striped
                hover
                pagination
                options={options}
                selectRow={selectRow}
                cellEdit={cellEdit}
                deleteRow
              >
                <TableHeaderColumn
                  dataField="key"
                  isKey
                  editable={false}
                  dataSort
                >
                  Section/Row
                </TableHeaderColumn>
                <TableHeaderColumn
                  expandable={false}
                  dataAlign="center"
                  dataField="isBlackList"
                  editable={false}
                  dataFormat={backListSectionFormatter}
                >
                  BlackList
                </TableHeaderColumn>
                <TableHeaderColumn
                  expandable={false}
                  dataAlign="center"
                  dataField="pricePoint"
                  editable={false}
                  hidden
                >
                  PricePoint
                </TableHeaderColumn>
                {/* <TableHeaderColumn
                  expandable={false}
                  dataAlign="center"
                  editable={false}
                  dataFormat={backListRowFormatter}
                >
                  BlackListRow
                </TableHeaderColumn> */}
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const formatSection = data => {
    var array = filterUniqueSection(
      blackListInfo.length != 0 && blackListInfo.blackListData !== undefined
        ? blackListInfo.blackListData
        : blackListInfo
    );
    return array;
  };
  const backListSectionTab = (row, cell) => {
    return (
      <div className="is_blackList_section tbl_btn">
        <BootstrapSwitchButton
          checked={checkingforBlacklistSection(
            cell.key,
            blackListInfo.blackListSection
          )}
          onChange={evt => {
            if (
              blackListInfo.blackListSection &&
              !blackListInfo.blackListSection.includes(cell.key) &&
              evt
            ) {
              blackListInfo.blackListSection.push(cell.key);
            } else {
              if (blackListInfo.blackListSection) {
                blackListInfo.blackListSection = blackListInfo.blackListSection.filter(
                  val => val !== cell.key
                );
              } else {
                blackListInfo.blackListSection = [cell.key];
              }
            }
            addBlackListPriceSectionRequest({
              eventId: eventDBId,
              body: {
                blackListSection: blackListInfo.blackListSection
              }
            });
            setBlackListModal(true);
          }}
        />
      </div>
    );
  };

  return (
    <div className="inner_box_body padL3T5 acc_main min_inherit price_inner_acc">
      <div className="tbl_main">
        <div className="inner_tbl">
          <div className="animated">
            <Modal
              className="blacklist_Modal"
              size="lg"
              centered
              show={blackListModal}
              onHide={() => {
                setBlackListModal(false);
                if (isBlackListModal != undefined) isBlackListModal(false);
              }}
            >
              <Modal.Header
                className="eventLog"
                style={{ background: "black" }}
              >
                <Modal.Title
                  className="order_title"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                  }}
                >
                  <span>BlackList Information</span>
                  <span
                    onClick={() => {
                      setBlackListModal(false);
                      if (isBlackListModal != undefined)
                        isBlackListModal(false);
                    }}
                  >
                    <i className="fa fa-times"></i>
                  </span>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body id="tabContent">
                <Tabs
                  defaultActiveKey="pricePoint"
                  id="uncontrolled-tab-example"
                >
                  <Tab eventKey="pricePoint" title="Price Point">
                    <div className="tbl_main">
                      <div className="inner_tbl">
                        {isAddBlackListFetching ? (
                          <div className="loader_tbl">
                            <Spinner spinnerTime={spinnerTime} />
                          </div>
                        ) : (
                          ""
                        )}

                        {isBlackListingFetching ? (
                          <Spinner spinnerTime={spinnerTime} />
                        ) : (
                          <BootstrapTable
                            data={blackListInfo.blackListData}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            expandableRow={isExpandableRow}
                            expandComponent={expandComponent}
                          >
                            <TableHeaderColumn
                              dataField="price"
                              isKey
                              dataAlign="center"
                              dataFormat={priceFormatter}
                            >
                              Price
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              expandable={false}
                              dataAlign="center"
                              dataField="isBlackList"
                              editable={false}
                              dataFormat={backListFormatter}
                            >
                              BlackList
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
                              dataAlign="center"
                              dataField="secRowsBlackList"
                              editable={false}
                              hidden
                            >
                              blacklist_section
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
                              dataAlign="center"
                              dataField="key"
                              editable={false}
                              hidden
                            >
                              key
                            </TableHeaderColumn>
                          </BootstrapTable>
                        )}
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="section" title="Section">
                    <div className="tbl_main">
                      <div className="inner_tbl">
                        <BootstrapTable
                          data={formatSection(blackListInfo.blackListData)}
                          version="4"
                          striped
                          hover
                          pagination
                          options={options}
                          selectRow={selectRow}
                          deleteRow
                        >
                          <TableHeaderColumn
                            dataField="key"
                            isKey
                            editable={false}
                            dataSort
                          >
                            Section
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            expandable={false}
                            dataAlign="center"
                            dataField="isBlackList"
                            editable={false}
                            dataFormat={backListSectionTab}
                          >
                            BlackList
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Modal.Body>
            </Modal>
          </div>

          {blackListRowModal ? (
            <BlackListRowModal
              isBlackListingFetching={isBlackListingFetching}
              isBlackListRowModal={isBlackListRowModalOpen =>
                setBlackListRowModal(isBlackListRowModalOpen)
              }
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default BlackListSection;
