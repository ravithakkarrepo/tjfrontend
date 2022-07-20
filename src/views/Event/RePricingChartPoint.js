import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Line } from "react-chartjs-2";
import Spinner from "../../components/Spinner";
import { COLOR, POINTSTYLE } from "../../constants/listings";

const RePricePonitChart = ({
  isFetching,
  fetchSecodaryLogsRequest,
  secondaryMargetList,
  eventId
}) => {
  const [chartType, setChartType] = useState("Price");
  const [priceType, setPricetype] = useState("average_price");
  const [showPriceType, setShowPricetype] = useState(false);
  useEffect(() => {
    fetchSecodaryLogsRequest({ eventId });
  }, []);

  const getPricetime = () => {
    var chartTime = ["00", "1:00 am", "2:00 am", "3:00 am", "4:00 am"];
    // for (var i = 0; i < secondaryMargetList.length; i++) {
    //   var minutes = pricePointList[i].time.split(":")[1]
    //   var time = pricePointList[i].time.replace(":00", "")
    //   if (parseInt(time) < 12) {
    //     time = pricePointList[i].time + " AM"
    //   } else {
    //     if (time == 12) {
    //       time = pricePointList[i].time + " PM"
    //     } else {
    //       var rowTime = time - 12
    //       if (rowTime < 10) {
    //         rowTime = "0" + rowTime + minutes + "PM"
    //       } else {
    //         rowTime = rowTime + minutes + "PM"
    //       }
    //       time = rowTime
    //     }
    //   }
    //   chartTime.push(time)
    // }
    return chartTime;
  };

  const getdataPoint = param => {
    let result = [45, 52, 56, 72, 99, 123, 135, 152];
    //   for (var i = 0; i < pricePointList.length; i++) {
    //     for (var j = 0; j < pricePointList[i].pricePoint.length; j++) {
    //       if (pricePointList[i].pricePoint[j].price === param) {
    //         result.push(pricePointList[i].pricePoint[j].totalTickets)
    //       }
    //     }
    //   }
    return result;
  };

  const getDataSet = () => {
    var jsonObj = [];
    var price = [];
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        price.push(
          //pricePointList[0].pricePoint[j].price +
          j + "-" + POINTSTYLE[j] + "-" + COLOR[j]
        );
      }
      break;
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

  //   var chartData = {
  //     labels: getPricetime(),
  //     showInLegend: true,
  //     datasets: [
  //       {
  //         //label: "Sales By Hours",
  //         label: ["123", "345", "567"],
  //         fill: false,
  //         lineTension: 0.5,
  //         backgroundColor: "#86b1eb",
  //         borderColor: "#86b1eb",
  //         borderWidth: 2,
  //         pointStyle: "rectRot",
  //         // data: getTotalSales()
  //         data: [45, 52, 56, 72, 99, 123, 135, 152]
  //       }
  //     ]
  //   }

  const isLineEmpty = Array.isArray(chartData)
    ? chartData.length
    : Object.keys(chartData).length;

  return (
    <div>
      <div className="col-sm-12">
        <div className="white_box mrgbtm50">
          <div className="cm_ttl">
            <h2>Secondary Reprice</h2>
          </div>
          <div className="inner_box_body">
            <div className="table_head log_thead">
              <div className="row">
                <div className="col-sm-6">
                  <div className="select_eq" style={{ float: "left" }}>
                    <div className="fl_eq_box">
                      <Form.Control
                        as="select"
                        value={chartType}
                        onChange={evt => {
                          setChartType(evt.target.value);
                          if (evt.target.value === "Price") {
                            setShowPricetype(true);
                          } else {
                            setShowPricetype(false);
                          }
                          //   fetchPricePointRequest({
                          //     eventId,
                          //     groupBy: evt.target.value
                          //   })
                        }}
                      >
                        <option value="Price">By Price</option>
                        <option value="Ticket">By Ticket</option>
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
                          value={chartType}
                          onChange={evt => {
                            setChartType(evt.target.value);
                          }}
                        >
                          <option value="Average_price">Average Price</option>
                          <option value="max_price">Max Price</option>
                          <option value="min_price ">Min Price</option>
                          <option value="medium_price">Medium Price</option>
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
              {isLineEmpty ? (
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
                          // ticks: {
                          //   callback: function(value, index, values) {
                          //     return "$" + value
                          //   }
                          // }
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RePricePonitChart;
