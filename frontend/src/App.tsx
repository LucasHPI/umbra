import { useState } from "react";
import Header from "./components/Header";
import SideDrawer from "./components/SideDrawer";
import { Box, Typography } from "@mui/material";
//import axios from "axios";

function App() {
  //const userInfoEndpoint: string = import.meta.env.VITE_USER_INFO_ENDPOINT;
  //const name = "Mirosmar";
  //const [patientInfo, setPatientInfo] = useState<string[]>([]);

  /*   useEffect(() => {
    axios
      .get(`${userInfoEndpoint}/retrieveUserInfo?patientName=${name}}`)
      .then((response) => {
        setPatientInfo(response.data);
      });
  }); */
  const drawerWidth = 240;
  const [isClosing, setIsClosing] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const userName = "Mirosmar";

  return (
    <>
      <Header
        isClosing={isClosing}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <SideDrawer
        mobileOpen={mobileOpen}
        setIsClosing={setIsClosing}
        setMobileOpen={setMobileOpen}
      />
      <Box
        component="div"
        sx={{
          marginLeft: isClosing ? "0px" : `${drawerWidth}px`,
          marginTop: "64px",
          minHeight: `100vh`,
          minWidth: "100vw",
          display: "flex"
        }}
      >
        <Box sx={{marginLeft: "48px", marginTop: `${48}px`}}>
          <Typography variant="h3">Welcome, {userName}</Typography>
          
        </Box>
      </Box>
    </>
  );
}

export default App;
