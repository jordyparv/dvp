import React, { useEffect, useState } from "react";
import "./LessonPlan.css";
import SideBar from "./SideBar";
import { Button, Select, message } from "antd";
import axios from "axios";
import { Option } from "antd/es/mentions";

import PreviewLessonPlan from "./PreviewLessonPlan";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

import add from "../../assets/images/add.png";
import minus from "../../assets/images/minus.png";

const LessonPlan = () => {
  const [lessonPlanLength, setLessonplanLength] = useState(null);
  const [currentSession, setCurrentSession] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [selectSubject, setSelectSubject] = useState(null);
  const [optionSubject, setOptionSubject] = useState([]);
  const [lessonPlan, setLessonPlan] = useState([
    {
      module: "",
      moduleLearningObjective: "",
      topics: [
        {
          topic: "",
          subtopics: [{ subtopic: "", subtopicLearningObjective: "" }],
        },
      ],
    },
  ]);

  const [submittedData, setSubmittedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModuleChange = (index, event) => {
    const data = [...lessonPlan];
    data[index][event.target.name] = event.target.value;
    setLessonPlan(data);
  };

  const handleTopicChange = (moduleIndex, topicIndex, event) => {
    const data = [...lessonPlan];
    data[moduleIndex].topics[topicIndex][event.target.name] =
      event.target.value;
    setLessonPlan(data);
  };

  const handleSubtopicChange = (
    moduleIndex,
    topicIndex,
    subtopicIndex,
    event
  ) => {
    const data = [...lessonPlan];
    data[moduleIndex].topics[topicIndex].subtopics[subtopicIndex][
      event.target.name
    ] = event.target.value;
    setLessonPlan(data);
  };

  const addModule = () => {
    setLessonPlan([
      ...lessonPlan,
      {
        module: "",
        moduleLearningObjective: "",
        topics: [
          {
            topic: "",
            subtopics: [{ subtopic: "", subtopicLearningObjective: "" }],
          },
        ],
      },
    ]);
    message.success("Module Field Added");
  };

  const addTopic = (moduleIndex) => {
    const data = [...lessonPlan];
    data[moduleIndex].topics.push({
      topic: "",
      subtopics: [{ subtopic: "", subtopicLearningObjective: "" }],
    });
    setLessonPlan(data);
    message.success("Topic Field Added");
  };

  const addSubtopic = (moduleIndex, topicIndex) => {
    const data = [...lessonPlan];
    data[moduleIndex].topics[topicIndex].subtopics.push({
      subtopic: "",
      subtopicLearningObjective: "",
    });
    setLessonPlan(data);
    message.success("Subtopic Field Added");
  };

  const removeModule = (moduleIndex) => {
    if (lessonPlan.length > 1) {
      const newLessonPlan = [...lessonPlan];
      newLessonPlan.splice(moduleIndex, 1);
      setLessonPlan(newLessonPlan);
      message.success("Module Field Removed");
    } else {
      message.error("There must be at least one module.");
    }
  };

  const removeTopic = (moduleIndex, topicIndex) => {
    const newLessonPlan = [...lessonPlan];
    if (newLessonPlan[moduleIndex].topics.length > 1) {
      newLessonPlan[moduleIndex].topics.splice(topicIndex, 1);
      setLessonPlan(newLessonPlan);
      message.success("Topic Field Removed");
    } else {
      message.error("There must be at least one topic in each module.");
    }
  };

  const removeSubtopic = (moduleIndex, topicIndex, subtopicIndex) => {
    const newLessonPlan = [...lessonPlan];
    if (newLessonPlan[moduleIndex].topics[topicIndex].subtopics.length > 1) {
      newLessonPlan[moduleIndex].topics[topicIndex].subtopics.splice(
        subtopicIndex,
        1
      );
      setLessonPlan(newLessonPlan);
      message.success("Subtopic Field Removed");
    } else {
      message.error("There must be at least one subtopic in each topic.");
    }
  };

  const handlePreviewSubmit = () => {
    if (!selectSubject) {
      message.warning("Please select a subject before submitting.");
      return;
    }
    const dataToSubmit = {
      employee_id: employeeId,
      subject_id: selectSubject,
      lessonPlan: lessonPlan,
    };
    setSubmittedData(dataToSubmit);
    setIsModalOpen(true);
  };

  const handleFinalSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://172.17.19.22:8080/dvp_app/lesson-plans/",
        submittedData
      );
      console.log(response.data, "Submitted");
      message.success("Data submitted successfully!");
      Swal.fire({
        icon: "success",
        title: `${response?.data?.message}`,
        showConfirmButton: false,
        timer: 3000,
      });
      setIsModalOpen(false);
      // getLessonPlan();
    } catch (error) {
      console.log(error);
      message.error("Failed to submit data");
      Swal.fire({
        icon: "warning",
        title: `${error?.response?.data?.error}`,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const getuserId = JSON.parse(localStorage.getItem("prod_cred"));
  const userId = getuserId?.user_id;
  console.log(userId, "USER ID");

  const getSubject = async () => {
    try {
      const response = await axios(
        `http://172.17.19.22:8080/dvp_app/select_subject/?user_id=${userId}`
      );
      console.log(response?.data, "SUBJECTS");
      const getEmpId = response?.data?.employee_id;
      setEmployeeId(getEmpId);
      setOptionSubject(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSession = async () => {
    try {
      const response = await axios(
        `http://172.17.19.22:8080/dvp_app/current_session/`
      );
      console.log(response?.data, "Session");
      setCurrentSession(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubject();
    getSession();
  }, []);

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
                <h5>Step 1</h5>
                <hr />
              </div>
              <div>
                <Link to="/view-lesson-plan">
                  <div className="viewlesson">
                    <div>
                      {" "}
                      View lesson plan <EyeOutlined />
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="form-row">
              <label>
                <p>
                  <span>Select Subject</span>
                </p>
                <Select
                  defaultValue="Select Subject"
                  style={{ minWidth: "600px" }}
                  onChange={(e) => {
                    console.log("Selected subject:", e);
                    setSelectSubject(e);
                  }}
                >
                  {optionSubject?.subjects?.map((sub) => (
                    <Option key={sub.employee_id} value={sub.subject_id}>
                      {sub.subject_name + " " + sub?.subject_code}
                    </Option>
                  ))}
                </Select>
              </label>
            </div>
          </span>
        </div>
        <div style={{ marginTop: "20px" }}>
          <span>
            <h5>Step 2</h5> <hr /> <h6>Add Module</h6>
          </span>
        </div>
        <form style={{width:"70vw"}}>
          {lessonPlan.map((module, moduleIndex) => (
            <div
              style={{ padding: "20px", display: "block" }}
              key={moduleIndex}
              className="module-section"
            >
              <h5 style={{ color: "black", display: "flex" }}>
                Module {moduleIndex + 1}{" "}
                <div onClick={addModule} style={{ marginLeft: "30px" }}>
                  <img
                    className="iconsaction"
                    style={{ width: "20px" }}
                    src={add}
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
                  />
                </div>
              </h5>
              <input
                name="module"
                placeholder="Module Name"
                value={module.module}
                onChange={(event) => handleModuleChange(moduleIndex, event)}
              />
              <input
                name="moduleLearningObjective"
                placeholder="Module Learning Objective"
                value={module.moduleLearningObjective}
                onChange={(event) => handleModuleChange(moduleIndex, event)}
              />
              {module.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="topic-section">
                  <h5 style={{ color: "black", display: "flex" }}>
                    Topic {topicIndex + 1}{" "}
                    <div
                      onClick={() => addTopic(moduleIndex)}
                      style={{ marginLeft: "30px" }}
                    >
                      <img
                        className="iconsaction"
                        style={{ width: "20px" }}
                        src={add}
                      />
                    </div>
                    <div
                      onClick={() => removeTopic(moduleIndex, topicIndex)}
                      style={{ marginLeft: "10px" }}
                    >
                      <img
                        className="iconsaction"
                        style={{ width: "20px" }}
                        src={minus}
                      />
                    </div>
                  </h5>
                  <input
                    name="topic"
                    placeholder="Topic Name"
                    value={topic.topic}
                    onChange={(event) =>
                      handleTopicChange(moduleIndex, topicIndex, event)
                    }
                  />
                  {topic.subtopics.map((subtopic, subtopicIndex) => (
                    <div key={subtopicIndex} className="subtopic-section">
                      <h5 style={{ color: "black", display: "flex" }}>
                        Sub Topic {subtopicIndex + 1}{" "}
                        <div
                          onClick={() => addSubtopic(moduleIndex, topicIndex)}
                          style={{ marginLeft: "30px" }}
                        >
                          <img
                            className="iconsaction"
                            style={{ width: "20px" }}
                            src={add}
                          />
                        </div>
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
                          />
                        </div>
                      </h5>
                      <input
                        name="subtopic"
                        placeholder="Subtopic Name"
                        value={subtopic.subtopic}
                        onChange={(event) =>
                          handleSubtopicChange(
                            moduleIndex,
                            topicIndex,
                            subtopicIndex,
                            event
                          )
                        }
                      />
                      <input
                        name="subtopicLearningObjective"
                        placeholder="Subtopic Learning Objective"
                        value={subtopic.subtopicLearningObjective}
                        onChange={(event) =>
                          handleSubtopicChange(
                            moduleIndex,
                            topicIndex,
                            subtopicIndex,
                            event
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handlePreviewSubmit}
              style={{ background: "#4c8950", color: "white" }}
              type="button"
            >
              Preview & Submit
            </Button>
          </div>
        </form>



        {submittedData && (
          <PreviewLessonPlan
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            data={lessonPlan}
            onSubmit={handleFinalSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default LessonPlan;
