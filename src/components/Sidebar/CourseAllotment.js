import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./Settings.css";
import { Button, Drawer, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import Loader from "../../pages/Loader";
import Swal from "sweetalert2";
import edit from "../../assets/images/edit.png";
import dele from "../../assets/images/dele.png";

const { Option } = Select;

const CourseAllotment = () => {
  const [loading, setLoading] = useState(false);
  const [facultyOption, setFacultyOption] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  const [sessionCodeOption, setSessionCodeOption] = useState([]);

  const [pLIdsOption, setPLIdsOption] = useState([]);

  const [programIdsOption, setProgramIdsOption] = useState([]);
  const [semesters, setSemesters] = useState({});
  const [subjects, setSubjects] = useState({});

  const [selectedSessionForEmployee, setSelectedSessionForEmployee] =
    useState(""); // New state for session to display employees
  const [selectedSession, setSelectedSession] = useState(""); // Existing state for

  const [subjectsData, setSubjectData] = useState([]);

  const [formDetails, setFormDetails] = useState({
    semesters: [],
    subjects: {},
  });
  const [userSelectedData, setUserSelectedData] = useState({
    semesters: {},
    subjects: {},
  });

  const [currentSession, setCurrentSession] = useState(null);
  const [open, setOpen] = useState(false);

  const [selectedProgramLevel, setSelectedProgramLevel] = useState(null);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [allProgramLevels, setAllProgramLevels] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [sessionCode, setSessionCode] = useState([]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState("");
  const [courseAllotment, setCourseAllotment] = useState([]);
  const [courseAllotmentId, setCourseAllotmentId] = useState([]);
  const [subjectSearch, setSubjectSearch] = useState("");

  // filter subjects
  const filteredSubjects = allSubjects?.filter(
    (subject) =>
      subject.subject_code
        .toLowerCase()
        .includes(subjectSearch.toLowerCase()) ||
      subject.subject_name.toLowerCase().includes(subjectSearch.toLowerCase())
  );
  // const handleSubjectSearchChange = (e) => {
  //   setSubjectSearch(e.target.value);
  // };

  const handleSubjectSearchChange = (e) => {
    setSubjectSearch(e.target.value);
  };

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    const { value, checked } = e.target;
    console.log("Selected Subject ID: ", subjectId);

    setSelectedSubjectIds((prevState) =>
      checked
        ? [...prevState, Number(value)]
        : prevState.filter((id) => id !== Number(value))
    );
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getAllotedData = async () => {
    try {
      const response = await axios.get("http://43.204.119.135/api/dvp_app/course_allotment/");
      console.log(response, "_____ewe9w");

      setSubjectData(response?.data);
      if (response?.data?.employee_id) {
        setEmployeeId(response.data.employee_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentSession = async () => {
    const response = await axios.get(
      `http://43.204.119.135/api/dvp_app/current_session/`
    );
    setCurrentSession(response?.data?.session_code);
    console.log(
      response?.data?.session_code,
      "__________CURRENT SESSION ____________"
    );
  };

  useEffect(() => {
    getCurrentSession();
    getFacultyRequest(currentSession);
  }, currentSession);

  const getFacultyRequest = async (currentSession) => {
    try {
      const response = await axios.get(
        `http://43.204.119.135/api/dvp_app/select_faculty/?session_code=${currentSession}`
      );

      console.log(response, "%%%%%%%%%%%%%%%%%");

      setFacultyOption(response?.data);
      setFormDetails((prev) => ({
        ...prev,
        employees: response?.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedSessionForEmployee) {
      getFacultyRequest(selectedSessionForEmployee);
    }
  }, [selectedSessionForEmployee]);

  const getSessionCodeRequest = async () => {
    try {
      const response = await axios.get(
        "http://43.204.119.135/api/dvp_app/sessions/"
      );
      console.log("Fetched sessions:", response.data);

      const validSessions = response.data.filter(
        (session) => session.id !== null
      );

      setSessionCodeOption(validSessions);
      setFormDetails((prev) => ({
        ...prev,
        sessions: validSessions,
      }));
    } catch (error) {
      console.log("Error fetching sessions:", error.message);
    }
  };

  const getPLRequest = async () => {
    const response = await axios.get(
      "http://43.204.119.135/api/dvp_app/program_levels/"
    );

    setPLIdsOption(response?.data);
    setFormDetails((prev) => ({
      ...prev,
      program_levels: response.data,
    }));
  };

  const getProgramRequest = async (prog_level_ids) => {
    try {
      let config = {
        url: `http://43.204.119.135/api/dvp_app/programs/search/?prog_level_ids=${prog_level_ids}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
      };

      const response = await axios(config);

      console.log(response, "PR");
      setProgramIdsOption(response?.data);

      setFormDetails((prev) => ({
        ...prev,
        programs: response?.data,
      }));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getSubjectsRequest = async (
    prog_level_ids,
    program_id,
    semester_id
  ) => {
    try {
      const response = await axios.get(
        `http://43.204.119.135/api/dvp_app/subjects/search/?program_id=${program_id}&semester_id=${semester_id}`
      );
      setSubjects((prev) => {
        let _sub = `pi=${program_id}::si=${semester_id}`;
        return { ...prev, [_sub]: response?.data?.subjects };
      });
      //[pl=::pi=::si=]
      setFormDetails((prev) => ({
        ...prev,
        subjects: {
          ...formDetails?.subjects,
          [program_id]: response?.data?.subjects,
        },
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSemestersRequest = async (prog_level_ids) => {
    try {
      const response = await axios.get(
        `http://43.204.119.135/api/dvp_app/semester/search/?prog_level_ids=${prog_level_ids}`
      );

      const semestersByProgram = response?.data.reduce((acc, semester) => {
        if (!acc[semester.prog_level]) {
          acc[semester.prog_level] = [];
        }
        acc[semester.prog_level].push(semester);
        return acc;
      }, {});

      setSemesters(semestersByProgram);
      setFormDetails((prev) => ({ ...prev, semesters: response?.data }));
    } catch (error) {
      console.error("Error fetching semesters:", error.message);
    }
  };

  useEffect(() => {
    getFacultyRequest();
    getSessionCodeRequest();
    getPLRequest();
    getAllotedData();
  }, []);

  const handleUserInput = (key, value) => {
    setUserSelectedData((prev) => ({ ...prev, [key]: value }));
    if (key === "employeeId") {
      setEmployeeId(value);
    }
  };

  const makeCourseAllotmentPost = async () => {
    setLoading(true);
    try {
      const aggregatedSubjects = [];
      for (const program_id of userSelectedData?.programs || []) {
        const subjectIds =
          userSelectedData?.subjects[program_id]?.subject_ids || [];
        aggregatedSubjects.push(...subjectIds);
      }

      let data = {
        employee_id: parseInt(employeeId),
        // session_code: userSelectedData?.session_code,
        session_code: currentSession,
        prog_id: userSelectedData?.programs,
        subject_id: aggregatedSubjects, // Combine all selected subject_ids into one array
      };

      const config = {
        url: "http://43.204.119.135/api/dvp_app/course_allotment/",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        data,
      };

      const postCourseAllotment = await axios(config);
      console.log(postCourseAllotment, "COURSE ALLOTMENT");
      message.success("COURSE ALLOTMENT SUCCESS");
      getAllotedData();
      Swal.fire({
        icon: "success",
        title: `Course Allotment successfully`,
        showConfirmButton: false,
        timer: 3000,
      });
      setLoading(false);
      setEmployeeId("");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleCourseAllotment = async () => {
    try {
      await makeCourseAllotmentPost();
    } catch (error) {
      console.log(error, "ERROR COURSE ALLOTMNR");
    }
  };

  console.log(userSelectedData, "COURSE DATA");

  console.log({ formDetails });

  const columns = [
    { title: "Session Code", dataIndex: "session_code", key: "session_code" },
    { title: "Subject Name", dataIndex: "subjects", key: "subjects" },
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },

    { title: "Program Name", dataIndex: "programs", key: "programs" },
    { title: "Created At", dataIndex: "created_at", key: "created_at" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>
            <img
              style={{ width: "27px", cursor: "pointer" }}
              onClick={() => showEditModal(record?.course_allotment_ids)}
              src={edit}
              alt="editLogo"
            />
          </div>
          <div style={{ marginLeft: "10px", cursor: "pointer" }}>
            <img src={dele} alt="del" />
          </div>
        </div>
      ),
    },
  ];

  const fetchData = async (course_allotment_ids) => {
    try {
      const response = await axios.get(
        `http://43.204.119.135/api/dvp_app/course-reasigned/${course_allotment_ids}/`
      );
      console.log(courseAllotment, response, "GGGGGGGG");
      const data = response.data;
      setCourseAllotment(data?.course_allotment_id);
      setSelectedProgramLevel(data.selected_program_level);
      setSelectedPrograms(data.selected_programs);
      setSelectedSubjects(data.selected_subjects);
      setAllProgramLevels(data.all_program_levels);
      setAllPrograms(data.all_programs);
      setAllSubjects(data.all_subjects);
      setSessionCode(data?.session_code);

      setSelectedProgramIds(
        data.selected_programs.map((program) => program.program_id)
      );
      setSelectedSubjectIds(
        data.selected_subjects.map((subject) => subject.subject_id)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProgramChange = (e) => {
    const { value, checked } = e.target;
    setSelectedProgramIds((prevState) =>
      checked
        ? [...prevState, Number(value)]
        : prevState.filter((id) => id !== Number(value))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Editing record:", editingRecord);

      // const currentSelectedSubjects = editingRecord.selected_subjects || [];
      const currentSelectedSubjects = editingRecord.selected_subjects || [];

      const combinedSubjects = [
        ...new Set([
          ...selectedSubjectIds,
          ...currentSelectedSubjects.map((subject) => subject.subject_id),
        ]),
      ];

      const updatedRecord = {
        subject_id: combinedSubjects,
      };

      console.log("Updated record:", updatedRecord);
      const response = await axios.patch(
        `http://43.204.119.135/api/dvp_app/course-allotment-update/${courseAllotmentId}/`,
        updatedRecord
      );

      console.log(response, "TTTTTTTTT");

      message.success("Entry updated successfully");
      setEditModalVisible(false);
      setEditingRecord(null);
      getAllotedData();
      getAllotedData(employeeId); // Refresh data for the current employee
    } catch (error) {
      console.error("Failed to update entry:", error);
      message.error("Failed to update entry. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    // try {
    //   await axios.delete(
    //     `http://43.204.119.135/api/dvp_app/program_coordinators/${id}/`
    //   );
    //   message.success("Entry deleted successfully");
    //   getAllotedData(); // Refresh the data
    // } catch (error) {
    //   console.error("Error deleting entry:", error);
    //   message.error("Failed to delete entry");
    // }
  };

  const showEditModal = (course_allotment_ids) => {
    setCourseAllotmentId(course_allotment_ids);
    fetchData(course_allotment_ids);
    setEditingRecord(course_allotment_ids);
    console.log(course_allotment_ids, "EEEEEEEEEE");
    setSelectedSubjects(subjects || []);
    setEditModalVisible(true);
  };



  console.log(filteredSubjects, "FILRER SUBJECTS............");

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
                    onClick={showDrawer}
                    primary
                    style={{ fontSize: "15px", cursor: "pointer" }}
                    className="title-heading"
                  >
                    View Course Allotment : {subjectsData?.length}
                  </Button>
                </div>
              </div>

              {loading === true ? (
                <>
                  <Loader />
                </>
              ) : (
                <form className="register-form">
                  <div className="form-row">
                    <label >
                      <p>
                        <span>Current Session</span>
                      </p>

                      <Input style={{ width: "340px" }}
                        value={currentSession}
                        placeholder="Current Session"
                        disabled
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      <p>
                        <span>Select Employee </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Select
                        style={{ width: "350px" }}
                        value={userSelectedData?.employeeId}
                        onChange={(employeeId) =>
                          handleUserInput("employeeId", employeeId)
                        }
                        name="empType"
                        required
                      >
                        {formDetails?.employees?.length &&
                          formDetails?.employees?.map((item) => (
                            <Option
                              key={item?.employee_id}
                              value={item?.employee_id}
                            >
                              {item?.employee_profile}
                            </Option>
                          ))}
                      </Select>
                    </label>
                  </div>
                  <div className="form-row">
                    <label style={{ display: "none" }}>
                      <p>
                        <span>Session Code </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>

                      <Input
                        value={currentSession}
                        placeholder="Current Session"
                        disabled
                      />
                    </label>
                    <label>
                      <p>
                        <span>Program Level </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Select
                        mode="multiple"
                        value={userSelectedData?.prog_level}
                        onChange={(prog_level) => {
                          getProgramRequest(prog_level);
                          handleUserInput("prog_level", prog_level);
                        }}
                        name="PL"
                        multiple
                      >
                        {formDetails?.program_levels?.length &&
                          formDetails?.program_levels?.map((item) => (
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
                        <span>Programs </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Select
                        mode="multiple"
                        value={userSelectedData?.programs}
                        onChange={(programs) => {
                          getSemestersRequest(
                            userSelectedData?.prog_level.join(",")
                          );
                          handleUserInput("programs", programs);
                        }}
                        name="PL"
                        multiple
                      >
                        {formDetails?.programs?.length &&
                          formDetails?.programs?.map((item) => (
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

                  <div className="accordion-body">
                    {userSelectedData?.programs?.map((program_id) => (
                      <div key={program_id} className="program-box">
                        <h3>
                          {
                            formDetails.programs.find(
                              (prog) => prog.program_id === program_id
                            )?.program_name
                          }
                          {` - `}
                          {formDetails.programs.find(
                            (prog) => prog.program_id === program_id
                          )?.prog_level === 1
                            ? "UG"
                            : "PG"}
                        </h3>
                        <div className="form-row">
                          <label>
                            <p>
                              <span>Select Semester </span>
                              <span style={{ color: "red" }}>*</span>
                            </p>
                            <Select
                              style={{ width: "200px" }}
                              mode="multiple"
                              value={
                                userSelectedData?.semesters[program_id] || []
                              }
                              onChange={(semesterIds) => {
                                setUserSelectedData((prev) => ({
                                  ...prev,
                                  semesters: {
                                    ...prev?.semesters,
                                    [program_id]: semesterIds,
                                  },
                                }));
                                getSubjectsRequest(
                                  userSelectedData?.prog_level.join(","),
                                  program_id,
                                  semesterIds
                                );
                              }}
                              name="semester"
                              required
                            >
                              {Array.isArray(formDetails?.semesters) &&
                                formDetails?.semesters?.length
                                ? formDetails.semesters
                                  .filter(
                                    (item) =>
                                      userSelectedData.prog_level.includes(
                                        item.prog_level_id
                                      ) &&
                                      formDetails.programs.find(
                                        (prog) =>
                                          prog.program_id === program_id
                                      )?.prog_level === item.prog_level_id
                                  )
                                  .map((semester) => (
                                    <Option
                                      value={semester.semester_id}
                                      key={semester.semester_id}
                                    >
                                      {semester.semester_name}
                                    </Option>
                                  ))
                                : null}
                            </Select>
                          </label>

                          {formDetails?.subjects[program_id] && (
                            <label>
                              <p>
                                <span>Select Subjects</span>
                                <span style={{ color: "red" }}>*</span>
                              </p>
                              <Select
                                style={{ width: "300px" }}
                                mode="multiple"
                                value={
                                  userSelectedData?.subjects[program_id]
                                    ?.subject_ids || []
                                }
                                onChange={(subject_ids) => {
                                  setUserSelectedData((prev) => ({
                                    ...prev,
                                    subjects: {
                                      ...prev?.subjects,
                                      [program_id]: {
                                        ...prev?.subjects[program_id],
                                        subject_ids,
                                      },
                                    },
                                  }));
                                }}
                                name="subjects"
                                multiple
                              >
                                {formDetails?.subjects[program_id].length > 0 &&
                                  formDetails?.subjects[program_id].map(
                                    (subject, idx) => {
                                      return (
                                        <Option
                                          value={subject.subject_id}
                                          key={idx}
                                        >
                                          {subject.subject_name}
                                        </Option>
                                      );
                                    }
                                  )}
                              </Select>
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="submitButton"
                    onClick={handleCourseAllotment}
                    type="button"
                  >
                    submit
                  </button>
                </form>
              )}
            </div>

            <Drawer
              width={900}
              title="Course Allotment Table"
              onClose={onClose}
              open={open}
            >
              <Table
                dataSource={subjectsData}
                columns={columns}
                rowKey="employee_id"
              />
            </Drawer>
            <Modal
              title="Course Reassigned"
              visible={editModalVisible}
              onOk={handleEditSubmit}
              // onOk={handleReAssigned}
              onCancel={() => setEditModalVisible(false)}
            >
              <>
                <form style={{ width: "500px" }} onSubmit={handleSubmit}>
                  <fieldset>
                    <p>Course Reassign</p>
                  </fieldset>
                  <fieldset>
                    <Input
                      style={{ width: "350px" }}
                      value={sessionCode?.session_code}
                      disabled
                    />
                  </fieldset>

                  <fieldset>
                    <label>Search Subject</label>
                    <Input
                      value={subjectSearch}
                      onChange={handleSubjectSearchChange}
                      placeholder="Search Subjects"
                    />

                    <legend>Select Subjects:</legend>

                    <div>
                      {filteredSubjects.map((subject) => (
                        <div key={subject.subject_id}>
                          <input
                            type="checkbox"
                            id={`subject-${subject.subject_id}`}
                            value={subject.subject_id}
                            checked={selectedSubjectIds.includes(
                              subject.subject_id
                            )}
                            onChange={handleSubjectChange}
                          />
                          <label htmlFor={`subject-${subject.subject_id}`}>
                            {subject.subject_name + " " + subject.subject_code}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  {/* <button onClick={handleReAssigned} type="submit">
                    Submit
                  </button> */}
                </form>
              </>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAllotment;
