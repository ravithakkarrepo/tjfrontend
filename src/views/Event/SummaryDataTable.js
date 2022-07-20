import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import Spinner from "../../components/Spinner";

const SummaryDataTable = ({ data, isFetching }) => {
  const noDataHandler = () => {
    if (isFetching) return <Spinner />;
    else return "No Data Found To Display";
  };

  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: 20, // which size per page you want to locate as default
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
  };

  // const isNotEmpty = Array.isArray(data)
  //   ? data.length
  //   : Object.keys(data).length

  return (
    <div className="inner_box_body padL3T5 ticketSummery_Listing">
      <div className="tbl_main">
        <div className="inner_tbl">
          {isFetching ? (
            <Spinner />
          ) : (
            <BootstrapTable
              data={Object.values(data)}
              version="4"
              striped
              hover
              pagination
              options={options}
            >
              <TableHeaderColumn dataField="section" isKey>
                Section
              </TableHeaderColumn>
              <TableHeaderColumn dataField="min">Min</TableHeaderColumn>
              <TableHeaderColumn dataField="max">Max</TableHeaderColumn>
              <TableHeaderColumn dataField="amount">Quantity</TableHeaderColumn>
            </BootstrapTable>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryDataTable;
