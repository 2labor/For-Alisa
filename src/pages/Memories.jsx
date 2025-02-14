import React from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import MemoryCell from "../components/MemoryCell";

const Memories = (props) => {
  return (
    <div>
      <div className="container">
        <MemoryCell/>
      </div>
    </div>
  )
};

export default Memories;
