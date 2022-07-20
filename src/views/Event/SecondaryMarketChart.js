import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Line } from "react-chartjs-2";
import Spinner from "../../components/Spinner";
import { COLOR, POINTSTYLE } from "../../constants/listings";

const SecondaryMarketChart = ({
  isFetching,
  fetchSecodaryLogsRequest,
  secondaryMargetList,
  eventId,
  chartType,
  secondaryFetching
}) => {
  const [priceChartType, setPriceChartType] = useState("Price");
  const [priceType, setPricetype] = useState("average_price");
  const [showPriceType, setShowPricetype] = useState(true);
  useEffect(() => {
    fetchSecodaryLogsRequest({ eventId, groupBy: chartType });
  }, []);
  const getPricetime = () => {
    var chartTime = [];
    for (var i = 0; i < Object.keys(secondaryMargetList).length; i++) {
      chartTime.push(Object.keys(secondaryMargetList)[i]);
    }
    return chartTime;
  };

  const getdataPoint = param => {
    let result = [];
    for (var i = 0; i < Object.values(secondaryMargetList).length; i++) {
      if (Object.values(secondaryMargetList)[i].length !== 0) {
        for (var j = 0; j < Object.values(secondaryMargetList)[i].length; j++) {
          if (Object.values(secondaryMargetList)[i].length !== 0) {
            for (
              var k = 0;
              k < Object.keys(Object.values(secondaryMargetList)[i][j]).length;
              k++
            ) {
              if (
                Object.keys(Object.values(secondaryMargetList)[i][j])[k] ===
                param
              ) {
                if (
                  priceChartType === "Price" &&
                  priceType === "average_price"
                ) {
                  result.push(
                    Object.values(Object.values(secondaryMargetList)[i][j])[k]
                      .averagePrice
                  );
                }
                if (priceChartType === "Price" && priceType === "max_price") {
                  result.push(
                    Object.values(Object.values(secondaryMargetList)[i][j])[k]
                      .maxPrice
                  );
                }
                if (priceChartType === "Price" && priceType === "min_price") {
                  result.push(
                    Object.values(Object.values(secondaryMargetList)[i][j])[k]
                      .minPrice
                  );
                }
                if (
                  priceChartType === "Price" &&
                  priceType === "medium_price"
                ) {
                  result.push(
                    Object.values(Object.values(secondaryMargetList)[i][j])[k]
                      .medianPrice
                  );
                }
                if (priceChartType === "Ticket") {
                  result.push(
                    Object.values(Object.values(secondaryMargetList)[i][j])[k]
                      .numTickets
                  );
                }
              }
            }
          }
        }
      } else {
        result.push(0);
      }
    }
    return result;
  };

  const getDataSet = () => {
    var jsonObj = [];
    var price = [];
    for (var i = 0; i < Object.values(secondaryMargetList).length; i++) {
      if (Object.values(secondaryMargetList)[i].length !== 0) {
        for (var j = 0; j < Object.values(secondaryMargetList)[i].length; j++) {
          if (Object.values(secondaryMargetList)[i].length !== 0) {
            for (
              var k = 0;
              k < Object.keys(Object.values(secondaryMargetList)[i][j]).length;
              k++
            ) {
              if (
                Object.keys(Object.values(secondaryMargetList)[i][j])[k] !==
                undefined
              ) {
                price.push(
                  Object.keys(Object.values(secondaryMargetList)[i][j])[k] +
                    "-" +
                    POINTSTYLE[j] +
                    "-" +
                    COLOR[j]
                );
              }
            }
          }
        }
        break;
      }
    }

    price.forEach(element => {
      var item = {};
      item["label"] = element.split("-")[0];
      item["fill"] = false;
      item["lineTension"] = 0.5;
      item["backgroundColor"] = element.split("-")[2];
      item["borderColor"] = element.split("-")[2];
      item["borderWidth"] = 2;
      item["pointStyle"] = element.split("-")[1];
      item["data"] = getdataPoint(element.split("-")[0]);
      jsonObj.push(item);
    });

    return jsonObj;
  };

  var chartData = {
    labels: getPricetime(),
    showInLegend: true,
    datasets: getDataSet()
  };

  const isLineEmpty = Array.isArray(chartData)
    ? chartData.length
    : Object.keys(chartData).length;

  return (
    <div className="white_box">
      <div className="cm_ttl">
        <h2>Secondary Market</h2>
      </div>
      <div className="inner_box_body">
        <div className="table_head log_thead">
          <div className="row">
            <div className="col-sm-6">
              <div className="select_eq" style={{ float: "left" }}>
                <div className="fl_eq_box">
                  <Form.Control
                    as="select"
                    value={priceChartType}
                    onChange={evt => {
                      setPriceChartType(evt.target.value);
                      if (evt.target.value === "Price") {
                        setShowPricetype(true);
                      } else {
                        setShowPricetype(false);
                      }
                    }}
                  >
                    <option value="Price">By Price</option>
                    <option value="Ticket">By Quantity</option>
                  </Form.Control>
                </div>
              </div>
            </div>
            <div className="col-sm-6" style={{ float: "right" }}>
              <div className="select_eq">
                <div className="fl_eq_box">
                  {showPriceType ? (
                    <Form.Control
                      as="select"
                      value={priceType}
                      onChange={evt => {
                        setPricetype(evt.target.value);
                      }}
                    >
                      <option value="average_price">Average Price</option>
                      <option value="max_price">Max Price</option>
                      <option value="min_price">Min Price</option>
                      <option value="medium_price">Median Price</option>
                    </Form.Control>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="chart_cover">
          {secondaryFetching ? (
            <Spinner spinnerTime={false} />
          ) : isLineEmpty ? (
            <Line
              height={350}
              data={chartData}
              options={{
                maintainAspectRatio: false,
                scales: {
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
            <Spinner spinnerTime={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondaryMarketChart;
