import React, { useEffect, useState } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {
  percentageFormatter,
  numberFormatter,
  numberFormatterwithoutStyle
} from "../../utils";
import Spinner from "../../components/Spinner";
import "react-datepicker/dist/react-datepicker.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const EventMonitoring = ({
  fetchUpdateHealthReportConfigRequest,
  isFetchingUpdateHealthReportConfig,
  fetchEventMonitoringHealthReportRequest,
  eventMonitoringHealthReport,
  isFetchingShortEventMonitoringHealthReport,
  isFetchingMediumEventMonitoringHealthReport,
  isFetchingLongEventMonitoringHealthReport,
  isFetchingNearEventMonitoringHealthReport
}) => {
  useEffect(() => {
    fetchEventMonitoringHealthReportRequest({ termName: "short" });
    fetchEventMonitoringHealthReportRequest({ termName: "near" });
    fetchEventMonitoringHealthReportRequest({ termName: "medium" });
    fetchEventMonitoringHealthReportRequest({ termName: "long" });
  }, []);

  const isExpandRow = () => {
    return true;
  };

  const options = {
    page: 1,
    sizePerPage: 5,
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
    expandBy: "column"
    // noDataText: noDataHandler()
  };

  const expandRow = row => {
    return (
      <div className="row expand_row_main">
        <div className="col-6 expand_row_inner">
          <label>Percentage Success</label>{" "}
          <span className="row_val">
            {" "}
            {`${percentageFormatter(row.pctSuccess)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Total Events</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatterwithoutStyle(row.totalEvents)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Total Success</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatterwithoutStyle(
              Math.round(row.totalSuccess)
            )}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Total Failed</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatterwithoutStyle(row.totalFailed)}`}{" "}
          </span>
        </div>
      </div>
    );
  };

  const trClassName = row => {
    if (row.healthStatus === 1) return "greenStatus";
    else return "redStatus";
  };

  const getData = () => {
    let data = [];
    // console.log('324567',eventMonitoringHealthReport,eventMonitoringHealthReport.short)
    data.push(eventMonitoringHealthReport.short);
    data.push(eventMonitoringHealthReport.near);
    data.push(eventMonitoringHealthReport.medium);
    data.push(eventMonitoringHealthReport.long);

    // if (Object.keys(eventMonitoringHealthReport.short).length > 0 ) {
    //   data.push(eventMonitoringHealthReport.short)
    //   console.log('short', eventMonitoringHealthReport.short)
    // }
    // if (Object.keys(eventMonitoringHealthReport.near).length > 0) {
    //   data.push(eventMonitoringHealthReport.near)
    //   console.log('near', eventMonitoringHealthReport.near)
    // }
    // if (eventMonitoringHealthReport.medium) {
    //   data.push(eventMonitoringHealthReport.medium)
    //   console.log('medium', eventMonitoringHealthReport.medium)
    // }
    // if (eventMonitoringHealthReport.long) {
    //   data.push(eventMonitoringHealthReport.long)
    //   console.log('long', eventMonitoringHealthReport.long)
    // }
    // console.log(data)
    return data;
  };

  const switchButtonFormatter = () => (cell, row) => {
    return (
      <div className="tbl_btn" id={row._id}>
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.showReport === true ? true : false}
            onChange={evt => {
              const payload = {
                reportType: "eventMonitoring",
                keysToUpdate: {
                  [row.reportType]: evt
                }
                // termName: row.termName
              };
              fetchUpdateHealthReportConfigRequest(payload);
              APICall(row.reportName);
            }}
          />
        </div>
      </div>
    );
  };

  const APICall = reportName => {
    if (!isFetchingUpdateHealthReportConfig) {
      if (reportName.toLowerCase().includes("short"))
        fetchEventMonitoringHealthReportRequest({ termName: "short" });
      if (reportName.toLowerCase().includes("near"))
        fetchEventMonitoringHealthReportRequest({ termName: "near" });
      if (reportName.toLowerCase().includes("medium"))
        fetchEventMonitoringHealthReportRequest({ termName: "medium" });
      if (reportName.toLowerCase().includes("long"))
        fetchEventMonitoringHealthReportRequest({ termName: "long" });
    }
  };

  return (
    <div className="tbl_main  order_tbl_main nw_od_cls">
      <div className="white_box mrgbtm50">
        <div className="cm_ttl dis_inline">
          <h2>Event Monitoring Report</h2>
        </div>

        <div className="row inner_box_body padL3T5 pb-0">
          <div className="col-12 mt-3 inner_tbl">
            {isFetchingShortEventMonitoringHealthReport &&
            isFetchingMediumEventMonitoringHealthReport &&
            isFetchingLongEventMonitoringHealthReport &&
            isFetchingNearEventMonitoringHealthReport ? (
              <Spinner spinnerTime={false} />
            ) : (
              <>
                <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                  <div className="inner_tbl">
                    <BootstrapTable
                      data={getData()}
                      version="4"
                      striped
                      hover
                      pagination
                      options={options}
                      trClassName={trClassName}
                      tableHeaderClass="custom-select-header-class"
                      tableBodyClass="custom-select-body-class"
                      expandableRow={isExpandRow}
                      expandComponent={expandRow}
                      expandColumnOptions={{
                        expandColumnVisible: true
                      }}
                    >
                      <TableHeaderColumn dataField="reportName" isKey>
                        Report Name
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="healthStatus"
                        dataSort
                        sort={"asc"}
                      >
                        Health Status
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="showReport"
                        editable={false}
                        dataFormat={switchButtonFormatter()}
                      >
                        View to Dashboard
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMonitoring;
