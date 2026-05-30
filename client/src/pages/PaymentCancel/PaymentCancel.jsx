import React from "react";
import { Box, Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <Box maw={520} mx="auto" my="xl" p="md">
      <Text size="xl" weight={700} mb="xs">
        Payment Canceled
      </Text>
      <Text color="dimmed" mb="lg">
        Your listing is not published yet. You can return and try again.
      </Text>
      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </Box>
  );
};

export default PaymentCancel;
