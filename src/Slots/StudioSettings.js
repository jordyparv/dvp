import React, { useState, useRef, useEffect } from "react";
import SideBar from "../components/Sidebar/SideBar";
import { Button, Input, message, Modal, Select, Table, TimePicker } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import moment from "moment/moment";
import delet from "../assets/images/delete.png";
import edit from "../assets/images/editStudio.png";

const { Option } = Select;
const { confirm } = Modal;

const StudioSettings = () => {
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [studioData, setStudioData] = useState([]);
  const [slotData, setSlotData] = useState([]);
  const makeStudioFormRef = useRef(null);
  const createSlotFormRef = useRef(null);

  const [studioName, setStudioName] = useState("");
  const [studioType, setStudioType] = useState([]);

  const [studioNameOption, setStudioNameOption] = useState([]);
  const [selectedStudioName, setSelectedStudioName] = useState([]);
  const [interval, setInterval] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [editStudio, setEditStudio] = useState(null);
  const [editSlot, setEditSlot] = useState(null);

  const [highlightedSlot, setHighlightedSlot] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(null);

  const fetchStudioData = async () => {
    try {
      const response = await axios.get(
        "http://43.204.119.135/api/dvp_app/studios/"
      );
      setStudioData(response.data);
      setStudioNameOption(response?.data);
      console.log(response, "STUDIOOOOOOOOOOOOOO");
    } catch (error) {
      console.error("Error fetching studio data:", error);
    }
  };
  const fetchStudioSlots = async () => {
    try {
      const response = await axios.get(
        "http://43.204.119.135/api/dvp_app/studio_slots/"
      );
      setSlotData(response?.data);
      console.log("slots", response?.data[0]?.studio?.studio_name);
    } catch (error) {
      console.error("Error fetching studio data:", error);
    }
  };

  useEffect(() => {
    fetchStudioData();
    fetchStudioSlots();
  }, []);

  const handleSettingChange = (value) => {
    setSelectedSetting(value);
  };

  const handleStudioType = (value) => {
    setStudioType(value);
  };

  const handleMakeStudio = async () => {
    try {
      const data = {
        studio_name: studioName,
        studio_type: studioType,
      };

      if (makeStudioFormRef.current.reportValidity()) {
        if (editStudio) {
          // Update existing studio
          const config = {
            url: `http://43.204.119.135/api/dvp_app/studios/${editStudio.studio_id}/`,
            method: "PUT",
            data,
          };
          const response = await axios(config);
          if (response.status === 200) {
            message.success("Studio Updated!");
            setEditStudio(null);
          } else {
            console.log("Error");
          }
        } else {
          // Create new studio
          const config = {
            url: `http://43.204.119.135/api/dvp_app/studios/`,
            method: "POST",
            data,
          };
          const response = await axios(config);
          if (response.status === 201) {
            message.success("New Studio Created!");
          } else {
            console.log("Error");
          }
        }
        setStudioName("");
        setStudioType("");
        fetchStudioData();
      } else {
        console.log("Form is invalid, show validation errors");
      }
    } catch (error) {
      message.warning(error.message);
    }
  };

  const handleCreateSlot = async () => {
    try {
      const data = {
        studio: selectedStudioName,
        duration: interval,
        start_time: startTime,
      };

      if (createSlotFormRef.current.reportValidity()) {
        if (editSlot) {
          // Update existing slot
          const config = {
            url: `http://43.204.119.135/api/dvp_app/studio_slots/${editSlot.slot_id}/`,
            method: "PUT",
            data,
          };
          const response = await axios(config);
          if (response.status === 200) {
            message.success("Slot Updated!");
            setEditSlot(null);
            setHighlightedSlot(null);
          } else {
            console.log("Error");
          }
        } else {
          // Create new slot
          const config = {
            url: `http://43.204.119.135/api/dvp_app/studio_slots/`,
            method: "POST",
            data,
          };
          const response = await axios(config);
          if (response.status === 201) {
            message.success("Slot Created!");
          } else {
            console.log("Error");
          }
        }
        setSelectedStudioName("");
        setInterval(null);
        setStartTime("");
        fetchStudioSlots();
      } else {
        console.log("Form is invalid, show validation errors");
      }
    } catch (error) {
      message.warning(error.message);
    }
  };

  const handleEditStudio = (record) => {
    setEditStudio(record);
    setStudioName(record.studio_name);
    setStudioType(record.studio_type);
    setHighlightedSlot(record.slot_id);
    setHighlightedRow(record.studio_id);
  };

  const handleEditSlot = (record) => {
    setEditSlot(record);
    setSelectedStudioName(record.studio.studio_id);
    setInterval(record.duration);
    setStartTime(record.start_time);
    setHighlightedRow(record.slot_id);
  };

  const showDeleteConfirm = (deleteFn, id, name) => {
    confirm({
      title: `Are you sure delete this ${name}?`,
      content: "This action cannot be undone.",
      onOk() {
        deleteFn(id);
      },

      onCancel() {
        console.log("Cancel");
      },
    });
    setTimeout(() => {
      fetchStudioSlots();
    }, 2000);
  };

  const handleDeleteStudio = async (studioId) => {
    try {
      const response = await axios.delete(
        `http://43.204.119.135/api/dvp_app/studios/${studioId}`
      );

      message.success("Studio Deleted!");
      fetchStudioData();
    } catch (error) {
      message.warning(error.message);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    try {
      const response = await axios.delete(
        `http://43.204.119.135/api/dvp_app/studio_slots/${slotId}`
      );
      if (response.status === 200) {
        message.success("Slot Deleted!");
        fetchStudioSlots();
      } else {
        console.log("Error");
      }
    } catch (error) {
      message.warning(error.message);
    }
  };

  const columns = [
    {
      title: "Studio Name",
      dataIndex: "studio_name",
      key: "studio_name",
    },
    {
      title: "Studio Type",
      dataIndex: "studio_type",
      key: "studio_type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <img
            style={{ cursor: "pointer" }}
            alt="edit"
            src={edit}
            onClick={() => handleEditStudio(record)}
          />
          <img
            alt="del"
            src={delet}
            // onClick={() => handleDeleteStudio(record.studio_id)}
            onClick={() =>
              showDeleteConfirm(handleDeleteStudio, record.studio_id, "Studio")
            }
            style={{ marginLeft: "8px", cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];

  const columnsSlot = [
    {
      title: "Studio Name",
      dataIndex: "studio_name",
      key: "studio_name",
      render: (_, record) => record.studio.studio_name,
    },
    {
      title: "Studio Type",
      dataIndex: "studio_type",
      key: "studio_type",
      render: (_, record) => record.studio.studio_type,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => `${duration} min`,
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <img
            style={{
              cursor: "pointer",
              backgroundColor:
                highlightedSlot === record.slot_id ? "red" : "none",
            }}
            src={edit}
            onClick={() => handleEditSlot(record)}
            alt="edit"
          />
          <img
            src={delet}
            onClick={() =>
              showDeleteConfirm(handleDeleteSlot, record.slot_id, "slot")
            }
            style={{ marginLeft: "8px", cursor: "pointer" }}
            alt="delete"
          />
        </div>
      ),
    },
  ];

  const handleStudioName = (value) => {
    setSelectedStudioName(value);
  };
  const handleInterval = (time) => {
    setInterval(time ? time.minute() : null);
  };
  const handleStartTime = (time) => {
    setStartTime(time ? time.format("HH:mm:ss") : null);
  };
  const disabledTime = () => ({
    disabledHours: () => Array.from({ length: 24 }, (_, i) => i), // Disable all hours
    disabledSeconds: () => Array.from({ length: 60 }, (_, i) => i), // Disable all seconds
  });

  return (
    <div className="studio">
      <SideBar />
      <div className="studio-settings">
        <div className="studio-heading">Studio Settings</div>
        <div className="studio-dropdown">
          <div style={{ width: "300px" }}>
            <Select
              style={{ width: "86%" }}
              placeholder="Select Studio Setting"
              onChange={handleSettingChange}
              allowClear
            >
              <Option value="makeStudio">Make Studio</Option>
              <Option value="createSlots">Create Slots</Option>
              <Option value="closure">Closure Dates for Studio</Option>
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedSetting === "makeStudio" && (
              <>
                {/* <h2>{editStudio ? "Edit Studio" : "Create Studio"}</h2> */}
                <form ref={makeStudioFormRef}>
                  <Input
                    placeholder="Studio Name"
                    style={{ margin: "10px 0", width: "200px" }}
                    required
                    value={studioName}
                    onChange={(e) => setStudioName(e.target.value)}
                  />

                  <Select
                    required
                    style={{
                      width: "200px",
                      marginLeft: "20px",
                      marginRight: "10px",
                    }}
                    value={studioType}
                    onChange={handleStudioType}
                    placeholder="Select Studio Type"
                    allowClear
                  >
                    <Option value="Theory">Theory</Option>
                    <Option value="Practical">Practical</Option>
                  </Select>

                  <Button onClick={handleMakeStudio}>
                    {editStudio ? "Update Studio" : "Make Studio"}
                  </Button>
                </form>
              </>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedSetting === "createSlots" && (
              <>
                <form ref={createSlotFormRef}>
                  <Select
                    placeholder="Studio Name"
                    required
                    style={{
                      width: "200px",
                      marginLeft: "20px",
                      marginRight: "10px",
                    }}
                    value={selectedStudioName}
                    onChange={handleStudioName}
                  >
                    {studioNameOption &&
                      studioNameOption.map((item) => (
                        <Option value={item?.studio_id} key={item?.studio_id}>
                          {item?.studio_name}
                        </Option>
                      ))}
                  </Select>
                  <TimePicker
                    placeholder="Select Interval (Minutes)"
                    style={{ width: "200px" }}
                    format="mm"
                    required
                    value={interval !== null ? dayjs().minute(interval) : null}
                    onChange={handleInterval}
                  />

                  {/* <TimePicker
                    placeholder="Start Time"
                    style={{
                      width: "200px",
                      marginLeft: "20px",
                      marginRight: "12px",
                    }}
                    onChange={handleStartTime}
                    required
                    format="HH:mm:ss"
                    value={startTime ? dayjs(startTime, "HH:mm:ss") : null}
                  /> */}
                  <TimePicker
                    placeholder="Start Time"
                    style={{
                      width: "200px",
                      marginLeft: "20px",
                      marginRight: "12px",
                    }}
                    onChange={handleStartTime}
                    required
                    format="HH:mm:ss"
                    value={startTime ? dayjs(startTime, "HH:mm:ss") : null}
                    disabledHours={() => {
                      const hours = [];
                      for (let i = 0; i < 24; i++) {
                        if (i < 9 || i > 17) {
                          hours.push(i);
                        }
                      }
                      return hours;
                    }}
                    disabledMinutes={(selectedHour) => {
                      const minutes = [];
                      if (selectedHour === 9 || selectedHour === 17) {
                        for (let i = 1; i < 60; i++) {
                          minutes.push(i);
                        }
                      }
                      return minutes;
                    }}
                  />

                  <Button onClick={handleCreateSlot}>
                    {editSlot ? "Update Slot" : "Create Slot"}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
        {selectedSetting === "makeStudio" && (
          <div className="studio-record">
            <Table
              style={{ width: "80%" }}
              dataSource={studioData}
              columns={columns}
              rowKey="studio_id"
              pagination={{ pageSize: 5 }}
              bordered
              className="styled-table"
              rowClassName={(record) =>
                record.studio_id === highlightedRow ? "highlighted-row" : ""
              }
            />
          </div>
        )}

        {selectedSetting === "createSlots" && (
          <>
            <div className="studio-record">
              <Table
                style={{ width: "80%" }}
                dataSource={slotData}
                columns={columnsSlot}
                rowKey="slot_id"
                pagination={{ pageSize: 5 }}
                bordered
                className="styled-table"
                rowClassName={(record) =>
                  record.slot_id === highlightedRow ? "highlighted-row" : ""
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudioSettings;
