import axios from "axios"
import { subjectFailed, subjectSuccess } from "./subjectSlice";

export const subjectAction = ( ) =>  async(dispatch) => {
    try{
        const response = await axios.get(`http://172.17.19.25:8080/dvp_app/subjects/`);
        dispatch(subjectSuccess(response?.data))
        console.log(response, "SUBJE SUCC")
    }catch(error) {
        dispatch(subjectFailed(error?.data));
        console.log(error, "SUBJECT ERRRRRRR")
    }

}