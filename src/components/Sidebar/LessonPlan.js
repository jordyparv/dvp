

// import React, { useState } from "react";
// import "./LessonPlan.css";
// import SideBar from "./SideBar";
// import { Button, message } from "antd";
// import Swal from "sweetalert2";

// const LessonPlan = () => {
//   const [modules, setModules] = useState([
//     {
//       module: "",
//       moduleLearningObjective: "",
//       topics: [
//         {
//           topic: "",
//           subtopics: [{ subtopic: "", subtopicLearningObjective: "" }],
//         },
//       ],
//     },
//   ]);

//   const handleModuleChange = (index, event) => {
//     const data = [...modules];
//     data[index][event.target.name] = event.target.value;
//     setModules(data);
//   };

//   const handleTopicChange = (moduleIndex, topicIndex, event) => {
//     const data = [...modules];
//     data[moduleIndex].topics[topicIndex][event.target.name] =
//       event.target.value;
//     setModules(data);
//   };

//   const handleSubtopicChange = (
//     moduleIndex,
//     topicIndex,
//     subtopicIndex,
//     event
//   ) => {
//     const data = [...modules];
//     data[moduleIndex].topics[topicIndex].subtopics[subtopicIndex][
//       event.target.name
//     ] = event.target.value;
//     setModules(data);
//   };

//   const addModule = () => {
//     setModules([
//       ...modules,
//       {
//         module: "",
//         moduleLearningObjective: "",
//         topics: [
//           {
//             topic: "",
//             subtopics: [{ subtopic: "", subtopicLearningObjective: "" }],
//           },
//         ],
//       },
//     ]);
//     message.success("Module Field Added");
//   };

//   const addTopic = (moduleIndex) => {
//     const data = [...modules];
//     data[moduleIndex].topics.push({
//       topic: "",
//       subtopics: [{ subtopic: "", subtopicLearningObjective: "" }],
//     });
//     setModules(data);
//     message.success("Topic Field Added");
//   };

//   const addSubtopic = (moduleIndex, topicIndex) => {
//     const data = [...modules];
//     data[moduleIndex].topics[topicIndex].subtopics.push({
//       subtopic: "",
//       subtopicLearningObjective: "",
//     });
//     setModules(data);
//     message.success("Subtopic Field Added");
//   };

//   const removeModule = (index) => {
//     const data = [...modules];
//     data.splice(index, 1);
//     setModules(data);
//     message.success("Module Field Removed");
//   };

//   const removeTopic = (moduleIndex, topicIndex) => {
//     const data = [...modules];
//     data[moduleIndex].topics.splice(topicIndex, 1);
//     setModules(data);
//     message.success("Topic Field Removed");
//   };

//   const removeSubtopic = (moduleIndex, topicIndex, subtopicIndex) => {
//     const data = [...modules];
//     data[moduleIndex].topics[topicIndex].subtopics.splice(subtopicIndex, 1);
//     setModules(data);
//     message.success("Subtopic Field Removed");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(modules)
//     console.log({modules});
//     message.success("Form data logged to console!");
//     Swal.fire({
//       title: module
//     })
//   };

//   return (
//     <div style={{ display: "flex" }} className="production">
//       <SideBar />
//       <div className="dynamic-form">
//         <form >
//           {modules.map((module, moduleIndex) => (
//             <div
//               style={{ padding: "20px" }}
//               key={moduleIndex}
//               className="module-section"
//             >
//               <h4 style={{ color: "white" }}>Module {moduleIndex + 1}</h4>
//               <input
//                 name="module"
//                 placeholder="Module Name"
//                 value={module.module}
//                 onChange={(event) => handleModuleChange(moduleIndex, event)}
//               />
//               <input
//                 name="moduleLearningObjective"
//                 placeholder="Module Learning Objective"
//                 value={module.moduleLearningObjective}
//                 onChange={(event) => handleModuleChange(moduleIndex, event)}
//               />
//               {module.topics.map((topic, topicIndex) => (
//                 <div key={topicIndex} className="topic-section">
//                   <h5>Topic {topicIndex + 1}</h5>
//                   <input
//                     name="topic"
//                     placeholder="Topic Name"
//                     value={topic.topic}
//                     onChange={(event) =>
//                       handleTopicChange(moduleIndex, topicIndex, event)
//                     }
//                   />
//                   {topic.subtopics.map((subtopic, subtopicIndex) => (
//                     <div key={subtopicIndex} className="subtopic-section">
//                       <h6>Sub Topic {subtopicIndex + 1}</h6>
//                       <input
//                         name="subtopic"
//                         placeholder="Subtopic Name"
//                         value={subtopic.subtopic}
//                         onChange={(event) =>
//                           handleSubtopicChange(
//                             moduleIndex,
//                             topicIndex,
//                             subtopicIndex,
//                             event
//                           )
//                         }
//                       />
//                       <input
//                         name="subtopicLearningObjective"
//                         placeholder="Subtopic Learning Objective"
//                         value={subtopic.subtopicLearningObjective}
//                         onChange={(event) =>
//                           handleSubtopicChange(
//                             moduleIndex,
//                             topicIndex,
//                             subtopicIndex,
//                             event
//                           )
//                         }
//                       />
//                       <Button
//                         style={{ background: "#bf3a3a", color: "white" }}
//                         type="button"
//                         onClick={() =>
//                           removeSubtopic(moduleIndex, topicIndex, subtopicIndex)
//                         }
//                       >
//                         Remove Subtopic
//                       </Button>
//                     </div>
//                   ))}
//                   <Button
//                     style={{ background: "#4c8950", color: "white" }}
//                     type="button"
//                     onClick={() => addSubtopic(moduleIndex, topicIndex)}
//                   >
//                     Add Subtopic
//                   </Button>
//                   <Button
//                     style={{ background: "#bf3a3a", color: "white" }}
//                     type="button"
//                     onClick={() => removeTopic(moduleIndex, topicIndex)}
//                   >
//                     Remove Topic
//                   </Button>
//                 </div>
//               ))}
//               <Button
//                 style={{ background: "#4c8950", color: "white" }}
//                 type="button"
//                 onClick={() => addTopic(moduleIndex)}
//               >
//                 Add Topic
//               </Button>
//               <Button
//                 style={{ background: "#bf3a3a", color: "white" }}
//                 type="button"
//                 onClick={() => removeModule(moduleIndex)}
//               >
//                 Remove Module
//               </Button>
//             </div>
//           ))}
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <Button
//               style={{ background: "#4c8950", color: "white" }}
//               type="button"
//               onClick={addModule}
//             >
//               Add Module
//             </Button>
//             <Button onClick={handleSubmit}
//               style={{ background: "#4c8950", color: "white" }}
//               type="submit"
//             >
//               Submit
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LessonPlan;




