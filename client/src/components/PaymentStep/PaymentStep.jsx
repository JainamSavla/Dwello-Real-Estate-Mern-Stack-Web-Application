import React, { useContext, useState } from "react";
import { Box, Button, Group, Text } from "@mantine/core";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { createListingCheckout } from "../../utils/api";

const PaymentStep = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  const listingFee = import.meta.env.VITE_LISTING_FEE || "100";
  const listingCurrency = import.meta.env.VITE_LISTING_CURRENCY || "INR";

  const handleCheckout = async () => {
    const authToken = token || localStorage.getItem("access_token");
    if (!authToken) {
      toast.error("Please login first to add a property", {
        position: "bottom-right",
      });
      return;
    }

    const dataToStore = {
      ...propertyDetails,
      userEmail: propertyDetails.userEmail || user?.email,
    };

    if (!dataToStore.userEmail) {
      toast.error("Missing user email. Please login again.", {
        position: "bottom-right",
      });
      return;
    }

    setPropertyDetails((prev) => ({ ...prev, userEmail: dataToStore.userEmail }));

    localStorage.setItem("pending_listing", JSON.stringify(dataToStore));

    try {
      setIsLoading(true);
      const { url } = await createListingCheckout(authToken);
      if (!url) {
        throw new Error("Missing checkout URL");
      }
      window.location.href = url;
    } catch (error) {
      toast.error("Unable to start payment. Please try again.", {
        position: "bottom-right",
      });
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setOpened(false);
    setActiveStep(0);
  };

  return (
    <Box maw="40%" mx="auto" my="sm">
      <Text size="lg" weight={600} mb="xs">
        Listing Fee
      </Text>
      <Text color="dimmed" mb="md">
        Pay a one-time fee to publish your property listing.
      </Text>
      <Text size="xl" weight={700} mb="xl">
        {listingFee} {listingCurrency}
      </Text>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep} disabled={isLoading}>
          Back
        </Button>
        <Button color="green" onClick={handleCheckout} loading={isLoading}>
          Pay and Publish
        </Button>
        <Button variant="subtle" color="gray" onClick={handleCancel}>
          Cancel
        </Button>
      </Group>
    </Box>
  );
};

export default PaymentStep;
