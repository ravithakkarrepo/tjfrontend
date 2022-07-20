import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
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

const SalesByVenue = ({
  fetchSalesByVenueRequest,
  salesByVenue,
  isSalesByVenueFetching
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
  const [onloadStart, setOnloadStart] = useState(
    moment(start).subtract(29, "days")
  );
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  );
  const [sortBy, setSortBy] = useState("sale");
  const [topVenues, setTopVenues] = useState(20);

  const noDataHandler = () => {
    if (isSalesByVenueFetching) return <Spinner spinnerTime={false} />;
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
    fetchSalesByVenueRequest({
      startDate: moment(start)
        .subtract(29, "days")
        .format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(end).format("YYYY-MM-DD HH:mm:ss"),
      sortBy,
      limit: topVenues
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

  const applyCallbackVenue = (startDate, endDate) => {
    setStart(startDate);
    setEnd(endDate);
    fetchSalesByVenueRequest({
      startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(endDate)
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      sortBy,
      limit: topVenues
    });
    setStartOnLoad(false);
  };

  const APICall = (limit, sortby) => {
    let startDate = startOnLoad ? onloadStart : start;
    fetchSalesByVenueRequest({
      startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(end)
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      sortBy: sortby ? sortby : sortBy,
      limit: limit ? limit : topVenues
    });
    // setStartOnLoad(false)
  };

  const getDateTime = () => {
    return SALESDATE(
      salesByVenue.venueSaleProfitList,
      moment(start).format("MM/DD/YYYY"),
      moment(end).format("MM/DD/YYYY")
    );
  };

  const getTotalSales = venueId => {
    const chartData = [];
    let labelArray = [];
    labelArray = SALESDATE(salesByVenue.venueSaleProfitList);
    labelArray.forEach(element => {
      let result = "",
        totalSaleby = 0,
        totalProfitby = 0,
        isVenueExist = false;

      result = salesByVenue.venueSaleProfitList.filter(
        log => log.time === element
      );

      isVenueExist = result[0]
        ? result[0].venues.find(venue => venue.venueId == venueId)
        : false;

      if (result.length > 0 && isVenueExist) {
        result[0].venues.map(venue => {
          if (venue.venueId == venueId) {
            sortBy == "sale"
              ? (totalSaleby = venue.totalSale)
              : (totalProfitby = venue.totalProfit);
          }
        });
        chartData.push(Number(sortBy == "sale" ? totalSaleby : totalProfitby));
      } else {
        chartData.push(0);
      }
    });
    // console.log(sortBy, "venueId :", venueId, chartData)
    return chartData;
  };

  const getDataSets = () => {
    let dataArray = [],
      topVenueLists = [];

    salesByVenue.topVenueList.forEach(e => {
      topVenueLists.push({ name: e.venueName, id: e._id });
    });

    // console.log("topVenueLists:", topVenueLists)
    topVenueLists.forEach((venue, i) => {
      let dataObj = {};
      dataObj.label = venue.name;
      dataObj.fill = false;
      dataObj.lineTension = 0.5;
      dataObj.backgroundColor = COLOR[i];
      dataObj.borderColor = COLOR[i];
      dataObj.borderWidth = 2;
      dataObj.pointStyle = POINTSTYLE[i];
      dataObj.data = getTotalSales(venue.id);
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
        <h2>Sale By Top Venues</h2>
      </div>
      <div className="row inner_box_body padL3T5">
        <div className="col-4 fl_eq_box">
          <div className="date_picker dateCls">
            <DateTimeRangeContainer
              ranges={ranges}
              start={startOnLoad ? onloadStart : start}
              end={end}
              local={local}
              applyCallback={applyCallbackVenue}
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
        </div>
        <div className="col-4 fl_eq_box">
          <Form.Control
            as="select"
            value={topVenues}
            onChange={evt => {
              setTopVenues(evt.target.value);
              APICall(evt.target.value, undefined);
            }}
          >
            <option value="">Select Top Venues</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </Form.Control>
        </div>
        <div className="col-4 fl_eq_box">
          <Form.Control
            as="select"
            value={sortBy}
            onChange={evt => {
              setSortBy(evt.target.value);
              APICall(undefined, evt.target.value);
            }}
          >
            <option value="sale">Sale By Top Venues</option>
            <option value="profit">Profit By Top Venues</option>
          </Form.Control>
        </div>

        <div className="col-12 mt-3">
          {isSalesByVenueFetching ? (
            <Spinner spinnerTime={false} />
          ) : (
            <>
              <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                <div className="inner_tbl">
                  <BootstrapTable
                    data={salesByVenue.topVenueList}
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
                    <TableHeaderColumn
                      dataField="venueName"
                      dataSort
                      sort={"asc"}
                    >
                      Venue Name
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
                        sortBy == "sale"
                          ? "Sale By Top Venues"
                          : "Profit By Top Venues",
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

export default SalesByVenue;
