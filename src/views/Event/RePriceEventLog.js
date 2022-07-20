/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useEffect, useState, useRef } from "react";
import { Button, OverlayTrigger, Tooltip, Form, Row } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import DatetimeRangePicker from "react-bootstrap-daterangepicker";
import moment from "moment-timezone";

const RePriceEventLog = ({
  rePriceEventLog,
  fetchRePriceEventLogRequest,
  isEventFetching,
  eventId
}) => {
  var rePrice = [];
  if (rePriceEventLog != undefined) {
    for (var i = 0; i < rePriceEventLog.length; i++) {
      for (var j = 0; j < rePriceEventLog[i].jockeyListings.length; j++) {
        var item = {};
        item["time"] = rePriceEventLog[i].time;
        item["eventDate"] = rePriceEventLog[i].date;
        item["section"] = rePriceEventLog[i].jockeyListings[j].section;
        item["row"] = rePriceEventLog[i].jockeyListings[j].row;
        item["unitCost"] = rePriceEventLog[i].jockeyListings[j].unitCost;
        item["quantity"] = rePriceEventLog[i].jockeyListings[j].quantity;
        item["reason"] = rePriceEventLog[i].jockeyListings[j].reason;
        item["oldListingPrice"] =
          rePriceEventLog[i].jockeyListings[j].oldListingPrice;
        item["suggestedBrokerPrice"] =
          rePriceEventLog[i].jockeyListings[j].suggestedBrokerPrice;
        item["newListingPrice"] =
          rePriceEventLog[i].jockeyListings[j].newListingPrice !== undefined
            ? rePriceEventLog[i].jockeyListings[j].newListingPrice
            : "-";
        item["description"] = rePriceEventLog[i].jockeyListings[j].description;
        rePrice.push(item);
      }
    }
  }

  // const [Date1, setDate] = useState("")
  // const [Time, settime] = useState("")
  const [SearchStartDate, setSearchStartDate] = useState();
  const [SearchEndDate, setSearchEndDate] = useState();
  const [searchfilter, setSearchfilter] = useState(true);
  const [sectionfilter, setSectionfilter] = useState(true);
  const [unitCostfilter, setUnitfilter] = useState(true);
  // const refEventDate = useRef(null)
  //   const [defaultSort, setdefaultSort] = useState("time")
  //   const [defaultOrder, setdefaultOrder] = useState("desc")

  useEffect(() => {
    var monthStart = "";
    var monthEnd = "";
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth(),
      d = date.getDate();
    var firstDate = date.getDate() - 7;
    var StartDate = new Date(y, m, firstDate);
    var EndDate = new Date(y, m, d);
    var startDate = new Date(StartDate).getDate();

    if (new Date(StartDate).getMonth() < 10) {
      monthStart = "0" + parseInt(new Date(StartDate).getMonth() + 1);
    } else {
      monthStart = parseInt(new Date(StartDate).getMonth() + 1);
    }

    if (new Date(date).getMonth() < 10) {
      monthEnd = "0" + parseInt(new Date(date).getMonth() + 1);
    } else {
      monthEnd = parseInt(new Date(date).getMonth() + 1);
    }
    if (startDate < 10) startDate = "0" + startDate;
    if (d < 10) d = "0" + d;
    var SearchStartDate = moment(StartDate, "MM/DD/YYYY");
    var SearchEndDate = moment(EndDate, "MM/DD/YYYY");
    StartDate = y + "-" + monthStart + "-" + startDate;
    EndDate = y + "-" + monthEnd + "-" + d;

    setSearchStartDate(SearchStartDate);
    setSearchEndDate(SearchEndDate);

    fetchRePriceEventLogRequest({
      eventId,
      StartDate: moment(StartDate).format("YYYY-MM-DD"),
      EndDate: moment(EndDate).format("YYYY-MM-DD")
    });
  }, []);

  const noDataHandler = () => {
    if (isEventFetching) return <Spinner />;
    else return "No Data Found To Display";
  };

  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: 5, // which size per page you want to locate as default
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
    noDataText: noDataHandler()
    // defaultSortName: "eventDate",
    // defaultSortOrder: "desc"
  };

  const handleApply = (event, picker) => {
    setSearchStartDate(picker.startDate);
    setSearchEndDate(picker.endDate);
    var monthStart = new Date(picker.startDate).getMonth() + 1;
    var monthEnd = new Date(picker.endDate).getMonth() + 1;
    var startDate = new Date(picker.startDate).getDate();
    var endDate = new Date(picker.endDate).getDate();
    if (monthStart < 10) monthStart = "0" + monthStart;
    if (monthEnd < 10) monthEnd = "0" + monthEnd;
    if (startDate < 10) startDate = "0" + startDate;
    if (endDate < 10) endDate = "0" + endDate;
    var StartDate =
      new Date(picker.startDate).getFullYear() +
      "-" +
      monthStart +
      "-" +
      startDate;
    var EndDate =
      new Date(picker.startDate).getFullYear() + "-" + monthEnd + "-" + endDate;
    fetchRePriceEventLogRequest({
      eventId,
      StartDate: moment(StartDate).format("YYYY-MM-DD"),
      EndDate: moment(EndDate).format("YYYY-MM-DD")
    });
  };

  const dateFormatter = (cell, row) => {
    var new_date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date(row.eventDate));
    return (
      <span>
        {new_date}
        <br />
        {row.time}
      </span>
    );
  };

  return (
    <div className="tbl_main re_price_inner">
      <div className="date_picker dateCls">
        <label style={{ color: "black" }}>Filter By Date:</label>
        <DatetimeRangePicker onApply={handleApply}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={
                SearchStartDate && SearchEndDate !== undefined
                  ? SearchStartDate.format("MM/DD/YYYY") +
                    " to " +
                    SearchEndDate.format("MM/DD/YYYY")
                  : "Enter Start Date - End Date"
              }
            />
            <span className="input-group-btn">
              <Button className="default date-range-toggle">
                <i className="fa fa-calendar" />
              </Button>
            </span>
          </div>
        </DatetimeRangePicker>
      </div>
      <br />
      <br />

      <div
        className="select_orderDetails"
        style={{ float: "right", marginRight: "223px", marginBottom: "-40px" }}
      >
        <div className="fl_orderDetails">
          <Form.Control
            as="select"
            onChange={evt => {
              var value = evt.target.value;
              setUnitfilter(true);
              setSectionfilter(true);
              setSearchfilter(true);
              if (evt.target.value === "1") {
                setSearchfilter(false);
                setUnitfilter(false);
                setSearchfilter(true);
              } else if (evt.target.value === "2") {
                setSearchfilter(false);
                setSectionfilter(false);
                setUnitfilter(true);
              } else {
                setUnitfilter(true);
                setSectionfilter(true);
                setSearchfilter(true);
              }
            }}
          >
            <option value="0"> Search By All </option>
            <option value="1"> Search By Section </option>
            <option value="2">Search By Unit Cost</option>
          </Form.Control>
        </div>
      </div>

      <BootstrapTable
        data={rePriceEventLog != undefined ? rePrice : ""}
        version="4"
        striped
        hover
        options={options}
        search
      >
        <TableHeaderColumn
          dataField="eventDate"
          searchable={searchfilter}
          dataFormat={dateFormatter}
          dataSort
          // sort={"desc"}
        >
          Date/Time
        </TableHeaderColumn>
        <TableHeaderColumn searchable={sectionfilter} dataField="section" isKey>
          Section
        </TableHeaderColumn>
        <TableHeaderColumn searchable={searchfilter} dataField="row">
          row
        </TableHeaderColumn>
        <TableHeaderColumn searchable={unitCostfilter} dataField="unitCost">
          Unit Cost
        </TableHeaderColumn>
        <TableHeaderColumn searchable={searchfilter} dataField="quantity">
          Quantity
        </TableHeaderColumn>

        <TableHeaderColumn
          searchable={searchfilter}
          dataField="oldListingPrice"
        >
          Old Price
        </TableHeaderColumn>
        {/* <TableHeaderColumn dataField="suggestedBrokerPrice">
            Suggested Broker Price
          </TableHeaderColumn> */}
        <TableHeaderColumn
          searchable={searchfilter}
          dataField="newListingPrice"
        >
          New Price
        </TableHeaderColumn>
        <TableHeaderColumn searchable={searchfilter} dataField="reason">
          Reason
        </TableHeaderColumn>
        <TableHeaderColumn searchable={searchfilter} dataField="description">
          Description
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

export default RePriceEventLog;
