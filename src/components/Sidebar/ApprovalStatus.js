// import React, { useEffect, useState } from "react";
// import SideBar from "./SideBar";
// import axios from "axios";
// import { getLesson } from "../../protectedRouting/Utils/apiUtils"; // Adjust the path as necessary
// import "./ViewLessonPlan.css";

// const ApprovalStatus = () => {
//   const [empIds, setEmpIds] = useState(null);
//   const [lessonPlanName, setLessonPlanName] = useState([]);
//   const [selectedSubjectLessonPlans, setSelectedSubjectLessonPlans] = useState(
//     []
//   );

//   const getuserId = JSON.parse(localStorage.getItem("prod_cred"));
//   const userId = getuserId?.user_id;
//   console.log(userId, "USER ID");

//   const getEmpId = async () => {
//     try {
//       const response = await axios(
//         `http://172.17.19.22:8080/dvp_app/select_subject/?user_id=${userId}`
//       );
//       const employeeId = response?.data?.employee_id;
//       setEmpIds(employeeId);

//       const lessonData = await axios.get(
//         `http://172.17.19.22:8080/dvp_app/search-lesson-plan-approval/?employee_id=${employeeId}`
//       );
//       const lessonPlans = lessonData?.data;
//       setLessonPlanName(lessonPlans);
//       console.log(lessonPlans, "Lesson Plans Data");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getEmpId();
//   }, []);

//   const handleViewClick = (subjectId) => {
//     const subjectData = lessonPlanName.find(
//       (item) => item.subject_id === subjectId
//     );
//     setSelectedSubjectLessonPlans(subjectData.lesson_plans);
//   };

//   return (
//     <div style={{ display: "flex" }} className="production">
//       <SideBar />
//       <div className="content">
//         <div className="notification-wrapper">
//           {/* <h4>Your lesson plan</h4> */}
//           {lessonPlanName &&
//             lessonPlanName.map((item) => (
//               <div key={item.subject_id} className="notification">
//                 <div>Lesson Plan for {item?.subject_name} created</div>
//                 <div>
//                   <button
//                     onClick={() => handleViewClick(item.subject_id)}
//                     className="view-button"
//                   >
//                     View
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//         <div className="lesson-table-wrapper">
//           <h4>Approval Lesson Plan Request</h4>
//           {selectedSubjectLessonPlans.length > 0 && (
//             <div className="lesson-table-container">
//               <h4>Lesson Plans</h4>
//               <table className="lesson-table">
//                 <thead>
//                   <tr>
//                     <th>Module</th>
//                     <th>Module Learning Objective</th>
//                     <th>Topic</th>
//                     <th>Subtopic</th>
//                     <th>Subtopic Learning Objective</th>
//                     <th>Session Code</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedSubjectLessonPlans.map((plan) => (
//                     <tr key={plan.lesson_plan_id}>
//                       <td>{plan.module}</td>
//                       <td>{plan.module_learning_objective}</td>
//                       <td>{plan.topic}</td>
//                       <td>{plan.subtopic}</td>
//                       <td>{plan.subtopic_learning_objective}</td>
//                       <td>{plan.session_code}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApprovalStatus;

// import React, { useEffect, useState } from "react";
// import SideBar from "./SideBar";
// import axios from "axios";
// import { getLesson } from "../../protectedRouting/Utils/apiUtils"; // Adjust the path as necessary
// import "./ViewLessonPlan.css";
// import Swal from "sweetalert2";

// const ApprovalStatus = () => {
//   const [empIds, setEmpIds] = useState(null);
//   const [lessonPlanName, setLessonPlanName] = useState([]);
//   const [selectedSubjectLessonPlans, setSelectedSubjectLessonPlans] = useState(
//     []
//   );

//   const getuserId = JSON.parse(localStorage.getItem("prod_cred"));
//   const userId = getuserId?.user_id;
//   console.log(userId, "USER ID");

//   const getEmpId = async () => {
//     try {
//       const response = await axios(
//         `http://172.17.19.22:8080/dvp_app/select_subject/?user_id=${userId}`
//       );
//       const employeeId = response?.data?.employee_id;
//       setEmpIds(employeeId);

//       const lessonData = await axios.get(
//         `http://172.17.19.22:8080/dvp_app/search-lesson-plan-approval/?employee_id=${employeeId}`
//       );
//       const lessonPlans = lessonData?.data;
//       setLessonPlanName(lessonPlans);
//       console.log(lessonPlans, "Lesson Plans Data");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getEmpId();
//   }, []);

//   const handleViewClick = (subjectId) => {
//     const subjectData = lessonPlanName.find(
//       (item) => item.subject_id === subjectId
//     );
//     setSelectedSubjectLessonPlans(subjectData.lesson_plans);
//   };

//   const handleStatusChange = async (subjectId, status) => {
//     const confirmation = window.confirm(
//       `Are you sure you want to ${status} this module?`
//     );
//     if (confirmation) {
//       try {
//         await axios.patch(
//           `http://172.17.19.22:8080/dvp_app/lesson-plan-status/subject/${subjectId}/status/`,
//           {
//             status: status,
//           }
//         );
//         Swal.fire({
//           icon: "success",
//           title: `Lesson Plan Approved successfully`,
//           showConfirmButton: false,
//           timer: 3000,
//         });
//         // Refresh the lesson plans data after the update
//         getEmpId();
//       } catch (error) {
//         console.log(error);
//         Swal.fire({
//           icon: "warning",
//           title: `Lesson Plan Disapproved`,
//           showConfirmButton: false,
//           timer: 3000,
//         });
//       }
//     }
//   };

