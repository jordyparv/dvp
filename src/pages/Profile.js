import React, { useEffect, useState } from "react";
import "./Profile.css";
import { Avatar, Badge, Calendar, Empty, List } from "antd";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import SideBar from "../components/Sidebar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/Slice/loginAction";
import {
  fetchEmployeeApi,
  fetchRoleApi,
  fetchUserApi,
} from "../redux/Slice/settingApiActions";
import Calender from "./Calender";
import {
  getApprovalStatus,
  getLesson,
  getScriptStatus,
} from "../protectedRouting/Utils/apiUtils";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import pending from "../assets/images/pending.gif";
import lesson from "../assets/images/lesson.png";
import go from "../assets/images/go.png";
import script from "../assets/images/script.png";
const { Option } = Select;

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [empIds, setEmpIds] = useState(null);
  const [employee_ids, setEmployee_ids] = useState(null);
  const [lessonPlanName, setLessonPlanName] = useState([]);
  const [lessonPlans, setLessonPlans] = useState(null);
  const [scriptStatus, setScriptStatus] = useState(null);

  const [lessonStatus, setLessonStatus] = useState([]);

  const [currentSession, setCurrentSession] = useState(null);

  const apiRoleDataRead = useSelector(
    (state) => state?.apiSettings?.roleApi?.data
  );
  const apiUserDataRead = useSelector(
    (state) => state?.apiSettings?.userApi?.data
  );
  const apiEmployeeDataRead = useSelector(
    (state) => state?.apiSettings?.employeeApi?.data
  );

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getProfile = localStorage.getItem("prod_cred");
  const profile = JSON.parse(getProfile);
  console.log(profile, "PPEPEPPE");

  useEffect(() => {
    const loginMessage = sessionStorage.getItem("loginMessage");
    if (loginMessage) {
      message.success(loginMessage);
      sessionStorage.removeItem("loginMessage");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUserApi());
    dispatch(fetchRoleApi());
    dispatch(fetchEmployeeApi());
  }, dispatch);

  const getuserId = JSON.parse(localStorage.getItem("prod_cred"));
  const userId = getuserId?.user_id;
  console.log(userId, "USER ID");

  const getLesson = async (employeeId) => {
    try {
      const response = await axios(
        `http://172.17.19.25:8080/dvp_app/lesson-plans/search/?employee_id=${employeeId}`
      );
      console.log(response?.data, "Lesson");
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getEmpId = async () => {
    try {
      const response = await axios(
        `http://172.17.19.25:8080/dvp_app/select_subject/?user_id=${userId}`
      );
      const employeeId = response?.data?.employee_id;
      const employeeIds = response?.data?.employee_id;
      setEmpIds(employeeId);
      setEmployee_ids(employeeIds);

      const lessonData = await getLesson(employeeId);
      const lessonStatus = await getApprovalStatus(employeeId);
      const scriptStatus = await getScriptStatus(employeeId);

      setLessonStatus(lessonStatus);
      setScriptStatus(scriptStatus);
      console.log(lessonStatus, "LESSON STATSU***************");
      setLessonPlanName(lessonData);

      setLessonPlans(lessonData);

      console.log(response, "(*&^%$%^&****************");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmpId();
    getSession();
  }, []);

  const getSession = async () => {
    try {
      const response = await axios(
        `http://172.17.19.25:8080/dvp_app/current_session/`
      );
      console.log(response?.data, "Session");
      setCurrentSession(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirect = () => {
    navigate("/view-lesson-plan");
  };
  const handleRedirectapprovalStatus = () => {
    navigate("/approval-status");
  };
  const handleRedirectScriptStatus = () => {
    navigate("/script-status");
  };

  return (
    <div style={{ display: "flex" }} classNameName="production">
      <SideBar />

      <div class="container">
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          class="main"
        >
          <h6>Current Session : {currentSession?.session_code}</h6>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            class="main-top"
          >
            <h4>
              Hi {profile?.user_name} - {profile?.role_names}
            </h4>
            <i class="fas fa-user-cog"></i>
          </div>

          {profile?.role_names[0] === "Admin" ? (
            <>
              {" "}
              <div class="main-skills">
                <div class="card">
                  <i class="fas fa-laptop-code"></i>
                  <h3> {apiEmployeeDataRead?.length}</h3>
                  <p> Employee </p>
                  <button>View Employees</button>
                </div>
                <div class="card">
                  <i class="fab fa-wordpress"></i>
                  <h3>{apiUserDataRead?.length}</h3>
                  <p> Users</p>
                  <button>View Users</button>
                </div>
                <div class="card">
                  <i class="fas fa-palette"></i>
                  <h3>{apiRoleDataRead?.length}</h3>
                  <p>View Roles.</p>
                  <button>View Roles</button>
                </div>
                <div class="card">
                  <i class="fab fa-app-store-ios"></i>
                  <h3>Lesson </h3>
                  <p>Pending lesson plan.</p>
                  <button>View Pendings </button>
                </div>
              </div>
            </>
          ) : null}

          {profile?.role_names[0] == "Admin" ? (
            <>
              {" "}
              {/* <div className="noti">
                <h5>Notification</h5>
                <div className="notification">
                  <div> 1 Lesson plan from Antra Maddan</div>
                  <div>
                    {" "}
                    <button className="approve">Approve</button>
                    <button className="view">View</button>
                    <button className="reject">Reject</button>
                  </div>
                </div>
                <div className="notification">
                  <div> 1 Lesson plan from Antra Maddan</div>
                  <div>
                    {" "}
                    <button className="approve">Approve</button>
                    <button className="view">View</button>
                    <button className="reject">Reject</button>
                  </div>
                </div>
                <div className="notification">
                  <div> 1 Lesson plan from Antra Maddan</div>
                  <div>
                    {" "}
                    <button className="approve">Approve</button>
                    <button className="view">View</button>
                    <button className="reject">Reject</button>
                  </div>
                </div>
                <div className="notification">
                  <div> 1 Lesson plan from Antra Maddan</div>
                  <div>
                    {" "}
                    <button className="approve">Approve</button>
                    <button className="view">View</button>
                    <button className="reject">Reject</button>
                  </div>
                </div>
              </div> */}
            </>
          ) : profile?.role_names[0] === "Teacher" ? (
            <div className="noti">
              <h5>
                Notification{" "}
                {lessonPlanName?.length > 0 ? lessonPlanName?.length : null}
              </h5>
              <div className="notification-wrapper">
                {lessonPlanName && lessonPlanName.length <= 0 ? (
                  <>
                    <Empty />
                  </>
                ) : (
                  lessonPlanName &&
                  lessonPlanName.map((item, index) => (
                    <>
                      <div key={item.subject_id} className="notification">
                        <div>
                          {index + 1} {item?.subject_name}{" "}
                        </div>
                        <div>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={handleRedirect}
                          >
                            <EyeOutlined />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: "-20px",
                          width: "55vw",
                          background: "#2A629A",
                          zIndex: "-99",
                          height: "50px",
                        }}
                        className="notification"
                      >
                        <div>
                          Sent to :{" "}
                          {item?.pc_details?.pc_name
                            ? item?.pc_details?.pc_name
                            : "Not Assigned"}
                        </div>

                        <div
                          className={
                            item?.status === "pending"
                              ? "pending"
                              : item?.status === "approved"
                              ? "approved"
                              : "reject"
                          }
                        >
                          Status :{" "}
                          {item?.status === "pending" ? (
                            <span>
                              Pending{" "}
                              <img style={{ width: "18px" }} src={pending} />
                            </span>
                          ) : item?.status === "approved" ? (
                            "Approved"
                          ) : item?.status === "rejected" ? (
                            "Rejected"
                          ) : (
                            item?.status
                          )}
                        </div>
                      </div>
                    </>
                  ))
                )}
              </div>
            </div>
          ) : profile?.role_names[0] === "Camera Person" ? (
            <>
              {" "}
              <div className="noti">
                <h4>Notification</h4>
                <div className="notification">
                  <div> Studio booking</div>
                  {/* <div>Sent for approval </div> */}
                  <div>
                    {" "}
                    <button className="approve">Approve</button>
                    {/* <button className="view">Re</button> */}
                    <button className="reject">Reject</button>
                  </div>
                </div>
              </div>
            </>
          ) : profile?.role_names[0] === "Program Coordinator" ? (
            <>
              {" "}
              <div className="notification-center">
                <div className="noti-left">
                  <div className="left-head">
                    <div>
                      <span style={{ display: "flex", padding: "7px" }}>
                        <img
                          style={{ width: "32px", marginRight: "12px" }}
                          src={lesson}
                        />
                        <h6 style={{ letterSpacing: "1px" }}>
                          Lesson Plan Approval Request
                        </h6>
                      </span>
                    </div>
                    <div>
                      {" "}
                      <Badge count={lessonStatus?.length}>
                        <Avatar shape="square" size="large" />
                      </Badge>
                    </div>
                  </div>

                  <div className="left-body">
                    <div>
                      <ul>
                        {lessonStatus &&
                          lessonStatus?.map((item) => (
                            <>
                              {" "}
                              <li onClick={handleRedirectapprovalStatus} style={{cursor:"pointer"}}>
                                <div>
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      marginRight: "5px",
                                    }}
                                  >
                                    {item?.subject_name.slice(0, 22)}
                                    {"..."} ({item?.subject_code})
                                  </span>{" "}
                                  <span style={{ marginRight: "5px" }}>
                                    from
                                  </span>
                                  <span style={{ fontWeight: "bold" }}>
                                    {item?.lesson_plans[0]?.employee_name?.slice(
                                      0,
                                      10
                                    )}
                                    {"..."}
                                    <img
                                      
                                      style={{
                                        width: "30px",
                                        marginLeft: "5px",
                                        cursor: "pointer",
                                      }}
                                      src={go}
                                    />
                                  </span>{" "}
                                  <hr style={{ width: "50%" }} />
                                </div>
                              </li>
                            </>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="noti-right">
                  <div className="left-head">
                    <div>
                      <span style={{ display: "flex", padding: "7px" }}>
                        <img
                          style={{ width: "32px", marginRight: "12px" }}
                          src={script}
                        />
                        <h6 style={{ letterSpacing: "1px" }}>
                          Script Approval Request
                        </h6>
                      </span>
                    </div>
                    <div>
                      {" "}
                      <Badge count={scriptStatus?.length}>
                        <Avatar shape="square" size="large" />
                      </Badge>
                    </div>
                  </div>

                  <div className="left-body">
                    <div>
                      <ul>
                        {scriptStatus &&
                          scriptStatus?.map((item) => (
                            <>
                              {" "}
                              <li onClick={handleRedirectScriptStatus} style={{cursor:"pointer"}}>
                                <div>
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      marginRight: "5px",
                                    }}
                                  >
                                    {item?.subject_name.slice(0, 22)}
                                    {"..."} ({item?.subject_code})
                                  </span>{" "}
                                  <span style={{ marginRight: "5px" }}>
                                    from
                                  </span>
                                  <span style={{ fontWeight: "bold" }}>
                                    {item?.employee_name.slice(0, 10)}
                                    {"..."}
                                    <img
                                      
                                      style={{
                                        width: "30px",
                                        marginLeft: "5px",
                                        
                                      }}
                                      src={go}
                                    />
                                  </span>{" "}
                                  <hr style={{ width: "50%" }} />
                                </div>
                              </li>
                            </>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {profile?.role_names[0] !== "Admin" ? (
            <>
              <div className="calender">
                {" "}
                <Calender />
              </div>
            </>
          ) : null}

          <section class="main-course">
            <h4>Studio</h4>
            <div class="course-box">
              <div class="course">
                <div class="box">
                  <h5>Studio 1</h5>
                  <p>80% - progress</p>
                  <button>continue</button>
                  <i class="fab fa-html5 html"></i>
                </div>
                <div class="box">
                  <h5>Studio 2</h5>
                  <p>50% - progress</p>
                  <button>continue</button>
                  <i class="fab fa-css3-alt css"></i>
                </div>
                <div class="box">
                  <h5>Studio 3</h5>
                  <p>30% - progress</p>
                  <button>continue</button>
                  <i class="fab fa-js-square js"></i>
                </div>
              </div>
            </div>
          </section>
        </section>
        <div className="flex-container-wrapper projcard-container">
          <div className="projcard projcard-red">
            <div className="projcard-innerbox">
              <img className="projcard-img" src="https://picsum.photos/200" />
              <div className="projcard-textbox">
                <div className="projcard-title">{profile?.user_name}</div>

                <div className="projcard-bar"></div>
                <div className="projcard-description">
                  <div className="profile-cards">
                    <div className="card-pro1">
                      <div>
                        <h3>Role</h3>
                      </div>
                      <div>
                        <p>{profile?.role_names}</p>
                      </div>
                    </div>
                    <div className="card-pro1">
                      {" "}
                      <div className="card-pro1">
                        <div>
                          <h3>Lesson </h3>
                        </div>
                        <div>
                          <p>View</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-pro1">
                      {" "}
                      <div className="card-pro1">
                        <div>
                          <h3>Profile</h3>
                        </div>
                        <div>
                          <p onClick={showDrawer}>Edit</p>
                        </div>
                        <Drawer
                          title="Profile Update"
                          width={720}
                          onClose={onClose}
                          open={open}
                          styles={{
                            body: {
                              paddingBottom: 80,
                            },
                          }}
                          extra={
                            <Space>
                              <Button onClick={onClose}>Cancel</Button>
                              <Button onClick={onClose} type="primary">
                                Submit
                              </Button>
                            </Space>
                          }
                        >
                          <Form layout="vertical" hideRequiredMark>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item
                                  name="name"
                                  label="Name"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter user name",
                                    },
                                  ]}
                                >
                                  <Input placeholder="Please enter user name" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  name="url"
                                  label="Url"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter url",
                                    },
                                  ]}
                                >
                                  <Input
                                    style={{
                                      width: "100%",
                                    }}
                                    addonBefore="http://"
                                    addonAfter=".com"
                                    placeholder="Please enter url"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item
                                  name="owner"
                                  label="Owner"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please select an owner",
                                    },
                                  ]}
                                >
                                  <Select placeholder="Please select an owner">
                                    <Option value="xiao">Xiaoxiao Fu</Option>
                                    <Option value="mao">Maomao Zhou</Option>
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  name="type"
                                  label="Type"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please choose the type",
                                    },
                                  ]}
                                >
                                  <Select placeholder="Please choose the type">
                                    <Option value="private">Private</Option>
                                    <Option value="public">Public</Option>
                                  </Select>
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item
                                  name="approver"
                                  label="Approver"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please choose the approver",
                                    },
                                  ]}
                                >
                                  <Select placeholder="Please choose the approver">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  name="dateTime"
                                  label="DateTime"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please choose the dateTime",
                                    },
                                  ]}
                                >
                                  <DatePicker.RangePicker
                                    style={{
                                      width: "100%",
                                    }}
                                    getPopupContainer={(trigger) =>
                                      trigger.parentElement
                                    }
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={24}>
                                <Form.Item
                                  name="description"
                                  label="Description"
                                  rules={[
                                    {
                                      required: true,
                                      message: "please enter url description",
                                    },
                                  ]}
                                >
                                  <Input.TextArea
                                    rows={4}
                                    placeholder="please enter url description"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form>
                        </Drawer>
                      </div>
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

export default Profile;
