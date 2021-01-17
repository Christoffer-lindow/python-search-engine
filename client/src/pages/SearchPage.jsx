import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  VStack,
  HStack,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import DataTable from "../components/DataTable";
import axios from "axios";

const SearchPage = () => {
  const [queryResults, setQueryResults] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [queryTime, setQueryTime] = useState(null);
  const [numberOfResults, setNumberOfResults] = useState(null);

  const handleChange = (e) => {
    setQueryString(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const qString = `http://127.0.0.1:8000/query/${queryString}`;
    const result = await axios.get(qString);
    const { data } = result;
    setQueryResults(data[0].results);
    setNumberOfResults(data[1].count);
    setQueryTime(data[2].time);
  };
  return (
    <>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading marginBottom="4">Wikipedia Search Engine</Heading>
        </Box>
        <Box>
          <p>
            This search engine was built in python for webscraped pages from
            wikipedia
          </p>
          <p>
            For more information about the project check the{" "}
            <Link as={RouterLink} to="/about" fontWeight="bold">
              About page
            </Link>
          </p>
        </Box>
        <Box>
          <form onSubmit={(e) =>handleSubmit(e)}>
            <InputGroup marginTop="5" marginBottom="3">
              <HStack spacing={10}>
                <Input type ="text" placeholder="Enter query" onChange={handleChange}variant="outline" focusBorderColor="black" />
                <Button paddingX="10"  type="submit" color="black" bgColor="white" border="1px" borderColor="gray" focusBorderColor="black">
                  Search
                </Button>
              </HStack>
            </InputGroup>
          </form>
          <Box border="2px" borderRadius="16px" borderColor="InactiveBorder">
            <DataTable
              queryResults={queryResults}
              count={numberOfResults}
              time={queryTime}
            />
          </Box>
        </Box>
      </VStack>
    </>
  );
};

export default SearchPage;
