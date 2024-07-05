// import React, { useEffect, useState } from "react";
// import SideBar from "./SideBar";
// import axios from "axios";
// import { Button, Input, message, Spin } from "antd";
// import { EyeOutlined } from "@ant-design/icons";
// import "./ViewLessonPlan.css";
// import add from "../../assets/images/add.png";
// import minus from "../../assets/images/minus.png";
// import { BsEmojiAngryFill, BsEmojiExpressionlessFill } from "react-icons/bs";
// import { MdEmojiEmotions } from "react-icons/md";
// import { getLesson } from "../../protectedRouting/Utils/apiUtils";
// import EmojiPicker from "emoji-picker-react";
// import Swal from "sweetalert2";

// const ViewLessonPlan = () => {
//   const [empIds, setEmpIds] = useState(null);
//   const [lessonPlans, setLessonPlans] = useState([]);
//   const [selectedLessonPlan, setSelectedLessonPlan] = useState(null);
//   const [showLesson, setShowLesson] = useState([]);
//   const [showSelectedSubjectId, setShowSelectedSubjectId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const getuserId = JSON.parse(localStorage.getItem("prod_cred"));
//   const userId = getuserId?.user_id;

//   const getEmpId = async () => {
//     try {
//       const response = await axios.get(
//         `http://172.17.19.22:8080/dvp_app/select_subject/?user_id=${userId}`
//       );
//       const employeeId = response?.data?.employee_id;
//       const lessonData = await getLesson(employeeId);
//       setShowLesson(lessonData);
//       setEmpIds(employeeId)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getEmpId();
//   }, []);


//   const fetchLessonPlans = async (subjectId) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `http://172.17.19.22:8080/dvp_app/get_lesson_plans/${subjectId}/`
//       );

//       // Log the entire response to see the structure
//       console.log("Response:", response.data);

//       // Log each lesson_plan_id
//       response.data.forEach((plan) => {
//         console.log("Lesson Plan ID:", plan.lessonPlan[0]?.lesson_plan_id);
//       });

//       setLessonPlans(response.data);
//       setSelectedLessonPlan(
//         response.data.length === 1 ? response.data[0].lessonPlan : null
//       );
//       console.log(response?.data, "TABLE RESOOOOO");
//     } catch (error) {
//       console.error("Error fetching lesson plans", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewClick = async (subjectId) => {
//     setShowSelectedSubjectId(subjectId);
//     await fetchLessonPlans(subjectId);
//   };

//   const handleLessonPlanClick = (lessonPlan) => {
//     setSelectedLessonPlan(lessonPlan?.lessonPlan);
//   };

//   const handleInputChange = (moduleIndex, topicIndex, subtopicIndex, event) => {
//     const newLessonPlan = [...selectedLessonPlan];
//     if (subtopicIndex !== null) {
//       newLessonPlan[moduleIndex].topics[topicIndex].subtopics[subtopicIndex][
//         event.target.name
//       ] = event.target.value;
//     } else if (topicIndex !== null) {
//       newLessonPlan[moduleIndex].topics[topicIndex][event.target.name] =
//         event.target.value;
//     } else {
//       newLessonPlan[moduleIndex][event.target.name] = event.target.value;
//     }
//     setSelectedLessonPlan(newLessonPlan);
//   };


// const saveChanges = async () => {
//   // Add a confirmation prompt with Cancel button using Swal
//   const result = await Swal.fire({
//     title: 'Are you sure?',
//     text: 'Do you want to update these changes?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Confirm',
//     cancelButtonText: 'Cancel',
//     dangerMode: true,
//   });

//   if (!result.isConfirmed) return;

//   // Prepare the data for the PUT request
//   const updatedLessonPlan = selectedLessonPlan.map((module) => ({
//     module: module.module,
//     moduleLearningObjective: module.moduleLearningObjective,
//     topics: module.topics.map((topic) => ({
//       topic: topic.topic,
//       subtopics: topic.subtopics.map((subtopic) => ({
//         lesson_plan_id: subtopic.lesson_plan_id,
//         subtopic: subtopic.subtopic,
//         subtopic_learning_objective: subtopic.subtopic_learning_objective,
//         status: subtopic.status,
//         subtopicLearningObjective: subtopic.subtopicLearningObjective,
//       })),
//     })),
//   }));

