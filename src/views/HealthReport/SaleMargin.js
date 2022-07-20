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

const SaleMargin = ({
  // fetchSaleMarginHealthReportRequest,
  // saleMarginHealthReport,
  // isSaleMarginFetching,
  fetchMarketwiseSaleMarginHealthReportRequest,
  marketwiseSaleMarginHealthReport,
  isMarketwiseSaleMarginFetching,
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
  const [filterType, setFilterType] = useState("all");
  const [stdDevBy, setStdDevBy] = useState(1);

  const [reportStartDateMargin, setReportStartDateMargin] = useState(now);
  const [dateRangeMargin, setDateRangeMargin] = useState([
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
  const [startDateMargin, endDateMargin] = dateRangeMargin;
  const [filterTypeMargin, setFilterTypeMargin] = useState("all");
  const [stdDevByMargin, setStdDevByMargin] = useState(1);

  const [reportStartDateProfit, setReportStartDateProfit] = useState(now);
  const [dateRangeProfit, setDateRangeProfit] = useState([
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
  const [startDateProfit, endDateProfit] = dateRangeProfit;
  const [filterTypeProfit, setFilterTypeProfit] = useState("all");
  const [stdDevByProfit, setStdDevByProfit] = useState(1);

  // const [isSaleSearch, setIsSaleSearch] = useState()
  const [searchType, setSearchType] = useState("");

  useEffect(() => {
    fetchMarketwiseSaleMarginHealthReportRequest(requestObj());
  }, []);

  let requestObj = () => {
    return {
      reportDateTime: moment(reportStartDate).format("YYYY-MM-DD HH:mm"),
      avgStartDate: moment(reportStartDate)
        .subtract(30, "days")
        .format("YYYY-MM-DD"),
      avgEndDate: moment(reportStartDate)
        .subtract(1, "days")
        .format("YYYY-MM-DD"),
      // saleType: filterType,
      standardDeviationBy: stdDevBy
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
    firstPage: "searchType", // First page button text
    lastPage: "Last", // Last page button text
    paginationShowsTotal: true, // Accept bool or function
    hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true, //> Hide the going to First and Last page button
    expandBy: "column"
    // noDataText: noDataHandler()
  };

  const expandRowSale = row => {
    return (
      <div className="row expand_row_main">
        <div className="col-6 expand_row_inner">
          <label>Today Sale</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatter(row.todaySale)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Today Sold Tickets</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatterwithoutStyle(row.todaySoldTickets)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Today Sale Count</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatterwithoutStyle(row.todaySaleCount)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Average Sale</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatter(row.averageSale)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Sale Percentile</label>{" "}
          <span className="row_val">
            {" "}
            {`${percentageFormatter(row.percentileSale)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Standard Deviation Sale</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatter(row.standardDeviationSale)}`}{" "}
          </span>
        </div>
      </div>
    );
  };

  const expandRowMargin = row => {
    return (
      <div className="row expand_row_main">
        <div className="col-6 expand_row_inner">
          <label>Today Margin</label>{" "}
          <span className="row_val">
            {" "}
            {`${percentageFormatter(row.todayMargin)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Average Margin</label>{" "}
          <span className="row_val">
            {" "}
            {`${percentageFormatter(row.averageMargin)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Margin Percentile</label>{" "}
          <span className="row_val">
            {" "}
            {`${percentageFormatter(row.percentileMargin)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Standard Deviation Margin</label>{" "}
          <span className="row_val">
            {" "}
            {`${percentageFormatter(row.standardDeviationMargin)}`}{" "}
          </span>
        </div>
      </div>
    );
  };

  const expandRowProfit = row => {
    return (
      <div className="row expand_row_main">
        <div className="col-6 expand_row_inner">
          <label>Today Profit</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatter(row.todayProfit)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Average Profit</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatter(row.averageProfit)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Profit Percentile</label>{" "}
          <span className="row_val">
            {" "}
            {`${percentageFormatter(row.percentileProfit)}`}{" "}
          </span>
        </div>
        <div className="col-6 expand_row_inner">
          <label>Standard Deviation Profit</label>{" "}
          <span className="row_val">
            {" "}
            {`${numberFormatter(row.standardDeviationProfit)}`}{" "}
          </span>
        </div>
      </div>
    );
  };

  const CustomInput = ({ onClick }) => {
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

  const CustomInputMargin = ({ onClick }) => {
    return (
      <div>
        <input
          className="my-input"
          type="text"
          onClick={onClick}
          value={`${
            startDateMargin ? moment(startDateMargin).format("MM/DD/YYYY") : ""
          } - ${
            endDateMargin ? moment(endDateMargin).format("MM/DD/YYYY") : ""
          }`}
        />
      </div>
    );
  };

  const CustomInputProfit = ({ onClick }) => {
    return (
      <div>
        <input
          className="my-input"
          type="text"
          onClick={onClick}
          value={`${
            startDateProfit ? moment(startDateProfit).format("MM/DD/YYYY") : ""
          } - ${
            endDateProfit ? moment(endDateProfit).format("MM/DD/YYYY") : ""
          }`}
        />
      </div>
    );
  };

  const getFormattedDataSale = () => {
    let allData = [],
      marketWiseData = [];
    if (marketwiseSaleMarginHealthReport.sale) {
      marketWiseData =
        filterType === "all"
          ? marketwiseSaleMarginHealthReport.sale.todaySale
          : filterType === "presale"
          ? marketwiseSaleMarginHealthReport.sale.todayPreSale
          : marketwiseSaleMarginHealthReport.sale.todayDayofSale;
    } else {
      marketWiseData =
        filterType === "all"
          ? marketwiseSaleMarginHealthReport.todaySale
          : filterType === "presale"
          ? marketwiseSaleMarginHealthReport.todayPreSale
          : marketwiseSaleMarginHealthReport.todayDayofSale;
    }

    if (marketWiseData) {
      allData = [...marketWiseData];
    }
    return allData;
  };

  const getFormattedDataMargin = () => {
    let allData = [],
      marketWiseData = [];
    if (marketwiseSaleMarginHealthReport.margin) {
      marketWiseData =
        filterTypeMargin === "all"
          ? marketwiseSaleMarginHealthReport.margin.todaySale
          : filterTypeMargin === "presale"
          ? marketwiseSaleMarginHealthReport.margin.todayPreSale
          : marketwiseSaleMarginHealthReport.margin.todayDayofSale;
    } else {
      marketWiseData =
        filterTypeMargin === "all"
          ? marketwiseSaleMarginHealthReport.todaySale
          : filterTypeMargin === "presale"
          ? marketwiseSaleMarginHealthReport.todayPreSale
          : marketwiseSaleMarginHealthReport.todayDayofSale;
    }

    if (marketWiseData) {
      allData = [...marketWiseData];
    }
    return allData;
  };

  const getFormattedDataProfit = () => {
    let allData = [],
      marketWiseData = [];
    if (marketwiseSaleMarginHealthReport.profit) {
      marketWiseData =
        filterTypeProfit === "all"
          ? marketwiseSaleMarginHealthReport.profit.todaySale
          : filterTypeProfit === "presale"
          ? marketwiseSaleMarginHealthReport.profit.todayPreSale
          : marketwiseSaleMarginHealthReport.profit.todayDayofSale;
    } else {
      marketWiseData =
        filterTypeProfit === "all"
          ? marketwiseSaleMarginHealthReport.todaySale
          : filterTypeProfit === "presale"
          ? marketwiseSaleMarginHealthReport.todayPreSale
          : marketwiseSaleMarginHealthReport.todayDayofSale;
    }
    if (marketWiseData) {
      allData = [...marketWiseData];
    }
    return allData;
  };

  const trClassNameSale = row => {
    if (row.healthStatusSale === 1) return "greenStatus";
    else return "redStatus";
  };

  const trClassNameMargin = row => {
    if (row.healthStatusMargin === 1) return "greenStatus";
    else return "redStatus";
  };

  const trClassNameProfit = row => {
    if (row.healthStatusProfit === 1) return "greenStatus";
    else return "redStatus";
  };

  const onFilterSearch = filterFrom => {
    setSearchType(filterFrom);
    let queryParams;
    if (filterFrom === "sale") {
      queryParams = {
        reportDateTime: moment(reportStartDate).format("YYYY-MM-DD HH:mm"),
        avgStartDate: moment(startDate).format("YYYY-MM-DD"),
        avgEndDate: moment(endDate).format("YYYY-MM-DD"),
        standardDeviationBy: stdDevBy,
        searchType: filterFrom
      };
    } else if (filterFrom === "margin") {
      queryParams = {
        reportDateTime: moment(reportStartDateMargin).format(
          "YYYY-MM-DD HH:mm"
        ),
        avgStartDate: moment(startDateMargin).format("YYYY-MM-DD"),
        avgEndDate: moment(endDateMargin).format("YYYY-MM-DD"),
        standardDeviationBy: stdDevByMargin,
        searchType: filterFrom
      };
    } else {
      queryParams = {
        reportDateTime: moment(reportStartDateProfit).format(
          "YYYY-MM-DD HH:mm"
        ),
        avgStartDate: moment(startDateProfit).format("YYYY-MM-DD"),
        avgEndDate: moment(endDateProfit).format("YYYY-MM-DD"),
        standardDeviationBy: stdDevByProfit,
        searchType: filterFrom
      };
    }
    fetchMarketwiseSaleMarginHealthReportRequest(queryParams);
  };

  const resetFilters = filterFrom => {
    if (filterFrom === "sale") {
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
      setFilterType("all");
      setStdDevBy(1);
    } else if (filterFrom === "margin") {
      setReportStartDateMargin(now);
      setDateRangeMargin([
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
      setFilterTypeMargin("all");
      setStdDevByMargin(1);
    } else {
      setReportStartDateProfit(now);
      setDateRangeProfit([
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
      setFilterTypeProfit("all");
      setStdDevByProfit(1);
    }
  };

  const isShowSpinner = () => {
    let showSpinner =
      searchType === "" && isMarketwiseSaleMarginFetching
        ? true
        : searchType === "sale" && isMarketwiseSaleMarginFetching
        ? true
        : false;
    return showSpinner;
  };

  const isShowSpinnerMargin = () => {
    let showSpinner =
      searchType === "" && isMarketwiseSaleMarginFetching
        ? true
        : searchType === "margin" && isMarketwiseSaleMarginFetching
        ? true
        : false;
    return showSpinner;
  };

  const isShowSpinnerProfit = () => {
    let showSpinner =
      searchType === "" && isMarketwiseSaleMarginFetching
        ? true
        : searchType === "profit" && isMarketwiseSaleMarginFetching
        ? true
        : false;
    return showSpinner;
  };

  const switchButtonFormatter = reportType => (cell, row) => {
    let checked;
    if (reportType === "sale") checked = row.showSale === true ? true : false;
    else if (reportType === "margin")
      checked = row.showMargin === true ? true : false;
    else if (reportType === "profit")
      checked = row.showProfit === true ? true : false;

    return (
      <div className="tbl_btn" id={row._id}>
        <div className="is_blackList">
          <BootstrapSwitchButton
            checked={checked}
            onChange={evt => {
              let key = row.marketName + "_" + row.saleType;
              const payload = {
                reportType,
                keysToUpdate: {
                  [key]: evt
                }
              };
              fetchUpdateHealthReportConfigRequest(payload);
              onFilterSearch(reportType);
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="tbl_main  order_tbl_main nw_od_cls">
        <div className="white_box mrgbtm50">
          <div className="cm_ttl dis_inline">
            <h2>Sale Report</h2>
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
                          <label className="searchHead">
                            Average Date Range
                          </label>
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
                          <label className="searchHead">Sale Type</label>
                          <Form.Control
                            as="select"
                            value={filterType}
                            onChange={evt => setFilterType(evt.target.value)}
                          >
                            <option value="all">Show All</option>
                            <option value="presale">Show Presale Sales</option>
                            <option value="dayofsale">Show Day Of Sales</option>
                          </Form.Control>
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
                              onClick={() => onFilterSearch("sale")}
                            >
                              Search
                            </Button>
                            <button
                              color="primary"
                              type="button"
                              className="btn-pill btn btn-primary clr_fil red_txt"
                              onClick={() => resetFilters("sale")}
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

          <div className="row inner_box_body padL3T5 table_padding">
            <div className="col-12 mt-3 inner_tbl">
              {isShowSpinner() ? (
                <Spinner spinnerTime={false} />
              ) : (
                <>
                  <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                    <div className="inner_tbl">
                      <BootstrapTable
                        data={getFormattedDataSale()}
                        version="4"
                        striped
                        hover
                        pagination
                        options={options}
                        trClassName={trClassNameSale}
                        tableHeaderClass="custom-select-header-class"
                        tableBodyClass="custom-select-body-class"
                        expandableRow={isExpandRow}
                        expandComponent={expandRowSale}
                        expandColumnOptions={{
                          expandColumnVisible: true
                        }}
                      >
                        <TableHeaderColumn dataField="_id" hidden isKey>
                          _id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="marketName"
                          dataSort
                          sort={"asc"}
                        >
                          Market Type
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="healthStatusSale"
                          dataSort
                          sort={"asc"}
                        >
                          Sale Status
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="showSale"
                          editable={false}
                          dataFormat={switchButtonFormatter("sale")}
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

      <div className="tbl_main  order_tbl_main nw_od_cls">
        <div className="white_box mrgbtm50">
          <div className="cm_ttl dis_inline">
            <h2>Margin Report</h2>
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
                              selected={reportStartDateMargin}
                              onChange={date => setReportStartDateMargin(date)}
                              timeInputLabel="Time:"
                              dateFormat="MM/dd/yyyy hh:mm aa"
                              showTimeInput
                            ></DatePicker>
                          </div>
                        </div>

                        <div className="fl_eq_box date_picker_filter">
                          <label className="searchHead">
                            Average Date Range
                          </label>
                          <div className="date_picker date_picker_input">
                            <DatePicker
                              selectsRange={true}
                              startDate={startDateMargin}
                              endDate={endDateMargin}
                              onChange={update => {
                                setDateRangeMargin(update);
                              }}
                              isClearable={true}
                              maxDate={reportStartDateMargin}
                              customInput={<CustomInputMargin />}
                            />
                          </div>
                        </div>

                        <div className="fl_eq_box date_picker_filter">
                          <label className="searchHead">Sale Type</label>
                          <Form.Control
                            as="select"
                            value={filterTypeMargin}
                            onChange={evt =>
                              setFilterTypeMargin(evt.target.value)
                            }
                          >
                            <option value="all">Show All</option>
                            <option value="presale">Show Presale Sales</option>
                            <option value="dayofsale">Show Day Of Sales</option>
                          </Form.Control>
                        </div>

                        <div className="fl_eq_box date_picker_filter">
                          <label className="searchHead">
                            Standard Deviation By
                          </label>
                          <Form.Control
                            type="Number"
                            defaultValue={1}
                            placeholder="Standard Deviation By"
                            onChange={evt =>
                              setStdDevByMargin(evt.target.value)
                            }
                            style={{ maxWidth: "320px" }}
                          />
                        </div>

                        <div className="fl_eq_box src_btn">
                          <label className="searchHead">&nbsp;</label>
                          <div className="fl_w">
                            <Button
                              color="primary"
                              className="btn-pill"
                              onClick={() => onFilterSearch("margin")}
                            >
                              Search
                            </Button>
                            <button
                              color="primary"
                              type="button"
                              className="btn-pill btn btn-primary clr_fil red_txt"
                              onClick={() => resetFilters("margin")}
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

          <div className="row inner_box_body padL3T5 table_padding">
            <div className="col-12 mt-3 inner_tbl">
              {isShowSpinnerMargin() ? (
                <Spinner spinnerTime={false} />
              ) : (
                <>
                  <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                    <div className="inner_tbl">
                      <BootstrapTable
                        data={getFormattedDataMargin()}
                        version="4"
                        striped
                        hover
                        pagination
                        options={options}
                        trClassName={trClassNameMargin}
                        tableHeaderClass="custom-select-header-class"
                        tableBodyClass="custom-select-body-class"
                        expandableRow={isExpandRow}
                        expandComponent={expandRowMargin}
                        expandColumnOptions={{
                          expandColumnVisible: true
                        }}
                      >
                        <TableHeaderColumn dataField="_id" hidden isKey>
                          _id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="marketName"
                          dataSort
                          sort={"asc"}
                        >
                          Market Type
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="healthStatusMargin"
                          dataSort
                          sort={"asc"}
                        >
                          Margin Status
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="showMargin"
                          editable={false}
                          dataFormat={switchButtonFormatter("margin")}
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

      <div className="tbl_main  order_tbl_main nw_od_cls">
        <div className="white_box mrgbtm50">
          <div className="cm_ttl dis_inline">
            <h2>Profit Report</h2>
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
                              selected={reportStartDateProfit}
                              onChange={date => setReportStartDateProfit(date)}
                              timeInputLabel="Time:"
                              dateFormat="MM/dd/yyyy hh:mm aa"
                              showTimeInput
                            ></DatePicker>
                          </div>
                        </div>

                        <div className="fl_eq_box date_picker_filter">
                          <label className="searchHead">
                            Average Date Range
                          </label>
                          <div className="date_picker date_picker_input">
                            <DatePicker
                              selectsRange={true}
                              startDate={startDateProfit}
                              endDate={endDateProfit}
                              onChange={update => {
                                setDateRangeProfit(update);
                              }}
                              isClearable={true}
                              maxDate={reportStartDateProfit}
                              customInput={<CustomInputProfit />}
                            />
                          </div>
                        </div>

                        <div className="fl_eq_box date_picker_filter">
                          <label className="searchHead">Sale Type</label>
                          <Form.Control
                            as="select"
                            value={filterTypeProfit}
                            onChange={evt =>
                              setFilterTypeProfit(evt.target.value)
                            }
                          >
                            <option value="all">Show All</option>
                            <option value="presale">Show Presale Sales</option>
                            <option value="dayofsale">Show Day Of Sales</option>
                          </Form.Control>
                        </div>

                        <div className="fl_eq_box date_picker_filter">
                          <label className="searchHead">
                            Standard Deviation By
                          </label>
                          <Form.Control
                            type="Number"
                            defaultValue={1}
                            placeholder="Standard Deviation By"
                            onChange={evt =>
                              setStdDevByProfit(evt.target.value)
                            }
                            style={{ maxWidth: "320px" }}
                          />
                        </div>

                        <div className="fl_eq_box src_btn">
                          <label className="searchHead">&nbsp;</label>
                          <div className="fl_w">
                            <Button
                              color="primary"
                              className="btn-pill"
                              onClick={() => onFilterSearch("profit")}
                            >
                              Search
                            </Button>
                            <button
                              color="primary"
                              type="button"
                              className="btn-pill btn btn-primary clr_fil red_txt"
                              onClick={() => resetFilters("profit")}
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

          <div className="row inner_box_body padL3T5 table_padding">
            <div className="col-12 mt-3 inner_tbl">
              {isShowSpinnerProfit() ? (
                <Spinner spinnerTime={false} />
              ) : (
                <>
                  <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                    <div className="inner_tbl">
                      <BootstrapTable
                        data={getFormattedDataProfit()}
                        version="4"
                        striped
                        hover
                        pagination
                        options={options}
                        trClassName={trClassNameProfit}
                        tableHeaderClass="custom-select-header-class"
                        tableBodyClass="custom-select-body-class"
                        expandableRow={isExpandRow}
                        expandComponent={expandRowProfit}
                        expandColumnOptions={{
                          expandColumnVisible: true
                        }}
                      >
                        <TableHeaderColumn dataField="_id" hidden isKey>
                          _id
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="marketName"
                          dataSort
                          sort={"asc"}
                        >
                          Market Type
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="healthStatusMargin"
                          dataSort
                          sort={"asc"}
                        >
                          Margin Status
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="showProfit"
                          editable={false}
                          dataFormat={switchButtonFormatter("profit")}
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
    </>
  );
};

export default SaleMargin;
