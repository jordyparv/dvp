import React, { useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import { DatePicker, Row, Col, Card } from "antd";
import moment from "moment";

const { Meta } = Card;

const BookedSlots = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    // Perform any other actions when slot is selected, like booking
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "40px",
        }}
        className="production"
      >
        <h5>Book Your Slot</h5>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "50px",
          }}
        >
          {/* Calendar Display */}
          <div style={{ width: "30%", paddingRight: 20 }}>
            <DatePicker
              style={{ marginBottom: 20, marginLeft: "50px" }}
              onChange={handleDateChange}
              //   value={selectedDate}
              open
            />
          </div>

          {/* Studio Booking Slots */}
          <div style={{ width: "50%", paddingLeft: 20 }}>
            <Row gutter={[16, 16]}>
              {/* Studio 1 */}
              <Col span={24}>
                <Card hoverable>
                  <Meta title="Studio 1" />
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 1 - 10:00 - 10:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 1 - 10:00 - 10:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 1 - 10:00 - 10:45")
                      }
                    >
                      10:00 - 10:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 1 - 11:00 - 11:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 1 - 11:00 - 11:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 1 - 11:00 - 11:45")
                      }
                    >
                      11:00 - 11:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 1 - 12:00 - 12:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 1 - 12:00 - 12:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 1 - 12:00 - 12:45")
                      }
                    >
                      12:00 - 12:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 1 - 2:00 - 2:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 1 - 2:00 - 2:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() => handleSlotSelect("Studio 1 - 2:00 - 2:45")}
                    >
                      2:00 - 2:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 1 - 3:00 - 3:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 1 - 3:00 - 3:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() => handleSlotSelect("Studio 1 - 3:00 - 3:45")}
                    >
                      3:00 - 3:45
                    </li>

                    {/* Add more slots as needed */}
                  </ul>
                </Card>
              </Col>

              {/* Studio 2 */}
              <Col span={24}>
                <Card hoverable>
                  <Meta title="Studio 2" />
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 2 - 10:00 - 10:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 2 - 10:00 - 10:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 2 - 10:00 - 10:45")
                      }
                    >
                      10:00 - 10:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 2 - 11:00 - 11:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 2 - 11:00 - 11:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 2 - 11:00 - 11:45")
                      }
                    >
                      11:00 - 11:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 2 - 12:00 - 12:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 2 - 12:00 - 12:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 2 - 12:00 - 12:45")
                      }
                    >
                      12:00 - 12:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 2 - 2:00 - 2:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 2 - 2:00 - 2:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() => handleSlotSelect("Studio 2 - 2:00 - 2:45")}
                    >
                      2:00 - 2:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 2 - 3:00 - 3:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 2 - 3:00 - 3:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() => handleSlotSelect("Studio 2 - 3:00 - 3:45")}
                    >
                      3:00 - 3:45
                    </li>

                    {/* Add more slots as needed */}
                  </ul>
                </Card>
              </Col>

              {/* Studio 3 */}
              <Col span={24}>
                <Card hoverable>
                  <Meta title="Studio 3" />
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 3 - 10:00 - 10:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 3 - 10:00 - 10:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 3 - 10:00 - 10:45")
                      }
                    >
                      10:00 - 10:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 3 - 11:00 - 11:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 3 - 11:00 - 11:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 3 - 11:00 - 11:45")
                      }
                    >
                      11:00 - 11:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 3 - 12:00 - 12:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 3 - 12:00 - 12:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 3 - 12:00 - 12:45")
                      }
                    >
                      12:00 - 12:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 3 - 2:00 - 2:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 3 - 2:00 - 2:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() => handleSlotSelect("Studio 3 - 2:00 - 2:45")}
                    >
                      2:00 - 2:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 3 - 3:00 - 3:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 3 - 3:00 - 3:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() => handleSlotSelect("Studio 3 - 3:00 - 3:45")}
                    >
                      3:00 - 3:45
                    </li>

                    {/* Add more slots as needed */}
                  </ul>
                </Card>
              </Col>

              <Col span={24}>
                <Card hoverable>
                  <Meta title="Studio 4" />
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 4 - 10:00 - 10:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 4 - 10:00 - 10:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 4 - 10:00 - 10:45")
                      }
                    >
                      10:00 - 10:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 4 - 11:00 - 11:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 4 - 11:00 - 11:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 4 - 11:00 - 11:45")
                      }
                    >
                      11:00 - 11:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 4 - 12:00 - 12:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 4 - 12:00 - 12:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() =>
                        handleSlotSelect("Studio 4 - 12:00 - 12:45")
                      }
                    >
                      12:00 - 12:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 4 - 2:00 - 2:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 4 - 2:00 - 2:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() => handleSlotSelect("Studio 4 - 2:00 - 2:45")}
                    >
                      2:00 - 2:45
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        margin: "5px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        background:
                          selectedSlot === "Studio 4 - 3:00 - 3:45"
                            ? "#1890ff"
                            : "transparent",
                        color:
                          selectedSlot === "Studio 4 - 3:00 - 3:45"
                            ? "#fff"
                            : "#000",
                      }}
                      onClick={() => handleSlotSelect("Studio 4 - 3:00 - 3:45")}
                    >
                      3:00 - 3:45
                    </li>

                    {/* Add more slots as needed */}
                  </ul>
                </Card>
              </Col>

              {/* Add more studios and their slots as needed */}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedSlots;
