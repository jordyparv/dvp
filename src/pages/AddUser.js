import React, { useEffect, useState } from "react";
import "./AddUser.css";
import SideBar from "../components/Sidebar/SideBar";
import axios from "axios";
import { addUserSuccess } from "../redux/Slice/addUserSlice";
import { useDispatch } from "react-redux";
import { addUserAction } from "../redux/Slice/addUserAction";
import {
  Button,
  Card,
  Col,
  Drawer,
  Input,
  Select,
  Table,
  message,
  Modal,
} from "antd";

import Swal from "sweetalert2";
import { Option } from "antd/es/mentions";

const AddUser = () => {
  const [uniqueName, setUniqueName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [userGenderOption, setUserGenderOption] = useState("");
  const [userGenderSelected, setUserGenderSelected] = useState([]);

  const [userRoleOption, setUserRoleOption] = useState("");
  const [roleSelected, setRoleSelected] = useState([]);

  const [userDepartmentOption, setUserDepartmentOption] = useState("");
  const [userDepartmentSelected, setUserDepartmentSelected] = useState("");

  const [userMob, setUserMob] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const [userData, setUserData] = useState("");
  const [open, setOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const dispatch = useDispatch();

  // get department

  const departmentRequest = async () => {
    try {
      const getDepartment = await axios(
        "http://43.204.119.135/api/dvp_app/departments/"
      );

      //   setUserDepartment(getDepartment);
      setUserDepartmentOption(getDepartment);
      console.log(getDepartment, "LOOKDEP")
    } catch (error) {
      console.log(error, "DEPART ERRO");
    }
  };

  // get user role

  const userRoleRequest = async () => {
    try {
      const getUserRole = await axios(
        "http://43.204.119.135/api/dvp_app/roles/"
      );

      setUserRoleOption(getUserRole);
      console.log(getUserRole, "LOOK ROLE")
    } catch (error) {
      console.log(error, "Role ERRO");
    }
  };

  //get gender

  const userGenderReq = async () => {
    try {
      const getUserGender = await axios(
        "http://43.204.119.135/api/dvp_app/genders/"
      );

      setUserGenderOption(getUserGender);
      console.log(getUserGender, "LOOK GENDER")
    } catch (error) {
      console.log(error, "Gender ERRO");
    }
  };

  // get user table
  const userTable = async () => {
    try {
      const getUserData = await axios(
        "http://43.204.119.135/api/dvp_app/user_create/"
      );

      setUserData(getUserData);
      console.log(getUserData, "USER DATA");
    } catch (error) {
      console.log(error, "USER");
    }
  };

  useEffect(() => {
    departmentRequest();
    userRoleRequest();
    userGenderReq();
    userTable();
  }, []);

  const handleDepartment = (value) => {
    setUserDepartmentSelected(value);
  };
  const handleRole = (value) => {
    setRoleSelected(value);
  };
  const handleCountry = (value) => {
    setUserCountry(value);
  };
  const handleGender = (value) => {
    setUserGenderSelected(value);
  };
  const handleStatus = (value) => {
    setUserStatus(value);
  };

  const validateMobileNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    const allowedDomains = ["gmail", "yahoo", "mail", "cumail"]; // Add more domains if needed
    const domain = email.split("@")[1].split(".")[0].toLowerCase();
    return emailRegex.test(email) && allowedDomains.includes(domain);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(userEmail)) {
      message.warning(
        "Please enter a valid email address from allowed domains."
      );
      return;
    }

    const formData = {
      username: uniqueName,
      user_name: userName,
      user_email: userEmail,
      user_role: [roleSelected],
      gender: parseInt(userGenderSelected),
      user_mobile: `${userCountry}${userMob}`,
      department: userDepartmentSelected,
      status: userStatus,
      password: userPassword,
    };

    try {
      await axios.put(
        `http://43.204.119.135/api/dvp_app/user_table/${currentUser.id}/`,
        formData
      );
      message.success("User updated successfully!");
      userTable();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      message.error("Failed to update user.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateMobileNumber(userMob)) {
      message.warning("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!validateEmail(userEmail)) {
      message.warning(
        "Please enter a valid email address from allowed domains."
      );
      return;
    }

    const formData = {
      username: uniqueName,
      user_name: userName,
      user_email: userEmail,
      user_role: [roleSelected],
      gender: parseInt(userGenderSelected),
      user_mobile: `${userCountry}${userMob}`,
      department: userDepartmentSelected,
      status: userStatus,
      password: userPassword,
    };
    dispatch(addUserAction(formData));


  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (_, record, index) => index + 1, // Render serial number as index + 1
    },
    {
      title: "Name",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Email",
      dataIndex: "user_email",
      key: "user_email",
    },
    {
      title: "Mobile",
      dataIndex: "user_mobile",
      key: "user_mobile",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "User Role",
      dataIndex: "user_roles",
      key: "user_roles",
      render: (userRoles) => userRoles.join(", "),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
    setUniqueName(user.username);
    setUserName(user.user_name);
    setUserEmail(user.user_email);
    setUserPassword(user.password);
    setUserGenderSelected(user.gender);
    setRoleSelected(user.user_role[0]);
    setUserDepartmentSelected(user.department);
    setUserMob(
      user.user_mobile.slice(
        user.user_mobile.indexOf(userCountry) + userCountry.length
      )
    );
    setUserCountry(
      user.user_mobile.slice(
        0,
        user.user_mobile.indexOf(userCountry) + userCountry.length
      )
    );
    setUserStatus(user.status);
  };

  const handleDelete = async (user) => {
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
          url: `http://43.204.119.135/api/dvp_app/user_table/${user.id}`,
        };

        await axios(config);
        Swal.fire({
          icon: "success",
          title: `User  ${user.id} deleted successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        // Refresh the role data after deleting a role
        userTable();
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
                    <p className="title-heading">Add User</p>
                  </div>
                  <div style={{ padding: "10px" }}>
                    <Button
                      primary
                      onClick={showDrawer}
                      style={{ fontSize: "15px", cursor: "pointer" }}
                      className="title-heading"
                    >
                      Total Users : {userData?.data?.length}
                    </Button>
                  </div>
                </div>

                <form className="register-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label>
                      <p>
                        <span>User Role </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>

                      <Select
                        value={roleSelected}
                        onChange={handleRole}
                        name="userType"
                      >
                        {userRoleOption &&
                          userRoleOption?.data?.map((item) => (
                            <option key={item.role_id} value={item.role_id}>
                              {item.role_name}
                            </option>
                          ))}
                      </Select>
                    </label>
                    <label>
                      <p>
                        <span>Department </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Select
                        value={userDepartmentSelected}
                        onChange={handleDepartment}
                        name="department"
                        placeholder="select Department"
                      >
                        {userDepartmentOption &&
                          userDepartmentOption?.data?.map((item) => (
                            <option value={item.dept_id}>
                              {item.dept_name}
                            </option>
                          ))}
                      </Select>
                    </label>

                    <label>
                      <p>
                        <span>Status </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Select
                        value={userStatus}
                        onChange={handleStatus}
                        name="role"
                        placeholder="Select Status"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Select>
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      <p>
                        <span>Unique Name </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Input
                        type="text"
                        name="uniqueName"
                        value={uniqueName}
                        onChange={(e) => setUniqueName(e.target.value)}
                        required
                        placeholder="Your Unique Name"
                      />
                    </label>
                    <label>
                      <p>
                        <span>User Name </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Input
                        type="text"
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Your Name"
                      />
                    </label>

                    <label>
                      <p>
                        <span>Gender </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Select
                        value={userGenderSelected}
                        onChange={handleGender}
                        name="gender"
                      >
                        {userGenderOption &&
                          userGenderOption?.data?.map((item) => (
                            <option value={item?.gender_id}>
                              {item?.gender_name}
                            </option>
                          ))}
                      </Select>
                    </label>
                  </div>
                  <div className="form-row">
                    <label className="mobile-number-container">
                      <p>
                        <span>Country Code & Mobile No. </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <div className="mobile-number-container">
                        <Select
                          style={{ width: "100px" }}
                          className="country-code"
                          name="countryCode"
                          value={userCountry}
                          onChange={handleCountry}
                          showSearch
                          placeholder="Select country code"
                          required
                        >
                          <option value="">code</option>
                          <option value="+1">+1</option>
                          <option value="+7">+7</option>
                          <option value="+20">+20</option>
                          <option value="+27">+27</option>
                          <option value="+30">+30</option>
                          <option value="+31">+31</option>
                          <option value="+32">+32</option>
                          <option value="+33">+33</option>
                          <option value="+34">+34</option>
                          <option value="+36">+36</option>
                          <option value="+39">+39</option>
                          <option value="+40">+40</option>
                          <option value="+41">+41</option>
                          <option value="+43">+43</option>
                          <option value="+44">+44</option>
                          <option value="+45">+45</option>
                          <option value="+46">+46</option>
                          <option value="+47">+47</option>
                          <option value="+48">+48</option>
                          <option value="+49">+49</option>
                          <option value="+51">+51</option>
                          <option value="+52">+52</option>
                          <option value="+53">+53</option>
                          <option value="+54">+54</option>
                          <option value="+55">+55</option>
                          <option value="+56">+56</option>
                          <option value="+57">+57</option>
                          <option value="+58">+58</option>
                          <option value="+60">+60</option>
                          <option value="+61">+61</option>
                          <option value="+62">+62</option>
                          <option value="+63">+63</option>
                          <option value="+64">+64</option>
                          <option value="+65">+65</option>
                          <option value="+66">+66</option>
                          <option value="+81">+81</option>
                          <option value="+82">+82</option>
                          <option value="+84">+84</option>
                          <option value="+86">+86</option>
                          <option value="+90">+90</option>
                          <option value="+91">+91</option>
                          <option value="+92">+92</option>
                          <option value="+93">+93</option>
                          <option value="+94">+94</option>
                          <option value="+95">+95</option>
                          <option value="+98">+98</option>
                        </Select>
                        <Input
                          type="text"
                          name="mobileNo"
                          required
                          value={userMob}
                          onChange={(e) => setUserMob(e.target.value)}
                          placeholder="7291XXXX90"
                        />
                      </div>
                    </label>
                    <label>
                      <p>
                        <span>Email </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Input
                        type="email"
                        name="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                        placeholder="abcd@example.com"
                      />
                    </label>

                    <label>
                      <p>
                        <span>Password </span>
                        <span style={{ color: "red" }}>*</span>
                      </p>
                      <Input
                        type="text"
                        name="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                      />
                    </label>
                  </div>

                  <button className="reg_btn" type="submit">
                    Submit
                  </button>
                </form>

                <Drawer
                  width={900}
                  title="User Table"
                  onClose={onClose}
                  open={open}
                >
                  <Table
                    columns={columns}
                    dataSource={userData?.data}
                    rowKey="id"
                    pagination={false}
                  />
                </Drawer>

                <Modal
                  title="Edit User"
                  visible={isEditModalOpen}
                  onCancel={() => setIsEditModalOpen(false)}
                  onOk={handleEditSubmit}
                >
                  <form className="form-edit" style={{ padding: "10px" }}>
                    <label>Enter Unique Name</label>
                    <Input
                      value={uniqueName}
                      onChange={(e) => setUniqueName(e.target.value)}
                      placeholder="User Name"
                      disabled
                    />

                    <label>Enter User Name</label>
                    <Input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="User Name"
                    />
                    <label>Enter Email</label>
                    <Input
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="User Email"
                    />
                    {/* <label>Enter New Password</label>
                    <Input
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      placeholder="User Password"
                      type="password"
                    /> */}
                    <label>Select Gender</label>
                    <Select
                      value={userGenderSelected}
                      onChange={handleGender}
                      placeholder="Select Gender"
                    >
                      {userGenderOption.data?.map((option) => (
                        <Select.Option key={option.gender_id} value={option.gender_id}>
                          {option.gender_name}
                        </Select.Option>
                      ))}
                    </Select>
                    <label>Select Role</label>
                    <Select
                      value={roleSelected}
                      onChange={handleRole}
                      placeholder="Select Role"
                    >
                      {userRoleOption.data?.map((option) => (
                        <Select.Option key={option.role_id} value={option.role_id}>
                          {option.role_name}
                        </Select.Option>
                      ))}
                    </Select>
                    <label>Select Department</label>
                    <Select
                      value={userDepartmentSelected}
                      onChange={handleDepartment}
                      placeholder="Select Department"
                    >
                      {userDepartmentOption.data?.map((option) => (
                        <Select.Option key={option.dept_id} value={option.dept_id}>
                          {option.dept_name}
                        </Select.Option>
                      ))}
                    </Select>
                    <label>Mobile No:-</label>
                    <Input
                      value={userMob}
                      onChange={(e) => setUserMob(e.target.value)}
                      placeholder="User Mobile"
                    />

                    <label>Select Status</label>
                    <Select
                      value={userStatus}
                      onChange={handleStatus}
                      placeholder="Select Status"
                    >
                      <Option>Select Status</Option>
                      <Option value="active">Active </Option>
                      <Option value="inactive">Inactive</Option>
                    </Select>
                  </form>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
