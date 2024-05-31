// import React, { useEffect, useState } from "react";
// import SideBar from "./SideBar";
// import "./Settings.css";
// import { Button, Col, DatePicker, Input, Row, Select, Form } from "antd";

// import axios from "axios";
// import { BsArrowRight } from "react-icons/bs";
// import { Option } from "antd/es/mentions";
// const { RangePicker } = DatePicker;

// const CourseAllotment = () => {
//   const [facultySelected, setFacultySelected] = useState([]);
//   const [facultyOption, setFacultyOption] = useState("");

//   const [employeeId, setEmployeeId] = useState("");

//   const [selectedSessionCode, setSelectedSessionCode] = useState("");
//   const [sessionCodeOption, setSessionCodeOption] = useState("");

//   const [selectedPLIds, setSelectedPLIds] = useState([]);
//   const [pLIdsOption, setPLIdsOption] = useState("");

//   const [selectedProgramIds, setSelectedProgramIds] = useState([]);
//   const [programIdsOption, setProgramIdsOption] = useState("");

//   const getFacultyRequest = async () => {
//     const response = await axios.get(
//       "http://172.17.18.255:8080/dvp_app/select_faculty/"
//     );
//     setFacultyOption(response?.data);

//     console.log(response);
//   };

//   const getSessionCodeRequest = async () => {
//     const response = await axios.get(
//       "http://172.17.18.255:8080/dvp_app/sessions/"
//     );
//     setSessionCodeOption(response?.data);

//     console.log(response, "SESSION CODE");
//   };

//   const getPLRequest = async () => {
//     const response = await axios.get(
//       "http://172.17.18.255:8080/dvp_app/program_levels/"
//     );
//     setPLIdsOption(response?.data);

//     console.log(response, "PL");
//   };

//   const getProgramRequest = async (prog_level_ids) => {
//     const response = await axios.get(
//       `http://172.17.18.255:8080/dvp_app/programs/search?prog_level_ids=${prog_level_ids}`
//     );

//     setProgramIdsOption(response?.data);

//     console.log(response, "P");
//   };

//   const handleFaculty = (value) => {
//     setFacultySelected(value);
//     setEmployeeId(value);
//   };

//   const handleSessionCode = (value) => {
//     setSelectedSessionCode(value);
//   };

//   const handlePL = (value) => {
//     setSelectedPLIds(value);
//     getProgramRequest(value.join(","));
//   };
//   const handleP = (value) => {
//     setSelectedProgramIds(value);
//   };

//   useEffect(() => {
//     getFacultyRequest();
//     getSessionCodeRequest();
//     getPLRequest();
//     getProgramRequest();
//   }, []);

//   return (
//     <div style={{ display: "flex" }}>
//       <SideBar />
//       <div style={{ display: "flex" }} className="production">
//         <div className="flex-container-wrapper">
//           <div>
//             <div className="container">
//               <div className="title">
//                 <div>
//                   <p className="title-heading">Course Allotment</p>
//                 </div>
//                 <div style={{ padding: "10px" }}>
//                   <Button
//                     primary
//                     // onClick={showDrawer}
//                     style={{ fontSize: "15px", cursor: "pointer" }}
//                     className="title-heading"
//                   >
//                     View Course Allotment :
//                   </Button>
//                 </div>
//               </div>

//               <form className="register-form">
//                 <div className="form-row">
//                   <label>
//                     <p>
//                       <span>Select Employee </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Select
//                       style={{ width: "350px" }}
//                       value={facultySelected}
//                       onChange={handleFaculty}
//                       name="empType"
//                       required
//                     >
//                       {facultyOption &&
//                         facultyOption.map((item) => (
//                           <option
//                             key={item?.employee_id}
//                             value={item?.employee_id}
//                           >
//                             {item?.employee_profile}
//                           </option>
//                         ))}
//                     </Select>
//                   </label>
//                   <label>
//                     <p>
//                       <span>Employee ID </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Input
//                       disabled
//                       value={employeeId}
//                       type="text"
//                       name="userName"
//                       placeholder="Employee ID"
//                       required
//                     />
//                   </label>
//                 </div>

