import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  StackDivider,
  VStack,
  HStack,
  Center,
  Link
} from "@chakra-ui/react";
import {Link as RouterLink} from "react-dom"
import DataTable from "../components/DataTable";
import axios from "axios";

const SearchPage = () => {
  const [queryResults, setQueryResults] = useState([]);
  const [queryString, setQueryString] = useState("");

  const handleChange = (e) => {
    setQueryString(e.target.value);
  };

  const handleSubmit = async () => {
    const qString = `http://127.0.0.1:8000/query/${queryString}`;
    const result = await axios.get(qString);
    const { data } = result;
    setQueryResults(data);
  };
  return (
    <>
      <VStack
        spacing={4}
        align="stretch"
      >
        <Box>
          <Heading marginBottom="4">Wikipedia Search Engine</Heading>
        </Box>
        <Box>
          <p>This search engine was built in python for webscraped pages from wikipedia</p>
          <p>For more information about the project check the <Link as={RouterLink} to="/about" fontWeight="bold">About page</Link></p>
        </Box>
        <Box>
          <InputGroup marginTop="5" marginBottom="3">
            <HStack spacing={10}>
            <Input placeholder="Enter query"  onChange={handleChange} />
            <Button  paddingX="10" onClick={handleSubmit}>
              Search
            </Button>
            </HStack>
          </InputGroup>
          <Box border="2px" borderRadius="16px" borderColor="InactiveBorder">
          <DataTable queryResults={queryResults} />
          </Box>
          </Box>
      </VStack>
    </>
  );
};

export default SearchPage;
