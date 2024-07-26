import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import { EyeOutlined } from "@ant-design/icons";

import "./ViewLessonPlan.css";
import { useNavigate } from "react-router-dom";

const ApprovalStatus = () => {
  const [empIds, setEmpIds] = useState(null);
  const [lessonPlanName, setLessonPlanName] = useState([]);
  const [selectedSubjectLessonPlans, setSelectedSubjectLessonPlans] = useState(
    []
  );
  const [currentSubjectId, setCurrentSubjectId] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState({});
  const [remarks, setRemarks] = useState({}); // State to hold remarks for each lesson plan
  const [selectAll, setSelectAll] = useState(false);
  const [showSelectedSubjectId, setShowSelectedSubjectId] = useState(null);

  const getuserId = JSON.parse(localStorage.getItem("prod_cred"));
  const userId = getuserId?.user_id;

  const navigate = useNavigate();

  const getEmpId = async () => {
    try {
      const response = await axios(
        `http://172.17.19.25:8080/dvp_app/select_subject/?user_id=${userId}`
      );
      const employeeId = response?.data?.employee_id;
      setEmpIds(employeeId);

      const lessonData = await axios.get(
        `http://172.17.19.25:8080/dvp_app/search-lesson-plan-approval/?employee_id=${employeeId}`
      );
      const lessonPlans = lessonData?.data;
      setLessonPlanName(lessonPlans);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmpId();
  }, []);

  const handleViewClick = (subjectId) => {
    const subjectData = lessonPlanName.find(
      (item) => item.subject_id === subjectId
    );
    setSelectedSubjectLessonPlans(subjectData.lesson_plans);
    setShowSelectedSubjectId(subjectId);
    setCurrentSubjectId(subjectId);
  };

  const refreshData = async (employeeId) => {
    const response = await axios.get(
      `http://172.17.19.25:8080/dvp_app/search-lesson-plan-approval/?employee_id=${employeeId}`
    );
    console.log(response, "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
  };

  const handleCheckboxChange = (lessonPlanId, status) => {
    const currentStatus = approvalStatus[lessonPlanId];

    if (currentStatus === status) {
      const { [lessonPlanId]: _, ...rest } = approvalStatus;
      setApprovalStatus(rest);
      setRemarks((prevRemarks) => {
        const { [lessonPlanId]: _, ...restRemarks } = prevRemarks;
        return restRemarks;
      });
    } else {
      setApprovalStatus((prevStatus) => ({
        ...prevStatus,
        [lessonPlanId]: status,
      }));
      setRemarks((prevRemarks) => ({
        ...prevRemarks,
        [lessonPlanId]: status === "approved" ? "Approved" : "",
      }));
    }
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    const newStatus = {};
    if (!selectAll) {
      selectedSubjectLessonPlans.forEach((plan) => {
        newStatus[plan.lesson_plan_id] = "approved";
      });
    }
    setApprovalStatus(newStatus);
    setRemarks((prevRemarks) => {
      const newRemarks = {};
      selectedSubjectLessonPlans.forEach((plan) => {
        newRemarks[plan.lesson_plan_id] = "Approved by bulk selection";
      });
      return newRemarks;
    });
  };

  const handleStatusChange = async () => {
    if (selectedSubjectLessonPlans.length === 0) {
      Swal.fire("Error", "No lesson plans to submit.", "error");
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Are you sure you want to submit the changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (confirmResult.isConfirmed) {
      try {
        for (const plan of selectedSubjectLessonPlans) {
          const data = {
            approved: approvalStatus[plan.lesson_plan_id] || "pending",
            remarks: remarks[plan.lesson_plan_id] || "",
          };

          await axios.patch(
            `http://172.17.19.25:8080/dvp_app/update-lesson-plan-status/${plan.lesson_plan_id}/`,
            data
          );
        }

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        Swal.fire("Success", "Changes have been submitted.", "success");
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to submit changes.", "error");
      }
    }
  };

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: "flex" }} className="production">
      <SideBar />
      <div className="content">
     
        <div className="notification-wrapper">
          <h4>Action Needed</h4>
          {lessonPlanName &&
            lessonPlanName.map((item) => (
              <div
                key={item.subject_id}
                className={`notification ${
                  showSelectedSubjectId === item?.subject_id
                    ? "selectedClass"
                    : null
                }`}
              >
                <div>
                  {" "}
                  {item?.subject_name} {"   "} ({item?.subject_code})
                </div>
                <div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleViewClick(item.subject_id)}
                  >
                    <EyeOutlined />
                  </div>
                </div>
              </div>
            ))}
        </div>
      
        <div className="lesson-table-wrapper">
        <div
          style={{ cursor: "pointer", fontWeight: "bold", marginBottom:"20px" }}
          onClick={handleBackPage}
        >
          Back
        </div>
          <h4>Pending Lesson Plan Request</h4>
          {selectedSubjectLessonPlans.length > 0 && (
            <div className="lesson-table-container">
              <h4>Lesson Plans</h4>
              <table className="lesson-table">
                <thead>
                  <tr>
                  <th className="small-font">Received From</th>
                    <th className="small-font">Module</th>
                    <th className="small-font">Module Learning Objective</th>
                    <th className="small-font">Topic</th>
                    <th className="small-font">Subtopic</th>
                    <th className="small-font">Subtopic Learning Objective</th>
                    <th className="small-font">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                      />{" "}
                      Approve All
                    </th>
                    <th className="small-font">Reject</th>
                    <th className="small-font">Remark</th>{" "}
                    {/* New column for remarks */}
                  </tr>
                </thead>
                <tbody>
                  {selectedSubjectLessonPlans.map((plan) => (
                    <tr key={plan.lesson_plan_id}>
                      <td>{plan.employee_name}</td>
                      <td>{plan.module}</td>
                      <td>{plan.module_learning_objective}</td>
                      <td>{plan.topic}</td>
                      <td>{plan.subtopic}</td>
                      <td>{plan.subtopic_learning_objective}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            approvalStatus[plan.lesson_plan_id] === "approved"
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              plan.lesson_plan_id,
                              "approved"
                            )
                          }
                          disabled={
                            approvalStatus[plan.lesson_plan_id] === "rejected"
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={
                            approvalStatus[plan.lesson_plan_id] === "rejected"
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              plan.lesson_plan_id,
                              "rejected"
                            )
                          }
                          disabled={
                            approvalStatus[plan.lesson_plan_id] === "approved"
                          }
                        />
                      </td>
                      <td>
                        {approvalStatus[plan.lesson_plan_id] === "rejected" && (
                          <input
                            type="text"
                            value={remarks[plan.lesson_plan_id] || ""}
                            onChange={(e) =>
                              setRemarks((prevRemarks) => ({
                                ...prevRemarks,
                                [plan.lesson_plan_id]: e.target.value,
                              }))
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {Object.keys(approvalStatus).length > 0 && (
                <div className="actions">
                  <button onClick={handleStatusChange}>Submit</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalStatus;