//                 <div className="form-row">
//                   <label>
//                     <p>
//                       <span>Session Code </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Select
//                       value={selectedSessionCode}
//                       onChange={handleSessionCode}
//                       name="sessionCode"
//                       required
//                     >
//                       {sessionCodeOption &&
//                         sessionCodeOption.map((item) => (
//                           <option
//                             value={item?.session_code}
//                             key={item?.session_code}
//                           >
//                             {item?.session_code}
//                           </option>
//                         ))}
//                     </Select>
//                   </label>
//                   <label>
//                     <p>
//                       <span>Program Level </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Select
//                       mode="multiple"
//                       value={selectedPLIds}
//                       onChange={handlePL}
//                       name="PL"
//                       multiple
//                     >
//                       {pLIdsOption &&
//                         pLIdsOption.map((item) => (
//                           <option
//                             value={item?.prog_level_id}
//                             key={item?.prog_level_id}
//                           >
//                             {item?.prog_level_name}
//                           </option>
//                         ))}
//                     </Select>
//                   </label>
//                   <label>
//                     <p>
//                       <span>Program </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Select
//                       mode="multiple"
//                       value={selectedProgramIds}
//                       onChange={handleP}
//                       name="PL"
//                       multiple
//                     >
//                       {programIdsOption &&
//                         programIdsOption.map((item) => (
//                           <option
//                             value={item?.program_id}
//                             key={item?.program_id}
//                           >
//                             {item?.program_name}
//                           </option>
//                         ))}
//                     </Select>
//                   </label>
//                 </div>

//                 <div className="form-row">
//                   <label>
//                     <p>
//                       <span>First Name </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Input name="fName" placeholder="First Name" required />
//                   </label>
//                   <label>
//                     <p>
//                       <span>Middle Name </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Input name="mName" placeholder="Middle Name" required />
//                   </label>
//                   <label>
//                     <p>
//                       <span>Last Name </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Input name="mlName" placeholder="Last Name" required />
//                   </label>
//                 </div>

//                 <div className="form-row">
//                   <label>
//                     <p>
//                       <span>Date Of Birth </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Input
//                       type="date"
//                       name="dob"
//                       placeholder="Date of Birth"
//                       required
//                     />
//                   </label>
//                   <label>
//                     <p>
//                       <span>Date Of Joining </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Input
//                       type="date"
//                       name="fdoj"
//                       placeholder="Date of Joining"
//                       required
//                     />
//                   </label>
//                 </div>

//                 <button className="reg_btn" type="submit">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseAllotment;

// import React, { useEffect, useState } from "react";
// import SideBar from "./SideBar";
// import "./Settings.css";
// import { Button, Input, Select, Form } from "antd";
// import axios from "axios";

// const { Option } = Select;

// const CourseAllotment = () => {
//   const [facultySelected, setFacultySelected] = useState([]);
//   const [facultyOption, setFacultyOption] = useState("");
//   const [employeeId, setEmployeeId] = useState("");
//   const [selectedSessionCode, setSelectedSessionCode] = useState("");
//   const [sessionCodeOption, setSessionCodeOption] = useState("");
//   const [selectedPLIds, setSelectedPLIds] = useState([]);
//   const [pLIdsOption, setPLIdsOption] = useState("");
//   const [selectedProgramIds, setSelectedProgramIds] = useState([]);
//   const [programIdsOption, setProgramIdsOption] = useState("");
//   const [semesters, setSemesters] = useState({});
//   const [subjects, setSubjects] = useState({});
//   const [selectedSemesters, setSelectedSemesters] = useState({});
//   const [selectedSubjects, setSelectedSubjects] = useState({});

//   const getFacultyRequest = async () => {
//     const response = await axios.get(
//       "http://172.17.18.255:8080/dvp_app/select_faculty/"
//     );
//     setFacultyOption(response?.data);
//   };

//   const getSessionCodeRequest = async () => {
//     const response = await axios.get(
//       "http://172.17.18.255:8080/dvp_app/sessions/"
//     );
//     setSessionCodeOption(response?.data);
//   };

//   const getPLRequest = async () => {
//     const response = await axios.get(
//       "http://172.17.18.255:8080/dvp_app/program_levels/"
//     );
//     setPLIdsOption(response?.data);
//   };