import React, { useState } from "react";
import "./LessonPlan.css";
import SideBar from "./SideBar";
import { Button, message } from "antd";

const LessonPlan = () => {
  const [modules, setModules] = useState([
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

  const handleModuleChange = (index, event) => {
    const data = [...modules];
    data[index][event.target.name] = event.target.value;
    setModules(data);
  };

  const handleTopicChange = (moduleIndex, topicIndex, event) => {
    const data = [...modules];
    data[moduleIndex].topics[topicIndex][event.target.name] =
      event.target.value;
    setModules(data);
  };

  const handleSubtopicChange = (
    moduleIndex,
    topicIndex,
    subtopicIndex,
    event
  ) => {
    const data = [...modules];
    data[moduleIndex].topics[topicIndex].subtopics[subtopicIndex][
      event.target.name
    ] = event.target.value;
    setModules(data);
  };

  const addModule = () => {
    setModules([
      ...modules,
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
    const data = [...modules];
    data[moduleIndex].topics.push({
      topic: "",
      subtopics: [{ subtopic: "", subtopicLearningObjective: "" }],
    });
    setModules(data);
    message.success("Topic Field Added");
  };

  const addSubtopic = (moduleIndex, topicIndex) => {
    const data = [...modules];
    data[moduleIndex].topics[topicIndex].subtopics.push({
      subtopic: "",
      subtopicLearningObjective: "",
    });
    setModules(data);
    message.success("Subtopic Field Added");
  };

  const removeModule = (index) => {
    const data = [...modules];
    data.splice(index, 1);
    setModules(data);
    message.success("Module Field Removed");
  };

  const removeTopic = (moduleIndex, topicIndex) => {
    const data = [...modules];
    data[moduleIndex].topics.splice(topicIndex, 1);
    setModules(data);
    message.success("Topic Field Removed");
  };

  const removeSubtopic = (moduleIndex, topicIndex, subtopicIndex) => {
    const data = [...modules];
    data[moduleIndex].topics[topicIndex].subtopics.splice(subtopicIndex, 1);
    setModules(data);
    message.success("Subtopic Field Removed");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(modules);
    message.success("Form data displayed on screen!");
  };

  return (
    <div style={{ display: "flex" }} className="production">
      <SideBar />
      <div className="dynamic-form">
        <form >
          {modules.map((module, moduleIndex) => (
            <div
              style={{ padding: "20px" }}
              key={moduleIndex}
              className="module-section"
            >
              <h4 style={{ color: "white" }}>Module {moduleIndex + 1}</h4>
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
                  <h5>Topic {topicIndex + 1}</h5>
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
                      <h6>Sub Topic {subtopicIndex + 1}</h6>
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
                      <Button
                        style={{ background: "#bf3a3a", color: "white" }}
                        type="button"
                        onClick={() =>
                          removeSubtopic(moduleIndex, topicIndex, subtopicIndex)
                        }
                      >
                        Remove Subtopic
                      </Button>
                    </div>
                  ))}
                  <Button
                    style={{ background: "#4c8950", color: "white" }}
                    type="button"
                    onClick={() => addSubtopic(moduleIndex, topicIndex)}
                  >
                    Add Subtopic
                  </Button>
                  <Button
                    style={{ background: "#bf3a3a", color: "white" }}
                    type="button"
                    onClick={() => removeTopic(moduleIndex, topicIndex)}
                  >
                    Remove Topic
                  </Button>
                </div>
              ))}
              <Button
                style={{ background: "#4c8950", color: "white" }}
                type="button"
                onClick={() => addTopic(moduleIndex)}
              >
                Add Topic
              </Button>
              <Button
                style={{ background: "#bf3a3a", color: "white" }}
                type="button"
                onClick={() => removeModule(moduleIndex)}
              >
                Remove Module
              </Button>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{ background: "#4c8950", color: "white" }}
              type="button"
              onClick={addModule}
            >
              Add Module
            </Button>
            <Button onClick={handleSubmit}
              style={{ background: "#4c8950", color: "white" }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
        {submittedData && (
          <div className="submitted-data">
            <h3>Submitted Data</h3>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPlan;