//   const data = { 
//     employee_id: empIds,
//     subject_id:showSelectedSubjectId,
//     updated_lesson_plan: updatedLessonPlan 
//   };

//   try {
//     // Make the PUT request
//     const response = await axios.put(
//       'http://172.17.19.22:8080/dvp_app/update_lesson_plans/',
//       data
//     );
//     console.log('PUT response:', response.data);

//     // Show a success message with Swal
//     Swal.fire('Success', 'Changes saved successfully!', 'success');
//   } catch (error) {
//     console.error('Error saving changes', error);

//     // Show an error message with Swal
//     Swal.fire('Error', 'Error saving changes. Please try again.', error?.response?.data?.error);
//   }
// };




//   const addModule = () => {
//     setSelectedLessonPlan([
//       ...selectedLessonPlan,
//       {
//         module: "",
//         moduleLearningObjective: "",
//         topics: [
//           {
//             topic: "",
//             subtopics: [
//               {
//                 subtopic: "",
//                 subtopic_learning_objective: "",
//                 status: "pending",
//               },
//             ],
//           },
//         ],
//       },
//     ]);
//   };

//   const removeModule = (moduleIndex) => {
//     const newLessonPlan = selectedLessonPlan.filter(
//       (_, index) => index !== moduleIndex
//     );
//     setSelectedLessonPlan(newLessonPlan);
//   };

//   const addTopic = (moduleIndex) => {
//     const newLessonPlan = [...selectedLessonPlan];
//     newLessonPlan[moduleIndex].topics.push({
//       topic: "",
//       subtopics: [
//         { subtopic: "", subtopic_learning_objective: "", status: "pending" },
//       ],
//     });
//     setSelectedLessonPlan(newLessonPlan);
//   };

//   const removeTopic = (moduleIndex, topicIndex) => {
//     const newLessonPlan = [...selectedLessonPlan];
//     if (
//       newLessonPlan[moduleIndex].topics[topicIndex].subtopics.some(
//         (subtopic) => subtopic.status === "approved"
//       )
//     ) {
//       message.error("Cannot delete topic with approved subtopics.");
//       return;
//     }
//     newLessonPlan[moduleIndex].topics = newLessonPlan[
//       moduleIndex
//     ].topics.filter((_, index) => index !== topicIndex);
//     setSelectedLessonPlan(newLessonPlan);
//   };

//   const addSubtopic = (moduleIndex, topicIndex) => {
//     const newLessonPlan = [...selectedLessonPlan];
//     newLessonPlan[moduleIndex].topics[topicIndex].subtopics.push({
//       subtopic: "",
//       subtopic_learning_objective: "",
//       status: "pending",
//     });
//     setSelectedLessonPlan(newLessonPlan);
//   };

//   const removeSubtopic = (moduleIndex, topicIndex, subtopicIndex) => {
//     const newLessonPlan = [...selectedLessonPlan];
//     if (
//       newLessonPlan[moduleIndex].topics[topicIndex].subtopics[subtopicIndex]
//         .status === "approved"
//     ) {
//       message.error("Cannot delete approved subtopic.");
//       return;
//     }
//     newLessonPlan[moduleIndex].topics[topicIndex].subtopics = newLessonPlan[
//       moduleIndex
//     ].topics[topicIndex].subtopics.filter(
//       (_, index) => index !== subtopicIndex
//     );
//     setSelectedLessonPlan(newLessonPlan);
//   };

//   const isAnySubtopicApproved = (moduleIndex, topicIndex) => {
//     const subtopics =
//       selectedLessonPlan[moduleIndex].topics[topicIndex].subtopics;
//     return subtopics.some((subtopic) => subtopic.status === "approved");
//   };

