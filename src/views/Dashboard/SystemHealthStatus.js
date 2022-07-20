import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import {
  percentageFormatter,
  numberFormatterwithoutStyle,
  numberFormatter
} from "../../utils";

const SystemHealthStatus = ({
  globals,
  userInfo,
  // fetchSaleMarginHealthReportRequest,
  // saleMarginHealthReport,
  // isSaleMarginFetching,
  fetchMarketwiseSaleMarginHealthReportRequest,
  marketwiseSaleMarginHealthReport,
  isMarketwiseSaleMarginFetching,
  fetchSBEventsHealthReportRequest,
  skyboxEventsHealthReport,
  isFetchingSkyboxEventsHealthReport,
  skyboxPostedEventsHealthReport,
  isFetchingSkyboxPostedEventsHealthReport,
  fetchSBPostedEventsHealthReportRequest,
  fetchEventQueueHealthReportRequest,
  eventQueueHealthReport,
  isFetchingEventQueueHealthReport,
  fetchCancelledSBEventsHealthReportRequest,
  cancelledSkyboxEventsHealthReport,
  isFetchingCancelledSkyboxEventsHealthReport
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

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = () => {
    fetchMarketwiseSaleMarginHealthReportRequest(requestObj());
    // fetchSBEventsHealthReportRequest(skyboxEventsReqObj())
    // callSkyboxPostedEventsHealthReportAPI()
    // fetchEventQueueHealthReportRequest(requestObj())
    // fetchCancelledSBEventsHealthReportRequest(skyboxEventsReqObj())
  };

  const callSkyboxPostedEventsHealthReportAPI = () => {
    fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("short"));
    fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("medium"));
    fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("near"));
    fetchSBPostedEventsHealthReportRequest(skyboxPostedEventsReqObj("long"));
  };

  const requestObj = () => {
    return {
      reportDateTime: moment(reportStartDate).format("YYYY-MM-DD HH:mm"),
      avgStartDate: moment(startDate).format("YYYY-MM-DD"),
      avgEndDate: moment(endDate).format("YYYY-MM-DD"),
      standardDeviationBy: stdDevBy
    };
  };

  const skyboxEventsReqObj = () => {
    return {
      avgStartDate: moment(startDate).format("YYYY-MM-DD"),
      avgEndDate: moment(endDate).format("YYYY-MM-DD"),
      standardDeviationBy: stdDevBy
    };
  };

  const skyboxPostedEventsReqObj = monitorType => {
    return {
      reportDateTime: moment(reportStartDate).format("YYYY-MM-DD"),
      avgStartDate: moment(startDate).format("YYYY-MM-DD"),
      avgEndDate: moment(endDate).format("YYYY-MM-DD"),
      standardDeviationBy: stdDevBy,
      monitorType
    };
  };

  const getData = (from, configKey) => {
    let allReportData = [];
    if (marketwiseSaleMarginHealthReport) {
      let marketwiseSaleMargin = addData(
        marketwiseSaleMarginHealthReport,
        from,
        false,
        configKey
      );
      allReportData = [...allReportData, ...marketwiseSaleMargin];
    }

    // sort by healthStatus
    allReportData.sort((a, b) => {
      return a.healthStatus - b.healthStatus;
    });

    if (allReportData && allReportData.length > 0) {
      let html = [];
      for (let e of allReportData) {
        html.push(
          <>
            <li>
              <a
                className={e.healthStatus === 0 ? "redStatus" : "greenStatus"}
                href="#systemHealthReport"
              >
                <div>
                  <b>{e.title}</b>
                </div>
                <div>
                  <b>{e.subtitle}</b>
                </div>
                {userInfo.role.toLowerCase() === "admin" ? (
                  <div>{e.info1}</div>
                ) : (
                  ""
                )}
                <div>{e.info2}</div>
              </a>
            </li>
          </>
        );
      }
      return html;
    }
    // else return "No Data Found To Display"
  };

  const getSkyboxEventsData = () => {
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

    // sort by healthStatus
    data.sort((a, b) => {
      return a.healthStatus - b.healthStatus;
    });

    if (data.length > 0) {
      let html = [];
      for (let e of data) {
        if (e.showReport === true) {
          html.push(
            <>
              <li>
                <a
                  className={e.healthStatus === 0 ? "redStatus" : "greenStatus"}
                  href="#systemHealthReport"
                >
                  <div>
                    <b>{e.reportName}</b>
                  </div>
                  <div>
                    {e.totalCount
                      ? numberFormatterwithoutStyle(e.totalCount)
                      : e.totalCount}
                  </div>
                  <div>{percentageFormatter(e.percentile)}</div>
                </a>
              </li>
            </>
          );
        }
      }
      return html;
    }
  };

  const getEventQueueData = () => {
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

    // sort by healthStatus
    data.sort((a, b) => {
      return a.healthStatus - b.healthStatus;
    });

    if (data.length > 0) {
      let html = [];
      for (let e of data) {
        if (e.showReport === true) {
          html.push(
            <>
              <li>
                <a
                  className={e.healthStatus === 0 ? "redStatus" : "greenStatus"}
                  href="#systemHealthReport"
                >
                  <div>
                    <b>{e.reportName}</b>
                  </div>
                  <div>
                    {e.eventCount
                      ? numberFormatterwithoutStyle(e.eventCount)
                      : e.eventCount}
                  </div>
                  <div>{percentageFormatter(e.percetileEventCount)}</div>
                </a>
              </li>
            </>
          );
        }
      }
      return html;
    }
  };

  const addData = (data, from, isAllMarket, configKey) => {
    let allMarketData = [];
    let saleData = data.todaySale;
    let presaleData = data.todayPreSale;
    let dayofsaleData = data.todayDayofSale;
    if (saleData && saleData.length > 0) {
      for (let element of saleData) {
        if (element[configKey] === true) {
          let saleMarginList = formatData(
            element,
            "Sale",
            "Margin",
            "Profit",
            from
          );
          allMarketData = [...allMarketData, ...saleMarginList];
        }
      }
    }
    // adding presale data for AllMarket only
    if (presaleData && presaleData.length > 0) {
      for (let element of presaleData) {
        // if (element.marketName === "All Markets") {
        if (element[configKey] === true) {
          let presaleMarginList = formatData(
            element,
            "Presale Sale",
            "Presale Margin",
            "Presale Profit",
            from
          );
          allMarketData = [...presaleMarginList, ...allMarketData];
        }
      }
    }
    // adding dayofsale data for AllMarket only
    if (dayofsaleData && dayofsaleData.length > 0) {
      for (let element of dayofsaleData) {
        // if (element.marketName === "All Markets") {
        if (element[configKey] === true) {
          let dayofsaleMarginList = formatData(
            element,
            "Dayofsale Sale",
            "Dayofsale Margin",
            "Dayofsale Profit",
            from
          );
          allMarketData = [...dayofsaleMarginList, ...allMarketData];
        }
      }
    }
    return allMarketData;
  };

  const formatData = (
    data,
    saleSubtitle,
    marginSubtitle,
    profitSubtitle,
    from
  ) => {
    let saleMarginList = [];
    if (from === "sale") {
      let saleObj = {};
      saleObj.title = data.marketName;
      saleObj.subtitle = saleSubtitle;
      saleObj.info1 = numberFormatter(data.todaySale);
      saleObj.info2 = percentageFormatter(data.percentileSale);
      saleObj.healthStatus = data.healthStatusSale;
      saleMarginList.push(saleObj);
    } else if (from === "margin") {
      let marginObj = {};
      marginObj.title = data.marketName;
      marginObj.subtitle = marginSubtitle;
      marginObj.info1 = percentageFormatter(data.todayMargin);
      marginObj.info2 = percentageFormatter(data.percentileMargin);
      marginObj.healthStatus = data.healthStatusMargin;
      saleMarginList.push(marginObj);
    } else {
      let profitObj = {};
      profitObj.title = data.marketName;
      profitObj.subtitle = profitSubtitle;
      profitObj.info1 = percentageFormatter(data.todayProfit);
      profitObj.info2 = percentageFormatter(data.percentileProfit);
      profitObj.healthStatus = data.healthStatusProfit;
      saleMarginList.push(profitObj);
    }
    return saleMarginList;
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

  return (
    <div className="tbl_main order_tbl_main nw_od_cls">
      <div className="white_box mrgbtm50">
        <div className="cm_ttl">
          <h2>System Health Status</h2>
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
                      <div className="fl_eq_box common_filter_opt">
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

                      <div className="fl_eq_box common_filter_opt">
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

                      <div className="fl_eq_box common_filter_opt">
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

                      <div className="fl_eq_box src_btn filter_opt_btn_wrap">
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

        <div className="inner_box_body padL3T5 status_grid_wrapper">
          <div className="inner_tbl">
            {isMarketwiseSaleMarginFetching ? (
              // || isFetchingSkyboxPostedEventsHealthReport
              // || isFetchingEventQueueHealthReport
              // || isFetchingCancelledSkyboxEventsHealthReport
              <Spinner spinnerTime={false} />
            ) : (
              <>
                <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue status_class">
                  <div className="inner_tbl mg-btm">
                    <label className="filter_label">Sale Status</label>
                    <div className="report_status">
                      <ul>{getData("sale", "showSale")}</ul>
                    </div>
                  </div>

                  <div className="inner_tbl mg-btm">
                    <label className="filter_label">Margin Status</label>
                    <div className="report_status">
                      <ul>{getData("margin", "showMargin")}</ul>
                    </div>
                  </div>

                  <div className="inner_tbl mg-btm">
                    <label className="filter_label">Profit Status</label>
                    <div className="report_status">
                      <ul>{getData("profit", "showProfit")}</ul>
                    </div>
                  </div>

                  {/* <div className="col-6 inner_tbl mg-btm">
                    <label className="filter_label">Skybox Status</label>
                    <div className="report_status">
                      <ul>{getSkyboxEventsData()}</ul>
                    </div>
                  </div>

                  <div className="col-6 inner_tbl mg-btm">
                    <label className="filter_label">
                      Event Queue/Monitring Status
                    </label>
                    <div className="report_status">
                      <ul>{getEventQueueData()}</ul>
                    </div>
                  </div> */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SystemHealthStatus;
