/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Line } from "react-chartjs-2";
import Spinner from "../../components/Spinner";
import { SALESDATE } from "../../constants/logs";
import moment from "moment-timezone";
import CustomerInfo from "./CustomerInfo";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import {
  numberFormatter,
  numberFormatterwithoutFraction,
  numberFormatterwithZeroFraction
} from "../../utils";

const Statistics = ({
  ordersCostCount,
  fetchSoldStatisticsRequest,
  soldStatisticsLog,
  isFetching,
  globals
}) => {
  let now = new Date();
  let local = {
    format: "MM/DD/YYYY",
    sundayFirst: false
  };
  const [startOnLoad, setStartOnLoad] = useState(true);
  const [salesType, setSalesType] = useState("Sales");
  let isChartHasData =
    salesType === "Presale Sale"
      ? soldStatisticsLog.preSaleList.length || 0
      : salesType === "Day of sale"
      ? soldStatisticsLog.dayOfSaleList.length || 0
      : soldStatisticsLog.soldList.length || 0;

  const [start, setStart] = useState(
    moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    )
    //.subtract(1, "minutes")
    // .subtract(1, "seconds")
  );
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  );
  // eslint-disable-next-line no-unused-vars
  const [onloadStart, setOnloadStart] = useState(
    moment(start).subtract(29, "days")
  );
  const [chartType, setChartType] = useState("DAY");
  // eslint-disable-next-line no-unused-vars
  const [currentDateMonth, setcurrentDateMonth] = useState("");
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [customerInfo, setCustomerInfo] = useState("");
  const [maxSaleAmount, setMaxSaleAmount] = useState("");
  const [maxProfitAmount, setMaxProfitAmount] = useState("");
  const [maxPresaleAmount, setMaxPresaleAmount] = useState("");
  const [maxPresaleProfitAmount, setMaxPresaleProfitAmount] = useState("");
  const [maxDayOfSaleAmount, setMaxDayOfSaleAmount] = useState("");
  const [maxDayOfProfitAmount, setMaxDayOfProfitAmount] = useState("");

  let today = new Date().toLocaleDateString();
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

  useEffect(() => {
    let presale = globals.find(global => global.keyName === "maxPresaleAmount");
    setMaxPresaleAmount(presale ? presale.value : "50000");

    let dayOfsale = globals.find(
      global => global.keyName === "maxDayOfSaleAmount"
    );
    setMaxDayOfSaleAmount(dayOfsale ? dayOfsale.value : "50000");

    let sale = globals.find(global => global.keyName === "maxSaleAmount");
    setMaxSaleAmount(sale ? sale.value : "160000");

    let profit = globals.find(global => global.keyName === "maxProfitAmount");
    setMaxProfitAmount(profit ? profit.value : "16000");

    let presaleProfit = globals.find(
      global => global.keyName === "maxPresaleProfitAmount"
    );
    setMaxPresaleProfitAmount(presaleProfit ? presaleProfit.value : "5000");

    let dayOfprofit = globals.find(
      global => global.keyName === "maxDayOfProfitAmount"
    );
    setMaxDayOfProfitAmount(dayOfprofit ? dayOfprofit.value : "5000");
  }, [globals]);

  useEffect(() => {
    // fetchSoldStatisticsRequest({ groupBy: "DAY" })
    fetchSoldStatisticsRequest({
      startDate: moment(start)
        .subtract(29, "days")
        .format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(end).format("YYYY-MM-DD HH:mm:ss")
    });
    setcurrentDateMonth(today);

    // const tId = setInterval(() => {
    //   fetchSoldStatisticsRequest({
    //     startDate: moment(start)
    //       .subtract(29, "days")
    //       .format("YYYY-MM-DD HH:mm:ss"),
    //     endDate: moment(end).format("YYYY-MM-DD HH:mm:ss")
    //   })
    //   setChartType("DAY")
    // }, 1000 * 60 * 10) //polling every 5 minutes

    // return () => {
    //   tId && clearInterval(tId)
    // }
  }, []);

  // eslint-disable-next-line no-unused-vars
  const weeklyLabel = () => {
    var weekArray = [];
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();
    var estDateTime = moment(new Date())
      .tz("America/New_York")
      .format("MM-DD-YYYY hh:mm:ss");
    // var first = date.getDate() - date.getDay() + 1 // First day is the day of the month - the day of the week
    // var last = first + 6
    var dateFormat = new Date(estDateTime);
    var first = dateFormat.getDate() - dateFormat.getDay() + 1; // First day is the day of the month - the day of the week
    var last = first + 6;

    for (var j = first; j <= last; j++) {
      //  var indianCurrentDate = new Date(y, m, j)
      // var indianCurrentDate = new Date(y, m, j)
      // eslint-disable-next-line no-redeclare
      var estDateTime = new Date(
        dateFormat.getFullYear(),
        dateFormat.getMonth(),
        j
      );
      weekArray.push(
        new Date(estDateTime)
          .toString()
          .split(" ")
          .slice(0, 3)
          .join(" ")
      );
    }

    return weekArray;
  };

  const getTotalSales = () => {
    const chartData = [];
    var labelArray = [];
    labelArray =
      salesType === "Presale Sale"
        ? SALESDATE(soldStatisticsLog.preSaleList)
        : salesType === "Day of sale"
        ? SALESDATE(soldStatisticsLog.dayOfSaleList)
        : SALESDATE(soldStatisticsLog.soldList);
    labelArray.forEach(element => {
      var result = "";
      result =
        salesType === "Presale Sale"
          ? soldStatisticsLog.preSaleList.filter(log => log.time === element)
          : salesType === "Day of sale"
          ? soldStatisticsLog.dayOfSaleList.filter(log => log.time === element)
          : soldStatisticsLog.soldList.filter(log => log.time === element);

      if (result.length > 0) {
        numberFormatter(soldStatisticsLog.totalSales);
        chartData.push(Number(result[0].totalSaleby).toFixed(2));
      } else {
        chartData.push(0);
      }
    });
    // console.log("chartData :", chartData)
    return chartData;
  };

  const getTotalProfit = () => {
    const chartData = [];
    var labelArray = [];
    labelArray =
      salesType === "Presale Sale"
        ? SALESDATE(soldStatisticsLog.preSaleList)
        : salesType === "Day of sale"
        ? SALESDATE(soldStatisticsLog.dayOfSaleList)
        : SALESDATE(soldStatisticsLog.soldList);

    labelArray.forEach(element => {
      var result = "";
      result =
        salesType === "Presale Sale"
          ? soldStatisticsLog.preSaleList.filter(log => log.time === element)
          : salesType === "Day of sale"
          ? soldStatisticsLog.dayOfSaleList.filter(log => log.time === element)
          : soldStatisticsLog.soldList.filter(log => log.time === element);

      if (result.length > 0) {
        numberFormatter(soldStatisticsLog.totalProfit);
        chartData.push(Number(result[0].totalProfitby).toFixed(2));
      } else {
        chartData.push(0);
      }
    });
    return chartData;
  };

  const getTotalPresaleProfit = () => {
    const chartData = [];
    var labelArray = [];
    labelArray =
      salesType === "Presale Sale"
        ? SALESDATE(soldStatisticsLog.preSaleList)
        : salesType === "Day of sale"
        ? SALESDATE(soldStatisticsLog.dayOfSaleList)
        : SALESDATE(soldStatisticsLog.soldList);

    labelArray.forEach(element => {
      var result = "";
      result =
        salesType === "Presale Sale"
          ? soldStatisticsLog.preSaleList.filter(log => log.time === element)
          : salesType === "Day of sale"
          ? soldStatisticsLog.dayOfSaleList.filter(log => log.time === element)
          : soldStatisticsLog.soldList.filter(log => log.time === element);

      if (result.length > 0) {
        numberFormatter(soldStatisticsLog.totalPresaleProfit);
        chartData.push(Number(result[0].totalPresaleProfitby).toFixed(2));
      } else {
        chartData.push(0);
      }
    });
    return chartData;
  };

  const checkForType = () => {
    return salesType === "Presale Sale"
      ? SALESDATE(
          soldStatisticsLog.preSaleList,
          moment(start).format("MM/DD/YYYY"),
          moment(end).format("MM/DD/YYYY")
        )
      : salesType === "Day of sale"
      ? SALESDATE(
          soldStatisticsLog.dayOfSaleList,
          moment(start).format("MM/DD/YYYY"),
          moment(end).format("MM/DD/YYYY")
        )
      : SALESDATE(
          soldStatisticsLog.soldList,
          moment(start).format("MM/DD/YYYY"),
          moment(end).format("MM/DD/YYYY")
        );
  };
  const getLineChartLine = () => {
    return "Sales";
  };
  const getLineProfitChartLine = () => {
    return "Profit";
  };

  const getLinePresaleOrdersProfitChartLine = () => {
    return "Purchased/Fulfilled Profit";
  };
  var chartData = {
    labels: checkForType(),
    // showInLegend: true,
    datasets: [
      {
        //label: "Sales By Hours",
        label: getLineChartLine(),
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#4800ff",
        borderColor: "#4800ff",
        borderWidth: 2,
        pointStyle: "rectRot",
        data: getTotalSales(),
        yAxisID: "y-axis-1"
        // data: [45, 52, 56, 72, 99, 123, 135, 152]
      },
      {
        //label: "Sales By Hours",
        label: getLineProfitChartLine(),
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#ffd000",
        borderColor: "#ffd000",
        borderWidth: 2,
        pointStyle: "triangle",
        data: getTotalProfit(),
        yAxisID: "y-axis-2"
        // data: [45, 52, 56, 72, 99, 123, 135, 152]
      },
      {
        //label: "Sales By Hours",
        label: getLinePresaleOrdersProfitChartLine(),
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#00E100",
        borderColor: "#00E100",
        borderWidth: 2,
        pointStyle: "triangle",
        data: getTotalPresaleProfit(),
        yAxisID: "y-axis-2"
        // data: [45, 52, 56, 72, 99, 123, 135, 152]
      }
    ]
  };
  const isNull = "";
  const isNotEmpty = Array.isArray(chartType)
    ? chartType.length
    : Object.keys(chartType).length;

  const isLineEmpty = Array.isArray(chartData)
    ? chartData.length
    : Object.keys(chartData).length;

  const applyCallback = (startDate, endDate) => {
    setSalesType("Sales");
    setStart(startDate);
    setEnd(endDate);
    fetchSoldStatisticsRequest({
      startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(endDate)
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss")
    });
    setStartOnLoad(false);
  };
  return (
    <div>
      <div className="table_head log_thead">
        <div className="statictis_select">
          <div className="row">
            <div className="col-sm-12">
              <div className="select_eq date_nw_cls">
                <div className="fl_eq_box">
                  {isNotEmpty ? (
                    <div className="date_picker dateCls">
                      <DateTimeRangeContainer
                        ranges={ranges}
                        start={startOnLoad ? onloadStart : start}
                        end={end}
                        local={local}
                        // maxDate={maxDate}
                        applyCallback={applyCallback}
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
              </div>
            </div>
            {/* <div className="col-sm-6">
              <div className="select_eq">
                <div className="fl_eq_box" style={{ display: "none" }}>
                  {isNotEmpty ? (
                    <Form.Control
                      as="select"
                      value={chartType}
                      onChange={evt => {
                        setChartType(evt.target.value)
                      }}
                    >
                      <option value="SOLD">All Sold Listings</option>
                      <option value="DELIVER">Delivered orders only</option>
                    </Form.Control>
                  ) : (
                      <Spinner />
                    )}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="statictis_details dash_statictis">
        <h4>Orders Total Cost</h4>
        <div className="stat_inner">
          <div className="row">
            <div className="col-7">
              <label>Total Cost of Green Orders: </label>
            </div>
            <div className="col-5">
              <span>
                {ordersCostCount.greenOrdersTotalCost
                  ? numberFormatter(ordersCostCount.greenOrdersTotalCost)
                  : "0"}

                <i
                  className="fa fa-info-circle"
                  onClick={() => {
                    setCustomerInfo(ordersCostCount.costForGreenOrder);
                    setShowCustomerInfo(true);
                  }}
                ></i>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-7">
              <label>Total Cost of Purple Orders: </label>
            </div>
            <div className="col-5">
              <span>
                {ordersCostCount.purpleOrdersTotalCost
                  ? numberFormatter(ordersCostCount.purpleOrdersTotalCost)
                  : "0"}

                <i
                  className="fa fa-info-circle"
                  onClick={() => {
                    setCustomerInfo(ordersCostCount.costForPurpleOrder);
                    setShowCustomerInfo(true);
                  }}
                ></i>
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-7">
              <label>Total Cost of Red Orders: </label>
            </div>
            <div className="col-5">
              <span>
                {ordersCostCount.redOrdersTotalCost
                  ? numberFormatter(ordersCostCount.redOrdersTotalCost)
                  : "0"}

                <i
                  className="fa fa-info-circle"
                  onClick={() => {
                    setCustomerInfo(ordersCostCount.costForRedOrder);
                    setShowCustomerInfo(true);
                  }}
                ></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* {isChartHasData ? (
        <div className="fl_eq_box" style={{ width: "30%", float: "right" }}>
          <label className="searchHead">Sale Type</label>
          <Form.Control
            as="select"
            value={salesType}
            onChange={evt => setSalesType(evt.target.value)}
          >
            <option value="Sales">Show All</option>
            <option value="Presale Sale">Show Presale Sales</option>
            <option value="Day of sale">Show Day Of Sales</option>
          </Form.Control>
        </div>
      ) : (
        ""
      )} */}

      <div className="statictis_details dash_statictis">
        <div className="row dash_statictis_row">
          <div className="col-5" style={{ padding: "0" }}>
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              Sales Details
            </span>
          </div>
          <div className="col-3" style={{ paddingRight: "0px" }}>
            <span style={{ fontSize: "16px", float: "right" }}>Sale Type</span>
          </div>
          <div className="col-4">
            <Form.Control
              as="select"
              style={{ width: "100%", height: "unset" }}
              value={salesType}
              onChange={evt => setSalesType(evt.target.value)}
            >
              <option value="Sales">Show All</option>
              <option value="Presale Sale">Show Presale Sales</option>
              <option value="Day of sale">Show Day Of Sales</option>
            </Form.Control>
          </div>
        </div>
        <div className="stat_inner">
          <div className="row">
            <div className="col-8">
              <label>Total Sales:</label>
            </div>
            <div className="col-4">
              <span>
                {salesType === "Presale Sale"
                  ? soldStatisticsLog.presaleTotalSale
                    ? numberFormatterwithoutFraction(
                        soldStatisticsLog.presaleTotalSale
                      )
                    : "0"
                  : salesType === "Day of sale"
                  ? soldStatisticsLog.dayOfTotalSale
                    ? numberFormatterwithoutFraction(
                        soldStatisticsLog.dayOfTotalSale
                      )
                    : "0"
                  : soldStatisticsLog.totalSales
                  ? numberFormatterwithoutFraction(soldStatisticsLog.totalSales)
                  : "0"}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <label>Total Orders:</label>
            </div>
            <div className="col-4">
              <span>
                {salesType === "Presale Sale"
                  ? soldStatisticsLog.totalPresaleOrders
                  : salesType === "Day of sale"
                  ? soldStatisticsLog.totalDayOfSaleOrders
                  : soldStatisticsLog.totalOrders}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <label>Total Tickets Sold:</label>
            </div>
            <div className="col-4">
              <span>
                {salesType === "Presale Sale"
                  ? soldStatisticsLog.totalPresaleTicketsSold
                  : salesType === "Day of sale"
                  ? soldStatisticsLog.totalDayOfSaleTicketsSold
                  : soldStatisticsLog.totalTicketsSold}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <label>Total Profit:</label>
            </div>
            <div className="col-4">
              <span>
                {salesType === "Presale Sale"
                  ? soldStatisticsLog.presaleTotalProfit
                    ? numberFormatterwithoutFraction(
                        soldStatisticsLog.presaleTotalProfit
                      )
                    : "0"
                  : salesType === "Day of sale"
                  ? soldStatisticsLog.dayOfTotalProfit
                    ? numberFormatterwithoutFraction(
                        soldStatisticsLog.dayOfTotalProfit
                      )
                    : "0"
                  : soldStatisticsLog.totalProfit
                  ? numberFormatterwithoutFraction(
                      soldStatisticsLog.totalProfit
                    )
                  : "0"}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-8">
              <label>Average Profit Margin:</label>
            </div>
            <div className="col-4">
              <span>
                {isNull
                  ? ""
                  : salesType === "Presale Sale"
                  ? Number(
                      soldStatisticsLog.averagePresaleProfitMargin
                    ).toFixed(2) + "%"
                  : salesType === "Day of sale"
                  ? Number(
                      soldStatisticsLog.averageDayOfSaleProfitMargin
                    ).toFixed(2) + "%"
                  : Number(soldStatisticsLog.averageProfitMargin).toFixed(2) +
                    "%"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="chart_cover">
        {isChartHasData ? (
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
                yAxes: [
                  {
                    id: "y-axis-1",
                    position: "left",
                    ticks: {
                      min: 0,
                      max:
                        salesType === "Presale Sale"
                          ? maxPresaleAmount
                          : salesType === "Day of sale"
                          ? maxDayOfSaleAmount
                          : maxSaleAmount,
                      callback: function(value, index, values) {
                        return values.some(ele => ele > 1)
                          ? numberFormatterwithZeroFraction(value)
                          : "";
                      }
                    }
                  },
                  {
                    id: "y-axis-2",
                    position: "right",
                    ticks: {
                      min: 0,
                      max:
                        salesType === "Presale Sale"
                          ? maxPresaleProfitAmount
                          : salesType === "Day of sale"
                          ? maxDayOfProfitAmount
                          : maxProfitAmount,
                      callback: function(value, index, values) {
                        return values.some(ele => ele > 1) ? "$" + value : "";
                      }
                    }
                  }
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false
                    }
                  }
                ]
              },
              title: {
                display: true,
                text: "",
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
        ) : (
          <Spinner />
        )}
      </div>

      {showCustomerInfo ? (
        <CustomerInfo
          isOpen={isActive => setShowCustomerInfo(isActive)}
          data={customerInfo}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Statistics;
