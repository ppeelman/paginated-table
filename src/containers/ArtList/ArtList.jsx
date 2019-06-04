// External imports
import React, { Component } from "react";

// Material-ui imports
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Redux related
import { connect } from "react-redux";
import * as actions from "../../store/actions/index.js";

class ArtList extends Component {
  componentDidMount() {
    this.props.onListArt();
  }

  render() {
    let table = <CircularProgress />;

    if (this.props.artList && !this.props.loading) {
      table = (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>&nbsp;</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Artist</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.artList.map(
                ({ objectNumber, title, artist, preview }) => {
                  return (
                    <TableRow hover key={objectNumber}>
                      <TableCell>
                        <img
                          src={preview}
                          alt={`Preview of ${title} by ${artist}`}
                        />
                      </TableCell>
                      <TableCell>{title}</TableCell>
                      <TableCell>{artist}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </Paper>
      );
    }

    return table;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    artList: state.artList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onListArt: () => dispatch(actions.listArt())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtList);