//   return (
//     <div style={{ display: "flex" }} className="production">
//       <SideBar />
//       <div className="dynamic-form">
//         <div>
//           <span>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <div>
//                 <h5>View Lesson Plans</h5>
//                 <hr />
//               </div>
//             </div>
//           </span>
//         </div>

//         <div className="notification-wrapper">
//           <h6>Your Lesson Plan</h6>
//           {showLesson &&
//             showLesson.map((item) => (
//               <div
//                 key={item.subject_id}
//                 className={`notification ${
//                   showSelectedSubjectId === item?.subject_id
//                     ? "selectedClass"
//                     : null
//                 }`}
//               >
//                 <div> {item?.subject_name}</div>
//                 <div style={{ display: "flex" }}>
//                   <div style={{ marginRight: "7px" }}>
//                     <EyeOutlined
//                       style={{ width: "20px" }}
//                       onClick={() => handleViewClick(item.subject_id)}
//                     />
//                   </div>

//                   <div
//                     className={
//                       item?.status === "approved"
//                         ? "app-yes"
//                         : item?.status === "rejected"
//                         ? "rej-no"
//                         : item?.status === "pending"
//                         ? "pen-doubt"
//                         : item?.status
//                     }
//                   >
//                     {item?.status === "approved" ? (
//                       <div style={{ background: "none" }}>
//                         <MdEmojiEmotions size={25} />
//                       </div>
//                     ) : item.status === "pending" ? (
//                       <div style={{ background: "none" }}>
//                         <BsEmojiExpressionlessFill size={22} />
//                       </div>
//                     ) : item?.status === "rejected" ? (
//                       <div style={{ background: "none" }}>
//                         <BsEmojiAngryFill size={25} />
//                       </div>
//                     ) : (
//                       item?.status
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>

