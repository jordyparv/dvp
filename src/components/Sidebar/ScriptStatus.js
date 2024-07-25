import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import { EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd"; // Import Modal from Ant Design
import "./ViewLessonPlan.css";
import send1 from "../../assets/images/send1.png";
import { getScriptStatus } from "../../protectedRouting/Utils/apiUtils";
import { useNavigate } from "react-router-dom";

const ScriptStatus = () => {
  const [empIds, setEmpIds] = useState(null);
  const [lessonPlanName, setLessonPlanName] = useState([]);
  const [scriptName, setScriptName] = useState([]);
  const [selectedSubjectLessonPlans, setSelectedSubjectLessonPlans] = useState(
    []
  );
  const [selectedScript, setSelectedScript] = useState([]); // Initialize as an array
  const [currentSubjectId, setCurrentSubjectId] = useState(null);
  const [showSelectedSubjectId, setShowSelectedSubjectId] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState({});
  const [remarks, setRemarks] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [scriptRes, setScriptRes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [modalScript, setModalScript] = useState(""); // State to hold the script content for the modal

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
      const scriptData = await getScriptStatus(employeeId);
      setScriptRes(scriptData);
      console.log(scriptData, "Fetched Script Data"); // Log fetched script data
      setLessonPlanName(lessonPlans);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmpId();
  }, []);

  const handleViewClick = (subjectId) => {
    const subjectData = scriptRes.filter(
      (item) => item.subject_id === subjectId
    );
    console.log(subjectData, "Selected Script Data"); // Log selected script data
    setSelectedScript(subjectData); // Ensure this sets an array
    setShowSelectedSubjectId(subjectId);
    setCurrentSubjectId(subjectId);
  };

  const showModal = (script) => {
    setModalScript(script);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleApprovalChange = (scriptId, status) => {
    setApprovalStatus((prev) => ({
      ...prev,
      [scriptId]: status,
    }));

    if (status === "reject") {
      setRemarks((prev) => ({
        ...prev,
        [scriptId]: "",
      }));
    } else {
      setRemarks((prev) => ({
        ...prev,
        [scriptId]: null,
      }));
    }
  };

  const handleRemarkChange = (scriptId, remark) => {
    setRemarks((prev) => ({
      ...prev,
      [scriptId]: remark,
    }));
  };

  const handleSend = async (lessonPlanId) => {
    const approval = {
      approved:
        approvalStatus[lessonPlanId] === "approve" ? "approved" : "rejected",
        remarks: remarks[lessonPlanId] || "",
    };

    console.log(approval); // Log approval for debugging

    try {
      const response = await axios.patch(
        `http://172.17.19.25:8080/dvp_app/update-subtopic-upload-status/${lessonPlanId}/`,
        approval
      );
      Swal.fire("Success", "Approved", "success");
      getEmpId();
      setTimeout(() => {
        window.location.reload();
      })
    } catch (error) {
      Swal.fire("Error", "Failed to submit approval", "error");
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
          {scriptRes &&
            scriptRes.map((item) => (
              <div
                key={item.subject_id}
                className={`notification ${
                  showSelectedSubjectId === item?.subject_id
                    ? "selectedClass"
                    : null
                }`}
              >
                <div>{item?.subject_name}</div>
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
          <h4>Pending Script Approval Request</h4>
          {selectedScript.length > 0 && (
            <div className="lesson-table-container">
              <h4>Lesson Plans</h4>
              <table className="lesson-table">
                <thead>
                  <tr>
                    <th className="small-font">Subject</th>
                    <th className="small-font">Subject Code</th>
                    <th className="small-font">Received From</th>
                    <th className="small-font">Sub Topics</th>
                    <th className="small-font">Script</th>
                    <th className="small-font">Approve</th>
                    <th className="small-font">Reject</th>
                    <th className="small-font">Remark</th>
                    <th className="small-font">Send</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedScript.map((script) => (
                    <tr key={script.lesson_plan_id}>
                      <td>{script.subject_name}</td>
                      <td>{script.subject_code}</td>
                      <td>{script.employee_name}</td>
                      <td>{script.subtopic}</td>
                      <td>
                        <a onClick={() => showModal(script.script)}>
                          <EyeOutlined style={{ cursor: "pointer" }} />
                        </a>
                      </td>
                      <td>
                        <input
                          type="radio"
                          name={`approval_${script.lesson_plan_id}`}
                          value="approve"
                          checked={
                            approvalStatus[script.lesson_plan_id] === "approve"
                          }
                          onChange={() =>
                            handleApprovalChange(
                              script.lesson_plan_id,
                              "approve"
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="radio"
                          name={`approval_${script.lesson_plan_id}`}
                          value="reject"
                          checked={
                            approvalStatus[script.lesson_plan_id] === "reject"
                          }
                          onChange={() =>
                            handleApprovalChange(
                              script.lesson_plan_id,
                              "reject"
                            )
                          }
                        />
                      </td>
                      <td>
                        {approvalStatus[script.lesson_plan_id] === "reject" && (
                          <input
                            type="text"
                            value={remarks[script.lesson_plan_id] || ""}
                            onChange={(e) =>
                              handleRemarkChange(
                                script.lesson_plan_id,
                                e.target.value
                              )
                            }
                            placeholder="Enter remark"
                          />
                        )}
                      </td>
                      <td>
                        <div onClick={() => handleSend(script.lesson_plan_id)}>
                          <img
                            style={{ width: "30px", cursor: "pointer" }}
                            src={send1}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Script"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div dangerouslySetInnerHTML={{ __html: modalScript }} />
      </Modal>
    </div>
  );
};

export default ScriptStatus;
