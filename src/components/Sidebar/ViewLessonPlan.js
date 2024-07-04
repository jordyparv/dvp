

import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import { Button, Input, message, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./ViewLessonPlan.css";
import add from "../../assets/images/add.png";
import minus from "../../assets/images/minus.png";
import { BsEmojiAngryFill, BsEmojiExpressionlessFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { getLesson } from "../../protectedRouting/Utils/apiUtils";

const ViewLessonPlan = () => {
  const [empIds, setEmpIds] = useState(null);
  const [lessonPlans, setLessonPlans] = useState([]);
  const [selectedLessonPlan, setSelectedLessonPlan] = useState(null);
  const [showLesson, setShowLesson] = useState([]);
  const [showSelectedSubjectId, setShowSelectedSubjectId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getuserId = JSON.parse(localStorage.getItem("prod_cred"));
  const userId = getuserId?.user_id;

  const getEmpId = async () => {
    try {
      const response = await axios.get(
        `http://172.17.19.22:8080/dvp_app/select_subject/?user_id=${userId}`
      );
      const employeeId = response?.data?.employee_id;
      const lessonData = await getLesson(employeeId);
      setShowLesson(lessonData);
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
        `http://172.17.19.22:8080/dvp_app/get_lesson_plans/${subjectId}/`
      );
      setLessonPlans(response.data);
      setSelectedLessonPlan(
        response.data.length === 1 ? response.data[0].lessonPlan : null
      );
      console.log(response?.data, "TABLE RESOOOOO");
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

  const saveChanges = () => {
    message.success("Changes saved successfully!");
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
                subtopicLearningObjective: "",
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
        { subtopic: "", subtopicLearningObjective: "", status: "pending" },
      ],
    });
    setSelectedLessonPlan(newLessonPlan);
  };

  const removeTopic = (moduleIndex, topicIndex) => {
    const newLessonPlan = [...selectedLessonPlan];
    newLessonPlan[moduleIndex].topics = newLessonPlan[
      moduleIndex
    ].topics.filter((_, index) => index !== topicIndex);
    setSelectedLessonPlan(newLessonPlan);
  };

  const addSubtopic = (moduleIndex, topicIndex) => {
    const newLessonPlan = [...selectedLessonPlan];
    newLessonPlan[moduleIndex].topics[topicIndex].subtopics.push({
      subtopic: "",
      subtopicLearningObjective: "",
      status: "pending",
    });
    setSelectedLessonPlan(newLessonPlan);
  };

  const removeSubtopic = (moduleIndex, topicIndex, subtopicIndex) => {
    const newLessonPlan = [...selectedLessonPlan];
    newLessonPlan[moduleIndex].topics[topicIndex].subtopics = newLessonPlan[
      moduleIndex
    ].topics[topicIndex].subtopics.filter(
      (_, index) => index !== subtopicIndex
    );
    setSelectedLessonPlan(newLessonPlan);
  };

  // const isAllSubtopicsApproved = (moduleIndex, topicIndex) => {
  //   const subtopics = selectedLessonPlan[moduleIndex].topics[topicIndex].subtopics;
  //   return subtopics.every(subtopic => subtopic.status === "approved");
  // };

  // Update the isAllSubtopicsApproved function
  const isAllSubtopicsApproved = (moduleIndex, topicIndex) => {
    const topics = selectedLessonPlan[moduleIndex].topics;
    const allTopicsApproved = topics.every((topic) => {
      const subtopics = topic.subtopics;
      return subtopics.every((subtopic) => subtopic.status === "approved");
    });

    return allTopicsApproved;
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

        <div className="notification-wrapper">
          <h6>Your Lesson Plan</h6>
          {showLesson &&
            showLesson.map((item) => (
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
                        <BsEmojiExpressionlessFill size={25} />
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
            ))}
        </div>

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
                  <Input
                    name="module"
                    placeholder="Module Name"
                    value={module.module}
                    onChange={(event) =>
                      handleInputChange(moduleIndex, null, null, event)
                    }
                  />
                  <Input
                    name="moduleLearningObjective"
                    placeholder="Module Learning Objective"
                    value={module.moduleLearningObjective}
                    onChange={(event) =>
                      handleInputChange(moduleIndex, null, null, event)
                    }
                  />
            
                 
                  {module.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="topic-section">
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
                        <div
                          onClick={() => removeTopic(moduleIndex, topicIndex)}
                          style={{ marginLeft: "10px" }}
                        >
                          <img
                            className="iconsaction"
                            style={{ width: "20px" }}
                            src={minus}
                            alt="Remove Topic"
                          />
                        </div>
                      </h5>
                      <Input
                        name="topic"
                        placeholder="Topic Name"
                        value={topic.topic}
                        onChange={(event) =>
                          handleInputChange(
                            moduleIndex,
                            topicIndex,
                            null,
                            event
                          )
                        }
                        disabled={isAllSubtopicsApproved(
                          moduleIndex,
                          topicIndex
                        )}
                      />
                      {topic.subtopics.map((subtopic, subtopicIndex) => (
                        <div key={subtopicIndex} className="subtopic-section">
                          <h6 style={{ color: "black", display: "flex" }}>
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
                          </h6>
                          <Input
                            name="subtopic"
                            placeholder="Subtopic Name"
                            value={subtopic.subtopic}
                            onChange={(event) =>
                              handleInputChange(
                                moduleIndex,
                                topicIndex,
                                subtopicIndex,
                                event
                              )
                            }
                            disabled={subtopic.status === "approved"}
                          />
                          <Input
                            name="subtopicLearningObjective"
                            placeholder="Subtopic Learning Objective"
                            value={subtopic.subtopicLearningObjective}
                            onChange={(event) =>
                              handleInputChange(
                                moduleIndex,
                                topicIndex,
                                subtopicIndex,
                                event
                              )
                            }
                            disabled={subtopic.status === "approved"}
                          />
                         
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                
              ))}
              <Button
                type="primary"
                onClick={saveChanges}
                style={{ marginBottom: "20px" }}
              >
                Save Changes
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ViewLessonPlan;
