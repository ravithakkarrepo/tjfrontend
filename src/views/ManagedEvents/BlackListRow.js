import React, { useState } from "react";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Modal } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const BlackListRowModal = ({ isBlackListingFetching, isBlackListRowModal }) => {
  var data = [
    { id: 1, row: "L", is_blacklist: true },
    { id: 2, row: "M" }
  ];
  const [BlackListRowModal, setBlackListRowModal] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [spinnerTime, setSpinnerTime] = useState(false);

  const selectRow = {
    mode: "checkbox"
    // showOnlySelected: true
    // customComponent: CustomMultiSelectTable
  };

  const cellEdit = {
    mode: "click"
  };

  const backListFormatter = (cell, row) => {
    return (
      <div className="is_blackList">
        <BootstrapSwitchButton
          checked={row.is_blackList === true ? true : false}
          //   onChange={evt => {
          //     const payload = {
          //       eventId: eventId,
          //       is_blackList: evt,
          //       row: row
          //     }
          //customConfirm(payload)
          // setBlackListModal(false)
          //}}
        />
      </div>
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
    // noDataText: noDataHandler()
    onRowClick: function(row, columnIndex, rowIndex, e) {
      if (e.target.offsetParent.className === "switch-group") {
        if (row.is_blackList === true) return (row.is_blackList = false);
        else return (row.is_blackList = true);
      }
    }
  };

  return (
    <div className="animated">
      <Modal
        // size="sm"
        centered
        show={BlackListRowModal}
        onHide={() => {
          setBlackListRowModal(false);
        }}
      >
        <Modal.Header
          // closeButton
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
            <span> BlackList Row </span>
            <span
              onClick={() => {
                setBlackListRowModal(false);
                isBlackListRowModal(false);
              }}
            >
              <i className="fa fa-times"></i>
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tbl_main">
            <div className="inner_tbl">
              {isBlackListingFetching ? (
                <Spinner spinnerTime={spinnerTime} />
              ) : (
                <BootstrapTable
                  data={data}
                  version="4"
                  striped
                  hover
                  pagination
                  options={options}
                  selectRow={selectRow}
                  cellEdit={cellEdit}
                  // deleteRow
                >
                  <TableHeaderColumn dataField="id" isKey hidden>
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="row" editable={false} dataSort>
                    Row
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    expandable={false}
                    //dataField="is_deleted"
                    dataField="is_blackList"
                    editable={false}
                    dataFormat={backListFormatter}
                  >
                    BlackList
                  </TableHeaderColumn>
                </BootstrapTable>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlackListRowModal;
