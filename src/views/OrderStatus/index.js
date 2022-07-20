import { connect } from "react-redux";

import OrderStatus from "./OrderStatus";
import { getIsFetching, getOrderStatusListings } from "../../reducers";
import { fetchOrderStatusRequest } from "../../actions/orderStatus";

const OrderStatusContainer = connect(
  state => ({
    orderStatuslistings: getOrderStatusListings(state),
    isFetching: getIsFetching(state)
  }),
  {
    fetchOrderStatusRequest
  }
)(OrderStatus);

export default OrderStatusContainer;
