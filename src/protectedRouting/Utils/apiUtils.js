import axios from "axios";

export const getLesson = async (employeeId) => {
  try {
    const response = await axios(
      `http://172.17.19.22:8080/dvp_app/lesson-plans/search/?employee_id=${employeeId}`
    );
    console.log(response?.data, "Lesson");
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getApprovalStatus = async(employeeId) => {
    try {
        const response = await axios(
          `http://172.17.19.22:8080/dvp_app/search-lesson-plan-approval/?employee_id=${employeeId}`
        );
        console.log(response?.data, "Approval");
        return response?.data;
      } catch (error) {
        console.log(error);
      }
}