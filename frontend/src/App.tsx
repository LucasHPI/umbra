import { useEffect, useState } from "react";
import Header from "./components/Header";
import SideDrawer from "./components/SideDrawer";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

type HeartRateResponse = {
  response: {
    practitionerName: string;
    patientName: string;
    heartRate: number[];
  }[];
};

function App() {
  const userInfoEndpoint: string = import.meta.env.VITE_USER_INFO_ENDPOINT;
  //const name = "Mirosmar";
  const [patientInfo, setPatientInfo] = useState<HeartRateResponse>({ response: [] });

    useEffect(() => {
    axios
      .get(`${userInfoEndpoint}/retrieveUserInfo?patientName=${name}}`)
      .then((response) => {
        setPatientInfo(response.data);
      });
  });
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
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Practitioner Name</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>Heart Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientInfo.response.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.practitionerName}</TableCell>
              <TableCell>{item.patientName}</TableCell>
              <TableCell>{item.heartRate.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default App;
