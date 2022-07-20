/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment-timezone";

import "bootstrap-daterangepicker/daterangepicker.css";
import SalesByMarket from "./SalesByMarketGraph";
import SalesByVenue from "./SalesByVenueGraph";
import SalesByHours from "./SalesByHoursGraph";
import SalesByPerformer from "./SalesByPerformerGraph";

const dateFormatStr = "MM/DD/YY, hh:mm a";
const defaultTimeZone = "America/New_York";

export const dateFormatterWithTZ = time => timezone =>
  moment(time)
    .tz(timezone || defaultTimeZone)
    .format(dateFormatStr);

const SalesStatistics = ({
  fetchSalesStatisticsRequest,
  fetchSalesByMarketRequest,
  fetchSalesByVenueRequest,
  fetchSalesByHourRequest,
  fetchSalesByPerformerRequest,
  salesStatisticsLog,
  salesByMarketType,
  salesByVenue,
  salesByHour,
  salesByPerformer,
  globals,
  isFetching,
  isSalesByMarketFetching,
  isSalesByVenueFetching,
  isSalesByHourFetching,
  isSalesByPerformerFetching
}) => {
  let now = new Date();
  let local = {
    format: "MM/DD/YYYY",
    sundayFirst: false
  };
  const [startOnLoad, setStartOnLoad] = useState(true);
  const [start, setStart] = useState(
    moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    )
  );
  // eslint-disable-next-line no-unused-vars
  const [onloadStart, setOnloadStart] = useState(
    moment(start).subtract(29, "days")
  );
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  );
  const [searchStartDate, setSearchStartDate] = useState(
    moment(start).subtract(29, "days")
  );
  const [searchEndDate, setSearchEndDate] = useState(end);
  const [salesTypeSearchKey, setSalesTypeSearchKey] = useState("");
  const btnSearchRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [sizePerPage, setSizePerPage] = useState(20);

  useEffect(() => {
    fetchSalesStatisticsRequest({
      startDate: moment(start)
        .subtract(29, "days")
        .format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(end).format("YYYY-MM-DD HH:mm:ss"),
      salesType: salesTypeSearchKey
    });
  }, []);

  let ranges = {
    Today: [moment(start), moment(end)],
    "Yesterday Only": [
      moment(start).subtract(1, "days"),
      moment(end).subtract(1, "days")
    ],
    "7 Days": [moment(start).subtract(6, "days"), moment(end)],
    "30 Days": [moment(start).subtract(29, "days"), moment(end)],
    "This Month": [moment(start).startOf("month"), moment(end).endOf("month")],
    "Last Month": [
      moment()
        .subtract(1, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .endOf("month")
    ],
    Year: [moment(start).subtract(1, "years"), moment(end)]
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
  };
  const options = {
    page: 1,
    sizePerPage: 20,
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
    // defaultSortName: "created_date", // default sort column name
    // defaultSortOrder: "desc", // default sort order
    expandBy: "column",
    noDataText: noDataHandler()
  };
  const applyCallback = (startDate, endDate) => {
    setSearchStartDate(startDate);
    setSearchEndDate(endDate);
    setStart(startDate);
    setEnd(endDate);
    setStartOnLoad(false);
  };

  function remote(remoteObj) {
    // it means that only pagination you will handle by your own
    remoteObj.pagination = true;
    remoteObj.cellEdit = false;
    return remoteObj;
  }

  const handleKeypress = () => {
    btnSearchRef.current.click();
  };

  return (
    <div>
      <div className="full_width">
        <div className="page_name">
          <h2>Sales Statistics</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12">
                <div className="inner_box_body padL3T5 pb-0">
                  <div className="white_box">
                    <div className="cm_ttl dis_inline">
                      <h2>Sales Statistics Table</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                        <div className="inner_tbl">
                          <div>
                            <div className="tbl_main  order_tbl_main nw_od_cls">
                              <div className="inner_tbl">
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
                                            <div className="fl_eq_box rangeCls">
                                              <label className="searchHead">
                                                Start & End Date
                                              </label>
                                              <div className="date_picker dateCls customDatePicker">
                                                <DateTimeRangeContainer
                                                  ranges={ranges}
                                                  start={
                                                    startOnLoad
                                                      ? onloadStart
                                                      : start
                                                  }
                                                  end={end}
                                                  style={{
                                                    standaloneLayout: {
                                                      display: "flex",
                                                      maxWidth: "fit-content"
                                                    }
                                                  }}
                                                  local={local}
                                                  applyCallback={applyCallback}
                                                >
                                                  <div className="input-group">
                                                    <Form.Control
                                                      id="formControlsTextB"
                                                      type="text"
                                                      label="Text"
                                                      readOnly
                                                      value={
                                                        searchStartDate &&
                                                        searchEndDate !==
                                                          undefined
                                                          ? startOnLoad
                                                            ? moment(start)
                                                                .subtract(
                                                                  29,
                                                                  "days"
                                                                )
                                                                .format(
                                                                  "MM/DD/YYYY"
                                                                ) +
                                                              " To " +
                                                              moment(
                                                                end
                                                              ).format(
                                                                "MM/DD/YYYY"
                                                              )
                                                            : moment(
                                                                start
                                                              ).format(
                                                                "MM/DD/YYYY"
                                                              ) +
                                                              " To " +
                                                              moment(
                                                                end
                                                              ).format(
                                                                "MM/DD/YYYY"
                                                              )
                                                          : "Enter Start Date - End Date"
                                                      }
                                                      placeholder="Search...."
                                                    />
                                                    <span className="input-group-btn">
                                                      <Button className="default date-range-toggle">
                                                        <i className="fa fa-calendar" />
                                                      </Button>
                                                    </span>
                                                  </div>
                                                </DateTimeRangeContainer>
                                              </div>
                                            </div>

                                            <div
                                              className="fl_eq_box"
                                              style={{ marginRight: "1%" }}
                                            >
                                              <label className="searchHead">
                                                Sale Type
                                              </label>
                                              <Form.Control
                                                // className="search_icon"
                                                as="select"
                                                value={salesTypeSearchKey}
                                                // placeholder="Search..."
                                                onChange={evt => {
                                                  setSalesTypeSearchKey(
                                                    evt.target.value
                                                  );
                                                }}
                                                onKeyPress={evt => {
                                                  if (
                                                    evt.key === "Enter" ||
                                                    evt.charCode === 13 ||
                                                    evt.which === 13 ||
                                                    evt.keyCode === 13
                                                  ) {
                                                    handleKeypress();
                                                  }
                                                }}
                                              >
                                                <option value="">All</option>
                                                <option value="TM">
                                                  TM Sales
                                                </option>
                                                <option value="eVenue">
                                                  E-Venue Sales
                                                </option>
                                                <option value="preSales">
                                                  Pre Sales
                                                </option>
                                                <option value="dayOfSales">
                                                  Day Of Sales
                                                </option>
                                                <option value="Competitor">
                                                  Competitor Sales
                                                </option>
                                                <option value="metopera">
                                                  Metopera
                                                </option>
                                                <option value="nycballet">
                                                  NYC Ballet
                                                </option>
                                                <option value="mlb">MLB</option>
                                                <option value="seatgeek_broadway">
                                                  SeatGeek
                                                </option>
                                              </Form.Control>
                                            </div>

                                            <div className="fl_eq_box src_btn">
                                              <label className="searchHead">
                                                &nbsp;
                                              </label>
                                              <div className="fl_w">
                                                <Button
                                                  color="primary"
                                                  className="btn-pill"
                                                  onClick={() => {
                                                    fetchSalesStatisticsRequest(
                                                      {
                                                        startDate:
                                                          searchStartDate !==
                                                          undefined
                                                            ? searchStartDate.format(
                                                                "YYYY-MM-DD HH:mm:ss"
                                                              )
                                                            : undefined,
                                                        endDate:
                                                          searchEndDate !==
                                                          undefined
                                                            ? searchEndDate
                                                                .endOf("day")
                                                                .format(
                                                                  "YYYY-MM-DD HH:mm:ss"
                                                                )
                                                            : undefined,
                                                        salesType: salesTypeSearchKey
                                                      }
                                                    );
                                                  }}
                                                >
                                                  Search
                                                </Button>
                                                <button
                                                  color="primary"
                                                  type="button"
                                                  className="btn-pill btn btn-primary clr_fil red_txt"
                                                  onClick={() => {
                                                    setSearchStartDate(start);
                                                    setSearchEndDate(end);
                                                    setSalesTypeSearchKey("");
                                                    setStart(
                                                      moment(start).subtract(
                                                        29,
                                                        "days"
                                                      )
                                                    );
                                                    setEnd(end);
                                                    fetchSalesStatisticsRequest(
                                                      {
                                                        startDate: moment(start)
                                                          .subtract(29, "days")
                                                          .format(
                                                            "YYYY-MM-DD HH:mm:ss"
                                                          ),
                                                        endDate: moment(
                                                          end
                                                        ).format(
                                                          "YYYY-MM-DD HH:mm:ss"
                                                        ),
                                                        salesType: salesTypeSearchKey
                                                      }
                                                    );
                                                  }}
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
                            </div>

                            {isFetching ? (
                              <Spinner spinnerTime={false} />
                            ) : (
                              <BootstrapTable
                                data={[salesStatisticsLog]}
                                version="4"
                                striped
                                hover
                                pagination
                                options={options}
                                // trClassName={trClassName}
                                fetchInfo={{
                                  dataTotalSize:
                                    [salesStatisticsLog].length || 0
                                }}
                                // expandColumnOptions={{
                                //   expandColumnVisible: true
                                // }}
                                // ref={refUnmatchedEvent}
                                tableHeaderClass="custom-select-header-class"
                                tableBodyClass="custom-select-body-class"
                                // search
                                // blurToSave={true}
                                remote={remote}
                                // cellEdit={cellEditProp}
                                // selectRow={selectRow}
                                // expandableRow={isExpandRow}
                                // expandComponent={expandRow}
                              >
                                <TableHeaderColumn dataField="_id" hidden isKey>
                                  _id
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="totalSales">
                                  Total Sales
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="totalOrders">
                                  Total Orders
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="totalTicketsSold">
                                  Total Tickets Sold
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="totalProfit">
                                  Total Profit
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="averageProfitMargin">
                                  Average Profit Margin
                                </TableHeaderColumn>
                              </BootstrapTable>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-12">
                <div className="inner_box_body padL3T5 pb-0">
                  <SalesByMarket
                    fetchSalesByMarketRequest={fetchSalesByMarketRequest}
                    salesByMarketType={salesByMarketType}
                    isSalesByMarketFetching={isSalesByMarketFetching}
                    globals={globals}
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="inner_box_body padL3T5 pb-0">
                  <SalesByVenue
                    fetchSalesByVenueRequest={fetchSalesByVenueRequest}
                    salesByVenue={salesByVenue}
                    isSalesByVenueFetching={isSalesByVenueFetching}
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="inner_box_body padL3T5 pb-0">
                  <SalesByHours
                    fetchSalesByHourRequest={fetchSalesByHourRequest}
                    salesByHour={salesByHour}
                    isSalesByHourFetching={isSalesByHourFetching}
                  />
                </div>
              </div>

              <div className="col-sm-12">
                <div className="inner_box_body padL3T5 pb-0">
                  <SalesByPerformer
                    fetchSalesByPerformerRequest={fetchSalesByPerformerRequest}
                    salesByPerformer={salesByPerformer}
                    isSalesByPerformerFetching={isSalesByPerformerFetching}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesStatistics;
