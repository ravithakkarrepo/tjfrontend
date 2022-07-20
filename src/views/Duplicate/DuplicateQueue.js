/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import moment from "moment-timezone";

import "bootstrap-daterangepicker/daterangepicker.css";
import DuplicateEvents from "./DuplicateEvents";
import DuplicateVenues from "./DuplicateVenues";
import MisMatchedEvents from "./MisMatchedEvents";

const dateFormatStr = "MM/DD/YY, hh:mm a";
const defaultTimeZone = "America/New_York";

export const dateFormatterWithTZ = time => timezone =>
  moment(time)
    .tz(timezone || defaultTimeZone)
    .format(dateFormatStr);

const DuplicateEventsQueue = ({
  isFetching,
  isDuplicateEventsFetching,
  isMisMatchEventFetching,
  misMatchedEventsQueue,
  duplicateEventsQueue,
  fetchDuplicateEventsRequest,
  fetchMisMatchedEventQueueRequest,
  deleteDuplicateEventsRequest,
  createManagedQueueEventsRequest,
  fetchDuplicateVenueSearchRequest,
  isDuplicateVenueFetching,
  duplicateVenuesQueue,
  deleteDuplicateVenueRequest,
  updateDuplicateVenueIsBlackListRequest,
  updateEventBySkyboxEventIdRequest,
  updateVenueBySkyboxVenueIdRequest,
  archiveEventsRequest
}) => {
  return (
    <div>
      <div className="full_width">
        <div className="page_name">
          <h2>Duplicate Items</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12">
                <div className="inner_box_body padL3T5">
                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl dis_inline">
                      <h2>Duplicate Events Table</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                        <div className="inner_tbl">
                          <DuplicateEvents
                            isFetching={isDuplicateEventsFetching}
                            duplicateEventsQueue={
                              duplicateEventsQueue.duplicateEvents
                            }
                            totalListings={duplicateEventsQueue.totalListing}
                            currentPage={duplicateEventsQueue.page}
                            fetchDuplicateEventsRequest={
                              fetchDuplicateEventsRequest
                            }
                            deleteDuplicateEventsRequest={
                              deleteDuplicateEventsRequest
                            }
                            updateEventBySkyboxEventIdRequest={
                              updateEventBySkyboxEventIdRequest
                            }
                            archiveEventsRequest={archiveEventsRequest}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl dis_inline">
                      <h2>Duplicate Venues</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                        <div className="inner_tbl">
                          <DuplicateVenues
                            isFetching={isDuplicateVenueFetching}
                            duplicateVenueQueue={
                              duplicateVenuesQueue.duplicateVenues
                            }
                            totalListings={duplicateVenuesQueue.totalListing}
                            currentPage={duplicateVenuesQueue.page}
                            fetchDuplicateVenueSearchRequest={
                              fetchDuplicateVenueSearchRequest
                            }
                            deleteDuplicateVenueRequest={
                              deleteDuplicateVenueRequest
                            }
                            updateDuplicateVenueIsBlackListRequest={
                              updateDuplicateVenueIsBlackListRequest
                            }
                            updateVenueBySkyboxVenueIdRequest={
                              updateVenueBySkyboxVenueIdRequest
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="white_box mrgbtm50">
                    <div className="cm_ttl dis_inline">
                      <h2>MisMatch Events Table</h2>
                    </div>
                    <div className="inner_box_body padL3T5">
                      <div className="tbl_main date_tbl cm_tbl_btn_main ev_queue">
                        <div className="inner_tbl">
                          <MisMatchedEvents
                            isFetching={isMisMatchEventFetching}
                            misMatchedEventsQueue={
                              misMatchedEventsQueue.misMatchedEvents
                            }
                            totalListings={misMatchedEventsQueue.totalEvent}
                            currentPage={misMatchedEventsQueue.page}
                            fetchMisMatchedEventQueueRequest={
                              fetchMisMatchedEventQueueRequest
                            }
                            updateEventBySkyboxEventIdRequest={
                              updateEventBySkyboxEventIdRequest
                            }
                            deleteDuplicateEventsRequest={
                              deleteDuplicateEventsRequest
                            }
                            archiveEventsRequest={archiveEventsRequest}
                          />
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

export default DuplicateEventsQueue;
