import React, { useEffect, useState } from "react";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EventLogDataTable = ({
  eventDetailsLog,
  fetchEventDetailsLogRequest,
  isEventFetching,
  eventId
}) => {
  const [startDate, setStartDate] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [defaultSort, setdefaultSort] = useState("time");
  // eslint-disable-next-line no-unused-vars
  const [defaultOrder, setdefaultOrder] = useState("desc");
  useEffect(() => {
    var newDate = new Date();
    var dd = newDate.getDate();
    if (dd < 10) dd = "0" + dd;
    var month = newDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var selectedDate = newDate.getFullYear() + "-" + month + "-" + dd;
    fetchEventDetailsLogRequest({ eventId, selectedDate });
  }, []);

  const noDataHandler = () => {
    if (isEventFetching) return <Spinner spinnerTime={false} />;
    else return "No Data Found To Display";
  };

  const TimeFormatter = (cell, row) => {
    var time = row.time.replace(":00", "");
    if (parseInt(time) < 12) {
      time = row.time + " AM";
    } else {
      if (parseInt(time) === 12) {
        time = row.time + " PM";
      } else {
        var rowTime = parseInt(time) - 12;
        if (parseInt(rowTime) < 10) {
          rowTime = "0" + rowTime + ":" + row.time.split(":")[1] + " PM";
        } else {
          rowTime = rowTime + ":" + row.time.split(":")[1] + " PM";
        }
        time = rowTime;
      }
    }
    return <span>{time}</span>;
  };

  const detailsFormatter = (cell, row) => {
    var details = row.details.split("\n");
    var str = [];
    for (var i = 0; i < details.length; i++) {
      if (details[i] !== " ") {
        str.push(
          <>
            <span>{details[i]}</span>
            <br />
          </>
        );
      }
    }
    return <div>{str}</div>;
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
    noDataText: noDataHandler(),
    defaultSortName: defaultSort,
    defaultSortOrder: defaultOrder
  };

  return (
    <div className="tbl_main">
      <div className="date_picker dateCls">
        <label style={{ color: "black" }}>Filter By Date: </label>
        <DatePicker
          maxDate={new Date()}
          selected={startDate}
          onChange={date => {
            var newDate = date;
            var dd = newDate.getDate();
            if (dd < 10) dd = "0" + dd;
            var month = newDate.getMonth() + 1;
            if (month < 10) month = "0" + month;
            var selectedDate = newDate.getFullYear() + "-" + month + "-" + dd;
            fetchEventDetailsLogRequest({ eventId, selectedDate });
            setStartDate(date);
          }}
        ></DatePicker>
      </div>
      <div className="inner_tbl">
        {isEventFetching ? (
          <Spinner spinnerTime={false} />
        ) : (
          <BootstrapTable
            data={Object.values(eventDetailsLog)}
            version="4"
            striped
            hover
            pagination
            options={options}
          >
            <TableHeaderColumn dataField="id" isKey hidden>
              ID
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="time"
              dataFormat={TimeFormatter}
              width="10%"
              editable={false}
            >
              Time
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="details"
              width="40%"
              dataAlign="left"
              editable={false}
              dataFormat={detailsFormatter}
            >
              Details
            </TableHeaderColumn>
          </BootstrapTable>
        )}
      </div>
    </div>
  );
};

export default EventLogDataTable;
