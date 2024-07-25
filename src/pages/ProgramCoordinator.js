import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  message,
} from "antd";
import axios from "axios";

import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { subjectAction } from "../redux/Slice/subjectAction";
import SideBar from "../components/Sidebar/SideBar";
import edit from "../assets/images/edit.png";
import dele from "../assets/images/dele.png";
import Loader from "./Loader";

const { Option } = Select;

const ProgramCoordinator = () => {
  const [loading, setLoading] = useState(false);
  const [facultyOption, setFacultyOption] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  const [sessionCodeOption, setSessionCodeOption] = useState([]);

  const [pLIdsOption, setPLIdsOption] = useState([]);

  const [programIdsOption, setProgramIdsOption] = useState([]);
  const [semesters, setSemesters] = useState({});
  const [subjects, setSubjects] = useState({});

  const [selectedSessionForEmployee, setSelectedSessionForEmployee] =
    useState("");
  const [selectedSession, setSelectedSession] = useState("");

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
  const [totalPc, setTotalPc] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState("");

  //reasign
  const [selectedProgramLevel, setSelectedProgramLevel] = useState(null);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [allProgramLevels, setAllProgramLevels] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedProgramIds, setSelectedProgramIds] = useState([]);
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [courseAllotmentId, setCourseAllotmentId] = useState([]);
  const [subjectSearch, setSubjectSearch] = useState("");
  const [pcCount, setPcCount] = useState("");

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getCurrentSession = async () => {
    const response = await axios.get(
      `http://172.17.19.25:8080/dvp_app/current_session/`
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
        `http://172.17.19.25:8080/dvp_app/select_pc/?session_code=${currentSession}`
      );
      console.log(response, "((((((((((((((((((((((((");
      setFacultyOption(response?.data);
      setTotalPc(response?.data);
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
        "http://172.17.19.25:8080/dvp_app/sessions/"
      );
      console.log("Fetched sessions:", response.data); // Debugging log

      // Filter out null values and ensure unique keys
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
      "http://172.17.19.25:8080/dvp_app/program_levels/"
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
        url: `/dvp_app/programs/search?prog_level_ids=${prog_level_ids}`,
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
        `/dvp_app/subjects/search?program_id=${program_id}&semester_id=${semester_id}`
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
        `/dvp_app/semester/search?prog_level_ids=${prog_level_ids}`
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
        url: "/dvp_app/program_coordinators/",
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
      Swal.fire({
        icon: "success",
        title: `PC Allotment successfully`,
        showConfirmButton: false,
        timer: 3000,
      });
      setLoading(false);
      setEmployeeId("");
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "warning",
        title: `${error?.response?.data?.message[0]}`,
        showConfirmButton: false,
        timer: 3000,
      });
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
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    { title: "Session Code", dataIndex: "session_code", key: "session_code" },

    {
      title: "Program Names",
      dataIndex: "prog_names",
      key: "prog_names",
      render: (prog_names) => prog_names.join(", "),
    },

    {
      title: "Subject Names",
      dataIndex: "subject_names",
      key: "subject_names",
      render: (subject_names) => subject_names.join(", "),
    },

    { title: "Created At", dataIndex: "created_at", key: "created_at" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>
            <img
              style={{ width: "27px", cursor: "pointer" }}
              onClick={() => showEditModal(record?.pc_id)}
              src={edit}
              alt="editLogo"
            />
          </div>
          <div
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onConfirm={() => handleDelete(record.pc_id)}
          >
            <img src={dele} alt="del" />
          </div>
        </div>
      ),
    },
  ];

  const getAllotedData = async () => {
    try {
      const response = await axios.get(
        "http://172.17.19.25:8080/dvp_app/program_coordinators/"
      );
      console.log(response?.data?.length, "Fetched Data");
      setSubjectData(response?.data);
      setTotalPc(response?.data);
      setPcCount(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://172.17.19.25:8080/dvp_app/program_coordinators/${id}/`
      );
      message.success("Entry deleted successfully");
      getAllotedData(); // Refresh the data
    } catch (error) {
      console.error("Error deleting entry:", error);
      message.error("Failed to delete entry");
    }
  };

  const showEditModal = (pc_id) => {
    setEditingRecord(pc_id);
    setEditModalVisible(true);
    setCourseAllotmentId(pc_id);
    fetchData(pc_id);
    setEditingRecord(pc_id);

    console.log(pc_id, "EEEEEEEEEE");

    setSelectedSubjects(subjects || []);

    setEditModalVisible(true);
  };

  // const handleEditSubmit = async () => {
  //   try {
  //     const payload = {
  //       ...editingRecord,
  //       prog_id: editingRecord.program_id, // Convert to prog_id as expected by backend
  //     };
  //     delete payload.program_id; // Remove program_id from payload
  //     await axios.put(
  //       `http://172.17.19.25:8080/dvp_app/program_coordinators/${editingRecord.pc_id}/`,
  //       payload
  //     );
  //     message.success("Entry updated successfully");
  //     setEditModalVisible(false);
  //     getAllotedData(); // Refresh the data
  //   } catch (error) {
  //     console.error("Error updating entry:", error);
  //     message.error("Failed to update entry");
  //   }
  // };

  const handleFormChange = (key, value) => {
    setEditingRecord((prev) => ({ ...prev, [key]: value }));
  };

  //reasign

  const fetchData = async (pc_id) => {
    try {
      const response = await axios.get(
        `http://172.17.19.25:8080/dvp_app/course-reasigned-pc/${pc_id}/`
      );

      const data = response.data;

      setSelectedProgramLevel(data.selected_program_level);
      setSelectedPrograms(data.selected_programs);
      setSelectedSubjects(data.selected_subjects);
      setAllProgramLevels(data.all_program_levels);
      setAllPrograms(data.all_programs);
      setAllSubjects(data.all_subjects);

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

  // const handleSubjectChange = (e) => {
  //   const { value, checked } = e.target;
  //   setSelectedSubjectIds((prevState) =>
  //     checked
  //       ? [...prevState, Number(value)]
  //       : prevState.filter((id) => id !== Number(value))
  //   );
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

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
        `/dvp_app/pc-course-allotment-update/${courseAllotmentId}/`,
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

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ display: "flex" }} className="production">
        <div className="flex-container-wrapper">
          <div>
            <div className="container">
              <div className="title">
                <div>
                  <p className="title-heading">PC Allotment</p>
                </div>
                <div style={{ padding: "10px" }}>
                  <Button
                    onClick={showDrawer}
                    primary
                    style={{ fontSize: "15px", cursor: "pointer" }}
                    className="title-heading"
                  >
                    View PC Allotment : {pcCount?.length}
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
                    <label>
                      <p>
                        <span>Current Session </span>
                      </p>

                      <Input
                        style={{ width: "340px" }}
                        disabled
                        value={currentSession}
                        placeholder="Current Session "
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
                  <div style={{width:"200px", justifyContent:"center", display:"flex"}}>
                  <button onClick={handleCourseAllotment} type="submit">
                    submit
                  </button>
                  </div>

                 
                </form>
              )}
            </div>

            <Drawer
              width={900}
              title="PC Allotment Table"
              onClose={onClose}
              open={open}
            >
              <Table
                dataSource={subjectsData}
                columns={columns}
                rowKey="pc_id"
              />
            </Drawer>

            <Modal
              title="Edit Entry"
              visible={editModalVisible}
              onOk={handleEditSubmit}
              onCancel={() => setEditModalVisible(false)}
            >
              <form style={{ width: "500px" }} onSubmit={handleSubmit}>
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
               
              </form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCoordinator;