//   const getProgramRequest = async (prog_level_ids) => {
//     const response = await axios.get(
//       `http://172.17.18.255:8080/dvp_app/programs/search?prog_level_ids=${prog_level_ids}`
//     );
//     setProgramIdsOption(response?.data);
//   };

//   // const getSemestersRequest = async (program_id) => {
//   //   const response = await axios.get(
//   //     `http://172.17.18.255:8080/dvp_app/semester/search?prog_level_ids=${program_id}`
//   //     // http://172.17.18.255:8080/dvp_app/semester/search/?prog_level_ids=1
//   //   );
//   //   setSemesters((prev) => ({ ...prev, [program_id]: response?.data }));
//   // };

//   const getSemestersRequest = async (program_id) => {
//     try {
//       const response = await axios.get(
//         `http://172.17.18.255:8080/dvp_app/semester/search?prog_level_ids=${program_id}`
//       );
//       console.log("Semester response for program_id:", program_id, response.data);
//       setSemesters((prev) => ({ ...prev, [program_id]: response?.data }));
//     } catch (error) {
//       console.error("Error fetching semesters:", error);
//     }
//   };

//   const getSubjectsRequest = async (program_id, semester_id) => {
//     const response = await axios.get(
//       `http://172.17.18.255:8080/dvp_app/subjects?program_id=${program_id}&semester_id=${semester_id}`
//     );
//     setSubjects((prev) => ({
//       ...prev,
//       [program_id]: { ...prev[program_id], [semester_id]: response?.data },
//     }));
//   };

//   const handleFaculty = (value) => {
//     setFacultySelected(value);
//     setEmployeeId(value);
//   };

//   const handleSessionCode = (value) => {
//     setSelectedSessionCode(value);
//   };

//   const handlePL = (value) => {
//     setSelectedPLIds(value);
//     getProgramRequest(value.join(","));
//   };

//   // const handleProgram = (value) => {
//   //   setSelectedProgramIds(value);
//   //   value.forEach((program_id) => {
//   //     getSemestersRequest(program_id);
//   //   });
//   // };

//   const handleProgram = (value) => {
//     setSelectedProgramIds(value);
//     value.forEach((program_id) => {
//       console.log("Fetching semesters for program_id:", program_id);
//       getSemestersRequest(program_id);
//     });
//   };

//   const handleSemesterChange = (program_id, value) => {
//     setSelectedSemesters((prev) => ({ ...prev, [program_id]: value }));
//     getSubjectsRequest(program_id, value);
//   };

//   const handleSubjectsChange = (program_id, semester_id, value) => {
//     setSelectedSubjects((prev) => ({
//       ...prev,
//       [program_id]: { ...prev[program_id], [semester_id]: value },
//     }));
//   };

//   useEffect(() => {
//     getFacultyRequest();
//     getSessionCodeRequest();
//     getPLRequest();
//   }, []);

//   return (
//     <div style={{ display: "flex" }}>
//       <SideBar />
//       <div style={{ display: "flex" }} className="production">
//         <div className="flex-container-wrapper">
//           <div>
//             <div className="container">
//               <div className="title">
//                 <div>
//                   <p className="title-heading">Course Allotment</p>
//                 </div>
//                 <div style={{ padding: "10px" }}>
//                   <Button
//                     primary
//                     style={{ fontSize: "15px", cursor: "pointer" }}
//                     className="title-heading"
//                   >
//                     View Course Allotment :
//                   </Button>
//                 </div>
//               </div>

//               <form className="register-form">
//                 <div className="form-row">
//                   <label>
//                     <p>
//                       <span>Select Employee </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Select
//                       style={{ width: "350px" }}
//                       value={facultySelected}
//                       onChange={handleFaculty}
//                       name="empType"
//                       required
//                     >
//                       {facultyOption &&
//                         facultyOption.map((item) => (
//                           <Option
//                             key={item?.employee_id}
//                             value={item?.employee_id}
//                           >
//                             {item?.employee_profile}
//                           </Option>
//                         ))}
//                     </Select>
//                   </label>
//                   <label>
//                     <p>
//                       <span>Employee ID </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Input
//                       disabled
//                       value={employeeId}
//                       type="text"
//                       name="userName"
//                       placeholder="Employee ID"
//                       required
//                     />
//                   </label>
//                 </div>

