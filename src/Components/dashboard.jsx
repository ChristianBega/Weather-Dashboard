import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../Components/searchForm";

// Framer motion
import { motion } from "framer-motion";

const dashboardVariants = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      delay: 0.3,
      duration: 0.5,
      type: "spring",
      stiffness: 200,
      velocity: 1,
      damping: 10,
      ease: "easeInOut",
    },
  },

  exit: {
    when: "afterChildren",
    y: "-100vh",
    transition: { ease: "easeInOut" },
  },
};
export default function dashboard() {
  return (
    <>
      <motion.div variants={dashboardVariants} initial="hidden" animate="visible" exit="exit" className="container min-h-fit mt-10">
        <Link to="/"></Link>
        <SearchForm />
      </motion.div>
    </>
  );
}
