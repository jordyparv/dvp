import { Button, Select } from "antd";
import SideBar from "../components/Sidebar/SideBar";
import send from "../assets/images/send.png";
import { useState } from "react";

const SlotCoordinator = () => {

    const [ selectEmp, setSelectedEmp ] = useState([]);
    const [ empOption, setEmpOption ] = useState([]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div className="production">
          <h5> Slots Coordinator</h5>

          <div className="container" style={{border:"2px solid black", borderRadius:"5px"}}>
            <div className="form-table">
              <form >
                  <label>Select Employee</label>
                <div>
                  <Select
                    style={{ width: "300px" }}
                    placeholder="Select Employee"
                  />
                </div>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"20px", cursor:"pointer"}}>
                 <Button> Add <img style={{width:"25px", marginLeft:"10px"}} src={send} /></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlotCoordinator;
