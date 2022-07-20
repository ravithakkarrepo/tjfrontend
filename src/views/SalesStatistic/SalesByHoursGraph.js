import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Spinner from "../../components/Spinner";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Line } from "react-chartjs-2";
import { COLOR, POINTSTYLE } from "../../constants/listings";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {
  numberFormatter,
  numberFormatterwithZeroFraction,
  numberFormatterwithoutStyle,
  percentageFormatter
} from "../../utils";

const SalesByHours = ({
  fetchSalesByHourRequest,
  salesByHour,
  isSalesByHourFetching
}) => {
  const [sortBy, setSortBy] = useState("value");

  const noDataHandler = () => {
    if (isSalesByHourFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
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
    expandBy: "column",
    noDataText: noDataHandler()
  };

  useEffect(() => {
    fetchSalesByHourRequest();
  }, []);

  const getDateTime = () => {
    return salesByHour.data.map(obj => obj._id);
  };

  const getDataSets = () => {
    let dataSet = [],
      dataObj = {},
      dataArray = [];

    salesByHour.data.forEach(e => {
      dataSet.push(sortBy == "value" ? e.totalSale : e.totalOrders);
    });

    dataObj.label = sortBy == "value" ? "Total Sale Value" : "Total Sale Count";
    dataObj.fill = false;
    dataObj.lineTension = 0.5;
    dataObj.backgroundColor = COLOR[0];
    dataObj.borderColor = COLOR[0];
    dataObj.borderWidth = 2;
    dataObj.pointStyle = POINTSTYLE[0];
    dataObj.data = dataSet;
    dataArray.push(dataObj);
    return dataArray;
  };

  var chartData = {
    labels: getDateTime(),
    datasets: getDataSets()
  };

  return (
    <div className="white_box">
      <div className="cm_ttl dis_inline">
        <h2>Sale By Hours Before Events</h2>
      </div>
      <div className="row inner_box_body padL3T5">
        <div className="col-4 fl_eq_box">
          <Form.Control
            as="select"
            value={sortBy}
            onChange={evt => {
              setSortBy(evt.target.value);
            }}
          >
            <option value="value">Total Sale Value</option>
            <option value="count">Total Sale Count</option>
          </Form.Control>
        </div>

        <div className="col-12 mt-3">
          {isSalesByHourFetching ? (
            <Spinner spinnerTime={false} />
          ) : (
            <>
              <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                <div className="inner_tbl">
                  <BootstrapTable
                    data={salesByHour.data}
                    version="4"
                    striped
                    hover
                    pagination
                    options={options}
                    tableHeaderClass="custom-select-header-class"
                    tableBodyClass="custom-select-body-class"
                  >
                    <TableHeaderColumn dataField="_id" hidden isKey>
                      _id
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="_id" dataSort sort={"asc"}>
                      Hours Before Event
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="totalSale"
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
                          var yLabel =
                            sortBy == "value"
                              ? numberFormatter(t.yLabel)
                              : numberFormatterwithoutStyle(t.yLabel);
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
                              if (sortBy == "value") {
                                return numberFormatterwithZeroFraction(label);
                              } else {
                                return numberFormatterwithoutStyle(label);
                              }
                            }
                          }
                        }
                      ]
                    },
                    title: {
                      display: true,
                      text:
                        sortBy == "value"
                          ? "Sale By Hours Before Events"
                          : "Sale Count By Hours Before Events",
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

export default SalesByHours;
