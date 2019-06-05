/* ===== *\
   React
\* ===== */
import React from "react";

/* =========== *\
   Material-UI
\* =========== */
// In order of appearance
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

function ArtTable({ artList, pageIndex, rowClicked, paginationClicked }) {
  const ROWS_PER_PAGE = 10;

  const TABLE_HEAD_LABELS = ["Thumbnail", "Title", "Title"];

  /* ======================*\
     Content of the table
  \* ======================*/

  const headCells = TABLE_HEAD_LABELS.map(label => {
    return (
      <TableCell
        style={{
          color: "white"
        }}
      >
        {label}
      </TableCell>
    );
  });

  const bodyRows = artList
    // Only take the items corresponding to the current page index
    .filter(({ pageNumber }) => pageNumber === pageIndex)
    // Generate the required JSX elements
    .map(({ pageNumber, objectNumber, preview, title, artist }) => {
      return (
        <TableRow
          hover
          key={objectNumber}
          onClick={() => rowClicked(objectNumber)}
          style={{ cursor: "pointer" }}
        >
          <TableCell>
            {/* If there is no image, we return null */}
            {preview ? (
              <img src={preview} alt={`Preview of ${title} by ${artist}`} />
            ) : null}
          </TableCell>
          <TableCell style={{ fontWeight: "300" }}>{title}</TableCell>
          <TableCell style={{ fontWeight: "300" }}>{artist}</TableCell>
        </TableRow>
      );
    });

  return (
    <Paper>
      <Table>
        <TableHead
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.87)"
          }}
        >
          <TableRow>{headCells}</TableRow>
        </TableHead>
        <TableBody>{bodyRows}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              page={pageIndex}
              rowsPerPage={ROWS_PER_PAGE}
              // No idea how many records there are, no easy way to find out. So taking a high enough number (= 10000)
              count={670920}
              // Passing an empty array, omits the option for the user to choose a number of rows per page
              rowsPerPageOptions={[]}
              onChangePage={paginationClicked}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}

export default ArtTable;