//                 <div className="form-row">
//                   <label>
//                     <p>
//                       <span>Session Code </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Select
//                       value={selectedSessionCode}
//                       onChange={handleSessionCode}
//                       name="sessionCode"
//                       required
//                     >
//                       {sessionCodeOption &&
//                         sessionCodeOption.map((item) => (
//                           <Option
//                             value={item?.session_code}
//                             key={item?.session_code}
//                           >
//                             {item?.session_code}
//                           </Option>
//                         ))}
//                     </Select>
//                   </label>
//                   <label>
//                     <p>
//                       <span>Program Level </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Select
//                       mode="multiple"
//                       value={selectedPLIds}
//                       onChange={handlePL}
//                       name="PL"
//                       multiple
//                     >
//                       {pLIdsOption &&
//                         pLIdsOption.map((item) => (
//                           <Option
//                             value={item?.prog_level_id}
//                             key={item?.prog_level_id}
//                           >
//                             {item?.prog_level_name}
//                           </Option>
//                         ))}
//                     </Select>
//                   </label>
//                   <label>
//                     <p>
//                       <span>Program </span>
//                       <span style={{ color: "red" }}>*</span>
//                     </p>
//                     <Select
//                       mode="multiple"
//                       value={selectedProgramIds}
//                       onChange={handleProgram}
//                       name="PL"
//                       multiple
//                     >
//                       {programIdsOption &&
//                         programIdsOption.map((item) => (
//                           <Option
//                             value={item?.program_id}
//                             key={item?.program_id}
//                           >
//                             {item?.program_name}
//                           </Option>
//                         ))}
//                     </Select>
//                   </label>
//                 </div>

//                 {selectedProgramIds.map((program_id) => (
//                   <div key={program_id} className="program-box">
//                     <h3>
//                       {
//                         programIdsOption.find(
//                           (prog) => prog.program_id === program_id
//                         )?.program_name
//                       }
//                     </h3>
//                     <div className="form-row">
//                       <label>
//                         <p>
//                           <span>Select Semester</span>
//                           <span style={{ color: "red" }}>*</span>
//                         </p>
//                         <Select
//                           value={selectedSemesters[program_id]}
//                           onChange={(value) =>
//                             handleSemesterChange(program_id, value)
//                           }
//                           name="semester"
//                           required
//                         >
//                           {semesters[program_id] &&
//                             semesters[program_id].map((semester) => (
//                               <Option
//                                 value={semester.semester_id}
//                                 key={semester.semester_id}
//                               >
//                                 {semester.semester_name}
//                               </Option>
//                             ))}
//                         </Select>
//                       </label>
//                       {selectedSemesters[program_id] && (
//                         <label>
//                           <p>
//                             <span>Select Subjects</span>
//                             <span style={{ color: "red" }}>*</span>
//                           </p>
//                           <Select
//                             mode="multiple"
//                             value={
//                               selectedSubjects[program_id]?.[
//                                 selectedSemesters[program_id]
//                               ] || []
//                             }
//                             onChange={(value) =>
//                               handleSubjectsChange(
//                                 program_id,
//                                 selectedSemesters[program_id],
//                                 value
//                               )
//                             }
//                             name="subjects"
//                             multiple
//                             required
//                           >
//                             {subjects[program_id] &&
//                               subjects[program_id][
//                                 selectedSemesters[program_id]
//                               ] &&
//                               subjects[program_id][
//                                 selectedSemesters[program_id]
//                               ].map((subject) => (
//                                 <Option
//                                   value={subject.subject_id}
//                                   key={subject.subject_id}
//                                 >
//                                   {subject.subject_name}
//                                 </Option>
//                               ))}
//                           </Select>
//                         </label>
//                       )}
//                     </div>
//                   </div>
//                 ))}

//                 <button className="reg_btn" type="submit">
//                   Submit
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseAllotment;

import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./Settings.css";
import { Button, Input, Select, Form } from "antd";
import axios from "axios";

const { Option } = Select;

