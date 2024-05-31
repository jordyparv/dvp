import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { RiListSettingsFill } from "react-icons/ri";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { SiCoursera } from "react-icons/si";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  // {
  //   path: "/production",
  //   name: "Production",
  //   icon: <FaUser />,
  // },
  // {
  //   path: "/messages",
  //   name: "Messages",
  //   icon: <MdMessage />,
  // },
  // {
  //   path: "/settings",
  //   name: "Admin Settings",
  //   icon: <BiAnalyse />,
  // },
  {
    path: "/courseSettings",
    name: "Settings",
    icon: <BiCog />,
    subRoutes : [
      {
        path: "/admin-settings",
        name: "Admin Settings",
        icon: <RiListSettingsFill  />,
      },
      {
        path: "/course-settings",
        name: "Course Settings",
        icon:<SiCoursera  />,
      },
    ]
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
      // {
      //   path: "/psf",
      //   name: "Programme Setting Form ",
      //   icon: <FaUser />,
      // },
      // {
      //   path: "/pcf",
      //   name: "Programme Commencement Form",
      //   icon: <FaLock />,
      // },
      {
        path: "/erf",
        name: "Employee Registration Form",
        icon: <FaMoneyBill />,
      },
      {
        path: "/ccf",
        name: "Create Course Form",
        icon: <FaMoneyBill />,
      },
      {
        path: "/ces",
        name: "Create Exam Schedule Form",
        icon: <FaMoneyBill />,
      },
      {
        path: "/course-allotment",
        name: " Course Allotment",
        icon: <FaMoneyBill />,
      },
      {
        path: "/assign-role",
        name: "Assign Role",
        icon: <FaMoneyBill />,
      },
      {
        path: "/plpp",
        name: "Propose Lesson Plan Form",
        icon: <FaMoneyBill />,
      },
      {
        path: "/aplpf",
        name: "Approve Propose Lesson Plan Form",
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
        name: "Studio ",
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
  //   path: "/",
  //   name: "Logout",
  //   icon: <AiFillHeart />,
  // },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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

  return (
    <>
      <div className="main-container">
        <motion.div style={{height:"auto", minHeight:"100vh"}}
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
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
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
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;


