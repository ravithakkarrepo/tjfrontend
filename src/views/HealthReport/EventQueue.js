import React, { useEffect, useState } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {
  percentageFormatter,
  numberFormatter,
  numberFormatterwithoutStyle
} from "../../utils";
import Spinner from "../../components/Spinner";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment-timezone";
import { Form, Button, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const EventQueue = ({
  fetchEventQueueHealthReportRequest,
  eventQueueHealthReport,
  isFetchingEventQueueHealthReport,
  fetchUpdateHealthReportConfigRequest
}) => {
  let now = new Date();
  const [reportStartDate, setReportStartDate] = useState(now);
  const [dateRange, setDateRange] = useState([
    new Date(
      moment(now)
        .subtract(30, "days")
        .format("YYYY-MM-DD")
    ),
    new Date(
      moment(now)
        .subtract(1, "days")
        .format("YYYY-MM-DD")
    )
  ]);
  const [startDate, endDate] = dateRange;
  const [stdDevBy, setStdDevBy] = useState(1);

  const requestObj = () => {
    return {
      reportDateTime: moment(reportStartDate).format("YYYY-MM-DD HH:mm"),
      avgStartDate: moment(startDate).format("YYYY-MM-DD"),
      avgEndDate: moment(endDate).format("YYYY-MM-DD"),
      standardDeviationBy: stdDevBy
    };
  };

  useEffect(() => {
    fetchEventQueueHealthReportRequest(requestObj());
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
          <label>Total Count</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatterwithoutStyle(row.eventCount)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Average Count</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatterwithoutStyle(
              Math.round(row.avgEventCount)
            )}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Standard Deviation</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatterwithoutStyle(
              row.standardDeviationEventCount
            )}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Percentile</label>{" "}
          <span className="row_val">
            {" "}
            {`${percentageFormatter(row.percetileEventCount)}`}{" "}
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
    if (eventQueueHealthReport.queueEvents) {
      data.push(eventQueueHealthReport.queueEvents);
    }
    if (eventQueueHealthReport.monitoredEvents) {
      data.push(eventQueueHealthReport.monitoredEvents);
    }
    if (eventQueueHealthReport.monitoredPresaleEvents) {
      data.push(eventQueueHealthReport.monitoredPresaleEvents);
    }
    if (eventQueueHealthReport.monitoredPromoAddedPresaleEvents) {
      data.push(eventQueueHealthReport.monitoredPromoAddedPresaleEvents);
    }
    return data;
  };

  const onFilterSearch = () => {
    fetchEventQueueHealthReportRequest(requestObj());
  };

  const resetFilters = () => {
    setReportStartDate(now);
    setDateRange([
      new Date(
        moment(now)
          .subtract(30, "days")
          .format("YYYY-MM-DD")
      ),
      new Date(
        moment(now)
          .subtract(1, "days")
          .format("YYYY-MM-DD")
      )
    ]);
    setStdDevBy(1);
  };

  const CustomInput = ({ value, onClick }) => {
    return (
      <div>
        <input
          className="my-input"
          type="text"
          onClick={onClick}
          value={`${
            startDate ? moment(startDate).format("MM/DD/YYYY") : ""
          } - ${endDate ? moment(endDate).format("MM/DD/YYYY") : ""}`}
        />
      </div>
    );
  };

  const switchButtonFormatter = () => (cell, row) => {
    return (
      <div className="tbl_btn" id={row._id}>
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={row.showReport === true ? true : false}
            onChange={evt => {
              const payload = {
                reportType: "eventQueue",
                keysToUpdate: {
                  [row.reportType]: evt
                }
              };
              fetchUpdateHealthReportConfigRequest(payload);
              fetchEventQueueHealthReportRequest(requestObj());
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="tbl_main  order_tbl_main nw_od_cls">
      <div className="white_box mrgbtm50">
        <div className="cm_ttl dis_inline">
          <h2>Event Queue/Monitoring Report</h2>
        </div>

        <div className="inner_box_body padL3T5 filter_padding">
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
                      <div className="fl_eq_box date_picker_filter">
                        <label className="searchHead">Report Date Time</label>
                        <div className="date_picker date_picker_input ">
                          <DatePicker
                            maxDate={new Date()}
                            selected={reportStartDate}
                            onChange={date => setReportStartDate(date)}
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy hh:mm aa"
                            showTimeInput
                          ></DatePicker>
                        </div>
                      </div>

                      <div className="fl_eq_box date_picker_filter">
                        <label className="searchHead">Average Date Range</label>
                        <div className="date_picker date_picker_input">
                          <DatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={update => {
                              setDateRange(update);
                            }}
                            isClearable={true}
                            maxDate={reportStartDate}
                            customInput={<CustomInput />}
                          />
                        </div>
                      </div>

                      <div className="fl_eq_box date_picker_filter">
                        <label className="searchHead">
                          Standard Deviation By
                        </label>
                        <Form.Control
                          type="Number"
                          defaultValue={1}
                          placeholder="Standard Deviation By"
                          onChange={evt => setStdDevBy(evt.target.value)}
                          style={{ maxWidth: "320px" }}
                        />
                      </div>

                      <div className="fl_eq_box src_btn">
                        <label className="searchHead">&nbsp;</label>
                        <div className="fl_w">
                          <Button
                            color="primary"
                            className="btn-pill"
                            onClick={() => onFilterSearch()}
                          >
                            Search
                          </Button>
                          <button
                            color="primary"
                            type="button"
                            className="btn-pill btn btn-primary clr_fil red_txt"
                            onClick={() => resetFilters()}
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
        </div>

        <div className="row inner_box_body padL3T5 pb-0">
          <div className="col-12 mt-3 inner_tbl">
            {isFetchingEventQueueHealthReport ? (
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

export default EventQueue;