//   return (
//     <div style={{ display: "flex" }} className="production">
//       <SideBar />
//       <div className="content">
//         <div className="notification-wrapper">
//           {lessonPlanName &&
//             lessonPlanName.map((item) => (
//               <div key={item.subject_id} className="notification">
//                 <div>Lesson Plan for {item?.subject_name} created</div>
//                 <div>
//                   <button
//                     onClick={() => handleViewClick(item.subject_id)}
//                     className="view-button"
//                   >
//                     View
//                   </button>
//                   <button className="edit-button">Edit</button>
//                   <button className="delete-button">Delete</button>
//                 </div>
//               </div>
//             ))}
//         </div>
//         <div className="lesson-table-wrapper">
//           <h4>Lesson Plan Pending Request</h4>
//           {selectedSubjectLessonPlans.length > 0 && (
//             <div className="lesson-table-container">
//               <h4>Lesson Plans</h4>
//               <table className="lesson-table">
//                 <thead>
//                   <tr>
//                     <th>Module</th>
//                     <th>Module Learning Objective</th>
//                     <th>Topic</th>
//                     <th>Subtopic</th>
//                     <th>Subtopic Learning Objective</th>
//                     <th>Session Code</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <>
//                     {selectedSubjectLessonPlans.map((plan) => (
//                       <tr key={plan.lesson_plan_id}>
//                         <td>{plan.module}</td>
//                         <td>{plan.module_learning_objective}</td>
//                         <td>{plan.topic}</td>
//                         <td>{plan.subtopic}</td>
//                         <td>{plan.subtopic_learning_objective}</td>
//                         <td>{plan.session_code}</td>
//                         <button onClick={() => handleStatusChange(plan.subject_id, "approved")}>Approve</button>
//                         <button onClick={() => handleStatusChange(plan.subject_id, "rejected")}>Reject</button>
//                       </tr>
//                     ))}
//                   </>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApprovalStatus;


import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import "./ViewLessonPlan.css";
import Swal from "sweetalert2";

const ApprovalStatus = () => {
  const [empIds, setEmpIds] = useState(null);
  const [lessonPlanName, setLessonPlanName] = useState([]);
  const [selectedSubjectLessonPlans, setSelectedSubjectLessonPlans] = useState([]);
  const [currentSubjectId, setCurrentSubjectId] = useState(null);

  const getuserId = JSON.parse(localStorage.getItem("prod_cred"));
  const userId = getuserId?.user_id;
  console.log(userId, "USER ID");

  const getEmpId = async () => {
    try {
      const response = await axios(`http://172.17.19.22:8080/dvp_app/select_subject/?user_id=${userId}`);
      const employeeId = response?.data?.employee_id;
      setEmpIds(employeeId);

      const lessonData = await axios.get(`http://172.17.19.22:8080/dvp_app/search-lesson-plan-approval/?employee_id=${employeeId}`);
      const lessonPlans = lessonData?.data;
      setLessonPlanName(lessonPlans);
      console.log(lessonPlans, "Lesson Plans Data");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmpId();
  }, []);

  const handleViewClick = (subjectId) => {
    const subjectData = lessonPlanName.find((item) => item.subject_id === subjectId);
    setSelectedSubjectLessonPlans(subjectData.lesson_plans);
    setCurrentSubjectId(subjectId);
  };

//   const handleStatusChange = async (status) => {
//     const confirmation = window.confirm(`Are you sure you want to ${status} all modules?`);
//     if (confirmation) {
//       try {
//         await axios.patch(`http://172.17.19.22:8080/dvp_app/lesson-plan-status/subject/${currentSubjectId}/status/`, {
//           status: status
//         });
//         // Refresh the lesson plans data after the update
//         getEmpId();
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };


const handleStatusChange = async (status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} all modules?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`http://172.17.19.22:8080/dvp_app/lesson-plan-status/subject/${currentSubjectId}/status/`, {
            status: status
          });
          // Refresh the lesson plans data after the update
          getEmpId();
          Swal.fire("Success", `Modules have been ${status}ed.`, "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Error", `Failed to ${status} modules.`, "error");
        }
      }
    });
  };



  return (
    <div style={{ display: "flex" }} className="production">
      <SideBar />
      <div className="content">
        <div className="notification-wrapper">
          <h4>Action Needed</h4>
          {lessonPlanName &&
            lessonPlanName.map((item) => (
              <div key={item.subject_id} className="notification">
                <div>Lesson Plan for {item?.subject_name} </div>
                <div>
                  <button onClick={() => handleViewClick(item.subject_id)} className="view-button">
                    View
                  </button>
                  {/* <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button> */}
                </div>
              </div>
            ))}
        </div>
        <div className="lesson-table-wrapper">
          <h4>Pending Lesson Plan Request</h4>
          {selectedSubjectLessonPlans.length > 0 && (
            <div className="lesson-table-container">
              <h4>Lesson Plans</h4>
              <table className="lesson-table">
                <thead>
                  <tr>
                    <th className="small-font">Module</th>
                    <th className="small-font">Module Learning Objective</th>
                    <th className="small-font">Topic</th>
                    <th className="small-font">Subtopic</th>
                    <th className="small-font">Subtopic Learning Objective</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {selectedSubjectLessonPlans.map((plan) => (
                    <tr key={plan.lesson_plan_id}>
                      <td>{plan.module}</td>
                      <td>{plan.module_learning_objective}</td>
                      <td>{plan.topic}</td>
                      <td>{plan.subtopic}</td>
                      <td>{plan.subtopic_learning_objective}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="actions">
                <button className="approve" onClick={() => handleStatusChange("approved")}>Approve </button>
                <button className="reject" onClick={() => handleStatusChange("rejected")}>Reject </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalStatus;
