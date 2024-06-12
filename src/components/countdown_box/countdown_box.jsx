import React, { useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";

const CountDownBox = () => {
  const [hour, setHour] = useState(23);
  const [min, setMin] = useState(57);
  const [sec, setSec] = useState(35);

  useEffect(() => {
    const timerId = setInterval(() => {
      setSec((prevSec) => {
        if (prevSec === 0) {
          setSec(59);
          setMin((prevMin) => {
            if (prevMin === 0) {
              setMin(59);
              setHour((prevHour) => {
                if (prevHour === 0) {
                  return 0;
                }
                return prevHour - 1;
              });
            }
            return prevMin - 1;
          });
        }
        return prevSec - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [hour, min, sec]);
  

  return (
    <Box flex className="gap-2" alignItems="center">
      <Box className="border bg-black text-white rounded-md" p={2}>
        {hour}
      </Box>
      <Box>:</Box>
      <Box className="border bg-black text-white rounded-md" p={2}>
        {min}
      </Box>
      <Box>:</Box>
      <Box className="border bg-black text-white rounded-md" p={2}>
        {sec}
      </Box>
    </Box>
  );
};

export default CountDownBox;
