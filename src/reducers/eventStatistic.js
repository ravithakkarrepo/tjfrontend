import * as actions from "../actions/eventStatistic";

const initalState = {
  eventStatisticListing: {
    events: []
  },
  eventMonitorListing: [],
  page: 1,
  unmatchEventQueueListing: [],
  misMatchedEventsQueue: [],
  showsOnSaleEvents: {
    matchedEvents: [],
    unMatchedEvents: []
  },
  eventStatisticCount: {
    eventsAddedCount: 0,
    venuesAddedCount: 0,
    eventsCancelCount: 0,
    eventPostPondCount: 0,
    allEventsFromQueueToManageEventCount: 0,
    eventsAddedGraphData: [],
    venuesAddedCountGraphData: [],
    allEventsFromQueueToManageEventGraphData: []
  }
};

const eventStatistic = (state = initalState, action) => {
  switch (action.type) {
    case actions.FETCH_EVENT_STATISTIC_SUCCESS:
      if (action.payload.eventsCount) {
        return {
          ...state,
          eventStatisticListing: {
            events: action.payload.events,
            page: action.payload.page
          },
          eventStatisticCount: action.payload.eventsCount
        };
      } else {
        return {
          ...state,
          eventStatisticListing: {
            events: action.payload.events,
            page: action.payload.page
          }
        };
      }

    case actions.FETCH_EVENT_MONITOR_SUCCESS:
      return {
        ...state,
        eventMonitorListing: { ...state.eventMonitorListing, ...action.payload }
      };
    case actions.FETCH_EVENT_REMONITOR_PRESALE_SUCCESS:
      return {
        ...state,
        eventMonitorListing: {
          ...state.eventMonitorListing,
          reMonitorPresale: action.payload
        }
      };
    case actions.UPDATE_ISMONITOR_SUCCESS:
      if (action.payload.extraData === "isFromCountTable") {
        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            onCountPresale: state.eventMonitorListing.onCountPresale.filter(
              i => i._id !== action.payload.row._id
            )
          }
        };
      } else if (action.payload.extraData === "isFromRemonitorPresaleTable") {
        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            reMonitorPresale: state.eventMonitorListing.reMonitorPresale.filter(
              i => i._id !== action.payload.row._id
            )
          }
        };
      } else {
        let eventIds = [];
        if (!action.payload.row) {
          // multiple monitor event
          eventIds = action.payload.body.eventIds;
        } else {
          eventIds = action.payload.body.eventIds;
        }

        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            eventsAdded: {
              sortedEventQueueListings: state.eventMonitorListing.eventsAdded.sortedEventQueueListings.filter(
                i => !eventIds.includes(i._id)
              )
            }
          }
        };
      }
    case actions.UPDATE_ISBLACKLIST_SUCCESS:
      if (action.payload.is_blackList) {
        if (action.payload.isFromRemonitorPresaleTable) {
          return {
            ...state,
            eventMonitorListing: {
              ...state.eventMonitorListing,
              reMonitorPresale: state.eventMonitorListing.reMonitorPresale.filter(
                i => i._id.toString() !== action.payload.eventId.toString()
              )
            }
          };
        } else if (action.payload.isFromCountdown) {
          return {
            ...state,
            eventMonitorListing: {
              ...state.eventMonitorListing,
              onCountPresale: state.eventMonitorListing.onCountPresale.filter(
                i => i._id.toString() !== action.payload.eventId.toString()
              )
            }
          };
        } else {
          return {
            ...state,
            eventMonitorListing: {
              ...state.eventMonitorListing,
              eventsAdded: {
                sortedEventQueueListings: state.eventMonitorListing.eventsAdded.sortedEventQueueListings.filter(
                  i => i._id.toString() !== action.payload.eventId.toString()
                )
              }
            }
          };
        }
      } else {
        return state;
      }
    case actions.ADD_EVENT_PROMO__SUCCESS:
      if (action.payload.isFromRemonitorPresaleTable) {
        const objIndex = state.eventMonitorListing.reMonitorPresale.findIndex(
          obj =>
            obj.eventId === action.payload.eventId ||
            obj._id === action.payload.eventDBId
        );

        const newArray = [...state.eventMonitorListing.reMonitorPresale]; //making a new array

        if (action.payload.isPromoDeleted) {
          let keys = Object.keys(action.payload.promos);
          delete newArray[objIndex].promos[keys[0]]; //changing value in the new array
        } else {
          newArray[objIndex].promos = action.payload.promos; //changing value in the new array
        }
        if (Object.keys(newArray[objIndex].promos).length <= 0)
          newArray[objIndex].promos = null;

        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            reMonitorPresale: newArray
          }
        };
      } else if (action.payload.isFromCountdown) {
        const objIndex = state.eventMonitorListing.onCountPresale.findIndex(
          obj =>
            obj.eventId === action.payload.eventId ||
            obj._id === action.payload.eventDBId
        );

        const newArray = [...state.eventMonitorListing.onCountPresale]; //making a new array

        if (action.payload.isPromoDeleted) {
          let keys = Object.keys(action.payload.promos);
          delete newArray[objIndex].promos[keys[0]]; //changing value in the new array
        } else {
          newArray[objIndex].promos = action.payload.promos; //changing value in the new array
        }
        if (Object.keys(newArray[objIndex].promos).length <= 0)
          newArray[objIndex].promos = null;

        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            onCountPresale: newArray
          }
        };
      } else {
        const objIndex = state.eventMonitorListing.eventsAdded.sortedEventQueueListings.findIndex(
          obj =>
            obj.eventId === action.payload.eventId ||
            obj._id === action.payload.eventDBId
        );

        const newArray = [
          ...state.eventMonitorListing.eventsAdded.sortedEventQueueListings
        ]; //making a new array

        if (action.payload.isPromoDeleted) {
          let keys = Object.keys(action.payload.promos);
          delete newArray[objIndex].promos[keys[0]]; //changing value in the new array
        } else {
          newArray[objIndex].promos = action.payload.promos; //changing value in the new array
        }
        if (Object.keys(newArray[objIndex].promos).length <= 0)
          newArray[objIndex].promos = null;

        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            eventsAdded: {
              sortedEventQueueListings: newArray
            }
          }
        };
      }
    case actions.UPDATE_MISMATCH_FROM_EVENT_QUEUE_SUCCESS:
      if (action.payload.isFromRemonitorPresaleTable) {
        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            reMonitorPresale: state.eventMonitorListing.reMonitorPresale.filter(
              i => i._id.toString() !== action.payload.eventId.toString()
            )
          }
        };
      } else if (action.payload.isFromCountdown) {
        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            onCountPresale: state.eventMonitorListing.onCountPresale.filter(
              i => i._id.toString() !== action.payload.eventId.toString()
            )
          }
        };
      } else {
        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            eventsAdded: {
              sortedEventQueueListings: state.eventMonitorListing.eventsAdded.sortedEventQueueListings.filter(
                i => i._id.toString() !== action.payload.eventId.toString()
              )
            }
          }
        };
      }
    case actions.UPDATE_BY_SKYBOX_EVENT_FROM_EVENT_QUEUE_SUCCESS:
      if (action.payload.isFromRemonitorPresaleTable) {
        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            reMonitorPresale: state.eventMonitorListing.reMonitorPresale.filter(
              i => i._id.toString() !== action.payload.data.eventId.toString()
            )
          }
        };
      } else if (action.payload.isFromCountdown) {
        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            onCountPresale: state.eventMonitorListing.onCountPresale.filter(
              i => i._id.toString() !== action.payload.data.eventId.toString()
            )
          }
        };
      } else {
        return {
          ...state,
          eventMonitorListing: {
            ...state.eventMonitorListing,
            eventsAdded: {
              sortedEventQueueListings: state.eventMonitorListing.eventsAdded.sortedEventQueueListings.filter(
                i => i._id.toString() !== action.payload.data.eventId.toString()
              )
            }
          }
        };
      }

    case actions.FETCH_UNMATCHEDEVENT_QUEUE_SUCCESS:
      return { ...state, unmatchEventQueueListing: action.payload };
    case actions.FETCH_MIS_MATCHED_EVENT_QUEUE_SUCCESS:
      return { ...state, misMatchedEventsQueue: action.payload };
    case actions.FETCH_SHOWONSALE_EVENT_SUCCESS:
      console.log("payload======", action.payload);
      if (action.payload.isFetchedFromMatch) {
        return {
          ...state,
          showsOnSaleEvents: {
            ...state.showsOnSaleEvents,
            matchedEvents: action.payload.saleData.matchedEvents
          }
        };
      } else if (action.payload.isFetchedFromUnmatch) {
        return {
          ...state,
          showsOnSaleEvents: {
            ...state.showsOnSaleEvents,
            unMatchedEvents: action.payload.saleData.unMatchedEvents
          }
        };
      } else {
        return { ...state, showsOnSaleEvents: action.payload.saleData };
      }

    default:
      return state;
  }
};

export default eventStatistic;

export const getEventStatistic = state => state.eventStatisticListing;
export const getEventStatisticCount = state => state.eventStatisticCount;

export const getEventMonitor = state => state.eventMonitorListing;
export const getUnmatchedEventQueue = state => state.unmatchEventQueueListing;
export const getShowOnSaleEvents = state => state.showsOnSaleEvents;
export const getMisMatchedEventQueue = state => state.misMatchedEventsQueue;
