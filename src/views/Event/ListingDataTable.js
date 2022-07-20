/* eslint-disable eqeqeq */
import React, { memo } from "react";
import { Button } from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Spinner from "../../components/Spinner";

import CustomMultiSelectTable from "../../components/CustomMultiSelectTable/CustomMultiSelectTable";

const amountOptions = [2, 4, 6, 8];

const ListingDataTable = ({
  data,
  publishListingRequest,
  eventInfo,
  isFetching
}) => {
  let formatGroups = []; //listings
  let mapListings = {}; //listing dictionary
  let id = 1; //for the purpose of table

  if (eventInfo["eventAddress"] != undefined) {
    eventInfo["eventAddress"] = eventInfo["eventAddress"].split("-")[0].trim();
  } //skybox expects venue address

  Object.entries(data).forEach(([key, value]) => {
    const [section, row] = key.split(", ");
    const listings = [];

    value.forEach(({ charge, seats }) => {
      //different prices in the same section and row
      seats.forEach(quantity => {
        //seats with same price
        const listing = {
          id,
          unitCost: Number(charge).toFixed(2),
          stockType: "ELECTRONIC",
          section,
          row,
          amount: quantity,
          eventInfo,
          quantity
        };

        listings.push(listing);

        mapListings[id] = listing;

        id++;
      });
    });

    formatGroups = formatGroups.concat(listings); //flaten the groups
  });

  const createCustomDeleteButton = onBtnClick => {
    return (
      <Button color="primary" className="btn-pill" onClick={onBtnClick}>
        Publish
      </Button>
    );
  };

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: <span>Are you sure you want to publish these listings?</span>,
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            dropRowKeys
              .map(key => mapListings[key])
              .forEach(listing => {
                const { eventId } = listing.eventInfo;
                publishListingRequest({ eventId, listing });
              });
            next();
          }
        }
      ]
    });
  };

  const noDataHandler = () => {
    if (isFetching) return <Spinner />;
    else return "No Data Found To Display";
  };

  const options = {
    page: 1, // which page you want to show as default
    sizePerPage: 16, // which size per page you want to locate as default
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
    handleConfirmDeleteRow: customConfirm,
    noDataText: noDataHandler()
  };

  const quantityValidator = (value, row) => {
    if (!Number.isInteger(Number(value))) {
      return "Please input an integer!";
    }

    if (Number(value) > row.quantity) {
      return "Please input an integer less than the corresponding quntity!";
    }

    return true;
  };

  const selectRow = {
    mode: "checkbox",
    showOnlySelected: true,
    customComponent: CustomMultiSelectTable
  };

  // const isNotEmpty = Array.isArray(data)
  //   ? data.length
  //   : Object.keys(data).length

  const cellEdit = {
    mode: "click",
    afterSaveCell: (row, cellName, cellValue) => {
      mapListings[row.id][cellName] = cellValue;
    }
  };

  return (
    <div className="tbl_main">
      <div className="inner_tbl">
        {isFetching ? (
          <Spinner />
        ) : (
          <BootstrapTable
            data={formatGroups}
            version="4"
            striped
            hover
            pagination
            options={options}
            selectRow={selectRow}
            deleteRow
            cellEdit={cellEdit}
          >
            <TableHeaderColumn dataField="id" isKey hidden>
              ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField="section" editable={false} dataSort>
              Section
            </TableHeaderColumn>
            <TableHeaderColumn dataField="row" editable={false}>
              Row
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="amount"
              editable={false}
              filter={{
                type: "NumberFilter",
                numberComparators: ["=", ">=", "<"],
                defaultValue: { number: 2, comparator: ">=" },
                options: amountOptions
              }}
            >
              Group Quantitiy
            </TableHeaderColumn>
            <TableHeaderColumn dataField="unitCost" editable={false}>
              Charge
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="quantity"
              editable={{ validator: quantityValidator }}
            >
              Post Quantity
            </TableHeaderColumn>
          </BootstrapTable>
        )}
      </div>
    </div>
  );
};

export default memo(ListingDataTable);
