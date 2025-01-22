import {
  Button,
  Flex,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { ColorIcon } from "./StatusCell";
import FilterIcon from "./icons/FilterIcon";
import { STATUSES } from "../data";

const StatusItem = ({ status, setColumnFilters, isActive }) => (
  <Flex
    align="center"
    cursor="pointer"
    borderRadius={5}
    fontWeight="bold"
    p={1.5}
    bg={isActive ? "gray.800" : "transparent"}
    _hover={{
      bg: "gray.800",
    }}
    onClick={() =>
      setColumnFilters(
        // {
        //   id: "status",
        //   value: [1],
        // }

        (prev) => {
          const statuses = prev.find((filter) => filter.id === "status")?.value;
          if (!statuses) {
            return prev.concat({
              id: "status",
              value: [status.id],
            });
          }
          return prev.map((f) =>
            f.id === "status"
              ? {
                  ...f,
                  value: isActive
                    ? statuses.filter((s) => s !== status.id)
                    : statuses.concat(status.id),
                }
              : f
          );
        }
      )
    }
  >
    <ColorIcon color={status.color} mr={3} />
    {status.name}
  </Flex>
);

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  const filterStatuses =
    columnFilters.find((f) => f.id === "status")?.value || [];

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button size="sm" leftIcon={<Icon as={FilterIcon} fontSize={18} />}>
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Text fontSize="md" fontWeight="bold" md={4}>
            Filter By:
          </Text>
          <Text fontWeight="bold" color="gray.400" mb={1}>
            Status
          </Text>
          <VStack align="flex-start" spacing={1}>
            {STATUSES.map((status) => (
              <StatusItem
                isActive={filterStatuses.includes(status.id)}
                status={status}
                setColumnFilters={setColumnFilters}
                key={status.id}
              />
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;

// 46:36
