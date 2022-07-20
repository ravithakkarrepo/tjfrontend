import React from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import Spinner from "../../components/Spinner";

const ValidListingsDataTable = ({
  data,
  eventId,
  cancelAllListingRequest,
  cancelListingByPrice,
  isFetching
}) => {
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
    expandBy: "column",
    noDataText: noDataHandler()
  };

  const formattedData = (validListings, trackedListings) => {
    return Object.keys(validListings)
      .filter(key => validListings[key].length)
      .map(key => ({
        price:
          `$${validListings[key][0].baseCost.toFixed(2)}` +
          " - " +
          `$${Number(key).toFixed(2)}`,
        // baseCost: `$${validListings[key][0].baseCost.toFixed(2)}`,
        validListingsExpand: validListings[key],
        trackedListingsExpand: trackedListings[key]
      }));
  };

  const clearButtonFormatter = (cell, row) => {
    return (
      <div className="float-right">
        <div
          onClick={() => clearAllByPrice(row)}
          className="red_txt text-center float-left cursor_pointer icon_only"
        >
          <i className="fa fa-times"></i>
        </div>
        <div className="float-left cursor_pointer mrg_left">
          <img alt="" src={require("./../../assets/img/down-arrow.png")} />
        </div>
      </div>
    );
  };

  const priceFormat = cell => cell && <i>{`$${cell}`}</i>;

  const isExpandableRow = row => {
    if (row) return true;
    else return false;
  };

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

  // const descriptionFormatter = (cell, row) => {
  //   if (cell) {
  //     return (
  //       <div className="red_txt">
  //         <span>{""}</span>
  //       </div>
  //     )
  //   }
  // }

  const cancelButtonFormat = (cell, row) => {
    return (
      <div onClick={() => cancelListingById([row])} className="red_txt">
        <i className="fa fa-times"></i>
      </div>
    );
  };
  const cancelListingById = row => {
    confirmAlert({
      title: "Warning",
      message: <span> Are you sure you want to cancel listing ? </span>,
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            cancelListingByPrice(row);
          }
        }
      ]
    });
  };

  const clearAllFromEvents = () => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>Are you sure you want to cancel all listings for events?</span>
      ),
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            cancelAllListingRequest([eventId]);
          }
        }
      ]
    });
  };

  const clearAllByPrice = row => {
    confirmAlert({
      title: "Warning",
      message: (
        <span> Are you sure you want to cancel all listings for price? </span>
      ),
      closeOnClickOutside: false,
      buttons: [
        { label: "Cancel" },
        {
          label: "Confirm",
          onClick: () => {
            cancelListingByPrice(row.trackedListingsExpand);
          }
        }
      ]
    });
  };

  // const validListingsExpandComponent = data => {
  //   return (
  //     <CardBody>
  //       <BootstrapTable data={[data]} version="4">
  //         <TableHeaderColumn dataField="partialView" isKey>
  //           PartialView
  //         </TableHeaderColumn>
  //         <TableHeaderColumn dataField="obstructedView">
  //           ObstructedView
  //         </TableHeaderColumn>
  //         <TableHeaderColumn dataField="wc">WC</TableHeaderColumn>
  //         <TableHeaderColumn dataField="fourPackOffer">
  //           FourPackOffer
  //         </TableHeaderColumn>
  //         <TableHeaderColumn dataField="isGa">IsGa</TableHeaderColumn>
  //         <TableHeaderColumn dataField="locked">Locked</TableHeaderColumn>
  //       </BootstrapTable>
  //     </CardBody>
  //   )
  // }

  const expandComponent = ({ validListingsExpand, trackedListingsExpand }) => {
    return (
      <div className="inner_acc_main">
        <div className="inner_acc_cover">
          <h2 className="bg_green">Valid Listing</h2>
          <div className="tbl_main">
            <div className="inner_tbl">
              <BootstrapTable
                data={validListingsExpand}
                version="4"
                striped
                hover
                pagination
                options={{ ...options, sizePerPage: 5 }}
                // expandableRow={isExpandableRow}
                // expandComponent={validListingsExpandComponent}
              >
                <TableHeaderColumn dataField="secRow" isKey>
                  Seat
                </TableHeaderColumn>
                <TableHeaderColumn dataField="quantity">Qty</TableHeaderColumn>
                <TableHeaderColumn
                  dataField="score"
                  dataFormat={num => Number(num).toFixed(2)}
                >
                  Score
                </TableHeaderColumn>
                {/* <TableHeaderColumn
                  dataField="stubhubSectionMinPrice"
                  dataFormat={priceFormat}
                  thStyle={{ whiteSpace: "normal" }}
                >
                  Stubhub Section Min
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="stubhubZoneMinPrice"
                  dataFormat={priceFormat}
                  thStyle={{ whiteSpace: "normal" }}
                >
                  Stubhub Zone min
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="stubhubPriceSpread"
                  thStyle={{ whiteSpace: "normal" }}
                >
                  Stubhub Price Spread
                </TableHeaderColumn> */}
                <TableHeaderColumn
                  dataField="partialView"
                  dataFormat={iconFormatter}
                >
                  PV
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={iconFormatter}
                  dataField="obstructedView"
                >
                  OV
                </TableHeaderColumn>
                {/* <TableHeaderColumn dataFormat={iconFormatter} dataField="wc">
                  WC
                </TableHeaderColumn> */}
                <TableHeaderColumn
                  dataFormat={iconFormatter}
                  dataField="twoPackOffer"
                >
                  2Pack
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={iconFormatter}
                  dataField="threePackOffer"
                >
                  3Pack
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={iconFormatter}
                  dataField="fourPackOffer"
                >
                  4Pack
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={iconFormatter}
                  dataField="fivePackOffer"
                >
                  5Pack
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={iconFormatter}
                  dataField="sixPackOffer"
                >
                  6Pack
                </TableHeaderColumn>
                <TableHeaderColumn dataField="isGa" dataFormat={iconFormatter}>
                  IsGa
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="locked"
                  dataFormat={iconFormatter}
                >
                  Locked
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="lockDescription"
                  width="12%"
                  // dataFormat={descriptionFormatter}
                >
                  Locked Description
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>

        <div className="inner_acc_cover">
          <h2 className="bg_blue">Tracked Listing</h2>
          <div className="tbl_main">
            <div className="inner_tbl">
              <BootstrapTable
                data={trackedListingsExpand}
                striped
                hover
                pagination
                version="4"
                options={{ ...options, sizePerPage: 5 }}
              >
                <TableHeaderColumn dataField="secRow" isKey>
                  Seat
                </TableHeaderColumn>
                <TableHeaderColumn dataField="quantity" dataAlign="center">
                  Quantity
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="listingPrice"
                  dataAlign="center"
                  dataFormat={priceFormat}
                >
                  listingPrice
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="profit"
                  dataAlign="center"
                  dataFormat={priceFormat}
                >
                  Profit
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataFormat={cancelButtonFormat}
                  dataField="button"
                >
                  Action
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [validListings, trackedListings] = data;

  // const priceListingData = formattedData(validListings, trackedListings)

  // const isNotEmpty = Array.isArray(priceListingData)
  //   ? priceListingData.length
  //   : Object.keys(priceListingData).length

  return (
    <div className="white_box mrgbtm50">
      <div className="cm_ttl nw_check_ttl">
        <h2>Listings By Price Point</h2>
        {Object.keys(trackedListings).length > 0 ? (
          <div onClick={clearAllFromEvents} className="cls_row">
            <i className="fa fa-times"></i> Clear All
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="inner_box_body padL3T5 acc_main min_inherit price_inner_acc">
        <div className="tbl_main">
          <div className="inner_tbl">
            {/* {isNotEmpty ? ( */}
            {isFetching ? (
              <Spinner />
            ) : (
              <BootstrapTable
                data={formattedData(validListings, trackedListings)}
                version="4"
                striped
                hover
                pagination
                options={options}
                expandableRow={isExpandableRow}
                expandComponent={expandComponent}
              >
                <TableHeaderColumn dataField="price" isKey dataAlign="center">
                  Base Price - Final Price
                </TableHeaderColumn>

                <TableHeaderColumn
                  dataFormat={clearButtonFormatter}
                  expandable={false}
                  width="10%"
                ></TableHeaderColumn>
              </BootstrapTable>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidListingsDataTable;
