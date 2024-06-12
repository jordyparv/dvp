import React, { useEffect, useState } from "react";
import "./Profile.css";

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
const { Option } = Select;

const Profile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState([]);

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

  useEffect(() => {
    const loginMessage = sessionStorage.getItem("loginMessage");
    if (loginMessage) {
      message.success(loginMessage);
      sessionStorage.removeItem("loginMessage");
    }
  }, []);

  const userLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("prod_cred");
    window.location.href = "/";
  };

  useEffect(() => {
    dispatch(fetchUserApi());
    dispatch(fetchRoleApi());
    dispatch(fetchEmployeeApi());
  }, dispatch);



  return (
    <div style={{ display: "flex" }} classNameName="production">
      <SideBar />

      <div class="container">
        <section class="main">
          <div class="main-top">
            <h1>Dashboard</h1>
            <i class="fas fa-user-cog"></i>
          </div>
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
          <section class="main-course">
            <h1>Studio</h1>
            <div class="course-box">
              
              <div class="course">
                <div class="box">
                  <h3>Studio 1</h3>
                  <p>80% - progress</p>
                  <button>continue</button>
                  <i class="fab fa-html5 html"></i>
                </div>
                <div class="box">
                  <h3>Studio 2</h3>
                  <p>50% - progress</p>
                  <button>continue</button>
                  <i class="fab fa-css3-alt css"></i>
                </div>
                <div class="box">
                  <h3>Studio 3</h3>
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
                      <p>{profile?.user_role_ids[0] ? "Admin" : "User"}</p>
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
