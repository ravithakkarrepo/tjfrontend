import React, { useState, useEffect } from "react";
import { Form, Image } from "react-bootstrap";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button } from "react-bootstrap";
import Spinner from "../../components/Spinner";
import { isValidEmail } from "../../utils/validation";
import { ALERT_MSG_ERROR } from "../../constants";
import { setBackendUrl } from "../../constants";

const ProfileDetail = ({
  userUpdateProfileRequest,
  userInfo,
  isProfileUpadte,
  fetchUserProfileRequest,
  userProfileInfo,
  appReceiveAlert
}) => {
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [onLoadImg, setOnLoadImg] = useState(false);
  useEffect(() => {
    fetchUserProfileRequest(userInfo._id);
  }, []);
  const uploadImages = e => {
    const fsize = e.target.files[0].size;
    const file = Math.round(fsize / 1024);
    // The size of the file.
    if (file >= 10240) {
      appReceiveAlert({
        message: "File too Big, please select a file less than 10mb"
      });
      return;
    }
    let reader = new FileReader();
    reader.onloadend = () => {
      // setFile(reader.result)
      setImagePreviewUrl(reader.result);
      userProfileInfo.profile = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    setOnLoadImg(true);
    const image = e.target.files.length
      ? e.target.files[0]
      : userProfileInfo.profile;

    setFile(image);
  };

  const clearImage = () => {
    userProfileInfo.profile = "";
    setFile("");
    setImagePreviewUrl("");
  };

  return (
    <div>
      <div className="full_width">
        <div className="page_name">
          <h2>My Account</h2>
        </div>
        <div className="inner_main">
          <div className="full_width">
            <div className="row">
              <div className="col-sm-12 mb_full_991">
                <div className="white_box mrgbtm50 bx_min_HH">
                  <div className="cm_ttl">
                    <h2>Personal Information</h2>{" "}
                    <h2
                      style={{
                        float: "right",
                        marginTop: "-20px",
                        color: "#fff",
                        fontSize: "16px",
                        textTransform: "capitalize"
                      }}
                    >
                      {userProfileInfo.username}
                    </h2>
                  </div>
                  <div className="inner_box_body">
                    <div className="row">
                      <div className="col-sm-9">
                        <div className="filter_filed_profile">
                          <div className="fl_eq_box">
                            <label className="searchHead">
                              First Name<span style={{ color: "red" }}>*</span>
                            </label>
                            <Form.Control
                              type="text"
                              placeholder="First Name..."
                              defaultValue={userProfileInfo.firstName}
                              onChange={evt =>
                                (userProfileInfo.firstName = evt.target.value)
                              }
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">
                              Last Name<span style={{ color: "red" }}>*</span>
                            </label>
                            <Form.Control
                              type="text"
                              placeholder="Last Name..."
                              defaultValue={userProfileInfo.lastName}
                              onChange={evt =>
                                (userProfileInfo.lastName = evt.target.value)
                              }
                            />
                          </div>

                          <div className="fl_eq_box">
                            <label className="searchHead">
                              Password<span style={{ color: "red" }}>*</span>
                            </label>
                            <Form.Control
                              type="password"
                              placeholder="Password.."
                              defaultValue={userProfileInfo.password}
                              disabled={true}
                              // onChange={evt =>
                              //   (userProfileInfo.password = evt.target.value)
                              // }
                            />
                          </div>
                          <div className="fl_eq_box">
                            <label className="searchHead">Email</label>
                            <Form.Control
                              type="Email"
                              placeholder="Email.."
                              defaultValue={userProfileInfo.email}
                              disabled={true}
                              // onChange={evt =>
                              //   (userProfileInfo.email = evt.target.value)
                              // }
                            />
                          </div>
                          {/* <div className="fl_eq_box">
                                                        <label className="searchHead">Role</label>
                                                        <Form.Control as="select" defaultValue={userProfileInfo.role} onChange={evt => (userProfileInfo.role = evt.target.value)}>
                                                            <option value="">--Select--</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="buyer">Buyer</option>
                                                            <option value="manager">Manager</option>

                                                        </Form.Control>
                                                    </div> */}
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="fl_eq_box profile">
                          <div className="dd_user_bx_profile">
                            <div className="dd_user_img_bx_profile">
                              {!onLoadImg ? (
                                <Image
                                  src={
                                    userProfileInfo.profile &&
                                    userProfileInfo.profile
                                      ? userProfileInfo.profile.includes(
                                          "base64"
                                        )
                                        ? userProfileInfo.profile
                                        : setBackendUrl() +
                                          userProfileInfo.profile
                                      : imagePreviewUrl
                                      ? imagePreviewUrl
                                      : require("../../assets/img/profile1.png")
                                  }
                                />
                              ) : (
                                <Image
                                  src={
                                    imagePreviewUrl
                                      ? imagePreviewUrl
                                      : require("../../assets/img/profile1.png")
                                  }
                                />
                              )}
                              <div className="upload-btn-wrapper">
                                <Button
                                  className="status_img_profile"
                                  size="sm"
                                  type="type"
                                >
                                  <i
                                    className="fa fa-upload"
                                    aria-hidden="true"
                                  ></i>
                                </Button>
                                <input
                                  type="file"
                                  name="imgUpload"
                                  accept="image/png, image/jpeg, image/jpg"
                                  onChange={uploadImages}
                                />
                              </div>
                              <Button
                                className="status_btn"
                                size="sm"
                                onClick={() => {
                                  confirmAlert({
                                    title: "Warning",
                                    message: (
                                      <span>
                                        Are you sure you want to delete this
                                        Profile Picture?
                                      </span>
                                    ),
                                    closeOnClickOutside: false,
                                    buttons: [
                                      {
                                        label: "Cancel"
                                      },
                                      {
                                        label: "Confirm",
                                        onClick: () => {
                                          userInfo.profile = "";
                                          setOnLoadImg(true);
                                          clearImage();
                                        }
                                      }
                                    ]
                                  });
                                }}
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="float-right">
                          <div className="fl_eq_box src_btn">
                            <div className="fl_w">
                              <Button
                                color="primary"
                                className="btn-pill"
                                onClick={() => {
                                  if (userProfileInfo.firstName === "") {
                                    appReceiveAlert({
                                      type: ALERT_MSG_ERROR,
                                      message: "FirstName is Required"
                                    });
                                  } else if (userProfileInfo.lastName === "") {
                                    appReceiveAlert({
                                      type: ALERT_MSG_ERROR,
                                      message: "LastName is Required"
                                    });
                                  } else if (userProfileInfo.password === "") {
                                    appReceiveAlert({
                                      type: ALERT_MSG_ERROR,
                                      message: "Password is Required"
                                    });
                                  }
                                  // else if (
                                  //   userProfileInfo.email &&
                                  //   userProfileInfo.email !== ""
                                  // ) {
                                  //   if (!isValidEmail(userProfileInfo.email)) {
                                  //     appReceiveAlert({
                                  //       type: ALERT_MSG_ERROR,
                                  //       message: "Email Is not valid"
                                  //     })
                                  //   }
                                  // }
                                  else {
                                    const formData = new FormData();
                                    formData.append(
                                      "firstName",
                                      userProfileInfo.firstName
                                    );
                                    formData.append(
                                      "lastName",
                                      userProfileInfo.lastName
                                    );
                                    formData.append("_id", userProfileInfo._id);
                                    if (file !== "") {
                                      formData.append("profile", file);
                                    } else {
                                      formData.append(
                                        "profile",
                                        userProfileInfo.profile
                                      );
                                    }

                                    userUpdateProfileRequest({
                                      body: formData,
                                      _id: userProfileInfo._id
                                    });
                                  }
                                }}
                              >
                                {isProfileUpadte ? (
                                  <div className="fl_w">
                                    <Spinner
                                      profileSpinner={true}
                                      spinnerTime={false}
                                    />{" "}
                                  </div>
                                ) : (
                                  "Update Profile"
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
