import * as actions from "../actions/listings";

const initialState = {
  email: "",
  eventInfo: {},
  userPurchaseSummary: {},
  pdfAttachement: null,
  pdfDownloaded: null,
  orderFullFillMent: {},
  evenuePdf: null,
  broadCast_unBroadCast_data: []
};

const initialListing = {
  ids: [],
  dict: {},
  totalListing: 0,
  ordersCostCount: {
    redOrdersTotalCost: 0,
    purpleOrdersTotalCost: 0,
    greenOrdersTotalCost: 0,
    costForPurpleOrder: [],
    costForRedOrder: [],
    costForGreenOrder: []
  }
};

const listings = (
  state = {
    salesStatisticsFetching: false,
    salesByMarketFetching: false,
    salesByVenueFetching: false,
    salesByHourFetching: false,
    salesByPerformerFetching: false,
    openSaleslistings: initialListing,
    openTransferslistings: initialListing,
    upcomingOpenOrders: initialListing,
    purchasedTicketInfo: initialState,
    orderFlowListing: initialListing,
    trackedListing: [],
    cloakListing: [],
    soldStatisticsLogs: {
      soldList: [],
      preSaleList: [],
      dayOfSaleList: [],
      totalOrders: 0,
      totalProfit: 0,
      totalSales: 0,
      totalTicketsSold: 0,
      averageProfitMargin: 0
    },
    salesStatisticsLog: {
      soldList: [],
      preSaleList: [],
      dayOfSaleList: [],
      totalOrders: 0,
      totalProfit: 0,
      totalSales: 0,
      totalTicketsSold: 0,
      averageProfitMargin: 0
    },
    slipOrders: [],
    upComingOrders: [],
    salesByMarket: {
      soldList: [],
      preSaleList: [],
      dayOfSaleList: [],
      totalOrders: 0,
      totalProfit: 0,
      totalSales: 0,
      totalTicketsSold: 0,
      averageProfitMargin: 0
    },
    salesByVenue: {
      topVenueList: [],
      venueSaleProfitList: []
    },
    salesByHour: {
      data: []
    },
    salesByPerformer: {
      topPerformerList: [],
      performerSaleProfitList: []
    }
  },
  action
) => {
  switch (action.type) {
    case actions.FETCH_OPEN_SALES_SUCCESS:
      return { ...state, openSaleslistings: action.payload };
    case actions.CLEAR_OPEN_SALES_LISTINGS:
      return { ...state, openSaleslistings: initialListing };
    case actions.FETCH_OPEN_TRANSFERS_SUCCESS:
      return { ...state, openTransferslistings: action.payload };
    case actions.CLEAR_OPEN_TRANSFER_LISTINGS:
      return { ...state, openTransferslistings: initialListing };
    case actions.FETCH_UPCOMING_OPEN_ORDERS_SUCCESS:
      return { ...state, upcomingOpenOrders: action.payload };
    case actions.FETCH_SIMULATE_TRACKED_LISTING_SUCCESS:
      return { ...state, trackedListing: action.payload };
    case actions.FETCH_ORDER_FLOW_SUCCESS:
      return { ...state, orderFlowListing: action.payload };
    case actions.FETCH_PDF_ATTACHMENT_SUCCESS:
      return { ...state, pdfAttachement: action.payload };
    case actions.FETCH_EVENUE_PDF_SUCCESS:
      return { ...state, evenuePdf: action.payload };
    case actions.FETCH_PDF_DOWNLOADED_SUCCESS:
      return { ...state, pdfDownloaded: action.payload };
    case actions.FETCH_ORDER_FULLFILLMENT_SUCCESS:
      return { ...state, orderFullFillMent: action.payload };
    case actions.FETCH_CLOAK_LISTING_SUCCESS:
      return { ...state, cloakListing: action.payload };
    case actions.TRY_BUY_AGAIN_REQUEST:
      return {
        ...state,
        purchasedTicketInfo: {
          ...state.purchasedTicketInfo,
          eventInfo: action.payload
        }
      };
    case actions.FETCH_USER_SUMMARY_SUCCESS:
      return {
        ...state,
        purchasedTicketInfo: {
          ...state.purchasedTicketInfo,
          userPurchaseSummary: action.payload
        }
      };
    // case actions.RESET_EMAIL_PASSWORD_SUCCESS:
    // return {
    //   ...state,

    // }
    case actions.TRY_BUY_AGAIN_SUCCESS:
    case actions.TRY_BUY_AGAIN_FAIL:
      return {
        ...state,
        purchasedTicketInfo: {
          ...state.purchasedTicketInfo,
          email: action.payload.email,
          password: action.payload.password,
          one_ticket_password: action.payload.one_ticket_password,
          phoneNumber: action.payload.phoneNumber,
          address: action.payload.address,
          name: action.payload.name,
          capOne: action.payload.capOne,
          amex: action.payload.amex,
          comdata: action.payload.comdata,
          citi1: action.payload.citi1,
          citi2: action.payload.citi2,
          eventInfo: {
            ...state.purchasedTicketInfo.eventInfo,
            promos: action.payload.promos
          },
          locked: action.payload.locked,
          globalPromos: action.payload.globalPromos,
          partialView: action.payload.partialView,
          obstructedView: action.payload.partialView,
          limitedView: action.payload.partialView
        }
      };
    case actions.RESET_PURCHASED_TICKET_INFO:
      return { ...state, purchasedTicketInfo: initialState };

    case actions.FETCH_SOLD_STATISTICS_SUCCESS:
      return {
        ...state,
        soldStatisticsLogs: action.payload
      };
    case actions.FETCH_SOLD_STATISTICS_BEFORE_REQUEST:
      return {
        ...state,
        soldStatisticsLogs: {
          soldList: [],
          preSaleList: [],
          dayOfSaleList: [],
          totalOrders: 0,
          totalProfit: 0,
          totalSales: 0,
          totalTicketsSold: 0,
          averageProfitMargin: 0
        }
      };
    case actions.FETCH_SALES_STATISTICS_REQUEST:
      return { ...state, salesStatisticsFetching: true };
    case actions.FETCH_SALES_STATISTICS_SUCCESS:
      return {
        ...state,
        salesStatisticsFetching: false,
        salesStatisticsLog: action.payload
      };
    case actions.FETCH_BROAD_UNBROAD_CAST_EVENT_DAYS_SUCCESS:
      return {
        ...state,
        broadCast_unBroadCast_data: action.payload
      };
    case actions.FETCH_SLIPORDER_SUCCESS:
      return { ...state, slipOrders: action.payload };
    case actions.FETCH_UPCOMINGORDER_SUCCESS:
      return { ...state, upComingOrders: action.payload };
    case actions.FETCH_SALES_BY_MARKET_REQUEST:
      return { ...state, salesByMarketFetching: true };
    case actions.FETCH_SALES_BY_MARKET_SUCCESS:
      return {
        ...state,
        salesByMarketFetching: false,
        salesByMarket: action.payload
      };
    case actions.FETCH_SALES_BY_VENUE_REQUEST:
      return { ...state, salesByVenueFetching: true };
    case actions.FETCH_SALES_BY_VENUE_SUCCESS:
      return {
        ...state,
        salesByVenueFetching: false,
        salesByVenue: action.payload
      };
    case actions.FETCH_SALES_BY_HOUR_REQUEST:
      return { ...state, salesByHourFetching: true };
    case actions.FETCH_SALES_BY_HOUR_SUCCESS:
      return {
        ...state,
        salesByHourFetching: false,
        salesByHour: action.payload
      };
    case actions.FETCH_SALES_BY_PERFORMER_REQUEST:
      return { ...state, salesByPerformerFetching: true };
    case actions.FETCH_SALES_BY_PERFORMER_SUCCESS:
      return {
        ...state,
        salesByPerformerFetching: false,
        salesByPerformer: action.payload
      };
    default:
      return state;
  }
};

