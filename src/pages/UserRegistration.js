import React, { useState, useEffect } from "react";
import "./UserRegistration.css";
import {
  Button,
  Drawer,
  Input,
  Select,
  message,
  Table,
  Modal,
  Form,
  DatePicker,
} from "antd";
import SideBar from "../components/Sidebar/SideBar";
import axios from "axios";
import Swal from "sweetalert2";
import { Option } from "antd/es/mentions";
import moment from "moment";

const UserRegistration = () => {
  const [open, setOpen] = useState(false);

  const [selectUserOption, setSelectUserOption] = useState([]);
  const [selectUserSelected, setSelectUserSelected] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [selectDesigOption, setSelectDesigOption] = useState([]);
  const [selectDesigSelected, setSelectDesigSelected] = useState([]);

  const [empTypeOption, setEmpTypeOption] = useState([]);
  const [empTypeSelecte, setEmpTypeSelect] = useState([]);

  const [titleOption, setTitleOption] = useState([]);
  const [titleSelected, setTitleSelected] = useState([]);

  const [fName, setFName] = useState("");
  const [mName, setMName] = useState("");
  const [lName, setLName] = useState("");

  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");

  const [empCode, setEmpCode] = useState("");

  const [empData, setEmpData] = useState([]);

  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const [form] = Form.useForm();

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingUser(record);
    setEditingUser(record);
    form.setFieldsValue({
      user_id: record.user_id,
      emp_type_id: record.emp_type_id,
      emp_code: record.emp_code,
      desig_id: record.desig_id,
      title_id: record.title_id,
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      date_of_birth: record.dob,
      date_of_joining: record.doj,
    });
  };

  const handleDelete = (employee_id) => {
    setIsDeleting(true);
    setDeletingUserId(employee_id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`
          http://172.17.19.25:8080/dvp_app/employee_registration/${deletingUserId}/`);
      message.success("User deleted successfully");
      getEmployeeData();
    } catch (error) {
      console.error("Failed to delete user:", error);
      message.error("Failed to delete user");
    } finally {
      setIsDeleting(false);
      setDeletingUserId(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setDeletingUserId(null);
  };

  // const saveEdit = async () => {
  //   const formData = {
  //     user_id: parseFloat(selectedUserId),
  //     emp_type_id: parseInt(empTypeSelecte),
  //     emp_code: empCode,
  //     desig_id: parseInt(selectDesigSelected),
  //     title_id: parseInt(titleSelected),
  //     first_name: fName,
  //     middle_name: mName || "",
  //     last_name: lName || "",
  //     date_of_birth: dob,
  //     date_of_joining: doj,
  //   };
  //   try {
  //     await axios.patch(
  //       `http://172.17.19.25:8080/dvp_app/employee_registration/${editingUser.id}`,
  //       form.getFieldsValue()
  //     );
  //     message.success("User updated successfully");
  //     fetchUsers();
  //     setIsEditing(false);
  //     setEditingUser(null);
  //   } catch (error) {
  //     console.error("Failed to update user:", error);
  //     message.error("Failed to update user");
  //   }
  // };

  const saveEdit = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      await axios.put(
        `http://172.17.19.25:8080/dvp_app/employee_registration/${editingUser.employee_id}/`,
        values
      );
      message.success("User updated successfully");
      getEmployeeData()
      setIsEditing(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Failed to update user:", error);
      message.error("Failed to update user");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const getUser = async () => {
    const getUserData = await axios(
      `http://172.17.19.25:8080/dvp_app/select_user/`
    );
    console.log(getUserData, "UUUUUUUUUUUUUUUUUUUUU");
    setSelectUserOption(getUserData);
  };

  const getDesignation = async () => {
    const getDesigData = await axios(
      `http://172.17.19.25:8080/dvp_app/designation/`
    );
    setSelectDesigOption(getDesigData);
  };

  const getTitle = async () => {
    const getTitleData = await axios(`http://172.17.19.25:8080/dvp_app/title/`);
    setTitleOption(getTitleData);
  };

  const getEmpType = async () => {
    const getEmpTypeData = await axios(
      `http://172.17.19.25:8080/dvp_app/employee_type/`
    );
    setEmpTypeOption(getEmpTypeData);
  };

  useEffect(() => {
    getUser();
    getDesignation();
    getTitle();
    getEmpType();
  }, []);

  const handleUser = (value) => {
    const selectedUser = selectUserOption?.data?.find(
      (user) => user.user_id === value
    );
    setSelectUserSelected(value);
    setSelectedUserId(selectedUser ? selectedUser.user_id : "");
  };

  const handleDesigna = (value) => {
    setSelectDesigSelected(value);
  };

  const handleTitle = (value) => {
    setTitleSelected(value);
  };

  const handleEmpType = (value) => {
    setEmpTypeSelect(value);
  };

  const getEmployeeData = async () => {
    const req = await axios.get(
      `http://172.17.19.25:8080/dvp_app/employee_registration/`
    );
    setEmpData(req.data);
  };

  const empRegistration = async () => {
    try {
      let data = {
        user_id: parseFloat(selectedUserId),
        emp_type_id: parseInt(empTypeSelecte),
        emp_code: empCode,
        desig_id: parseInt(selectDesigSelected),
        title_id: parseInt(titleSelected),
        first_name: fName,
        middle_name: mName || "",
        last_name: lName || "",
        date_of_birth: dob,
        date_of_joining: doj,
      };

      let config = {
        method: "POST",
        url: `http://172.17.19.25:8080/dvp_app/employee_registration/`,
        data,
      };

      const request = await axios(config);

      Swal.fire({
        icon: "success",
        title: `${request?.data?.first_name}${request?.data?.last_name} is Registered Successfully`,
        showConfirmButton: false,
        timer: 3000,
      });
      setDob("");
      setDoj("");
      setEmpCode("");
      setFName("");
      setLName("");
      setMName("");
      // setTitleSelected("");
      setEmpCode("");
      // selectUserSelected("");
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: `${error?.response?.data?.message[0]} `,
        showConfirmButton: false,
        timer: 3000,
      });
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    empRegistration();
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Define table columns
  const columns = [
    { title: "Employee ID", dataIndex: "employee_id", key: "employee_id" },
    { title: "Employee Code", dataIndex: "emp_code", key: "emp_code" },
    { title: "First Name", dataIndex: "first_name", key: "first_name" },
    { title: "Middle Name", dataIndex: "middle_name", key: "middle_name" },
    { title: "Last Name", dataIndex: "last_name", key: "last_name" },
    {
      title: "Date of Birth",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
    },
    {
      title: "Date of Joining",
      dataIndex: "date_of_joining",
      key: "date_of_joining",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.employee_id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ display: "flex" }} className="production">
          <div className="flex-container-wrapper">
            <div>
              <div className="container">
                <div className="title">
                  <div>
                    <p className="title-heading">Employee Registration Form</p>
                  </div>
                  <div style={{ padding: "10px" }}>
                    <Button
                      primary
                      onClick={showDrawer}
                      style={{ fontSize: "15px", cursor: "pointer" }}
                      className="title-heading"
                    >
                      Total Employee : {empData.length}
                    </Button>
                  </div>
                </div>

                <Drawer
                  width={900}
                  title="Employee Table"
                  onClose={onClose}
                  open={open}
                >
                  {/* Table to display employee data */}
                  <Table
                    dataSource={empData}
                    columns={columns}
                    rowKey="employee_id"
                  />
                </Drawer>

                <form onSubmit={handleSubmit} className="register-form">
                  <div className="form-row">
                    <label>
                      <p>
                        <span>Select User </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Select
                        value={selectUserSelected}
                        onChange={handleUser}
                        name="userType"
                        required
                      >
                        {selectUserOption?.data?.map((item) => (
                          <option key={item?.user_id} value={item?.user_id}>
                            {item?.full_name_with_email}
                          </option>
                        ))}
                      </Select>
                    </label>
                    <label style={{ display: "none" }}>
                      <p>
                        <span>User ID </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Input disabled type="text" value={selectedUserId} />
                    </label>
                    <label>
                      <p>
                        <span>Employee Type </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Select
                        value={empTypeSelecte}
                        onChange={handleEmpType}
                        name="userType"
                        required
                      >
                        {empTypeOption?.data?.map((item) => (
                          <option
                            key={item?.emp_type_id}
                            value={item?.emp_type_id}
                          >
                            {item?.emp_type_name}
                          </option>
                        ))}
                      </Select>
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      <p>
                        <span>Designation Name </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Select
                        value={selectDesigSelected}
                        onChange={handleDesigna}
                        name="desigId"
                        required
                      >
                        {selectDesigOption?.data?.map((item) => (
                          <option key={item?.desig_id} value={item?.desig_id}>
                            {item?.desig_name}
                          </option>
                        ))}
                      </Select>
                    </label>
                    <label>
                      <p>
                        <span>Employee Code Name </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Input
                        type="text"
                        name="userName"
                        value={empCode}
                        onChange={(e) => setEmpCode(e.target.value)}
                        placeholder="Designation Name"
                        required
                      />
                    </label>
                    <label>
                      <p>
                        <span>Title </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Select
                        value={titleSelected}
                        onChange={handleTitle}
                        name="desigId"
                        required
                      >
                        {titleOption?.data?.map((item) => (
                          <option key={item?.title_id} value={item?.title_id}>
                            {item?.title_name}
                          </option>
                        ))}
                      </Select>
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      <p>
                        <span>First Name </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Input
                        name="fName"
                        placeholder="First Name"
                        value={fName}
                        onChange={(e) => setFName(e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      <p>
                        <span>Middle Name </span>
                        {/* <span style={{ color: "red" }}>*</span> */}
                      </p>
                      <Input
                        name="mName"
                        placeholder="Middle Name"
                        value={mName}
                        onChange={(e) => setMName(e.target.value)}
                      />
                    </label>
                    <label>
                      <p>
                        <span>Last Name </span>
                        {/* <span style={{ color: "red" }}>*</span> */}
                      </p>
                      <Input
                        name="mlName"
                        placeholder="Last Name"
                        value={lName}
                        onChange={(e) => setLName(e.target.value)}
                        // required
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      <p>
                        <span>Date Of Birth </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      <p>
                        <span>Date Of Joining </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Input
                        type="date"
                        name="fdoj"
                        placeholder="Date of Joining"
                        value={doj}
                        onChange={(e) => setDoj(e.target.value)}
                        required
                      />
                    </label>
                  </div>

                  <button className="reg_btn" type="submit">
                    Submit
                  </button>
                </form>
                <Modal
                  title="Edit Employee Registration"
                  visible={isEditing}
                  onCancel={cancelEdit}
                  onOk={saveEdit}
                >
                  <Form form={form} layout="vertical">
                    <Form.Item
                      style={{ display: "none" }}
                      label="User ID"
                      name="user_id"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="Employee Code" name="emp_code">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="emp_type_id"
                      label="Employee Type"
                      rules={[{ required: true }]}
                    >
                      <Select
                        value={empTypeSelecte}
                        onChange={handleEmpType}
                        name="userType"
                        required
                      >
                        {empTypeOption?.data?.map((item) => (
                          <option
                            key={item?.emp_type_id}
                            value={item?.emp_type_id}
                          >
                            {item?.emp_type_name}
                          </option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="title_id"
                      label="Title"
                      rules={[{ required: true }]}
                    >
                      <Select
                        value={titleSelected}
                        onChange={handleTitle}
                        name="desigId"
                        required
                      >
                        {titleOption?.data?.map((item) => (
                          <option key={item?.title_id} value={item?.title_id}>
                            {item?.title_name}
                          </option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="desig_id"
                      label="Designation"
                      rules={[{ required: true }]}
                    >
                      <Select
                        value={selectDesigSelected}
                        onChange={handleDesigna}
                        name="desigId"
                        required
                      >
                        {selectDesigOption?.data?.map((item) => (
                          <option key={item?.desig_id} value={item?.desig_id}>
                            {item?.desig_name}
                          </option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label="First Name" name="first_name">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Middle Name" name="middle_name">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Last Name" name="last_name">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Date of Birth" name="date_of_birth">
                      <Input
                        type="date"
                        name="date_of_joining"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                      />
                    </Form.Item>
                    <Form.Item label="Date of Joining" name="date_of_joining">
                      <Input
                        type="date"
                        name="date_of_birth"
                        placeholder="Date of Joining"
                        value={doj}
                        onChange={(e) => setDoj(e.target.value)}
                        required
                      />
                    </Form.Item>
                  </Form>
                </Modal>

                <Modal
                  title="Confirm Delete"
                  visible={isDeleting}
                  onCancel={cancelDelete}
                  onOk={confirmDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <p>Are you sure you want to delete this user?</p>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;
