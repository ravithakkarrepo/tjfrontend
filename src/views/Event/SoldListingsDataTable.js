import React from "react";
import { Card, CardBody } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

const SoldListingsDataTable = ({ data }) => {
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
    withFirstAndLast: true //> Hide the going to First and Last page button
  };

  return (
    <div className="animated">
      <Card>
        <CardBody>
          <BootstrapTable
            data={data}
            version="4"
            striped
            hover
            pagination
            options={options}
          >
            <TableHeaderColumn dataField="_id" hidden />
            <TableHeaderColumn dataField="section">Section</TableHeaderColumn>
            <TableHeaderColumn dataField="row">Row</TableHeaderColumn>
            <TableHeaderColumn dataField="quantitySold">
              QuantitySold
            </TableHeaderColumn>
            <TableHeaderColumn dataField="profit">Profit</TableHeaderColumn>
            <TableHeaderColumn dataField="managedVenue">
              ManagedVenue
            </TableHeaderColumn>
          </BootstrapTable>
        </CardBody>
      </Card>
    </div>
  );
};

export default SoldListingsDataTable;
