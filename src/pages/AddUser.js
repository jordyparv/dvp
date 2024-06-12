import React, { useEffect, useState } from "react";
import "./AddUser.css";
import SideBar from "../components/Sidebar/SideBar";
import axios from "axios";
import { addUserSuccess } from "../redux/Slice/addUserSlice";
import { useDispatch } from "react-redux";
import { addUserAction } from "../redux/Slice/addUserAction";
import { Button, Card, Col, Drawer, Input, Select, Table, message } from "antd";
import { render } from "@testing-library/react";
import Swal from "sweetalert2";

const AddUser = () => {
  const [uniqueName, setUniqueName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [userGenderOption, setUserGenderOption] = useState("");
  const [userGenderSelected, setUserGenderSelected] = useState("");

  const [userRoleOption, setUserRoleOption] = useState("");
  const [roleSelected, setRoleSelected] = useState([]);

  const [userDepartmentOption, setUserDepartmentOption] = useState("");
  const [userDepartmentSelected, setUserDepartmentSelected] = useState("");

  const [userMob, setUserMob] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const [userData, setUserData] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  // get department

  const departmentRequest = async () => {
    try {
      const getDepartment = await axios(
        "http://172.17.18.255:8080/dvp_app/departments/"
      );

      //   setUserDepartment(getDepartment);
      setUserDepartmentOption(getDepartment);
    } catch (error) {
      console.log(error, "DEPART ERRO");
    }
  };

  // get user role

  const userRoleRequest = async () => {
    try {
      const getUserRole = await axios(
        "http://172.17.18.255:8080/dvp_app/roles/"
      );

      setUserRoleOption(getUserRole);
    } catch (error) {
      console.log(error, "Role ERRO");
    }
  };

  //get gender

  const userGenderReq = async () => {
    try {
      const getUserGender = await axios(
        "http://172.17.18.255:8080/dvp_app/genders/"
      );

      setUserGenderOption(getUserGender);
    } catch (error) {
      console.log(error, "Gender ERRO");
    }
  };

  // get user table
  const userTable = async () => {
    try {
      const getUserData = await axios(
        "http://172.17.18.255:8080/dvp_app/user_create/"
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

  const handleSubmit = (e) => {
    e.preventDefault();

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
      user_role: roleSelected,
      gender: parseInt(userGenderSelected),
      user_mobile: `${userCountry}${userMob}`,
      department: userDepartmentSelected,
      status: userStatus,
      password: userPassword,
    };

    dispatch(addUserAction(formData));
    // setUniqueName("");
    // setUserName("");
    // setUserEmail("");
    // setUserPassword("");
    // setUserGenderSelected("");
    // setRoleSelected("");
    // setUserDepartmentSelected("");
    // setUserMob("");
    // setUserCountry("");
    // setUserStatus("");
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
      render: (userRoles) => userRoles.join(', '),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  const handleDelete = async(user) => {
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
          url: `/dvp_app/user_table/${user.id}`,
        };

        await axios(config);
        Swal.fire({
          icon: "success",
          title: `User  ${user.id} deleted successfully`,
          showConfirmButton: false,
          timer: 3000,
        });
        // Refresh the role data after deleting a role
        userTable()
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
                        mode="multiple"
                        value={roleSelected}
                        onChange={handleRole}
                        name="userType"
                        multiple
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
                          <option value="+211">+211</option>
                          <option value="+212">+212</option>
                          <option value="+213">+213</option>
                          <option value="+216">+216</option>
                          <option value="+218">+218</option>
                          <option value="+220">+220</option>
                          <option value="+221">+221</option>
                          <option value="+222">+222</option>
                          <option value="+223">+223</option>
                          <option value="+224">+224</option>
                          <option value="+225">+225</option>
                          <option value="+226">+226</option>
                          <option value="+227">+227</option>
                          <option value="+228">+228</option>
                          <option value="+229">+229</option>
                          <option value="+230">+230</option>
                          <option value="+231">+231</option>
                          <option value="+232">+232</option>
                          <option value="+233">+233</option>
                          <option value="+234">+234</option>
                          <option value="+235">+235</option>
                          <option value="+236">+236</option>
                          <option value="+237">+237</option>
                          <option value="+238">+238</option>
                          <option value="+239">+239</option>
                          <option value="+240">+240</option>
                          <option value="+241">+241</option>
                          <option value="+242">+242</option>
                          <option value="+243">+243</option>
                          <option value="+244">+244</option>
                          <option value="+245">+245</option>
                          <option value="+246">+246</option>
                          <option value="+248">+248</option>
                          <option value="+249">+249</option>
                          <option value="+250">+250</option>
                          <option value="+251">+251</option>
                          <option value="+252">+252</option>
                          <option value="+253">+253</option>
                          <option value="+254">+254</option>
                          <option value="+255">+255</option>
                          <option value="+256">+256</option>
                          <option value="+257">+257</option>
                          <option value="+258">+258</option>
                          <option value="+260">+260</option>
                          <option value="+261">+261</option>
                          <option value="+262">+262</option>
                          <option value="+263">+263</option>
                          <option value="+264">+264</option>
                          <option value="+265">+265</option>
                          <option value="+266">+266</option>
                          <option value="+267">+267</option>
                          <option value="+268">+268</option>
                          <option value="+269">+269</option>
                          <option value="+290">+290</option>
                          <option value="+291">+291</option>
                          <option value="+297">+297</option>
                          <option value="+298">+298</option>
                          <option value="+299">+299</option>
                          <option value="+350">+350</option>
                          <option value="+351">+351</option>
                          <option value="+352">+352</option>
                          <option value="+353">+353</option>
                          <option value="+354">+354</option>
                          <option value="+355">+355</option>
                          <option value="+356">+356</option>
                          <option value="+357">+357</option>
                          <option value="+358">+358</option>
                          <option value="+359">+359</option>
                          <option value="+370">+370</option>
                          <option value="+371">+371</option>
                          <option value="+372">+372</option>
                          <option value="+373">+373</option>
                          <option value="+374">+374</option>
                          <option value="+375">+375</option>
                          <option value="+376">+376</option>
                          <option value="+377">+377</option>
                          <option value="+378">+378</option>
                          <option value="+379">+379</option>
                          <option value="+380">+380</option>
                          <option value="+381">+381</option>
                          <option value="+382">+382</option>
                          <option value="+385">+385</option>
                          <option value="+386">+386</option>
                          <option value="+387">+387</option>
                          <option value="+389">+389</option>
                          <option value="+420">+420</option>
                          <option value="+421">+421</option>
                          <option value="+423">+423</option>
                          <option value="+500">+500</option>
                          <option value="+501">+501</option>
                          <option value="+502">+502</option>
                          <option value="+503">+503</option>
                          <option value="+504">+504</option>
                          <option value="+505">+505</option>
                          <option value="+506">+506</option>
                          <option value="+507">+507</option>
                          <option value="+508">+508</option>
                          <option value="+509">+509</option>
                          <option value="+590">+590</option>
                          <option value="+591">+591</option>
                          <option value="+592">+592</option>
                          <option value="+593">+593</option>
                          <option value="+594">+594</option>
                          <option value="+595">+595</option>
                          <option value="+596">+596</option>
                          <option value="+597">+597</option>
                          <option value="+598">+598</option>
                          <option value="+599">+599</option>
                          <option value="+670">+670</option>
                          <option value="+672">+672</option>
                          <option value="+673">+673</option>
                          <option value="+674">+674</option>
                          <option value="+675">+675</option>
                          <option value="+676">+676</option>
                          <option value="+677">+677</option>
                          <option value="+678">+678</option>
                          <option value="+679">+679</option>
                          <option value="+680">+680</option>
                          <option value="+681">+681</option>
                          <option value="+682">+682</option>
                          <option value="+683">+683</option>
                          <option value="+685">+685</option>
                          <option value="+686">+686</option>
                          <option value="+687">+687</option>
                          <option value="+688">+688</option>
                          <option value="+689">+689</option>
                          <option value="+690">+690</option>
                          <option value="+691">+691</option>
                          <option value="+692">+692</option>
                          <option value="+850">+850</option>
                          <option value="+852">+852</option>
                          <option value="+853">+853</option>
                          <option value="+855">+855</option>
                          <option value="+856">+856</option>
                          <option value="+880">+880</option>
                          <option value="+886">+886</option>
                          <option value="+960">+960</option>
                          <option value="+961">+961</option>
                          <option value="+962">+962</option>
                          <option value="+963">+963</option>
                          <option value="+964">+964</option>
                          <option value="+965">+965</option>
                          <option value="+966">+966</option>
                          <option value="+967">+967</option>
                          <option value="+968">+968</option>
                          <option value="+970">+970</option>
                          <option value="+971">+971</option>
                          <option value="+972">+972</option>
                          <option value="+973">+973</option>
                          <option value="+974">+974</option>
                          <option value="+975">+975</option>
                          <option value="+976">+976</option>
                          <option value="+977">+977</option>
                          <option value="+992">+992</option>
                          <option value="+993">+993</option>
                          <option value="+994">+994</option>
                          <option value="+995">+995</option>
                          <option value="+996">+996</option>
                          <option value="+998">+998</option>
                          <option value="+1242">+1242</option>
                          <option value="+1246">+1246</option>
                          <option value="+1264">+1264</option>
                          <option value="+1268">+1268</option>
                          <option value="+1284">+1284</option>
                          <option value="+1340">+1340</option>
                          <option value="+1345">+1345</option>
                          <option value="+1441">+1441</option>
                          <option value="+1473">+1473</option>
                          <option value="+1649">+1649</option>
                          <option value="+1664">+1664</option>
                          <option value="+1670">+1670</option>
                          <option value="+1671">+1671</option>
                          <option value="+1684">+1684</option>
                          <option value="+1721">+1721</option>
                          <option value="+1758">+1758</option>
                          <option value="+1767">+1767</option>
                          <option value="+1784">+1784</option>
                          <option value="+1787">+1787</option>
                          <option value="+1809">+1809</option>
                          <option value="+1829">+1829</option>
                          <option value="+1849">+1849</option>
                          <option value="+1868">+1868</option>
                          <option value="+1869">+1869</option>
                          <option value="+1876">+1876</option>
                          <option value="+1939">+1939</option>
                          <option value="+249">+249</option>
                          <option value="+291">+291</option>
                          <option value="+297">+297</option>
                          <option value="+599">+599</option>
                          <option value="+673">+673</option>
                          <option value="+855">+855</option>
                          <option value="+886">+886</option>
                          <option value="+960">+960</option>
                          <option value="+970">+970</option>
                          <option value="+971">+971</option>
                          <option value="+972">+972</option>
                          <option value="+973">+973</option>
                          <option value="+974">+974</option>
                          <option value="+975">+975</option>
                          <option value="+976">+976</option>
                          <option value="+977">+977</option>
                          <option value="+992">+992</option>
                          <option value="+993">+993</option>
                          <option value="+994">+994</option>
                          <option value="+995">+995</option>
                          <option value="+996">+996</option>
                          <option value="+998">+998</option>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
