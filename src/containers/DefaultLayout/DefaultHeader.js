/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Nav, NavDropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { clearStore } from "../../store";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  state = { show: false };
  state = { showManageVenue: false };
  state = { showLogs: false };
  handleLogOut = () => {
    clearStore();
    this.props.userLogOut({ userId: this.props.userInfo._id });
  };

  showDropdown = e => {
    this.setState({ show: true });
  };
  hideDropdown = e => {
    this.setState({ show: false });
  };

  showDropdownManageVenue = e => {
    this.setState({ showManageVenue: true });
  };
  hideDropdownManageVenue = e => {
    this.setState({ showManageVenue: false });
  };

  showDropdownLogs = e => {
    this.setState({ showLogs: true });
  };
  hideDropdownLogs = e => {
    this.setState({ showLogs: false });
  };
  render() {
    // eslint-disable-next-line
    const { children, navConfig, userInfo, ...attributes } = this.props;
    var navStyle = "";
    if (
      userInfo.role.toLowerCase() === "manager" ||
      userInfo.role.toLowerCase() === "buyer"
    ) {
      navStyle = "none";
    } else {
      navStyle = "";
    }

    var parth = window.location.href.split("/");
    var result = parth[parth.length - 1];
    const defaultLink = `#${result}`;
    return (
      <div className="leftAside">
        <header className="App-header">
          <div className="logoCls">
            <a className="logo" href="#">
              TJ
            </a>
          </div>
          <div className="menu">
            <Navbar bg="dark" collapseOnSelect expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav defaultActiveKey={defaultLink} as="ul">
                  {navConfig.items.map((value, index) => {
                    return (
                      <Nav.Item
                        key={index}
                        as="li"
                        style={{
                          display:
                            (userInfo.role.toLowerCase() === "buyer" ||
                              userInfo.role.toLowerCase() === "manager") &&
                            (value.url === "#dashboard" ||
                              value.url === "#emailManagement" ||
                              value.url === "#managedEvents" ||
                              value.url === "#managedVenue" ||
                              value.url === "#userProfile")
                              ? ""
                              : userInfo.role.toLowerCase() === "manager" &&
                                value.url === "#timeDetail"
                              ? ""
                              : navStyle
                        }}
                      >
                        {value.url === "#dashboard" ||
                        value.url === "#search" ||
                        value.url === "#timeDetail" ||
                        value.url === "#emailManagement" ||
                        value.url === "#globalConfig" ||
                        value.url === "#userProfile" ||
                        value.url === "#alert" ? (
                          <OverlayTrigger
                            placement="right"
                            overlay={<Tooltip>{value.name}</Tooltip>}
                          >
                            <Nav.Link
                              href={value.url}
                              style={{
                                display:
                                  (userInfo.role.toLowerCase() === "buyer" ||
                                    userInfo.role.toLowerCase() ===
                                      "manager") &&
                                  (value.url === "#dashboard" ||
                                    value.url === "#emailManagement" ||
                                    value.url === "#userProfile")
                                    ? ""
                                    : userInfo.role.toLowerCase() ===
                                        "manager" && value.url === "#timeDetail"
                                    ? ""
                                    : navStyle
                              }}
                            >
                              <div className="text-center">
                                <img
                                  alt=""
                                  src={require("../../assets/img/" + value.img)}
                                />
                                {value.name}
                              </div>
                            </Nav.Link>
                          </OverlayTrigger>
                        ) : (
                          <>
                            {value.url === "#managedEvents" ? (
                              <NavDropdown
                                show={this.state.show}
                                onMouseEnter={this.showDropdown}
                                onMouseLeave={this.hideDropdown}
                                // as={Link}
                                href={value.url}
                                style={{
                                  display:
                                    (userInfo.role.toLowerCase() === "buyer" ||
                                      userInfo.role.toLowerCase() ===
                                        "manager") &&
                                    value.url === "#logs"
                                      ? navStyle
                                      : ""
                                }}
                                title={
                                  <div className="text-center">
                                    <img
                                      alt=""
                                      src={require("../../assets/img/" +
                                        value.img)}
                                    />

                                    {value.name}
                                  </div>
                                }
                                id="basic-nav-dropdown"
                              >
                                <NavDropdown.Item href="#eventQueue">
                                  <i
                                    className="fa fa-list"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Event Queue
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#managedEvents">
                                  <i
                                    className="fa fa-calendar"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Managed Event
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#promos">
                                  <i
                                    className="fa fa-calendar"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Event Promotion
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#duplicate">
                                  <i
                                    className="fa fa-list"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Duplicates
                                </NavDropdown.Item>
                              </NavDropdown>
                            ) : (
                              ""
                            )}

                            {value.url === "#managedVenue" ? (
                              <NavDropdown
                                show={this.state.showManageVenue}
                                onMouseEnter={this.showDropdownManageVenue}
                                onMouseLeave={this.hideDropdownManageVenue}
                                // as={Link}
                                href={value.url}
                                style={{
                                  display:
                                    (userInfo.role.toLowerCase() === "buyer" ||
                                      userInfo.role.toLowerCase() ===
                                        "manager") &&
                                    value.url === "#logs"
                                      ? navStyle
                                      : ""
                                }}
                                title={
                                  <div className="text-center">
                                    <img
                                      alt=""
                                      src={require("../../assets/img/" +
                                        value.img)}
                                    />

                                    {value.name}
                                  </div>
                                }
                                id="basic-nav-dropdown2"
                              >
                                <NavDropdown.Item href="#managedVenue">
                                  <i
                                    className="fa fa-ticket"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Venues
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#eVenue">
                                  <i
                                    className="fa fa-venus-mars"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  E-Venues
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#axsVenues">
                                  <i
                                    className="fa fa-globe"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Axs Venues
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#otherVenues">
                                  <i
                                    className="fa fa-ticket"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Other Venues
                                </NavDropdown.Item>
                              </NavDropdown>
                            ) : (
                              ""
                            )}

                            {value.url === "#logs" ? (
                              <NavDropdown
                                show={this.state.showLogs}
                                onMouseEnter={this.showDropdownLogs}
                                onMouseLeave={this.hideDropdownLogs}
                                // as={Link}
                                href={value.url}
                                style={{
                                  display:
                                    (userInfo.role.toLowerCase() === "buyer" ||
                                      userInfo.role.toLowerCase() ===
                                        "manager") &&
                                    value.url === "#logs"
                                      ? navStyle
                                      : ""
                                }}
                                title={
                                  <div className="text-center">
                                    <img
                                      alt=""
                                      src={require("../../assets/img/" +
                                        value.img)}
                                    />

                                    {value.name}
                                  </div>
                                }
                                id="basic-nav-dropdown3"
                              >
                                {/* <NavDropdown.Item href="#eventsLogInfo">
                                  <i
                                    className="fa fa-info"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Logs Info
                                </NavDropdown.Item> */}
                                <NavDropdown.Item href="#logs">
                                  <i
                                    className="fa fa-desktop"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Event Monitoring Logs
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#eventStatistic">
                                  <i
                                    className="fa fa-venus"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Event - Venue Stastics
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#salesStatistic">
                                  <i
                                    className="fa fa-venus"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Sales - Statistic
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#systemHealthReport">
                                  <i
                                    className="fa fa-venus"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Health - Report
                                </NavDropdown.Item>
                                {/* <NavDropdown.Item href="#orderStatus">
                                  <i
                                    className="fa fa-history"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Order History
                                </NavDropdown.Item> */}
                              </NavDropdown>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </Nav.Item>
                    );
                  })}

                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Logout</Tooltip>}
                  >
                    <li className="nav-item logout">
                      <a onClick={this.handleLogOut}>
                        <img
                          alt=""
                          src={require("../../assets/img/logout.png")}
                        />
                      </a>
                    </li>
                  </OverlayTrigger>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </header>
      </div>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withRouter(DefaultHeader);
