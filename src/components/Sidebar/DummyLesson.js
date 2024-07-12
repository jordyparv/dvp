


import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import { getLesson } from "../../protectedRouting/Utils/apiUtils"; // Adjust the path as necessary
import "./ViewLessonPlan.css";
import { CheckCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { MdEmojiEmotions } from "react-icons/md";
import { BsEmojiExpressionlessFill, BsEmojiAngryFill } from "react-icons/bs";
import { Button, Popover, message } from "antd";
import Swal from "sweetalert2";

const ViewLessonPlan = () => {
  const [empIds, setEmpIds] = useState(null);
  const [lessonPlanName, setLessonPlanName] = useState([]);
  const [lessonPlans, setLessonPlans] = useState(null);
  const [findSubject, setFindSubject] = useState(null);
  const [selectedSubjectLessonPlans, setSelectedSubjectLessonPlans] = useState([]);
  const [newModule, setNewModule] = useState({
    module: "",
    module_learning_objective: "",
    topic: "",
    subtopic: "",
    subtopic_learning_objective: ""
  });

  const getuserId = JSON.parse(localStorage.getItem("prod_cred"));
  const userId = getuserId?.user_id;
  console.log(userId, "USER ID");

  const getEmpId = async () => {
    try {
      const response = await axios(
        `http://172.17.19.25:8080/dvp_app/select_subject/?user_id=${userId}`
      );
      const employeeId = response?.data?.employee_id;
      setEmpIds(employeeId);

      const lessonData = await getLesson(employeeId);
      setLessonPlanName(lessonData);
      setLessonPlans(lessonData);
      console.log(lessonData, "(------------------------------------");
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
    setFindSubject(subjectData);
    setSelectedSubjectLessonPlans(subjectData.lesson_plans);
  };











  return (
    <div style={{ display: "flex" }} className="production">
      <SideBar />
      <div className="content">
        <div className="notification-wrapper">
          <h4>Your lesson plan</h4>
          {lessonPlanName &&
            lessonPlanName.map((item) => (
              <div key={item.subject_id} className="notification">
                <div>Lesson Plan for {item?.subject_name}</div>
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
        <div className="lesson-table-wrapper">
         {/* make lesson plan table here  */}
         {selectedLessonPlan && (
          <div className="lesson-plan-table">
            {selectedLessonPlan.map((module, moduleIndex) => (
              <div style={{ padding: "20px", display: "block" }} key={moduleIndex} className="module-section">
                <h5 style={{ color: "black", display: "flex" }}>
                  Module {moduleIndex + 1}
                  <div onClick={addModule} style={{ marginLeft: "30px" }}>
                    <img className="iconsaction" style={{ width: "20px" }} src={add} />
                  </div>
                  <div onClick={() => removeModule(moduleIndex)} style={{ marginLeft: "10px" }}>
                    <img className="iconsaction" style={{ width: "20px" }} src={minus} />
                  </div>
                </h5>
                <Input
                  name="module"
                  placeholder="Module Name"
                  value={module.module}
                  onChange={(event) => handleInputChange(moduleIndex, null, null, event)}
                />
                <Input
                  name="moduleLearningObjective"
                  placeholder="Module Learning Objective"
                  value={module.moduleLearningObjective}
                  onChange={(event) => handleInputChange(moduleIndex, null, null, event)}
                />
                {module.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="topic-section">
                    <h5 style={{ color: "black", display: "flex" }}>
                      Topic {topicIndex + 1}
                      <div onClick={() => addTopic(moduleIndex)} style={{ marginLeft: "30px" }}>
                        <img className="iconsaction" style={{ width: "20px" }} src={add} />
                      </div>
                      <div onClick={() => removeTopic(moduleIndex, topicIndex)} style={{ marginLeft: "10px" }}>
                        <img className="iconsaction" style={{ width: "20px" }} src={minus} />
                      </div>
                    </h5>
                    <Input
                      name="topic"
                      placeholder="Topic Name"
                      value={topic.topic}
                      onChange={(event) => handleInputChange(moduleIndex, topicIndex, null, event)}
                    />
                    {topic.subtopics.map((subtopic, subtopicIndex) => (
                      <div key={subtopicIndex} className="subtopic-section">
                        <h5 style={{ color: "black", display: "flex" }}>
                          Sub Topic {subtopicIndex + 1}
                          <div onClick={() => addSubtopic(moduleIndex, topicIndex)} style={{ marginLeft: "30px" }}>
                            <img className="iconsaction" style={{ width: "20px" }} src={add} />
                          </div>
                          <div onClick={() => removeSubtopic(moduleIndex, topicIndex, subtopicIndex)} style={{ marginLeft: "10px" }}>
                            <img className="iconsaction" style={{ width: "20px" }} src={minus} />
                          </div>
                        </h5>
                        <Input
                          name="subtopic"
                          placeholder="Subtopic Name"
                          value={subtopic.subtopic}
                          onChange={(event) => handleInputChange(moduleIndex, topicIndex, subtopicIndex, event)}
                        />
                        <Input
                          name="subtopicLearningObjective"
                          placeholder="Subtopic Learning Objective"
                          value={subtopic.subtopicLearningObjective}
                          onChange={(event) => handleInputChange(moduleIndex, topicIndex, subtopicIndex, event)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <Button type="primary" onClick={saveChanges}>
              Save Changes
            </Button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ViewLessonPlan;