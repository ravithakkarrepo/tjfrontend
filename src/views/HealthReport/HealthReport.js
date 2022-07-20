import React, { useState, useEffect } from "react";
import EventQueue from "./EventQueue";
import SaleMargin from "./SaleMargin";
import SkyboxPostedEvents from "./SkyboxPostedEvents";
import EventMonitoring from "./EventMonitoring";

const HealthReport = ({
  fetchSaleMarginHealthReportRequest,
  saleMarginHealthReport,
  isSaleMarginFetching,
  fetchMarketwiseSaleMarginHealthReportRequest,
  marketwiseSaleMarginHealthReport,
  isMarketwiseSaleMarginFetching,
  fetchSBEventsHealthReportRequest,
  skyboxEventsHealthReport,
  isFetchingSkyboxEventsHealthReport,
  fetchSBPostedPresaleEventsHealthReportRequest,
  skyboxPostedPresaleEventsHealthReport,
  isFetchingSkyboxPostedPresaleEventsHealthReport,
  skyboxPostedEventsHealthReport,
  isFetchingSkyboxPostedEventsHealthReport,
  fetchSBPostedEventsHealthReportRequest,
  fetchEventQueueHealthReportRequest,
  eventQueueHealthReport,
  isFetchingEventQueueHealthReport,
  fetchCancelledSBEventsHealthReportRequest,
  cancelledSkyboxEventsHealthReport,
  isFetchingCancelledSkyboxEventsHealthReport,
  fetchUpdateHealthReportConfigRequest,
  updateHealthReportConfig,
  isFetchingUpdateHealthReportConfig,
  fetchPresaleEventsHealthReportRequest,
  presaleEventsHealthReport,
  isFetchingPresaleEventsHealthReport,
  fetchEventMonitoringHealthReportRequest,
  eventMonitoringHealthReport,
  isFetchingShortEventMonitoringHealthReport,
  isFetchingMediumEventMonitoringHealthReport,
  isFetchingLongEventMonitoringHealthReport,
  isFetchingNearEventMonitoringHealthReport,
  globals
}) => {
  return (
    <div className="animated fadeIn">
      <div className="full_width">
        <div className="page_name">
          <h2>Health Report</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="inner_box_body padL3T5 pb-0">
              <SaleMargin
                fetchSaleMarginHealthReportRequest={
                  fetchSaleMarginHealthReportRequest
                }
                saleMarginHealthReport={saleMarginHealthReport}
                isSaleMarginFetching={isSaleMarginFetching}
                fetchMarketwiseSaleMarginHealthReportRequest={
                  fetchMarketwiseSaleMarginHealthReportRequest
                }
                marketwiseSaleMarginHealthReport={
                  marketwiseSaleMarginHealthReport
                }
                isMarketwiseSaleMarginFetching={isMarketwiseSaleMarginFetching}
                fetchUpdateHealthReportConfigRequest={
                  fetchUpdateHealthReportConfigRequest
                }
              />
            </div>
            <div className="inner_box_body padL3T5 pb-0">
              <SkyboxPostedEvents
                fetchSBEventsHealthReportRequest={
                  fetchSBEventsHealthReportRequest
                }
                skyboxEventsHealthReport={skyboxEventsHealthReport}
                isFetchingSkyboxEventsHealthReport={
                  isFetchingSkyboxEventsHealthReport
                }
                fetchSBPostedPresaleEventsHealthReportRequest={
                  fetchSBPostedPresaleEventsHealthReportRequest
                }
                skyboxPostedPresaleEventsHealthReport={
                  skyboxPostedPresaleEventsHealthReport
                }
                isFetchingSkyboxPostedPresaleEventsHealthReport={
                  isFetchingSkyboxPostedPresaleEventsHealthReport
                }
                fetchSBPostedEventsHealthReportRequest={
                  fetchSBPostedEventsHealthReportRequest
                }
                skyboxPostedEventsHealthReport={skyboxPostedEventsHealthReport}
                isFetchingSkyboxPostedEventsHealthReport={
                  isFetchingSkyboxPostedEventsHealthReport
                }
                fetchCancelledSBEventsHealthReportRequest={
                  fetchCancelledSBEventsHealthReportRequest
                }
                cancelledSkyboxEventsHealthReport={
                  cancelledSkyboxEventsHealthReport
                }
                isFetchingCancelledSkyboxEventsHealthReport={
                  isFetchingCancelledSkyboxEventsHealthReport
                }
                fetchUpdateHealthReportConfigRequest={
                  fetchUpdateHealthReportConfigRequest
                }
                updateHealthReportConfig={updateHealthReportConfig}
                isFetchingUpdateHealthReportConfig={
                  isFetchingUpdateHealthReportConfig
                }
                fetchPresaleEventsHealthReportRequest={
                  fetchPresaleEventsHealthReportRequest
                }
                presaleEventsHealthReport={presaleEventsHealthReport}
                isFetchingPresaleEventsHealthReport={
                  isFetchingPresaleEventsHealthReport
                }
              />
            </div>
            <div className="inner_box_body padL3T5 pb-0">
              <EventQueue
                fetchEventQueueHealthReportRequest={
                  fetchEventQueueHealthReportRequest
                }
                eventQueueHealthReport={eventQueueHealthReport}
                isFetchingEventQueueHealthReport={
                  isFetchingEventQueueHealthReport
                }
                fetchUpdateHealthReportConfigRequest={
                  fetchUpdateHealthReportConfigRequest
                }
              />
            </div>
            {/* <div className="inner_box_body padL3T5 pb-0">
              <EventMonitoring
                fetchUpdateHealthReportConfigRequest={fetchUpdateHealthReportConfigRequest}
                isFetchingUpdateHealthReportConfig={isFetchingUpdateHealthReportConfig}
                fetchEventMonitoringHealthReportRequest={fetchEventMonitoringHealthReportRequest}
                eventMonitoringHealthReport={eventMonitoringHealthReport}
                isFetchingShortEventMonitoringHealthReport={isFetchingShortEventMonitoringHealthReport}
                isFetchingMediumEventMonitoringHealthReport={isFetchingMediumEventMonitoringHealthReport}
                isFetchingLongEventMonitoringHealthReport={isFetchingLongEventMonitoringHealthReport}
                isFetchingNearEventMonitoringHealthReport={isFetchingNearEventMonitoringHealthReport}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthReport;
