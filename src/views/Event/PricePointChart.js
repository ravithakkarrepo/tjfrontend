/* eslint-disable no-redeclare */
/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Line } from "react-chartjs-2";
import Spinner from "../../components/Spinner";
import { COLOR, POINTSTYLE } from "../../constants/listings";

const PricePonitChart = ({
  isFetching,
  fetchPricePointRequest,
  pricePointList,
  eventId,
  chartType,
  priceFetching
}) => {
  // const [chartType, setChartType] = useState("HOURLY")
  useEffect(() => {
    //fetchPricePointRequest({ eventId, groupBy: "HOURLY" })
    fetchPricePointRequest({ eventId, groupBy: chartType });
  }, []);

  const getPricetime = () => {
    var chartTime = [];
    for (var i = 0; i < pricePointList.length; i++) {
      if (chartType === "HOURLY") {
        if (pricePointList[i].time !== undefined) {
          var minutes = pricePointList[i].time.split(" ")[1].split(".")[1];

          var time = pricePointList[i].time.split(" ")[1].substring(0, 2);
          if (parseInt(time) < 12) {
            time = pricePointList[i].time.split(" ")[1] + " AM";
          } else {
            if (parseInt(time) === 12) {
              time = pricePointList[i].time.split(" ")[1] + " PM";
            } else {
              var rowTime = parseInt(time) - 12;
              if (rowTime < 10) {
                rowTime = "0" + rowTime + "." + minutes + "PM";
              } else {
                rowTime = rowTime + "." + minutes + "PM";
              }
              time = rowTime;
            }
          }
          chartTime.push(time);
        }
      } else {
        chartTime.push(pricePointList[i].eventDate);
      }
    }
    return chartTime;
  };

  const getdataPoint = param => {
    let result = [];
    for (var i = 0; i < pricePointList.length; i++) {
      if (chartType === "HOURLY") {
        if (pricePointList[i].pricePoint.some(item => item.price === param)) {
          pricePointList[i].pricePoint.filter(function(item) {
            if (item.price === param) {
              result.push(item.totalTickets);
            }
          });
        } else {
          result.push(0);
        }
      } else {
        if (pricePointList[i].pricePoint.some(item => item.price === param)) {
          pricePointList[i].pricePoint.filter(function(item) {
            if (item.price === param) {
              result.push(item.totalTicket);
            }
          });
        } else {
          result.push(0);
        }
      }
    }
    return result;
  };

  const getDataSet = () => {
    var jsonObj = [];
    var price = [];

    var finalPrice = [];
    for (var i = 0; i < pricePointList.length; i++) {
      if (chartType === "HOURLY") {
        for (var j = 0; j < pricePointList[i].pricePoint.length; j++) {
          if (!price.includes(pricePointList[i].pricePoint[j].price)) {
            price.push(pricePointList[i].pricePoint[j].price);
          }
        }
      } else {
        if (pricePointList[i].pricePoint.length !== 0) {
          for (var j = 0; j < pricePointList[i].pricePoint.length; j++) {
            if (pricePointList[i].pricePoint[j] !== undefined) {
              for (var k = 0; k < pricePointList[i].pricePoint.length; k++) {
                if (!price.includes(pricePointList[i].pricePoint[k].price)) {
                  price.push(pricePointList[i].pricePoint[k].price);
                }
              }
            }
          }
        }
      }
    }

    for (var i = 0; i < price.length; i++) {
      finalPrice.push(price[i] + "-" + POINTSTYLE[i] + "-" + COLOR[i]);
    }

    finalPrice.forEach(element => {
      var item = {};
      item["label"] = element.split("-")[0];
      item["fill"] = false;
      item["lineTension"] = 0.5;
      item["backgroundColor"] = element.split("-")[2];
      item["borderColor"] = element.split("-")[2];
      item["borderWidth"] = 2;
      item["pointStyle"] = element.split("-")[1];
      item["data"] = getdataPoint(element.split("-")[0]);

      if (chartType === "DAILY") {
        let splitIndex = item.data.length - 14;

        if (splitIndex >= 0) {
          let newArr = item.data.slice(splitIndex, item.data.length);
          let hasOnlyZeroData = newArr.filter(e => e.toString() !== "0").length;
          if (hasOnlyZeroData > 0) jsonObj.push(item);
        } else {
          jsonObj.push(item);
        }
      } else {
        jsonObj.push(item);
      }
    });
    if (chartType === "DAILY") {
      jsonObj = jsonObj.map((e, i) => {
        return {
          ...e,
          backgroundColor: COLOR[i] !== undefined ? COLOR[i] : "#565656",
          borderColor: COLOR[i] !== undefined ? COLOR[i] : "#565656",
          pointStyle: POINTSTYLE[i] !== undefined ? POINTSTYLE[i] : "#565656"
        };
      });
    }
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
        <h2>Price Point Chart</h2>
      </div>
      <div className="inner_box_body">
        {/* <div className="table_head log_thead">
              <div className="select_eq">
                <div className="fl_eq_box">
                  <Form.Control
                    as="select"
                    value={chartType}
                    onChange={evt => {
                      setChartType(evt.target.value)
                      if (evt.target.value === "HOURLY") {
                      } else if (evt.target.value === "DAILY") {
                      }
                      fetchPricePointRequest({
                        eventId,
                        groupBy: evt.target.value
                      })
                    }}
                  >
                    <option value="HOURLY">Hourly</option>
                    <option value="DAILY">Daily</option>
                  </Form.Control>
                </div>
              </div>
            </div> */}

        <div className="chart_cover">
          {priceFetching ? (
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

export default PricePonitChart;
