import { connect } from "react-redux";
import ProfileDetail from "./ProfileDetail";
import {
  getUserInfo,
  getUserProfileInfo,
  getIsUpdateProfileFetching
} from "../../reducers";
import {
  userUpdateProfileRequest,
  fetchUserProfileRequest
} from "../../actions/users";
import { appReceiveAlert } from "../../actions/app";

const ProfileDetailContainer = connect(
  state => ({
    isProfileUpadte: getIsUpdateProfileFetching(state),
    userInfo: getUserInfo(state),
    userProfileInfo: getUserProfileInfo(state)
  }),
  {
    userUpdateProfileRequest,
    fetchUserProfileRequest,
    appReceiveAlert
  }
)(ProfileDetail);

export default ProfileDetailContainer;
