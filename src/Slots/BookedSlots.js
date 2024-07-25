import React, { useEffect, useState, useRef } from "react";
import SideBar from "../components/Sidebar/SideBar";
import "./Studio.css";
import { DatePicker, Input, Modal, Button, Select, Popover } from "antd";
import axios from "axios";
import { Option } from "antd/es/mentions";

const BookedSlots = () => {
  const [loginName, setLoginName] = useState([]);
  const [studioData, setStudioData] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ subjectOption, setSubjectOption ] = useState([]);
  const [ subjectSelected, setSubjectSelected ] = useState([]);

 const [ employeeOption, setEmployeeOption ] = useState([]);
 const [ employeeSelected, setEmployeeSelected ] = useState([]);
  const [ courseData, setCourseData ] = useState([]);
  const [cardActive, setCardActive] = useState(null);
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
  });

  const [facultyData, setFacultyData] = useState([]);

  const slotCardRef = useRef(null);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  useEffect(() => {
    const getUserInfo = JSON.parse(localStorage.getItem("prod_cred"));
    setLoginName(getUserInfo?.user_name);
  }, []);

  const getStudio = async () => {
    const response = await axios.get(
      "http://172.17.19.25:8080/dvp_app/all_studio_slots"
    );
    console.log(response, "STUDIO NAME");
    setStudioData(response?.data);
  };

  useEffect(() => {
    getStudio();
    getCourseAllotment();
 
  }, []);



  const handleSlotClick = (slot, event) => {
    setSelectedSlot(slot);
    setCardActive(slot);
    setIsMenuVisible(true);
    const slotCard = event.currentTarget;
    slotCardRef.current = slotCard;
  };

  const handleBookSlotClick = () => {
    setIsMenuVisible(false);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    console.log("Form Data:", formData);
    setIsModalVisible(false);
    setFormData({
      input1: "",
      input2: "",
      input3: "",
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const getCourseAllotment = async () => {
    try {
      const response = await axios.get(
        `http://172.17.19.25:8080/dvp_app/course_allotment/`
      );
      setCourseData(response?.data)
      setEmployeeOption(response?.data)
      setSubjectOption(response?.data)

      console.log(response, "RRRRRRRRRRRRRRRRRRRR");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmployeeChange = (value) => {
    setEmployeeSelected(value)
  }

  return (
    <>
      <div className="studio">
        <SideBar />
        <div className="studio-dashboard">
          <div className="studio-left">
            <div className="left-heading">
              <div>
                <h1>CDOE</h1>
              </div>
              <div className="v-line"></div>{" "}
              <div>
                <h1>Studio Booking</h1>
              </div>
            </div>

            <div className="status-info-card">
              <div className="info-card">
                <div className="card-name1">Status Details</div>
                <div className="card-name2">
                  <span className="circle1"></span>
                  <span>Completed</span>
                </div>
                <div className="card-name2">
                  <span className="circle2"></span>
                  <span>Defaulted</span>
                </div>
                <div className="card-name2">
                  <span className="circle3"></span>
                  <span>No Action Yet</span>
                </div>
                <div className="card-name2">
                  <span className="circle4"></span>
                  <span>Not Booked</span>
                </div>
              </div>
            </div>

            <div className="date-picker">
              <DatePicker onChange={onChange} />
            </div>
          </div>
          <div className="studio-right">
            <div
              style={{
                width: "188px",
                position: "fixed",
                top: "0",
                right: "0",
              }}
              className="right-heading"
            >
              <div className="user-info">
                <div className="user-name">{loginName?.slice(0, 20)}</div>
                <div className="user-role">Admin</div>
              </div>
              <div className="user-picture"></div>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                height: "100vh",
                overflow: "auto",
                marginTop: "49px",
                width: "100%",
              }}
            >
              {studioData &&
                studioData?.map((item) => (
                  <div key={item.studio_name} className="slot-row">
                    <div className="slot-name">
                      <h5>{item?.studio_name}</h5>
                      <p>{item?.studio_type}</p>
                    </div>
                    {item?.slots &&
                      item?.slots?.map((studio) => (
                        <div
                          key={studio.slot_id}
                          className={`slot-card ${
                            cardActive === studio ? "clickedSlot" : ""
                          }`}
                          onClick={(e) => handleSlotClick(studio, e)}
                        >
                          <div
                            className={`slot-time ${
                              cardActive === studio ? "slotTime" : ""
                            }`}
                          >
                            {studio?.start_time} - {studio?.end_time}
                          </div>
                          <div
                            className={`slot-status ${
                              cardActive === studio ? "slotStatus" : ""
                            }`}
                          >
                            Status
                          </div>
                          <Popover title={studio?.status}>
                          <div className="faculty">Not Booked</div>

                          </Popover>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {isMenuVisible && slotCardRef.current && (
        <div
          className="slot-menu"
          style={{
            position: "absolute",
            top:
              slotCardRef.current.getBoundingClientRect().bottom +
              window.scrollY +
              5,
            left:
              slotCardRef.current.getBoundingClientRect().left + window.scrollX,
          }}
        >
          {/* <Button className="dynamicButton" onClick={handleBookSlotClick}>Book Slot</Button> */}
          <>
            <div className="small-dynamic-button">
              <div onClick={handleBookSlotClick} className="set">
                Book
              </div>
              <div className="set">Settings</div>
              {/* <div className="set">Notify</div> */}
            </div>
            <div className="triangle"></div>
          </>
        </div>
      )}
      <Modal
        title="Book Slot"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <div style={{marginBottom:"10px", width:"300px"}}>
        <Select
          placeholder="Select Faculty"
          required
          style={{
            width: "100%",
            
          }}
          value={employeeSelected}
          onChange={handleEmployeeChange}
        >
          {employeeOption &&
            employeeOption.map((item) => (
              <Option value={item?.employee_id} key={item?.course_allotment_ids}>
                {item?.employee_name}
              </Option>
            ))}
        </Select>
        </div>
       
        <div style={{marginBottom:"10px", width:"300px"}}>
        <Select
          placeholder="Select Faculty"
          required
          style={{
            width: "100%",
            
          }}
          value={employeeSelected}
          onChange={handleEmployeeChange}
        >
          {employeeOption &&
            employeeOption.map((item) => (
              <Option value={item?.employee_id} key={item?.course_allotment_ids}>
                {item?.employee_name}
              </Option>
            ))}
        </Select>
        </div>
        <Input
          placeholder="Input 3"
          name="input3"
          value={formData.input3}
          onChange={handleInputChange}
        />
      </Modal>
    </>
  );
};

export default BookedSlots;