export default listings;

export const getOpenSalesListings = state => state.openSaleslistings;
export const getOpenTransfersListings = state => state.openTransferslistings;
export const getUpcomingOpenOrders = state => state.upcomingOpenOrders;
export const getPurchasedTicketInfo = state => state.purchasedTicketInfo;
export const getSimulateTrackedListing = state => state.trackedListing;
export const getOrderFlowListings = state => state.orderFlowListing;
export const getPDFAttachment = state => state.pdfAttachement;
export const getPDFDownloaded = state => state.pdfDownloaded;
export const getCloakListings = state => state.cloakListing;
export const getSoldStatisticsLog = state => state.soldStatisticsLogs;
export const getOrderFullFillMent = state => state.orderFullFillMent;
export const getEvenuePDF = state => state.evenuePdf;
export const getBroadCastUnbroadCastData = state =>
  state.broadCast_unBroadCast_data;
export const getSlipOrders = state => state.slipOrders;
export const getUpComingOrder = state => state.upComingOrders;
export const getSalesStatisticsLog = state => state.salesStatisticsLog;
export const getIsSalesStatisticsFetching = state =>
  state.salesStatisticsFetching;
export const getSalesByMarketType = state => state.salesByMarket;
export const getIsSalesByMarketFetching = state => state.salesByMarketFetching;
export const getSalesByVenue = state => state.salesByVenue;
export const getIsSalesByVenueFetching = state => state.salesByVenueFetching;
export const getSalesByHour = state => state.salesByHour;
export const getIsSalesByHourFetching = state => state.salesByHourFetching;
export const getSalesByPerformer = state => state.salesByPerformer;
export const getIsSalesByPerformerFetching = state =>
  state.salesByPerformerFetching;
