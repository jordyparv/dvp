import React, { useEffect, useState, useRef } from "react";
import SideBar from "../components/Sidebar/SideBar";
import "./Studio.css";
import {
  DatePicker,
  Modal,
  Select,
  Checkbox,
  Form,
  Table,
  Popover,
  Button,
  notification,
  Input,
  TimePicker,
} from "antd";
import axios from "axios";
import moment from "moment";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { EyeOutlined, FilePdfOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

const ViewSlots = () => {
  const [loginName, setLoginName] = useState([]);
  const [studioData, setStudioData] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cardActive, setCardActive] = useState(null);
  const [approvedData, setApprovedData] = useState([]);
  const [employeeOption, setEmployeeOption] = useState([]);
  const [subjectOption, setSubjectOption] = useState([]);
  const [subtopicOptions, setSubtopicOptions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);
  const [topics, setTopics] = useState([]);
  const [externalSelectedDate, setExternalSelectedDate] = useState(null);
  const [responseData, setResponseData] = useState([]);
  const slotCardRef = useRef(null);
  const [bookingsData, setBookingsData] = useState([]);
  const [user_info, setUser_info] = useState([]);
  const [isModalVisible123, setIsModalVisible123] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [hasBooking, setHasBooking] = useState([]);
  const [interval, setInterval] = useState(null);
  const [startTime, setStartTime] = useState("");

  useEffect(() => {
    const getUserInfo = JSON.parse(localStorage.getItem("prod_cred"));
    setLoginName(getUserInfo?.user_name);
    console.log(getUserInfo, "222222222222222");
    setUser_info(getUserInfo?.role_names[0]);
  }, []);

  const getUserId = () => {
    const userInfo = JSON.parse(localStorage.getItem("prod_cred"));
    console.log(userInfo, "222222222222222");
    setUser_info(userInfo?.role_names[0]);
    return userInfo?.user_id;
  };

  useEffect(() => {
    getStudio();
    getCourseAllotment();
    getApprovedData();
  }, []);

  const fetchBookingsData = async (date) => {
    try {
      const response = await axios.get(
        `http://43.204.119.135/api/dvp_app/show-bookings/${date}/`
      );
      setBookingsData(response?.data);
      const bookedItems = response?.data?.filter(
        (item) => item.is_booked === "Booked"
      );
      setHasBooking(bookedItems);
      console.log(bookedItems, "BBBBBBBBBBOOOOOOOOOOO");
      console.log(response.data, "BOOKINGS DATA");
    } catch (error) {
      console.error("Error fetching bookings data:", error);
    }
  };

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD");
    fetchBookingsData(currentDate);
    // Fetch other necessary data
    getStudio();
    getCourseAllotment();
    getApprovedData();
  }, []);

  const getStudio = async () => {
    const response = await axios.get(
      "http://43.204.119.135/api/dvp_app/all_studio_slots"
    );
    setStudioData(response?.data);
    console.log(response, "STUDIO");
  };

  const getCourseAllotment = async () => {
    try {
      const response = await axios.get(
        "http://43.204.119.135/api/dvp_app/course_allotment/"
      );
      setEmployeeOption(
        response?.data.map((item) => (
          <Option key={item.employee_id} value={item.employee_id}>
            {item.employee_name}
          </Option>
        ))
      );
      setSubjectOption(
        response?.data.flatMap((item) =>
          item.subjects.map((subject) => (
            <Option key={subject.subject_id} value={subject.subject_id}>
              {subject.subject_name}
            </Option>
          ))
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getApprovedData = async () => {
    try {
      const response = await axios.get(
        "http://43.204.119.135/api/dvp_app/course_available_slot_book/"
      );
      setApprovedData(response?.data);
      const employees = response?.data.map((emp) => ({
        label: emp.employee_name,
        value: emp.employee_id,
      }));
      setEmployeeOption(employees);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilteredData = () => {
    if (!selectedEmployee) return;

    const employeeData = approvedData.find(
      (emp) => emp.employee_id === selectedEmployee
    );
    if (!employeeData) return;

    const subjects = employeeData.subjects.map((subj) => ({
      label: subj.subject_name + " " + subj.subject_code,
      value: subj.subject_id,
    }));

    setSubjectOption(subjects);

    if (selectedSubject) {
      const subjectData = employeeData.subjects.find(
        (subj) => subj.subject_id === selectedSubject
      );
      if (subjectData) {
        const subtopics = subjectData.lesson_plans.map((lessonPlan) => ({
          label: lessonPlan.subtopic,
          value: lessonPlan.subtopic,
          subupload_id:
            lessonPlan.subuploads.length > 0
              ? lessonPlan.subuploads[0].subupload_id
              : null,
        }));
        setSubtopicOptions(subtopics);

        const topicsData = subjectData.lesson_plans.map((lessonPlan) => ({
          topic: lessonPlan.topic,
          subtopic: lessonPlan.subtopic,
          subupload_id:
            lessonPlan.subuploads.length > 0
              ? lessonPlan.subuploads[0].subupload_id
              : null,
        }));
        setTopics(topicsData);
      }
    }
  };

  useEffect(() => {
    fetchFilteredData();
  }, [selectedEmployee, selectedSubject]);

  const handleSlotClick = (slot, event) => {
    const booking = bookingsData.find((b) => b.slot_id === slot.slot_id);

    setSelectedSlot({
      studio_id: slot.studio_id,
      start_time: slot.start_time,
      end_time: slot.end_time,
      slot_id: slot.slot_id,
      slotbook_id: booking ? booking.slotbook_id : null, // Add slotbook_id here
    });

    setCardActive(slot);
    setIsMenuVisible(true);
    const slotCard = event.currentTarget;
    slotCardRef.current = slotCard;
  };

  const handleBookSlotClick = () => {
    setIsMenuVisible(false);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    const userId = getUserId();
    const isBooked = form.getFieldValue("status");
    const remark = form.getFieldValue("remark");
    const duration = interval; // Use formatted interval

    const payload = {
      is_booked: isBooked || "completed",
      remark: remark || "Successfully recorded",
      duration: duration, // Use formatted duration
      recording_person: userId,
    };

    try {
      const response = await axios.patch(
        `http://43.204.119.135/api/dvp_app/slots/${selectedSlot.slotbook_id}/update-status/`,
        payload
      );
      console.log("Status updated successfully:", response.data);
      notification.success({ message: "Status updated successfully" });
      setIsModalVisible(false);
      fetchBookingsData(selectedDate); // Refresh data after update
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    } catch (error) {
      console.error("Error updating status:", error);
      notification.error({ message: "Error updating status" });
    }
  };

  const handleFormSubmit = (values) => {
    handleModalOk(values);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDateChange = (date, dateString) => {
    setExternalSelectedDate(dateString);
    fetchBookingsData(dateString);
  };

  const showModal = (script) => {
    setModalContent(script);
    setIsModalVisible123(true);
  };

  const handleCancel = () => {
    setIsModalVisible123(false);
  };

  const [form] = Form.useForm();





  const handleIntervalChange = (time) => {
    if (time) {
      const hours = time.hour();
      const minutes = time.minute();
      const seconds = time.second();
      // Format duration as hh:mm:ss
      const durationFormatted = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      setInterval(durationFormatted); // Save formatted duration
    } else {
      setInterval("00:00:00"); // Reset to default duration
    }
  };

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
              <div className="v-line"></div>
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
                  <span>Not Completed</span>
                </div>

                <div className="card-name2">
                  <span className="circle4"></span>
                  <span>Cancelled</span>
                </div>
              </div>
            </div>

            <div className="date-picker">
              <DatePicker onChange={handleDateChange} />
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
                <div className="user-role"></div>
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
                studioData.map((item) => (
                  <div key={item.studio_name} className="slot-row">
                    <div className="slot-name">
                      <h5>{item?.studio_name}</h5>
                      <p>{item?.studio_type}</p>
                    </div>
                    {item?.slots &&
                      item?.slots?.map((studio) => {
                        // Find the booking status for the slot
                        const booking = bookingsData.find(
                          (b) => b.slot_id === studio.slot_id
                        );

                        // Determine CSS class and modal opening logic based on booking status
                        const cardClass =
                          booking && booking?.is_booked === "Booked"
                            ? "slot-card booked"
                            : booking?.is_booked === "Completed"
                              ? "slot-card completedClass"
                              : booking?.is_booked === "Not Completed"
                                ? "slot-card notCompleted"
                                : booking?.is_booked === "Cancelled" ? "slot-card cancelledClass" : "slot-card"

                        return (
                          <Popover
                            // title={booking ? booking.booked_by?.first_name + " " + booking.booked_by?.employee_code : "No Details"}
                            title={`Booked By ${booking && booking.booked_by?.first_name
                              ? booking.booked_by?.first_name
                              : ""
                              } `}
                            content={
                              booking?.lesson_plans.length > 0 ? (
                                <div>
                                  {booking.lesson_plans.map((plan, index) => (
                                    <div key={index}>
                                      <div>Topic: {plan.topic}</div>
                                      <div>SubTopic: {plan.subtopic}</div>
                                      <div>
                                        <EyeOutlined
                                          onClick={() => showModal(plan.script)}
                                          style={{ marginRight: 8 }}
                                        />
                                        <FilePdfOutlined
                                          onClick={() =>
                                            window.open(
                                              plan.ppt_file_url,
                                              "_blank"
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                "No Details"
                              )
                            }
                          >
                            <div
                              key={studio.slot_id}
                              className={`${cardClass} ${cardActive === studio ? "clickedSlot" : ""
                                }`}
                              onClick={(e) => handleSlotClick(studio, e)}
                            >
                              <div
                                className={`slot-time ${cardActive === studio ? "slotTime" : ""
                                  }`}
                              >
                                {studio?.start_time} - {studio?.end_time}
                              </div>
                              <div
                                className={`slot-status ${cardActive === studio ? "slotStatus" : ""
                                  }`}
                              >
                                {booking ? booking.is_booked : "Not Booked"}
                              </div>
                              <div className="faculty">
                                {booking
                                  ? booking?.lesson_plans
                                    ?.map(
                                      (item) =>
                                        item?.lesson_plan_employee
                                          ?.first_name +
                                        " " +
                                        item?.lesson_plan_employee
                                          ?.employee_code
                                    )
                                    .join(", ") // Join multiple faculty names with a comma
                                  : "No Details"}
                              </div>
                            </div>
                          </Popover>
                        );
                      })}
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
          {selectedSlot &&
            hasBooking.some(
              (booking) => booking.slot_id === selectedSlot.slot_id
            ) &&
            user_info === "Camera Person" ? (
            <>
              <div className="small-dynamic-button">
                <div onClick={handleBookSlotClick} className="set">
                  Update Status
                </div>
              </div>
              <div className="triangle"></div>
            </>
          ) : null}
        </div>
      )}

      <Modal visible={isModalVisible123} onCancel={handleCancel} footer={null}>
        <div dangerouslySetInnerHTML={{ __html: modalContent }} />
      </Modal>

      <Modal
        title="Update Slot Status"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          id="status-form"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="status"
            label="Mark As"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select placeholder="Select Status">
              <Option value="Completed">Completed</Option>
              <Option value="Not Completed">Not Completed</Option>
              {/* <Option value="Not Present">Not Present</Option> */}
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </Form.Item>

          <TimePicker
            placeholder="Select Time"
            style={{ width: "200px" }}
            format="HH:mm:ss"
            value={interval ? dayjs(interval, "HH:mm:ss") : null}
            onChange={handleIntervalChange} // Use handleIntervalChange here
          />

          <Form.Item
            rules={[{ required: true, message: "Please give remark" }]}
            name="remark"
            label="Remark"
          >
            <TextArea required rows={4} placeholder="Enter remarks here" />
          </Form.Item>

          <Form.Item>
            <Button key="cancel" onClick={handleModalCancel}>
              Cancel
            </Button>
            <Button key="submit" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ViewSlots;
