import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../Components/searchForm";

// Framer motion
import { motion } from "framer-motion";
const dashboardVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      delay: 0.5,
      stiffness: 45,
      damping: 10,
    },
  },
  exit: {
    y: "-100vh",
    transition: { ease: "easeOut", stiffness: 75, damping: 8 },
  },
};

export default function dashboard() {
  return (
    <>
      {/* variants={dashboardVariants} initial="hidden" animate="visible" exit="exit" */}
      <motion.div variants={dashboardVariants} initial="hidden" animate="visible" exit="exit" className="flex items-center container min-h-[85vh]">
        <Link to="/"></Link>
        <SearchForm />
      </motion.div>
    </>
  );
}