const CourseAllotment = () => {
  const [facultySelected, setFacultySelected] = useState([]);
  const [facultyOption, setFacultyOption] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [selectedSessionCode, setSelectedSessionCode] = useState("");
  const [sessionCodeOption, setSessionCodeOption] = useState([]);
  const [selectedPLIds, setSelectedPLIds] = useState([]);
  const [pLIdsOption, setPLIdsOption] = useState([]);
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [programIdsOption, setProgramIdsOption] = useState([]);
  const [semesters, setSemesters] = useState({});
  const [subjects, setSubjects] = useState({});
  const [selectedSemesters, setSelectedSemesters] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState({});

  const getFacultyRequest = async () => {
    const response = await axios.get(
      "http://172.17.18.255:8080/dvp_app/select_faculty/"
    );
    setFacultyOption(response?.data);
  };

  const getSessionCodeRequest = async () => {
    const response = await axios.get(
      "http://172.17.18.255:8080/dvp_app/sessions/"
    );
    setSessionCodeOption(response?.data);
  };

  const getPLRequest = async () => {
    const response = await axios.get(
      "http://172.17.18.255:8080/dvp_app/program_levels/"
    );
    console.log(response, "PL");
    setPLIdsOption(response?.data);
  };

  const getProgramRequest = async (prog_level_ids) => {
    const response = await axios.get(
      `http://172.17.18.255:8080/dvp_app/programs/search?prog_level_ids=${prog_level_ids}`
    );
    setProgramIdsOption(response?.data);
    console.log(response, "P REQUESR");
  };

  const getSubjectsRequest = async (
    prog_level_ids,
    program_id,
    semester_id
  ) => {
    const response = await axios.get(
      `http://172.17.18.255:8080/dvp_app/subjects?prog_level_ids=${prog_level_ids}&program_id=${program_id}&semester_id=${semester_id}`
    );
    setSubjects((prev) => ({
      ...prev,
      [program_id]: { ...prev[program_id], [semester_id]: response?.data },
    }));
    console.log(response, "SUBJECTS");
  };

  const handleFaculty = (value) => {
    setFacultySelected(value);
    setEmployeeId(value);
  };

  const handleSessionCode = (value) => {
    setSelectedSessionCode(value);
  };

  const handlePL = (value) => {
    setSelectedPLIds(value);
    getProgramRequest(value.join(","));
  };

  const handleProgram = (value) => {
    setSelectedProgramIds(value);
    getSemestersRequest(value);
  };

  const getSemestersRequest = async (prog_level_ids) => {
    try {
      const response = await axios.get(
        `http://172.17.18.255:8080/dvp_app/semester/search?prog_level_ids=1,2`
      );
      console.log("Fetched semesters:", response?.data);
      const semestersByProgram = response?.data.reduce((acc, semester) => {
        if (!acc[semester.prog_level]) {
          acc[semester.prog_level] = [];
        }
        acc[semester.prog_level].push(semester);
        return acc;
      }, {});
      setSemesters(semestersByProgram);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const handleSemesterChange = (prog_level, value) => {
    setSelectedSemesters((prev) => ({ ...prev, [prog_level]: value }));
    getSubjectsRequest(selectedPLIds, prog_level, value);
  };

  const handleSubjectsChange = (prog_level, semester_id, value) => {
    setSelectedSubjects((prev) => ({
      ...prev,
      [prog_level]: { ...prev[prog_level], [semester_id]: value },
    }));
  };

  useEffect(() => {
    getFacultyRequest();
    getSessionCodeRequest();
    getPLRequest();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ display: "flex" }} className="production">
        <div className="flex-container-wrapper">
          <div>
            <div className="container">
              <div className="title">
                <div>
                  <p className="title-heading">Course Allotment</p>
                </div>
                <div style={{ padding: "10px" }}>
                  <Button
                    primary
                    style={{ fontSize: "15px", cursor: "pointer" }}
                    className="title-heading"
                  >
                    View Course Allotment :
                  </Button>
                </div>
              </div>

              <form className="register-form">
                <div className="form-row">
                  <label>
                    <p>
                      <span>Select Employee </span>
                      <span style={{ color: "red" }}>*</span>
                    </p>
                    <Select
                      style={{ width: "350px" }}
                      value={facultySelected}
                      onChange={handleFaculty}
                      name="empType"
                      required
                    >
                      {facultyOption &&
                        facultyOption.map((item) => (
                          <Option
                            key={item?.employee_id}
                            value={item?.employee_id}
                          >
                            {item?.employee_profile}
                          </Option>
                        ))}
                    </Select>
                  </label>
                  <label>
                    <p>
                      <span>Employee ID </span>
                      <span style={{ color: "red" }}>*</span>
                    </p>
                    <Input
                      disabled
                      value={employeeId}
                      type="text"
                      name="userName"
                      placeholder="Employee ID"
                      required
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    <p>
                      <span>Session Code </span>
                      <span style={{ color: "red" }}>*</span>
                    </p>
                    <Select
                      value={selectedSessionCode}
                      onChange={handleSessionCode}
                      name="sessionCode"
                      required
                    >
                      {sessionCodeOption &&
                        sessionCodeOption.map((item) => (
                          <Option
                            value={item?.session_code}
                            key={item?.session_code}
                          >
                            {item?.session_code}
                          </Option>
                        ))}
                    </Select>
                  </label>
                  <label>
                    <p>
                      <span>Program Level </span>
                      <span style={{ color: "red" }}>*</span>
                    </p>
                    <Select
                      mode="multiple"
                      value={selectedPLIds}
                      onChange={handlePL}
                      name="PL"
                      multiple
                    >
                      {pLIdsOption &&
                        pLIdsOption.map((item) => (
                          <Option
                            value={item?.prog_level_id}
                            key={item?.prog_level_id}
                          >
                            {item?.prog_level_name}
                          </Option>
                        ))}
                    </Select>
                  </label>
                  <label>
                    <p>
                      <span>Program </span>
                      <span style={{ color: "red" }}>*</span>
                    </p>
                    <Select
                      mode="multiple"
                      value={selectedProgramIds}
                      onChange={handleProgram}
                      name="PL"
                      multiple
                    >
                      {programIdsOption &&
                        programIdsOption.map((item) => (
                          <Option
                            value={item?.program_id}
                            key={item?.program_id}
                          >
                            {item?.program_name}
                          </Option>
                        ))}
                    </Select>
                  </label>
                </div>

                {selectedProgramIds.map((program_id) => (
                  <div key={program_id} className="program-box">
                    <h3>
                      {
                        programIdsOption.find(
                          (prog) => prog.program_id === program_id
                        )?.program_name
                      }
                      {` - `}
                      {
                        programIdsOption.find(
                          (prog) => prog.program_id === program_id
                        )?.prog_level === 1 ? "UG" : "PG" 
                      }
                    </h3>
                    <div className="form-row">
                      <label>
                        <p>
                          <span>Select Semester</span>
                          <span style={{ color: "red" }}>*</span>
                        </p>
                        <Select
                          value={selectedSemesters[program_id]}
                          onChange={(value) =>
                            handleSemesterChange(program_id, value)
                          }
                          name="semester"
                          required
                        >
                          {semesters[selectedPLIds[program_id]] &&
                            semesters[selectedPLIds[program_id]].map(
                              (semester) => (
                                <Option
                                  value={semester.semester_id}
                                  key={semester.semester_id}
                                >
                                  {semester.semester_name}
                                </Option>
                              )
                            )}
                        </Select>
                      </label>
                      {selectedSemesters[program_id] && (
                        <label>
                          <p>
                            <span>Select Subjects</span>
                            <span style={{ color: "red" }}>*</span>
                          </p>
                          <Select
                            mode="multiple"
                            value={
                              selectedSubjects[program_id]?.[
                                selectedSemesters[program_id]
                              ] || []
                            }
                            onChange={(value) =>
                              handleSubjectsChange(
                                program_id,
                                selectedSemesters[program_id],
                                value
                              )
                            }
                            name="subjects"
                            multiple
                          >
                            {subjects[program_id]?.[
                              selectedSemesters[program_id]
                            ] &&
                              subjects[program_id][
                                selectedSemesters[program_id]
                              ].map((subject) => (
                                <Option
                                  value={subject.subject_id}
                                  key={subject.subject_id}
                                >
                                  {subject.subject_name}
                                </Option>
                              ))}
                          </Select>
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAllotment;
