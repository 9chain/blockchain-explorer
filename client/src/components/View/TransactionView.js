/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, {Component} from "react";
import {withStyles} from "material-ui/styles";

import FontAwesome from "react-fontawesome";
import {CopyToClipboard} from "react-copy-to-clipboard";
import Typography from "material-ui/Typography";

import moment from "moment-timezone";
import {
  Table,
  Card,
  CardBody,
  CardTitle} from "reactstrap";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 42,
    position: "relative"
  }
});
const reads = {
  color: "#2AA233"
};
const writes = {
  color: "#DD8016"
};

export class TransactionView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({loading: false});
  }
  componentWillMount() {
    const theme = sessionStorage.getItem("toggleTheme") === "true";
    this.setState({toggleClass: theme});
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    if (this.props.transaction && !this.props.transaction.read_set) {
      return (
        <div className={this.state.toggleClass ? "dark-theme" : ""}>
          <div>
            <CardTitle className="dialogTitle">
              <FontAwesome name="list-alt" className="listIcon" />Transaction
              Details
              <button onClick={this.handleClose} className="closeBtn">
                <FontAwesome name="close" />
              </button>
            </CardTitle>
            <div align="center">
              <CardBody className="card-body">
                <span className="loading-wheel">
                  {" "}
                  <FontAwesome name="circle-o-notch" size="3x" spin />
                </span>
              </CardBody>
            </div>
          </div>
        </div>
      );
    } else if (this.props.transaction) {
      return (
        <div className={this.state.toggleClass ? "dark-theme" : ""}>
          <div className="dialog">
            <Card>
              <CardTitle className="dialogTitle">
                <FontAwesome name="list-alt" className="listIcon" />交易详情
                <button onClick={this.handleClose} className="closeBtn">
                  <FontAwesome name="close" />
                </button>
              </CardTitle>
              <CardBody>
                <Table striped hover responsive className="table-striped">
                  <tbody>
                    <tr>
                      <th>交易ID:</th>
                      <td>
                        {this.props.transaction.txhash}
                        <button className="copyBtn">
                          <div className="copyMessage">复制</div>
                          <div className="copiedMessage">Copied</div>
                          <CopyToClipboard text={this.props.transaction.txhash}>
                            <FontAwesome name="copy" />
                          </CopyToClipboard>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th>智能合约:</th>
                      <td>{this.props.transaction.chaincodename}</td>
                    </tr>
                    <tr>
                      <th>时间:</th>
                      <td>
                        {moment(this.props.transaction.createdt)
                          .tz(moment.tz.guess())
                          .format("M-D-YYYY h:mm A zz")}
                      </td>
                    </tr>
                    <tr>
                      <th style={writes}>写入:</th>
                      <td>
                        {" "}
                        {this.props.transaction.write_set.map(function(
                          item,
                          index
                        ) {
                          return item === null ? (
                            ""
                          ) : (
                            <li key={index}>
                              <Typography
                                variant="subheading"
                                className="dialogCells"
                              >
                                {"智能合约 "}
                                {item.chaincode}
                              </Typography>
                              <ul>
                                {item.set.map(function(x, index) {
                                  return x === null ? (
                                    ""
                                  ) : (
                                    <li key={index}>
                                      键:{x.key},   值:{
                                        x.value
                                      }{" "}
                                    </li>
                                  );
                                })}
                              </ul>
                              <br />
                            </li>
                          );
                        })}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    }
    return (
      <div className={this.state.toggleClass ? "dark-theme" : ""}>
        <CardTitle className="dialogTitle">
          <FontAwesome name="list-alt" className="listIcon" />Transaction
          Details
          <button onClick={this.handleClose} className="closeBtn">
            <FontAwesome name="close" />
          </button>
        </CardTitle>
        <div align="center">
          <CardBody className="card-body">
            <span className="loading-wheel">
              {" "}
              <FontAwesome name="circle-o-notch" size="3x" spin />
            </span>
          </CardBody>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TransactionView);
