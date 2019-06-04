import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const ArtList = () => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Preview</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>preview</TableCell>
            <TableCell>Zelfportret</TableCell>
            <TableCell>Rembrandt van Rijn</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ArtList;
