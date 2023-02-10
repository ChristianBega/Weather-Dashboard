import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "../Components/searchForm";

// Framer motion
import { motion } from "framer-motion";

const dashboardVariants = {
  hidden: {
    when: "beforeChildren",
    x: "100vw",
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 80,
      velocity: 200,
      damping: 12,
      ease: "easeIn",
    },
  },

  exit: {
    when: "afterChildren",
    y: "-100vh",
    transition: { type: "spring", stiffness: 80, velocity: 200, damping: 12, duration: 0.3, ease: "easeOut" },
  },
};
export default function dashboard() {
  return (
    <>
      <motion.div variants={dashboardVariants} initial="hidden" animate="visible" exit="exit" className="flex items-center container min-h-[85vh]">
        <Link to="/"></Link>
        <SearchForm />
      </motion.div>
    </>
  );
}
