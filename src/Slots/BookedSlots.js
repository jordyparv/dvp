// import React, { useState } from "react";
// import SideBar from "../components/Sidebar/SideBar";
// import { DatePicker, Row, Col, Card } from "antd";
// import moment from "moment";

// const { Meta } = Card;

// const BookedSlots = () => {
//   const [selectedDate, setSelectedDate] = useState(moment());
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleSlotSelect = (slot) => {
//     setSelectedSlot(slot);
//     // Perform any other actions when slot is selected, like booking
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <SideBar />
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           marginBottom: "40px",
//         }}
//         className="production"
//       >
//         <h5>Book Your Slot</h5>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: "100%",
//             marginTop: "50px",
//           }}
//         >
//           {/* Calendar Display */}
//           <div style={{ width: "30%", paddingRight: 20 }}>
//             <DatePicker
//               style={{ marginBottom: 20, marginLeft: "50px" }}
//               onChange={handleDateChange}
//               //   value={selectedDate}
//               open
//             />
//           </div>

//           {/* Studio Booking Slots */}
//           <div style={{ width: "50%", paddingLeft: 20 }}>
//             <Row gutter={[16, 16]}>
//               {/* Studio 1 */}
//               <Col span={24}>
//                 <Card hoverable>
//                   <Meta title="Studio 1" />
//                   <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 1 - 10:00 - 10:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 1 - 10:00 - 10:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 1 - 10:00 - 10:45")
//                       }
//                     >
//                       10:00 - 10:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 1 - 11:00 - 11:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 1 - 11:00 - 11:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 1 - 11:00 - 11:45")
//                       }
//                     >
//                       11:00 - 11:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 1 - 12:00 - 12:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 1 - 12:00 - 12:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 1 - 12:00 - 12:45")
//                       }
//                     >
//                       12:00 - 12:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 1 - 2:00 - 2:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 1 - 2:00 - 2:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() => handleSlotSelect("Studio 1 - 2:00 - 2:45")}
//                     >
//                       2:00 - 2:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 1 - 3:00 - 3:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 1 - 3:00 - 3:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() => handleSlotSelect("Studio 1 - 3:00 - 3:45")}
//                     >
//                       3:00 - 3:45
//                     </li>

//                     {/* Add more slots as needed */}
//                   </ul>
//                 </Card>
//               </Col>

//               {/* Studio 2 */}
//               <Col span={24}>
//                 <Card hoverable>
//                   <Meta title="Studio 2" />
//                   <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 2 - 10:00 - 10:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 2 - 10:00 - 10:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 2 - 10:00 - 10:45")
//                       }
//                     >
//                       10:00 - 10:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 2 - 11:00 - 11:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 2 - 11:00 - 11:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 2 - 11:00 - 11:45")
//                       }
//                     >
//                       11:00 - 11:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 2 - 12:00 - 12:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 2 - 12:00 - 12:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 2 - 12:00 - 12:45")
//                       }
//                     >
//                       12:00 - 12:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 2 - 2:00 - 2:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 2 - 2:00 - 2:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() => handleSlotSelect("Studio 2 - 2:00 - 2:45")}
//                     >
//                       2:00 - 2:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 2 - 3:00 - 3:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 2 - 3:00 - 3:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() => handleSlotSelect("Studio 2 - 3:00 - 3:45")}
//                     >
//                       3:00 - 3:45
//                     </li>

//                     {/* Add more slots as needed */}
//                   </ul>
//                 </Card>
//               </Col>

//               {/* Studio 3 */}
//               <Col span={24}>
//                 <Card hoverable>
//                   <Meta title="Studio 3" />
//                   <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 3 - 10:00 - 10:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 3 - 10:00 - 10:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 3 - 10:00 - 10:45")
//                       }
//                     >
//                       10:00 - 10:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 3 - 11:00 - 11:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 3 - 11:00 - 11:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 3 - 11:00 - 11:45")
//                       }
//                     >
//                       11:00 - 11:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 3 - 12:00 - 12:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 3 - 12:00 - 12:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 3 - 12:00 - 12:45")
//                       }
//                     >
//                       12:00 - 12:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 3 - 2:00 - 2:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 3 - 2:00 - 2:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() => handleSlotSelect("Studio 3 - 2:00 - 2:45")}
//                     >
//                       2:00 - 2:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 3 - 3:00 - 3:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 3 - 3:00 - 3:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() => handleSlotSelect("Studio 3 - 3:00 - 3:45")}
//                     >
//                       3:00 - 3:45
//                     </li>

//                     {/* Add more slots as needed */}
//                   </ul>
//                 </Card>
//               </Col>

//               <Col span={24}>
//                 <Card hoverable>
//                   <Meta title="Studio 4" />
//                   <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 4 - 10:00 - 10:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 4 - 10:00 - 10:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 4 - 10:00 - 10:45")
//                       }
//                     >
//                       10:00 - 10:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 4 - 11:00 - 11:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 4 - 11:00 - 11:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 4 - 11:00 - 11:45")
//                       }
//                     >
//                       11:00 - 11:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 4 - 12:00 - 12:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 4 - 12:00 - 12:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() =>
//                         handleSlotSelect("Studio 4 - 12:00 - 12:45")
//                       }
//                     >
//                       12:00 - 12:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 4 - 2:00 - 2:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 4 - 2:00 - 2:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() => handleSlotSelect("Studio 4 - 2:00 - 2:45")}
//                     >
//                       2:00 - 2:45
//                     </li>
//                     <li
//                       style={{
//                         display: "inline-block",
//                         margin: "5px",
//                         padding: "10px",
//                         border: "1px solid #ccc",
//                         cursor: "pointer",
//                         background:
//                           selectedSlot === "Studio 4 - 3:00 - 3:45"
//                             ? "#1890ff"
//                             : "transparent",
//                         color:
//                           selectedSlot === "Studio 4 - 3:00 - 3:45"
//                             ? "#fff"
//                             : "#000",
//                       }}
//                       onClick={() => handleSlotSelect("Studio 4 - 3:00 - 3:45")}
//                     >
//                       3:00 - 3:45
//                     </li>

//                     {/* Add more slots as needed */}
//                   </ul>
//                 </Card>
//               </Col>

//               {/* Add more studios and their slots as needed */}
//             </Row>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookedSlots;
import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import "./Studio.css";
import { DatePicker, Input } from "antd";

const BookedSlots = () => {
  const [ loginName, setLoginName ] = useState([]);

  
  
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };


useEffect(() => {
  const getUserInfo = JSON.parse(localStorage.getItem("prod_cred"));
  setLoginName(getUserInfo?.user_name);
  // if(getUserInfo?.user_name) {
  //   const userName = getUserInfo?.user_name?.split(" ")[0];
  //   setLoginName(userName)
  // }
}, [])

  

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
            <div style={{ display: "flex", justifyContent:"flex-end" }}>
              <div className="slot-row">
                <div className="slot-name">
                  <h5>STUDIO 1</h5>
                  <p>Theory</p>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
              </div>
              <div className="slot-row">
                <div className="slot-name">
                  <h5>STUDIO 2</h5>
                  <p>Theory</p>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
              </div>
              <div className="slot-row">
                <div className="slot-name">
                  <h5>STUDIO 3</h5>
                  <p>Theory</p>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
              </div>
              <div className="slot-row">
                <div className="slot-name">
                  <h5>STUDIO 4</h5>
                  <p>Practical</p>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
                <div className="slot-card">
                  <div className="slot-time">10:00 - 10:45</div>
                  <div className="slot-status">Teacher Name</div>
                  <div className="faculty">Manish Kumar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookedSlots;
