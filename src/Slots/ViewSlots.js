import SideBar from "../components/Sidebar/SideBar";


const ViewSlots = () => {



  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ display: "flex" }} className="production">
            <h5>Your Slots</h5>
        </div>
      </div>
    </>
  );
};

export default ViewSlots;
