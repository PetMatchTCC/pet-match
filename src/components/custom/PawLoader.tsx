import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PawLoader = ({ size = 36, color = "#fefefe", ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 150);

    return () => clearInterval(intervalId);
  }, []);

  const blinkFingerAnimation = {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const blinkPawAnimation = {
    opacity: [1, 0.6, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="absolute top-1/2 left-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 474 456"
        fill={color}
        {...props}
      >
        <g
          transform="translate(0,456) scale(0.1,-0.1)"
          stroke="none"
        >
          <motion.path
            animate={currentIndex === 0 ? blinkFingerAnimation : {}}
            transition={{ delay: 0 }}
            d="M396 3089 c-136 -19 -268 -116 -330 -241 -19 -37 -38 -89 -42 -113 -3 -25 -10 -45 -15 -45 -5 0 -9 -77 -9 -172 0 -94 3 -168 7 -164 4 4 12 -19 19 -51 6 -32 27 -100 46 -150 91 -241 265 -436 483 -539 111 -52 179 -68 276 -62 101 5 172 39 253 120 107 107 156 248 156 446 0 381 -224 753 -555 920 -99 49 -188 65 -289 51z"
            fill={"#aaa"}
          />
          <motion.path
            animate={currentIndex === 1 ? blinkFingerAnimation : {}}
            transition={{ delay: 0.4 }}
            d="M1359 4521 c-128 -41 -240 -147 -313 -296 -60 -120 -78 -213 -79 -390 0 -329 113 -618 319 -816 89 -84 148 -124 246 -166 298 -125 596 99 668 504 16 88 8 328 -14 428 -42 189 -117 352 -220 480 -173 215 -416 317 -607 256z"
            fill={"#aaa"}
          />
          <motion.path
            animate={currentIndex === 2 ? blinkFingerAnimation : {}}
            transition={{ delay: 0.8 }}
            d="M3100 4550 c0 -5 -8 -10 -17 -10 -31 0 -178 -78 -238 -127 -173 -140 -309 -416 -346 -698 -15 -119 -6 -299 20 -400 44 -167 147 -328 263 -406 92 -63 157 -83 263 -84 87 0 93 2 185 47 120 59 214 137 291 241 143 192 219 427 219 676 0 268 -53 441 -182 595 -44 52 -156 129 -216 148 -23 7 -42 16 -42 20 0 5 -45 8 -100 8 -60 0 -100 -4 -100 -10z"
            fill={"#aaa"}
          />
          <motion.path
            animate={currentIndex === 3 ? blinkFingerAnimation : {}}
            transition={{ delay: 1.2 }}
            d="M4150 3169 c-126 -34 -221 -91 -331 -199 -98 -97 -142 -157 -203 -277 -116 -233 -149 -537 -79 -728 118 -318 377 -425 678 -280 238 114 435 386 496 683 7 34 17 62 21 62 4 0 8 72 8 160 0 88 -3 160 -8 160 -4 0 -12 22 -19 48 -30 127 -140 281 -240 337 -104 58 -197 68 -323 34z"
            fill={"#aaa"}
          />
          <motion.path
            animate={blinkPawAnimation}
            d="M2228 2174 c-249 -45 -509 -179 -693 -359 -120 -117 -320 -405 -422 -610 -115 -228 -223 -573 -223 -712 0 -126 49 -243 143 -340 64 -67 152 -119 219 -129 21 -4 38 -10 38 -15 0 -5 36 -9 81 -9 51 0 78 4 74 10 -4 6 9 10 33 10 63 0 211 42 437 124 302 111 418 136 615 136 173 0 273 -27 627 -170 107 -44 210 -82 229 -86 19 -3 34 -10 34 -15 0 -5 61 -9 135 -9 76 0 135 4 135 9 0 5 15 13 33 16 54 12 144 65 192 114 164 166 148 427 -51 824 -55 109 -266 430 -376 571 -242 311 -503 523 -746 607 -138 48 -356 62 -514 33z"
            fill={"#aaa"}
          />
        </g>
      </svg>
    </div>
  );
};

export default PawLoader;
