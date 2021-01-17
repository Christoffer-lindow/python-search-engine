import {
  Link,
  Table,
  TableCaption,
  Td,
  Th,
  Thead,
  Tr,
  Tbody,
} from "@chakra-ui/react";
import React from "react";

const DataTable = ({ queryResults, time, count }) => {

  const formatDecimalts = (number) => {
    return Math.round((number + Number.EPSILON) * 1000) / 1000
  }

  return (
    <Table variant="simple" size="sm">
      <TableCaption>
        {queryResults.length === 0
          ? "Weights: Contet = 1, Location = 0.8"
          : `${count} results in ${formatDecimalts(time)} seconds`}
      </TableCaption>
      <Thead>
        <Tr>
          <Th>Link</Th>
          <Th isNumeric>Score</Th>
          <Th isNumeric>Content</Th>
          <Th isNumeric>Location</Th>
        </Tr>
      </Thead>
      <Tbody>
        {queryResults.length === 0 ? (
          <Tr></Tr>
        ) : (
          queryResults.map((result) => (
            <Tr key={result.page_url}>
              <Td>
                <Link to={result.page_url}>{result.page_name}</Link>
              </Td>
              <Td isNumeric>
                {formatDecimalts(result.page_score)}
              </Td>
              <Td isNumeric>
                {formatDecimalts(result.freq_score)}
              </Td>
              <Td isNumeric>
                {formatDecimalts(result.loc_score)}
              </Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  );
};

export default DataTable;
