import axios from "axios";
import {
  GET_BUS_DETAILS_FAIL,
  GET_BUS_DETAILS_REQUEST,
  GET_BUS_DETAILS_SUCCESS,
  UPDATE_BOOKING_DETAILS,
} from "./actionTypes";
import { getMockRouteData } from "../../data/mockData";

const busDetailsRequest = () => ({ type: GET_BUS_DETAILS_REQUEST });
const busDetailsSuccess = (payload) => ({ type: GET_BUS_DETAILS_SUCCESS, payload });
const busDetailsFail = () => ({ type: GET_BUS_DETAILS_FAIL });

export const updateBookingDetails = (payload) => ({ type: UPDATE_BOOKING_DETAILS, payload });

export const getBusDetails = (depart, arrival, date) => (dispatch) => {
  dispatch(busDetailsRequest());
  axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/v1/api/routes/${depart}/${arrival}/${date}`)
    .then((res) => dispatch(busDetailsSuccess(res.data)))
    .catch(() => {
      // Fall back to mock data
      const mockData = getMockRouteData(depart, arrival);
      if (mockData) {
        dispatch(busDetailsSuccess(mockData));
      } else {
        dispatch(busDetailsFail());
      }
    });
};
