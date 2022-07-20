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

const SkyboxPostedEvents = ({
  fetchSBEventsHealthReportRequest,
  skyboxEventsHealthReport,
  isFetchingSkyboxEventsHealthReport,
  fetchSBPostedPresaleEventsHealthReportRequest,
  skyboxPostedPresaleEventsHealthReport,
  isFetchingSkyboxPostedPresaleEventsHealthReport,
  skyboxPostedEventsHealthReport,
  isFetchingSkyboxPostedEventsHealthReport,
  fetchSBPostedEventsHealthReportRequest,
  fetchCancelledSBEventsHealthReportRequest,
  cancelledSkyboxEventsHealthReport,
  isFetchingCancelledSkyboxEventsHealthReport,
  fetchUpdateHealthReportConfigRequest,
  updateHealthReportConfig,
  isFetchingUpdateHealthReportConfig,
  fetchPresaleEventsHealthReportRequest,
  presaleEventsHealthReport,
  isFetchingPresaleEventsHealthReport
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
  const [filterType, setFilterType] = useState("all");
  const [stdDevBy, setStdDevBy] = useState(1);

  useEffect(() => {
    apiCall();
  }, []);

  const requestObj = () => {
    return {
      avgStartDate: moment(startDate).format("YYYY-MM-DD"),
      avgEndDate: moment(endDate).format("YYYY-MM-DD"),
      standardDeviationBy: stdDevBy
    };
  };

  const apiCall = () => {
    fetchSBEventsHealthReportRequest(requestObj());
    callSkyboxPostedEventsHealthReportAPI();
    fetchCancelledSBEventsHealthReportRequest(requestObj());
    fetchPresaleEventsHealthReportRequest(requestObj());
  };

  const callSkyboxPostedEventsHealthReportAPI = () => {
    fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("short"));
    fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("medium"));
    fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("near"));
    fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("long"));
  };

  const skyboxPostedEventsReqObj = monitorType => {
    return {
      reportDate: moment(reportStartDate).format("YYYY-MM-DD"),
      avgStartDate: moment(startDate).format("YYYY-MM-DD"),
      avgEndDate: moment(endDate).format("YYYY-MM-DD"),
      standardDeviationBy: stdDevBy,
      monitorType
    };
  };

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
            {`${numberFormatterwithoutStyle(row.totalCount)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Average Count</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatterwithoutStyle(Math.round(row.avgCount))}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Standard Deviation</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatterwithoutStyle(row.standardDeviation)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Percentile</label>{" "}
          <span className="row_val">
            {" "}
            {`${percentageFormatter(row.percentile)}`}{" "}
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
    if (skyboxEventsHealthReport.eventReport) {
      data.push(skyboxEventsHealthReport.eventReport);
    }
    if (skyboxEventsHealthReport.listingReport) {
      data.push(skyboxEventsHealthReport.listingReport);
    }
    if (skyboxPostedEventsHealthReport.shortMonitor.eventReport) {
      data.push(skyboxPostedEventsHealthReport.shortMonitor.eventReport);
    }
    if (skyboxPostedEventsHealthReport.shortMonitor.listingReport) {
      data.push(skyboxPostedEventsHealthReport.shortMonitor.listingReport);
    }
    if (skyboxPostedEventsHealthReport.mediumMonitor.eventReport) {
      data.push(skyboxPostedEventsHealthReport.mediumMonitor.eventReport);
    }
    if (skyboxPostedEventsHealthReport.mediumMonitor.listingReport) {
      data.push(skyboxPostedEventsHealthReport.mediumMonitor.listingReport);
    }
    if (skyboxPostedEventsHealthReport.nearMonitor.eventReport) {
      data.push(skyboxPostedEventsHealthReport.nearMonitor.eventReport);
    }
    if (skyboxPostedEventsHealthReport.nearMonitor.listingReport) {
      data.push(skyboxPostedEventsHealthReport.nearMonitor.listingReport);
    }
    if (skyboxPostedEventsHealthReport.longMonitor.eventReport) {
      data.push(skyboxPostedEventsHealthReport.longMonitor.eventReport);
    }
    if (skyboxPostedEventsHealthReport.longMonitor.listingReport) {
      data.push(skyboxPostedEventsHealthReport.longMonitor.listingReport);
    }
    if (cancelledSkyboxEventsHealthReport.eventReport) {
      data.push(cancelledSkyboxEventsHealthReport.eventReport);
    }
    if (cancelledSkyboxEventsHealthReport.listingReport) {
      data.push(cancelledSkyboxEventsHealthReport.listingReport);
    }
    if (presaleEventsHealthReport.skyboxPostedPresaleEvents) {
      data.push(presaleEventsHealthReport.skyboxPostedPresaleEvents);
    }
    if (presaleEventsHealthReport.skyboxPostedPresaleListings) {
      data.push(presaleEventsHealthReport.skyboxPostedPresaleListings);
    }
    // console.log("data", data)
    return data;
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
    // setFilterType("all")
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
                reportType: "skybox",
                keysToUpdate: {
                  [row.reportType]: evt
                }
              };
              fetchUpdateHealthReportConfigRequest(payload);
              APICall(row.reportType);
            }}
          />
        </div>
      </div>
    );
  };

  const APICall = reportType => {
    if (
      !isFetchingSkyboxEventsHealthReport &&
      (reportType === "skybox_event" || reportType === "skybox_listing")
    )
      fetchSBEventsHealthReportRequest(requestObj());
    else if (
      !isFetchingSkyboxPostedEventsHealthReport &&
      (reportType === "short_skybox_event" ||
        reportType === "short_skybox_listing")
    )
      fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("short"));
    else if (
      !isFetchingSkyboxPostedEventsHealthReport &&
      (reportType === "medium_skybox_event" ||
        reportType === "medium_skybox_listing")
    )
      fetchSBPostedEventsHealthReportRequest(
        skyboxPostedEventsReqObj("medium")
      );
    else if (
      !isFetchingSkyboxPostedEventsHealthReport &&
      (reportType === "near_skybox_event" ||
        reportType === "near_skybox_listing")
    )
      fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("near"));
    else if (
      !isFetchingSkyboxPostedEventsHealthReport &&
      (reportType === "long_skybox_event" ||
        reportType === "long_skybox_listing")
    )
      fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("long"));
    else if (
      !isFetchingCancelledSkyboxEventsHealthReport &&
      (reportType === "cancelled_skybox_event" ||
        reportType === "cancelled_skybox_listing")
    )
      fetchCancelledSBEventsHealthReportRequest(requestObj());
    else if (
      !isFetchingUpdateHealthReportConfig &&
      (reportType === "presale_event" || reportType === "presale_listing")
    )
      fetchPresaleEventsHealthReportRequest(requestObj());
  };

  const isShowSpinner = () => {
    let showSpinner =
      isFetchingSkyboxEventsHealthReport ||
      isFetchingSkyboxPostedEventsHealthReport ||
      isFetchingCancelledSkyboxEventsHealthReport ||
      isFetchingPresaleEventsHealthReport
        ? // && isFetchingSkyboxPostedPresaleEventsHealthReport
          true
        : false;
    return showSpinner;
  };

  return (
    <div className="tbl_main  order_tbl_main nw_od_cls">
      <div className="white_box mrgbtm50">
        <div className="cm_ttl dis_inline">
          <h2>Skybox Events Report</h2>
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
                            // timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy"
                            // showTimeInput
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

                      {/* <div className="fl_eq_box date_picker_filter">
                        <label className="searchHead">Events Type</label>
                        <Form.Control
                          as="select"
                          value={filterType}
                          onChange={evt => setFilterType(evt.target.value)}
                        >
                          <option value="all">Show All</option>
                          <option value="presale">Show Presale</option>
                        </Form.Control>
                      </div> */}

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
                            onClick={() => apiCall()}
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
            {isShowSpinner() ? (
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

export default SkyboxPostedEvents;
