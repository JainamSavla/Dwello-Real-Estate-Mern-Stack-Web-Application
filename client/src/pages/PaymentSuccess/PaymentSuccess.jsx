import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserDetailContext from "../../context/UserDetailContext";
import { confirmListingPayment } from "../../utils/api";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Confirming your payment...");

  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");
    const stored = localStorage.getItem("pending_listing");
    const pendingListing = stored ? JSON.parse(stored) : null;

    if (!sessionId || !pendingListing) {
      setStatus("error");
      setMessage("Missing payment session or listing details.");
      return;
    }

    const authToken = token || localStorage.getItem("access_token");
    if (!authToken) {
      setStatus("error");
      setMessage("Please login again to finish your listing.");
      return;
    }

    const confirm = async () => {
      try {
        await confirmListingPayment(sessionId, pendingListing, authToken);
        localStorage.removeItem("pending_listing");
        setStatus("success");
        setMessage("Your property has been listed successfully.");
        toast.success("Listing published", { position: "bottom-right" });
      } catch (error) {
        setStatus("error");
        setMessage("Payment confirmed, but listing failed. Please contact support.");
        toast.error("Listing failed", { position: "bottom-right" });
      }
    };

    confirm();
  }, [location.search, token]);

  return (
    <Box maw={520} mx="auto" my="xl" p="md">
      <Text size="xl" weight={700} mb="xs">
        Payment Status
      </Text>
      <Text color="dimmed" mb="lg">
        {message}
      </Text>
      <Button onClick={() => navigate("/properties")} disabled={status === "processing"}>
        View Properties
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
