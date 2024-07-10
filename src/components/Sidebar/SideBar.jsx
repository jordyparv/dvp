import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { RiListSettingsFill } from "react-icons/ri";
import { BiCog, BiLogOut, BiSearch } from "react-icons/bi";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { SiCoursera } from "react-icons/si";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/loginSlice"; // Adjust the path as needed

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/courseSettings",
    name: "Admin Settings",
    icon: <BiCog />,
    subRoutes: [
      {
        path: "/admin-settings",
        name: "User Configuration",
        icon: <RiListSettingsFill />,
      },

      {
        path: "/add-user",
        name: "Add User",
        icon: <FaUser />,
      },
      {
        path: "/erf",
        name: "Employee Registration Form",
        icon: <FaMoneyBill />,
      },
      {
        path: "/slot-coordinator",
        name: "Slot Coordinator",
        icon: <BsCartCheck />,
      },
    ],
  },
  {
    path: "/file-manager",
    name: "Academic Settings",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/course-settings",
        name: "Course Settings",
        icon: <SiCoursera />,
      },

      {
        path: "/course-allotment",
        name: "Course Allotment",
        icon: <FaMoneyBill />,
      },
      {
        path: "/program-coordinator",
        name: "Program Coordinator",
        icon: <FaMoneyBill />,
      },
      {
        path: "/view-lesson",
        name: "View Lesson Plan",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/slot-booking",
    name: "Slot Booking",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "/book-slot",
        name: "Book Slot",
        icon: <SiCoursera />,
      },

      {
        path: "/view-slots",
        name: "View Slots",
        icon: <FaMoneyBill />,
      },
      
    ],
  },
  {
    path: "/productionSettings",
    name: "Production Settings",
    icon: <BiCog />,
    subRoutes: [
      {
        path: "/studioSettings",
        name: "Studio Settings",
        icon: <RiListSettingsFill />,
      },
    ],
  },

 
 
  {
    path: "/lesson-plan",
    name: "Lesson Plan",
    icon: <BsCartCheck />,
  },
  {
    path: "/settings",
    name: "Studio",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/Studio",
        name: "Studio",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "Camera Man",
        icon: <FaLock />,
      },
      {
        path: "/settings/billing",
        name: "Pendings",
        icon: <FaMoneyBill />,
      },
    ],
  },
  // {
  //   path: "/production-settings",
  //   name: "Production Settings",
  //   icon: <BiCog />,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       path: "/Studio",
  //       name: "Studio",
  //       icon: <FaUser />,
  //     },
  //     {
  //       path: "/settings/2fa",
  //       name: "Camera Man",
  //       icon: <FaLock />,
  //     },
  //     {
  //       path: "/settings/billing",
  //       name: "Pendings",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },
  {
    path: "/",
    name: "Logout",
    icon: <BiLogOut />,
    action: "logout",
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const permissions = JSON.parse(localStorage.getItem("permissions")) || [];

  // Filter the routes excluding Dashboard and Logout
  const filteredRoutes = routes.filter((route) => {
    if (route.name === "Dashboard" || route.name === "Logout") {
      return false;
    }
    if (!route.subRoutes) {
      return permissions.includes(route.name);
    } else {
      if (permissions.includes(route.name)) {
        return true;
      }
      route.subRoutes = route.subRoutes.filter((subRoute) =>
        permissions.includes(subRoute.name)
      );
      return route.subRoutes.length > 0;
    }
  });

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "300px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          style={{ height: "auto", minHeight: "100vh" }}
          animate={{
            width: isOpen ? "300px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Production Monitor
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            <NavLink to="/dashboard" className="link" activeClassName="active">
              <div className="icon">
                <FaHome />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    Dashboard
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
            {filteredRoutes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
          <div className="bottom_section">
            <div className="link" onClick={handleLogout}>
              <div className="icon">
                <BiLogOut />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    Logout
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
