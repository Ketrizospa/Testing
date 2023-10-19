import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  width: "90%",
  display: "flex",
  flexDirection: "column",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

function Login({ onRequestNotificationPermission, setUserName }) {
  const [open, setOpen] = useState(false);
  const [isVeupBg, setVeupBg] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setVeupBg(true); // Enable the background
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //console.log(data.get("name"));
    setUserName(data.get("name"));
    onRequestNotificationPermission();
    // Open the notification settings modal
    handleOpen();
  };

  return (
    <>
      {isVeupBg && (
        <Box
          sx={{
            backgroundImage: `url(${require("../../assets/dummy2.jpg")})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundColor: "black",
            position: "fixed",
            backgroundAttachment: "center",
            width: "100vw",
            height: "100vh",
          }}
        ></Box>
      )}

      {!isVeupBg && (
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ textAlign: "center" }}
            >
              Before commencing, kindly provide your name to enable access to
              the push notification feature.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            {Notification.permission === "granted" && (
              <Stack direction={"column"} mb={3}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  textAlign="center"
                  component="h2"
                  mb={3}
                >
                  "🔔 Stay In the Know! 🔔"
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  We use notifications for:
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
                    columnGap: 3, // Corrected typo
                  }}
                >
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    📬 Important updates
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    📦 Report Status
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    ✨ New Features
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    🤖 Alerts
                  </Typography>
                </Box>
                <Typography id="transition-modal-description" sx={{ mt: 3 }}>
                  Make sure you 'Enable Notifications' in the browser settings.
                  We promise not to overwhelm you. You can customize your
                  notification preferences anytime in settings.
                </Typography>
              </Stack>
            )}
            {Notification.permission !== "granted" && (
              <Box>
                <Typography id="transition-modal-description" sx={{ mb: 4 }}>
                  You have currently not enabled browser notifications for this
                  site. To receive notifications, please grant notification
                  permissions in your browser settings and refresh the page.
                </Typography>
              </Box>
            )}
            <Button
              onClick={() => {
                handleClose();
                setVeupBg(true);
              }}
              sx={{ alignSelf: "flex-end" }}
              variant="contained"
              color="success"
            >
              Got it!
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Login;
