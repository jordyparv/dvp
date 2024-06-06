import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./Settings.css";
import { Button, Drawer, Input, Select, Table, message } from "antd";
import axios from "axios";
import Loader from "../../pages/Loader";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { subjectAction } from "../../redux/Slice/subjectAction";

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

  const [subjectsData, setSubjectData] = useState([]);

  const [formDetails, setFormDetails] = useState({
    semesters: [],
    subjects: {},
  });
  const [userSelectedData, setUserSelectedData] = useState({
    semesters: {},
    subjects: {},
  });
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getAllotedData = async () => {
    try {
      const response = await axios.get("/dvp_app/course_allotment/");
      console.log(response, "_____ewe9w");
      setSubjectData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFacultyRequest = async () => {
    const response = await axios.get(
      "http://172.17.18.255:8080/dvp_app/select_faculty/"
    );
    setFacultyOption(response?.data);
    setFormDetails((prev) => ({
      ...prev,
      employees: response?.data,
    }));
  };

  const getSessionCodeRequest = async () => {
    const response = await axios.get(
      "http://172.17.18.255:8080/dvp_app/sessions/"
    );
    setSessionCodeOption(response?.data);
    setFormDetails((prev) => ({
      ...prev,
      sessions: response?.data,
    }));
  };

  const getPLRequest = async () => {
    const response = await axios.get(
      "http://172.17.18.255:8080/dvp_app/program_levels/"
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
        session_code: parseInt(userSelectedData?.session_code),
        prog_id: userSelectedData?.programs,
        subject_id: aggregatedSubjects, // Combine all selected subject_ids into one array
      };

      const config = {
        url: "/dvp_app/course_allotment/",
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
  ];
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
                    View Course Allotment :
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
                        value={userSelectedData?.session_code}
                        onChange={(session_code) =>
                          handleUserInput("session_code", session_code)
                        }
                        name="sessionCode"
                        required
                      >
                        {formDetails?.sessions?.length &&
                          formDetails?.sessions?.map((item) => (
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

                  <button onClick={handleCourseAllotment} type="button">
                    submit
                  </button>
                </form>
              )}
            </div>

            <Drawer
              width={900}
              title="Subjects Table"
              onClose={onClose}
              open={open}
            >
              <Table
                dataSource={subjectsData}
                columns={columns}
                rowKey="employee_id"
              />
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAllotment;
