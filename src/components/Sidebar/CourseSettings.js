import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import "./Settings.css";
import {
  Button,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Form,
  Modal,
  Checkbox,
  message,
  Radio,
  Table,
} from "antd";

import axios from "axios";
import { BsArrowRight } from "react-icons/bs";
import { Option } from "antd/es/mentions";
const { RangePicker } = DatePicker;

const CourseSettings = () => {
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const [sessionData, setSessionData] = useState([]);
  const [PLDATA, setPLDATA] = useState([]);

  const [programLevel, setProgramLevel] = useState("");
  const [programStatus, setProgramStatus] = useState("");

  const [semesterName, setSemesterName] = useState("");
  const [semesterData, setSemesterData] = useState([]);

  const [selectedProgramLevel, setSelectedProgramLevel] = useState("");
  const [programLevelOption, setProgramLevelOption] = useState("");

  const [programName, setProgramName] = useState("");
  const [programData, setProgramData] = useState([]);
  const [programCode, setProgramCode] = useState("");
  const [programStats, setProgramStats] = useState("");

  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [programOption, setProgramOption] = useState("");
  const [selectedSemesterName, setSelectedSemesterName] = useState("");
  const [semesterOption, setSemesterOption] = useState("");

  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkboxState, setCheckboxState] = useState({});
  const [activeSession, setActiveSession] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const Swal = require("sweetalert2");

  const sessionRequest = async () => {
    try {
      const data = {
        start_year: startYear,
        end_year: endYear,
        start_month: startMonth,
        end_month: endMonth,
      };
      const config = {
        method: "POST",
        url: `http://172.17.19.25:8080/dvp_app/sessions/`,
        data,
      };

      const sessionData = await axios(config);
      console.log(sessionData, "SESSION DATA");
      Swal.fire({
        icon: "success",
        title: `Session code ${sessionData?.data?.session_code} added successfully`,
        showConfirmButton: false,
        timer: 3000,
      });
      getSessionData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response?.data?.message}`,
      });
      console.error(error);
    }
  };

  const getSessionData = async () => {
    const response = await axios.get(
      "http://172.17.19.25:8080/dvp_app/sessions/"
    );
    console.log(response);
    setSessionData(response);
  };

  const programLevelRequest = async () => {
    try {
      const data = {
        prog_level_name: programLevel,
        prog_status: programStatus,
      };
      const config = {
        method: "POST",
        url: `http://172.17.19.25:8080/dvp_app/program_levels/`,
        data,
      };

      const programLevelData = await axios(config);
      console.log(programLevelData, "programLevelData ");
      Swal.fire({
        icon: "success",
        title: `Program Level code ${programLevelData?.data?.prog_level_name} added successfully`,
        showConfirmButton: false,
        timer: 3000,
      });
      getProgramLevel();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response?.data?.message[0]}`,
      });
      console.error(error);
    }
  };

  const getProgramLevel = async () => {
    try {
      const getPLData = await axios.get(
        "http://172.17.19.25:8080/dvp_app/program_levels/"
      );
      setPLDATA(getPLData);
      setProgramLevelOption(getPLData?.data);
      console.log(getPLData, "PL DATA");
    } catch (error) {
      console.log(error);
    }
  };

  const semesterRequest = async () => {
    try {
      const data = {
        semester_name: semesterName,
        prog_level_id: selectedProgramLevel,
      };
      const config = {
        method: "POST",
        url: `http://172.17.19.25:8080/dvp_app/semesters/`,
        data,
      };

      const semesterData = await axios(config);
      console.log(semesterData, "semesterData ");
      Swal.fire({
        icon: "success",
        title: `Semester  ${semesterData?.data?.semester_name} added successfully`,
        showConfirmButton: false,
        timer: 3000,
      });

      getSemesterTable();
      getSemester();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response?.data?.message[0]}`,
      });
      console.error(error);
    }
  };

  const getSemester = async (progLevelId) => {
    try {
      const getSemesterData = await axios.get(
        `/dvp_app/semester/search?prog_level_ids=${progLevelId}`
      );
      // setSemesterData(getSemesterData);
      setSemesterOption(getSemesterData?.data);
      console.log(getSemesterData, "SEMSETER DATA");
    } catch (error) {
      console.log(error, "Semester");
    }
  };

  const getSemesterTable = async () => {
    try {
      const getSemesterData = await axios.get(`/dvp_app/semesters/`);
      setSemesterData(getSemesterData);

      // setSemesterOption(getSemesterData?.data);
      console.log(getSemesterData, "SEMSETER DATA");
    } catch (error) {
      console.log(error, "Semester");
    }
  };

  const programRequest = async () => {
    try {
      const data = {
        program_name: programName,
        prog_level: selectedProgramLevel,
        program_code: programCode,
        status: programStats,
      };
      const config = {
        method: "POST",
        url: `http://172.17.19.25:8080/dvp_app/programs/`,
        data,
      };

      const programData = await axios(config);
      console.log(programData, "programData ");
      Swal.fire({
        icon: "success",
        title: `Program  ${programData?.data?.program_name} added successfully`,
        showConfirmButton: false,
        timer: 3000,
      });
      getProgramLevel();
      getProgram();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response?.data?.message[0]}`,
      });
      console.error(error);
    }
  };

  const getProgram = async () => {
    try {
      const getProgramData = await axios.get(
        "http://172.17.19.25:8080/dvp_app/programs/"
      );
      setProgramData(getProgramData);
      setProgramOption(getProgramData?.data);
      console.log(getProgramData, "getProgramData ");
    } catch (error) {
      console.log(error);
    }
  };

  const subjectsRequest = async () => {
    try {
      const data = {
        prog_level_id: selectedProgramLevel,
        prog_id: selectedProgram,
        semester_id: selectedSemesterName,
        subject_name: subjectName,
        subject_code: subjectCode,
      };
      const config = {
        method: "POST",
        url: `http://172.17.19.25:8080/dvp_app/subjects/`,
        data,
      };

      const subjectData = await axios(config);
      console.log(subjectData, "subjectData ");
      Swal.fire({
        icon: "success",
        title: `Subject  ${subjectData?.data?.subject_name} added successfully`,
        showConfirmButton: false,
        timer: 3000,
      });
      getSubjects();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response?.data?.message[0]}`,
      });
      console.error(error);
    }
  };

  const getSubjects = async () => {
    try {
      const getSubjectData = await axios.get(
        "http://172.17.19.25:8080/dvp_app/subjects/"
      );
      setSubjectData(getSubjectData);
      console.log(getSubjectData, "getSubjectData ");
    } catch (error) {
      console.log(error);
    }
  };
  //   get role

  const monthOptionsStart = [
    { value: "Jan", label: "Jan" },
    { value: "Feb", label: "Feb" },
    { value: "Mar", label: "Mar" },
    { value: "Apr", label: "Apr" },
    { value: "May", label: "May" },
    { value: "Jun", label: "Jun" },
    { value: "Jul", label: "Jul" },
    { value: "Aug", label: "Aug" },
    { value: "Sep", label: "Sep" },
    { value: "Oct", label: "Oct" },
    { value: "Nov", label: "Nov" },
    { value: "Dec", label: "Dec" },
  ];

  const monthOptionsEnd = [
    { value: "Jan", label: "Jan" },
    { value: "Feb", label: "Feb" },
    { value: "Mar", label: "Mar" },
    { value: "Apr", label: "Apr" },
    { value: "May", label: "May" },
    { value: "Jun", label: "Jun" },
    { value: "Jul", label: "Jul" },
    { value: "Aug", label: "Aug" },
    { value: "Sep", label: "Sep" },
    { value: "Oct", label: "Oct" },
    { value: "Nov", label: "Nov" },
    { value: "Dec", label: "Dec" },
  ];

  const handleSession = async (e) => {
    e.preventDefault();
    await sessionRequest();
  };

  const handleSelectEndMonth = (value) => {
    setEndMonth(value);
  };

  const handleSelectStartMonth = (value) => {
    setStartMonth(value);
  };

  const handlePL = async (e) => {
    e.preventDefault();
    await programLevelRequest();
  };

  const handleProgramLevel = (value) => {
    setSelectedProgramLevel(value);
  };

  const handleSem = async (e) => {
    e.preventDefault();
    await semesterRequest();
  };
  const handleProgram = async (e) => {
    e.preventDefault();
    await programRequest();
  };

  const handleProgramName = (value) => {
    setSelectedProgram(value);
  };
  const handleSemesterName = (value) => {
    setSelectedSemesterName(value);
  };

  const handleSubject = async (e) => {
    e.preventDefault();
    await subjectsRequest();
  };

  useEffect(() => {
    getSessionData();
    getProgramLevel();
    getSemesterTable();
    getProgram();
    getSubjects();
  }, []);

  useEffect(() => {
    if (selectedProgramLevel) {
      getSemester(selectedProgramLevel);
    }
  }, [selectedProgramLevel]);

  const handleEditSession = async (ti) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Session",
      html: `
      <input id="swal-input1" class="swal2-input" placeholder="Start Year" value="${
        ti.start_year
      }">
      <input id="swal-input2" class="swal2-input" placeholder="End Year" value="${
        ti.end_year
      }">
      
      <select id="swal-input3" class="swal2-input">
        <option value="Jan" ${
          ti.start_month === "Jan" ? "selected" : ""
        }>Jan</option>
        <option value="Feb" ${
          ti.start_month === "Feb" ? "selected" : ""
        }>February</option>
        <option value="Mar" ${
          ti.start_month === "Mar" ? "selected" : ""
        }>March</option>
        <option value="Apr" ${
          ti.start_month === "Apr" ? "selected" : ""
        }>April</option>
        <option value="May" ${
          ti.start_month === "May" ? "selected" : ""
        }>May</option>
        <option value="Jun" ${
          ti.start_month === "Jun" ? "selected" : ""
        }>June</option>
        <option value="Jul" ${
          ti.start_month === "Jul" ? "selected" : ""
        }>July</option>
        <option value="Aug" ${
          ti.start_month === "Aug" ? "selected" : ""
        }>August</option>
        <option value="Sep" ${
          ti.start_month === "Sep" ? "selected" : ""
        }>September</option>
        <option value="Oct" ${
          ti.start_month === "Oct" ? "selected" : ""
        }>October</option>
        <option value="Nov" ${
          ti.start_month === "Nov" ? "selected" : ""
        }>November</option>
        <option value="Dec" ${
          ti.start_month === "Dec" ? "selected" : ""
        }>December</option>
      </select>
      
      <select id="swal-input4" class="swal2-input">
        <option value="Jan" ${
          ti.end_month === "Jan" ? "selected" : ""
        }>Jan</option>
        <option value="Feb" ${
          ti.end_month === "Feb" ? "selected" : ""
        }>February</option>
        <option value="Mar" ${
          ti.end_month === "Mar" ? "selected" : ""
        }>March</option>
        <option value="Apr" ${
          ti.end_month === "Apr" ? "selected" : ""
        }>April</option>
        <option value="May" ${
          ti.end_month === "May" ? "selected" : ""
        }>May</option>
        <option value="Jun" ${
          ti.end_month === "Jun" ? "selected" : ""
        }>June</option>
        <option value="Jul" ${
          ti.end_month === "Jul" ? "selected" : ""
        }>July</option>
        <option value="Aug" ${
          ti.end_month === "Aug" ? "selected" : ""
        }>August</option>
        <option value="Sep" ${
          ti.end_month === "Sep" ? "selected" : ""
        }>September</option>
        <option value="Oct" ${
          ti.end_month === "Oct" ? "selected" : ""
        }>October</option>
        <option value="Nov" ${
          ti.end_month === "Nov" ? "selected" : ""
        }>November</option>
        <option value="Dec" ${
          ti.end_month === "Dec" ? "selected" : ""
        }>December</option>
      </select>
    `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          start_year: document.getElementById("swal-input1").value,
          end_year: document.getElementById("swal-input2").value,
          start_month: document.getElementById("swal-input3").value,
          end_month: document.getElementById("swal-input4").value,
        };
      },
    });

    if (formValues) {
      try {
        const config = {
          method: "PUT",
          url: `http://172.17.19.25:8080/dvp_app/sessions/${ti.session_code}/`,
          data: formValues,
        };

        const response = await axios(config);
        Swal.fire({
          icon: "success",
          title: `Session ${response?.data?.session_code} updated successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        getSessionData(); // Refresh the role data after editing a role
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message[0] || "An error occurred",
        });
        console.error(error);
      }
    }
  };

  const handleEditPL = async (ti) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Program Level",
      html: `
      <input id="swal-input1" class="swal2-input" placeholder="Program Level Name" value="${
        ti.prog_level_name
      }">
      <select id="swal-input2" class="swal2-input">
        <option value="active" ${
          ti.prog_status === "active" ? "selected" : ""
        }>Active</option>
        <option value="inactive" ${
          ti.prog_status === "inactive" ? "selected" : ""
        }>Inactive</option>
      </select>
    `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          prog_level_name: document.getElementById("swal-input1").value,
          prog_status: document.getElementById("swal-input2").value,
        };
      },
    });

    if (formValues) {
      try {
        const config = {
          method: "PUT",
          url: `http://172.17.19.25:8080/dvp_app/program_levels/${ti.prog_level_id}/`,
          data: formValues,
        };

        const response = await axios(config);
        Swal.fire({
          icon: "success",
          title: `Program Level ${response?.data?.prog_level_name} updated successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        getProgramLevel(); // Refresh the role data after editing a role
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message[0] || "An error occurred",
        });
        console.error(error);
      }
    }
  };

  const handleEditSemester = async (ti) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Semester",
      html: `
      <input id="swal-input1" class="swal2-input" placeholder="Semester Name" value="${
        ti.semester_name
      }">
      <select id="swal-input2" class="swal2-input">
        <option value="1" ${
          ti.prog_level_id === "UG" ? "selected" : ""
        }>UG</option>
        <option value="2" ${
          ti.prog_level_id === "PG" ? "selected" : ""
        }>PG</option>
      </select>
    `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          semester_name: document.getElementById("swal-input1").value,
          prog_level_id: document.getElementById("swal-input2").value,
        };
      },
    });

    if (formValues) {
      try {
        const config = {
          method: "PUT",
          url: `http://172.17.19.25:8080/dvp_app/semesters/${ti.semester_id}/`,
          data: formValues,
        };

        const response = await axios(config);
        Swal.fire({
          icon: "success",
          title: `Semester ${response?.data?.semester_name} updated successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        getSemesterTable(); // Refresh the role data after editing a role
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message[0] || "An error occurred",
        });
        console.log(error);
      }
    }
  };

  const handleEditProgram = async (ti) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Program",
      html: `
      <input id="swal-input1" class="swal2-input" placeholder="Program Name" value="${
        ti.program_name
      }">
      <input id="swal-input2" class="swal2-input" placeholder="Program Code" value="${
        ti.program_code
      }">
       <select id="swal-input3" class="swal2-input">
        <option value="1" ${
          ti.program_level_name === "UG" ? "selected" : ""
        }>UG</option>
        <option value="2" ${
          ti.program_level_name === "PG" ? "selected" : ""
        }>PG</option>
      </select>
      
    `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          program_name: document.getElementById("swal-input1").value,
          program_code: document.getElementById("swal-input2").value,
          program_level_name: document.getElementById("swal-input3").value,
        };
      },
    });

    if (formValues) {
      try {
        const config = {
          method: "PUT",
          url: `http://172.17.19.25:8080/dvp_app/programs/${ti.program_id}/`,
          data: formValues,
        };

        const response = await axios(config);
        Swal.fire({
          icon: "success",
          title: `Program ${response?.data?.program_name} updated successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        getProgram(); // Refresh the role data after editing a role
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message[0] || "An error occurred",
        });
        console.error(error);
      }
    }
  };

  const handleEditSubject = async (ti) => {
    let programs = [];
    let semesters = [];
    let progIds = [];

    try {
      // Fetch the program data from the API
      const programResponse = await axios.get(
        "http://172.17.19.25:8080/dvp_app/programs/"
      );
      programs = programResponse.data;

      // Fetch the semester data from the API
      const semesterResponse = await axios.get(
        "http://172.17.19.25:8080/dvp_app/semesters/"
      );
      semesters = semesterResponse.data;

      // Fetch the prog_id data from the API
      const progIdResponse = await axios.get(
        "http://172.17.19.25:8080/dvp_app/program_levels/"
      );
      progIds = progIdResponse.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch data",
      });
      console.error("Error fetching data:", error);
      return;
    }

    // Create options for the program_name dropdown
    const programOptions = programs
      .map(
        (program) =>
          `<option value="${program.program_code}" ${
            ti.program_name === program.program_name ? "selected" : ""
          }>${program.program_name}</option>`
      )
      .join("");

    // Create options for the semester_id dropdown
    const semesterOptions = semesters
      .map(
        (semester) =>
          `<option value="${semester.semester_id}" ${
            ti.semester_id === semester.semester_id ? "selected" : ""
          }>${semester.semester_name}</option>`
      )
      .join("");

    // Create options for the prog_id dropdown
    // const progIdOptions = progIds
    //   .map(
    //     (progId) =>
    //       `<option value="${progId.prog_id}" ${
    //         ti.prog_id === progId.prog_id ? "selected" : ""
    //       }>${progId.prog_name}</option>`
    //   )
    //   .join("");

    // Create options for the prog_id dropdown
    const progIdOptions = progIds
      .map(
        (progId) =>
          `<option value="${progId.prog_id}" ${
            ti.prog_id === progId.prog_id ? "selected" : ""
          }>${progId.prog_name}</option>`
      )
      .join("");

    const { value: formValues } = await Swal.fire({
      title: "Edit Subject",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Course Code" value="${
          ti.subject_code
        }">
        <input id="swal-input2" class="swal2-input" placeholder="Course Name" value="${
          ti.subject_name
        }">
        <select id="swal-input3" class="swal2-input">
          <option value="UG" ${
            ti.prog_level_name === "UG" ? "selected" : ""
          }>UG</option>
          <option value="PG" ${
            ti.prog_level_name === "PG" ? "selected" : ""
          }>PG</option>
        </select>
        <select id="swal-input4" class="swal2-input">
          ${programOptions}
        </select>
        <select id="swal-input5" class="swal2-input">
          ${semesterOptions}
        </select>
        <select id="swal-input6" class="swal2-input">
          ${progIdOptions}
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          subject_code: document.getElementById("swal-input1").value,
          subject_name: document.getElementById("swal-input2").value,
          prog_level_name: document.getElementById("swal-input3").value,
          program_name: document.getElementById("swal-input4").value,
          semester_id: document.getElementById("swal-input5").value,
          prog_id: parseInt(document.getElementById("swal-input6").value), // Ensure prog_id is an integer
        };
      },
    });

    if (formValues) {
      try {
        const config = {
          method: "PUT",
          url: `http://172.17.19.25:8080/dvp_app/subjects/${ti.subject_id}/`,
          data: formValues,
        };

        const response = await axios(config);
        Swal.fire({
          icon: "success",
          title: `Subject ${response?.data?.subject_name} updated successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        getSubjects(); // Refresh the subject data after editing
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.response?.data?.message[0] || "An error occurred",
        });
        console.error(error);
      }
    }
  };
  // delete session

  const handleDeleteSession = async (emp) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const config = {
          method: "DELETE",
          url: `http://172.17.19.25:8080/dvp_app/sessions/${emp.session_code}`,
        };

        await axios(config);
        Swal.fire({
          icon: "success",
          title: `Employee Type ${emp.session_code} deleted successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        getSessionData(); // Refresh the role data after deleting a role
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error?.response?.data?.message[0]}`,
        });
        console.error(error);
      }
    }
  };

  // delete PL
  const handleDeletePL = async (emp) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const config = {
          method: "DELETE",
          url: `http://172.17.19.25:8080/dvp_app/program_levels/${emp.prog_level_id}`,
        };

        await axios(config);
        Swal.fire({
          icon: "success",
          title: `Employee Type ${emp.prog_level_id} deleted successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        getProgramLevel(); // Refresh the role data after deleting a role
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error?.response?.data?.message[0]}`,
        });
        console.error(error);
      }
    }
  };

  // delete Semester
  const handleDeleteSemester = async (emp) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const config = {
          method: "DELETE",
          url: `http://172.17.19.25:8080/dvp_app/semesters/${emp.semester_id}`,
        };

        await axios(config);
        Swal.fire({
          icon: "success",
          title: `Semester ${emp.semester_name} deleted successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        getSemesterTable(); // Refresh the role data after deleting a role
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error?.response?.data?.message[0]}`,
        });
        console.error(error);
      }
    }
  };

  // delete Semester
  const handleDeleteProgramName = async (emp) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const config = {
          method: "DELETE",
          url: `http://172.17.19.25:8080/dvp_app/programs/${emp.program_id}`,
        };

        await axios(config);
        Swal.fire({
          icon: "success",
          title: `Employee Type ${emp.program_id} deleted successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        getProgram(); // Refresh the role data after deleting a role
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error?.response?.data?.message[0]}`,
        });
        console.error(error);
      }
    }
  };

  // delete Semester
  const handleDeleteSubjects = async (emp) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const config = {
          method: "DELETE",
          url: `/dvp_app/subjects/${emp.subject_id}`,
        };

        await axios(config);
        Swal.fire({
          icon: "success",
          title: `Subject  ${emp.subject_id} deleted successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        getSubjects(); // Refresh the role data after deleting a role
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error?.response?.data?.message[0]}`,
        });
        console.error(error);
      }
    }
  };
  const handleCheckboxChange = (item) => {
    setSelectedSession(item);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    if (selectedSession) {
      try {
        const response = await axios.post(
          "http://172.17.19.25:8080/dvp_app/current_session/",
          {
            session_code: selectedSession.session_code,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        message.success("Session activation success");
        setCheckboxState((prevState) => ({
          ...prevState,
          [selectedSession.session_code]: true,
        }));
      } catch (error) {
        message.warning("Error activating session", error);
      }
    }
    setSelectedSession(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedSession(null);
  };

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ display: "flex" }} className="production">
        <div className="flex-container-wrapper">
          <div>
            <h1>Course Settings</h1>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div
                style={{ width: "70vw" }}
                className="accordion"
                id="accordionExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      style={{ background: "#001529" }}
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div
                        style={{
                          width: "70vw",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ color: "white" }}>
                          {" "}
                          Session <BsArrowRight />
                        </div>

                        <div style={{ color: "white" }}>
                          Total Session {sessionData?.data?.length}
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <form class="row g-8 needs-validation">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item label="Start Year">
                              <Input
                                value={startYear}
                                onChange={(e) => setStartYear(e.target.value)}
                                placeholder="Start Year"
                              />
                            </Form.Item>
                            <Form.Item label="Start Month">
                              <Select
                                value={startMonth}
                                onChange={handleSelectStartMonth}
                                placeholder="Start Month"
                                style={{ width: "100%" }}
                              >
                                {monthOptionsStart.map((month) => (
                                  <Option key={month.value} value={month.value}>
                                    {month.label}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item label="End Year">
                              <Input
                                value={endYear}
                                onChange={(e) => setEndYear(e.target.value)}
                                placeholder="End Year"
                              />
                            </Form.Item>
                            <Form.Item label="End Month">
                              <Select
                                value={endMonth}
                                onChange={handleSelectEndMonth}
                                placeholder="End Month"
                                style={{ width: "100%" }}
                              >
                                {monthOptionsEnd.map((month) => (
                                  <Option key={month.value} value={month.value}>
                                    {month.label}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                          class="col-10"
                        >
                          <button
                            onClick={handleSession}
                            style={{ background: "#18123b", width: "300px" }}
                            class="btn btn-primary"
                            type="submit"
                          >
                            Add Session
                          </button>
                        </div>
                      </form>

                      <hr />
                      <strong>View Session</strong>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Session Code</th>
                            <th scope="col">Start Year</th>
                            <th scope="col">Start Month</th>
                            <th scope="col">End Year</th>
                            <th scope="col">End Month</th>
                          </tr>
                        </thead>
                        <tbody
                          style={{ height: "300px", overflow: "auto" }}
                          className="table-group-divider"
                        >
                          {sessionData &&
                            sessionData?.data?.map((item, index) => (
                              <>
                                <tr key={item?.role_id}>
                                  <td>{index + 1}</td>
                                  <td>{item?.session_code}</td>
                                  <td>{item?.start_year}</td>
                                  <td>
                                    {item?.start_month == "01"
                                      ? "January"
                                      : "July"}
                                  </td>
                                  <td>
                                    {item?.end_month == "05"
                                      ? "May"
                                      : "December"}
                                  </td>
                                  <td>{item?.end_year}</td>
                                  <td>
                                    <Button
                                      onClick={() => handleEditSession(item)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      onClick={() => handleDeleteSession(item)}
                                      danger
                                    >
                                      Delete
                                    </Button>
                                    <Radio
                                      checked={
                                        checkboxState[item.session_code] ||
                                        false
                                      }
                                      onChange={() =>
                                        handleCheckboxChange(item)
                                      }
                                    >
                                      Activate
                                    </Radio>
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                      <Modal
                        title="Confirmation"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <p>
                          Are you sure you want to make this session active?
                        </p>
                      </Modal>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      style={{ background: "#001529" }}
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <div
                        style={{
                          width: "70vw",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ color: "white" }}>
                          Program Level <BsArrowRight />
                        </div>

                        <div style={{ color: "white" }}>
                          Total Program {PLDATA?.data?.length}
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>Add Program Level</strong>
                      <form class="row g-3 needs-validation">
                        <div class="col-md-4">
                          <label for="validationCustom01" class="form-label">
                            Program Level Name
                          </label>
                          <input
                            value={programLevel}
                            onChange={(e) => setProgramLevel(e.target.value)}
                            type="text"
                            class="form-control"
                            id="validationCustom01"
                            required
                            placeholder="Program Level Name"
                          />
                          <div class="valid-feedback">Looks good!</div>
                        </div>

                        <div class="col-md-3">
                          <label for="validationCustom04" class="form-label">
                            Status
                          </label>
                          <select
                            value={programStatus}
                            onChange={(e) => setProgramStatus(e.target.value)}
                            class="form-select"
                            id="validationCustom04"
                            required
                            placeholder="Select Status"
                          >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>

                        <div class="col-10">
                          <button
                            style={{ background: "#18123b" }}
                            onClick={handlePL}
                            class="btn btn-primary"
                            type="submit"
                          >
                            Add Program Level
                          </button>
                        </div>
                      </form>
                      <hr />
                      <strong>View Title</strong>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Program Level Name</th>

                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody
                          style={{ height: "300px", overflow: "auto" }}
                          className="table-group-divider"
                        >
                          {PLDATA &&
                            PLDATA?.data?.map((item, index) => (
                              <>
                                <tr key={item?.title_id}>
                                  <td>{index + 1}</td>
                                  <td>{item?.prog_level_name}</td>

                                  <td>{item?.prog_status}</td>
                                  <td>
                                    <Button onClick={() => handleEditPL(item)}>
                                      Edit
                                    </Button>{" "}
                                    <Button
                                      onClick={() => handleDeletePL(item)}
                                      danger
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      style={{ background: "#001529" }}
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <div
                        style={{
                          width: "70vw",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ color: "white" }}>
                          Semester <BsArrowRight />
                        </div>

                        <div style={{ color: "white" }}>
                          Total Semester {semesterData?.data?.length}
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>Add Semester </strong>
                      <form class="row g-3 needs-validation">
                        <div class="col-md-4">
                          <label for="validationCustom01" class="form-label">
                            Semester Name
                          </label>
                          <input
                            value={semesterName}
                            onChange={(e) => setSemesterName(e.target.value)}
                            type="number"
                            class="form-control"
                            id="validationCustom01"
                            required
                            placeholder="Semester Name"
                          />
                          <div class="valid-feedback">Looks good!</div>
                        </div>

                        <div class="col-md-3">
                          <label for="validationCustom04" class="form-label">
                            Program Level Name
                          </label>

                          <Select
                            value={selectedProgramLevel}
                            onChange={handleProgramLevel}
                            style={{ width: "100%" }}
                          >
                            {programLevelOption &&
                              programLevelOption.map((item) => (
                                <Option
                                  key={item.prog_level_id}
                                  value={item.prog_level_id}
                                >
                                  {item.prog_level_name}
                                </Option>
                              ))}
                          </Select>
                        </div>

                        <div class="col-10">
                          <button
                            style={{ background: "#18123b" }}
                            onClick={handleSem}
                            class="btn btn-primary"
                            type="submit"
                          >
                            Add Semester
                          </button>
                        </div>
                      </form>
                      <hr />
                      <strong>View Semester</strong>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Semester </th>

                            <th scope="col">Program Level Name</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody
                          style={{ height: "300px", overflow: "auto" }}
                          className="table-group-divider"
                        >
                          {semesterData &&
                            semesterData?.data?.map((item, index) => (
                              <>
                                <tr key={item?.title_id}>
                                  <td>{index + 1}</td>
                                  <td>{item?.semester_name}</td>

                                  <td>{item?.prog_level_name}</td>
                                  <td>
                                    <Button
                                      onClick={() => handleEditSemester(item)}
                                    >
                                      Edit
                                    </Button>{" "}
                                    <Button
                                      onClick={() => handleDeleteSemester(item)}
                                      danger
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      style={{ background: "#001529" }}
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      <div
                        style={{
                          width: "70vw",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ color: "white" }}>
                          Program Name <BsArrowRight />
                        </div>

                        <div style={{ color: "white" }}>
                          Total Program {semesterData?.data?.length}
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>Add Program </strong>
                      <form class="row g-3 needs-validation">
                        <div class="col-md-3">
                          <label for="validationCustom04" class="form-label">
                            Program Level Name
                          </label>

                          <Select
                            value={selectedProgramLevel}
                            onChange={handleProgramLevel}
                            style={{ width: "100%" }}
                          >
                            {programLevelOption &&
                              programLevelOption.map((item) => (
                                <Option
                                  key={item.prog_level_id}
                                  value={item.prog_level_id}
                                >
                                  {item.prog_level_name}
                                </Option>
                              ))}
                          </Select>
                        </div>

                        <div class="col-md-4">
                          <label for="validationCustom01" class="form-label">
                            Program Name
                          </label>
                          <input
                            value={programName}
                            onChange={(e) => setProgramName(e.target.value)}
                            type="text"
                            class="form-control"
                            id="validationCustom01"
                            required
                            placeholder="Program Name"
                          />
                          <div class="valid-feedback">Looks good!</div>
                        </div>

                        <div class="col-md-4">
                          <label for="validationCustom01" class="form-label">
                            Program Code
                          </label>
                          <input
                            value={programCode}
                            onChange={(e) => setProgramCode(e.target.value)}
                            type="text"
                            class="form-control"
                            id="validationCustom01"
                            required
                            placeholder="Program Code"
                          />
                          <div class="valid-feedback">Looks good!</div>
                        </div>

                        <div class="col-md-3">
                          <label for="validationCustom04" class="form-label">
                            Status
                          </label>
                          <select
                            value={programStats}
                            onChange={(e) => setProgramStats(e.target.value)}
                            class="form-select"
                            id="validationCustom04"
                            required
                            placeholder="Select Status"
                          >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>

                        <div class="col-10">
                          <button
                            style={{ background: "#18123b" }}
                            onClick={handleProgram}
                            class="btn btn-primary"
                            type="submit"
                          >
                            Add Program
                          </button>
                        </div>
                      </form>
                      <hr />
                      <strong>View Programs</strong>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Program Name </th>

                            <th scope="col">Program Level Name</th>
                            <th scope="col">Program Code</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody
                          style={{ height: "300px", overflow: "auto" }}
                          className="table-group-divider"
                        >
                          {programData &&
                            programData?.data?.map((item, index) => (
                              <>
                                <tr key={item?.title_id}>
                                  <td>{index + 1}</td>
                                  <td>{item?.program_name}</td>

                                  <td>{item?.program_level_name}</td>
                                  <td>{item?.program_code}</td>
                                  <td>
                                    <Button
                                      onClick={() => handleEditProgram(item)}
                                    >
                                      Edit
                                    </Button>{" "}
                                    <Button
                                      onClick={() =>
                                        handleDeleteProgramName(item)
                                      }
                                      danger
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      style={{ background: "#001529" }}
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      <div
                        style={{
                          width: "70vw",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ color: "white" }}>
                          Subject <BsArrowRight />
                        </div>

                        <div style={{ color: "white" }}>
                          Total Subjects {subjectData?.data?.length}
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <strong>Add Subject </strong>
                      <form class="row g-3 needs-validation">
                        <div class="col-md-3">
                          <label for="validationCustom04" class="form-label">
                            Program Level Name
                          </label>

                          <Select
                            value={selectedProgramLevel}
                            onChange={handleProgramLevel}
                            style={{ width: "100%" }}
                          >
                            {programLevelOption &&
                              programLevelOption.map((item) => (
                                <Option
                                  key={item.prog_level_id}
                                  value={item.prog_level_id}
                                >
                                  {item.prog_level_name}
                                </Option>
                              ))}
                          </Select>
                        </div>
                        <div class="col-md-3">
                          <label for="validationCustom04" class="form-label">
                            Program Name
                          </label>

                          <Select
                            value={selectedProgram}
                            onChange={handleProgramName}
                            style={{ width: "100%" }}
                          >
                            {programOption &&
                              programOption.map((item) => (
                                <Option
                                  key={item.program_id}
                                  value={item.program_id}
                                >
                                  {item.program_name}
                                </Option>
                              ))}
                          </Select>
                        </div>

                        <div class="col-md-4">
                          <label for="validationCustom04" class="form-label">
                            Semester Name
                          </label>

                          <Select
                            value={selectedSemesterName}
                            onChange={handleSemesterName}
                            style={{ width: "100%" }}
                          >
                            {semesterOption &&
                              semesterOption.map((item) => (
                                <Option
                                  key={item.semester_id}
                                  value={item.semester_id}
                                >
                                  {item.semester_name}
                                </Option>
                              ))}
                          </Select>
                          <div class="valid-feedback">Looks good!</div>
                        </div>

                        <div class="col-md-4">
                          <label for="validationCustom01" class="form-label">
                            Subject Name
                          </label>
                          <input
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            type="text"
                            class="form-control"
                            id="validationCustom01"
                            required
                            placeholder="Subject Name"
                          />
                          <div class="valid-feedback">Looks good!</div>
                        </div>

                        <div class="col-md-4">
                          <label for="validationCustom01" class="form-label">
                            Subject Code
                          </label>
                          <input
                            value={subjectCode}
                            onChange={(e) => setSubjectCode(e.target.value)}
                            type="text"
                            class="form-control"
                            id="validationCustom01"
                            required
                            placeholder="Subject Code"
                          />
                          <div class="valid-feedback">Looks good!</div>
                        </div>

                        <div class="col-10">
                          <button
                            style={{ background: "#18123b" }}
                            onClick={handleSubject}
                            class="btn btn-primary"
                            type="submit"
                          >
                            Add Subject
                          </button>
                        </div>
                      </form>
                      <hr />
                      <strong>View Subjects</strong>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Program Level Name </th>

                            <th scope="col">Program Name</th>
                            <th scope="col">Semester Name</th>
                            <th scope="col">Subject Name</th>
                            <th scope="col">Subject Code</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody
                          style={{ height: "300px", overflow: "auto" }}
                          className="table-group-divider"
                        >
                          {subjectData &&
                            subjectData?.data?.map((item, index) => (
                              <>
                                <tr key={item?.title_id}>
                                  <td>{index + 1}</td>
                                  <td>{item?.prog_level_name}</td>

                                  <td>{item?.program_name}</td>
                                  <td>{item?.semester_name}</td>
                                  <td>{item?.subject_name}</td>
                                  <td>{item?.subject_code}</td>
                                  <td>
                                    <Button
                                      onClick={() => handleEditSubject(item)}
                                    >
                                      Edit
                                    </Button>{" "}
                                    <Button
                                      onClick={() => handleDeleteSubjects(item)}
                                      danger
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CourseSettings;
