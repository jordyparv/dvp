import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import {
  Button,
  Drawer,
  Input,
  message,
  Modal,
  Popover,
  Space,
  Spin,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./ViewLessonPlan.css";
import add from "../../assets/images/add.png";
import minus from "../../assets/images/minus.png";
import { BsEmojiAngryFill, BsEmojiExpressionlessFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { getLesson } from "../../protectedRouting/Utils/apiUtils";
import script from "../../assets/images/script.png";
import pastescript from "../../assets/images/pastescript.png";
import Swal from "sweetalert2";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { useNavigate } from "react-router-dom";

const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const ViewLessonPlan = () => {
  const [empIds, setEmpIds] = useState(null);
  const [lessonPlans, setLessonPlans] = useState([]);
  const [selectedLessonPlan, setSelectedLessonPlan] = useState(null);
  const [showLesson, setShowLesson] = useState([]);
  const [showSelectedSubjectId, setShowSelectedSubjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLessonDrawer, setShowLessonDrawer] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [scriptContent, setScriptContent] = useState("");

  const [currentLessonPlanId, setCurrentLessonPlanId] = useState(null); // New state variable
  const [scriptData, setScriptData] = useState(null); // New state variable

  const [showScript, setShowScript] = useState([]);
  const [scriptModal, setScriptModal] = useState(false);

  const [scriptDataStatus, setScriptDataStatus] = useState("");

  const getuserId = JSON.parse(localStorage.getItem("prod_cred"));
  const userId = getuserId?.user_id;
  const navigate = useNavigate();

  const getEmpId = async () => {
    try {
      const response = await axios.get(
        `http://172.17.19.25:8080/dvp_app/select_subject/?user_id=${userId}`
      );
      const employeeId = response?.data?.employee_id;
      const lessonData = await getLesson(employeeId);
      setShowLesson(lessonData);
      setEmpIds(employeeId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmpId();
  }, []);

  const fetchLessonPlans = async (subjectId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://172.17.19.25:8080/dvp_app/get_lesson_plans/${subjectId}/`
      );

      // Log the entire response to see the structure
      console.log("Response:", response.data);

      // Log each lesson_plan_id
      response.data.forEach((plan) => {
        console.log("Lesson Plan ID:", plan.lessonPlan[0]?.lesson_plan_id);
      });

      setLessonPlans(response.data);
      setSelectedLessonPlan(
        response.data.length === 1 ? response.data[0].lessonPlan : null
      );
      // setShowLessonDrawer(response?.data)
      // console.log(response?.data, "TABLE RESOOOOO");
    } catch (error) {
      console.error("Error fetching lesson plans", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = async (subjectId) => {
    setShowSelectedSubjectId(subjectId);
    await fetchLessonPlans(subjectId);
  };

  const handleLessonPlanClick = (lessonPlan) => {
    setSelectedLessonPlan(lessonPlan?.lessonPlan);
  };

  const handleInputChange = (moduleIndex, topicIndex, subtopicIndex, event) => {
    const newLessonPlan = [...selectedLessonPlan];
    if (subtopicIndex !== null) {
      newLessonPlan[moduleIndex].topics[topicIndex].subtopics[subtopicIndex][
        event.target.name
      ] = event.target.value;
    } else if (topicIndex !== null) {
      newLessonPlan[moduleIndex].topics[topicIndex][event.target.name] =
        event.target.value;
    } else {
      newLessonPlan[moduleIndex][event.target.name] = event.target.value;
    }
    setSelectedLessonPlan(newLessonPlan);
  };

  const saveChanges = async () => {
    // Add a confirmation prompt with Cancel button using Swal
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update these changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      dangerMode: true,
    });

    if (!result.isConfirmed) return;

    // Prepare the data for the PUT request
    const updatedLessonPlan = selectedLessonPlan.map((module) => ({
      module: module.module,
      moduleLearningObjective: module.moduleLearningObjective,
      topics: module.topics.map((topic) => ({
        topic: topic.topic,
        subtopics: topic.subtopics.map((subtopic) => ({
          lesson_plan_id: subtopic.lesson_plan_id,
          subtopic: subtopic.subtopic,
          subtopic_learning_objective: subtopic.subtopic_learning_objective,
          status: subtopic.status === "rejected" ? "pending" : subtopic.status,
          subtopicLearningObjective: subtopic.subtopicLearningObjective,
        })),
      })),
    }));

    const data = {
      employee_id: empIds,
      subject_id: showSelectedSubjectId,
      updated_lesson_plan: updatedLessonPlan,
    };

    try {
      // Make the PUT request
      const response = await axios.put(
        "http://172.17.19.25:8080/dvp_app/update_lesson_plans/",
        data
      );
      console.log("PUT response:", response.data);

      // Show a success message with Swal
      Swal.fire("Success", "Changes saved successfully!", "success");
    } catch (error) {
      console.error("Error saving changes", error);

      // Show an error message with Swal
      Swal.fire(
        "Error",
        "Error saving changes. Please try again.",
        error?.response?.data?.error
      );
    }
  };

  const addModule = () => {
    setSelectedLessonPlan([
      ...selectedLessonPlan,
      {
        module: "",
        moduleLearningObjective: "",
        topics: [
          {
            topic: "",
            subtopics: [
              {
                subtopic: "",
                subtopic_learning_objective: "",
                status: "pending",
              },
            ],
          },
        ],
      },
    ]);
  };

  const removeModule = (moduleIndex) => {
    const newLessonPlan = selectedLessonPlan.filter(
      (_, index) => index !== moduleIndex
    );
    setSelectedLessonPlan(newLessonPlan);
  };

  const addTopic = (moduleIndex) => {
    const newLessonPlan = [...selectedLessonPlan];
    newLessonPlan[moduleIndex].topics.push({
      topic: "",
      subtopics: [
        { subtopic: "", subtopic_learning_objective: "", status: "pending" },
      ],
    });
    setSelectedLessonPlan(newLessonPlan);
  };

  const removeTopic = (moduleIndex, topicIndex) => {
    const newLessonPlan = [...selectedLessonPlan];
    if (
      newLessonPlan[moduleIndex].topics[topicIndex].subtopics.some(
        (subtopic) => subtopic.status === "approved"
      )
    ) {
      message.error("Cannot delete topic with approved subtopics.");
      return;
    }
    newLessonPlan[moduleIndex].topics = newLessonPlan[
      moduleIndex
    ].topics.filter((_, index) => index !== topicIndex);
    setSelectedLessonPlan(newLessonPlan);
  };

  const addSubtopic = (moduleIndex, topicIndex) => {
    const newLessonPlan = [...selectedLessonPlan];
    newLessonPlan[moduleIndex].topics[topicIndex].subtopics.push({
      subtopic: "",
      subtopic_learning_objective: "",
      status: "pending",
    });
    setSelectedLessonPlan(newLessonPlan);
  };

  const removeSubtopic = (moduleIndex, topicIndex, subtopicIndex) => {
    const newLessonPlan = [...selectedLessonPlan];
    if (
      newLessonPlan[moduleIndex].topics[topicIndex].subtopics[subtopicIndex]
        .status === "approved"
    ) {
      message.error("Cannot delete approved subtopic.");
      return;
    }
    newLessonPlan[moduleIndex].topics[topicIndex].subtopics = newLessonPlan[
      moduleIndex
    ].topics[topicIndex].subtopics.filter(
      (_, index) => index !== subtopicIndex
    );
    setSelectedLessonPlan(newLessonPlan);
  };

  const isAnySubtopicApproved = (moduleIndex, topicIndex) => {
    const subtopics =
      selectedLessonPlan[moduleIndex].topics[topicIndex].subtopics;
    return subtopics.some((subtopic) => subtopic.status === "approved");
  };

  const getSubtopic = async (subjectId) => {
    const response = await axios.get(
      `http://172.17.19.25:8080/dvp_app/approved_subtopics/${subjectId}/`
    );
    console.log(response?.data, "GET IT");
    setShowLessonDrawer(response?.data);
  };

  //drawer

  const showDrawer = async (subjectId) => {
    try {
      const data = await getSubtopic(subjectId);

      setOpen(true);
    } catch (error) {
      message.warning(error?.response?.data?.error);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  //modal
  const showModalScript = async (lessonPlanId) => {
    setCurrentLessonPlanId(lessonPlanId);
    console.log(lessonPlanId, "LESSON_PLN_ID");
    setShowModal(true);
  };

  const handleOk = async (e) => {
    e.preventDefault();
    try {
      setShowModal(false);
      // const plainTextContent = stripHtmlTags(scriptContent);
      const plainTextContent = scriptContent;
      const subtopicData = showLessonDrawer.find(
        (item) => item.lesson_plan_id === currentLessonPlanId
      );
      if (subtopicData) {
        const data = {
          lesson_plan_id: subtopicData.lesson_plan_id,
          session_code: subtopicData.session_code,
          pc_id: subtopicData?.pc_details?.pc_id,
          script: plainTextContent,
        };
        console.log(data);
        setShowScript(data);
        const response = await axios.post(
          "http://172.17.19.25:8080/dvp_app/subtopic_uploads/",
          data
        );
        Swal.fire({
          icon: "success",
          title: `Script updated successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      Swal.warning({
        icon: "error",
        title: `Something went wrong!`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const handleEditorChange = (content) => {
    setScriptContent(content);
  };

  const handleCancel = () => {
    setShowModal(false);
    setScriptContent("");
    setScriptModal(false);
  };

  //see script
  const showMyScript = async (lessonPlanId) => {
    try {
      setScriptModal(true);
      setCurrentLessonPlanId(lessonPlanId);
      console.log(lessonPlanId, "VIEW ID");
      const response = await axios.get(
        `http://172.17.19.25:8080/dvp_app/search_script/${lessonPlanId}/`
      );
      setScriptData(response);
      setScriptDataStatus(response?.data);
      console.log(response, "VVVVVVVVVVVVVVVVVVVVVVVVVVVv");
    } catch (error) {
      console.log(error);
      message.warning(`${error}`);
    }
  };
  //text style
  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const showError = () => {
    message.warning(
      "Your Script for this subtopic is already approved, cannot be updated"
    );
  };

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: "flex" }} className="production">
      <SideBar />
      <div className="dynamic-form">
        <div>
          <span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h5>View Lesson Plans</h5>
                <hr />
              </div>
            </div>
          </span>
        </div>
        <div
          style={{ cursor: "pointer", fontWeight: "bold" }}
          onClick={handleBackPage}
        >
          Back
        </div>
        <div className="notification-wrapper">
          <h6>Your Lesson Plan</h6>
          {showLesson &&
            showLesson.map((item) => (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  key={item.subject_id}
                  className={`notification ${
                    showSelectedSubjectId === item?.subject_id
                      ? "selectedClass"
                      : null
                  }`}
                >
                  <div> {item?.subject_name}</div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "7px" }}>
                      <EyeOutlined
                        style={{ width: "20px" }}
                        onClick={() => handleViewClick(item.subject_id)}
                      />
                    </div>

                    <div
                      className={
                        item?.status === "approved"
                          ? "app-yes"
                          : item?.status === "rejected"
                          ? "rej-no"
                          : item?.status === "pending"
                          ? "pen-doubt"
                          : item?.status
                      }
                    >
                      {item?.status === "approved" ? (
                        <div style={{ background: "none" }}>
                          <MdEmojiEmotions size={25} />
                        </div>
                      ) : item.status === "pending" ? (
                        <div style={{ background: "none" }}>
                          <BsEmojiExpressionlessFill size={22} />
                        </div>
                      ) : item?.status === "rejected" ? (
                        <div style={{ background: "none" }}>
                          <BsEmojiAngryFill size={25} />
                        </div>
                      ) : (
                        item?.status
                      )}
                    </div>
                  </div>
                </div>
                <div className="upload-script">
                  <Popover title={`Upload Script for ${item?.subject_name}`}>
                    <img
                      onClick={() => showDrawer(item?.subject_id)}
                      style={{ width: "34px", cursor: "pointer" }}
                      src={script}
                    />
                  </Popover>
                </div>
              </div>
            ))}
        </div>

        <Drawer
          title="Upload Script"
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
        >
          <p>Script</p>
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Module</th>
                  <th scope="col">Topic</th>
                  <th scope="col">Sub Topic</th>
                  <th scope="col">Approved By</th>
                  <th scope="col">Upload Script</th>
                  <th scope="col">Status</th>
                  <th scope="col">Remark</th>
                </tr>
              </thead>
              <tbody>
                {showLessonDrawer &&
                  showLessonDrawer.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.module}</td>
                      <td>{item?.topic}</td>
                      <td>{item?.subtopic}</td>
                      <td>
                        {item?.pc_details?.first_name +
                          " " +
                          item?.pc_details?.emp_code}
                      </td>

                      <td className="text-center">
                        {item?.approved === "Approved" ? (
                          <>
                            {" "}
                            <Popover title={`Already Approved `}>
                              <img
                                onClick={showError}
                                style={{
                                  width: "25px",
                                  cursor: "pointer",
                                  filter: "blur(1px)",
                                }}
                                src={pastescript}
                              />
                            </Popover>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Popover
                              title={`Upload Script for subtopic ${item?.subtopic}`}
                            >
                              <img
                                onClick={() =>
                                  showModalScript(item?.lesson_plan_id)
                                }
                                style={{ width: "25px", cursor: "pointer" }}
                                src={pastescript}
                              />
                            </Popover>
                          </>
                        )}
                        <EyeOutlined
                          onClick={() => showMyScript(item?.lesson_plan_id)}
                          style={{
                            width: "20px",
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                        />
                      </td>
                      <td>{item?.approved}</td>
                      {/* <td>{item?.approved === "approved" ? "Approved" : item?.approved === "rejected" ? "Rejected" : "Pending"}</td> */}
                      <td>
                        <Popover title="Remark">{item?.remarks}</Popover>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Drawer>

        <Modal
          title="Write/Paste Script"
          open={showModal}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={(_, {}) => (
            <>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleOk}>Send</Button>
            </>
          )}
        >
          <ReactQuill
            value={scriptContent}
            onChange={setScriptContent}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write your script here..."
          />
        </Modal>
        <Modal title="View Script" onCancel={handleCancel} open={scriptModal} onOk={handleCancel}>
          <div>
            {scriptData?.data?.script ? (
              <div
                dangerouslySetInnerHTML={{ __html: scriptData.data.script }}
              />
            ) : (
              <p>Script not found</p>
            )}
          </div>

          {/* <div  className={scriptData?.data?.approved === "approved" ? "modalApproved" : "modalPending"} >{scriptData?.data?.approved === "approved" ? "Approved by PC" : scriptData?.data?.approved === "pending" ? "Pending" : "Rejected"}</div> */}
        </Modal>

        {loading ? (
          <Spin tip="Loading...">
            <div className="loader-content" />
          </Spin>
        ) : (
          selectedLessonPlan && (
            <div className="lesson-plan-table">
              {selectedLessonPlan.map((module, moduleIndex) => (
                <div
                  style={{ padding: "20px", display: "block", width: "70vw" }}
                  key={moduleIndex}
                  className="module-section"
                >
                  <h5 style={{ color: "black", display: "flex" }}>
                    Module {moduleIndex + 1}
                    <div onClick={addModule} style={{ marginLeft: "30px" }}>
                      <img
                        className="iconsaction"
                        style={{ width: "20px" }}
                        src={add}
                        alt="Add Module"
                      />
                    </div>
                    <div
                      onClick={() => removeModule(moduleIndex)}
                      style={{ marginLeft: "10px" }}
                    >
                      <img
                        className="iconsaction"
                        style={{ width: "20px" }}
                        src={minus}
                        alt="Remove Module"
                      />
                    </div>
                  </h5>
                  <div className="module-content">
                    <div>
                      <Input
                        name="module"
                        value={module.module}
                        onChange={(event) =>
                          handleInputChange(moduleIndex, null, null, event)
                        }
                        placeholder="Module Name"
                      />
                    </div>
                    <div>
                      <Input
                        name="moduleLearningObjective"
                        value={module.moduleLearningObjective}
                        onChange={(event) =>
                          handleInputChange(moduleIndex, null, null, event)
                        }
                        placeholder="Module Learning Objective"
                      />
                    </div>
                    <div className="topic-section">
                      {module.topics.map((topic, topicIndex) => (
                        <div
                          style={{ padding: "20px", display: "block" }}
                          key={topicIndex}
                          className="topic-section"
                        >
                          <h5 style={{ color: "black", display: "flex" }}>
                            Topic {topicIndex + 1}
                            <div
                              onClick={() => addTopic(moduleIndex)}
                              style={{ marginLeft: "30px" }}
                            >
                              <img
                                className="iconsaction"
                                style={{ width: "20px" }}
                                src={add}
                                alt="Add Topic"
                              />
                            </div>
                            {!isAnySubtopicApproved(
                              moduleIndex,
                              topicIndex
                            ) && (
                              <div
                                onClick={() =>
                                  removeTopic(moduleIndex, topicIndex)
                                }
                                style={{ marginLeft: "10px" }}
                              >
                                <img
                                  className="iconsaction"
                                  style={{ width: "20px" }}
                                  src={minus}
                                  alt="Remove Topic"
                                />
                              </div>
                            )}
                          </h5>
                          <div className="topic-content">
                            <Input
                              name="topic"
                              value={topic.topic}
                              onChange={(event) =>
                                handleInputChange(
                                  moduleIndex,
                                  topicIndex,
                                  null,
                                  event
                                )
                              }
                              placeholder="Topic Name"
                              disabled={isAnySubtopicApproved(
                                moduleIndex,
                                topicIndex
                              )}
                            />
                            <div className="subtopic-section">
                              {topic.subtopics.map(
                                (subtopic, subtopicIndex) => (
                                  <div
                                    style={{
                                      padding: "20px",
                                      display: "block",
                                    }}
                                    key={subtopicIndex}
                                    className="subtopic-section"
                                  >
                                    <h5
                                      style={{
                                        color: "black",
                                        display: "flex",
                                      }}
                                    >
                                      Subtopic {subtopicIndex + 1}
                                      <div
                                        onClick={() =>
                                          addSubtopic(moduleIndex, topicIndex)
                                        }
                                        style={{ marginLeft: "30px" }}
                                      >
                                        <img
                                          className="iconsaction"
                                          style={{ width: "20px" }}
                                          src={add}
                                          alt="Add Subtopic"
                                        />
                                      </div>
                                      {subtopic.status !== "approved" && (
                                        <div
                                          onClick={() =>
                                            removeSubtopic(
                                              moduleIndex,
                                              topicIndex,
                                              subtopicIndex
                                            )
                                          }
                                          style={{ marginLeft: "10px" }}
                                        >
                                          <img
                                            className="iconsaction"
                                            style={{ width: "20px" }}
                                            src={minus}
                                            alt="Remove Subtopic"
                                          />
                                        </div>
                                      )}
                                    </h5>
                                    <div className="subtopic-content">
                                      <Input
                                        name="subtopic"
                                        value={subtopic.subtopic}
                                        onChange={(event) =>
                                          handleInputChange(
                                            moduleIndex,
                                            topicIndex,
                                            subtopicIndex,
                                            event
                                          )
                                        }
                                        placeholder="Subtopic Name"
                                        disabled={
                                          subtopic.status === "approved"
                                        }
                                      />
                                      <Input
                                        name="subtopic_learning_objective"
                                        value={
                                          subtopic.subtopic_learning_objective
                                        }
                                        onChange={(event) =>
                                          handleInputChange(
                                            moduleIndex,
                                            topicIndex,
                                            subtopicIndex,
                                            event
                                          )
                                        }
                                        placeholder="Subtopic Learning Objective"
                                        disabled={
                                          subtopic.status === "approved"
                                        }
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={saveChanges}>Save Changes</Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ViewLessonPlan;