//         {loading ? (
//           <Spin tip="Loading...">
//             <div className="loader-content" />
//           </Spin>
//         ) : (
//           selectedLessonPlan && (
//             <div className="lesson-plan-table">
//               {selectedLessonPlan.map((module, moduleIndex) => (
//                 <div
//                   style={{ padding: "20px", display: "block", width: "70vw" }}
//                   key={moduleIndex}
//                   className="module-section"
//                 >
//                   <h5 style={{ color: "black", display: "flex" }}>
//                     Module {moduleIndex + 1}
//                     <div onClick={addModule} style={{ marginLeft: "30px" }}>
//                       <img
//                         className="iconsaction"
//                         style={{ width: "20px" }}
//                         src={add}
//                         alt="Add Module"
//                       />
//                     </div>
//                     <div
//                       onClick={() => removeModule(moduleIndex)}
//                       style={{ marginLeft: "10px" }}
//                     >
//                       <img
//                         className="iconsaction"
//                         style={{ width: "20px" }}
//                         src={minus}
//                         alt="Remove Module"
//                       />
//                     </div>
//                   </h5>
//                   <div className="module-content">
//                     <div>
//                       <Input
//                         name="module"
//                         value={module.module}
//                         onChange={(event) =>
//                           handleInputChange(moduleIndex, null, null, event)
//                         }
//                         placeholder="Module Name"
//                       />
//                     </div>
//                     <div>
//                       <Input
//                         name="moduleLearningObjective"
//                         value={module.moduleLearningObjective}
//                         onChange={(event) =>
//                           handleInputChange(moduleIndex, null, null, event)
//                         }
//                         placeholder="Module Learning Objective"
//                       />
//                     </div>
//                     <div className="topic-section">
//                       {module.topics.map((topic, topicIndex) => (
//                         <div
//                           style={{ padding: "20px", display: "block" }}
//                           key={topicIndex}
//                           className="topic-section"
//                         >
//                           <h5 style={{ color: "black", display: "flex" }}>
//                             Topic {topicIndex + 1}
//                             <div
//                               onClick={() => addTopic(moduleIndex)}
//                               style={{ marginLeft: "30px" }}
//                             >
//                               <img
//                                 className="iconsaction"
//                                 style={{ width: "20px" }}
//                                 src={add}
//                                 alt="Add Topic"
//                               />
//                             </div>
//                             {!isAnySubtopicApproved(
//                               moduleIndex,
//                               topicIndex
//                             ) && (
//                               <div
//                                 onClick={() =>
//                                   removeTopic(moduleIndex, topicIndex)
//                                 }
//                                 style={{ marginLeft: "10px" }}
//                               >
//                                 <img
//                                   className="iconsaction"
//                                   style={{ width: "20px" }}
//                                   src={minus}
//                                   alt="Remove Topic"
//                                 />
//                               </div>
//                             )}
//                           </h5>
//                           <div className="topic-content">
//                             <Input
//                               name="topic"
//                               value={topic.topic}
//                               onChange={(event) =>
//                                 handleInputChange(
//                                   moduleIndex,
//                                   topicIndex,
//                                   null,
//                                   event
//                                 )
//                               }
//                               placeholder="Topic Name"
//                               disabled={isAnySubtopicApproved(
//                                 moduleIndex,
//                                 topicIndex
//                               )}
//                             />
//                             <div className="subtopic-section">
//                               {topic.subtopics.map(
//                                 (subtopic, subtopicIndex) => (
//                                   <div
//                                     style={{
//                                       padding: "20px",
//                                       display: "block",
//                                     }}
//                                     key={subtopicIndex}
//                                     className="subtopic-section"
//                                   >
//                                     <h5
//                                       style={{
//                                         color: "black",
//                                         display: "flex",
//                                       }}
//                                     >
//                                       Subtopic {subtopicIndex + 1}
//                                       <div
//                                         onClick={() =>
//                                           addSubtopic(moduleIndex, topicIndex)
//                                         }
//                                         style={{ marginLeft: "30px" }}
//                                       >
//                                         <img
//                                           className="iconsaction"
//                                           style={{ width: "20px" }}
//                                           src={add}
//                                           alt="Add Subtopic"
//                                         />
//                                       </div>
//                                       {subtopic.status !== "approved" && (
//                                         <div
//                                           onClick={() =>
//                                             removeSubtopic(
//                                               moduleIndex,
//                                               topicIndex,
//                                               subtopicIndex
//                                             )
//                                           }
//                                           style={{ marginLeft: "10px" }}
//                                         >
//                                           <img
//                                             className="iconsaction"
//                                             style={{ width: "20px" }}
//                                             src={minus}
//                                             alt="Remove Subtopic"
//                                           />
//                                         </div>
//                                       )}
//                                     </h5>
//                                     <div className="subtopic-content">
//                                       <Input
//                                         name="subtopic"
//                                         value={subtopic.subtopic}
//                                         onChange={(event) =>
//                                           handleInputChange(
//                                             moduleIndex,
//                                             topicIndex,
//                                             subtopicIndex,
//                                             event
//                                           )
//                                         }
//                                         placeholder="Subtopic Name"
//                                         disabled={
//                                           subtopic.status === "approved"
//                                         }
//                                       />
//                                       <Input
//                                         name="subtopic_learning_objective"
//                                         value={
//                                           subtopic.subtopic_learning_objective
//                                         }
//                                         onChange={(event) =>
//                                           handleInputChange(
//                                             moduleIndex,
//                                             topicIndex,
//                                             subtopicIndex,
//                                             event
//                                           )
//                                         }
//                                         placeholder="Subtopic Learning Objective"
//                                         disabled={
//                                           subtopic.status === "approved"
//                                         }
//                                       />
//                                     </div>
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={saveChanges}>Save Changes</Button>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewLessonPlan;
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
import Swal from "sweetalert2";

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
        `http://172.17.19.22:8080/dvp_app/get_lesson_plans/${subjectId}/`
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

  const handleInputChange = (
    moduleIndex,
    topicIndex,
    subtopicIndex,
    event
  ) => {
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
          status:
            subtopic.status === "rejected" ? "pending" : subtopic.status,
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
        "http://172.17.19.22:8080/dvp_app/update_lesson_plans/",
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
