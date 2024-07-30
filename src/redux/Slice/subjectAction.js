import axios from "axios"
import { subjectFailed, subjectSuccess } from "./subjectSlice";

export const subjectAction = () => async (dispatch) => {
    try {
        const response = await axios.get(`http://43.204.119.135/api/dvp_app/subjects/`);
        dispatch(subjectSuccess(response?.data))
        console.log(response, "SUBJE SUCC")
    } catch (error) {
        dispatch(subjectFailed(error?.data));
        console.log(error, "SUBJECT ERRRRRRR")
    }

}