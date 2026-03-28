import * as actionTypes from "./actionTypes";
import axios from "axios";
import { MOCK_ROUTES } from "../../data/mockData";

const getRoutesRequest = () => ({ type: actionTypes.GET_ROUTES_REQUEST });
const getRoutesSuccess = (routes) => ({ type: actionTypes.GET_ROUTES_SUCCESS, payload: routes });
const getRoutesFailure = () => ({ type: actionTypes.GET_ROUTES_FAILURE });

export const getRoutes = () => async (dispatch) => {
  dispatch(getRoutesRequest());
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/v1/api/routes`
    );
    // Merge backend routes with mock routes (deduplicate by dep+arr)
    const backendRoutes = res.data || [];
    const allRoutes = [...backendRoutes];
    MOCK_ROUTES.forEach((mock) => {
      const exists = backendRoutes.some(
        (r) =>
          r.departureLocation.name.toLowerCase() === mock.departureLocation.name.toLowerCase() &&
          r.arrivalLocation.name.toLowerCase() === mock.arrivalLocation.name.toLowerCase()
      );
      if (!exists) allRoutes.push(mock);
    });
    dispatch(getRoutesSuccess(allRoutes));
  } catch (err) {
    // Backend unavailable — use mock data
    dispatch(getRoutesSuccess(MOCK_ROUTES));
  }
};
