/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "bootstrap-daterangepicker/daterangepicker.css";
import Spinner from "../../components/Spinner";
import { Line } from "react-chartjs-2";
import { percentFormatter } from "../../components/TableColumnFormatter";
import moment from "moment-timezone";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import Accordion from "react-bootstrap/Accordion";
import {
  boolSortFunc,
  dateFormatter,
  numberFormatterwithoutStyle
} from "../../utils";

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable";
import {
  getLabel,
  getData,
  getVenueData,
  getManagedEventsData,
  getEventByplatform
} from "../../utils/validation";

const selectRow = {
  mode: "checkbox",
  // showOnlySelected: true,
  clickToExpand: true,
  customComponent: CustomMultiSelectTable
};

const cellEditProp = {
  mode: "click",
  blurToSave: true,
  afterSaveCell: (oldValue, newValue, row, column) => {
    var keys = Object.keys(oldValue); //get keys from object as an array
    keys.forEach(function(key, i) {
      //loop through keys array
      if (key === newValue) oldValue[newValue] = row;
    });
  }
};
const urlFormatter = (cell, row) => {
  var ticketMasterUrl = `https://www1.ticketmaster.com/event/${row.eventId}`;
  return (
    <a
      href={
        row.eventUrl !== undefined && row.eventUrl !== null
          ? row.eventUrl
          : ticketMasterUrl
      }
      target="_blank"
    >
      {row.eventId}
    </a>
  );
};

const skyboxUrlFormatter = (cell, row) => {
  return (
    <a
      href={`https://www.vividseats.com/production/${row.skyBoxEventId}`}
      target="_blank"
    >
      {row.skyBoxEventId}
    </a>
  );
};

const venueUrlFormatter = (cell, row) => {
  return (
    <a href={row.url} target="_blank">
      {row.venueId}
    </a>
  );
};

const createCustomDeleteButton = onBtnClick => {
  return (
    <Button color="primary" className="btn-pill" onClick={onBtnClick}>
      BlackList
    </Button>
  );
};

