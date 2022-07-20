import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Spinner from "../../components/Spinner";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import CustomMultiSelectTable from "../CustomMultiSelectTable/CustomMultiSelectTable";
import { confirmAlert } from "react-confirm-alert"; // Import
import { Form } from "react-bootstrap";

class OnCountdownEventQueue extends React.Component {
  customMultiSelect() {}
  blacklistReason = "";
  rowdata = [];
  onRowSelect = (row, isSelected, e) => {
    if (isSelected) {
      this.rowdata.push(row._id);
    } else {
      this.rowdata = [];
    }
  };

  onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      rows.map(item => this.rowdata.push(item._id));
    } else {
      this.rowdata = [];
    }
  };

  selectRow = {
    mode: "checkbox",
    // showOnlySelected: true,
    clickToExpand: true,
    customComponent: CustomMultiSelectTable,
    onSelect: this.onRowSelect,
    onSelectAll: this.onSelectAll
  };

  customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          <span>
            {dropRowKeys === undefined
              ? next.row.is_blackList === true
                ? "Are you sure you want to unblackList this events"
                : "Are you sure you want to blackList this events?"
              : "Are you sure you want to delete these  events?"}
          </span>
          <span className="blacklistHeader">Blacklist Reason</span>
          <Form.Check
            type="radio"
            className="check_row_cls"
            id={1}
            name="radVenue"
            value={`Will Call`}
            onChange={evt => {
              this.blacklistReason = evt.target.value;
              this.blacklistReasonSelected = evt.target.value;
            }}
            label={`Will Call`}
          />
          <Form.Check
            type="radio"
            className="check_row_cls"
            id={2}
            name="radVenue"
            value={`Event Mismatch`}
            onChange={evt => {
              this.blacklistReason = evt.target.value;
              this.blacklistReasonSelected = evt.target.value;
            }}
            label={`Event Mismatch`}
          />

          <Form.Check
            type="radio"
            className="check_row_cls"
            id={3}
            name="radVenue"
            value={`No Seats Available`}
            onChange={evt => {
              this.blacklistReason = evt.target.value;
              this.blacklistReasonSelected = evt.target.value;
            }}
            label={`No Seats Available`}
          />
          <Form.Check
            type="radio"
            className="check_row_cls"
            id={4}
            name="radVenue"
            value={`Verified Resale`}
            onChange={evt => {
              this.blacklistReason = evt.target.value;
              this.blacklistReasonSelected = evt.target.value;
            }}
            label={`Verified Resale`}
          />

          <Form.Group>
            <Form.Check
              type="radio"
              className="check_row_cls"
              id={5}
              name="radVenue"
              value={`Other`}
              onChange={evt => {
                this.blacklistReasonSelected = evt.target.value;
              }}
              label={`Other`}
            />
            <Form.Control
              style={{ color: "#666", backgroundColor: "white" }}
              type="text"
              id={6}
              name="radVenue"
              onChange={evt => {
                this.blacklistReason =
                  this.blacklistReasonSelected === "Other"
                    ? evt.target.value
                    : this.blacklistReason;
              }}
            />
          </Form.Group>
        </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            return false;
          }
        },
        {
          label: "Confirm",
          onClick: () => {
            if (dropRowKeys !== undefined) {
              this.props.updateIsBlackListRequest({
                eventId: dropRowKeys,
                is_blackList: true,
                blacklistReason: this.blacklistReason
              });
              next();
            } else {
              this.props.updateIsBlackListRequest({
                eventId: [next.row._id],
                is_blackList: next.is_blackList,
                blacklistReason: this.blacklistReason
              });
            }
          }
        }
      ]
    });
  };

  backListFormatter = (cell, row) => {
    return (
      <div className="tbl_btn" id={row.eventId}>
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.is_blackList === true ? true : false}
            onChange={evt => {
              const payload = {
                eventId: row.eventId,
                is_blackList: evt,
                row: row
              };

              if (evt === false) {
                this.props.updateIsBlackListRequest({
                  eventId: row._id,
                  is_blackList: false,
                  blacklistReason: this.blacklistReason
                });
              } else {
                this.customConfirm(payload);
              }
            }}
          />
        </div>
      </div>
    );
  };
  render() {
    const {
      isEventQueueFetching,
      eventMonitor,
      options,
      cellEditProp,
      isExpandRow,
      expandRow,
      urlFormatter,
      detailsFormatter,
      dateSortFuncForEvent,
      dateFormatter,
      buttonFormatter
    } = this.props;
    return (
      <div className="inner_box_body padL3T5">
        <div className="tbl_main  order_tbl_main">
          <div className="inner_tbl">
            <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
              <div className="inner_tbl">
                {isEventQueueFetching ? (
                  <Spinner spinnerTime={false} />
                ) : (
                  <BootstrapTable
                    data={eventMonitor.onCountPresale}
                    version="4"
                    striped
                    hover
                    pagination
                    options={options}
                    cellEdit={cellEditProp}
                    selectRow={this.selectRow}
                    deleteRow
                    insertBtn
                    tableHeaderClass="custom-select-header-class"
                    tableBodyClass="custom-select-body-class"
                    expandableRow={isExpandRow}
                    expandComponent={expandRow}
                    expandColumnOptions={{
                      expandColumnVisible: true
                    }}
                    search
                    blurToSave={true}
                  >
                    <TableHeaderColumn
                      dataField="eventId"
                      isKey
                      expandable={false}
                      dataFormat={urlFormatter}
                      editable={false}
                    >
                      EventId/TM URL
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataFormat={detailsFormatter}
                      dataField="eventDetails"
                      sort={"asc"}
                      dataSort
                      sortFunc={dateSortFuncForEvent}
                    >
                      Event Details
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataField="created_date"
                      dataSort
                      expandable={false}
                      editable={false}
                      sort={"asc"}
                      dataFormat={dateFormatter}
                      //width="8%"
                    >
                      Created Date
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      expandable={false}
                      //dataField="is_deleted"
                      dataField="is_blackList"
                      editable={false}
                      // width="5%"
                      dataFormat={this.backListFormatter}
                    >
                      BlackList
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="eventId" hidden>
                      eventId
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="eventName" hidden>
                      EventName
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="eventAddress" hidden>
                      Venue
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      expandable={false}
                      dataField="button"
                      dataFormat={buttonFormatter}
                      formatExtraData="isFromCountTable"
                      dataAlign="center"
                      editable={false}
                      width="20%"
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
    );
  }
}

export default OnCountdownEventQueue;
