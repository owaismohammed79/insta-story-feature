import React, { useState } from "react";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import data from "../data/reelData.json";
import { motion, AnimatePresence } from "framer-motion";

const Reel = ({ userIndex, setUserIndex, totalUsers }) => {
  const [index, setIndex] = useState(0);
  const dimensions = { width: window.innerWidth};
  const user = data.data[userIndex]
  const reelLength = user.reels.length
  console.log("reel Index", index)
  console.log("User iNDEX", userIndex)

  function handleRightClick(e){
    e?.stopPropagation()
    setUserIndex(prev => prev < totalUsers-1 ? prev+1 : prev)
  }

  function handleLeftClick(e) {
    e?.stopPropagation()
    setUserIndex(prev => prev > 0 ? prev-1 : prev)
  }
  

  function handleClick(e) {
    if (e.clientX <= dimensions.width/2) {
      if(index > 0) setIndex((ind) => ind - 1)
      else handleLeftClick()
    } else {
      if(index < reelLength - 1) setIndex((ind) => ind + 1);
      else handleRightClick()
    }
  }

  return (
    <div className="h-full w-full shrink-0 snap-center relative flex overflow-x-scroll snap-x snap-mandatory" style={{ perspective: '1000px' }}>
        <AnimatePresence mode="wait">
        <motion.div
          key={userIndex}
          initial={{ opacity: 0, rotateY: 90, x: 100 }} 
          animate={{ opacity: 1, rotateY: 0, x: 0 }}
          exit={{ opacity: 0, rotateY: -90, x: -100 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="h-full w-full relative"
          onClick={handleClick}
        >
          <h3 className="absolute z-10 text-2xl px-4 py-4 font-bold text-white bg-gray-400 w-full">
            {user.username}
          </h3>
          <button onClick={handleLeftClick}>
            <ChevronLeftCircle className="absolute left-1 top-1/2 z-10 rounded-full bg-white" />
          </button>
          <div className="w-screen h-screen overflow-hidden relative shrink-0">
            <img
              src={user.reels[index].imageUrl}
              alt="Story image"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <button onClick={handleRightClick}><ChevronRightCircle className="absolute right-1 top-1/2 z-10 rounded-full bg-white" /></button>
        </motion.div>
        </AnimatePresence>
    </div>
  );
};

export default Reel;