const EventStatistic = ({
  isFetching,
  fetchEventStatisticRequest,
  eventStatistic,
  eventStatisticCount
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
  const [end, setEnd] = useState(
    moment(start)
      .add(23, "hours")
      .add(59, "minutes")
      .add(59, "seconds")
  );
  const [onloadStart, setOnloadStart] = useState(
    moment(start).subtract(6, "days")
  );
  const [eventType, setEventType] = useState("event_added");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(20);
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
    // fetchEventStatisticRequest("DAILY")
    fetchEventStatisticRequest({
      isCallCount: true,
      startDate: moment(start)
        .subtract(6, "days")
        .format("YYYY-MM-DD"),
      endDate: moment(end).format("YYYY-MM-DD"),
      page,
      type: eventType,
      sizePerPage
    });

    setData(eventStatistic.events);
    // if (eventType === "event_added") {
    //   setData(eventStatistic.eventsAdded)
    // } else if (eventType === "venue_added") {
    //   setData(eventStatistic.venuesAdded)
    // } else if (eventType === "event_cancel") {
    //   setData(eventStatistic.eventsCancel)
    // } else if (eventType === "event_postpond") {
    //   setData(eventStatistic.eventPostPond)
    // } else if (eventType === "event_monitor") {
    //   setData(eventStatistic.allEventsFromQueueToManageEvent)
    // } else {
    //   setData([])
    // }
  }, []);

  var chartData = {
    labels: getLabel(
      startOnLoad
        ? moment(start).subtract(6, "days")
        : moment(start).format("MM/DD/YYYY"),
      moment(end).format("MM/DD/YYYY")
    ),
    showInLegend: true,
    datasets: [
      {
        label: "Total Venues",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#86b1eb",
        borderColor: "#86b1eb",
        borderWidth: 2,
        pointStyle: "rectRot",
        data: getVenueData(
          eventStatisticCount.venuesAddedCountGraphData,
          startOnLoad
            ? moment(start)
                .subtract(6, "days")
                .format("MM/DD/YYYY")
            : moment(start).format("MM/DD/YYYY"),
          moment(end).format("MM/DD/YYYY")
        )
      }
    ]
  };

  var eventChartData = {
    labels: getLabel(
      startOnLoad
        ? moment(start).subtract(6, "days")
        : moment(start).format("MM/DD/YYYY"),
      moment(end).format("MM/DD/YYYY")
    ),
    showInLegend: true,
    datasets: [
      {
        label: "Total Events",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#86b1eb",
        borderColor: "#86b1eb",
        borderWidth: 2,
        pointStyle: "rectRot",
        data: getData(
          eventStatisticCount.eventsAddedGraphData,
          startOnLoad
            ? moment(start)
                .subtract(6, "days")
                .format("MM/DD/YYYY")
            : moment(start).format("MM/DD/YYYY"),
          moment(end).format("MM/DD/YYYY")
        )
      }
    ]
  };

  var eventManagedData = {
    labels: getLabel(
      startOnLoad
        ? moment(start).subtract(6, "days")
        : moment(start).format("MM/DD/YYYY"),
      moment(end).format("MM/DD/YYYY")
    ),
    showInLegend: true,
    datasets: [
      {
        label: "Total Events Managed",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "#86b1eb",
        borderColor: "#86b1eb",
        borderWidth: 2,
        pointStyle: "rectRot",
        data: getManagedEventsData(
          eventStatisticCount.allEventsFromQueueToManageEventGraphData,
          startOnLoad
            ? moment(start)
                .subtract(6, "days")
                .format("MM/DD/YYYY")
            : moment(start).format("MM/DD/YYYY"),
          moment(end).format("MM/DD/YYYY")
        )
      }
    ]
  };

  const isLineEmpty = Array.isArray(chartData)
    ? chartData.length
    : Object.keys(chartData).length;

  const expandRow = row => {
    return eventType !== "venue_added" ? (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>SkyBox VenueId</label>{" "}
          <span className="row_val">
            <a
              href={`https://www.ticketmaster.com/venue/${row.skyboxVenueId}`}
              target="_blank"
            >
              {row.skyboxVenueId}
            </a>
          </span>
        </div>

        <div className="expand_row_inner">
          <label>Available To Purchase</label>{" "}
          <span className="row_val">{`${row.availableToPurchase || ""}`}</span>
        </div>

        <div className="expand_row_inner">
          <label>Available Offer</label>{" "}
          <span className="row_val">{`${row.availableOffers || ""}`}</span>
        </div>
        <div className="expand_row_inner">
          <label>Created Date</label>{" "}
          <span className="row_val">
            {" "}
            {`${dateFormatter(row.created_date) || ""}`}{" "}
          </span>
        </div>
      </div>
    ) : (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>Created Date</label>{" "}
          <span className="row_val">
            {" "}
            {`${dateFormatter(row.created_date) || ""}`}{" "}
          </span>
        </div>
      </div>
    );
  };

  function remote(remoteObj) {
    // it means that only pagination you will handle by your own
    remoteObj.pagination = true;
    remoteObj.cellEdit = false;
    return remoteObj;
  }

  const iconFormatter = (cell, row) => {
    if (cell) {
      return (
        <div className="green_txt">
          <i className="fa fa-check"></i>
        </div>
      );
    } else {
      return (
        <div className="red_txt">
          <i className="fa fa-times"></i>
        </div>
      );
    }
  };

  const isExpandRow = () => {
    return true;
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
  };

  const handlePageChange = (page, sizePerPage) => {
    fetchEventStatisticRequest({
      startDate: moment(start).format("YYYY-MM-DD"),
      endDate: moment(end).format("YYYY-MM-DD"),
      page,
      type: eventType,
      sizePerPage
    });
    // }
  };

  const options = {
    page: eventStatistic.page, // which page you want to show as default
    // sizePerPageList: [10,  30, 50, 60],
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
    deleteBtn: createCustomDeleteButton,
    //handleConfirmDeleteRow: customConfirm,
    //defaultSortName: "formattedEventDate", // default sort column name
    //defaultSortOrder: "asc", // default sort order
    expandBy: "column",
    onPageChange: handlePageChange,
    noDataText: noDataHandler()
  };
  // function remote(remoteObj) {
  //   // it means that only pagination you will handle by your own
  //   remoteObj.pagination = true
  //   return remoteObj
  // }
  const cardstyle = {
    color: "black",
    textAlign: "center"
  };

  const applyCallback = (startDate, endDate) => {
    setStart(startDate);
    setEnd(endDate);
    fetchEventStatisticRequest({
      isCallCount: true,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      page,
      type: eventType,
      sizePerPage
    });
    setStartOnLoad(false);
  };

  return (
    <div className="animated fadeIn">
      <div className="full_width">
        <div className="page_name">
          <h2>Event-Venue Statistics</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="inner_box_body padL3T5">
              <div className="tbl_main  order_tbl_main nw_od_cls">
                <div className="table_head acc_main">
                  <div className="filterCV">
                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Accordion.Toggle
                          className="cm_ttl"
                          as={Card.Header}
                          eventKey="0"
                          // onClick={setToggleValue("collapse")}
                        >
                          <h2> Start & End Date</h2>
                        </Accordion.Toggle>

                        <Accordion.Collapse
                          //className={toggleClass}
                          eventKey="0"
                        >
                          <div className="select_eq filter_filed">
                            <div className="fl_eq_box rangeCls">
                              <div className="date_picker dateCls">
                                <DateTimeRangeContainer
                                  ranges={ranges}
                                  start={startOnLoad ? onloadStart : start}
                                  end={end}
                                  local={local}
                                  // maxDate={maxDate}
                                  applyCallback={applyCallback}
                                  style={{
                                    standaloneLayout: { left: "149px" }
                                  }}
                                >
                                  <Form.Control
                                    id="formControlsTextB"
                                    type="text"
                                    label="Text"
                                    readOnly
                                    value={
                                      startOnLoad
                                        ? moment(start)
                                            .subtract(6, "days")
                                            .format("MM/DD/YYYY") +
                                          " To " +
                                          moment(end).format("MM/DD/YYYY")
                                        : moment(start).format("MM/DD/YYYY") +
                                          " To " +
                                          moment(end).format("MM/DD/YYYY")
                                    }
                                    placeholder="Search...."
                                  />

                                  <span className="input-group-btn">
                                    <Button className="default date-range-toggle">
                                      <i className="fa fa-calendar" />
                                    </Button>
                                  </span>
                                </DateTimeRangeContainer>
                              </div>
                            </div>
                          </div>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </div>

                <div className="white_box mrgbtm50">
                  <div className="cm_ttl dis_inline">
                    <h2>Event Info</h2>
                  </div>

                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main  order_tbl_main statisctics_bx">
                      <div className="inner_tbl">
                        <Card>
                          <Card.Body>
                            <Card.Img
                              src={require("./../../assets/img/event-added.png")}
                              alt="Event Added"
                            />
                            <Card.Text>
                              <span className="info_txt_large">
                                {numberFormatterwithoutStyle(
                                  eventStatisticCount.eventsAddedCount
                                )}
                              </span>

                              <Card.Title>Event Added</Card.Title>
                              <Card.Title>
                                <p className="info_txt_cls">
                                  <span>
                                    T:{" "}
                                    {numberFormatterwithoutStyle(
                                      eventStatisticCount.tmEventsCount
                                    ) || 0}
                                  </span>{" "}
                                  <span>
                                    E:{" "}
                                    {numberFormatterwithoutStyle(
                                      eventStatisticCount.evenueEventsCount
                                    ) || 0}
                                  </span>
                                  <span>
                                    AXS:{" "}
                                    {numberFormatterwithoutStyle(
                                      eventStatisticCount.axsEventsCount
                                    ) || 0}
                                  </span>
                                </p>
                              </Card.Title>
                            </Card.Text>
                          </Card.Body>
                        </Card>

                        <Card>
                          <Card.Body>
                            <Card.Img
                              src={require("./../../assets/img/venue-added.png")}
                              alt="Venue Added"
                            />
                            <Card.Text>
                              <span className="info_txt_large">
                                {numberFormatterwithoutStyle(
                                  eventStatisticCount.venuesAddedCount
                                )}
                              </span>
                              <Card.Title>Venue Added</Card.Title>
                              <Card.Title>
                                <p className="info_txt_cls">
                                  <span>
                                    T:{" "}
                                    {numberFormatterwithoutStyle(
                                      eventStatisticCount.tmVenueCount
                                    ) || 0}
                                  </span>{" "}
                                  <span>
                                    E:{" "}
                                    {numberFormatterwithoutStyle(
                                      eventStatisticCount.evenueCount
                                    ) || 0}
                                  </span>
                                  <span>
                                    AXS:{" "}
                                    {numberFormatterwithoutStyle(
                                      eventStatisticCount.axsVenueCount
                                    ) || 0}
                                  </span>
                                </p>
                              </Card.Title>
                            </Card.Text>
                          </Card.Body>
                        </Card>

                        <Card>
                          <Card.Body>
                            <Card.Img
                              src={require("./../../assets/img/event-cancel.png")}
                              alt="Event Cancel"
                            />
                            <Card.Text>
                              <span className="info_txt_large">
                                {numberFormatterwithoutStyle(
                                  eventStatisticCount.eventsCancelCount
                                )}
                              </span>
                              <Card.Title>Event Cancel</Card.Title>
                            </Card.Text>
                          </Card.Body>
                        </Card>

                        <Card>
                          <Card.Body>
                            <Card.Img
                              src={require("./../../assets/img/event-postpone.png")}
                              alt="Event PostPoned"
                            />
                            <Card.Text>
                              <span className="info_txt_large">
                                {numberFormatterwithoutStyle(
                                  eventStatisticCount.eventPostPondCount
                                )}
                              </span>
                              <Card.Title>Event PostPoned</Card.Title>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>

                      <br />
                      <br />

                      <div className="inner_tbl" style={{ marginTop: "1%" }}>
                        <Card>
                          <Card.Body>
                            <Card.Img
                              src={require("./../../assets/img/event-postpone.png")}
                              alt="Event Managed From Queue"
                            />
                            <Card.Text>
                              <span className="info_txt_large">
                                {numberFormatterwithoutStyle(
                                  eventStatisticCount.allEventsFromQueueToManageEventCount
                                )}
                              </span>
                              <Card.Title>Event Managed From Queue</Card.Title>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="white_box mrgbtm50">
                  <div className="cm_ttl dis_inline">
                    <h2>Event/Venue Statistic Table</h2>
                  </div>
                  <div className="inner_box_body padL3T5">
                    <div className="tbl_main tranfer_lst_tbl_main">
                      <div className="table_head log_thead">
                        <div className="select_eq">
                          <div className="fl_eq_box">
                            <Form.Control
                              as="select"
                              value={eventType}
                              onChange={evt => {
                                setEventType(evt.target.value);
                                fetchEventStatisticRequest({
                                  // isCallCount: true,
                                  startDate: moment(start).format("YYYY-MM-DD"),
                                  endDate: moment(end).format("YYYY-MM-DD"),
                                  page,
                                  type: evt.target.value,
                                  sizePerPage
                                });
                              }}
                            >
                              <option value="event_added">Event Added</option>
                              <option value="venue_added">Venue Added</option>
                              <option value="event_cancel">Event Cancel</option>
                              <option value="event_postpond">
                                Event PostPoned
                              </option>
                              <option value="event_monitor">
                                Event managed
                              </option>
                            </Form.Control>
                          </div>
                        </div>
                      </div>

                      <div className="inner_tbl">
                        {isFetching ? (
                          <Spinner spinnerTime={false} />
                        ) : eventType !== "venue_added" ? (
                          <BootstrapTable
                            data={eventStatistic.events}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            cellEdit={cellEditProp}
                            selectRow={selectRow}
                            deleteRow
                            tableHeaderClass="custom-select-header-class"
                            tableBodyClass="custom-select-body-class"
                            expandableRow={isExpandRow}
                            expandComponent={expandRow}
                            expandColumnOptions={{ expandColumnVisible: true }}
                            search
                            fetchInfo={{
                              dataTotalSize:
                                eventType === "event_added"
                                  ? eventStatisticCount.eventsAddedCount
                                  : eventType === "venue_added"
                                  ? eventStatisticCount.venuesAddedCount
                                  : eventType === "event_cancel"
                                  ? eventStatisticCount.eventsCancelCount
                                  : eventType === "event_postpond"
                                  ? eventStatisticCount.eventPostPondCount
                                  : eventStatisticCount.allEventsFromQueueToManageEventCount
                            }}
                            // fetchInfo={{ dataTotalSize: data.length }}
                            // cellClick={handleTableChange}
                            remote={remote}
                            blurToSave={true}
                            // ref={filterTable}
                          >
                            <TableHeaderColumn
                              dataField="eventId"
                              isKey
                              expandable={false}
                              dataFormat={urlFormatter}
                              editable={false}
                            >
                              EventId/TM URL
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="eventName"
                              expandable={false}
                              editable={false}
                            >
                              Event
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="eventAddress"
                              expandable={false}
                              editable={false}
                            >
                              Location
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="eventDate"
                              dataSort
                              expandable={false}
                              editable={false}
                              sort={"asc"}
                              dataFormat={dateFormatter}
                            >
                              Date
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
                              dataField="skyBoxEventId"
                              dataFormat={skyboxUrlFormatter}
                              editable={false}
                            >
                              SkyBoxEventId
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField="pctVenueAvail"
                              // dataSort
                              expandable={false}
                              dataFormat={percentFormatter}
                              editable={false}
                            >
                              PctAvail
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
                              dataField="presale"
                              dataSort
                              sortFunc={boolSortFunc}
                              editable={false}
                              dataFormat={iconFormatter}
                            >
                              PreSale
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
                              dataField="is_deleted"
                              editable={false}
                              dataFormat={iconFormatter}
                            >
                              BlackList
                            </TableHeaderColumn>
                          </BootstrapTable>
                        ) : (
                          <BootstrapTable
                            data={eventStatistic.events}
                            version="4"
                            striped
                            hover
                            pagination
                            options={options}
                            cellEdit={cellEditProp}
                            selectRow={selectRow}
                            deleteRow
                            tableHeaderClass="custom-select-header-class"
                            tableBodyClass="custom-select-body-class"
                            expandableRow={isExpandRow}
                            expandComponent={expandRow}
                            expandColumnOptions={{ expandColumnVisible: true }}
                            search
                            fetchInfo={{
                              dataTotalSize:
                                eventType === "event_added"
                                  ? eventStatisticCount.eventsAddedCount
                                  : eventType === "venue_added"
                                  ? eventStatisticCount.venuesAddedCount
                                  : eventType === "event_cancel"
                                  ? eventStatisticCount.eventsCancelCount
                                  : eventType === "event_postpond"
                                  ? eventStatisticCount.eventPostPondCount
                                  : eventStatisticCount.allEventsFromQueueToManageEventCount
                            }}
                            // fetchInfo={{ dataTotalSize: data.length }}
                            // cellClick={handleTableChange}
                            remote={remote}
                            blurToSave={true}
                            // ref={filterTable}
                          >
                            <TableHeaderColumn hidden isKey dataField="_id">
                              Id
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="name">
                              Name
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="city">
                              City
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="state">
                              State
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="address">
                              Address
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="zip">
                              Zip Code
                            </TableHeaderColumn>

                            <TableHeaderColumn
                              dataField="venueId"
                              editable={false}
                              dataFormat={venueUrlFormatter}
                            >
                              TMasterVenueId
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="skyboxVenueId">
                              SkyboxVenueId
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              editable={false}
                              dataField="eventsCount"
                            >
                              eventsCount
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              expandable={false}
                              //dataField="is_deleted"
                              dataField="is_blacklist"
                              editable={false}
                              dataFormat={iconFormatter}
                            >
                              BlackList
                            </TableHeaderColumn>
                          </BootstrapTable>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fl_w">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="white_box mrgbtm50">
                        <div className="cm_ttl dis_inline">
                          <h2>Event Statistic</h2>
                        </div>

                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main  order_tbl_main">
                            <div className="inner_tbl">
                              <div className="chart_cover">
                                {isLineEmpty ? (
                                  <Line
                                    height={350}
                                    data={eventChartData}
                                    options={{
                                      maintainAspectRatio: false,
                                      tooltips: {
                                        callbacks: {
                                          label: function(t, d) {
                                            var xLabel =
                                              d.datasets[t.datasetIndex].label;
                                            var yLabel = numberFormatterwithoutStyle(
                                              t.yLabel
                                            );
                                            return xLabel + ": " + yLabel;
                                          }
                                        }
                                      },
                                      scales: {
                                        yAxes: [
                                          {
                                            ticks: {
                                              beginAtZero: true,
                                              callback: function(
                                                value,
                                                index,
                                                values
                                              ) {
                                                return numberFormatterwithoutStyle(
                                                  value
                                                );
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="white_box mrgbtm50">
                        <div className="cm_ttl dis_inline">
                          <h2>Venue Statistic</h2>
                        </div>

                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main  order_tbl_main">
                            <div className="inner_tbl">
                              <div className="chart_cover">
                                {isLineEmpty ? (
                                  <Line
                                    height={350}
                                    data={chartData}
                                    options={{
                                      maintainAspectRatio: false,
                                      tooltips: {
                                        callbacks: {
                                          label: function(t, d) {
                                            var xLabel =
                                              d.datasets[t.datasetIndex].label;
                                            var yLabel = numberFormatterwithoutStyle(
                                              t.yLabel
                                            );
                                            return xLabel + ": " + yLabel;
                                          }
                                        }
                                      },
                                      scales: {
                                        yAxes: [
                                          {
                                            ticks: {
                                              beginAtZero: true,
                                              callback: function(
                                                value,
                                                index,
                                                values
                                              ) {
                                                return numberFormatterwithoutStyle(
                                                  value
                                                );
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="white_box mrgbtm50">
                        <div className="cm_ttl dis_inline">
                          <h2>Event Managed From Queue Statistic</h2>
                        </div>

                        <div className="inner_box_body padL3T5">
                          <div className="tbl_main  order_tbl_main">
                            <div className="inner_tbl">
                              <div className="chart_cover">
                                {isLineEmpty ? (
                                  <Line
                                    height={350}
                                    data={eventManagedData}
                                    options={{
                                      maintainAspectRatio: false,
                                      tooltips: {
                                        callbacks: {
                                          label: function(t, d) {
                                            var xLabel =
                                              d.datasets[t.datasetIndex].label;
                                            var yLabel = numberFormatterwithoutStyle(
                                              t.yLabel
                                            );
                                            return xLabel + ": " + yLabel;
                                          }
                                        }
                                      },
                                      scales: {
                                        yAxes: [
                                          {
                                            ticks: {
                                              beginAtZero: true,
                                              callback: function(
                                                value,
                                                index,
                                                values
                                              ) {
                                                return numberFormatterwithoutStyle(
                                                  value
                                                );
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventStatistic;
