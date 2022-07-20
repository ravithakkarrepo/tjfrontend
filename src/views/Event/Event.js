/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";

import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { withRouter } from "react-router-dom";

import SummaryDataTable from "./SummaryDataTable";
import ListingDataTable from "./ListingDataTable";
import ValidListingsDataTable from "./ValidListingsDataTable";
import EventLogDataTable from "./EventLogDataTable";
// import SoldListingsDataTable from "./SoldListingsDataTable"
// import DataTableWithCollapseAndFetching from "../../components/DataTableWithCollapseAndFetching"
import { percentFormatter } from "../../components/TableColumnFormatter";
import Accordion from "react-bootstrap/Accordion";

import PricePointChart from "./PricePointChart";
import SecondaryMarketChart from "./SecondaryMarketChart";
import RePriceEventLog from "./RePriceEventLog";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { pctValidation } from "../../utils/validation";
import { dateFormatter, dateFormatterWithTZ } from "../../utils/date";
import JockeyActions from "./jockeyActions";
import Spinner from "../../components/Spinner";
import {
  ALERT_MSG_ERROR,
  ALERT_MSG_INFO,
  ALERT_MSG_WARN,
  ALERT_MSG_SUCCESS
} from "../../constants";

const Event = ({
  cancelFetchEventInfoByEventIdRequest,
  fetchValidListingsRequest,
  fetchValidListingsWithSpreadRequest,
  fetchEventInfoByEventIdRequest,
  fetchTicketsByEventIdClear,
  publishListingRequest,
  selectedEvent,
  selectedEventFrom,
  clearSelectEvent,
  cancelAllListingRequest,
  cancelListingByPrice,
  // pctVenueAvail,
  groups,
  summary,
  validListings,
  trackedListings,
  isFetching,
  isEventFetching,
  // soldListings,
  location,
  fetchEventDetailsLogRequest,
  eventDetailsLog,
  fetchPricePointRequest,
  fetchSecodaryLogsRequest,
  pricePointList,
  secondaryMargetList,
  fetchRePriceEventLogRequest,
  rePriceEventLog,
  updatePriceMarkUpPctRequest,
  appReceiveAlert,
  fetchEventByEventIdRequest,
  eventInfoById,
  priceFetching,
  secondaryFetching,
  updateManagedEventsRequest,
  broadcastListingRequest,
  updateIsBlackListRequest,
  isBlackListingFetching,
  isAddBlackListFetching,
  addBlackListPriceSectionRequest,
  FetchBlackListPriceSectionRequest,
  blackListInfo
}) => {
  const isFromManagedEvents = selectedEventFrom
    ? selectedEventFrom === "ManagedEvents"
    : false;

  const {
    //  eventId,
    _id,
    eventName,
    // eventDate,
    eventDBId,
    formattedEventDate,
    eventAddress,
    stubhubEventUrl
    // priceMarkupPct,
    // is_priceMarkupPct,
    // presales,
    // promos
  } = selectedEvent; //the selected event when user click 'details' on a specific event

  const query = window.location.href.split("?") || [];
  const [eventDBIdFromQuery, setEventIdFromQuery] = useState(
    query && query.length > 1 ? query[1] : ""
  );
  const [eventId, setEventId] = useState(window.location.href.split("/")[5]);
  const [pctValue, setPctValue] = useState(
    window.location.href.split("/")[5] === eventInfoById.eventId &&
      eventInfoById.priceMarkupPct !== undefined
      ? eventInfoById.priceMarkupPct
      : ""
  );
  const [isPctValue, setIsPctValue] = useState(
    eventInfoById.is_priceMarkupPct !== undefined
      ? eventInfoById.is_priceMarkupPct
      : false
  );

  const [is_JockeyAlgoReprice, setIsJockeyAlgoReprice] = useState(
    eventInfoById.is_JockeyAlgoReprice !== undefined
      ? eventInfoById.is_JockeyAlgoReprice == 1
        ? 1
        : 0
      : 0
  );

  if (eventInfoById) {
    eventInfoById.lastKnownOnSaleTime = dateFormatterWithTZ(
      eventInfoById.eventDate
    )(
      eventInfoById.timeZone !== undefined &&
        eventInfoById.timeZone !== null &&
        eventInfoById.timeZone !== ""
        ? eventInfoById.timeZone
        : "America/New_York"
    );
  }

  const [chartType, setChartType] = useState("DAILY");
  const refpctValue = useRef("");
  useEffect(() => {
    setTimeout(() => {
      // if (!isFromManagedEvents) {
      fetchEventByEventIdRequest({
        eventId: isFromManagedEvents
          ? _id
          : eventDBIdFromQuery !== ""
          ? eventDBIdFromQuery
          : eventDBId
      });
      fetchEventInfoByEventIdRequest({
        eventId: isFromManagedEvents
          ? _id
          : eventDBIdFromQuery !== ""
          ? eventDBIdFromQuery
          : eventDBId
      });
      fetchValidListingsRequest({
        eventId: isFromManagedEvents
          ? _id
          : eventDBIdFromQuery !== ""
          ? eventDBIdFromQuery
          : eventDBId
      });
      // } else {
      //   fetchEventByEventIdRequest({ eventId: _id })
      //   fetchEventInfoByEventIdRequest({ eventId: _id })
      //   fetchValidListingsRequest({ eventId: _id })
      // }
      return () => {
        clearSelectEvent();
        cancelFetchEventInfoByEventIdRequest();
        fetchTicketsByEventIdClear();
      };
    }, 1000);
  }, []);

  const isExpandRow = () => {
    return true;
  };

  const formatPresales = data => {
    var presale = [];
    if (data != undefined) {
      for (var sale of data) {
        Object.entries(sale).map(s => {
          presale.push(
            <>
              <span>
                <b> {s[0]} </b> :{" "}
                {s[0] === "startDateTime" || s[0] === "endDateTime"
                  ? dateFormatter(s[1])
                  : s[1]}
              </span>
            </>
          );
        });
        presale.push(<br />);
      }
    }
    return presale;
  };

  const formatPromos = data => {
    var promos = [];
    if (data != undefined) {
      Object.entries(data).map(p => {
        promos.push(
          <>
            <span>
              <b> {p[0]} </b> : {p[1]}
            </span>
          </>
        );
      });
      promos.push(<br />);
    }
    return promos;
  };
  const expandRow = row => {
    return (
      <div className="expand_row_main">
        <div className="expand_row_inner">
          <label>PreSales</label>{" "}
          <span className="row_val">{formatPresales(row.presales)}</span>
        </div>

        <div className="expand_row_inner">
          <label>Promos</label>{" "}
          <span className="row_val">{formatPromos(row.promos)}</span>
        </div>
      </div>
    );
  };

  const selectRow = {
    clickToExpand: true
  };

  const options = {
    expandBy: "column"
  };
  return (
    <div className="inner_main">
      <div className="full_width">
        <div className="row">
          <div className="col-sm-12">
            <div className="white_box mrgbtm50">
              <div className="cm_ttl">
                <h2>Events Info</h2>
              </div>
              <div className="inner_box_body padL3T5">
                <div className="event_info">
                  <div className="event_info_left">
                    <h2 className="event_ttl">
                      {eventInfoById.length != 0
                        ? eventInfoById.eventName
                        : eventName}
                    </h2>
                    <p className="event_date">
                      {eventInfoById.length != 0
                        ? dateFormatterWithTZ(eventInfoById.eventDate)(
                            eventInfoById.timeZone === undefined
                              ? "America/New_York"
                              : eventInfoById.timeZone
                          )
                        : formattedEventDate}{" "}
                      /{" "}
                      {eventInfoById.length != 0
                        ? eventInfoById.eventAddress
                        : eventAddress}
                    </p>
                  </div>
                  <div className="event_info_right">
                    {eventInfoById.length != 0 &&
                    eventInfoById.eventUrl &&
                    eventInfoById.eventUrl != "" ? (
                      eventInfoById.marketType === "AXS" ? (
                        <a
                          href={eventInfoById.eventUrl}
                          target="_blank"
                          className="ticket_master_link"
                        >
                          Check Event On AXS
                        </a>
                      ) : (
                        <a
                          href={eventInfoById.eventUrl}
                          target="_blank"
                          className="ticket_master_link"
                        >
                          Check Event On E-Venue
                        </a>
                      )
                    ) : (
                      <a
                        href={`https://www1.ticketmaster.com/event/${
                          eventInfoById.length != 0
                            ? eventInfoById.eventId
                            : eventId
                        }`}
                        target="_blank"
                        className="ticket_master_link"
                      >
                        Check Event on Ticket Master
                      </a>
                    )}

                    <br />
                    {eventInfoById.length != 0
                      ? eventInfoById.stubhubEventUrl && (
                          <a
                            href={eventInfoById.stubhubEventUrl}
                            target="_blank"
                            className="ticket_master_link"
                          >
                            Check Event on StubHub
                          </a>
                        )
                      : stubhubEventUrl && (
                          <a
                            href={stubhubEventUrl}
                            target="_blank"
                            className="ticket_master_link"
                          >
                            Check Event on StubHub
                          </a>
                        )}
                  </div>
                </div>

                {isFromManagedEvents ? (
                  <div>
                    <div className="tbl_main info_tbl">
                      <div className="inner_tbl">
                        <BootstrapTable
                          data={[selectedEvent]}
                          version="4"
                          striped
                          hover
                          expandableRow={isExpandRow}
                          expandComponent={expandRow}
                          expandColumnOptions={{
                            expandColumnVisible: true
                          }}
                          options={options}
                          selectRow={selectRow}
                        >
                          <TableHeaderColumn dataField="eventId" isKey hidden>
                            ID
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="formattedEventDate">
                            LastKnownOnSaleTime
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="presale">
                            Presale
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="daysToEvent">
                            DaysToEvent
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="daysSinceOnsale">
                            DaysSinceOnsale
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="termRange">
                            TermRange
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="timestamp">
                            Time Added
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="pctVenueAvail"
                            dataFormat={percentFormatter}
                          >
                            PctAvail
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="totalVenueSeats">
                            TotalVenueSeats
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="totalAvailability">
                            TotalAvailability
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="tbl_main info_tbl">
                      <div className="inner_tbl">
                        {isFetching ? (
                          <Spinner spinnerTime={false} />
                        ) : (
                          <BootstrapTable
                            data={[eventInfoById]}
                            version="4"
                            striped
                            hover
                            expandableRow={isExpandRow}
                            expandComponent={expandRow}
                            expandColumnOptions={{
                              expandColumnVisible: true
                            }}
                            options={options}
                            selectRow={selectRow}
                          >
                            <TableHeaderColumn dataField="eventId" isKey hidden>
                              ID
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="lastKnownOnSaleTime">
                              LastKnownOnSaleTime
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="presale">
                              Presale
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="daysToEvent"
                              //  dataFormat={dateFormatter}
                            >
                              DaysToEvent
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="daysSinceOnsale"
                              // dataFormat={dateFormatter}
                            >
                              DaysSinceOnsale
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="termRange">
                              TermRange
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="timestamp">
                              Time Added
                            </TableHeaderColumn>
                            <TableHeaderColumn
                              dataField="pctVenueAvail"
                              dataFormat={percentFormatter}
                            >
                              PctAvail
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="totalVenueSeats">
                              TotalVenueSeats
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField="totalAvailability">
                              TotalAvailability
                            </TableHeaderColumn>
                          </BootstrapTable>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="fl_w">
              <div className="row">
                <div className="col-sm-6">
                  <div className="white_box mrgbtm50 price_sec">
                    <div className="cm_ttl">
                      <h2>Custom Pricing</h2>
                    </div>
                    <div className="inner_box_body padL3T5 tbl_main">
                      <div className="row">
                        <div className="col-sm-12">
                          <Form>
                            <Form.Control
                              type="Number"
                              ref={refpctValue}
                              defaultValue={
                                window.location.href.split("/")[5] ===
                                  eventInfoById.eventId &&
                                eventInfoById.priceMarkupPct !== undefined
                                  ? eventInfoById.priceMarkupPct
                                  : pctValue
                              }
                              placeholder="Custom Pricing"
                              onChange={
                                evt => {
                                  if (
                                    window.location.href.split("/")[5] ===
                                      eventInfoById.eventId &&
                                    eventInfoById.priceMarkupPct !== undefined
                                  ) {
                                    eventInfoById.priceMarkupPct =
                                      evt.target.value;
                                  } else {
                                    setPctValue(evt.target.value);
                                  }
                                }
                                // setPctValue(evt.target.value)
                              }
                              style={{ maxWidth: "320px" }}
                            />
                          </Form>
                          <div className="tbl_btn">
                            <BootstrapSwitchButton
                              checked={
                                eventInfoById.is_priceMarkupPct !== undefined
                                  ? eventInfoById.is_priceMarkupPct
                                  : false
                              }
                              onChange={evt => {
                                setIsPctValue(evt);
                              }}
                            />
                          </div>

                          <div className="btn-group">
                            <Button
                              onClick={() => {
                                var valid = "";
                                valid = pctValidation(
                                  eventInfoById.priceMarkupPct !== undefined
                                    ? eventInfoById.priceMarkupPct
                                    : pctValue,
                                  isPctValue
                                );
                                if (valid == false) {
                                  appReceiveAlert({
                                    type: ALERT_MSG_ERROR,
                                    message: "Number must be greater than 0"
                                  });
                                } else {
                                  updatePriceMarkUpPctRequest({
                                    eventId: eventInfoById._id,
                                    pctValue:
                                      eventInfoById.priceMarkupPct !== undefined
                                        ? eventInfoById.priceMarkupPct
                                        : pctValue,
                                    isPctValue
                                  });
                                }
                              }}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="white_box mrgbtm50 price_sec">
                    <div className="cm_ttl">
                      <h2>Actions</h2>
                    </div>
                    <div className="inner_box_body padL3T5 tbl_main">
                      <div className="row">
                        <div className="col-sm-12">
                          <JockeyActions
                            updateManagedEventsRequest={
                              updateManagedEventsRequest
                            }
                            eventInfoById={
                              eventInfoById != undefined ? eventInfoById : []
                            }
                            eventId={
                              eventDBIdFromQuery !== ""
                                ? eventDBIdFromQuery
                                : eventInfoById._id
                            }
                            broadcastListingRequest={broadcastListingRequest}
                            updateIsBlackListRequest={updateIsBlackListRequest}
                            isBlackListingFetching={isBlackListingFetching}
                            isAddBlackListFetching={isAddBlackListFetching}
                            addBlackListPriceSectionRequest={
                              addBlackListPriceSectionRequest
                            }
                            FetchBlackListPriceSectionRequest={
                              FetchBlackListPriceSectionRequest
                            }
                            blackListInfo={blackListInfo}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ValidListingsDataTable
              data={[validListings, trackedListings]}
              eventId={eventId}
              cancelAllListingRequest={cancelAllListingRequest}
              cancelListingByPrice={cancelListingByPrice}
              isFetching={isFetching}
            />

            <div className="fl_w">
              <div className="row">
                <div className="col-sm-6">
                  <div className="white_box mrgbtm50 acc_main min_inherit">
                    <Accordion>
                      <Card>
                        <Accordion.Toggle
                          className="cm_ttl"
                          as={Card.Header}
                          eventKey="0"
                          // onClick={setToggleValue("collapse")}
                        >
                          <h2>Tickets Summary</h2>
                        </Accordion.Toggle>

                        <Accordion.Collapse
                          //className={toggleClass}
                          eventKey="0"
                        >
                          <SummaryDataTable
                            data={summary}
                            isFetching={isFetching}
                          />
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="white_box mrgbtm50 acc_main min_inherit">
                    <Accordion>
                      <Card>
                        <Accordion.Toggle
                          className="cm_ttl show"
                          as={Card.Header}
                          eventKey="0"
                        >
                          <h2>Listings</h2>
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey="0">
                          <div className="inner_box_body padL3T5 ticketSummery_Listing">
                            <ListingDataTable
                              data={groups}
                              publishListingRequest={publishListingRequest}
                              eventInfo={selectedEvent}
                              isFetching={isFetching}
                            />
                          </div>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>

            <div className="fl_w price_chart white_box inner_box_body mrgbtm50">
              <div className="row">
                <div className="col-sm-12">
                  <div className="select_eq">
                    <div className="fl_eq_box">
                      <Form.Control
                        as="select"
                        value={chartType}
                        onChange={evt => {
                          setChartType(evt.target.value);
                          if (evt.target.value === "HOURLY") {
                          } else if (evt.target.value === "DAILY") {
                          }
                          fetchPricePointRequest({
                            eventId: isFromManagedEvents
                              ? _id
                              : eventDBIdFromQuery !== ""
                              ? eventDBIdFromQuery
                              : eventDBId,
                            groupBy: evt.target.value
                          });
                          fetchSecodaryLogsRequest({
                            eventId: isFromManagedEvents
                              ? _id
                              : eventDBIdFromQuery !== ""
                              ? eventDBIdFromQuery
                              : eventDBId,
                            groupBy: evt.target.value
                          });
                        }}
                      >
                        <option value="HOURLY">Hourly</option>
                        <option value="DAILY">Daily</option>
                      </Form.Control>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <PricePointChart
                    chartType={chartType}
                    isFetching={isFetching}
                    fetchPricePointRequest={fetchPricePointRequest}
                    pricePointList={pricePointList}
                    eventId={
                      isFromManagedEvents
                        ? _id
                        : eventDBIdFromQuery !== ""
                        ? eventDBIdFromQuery
                        : eventDBId
                    }
                    priceFetching={priceFetching}
                  />
                </div>
                <div className="col-sm-6">
                  <SecondaryMarketChart
                    isFetching={isFetching}
                    chartType={chartType}
                    fetchSecodaryLogsRequest={fetchSecodaryLogsRequest}
                    secondaryMargetList={secondaryMargetList}
                    eventId={
                      isFromManagedEvents
                        ? _id
                        : eventDBIdFromQuery !== ""
                        ? eventDBIdFromQuery
                        : eventDBId
                    }
                    secondaryFetching={secondaryFetching}
                  />
                </div>
              </div>
            </div>

            <div className="white_box mrgbtm50">
              <div className="cm_ttl">
                <h2>Event Logs Details</h2>
              </div>
              <div className="inner_box_body padL3T5">
                <EventLogDataTable
                  //  data={groups}
                  fetchEventDetailsLogRequest={fetchEventDetailsLogRequest}
                  eventId={
                    isFromManagedEvents
                      ? _id
                      : eventDBIdFromQuery !== ""
                      ? eventDBIdFromQuery
                      : eventDBId
                  }
                  eventDetailsLog={eventDetailsLog}
                  isEventFetching={isEventFetching}
                />
              </div>
            </div>

            <div className="white_box mrgbtm50">
              <div className="cm_ttl">
                <h2>Re Price Event Logs</h2>
              </div>
              <div className="inner_box_body padL3T5">
                <RePriceEventLog
                  fetchRePriceEventLogRequest={fetchRePriceEventLogRequest}
                  eventId={eventId}
                  rePriceEventLog={rePriceEventLog}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Event);
