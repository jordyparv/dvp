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
import { logout } from "../../redux/Slice/loginSlice";  // Adjust the path as needed

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/courseSettings",
    name: "Settings",
    icon: <BiCog />,
    subRoutes: [
      {
        path: "/admin-settings",
        name: "Admin Settings",
        icon: <RiListSettingsFill />,
      },
      {
        path: "/course-settings",
        name: "Course Settings",
        icon: <SiCoursera />,
      },
    ],
  },
  {
    path: "/file-manager",
    name: "Form Manager",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
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
        path: "/course-allotment",
        name: "Course Allotment",
        icon: <FaMoneyBill />,
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

  const filteredRoutes = routes.filter(route => {
    if (!route.subRoutes) {
      return permissions.includes(route.name);
    } else {
      route.subRoutes = route.subRoutes.filter(subRoute => permissions.includes(subRoute.name));
      return route.subRoutes.length > 0 || permissions.includes(route.name);
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
        <motion.div style={{ height: "auto", minHeight: "100vh" }}
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

              return route.action === "logout" ? (
                <div
                  key={index}
                  className="link"
                  onClick={handleLogout}
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
                </div>
              ) : (
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
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;