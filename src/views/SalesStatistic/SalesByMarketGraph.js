import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Spinner from "../../components/Spinner";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import moment from "moment-timezone";
import "bootstrap-daterangepicker/daterangepicker.css";
import { SALESDATE } from "../../constants/logs";
import { Line } from "react-chartjs-2";
import { COLOR, POINTSTYLE } from "../../constants/listings";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {
  numberFormatter,
  numberFormatterwithZeroFraction,
  percentageFormatter
} from "../../utils";

const SalesByMarket = ({
  fetchSalesByMarketRequest,
  salesByMarketType,
  globals,
  isSalesByMarketFetching
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
  const [chartType, setChartType] = useState("DAY");
  const [onloadStart, setOnloadStart] = useState(
    moment(start).subtract(29, "days")
  );
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  );
  const [filterType, setFilterType] = useState("sale");
  const [marketType, setMarketType] = useState([]);

  useEffect(() => {
    let marketType = globals.find(global => global.keyName == "marketType");
    setMarketType(marketType ? JSON.parse(marketType.value) : []);
  }, [globals]);

  useEffect(() => {
    fetchSalesByMarketRequest({
      startDate: moment(start)
        .subtract(29, "days")
        .format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(end).format("YYYY-MM-DD HH:mm:ss")
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
    if (isSalesByMarketFetching) return <Spinner spinnerTime={false} />;
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

  const isNotEmpty = Array.isArray(chartType)
    ? chartType.length
    : Object.keys(chartType).length;

  const applyCallbackMarket = (startDate, endDate) => {
    setStart(startDate);
    setEnd(endDate);
    fetchSalesByMarketRequest({
      startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(endDate)
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss")
    });
    setStartOnLoad(false);
  };

  const getDateTime = () => {
    return SALESDATE(
      salesByMarketType.soldList,
      moment(start).format("MM/DD/YYYY"),
      moment(end).format("MM/DD/YYYY")
    );
  };

  const getTotalSales = marketType => {
    const chartData = [];
    let labelArray = [];
    labelArray = SALESDATE(salesByMarketType.soldList);

    labelArray.forEach(element => {
      let result = "",
        totalSaleby = 0,
        totalProfitby = 0,
        isMarketExist = false;

      result = salesByMarketType.soldList.filter(log => log.time === element);

      isMarketExist = result[0]
        ? result[0].marketTypes.find(type => type.marketType == marketType)
        : false;

      if (result.length > 0 && isMarketExist) {
        result[0].marketTypes.map(type => {
          if (type.marketType == marketType) {
            filterType == "sale"
              ? (totalSaleby = type.totalSaleby)
              : (totalProfitby = type.totalProfitby);
          }
        });
        chartData.push(
          Number(filterType == "sale" ? totalSaleby : totalProfitby)
        );
      } else {
        chartData.push(0);
      }
    });
    // console.log(filterType, marketType, chartData)
    return chartData;
  };

  const getDataSets = () => {
    let dataArray = [];
    marketType.forEach((market, i) => {
      let dataObj = {};
      dataObj.label = market.name;
      dataObj.fill = false;
      dataObj.lineTension = 0.5;
      dataObj.backgroundColor = COLOR[i];
      dataObj.borderColor = COLOR[i];
      dataObj.borderWidth = 2;
      dataObj.pointStyle = POINTSTYLE[i];
      dataObj.data = getTotalSales(market.value);

      dataArray.push(dataObj);
    });
    return dataArray;
  };

  var chartData = {
    labels: getDateTime(),
    datasets: getDataSets()
  };

  return (
    <div className="white_box">
      <div className="cm_ttl dis_inline">
        <h2>Sale By MarketType</h2>
      </div>
      <div className="row inner_box_body padL3T5">
        <div className="col-4 fl_eq_box">
          {isNotEmpty ? (
            <div className="date_picker dateCls">
              <DateTimeRangeContainer
                ranges={ranges}
                start={startOnLoad ? onloadStart : start}
                end={end}
                local={local}
                applyCallback={applyCallbackMarket}
              >
                <Form.Control
                  readOnly
                  id="formControlsTextB"
                  type="text"
                  label="Text"
                  value={
                    startOnLoad
                      ? moment(start)
                          .subtract(29, "days")
                          .format("MM/DD/YYYY") +
                        " To " +
                        moment(end).format("MM/DD/YYYY")
                      : moment(start).format("MM/DD/YYYY") +
                        " To " +
                        moment(end).format("MM/DD/YYYY")
                  }
                  placeholder="Search...."
                />
              </DateTimeRangeContainer>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="col-4"></div>
        <div className="col-4 fl_eq_box">
          <Form.Control
            as="select"
            value={filterType}
            onChange={evt => {
              setFilterType(evt.target.value);
            }}
          >
            <option value="sale">Sale By MarketType</option>
            <option value="profit">Profit By MarketType</option>
          </Form.Control>
        </div>

        <div className="col-12 mt-3">
          {isSalesByMarketFetching ? (
            <Spinner spinnerTime={false} />
          ) : (
            <>
              <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                <div className="inner_tbl">
                  <BootstrapTable
                    data={salesByMarketType.totalMarketSales}
                    version="4"
                    striped
                    hover
                    pagination
                    options={options}
                    tableHeaderClass="custom-select-header-class"
                    tableBodyClass="custom-select-body-class"
                  >
                    <TableHeaderColumn dataField="market" hidden isKey>
                      market
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="marketName"
                      dataSort
                      sort={"asc"}
                    >
                      Market Type
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="totalSales"
                      dataSort
                      sort={"asc"}
                      dataFormat={numberFormatter}
                    >
                      Total Sale
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="step2And3Profit"
                      dataSort
                      sort={"asc"}
                      dataFormat={numberFormatter}
                    >
                      Step 2 & 3 Profit
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="step4Profit"
                      dataSort
                      sort={"asc"}
                      dataFormat={numberFormatter}
                    >
                      Step 4 Profit
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="totalProfit"
                      dataSort
                      sort={"asc"}
                      dataFormat={numberFormatter}
                    >
                      Total Profit
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="avgProfitMargin"
                      dataSort
                      sort={"asc"}
                      dataFormat={percentageFormatter}
                    >
                      Average Profit Margin
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>

              <div className="col-12 mt-3 chart_cover">
                <Line
                  height={350}
                  data={chartData}
                  options={{
                    maintainAspectRatio: false,
                    tooltips: {
                      callbacks: {
                        label: function(t, d) {
                          var xLabel = d.datasets[t.datasetIndex].label;
                          var yLabel = numberFormatter(t.yLabel);
                          return xLabel + ": " + yLabel;
                        }
                      }
                    },
                    scales: {
                      xAxes: [
                        {
                          gridLines: {
                            display: false
                          }
                        }
                      ],
                      yAxes: [
                        {
                          ticks: {
                            callback: function(label, index, labels) {
                              return numberFormatterwithZeroFraction(label);
                            }
                          }
                        }
                      ]
                    },
                    title: {
                      display: true,
                      text:
                        filterType == "sale"
                          ? "Sale By MarketType"
                          : "Profit By MarketType",
                      fontSize: 20
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                      labels: {
                        usePointStyle: true
                      },
                      responsive: {
                        display: false
                      }
                    }
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesByMarket;
