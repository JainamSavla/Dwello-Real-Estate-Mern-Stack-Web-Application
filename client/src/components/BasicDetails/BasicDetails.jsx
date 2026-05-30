import React from "react";
import {
  TextInput,
  Box,
  Textarea,
  Group,
  Button,
  NumberInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
      rentPrice: propertyDetails.rentPrice,
      listingType: propertyDetails.listingType || "sale",
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      listingType: (value) => validateString(value),
      price: (value, values) =>
        values.listingType === "sale" && value < 1000
          ? "Must be greater than 999"
          : null,
      rentPrice: (value, values) =>
        values.listingType === "rent" && value < 1
          ? "Must be greater than 0"
          : null,
    },
  });

  const { title, description, price, rentPrice, listingType } = form.values


  const handleSubmit = () => {
    const {hasErrors} = form.validate()
    if(!hasErrors) {
     const resolvedPrice = listingType === "rent" ? rentPrice : price;
     setPropertyDetails((prev)=> ({
      ...prev,
      title,
      description,
      price: resolvedPrice,
      rentPrice,
      listingType,
    }))
     nextStep()
    }
   }
  return (
    <Box maw="50%" mx="auto" my="md">
      <form  onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <Select
          withAsterisk
          label="Listing Type"
          data={[
            { value: "sale", label: "Selling" },
            { value: "rent", label: "Rent" },
          ]}
          {...form.getInputProps("listingType")}
        />
        <NumberInput
          withAsterisk={listingType === "sale"}
          label="Selling Price"
          placeholder="1000"
          min={0}
          disabled={listingType !== "sale"}
          {...form.getInputProps("price")}
        />
        <NumberInput
          withAsterisk={listingType === "rent"}
          label="Rent Price"
          placeholder="100"
          min={0}
          disabled={listingType !== "rent"}
          {...form.getInputProps("rentPrice")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">
            Next step
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
