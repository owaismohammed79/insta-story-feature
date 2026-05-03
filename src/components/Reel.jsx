import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if(index < reelLength - 1) setIndex((ind) => ind + 1);
      else handleRightClick()
    }, 5000)

    return () => clearTimeout(timer)
  }, [index, userIndex])

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
    <div className="h-full w-full shrink-0 snap-center flex snap-x snap-mandatory perspective-[1000px]" >
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
          <div className="absolute top-0 left-0 w-full z-20 pt-8 pb-12 px-4 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border-2 border-white/50 overflow-hidden bg-gray-600 shrink-0">
                <img 
                  src={`https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg`} 
                  alt="avatar" 
                />
              </div>
              
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm tracking-wide drop-shadow-md">
                  {user.username}
                </span>
                <span className="text-white/70 text-xs font-medium">
                  Original Audio
                </span>
              </div>
            </div>
          </div>
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
