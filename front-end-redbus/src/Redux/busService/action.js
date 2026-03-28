import * as actionTypes from "./actionTypes";
import axios from "axios";
import { MOCK_BUS_SERVICES } from "../../data/mockBusService";

const getBusMongoRequest = () => ({ type: actionTypes.GET_BUS_MONGO_REQUEST });
const getBusMongoSuccess = (payload) => ({ type: actionTypes.GET_BUS_MONGO_SUCCESS, payload });
const getBusMongoFailure = () => ({ type: actionTypes.GET_BUS_MONGO_FAILURE });
const getBusOnId = (payload) => ({ type: actionTypes.GET_BUS_MONGO_ID_SUCCESS, payload });

export const getBusData2 = (pickUp, drop, passengers) => (dispatch) => {
  dispatch(getBusMongoRequest());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/v1/api/busservice/`)
    .then((res) => dispatch(getBusMongoSuccess(res.data.data)))
    .catch(() => {
      // Filter by capacity if passengers provided
      let buses = MOCK_BUS_SERVICES;
      if (passengers) {
        const pax = parseInt(passengers);
        buses = buses.filter((b) => b.capacity >= pax);
      }
      dispatch(getBusMongoSuccess(buses));
    });
};

export const getBusOnIdThunk = (id) => (dispatch) => {
  dispatch(getBusMongoRequest());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/v1/api/busservice/${id}`)
    .then((res) => dispatch(getBusOnId(res.data)))
    .catch(() => {
      const bus = MOCK_BUS_SERVICES.find((b) => b._id === id);
      if (bus) dispatch(getBusOnId(bus));
      else dispatch(getBusMongoFailure());
    });
};
