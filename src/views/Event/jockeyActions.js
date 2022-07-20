/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Button, Form } from "react-bootstrap";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import BlackListSection from "../ManagedEvents/BlackListSection";
import { confirmAlert } from "react-confirm-alert";

let blackListData = [];
const JockeyActions = ({
  updateManagedEventsRequest,
  eventInfoById,
  eventId,
  broadcastListingRequest,
  updateIsBlackListRequest,
  isBlackListingFetching,
  isAddBlackListFetching,
  addBlackListPriceSectionRequest,
  FetchBlackListPriceSectionRequest,
  blackListInfo
}) => {
  var blacklistReason = "";
  var blacklistReasonSelected = "";
  const [is_JockeyAlgoReprice, setIsJockeyAlgoReprice] = useState(
    eventInfoById.is_JockeyAlgoReprice !== undefined
      ? eventInfoById.is_JockeyAlgoReprice == 1
        ? true
        : false
      : false
  );
  const [is_blackList, setIsBlackList] = useState(
    eventInfoById.is_blackList !== undefined
      ? eventInfoById.is_blackList
      : false
  );
  const [broadcastState, setIsBroadCast] = useState(
    eventInfoById.is_broadcast !== undefined
      ? eventInfoById.is_broadcast
      : false
  );
  const [blackListSectionModel, setBlackListSectionModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [blacklistedSections, setBlacklistedSections] = useState("");
  useEffect(() => {}, []);

  const customConfirm = (next, dropRowKeys) => {
    confirmAlert({
      title: "Warning",
      message: (
        <span>
          <span>
            {dropRowKeys === undefined
              ? next.row.is_blackList === true
                ? "Are you sure you want to unblackList this managed events"
                : "Are you sure you want to blackList this managed events?"
              : "Are you sure you want to delete these managed events?"}
          </span>
          <span className="blacklistHeader">Blacklist Reason</span>
          <Form.Check
            type="radio"
            className="check_row_cls"
            id={1}
            name="radVenue"
            value={`Will Call`}
            onChange={evt => {
              blacklistReason = evt.target.value;
              blacklistReasonSelected = evt.target.value;
            }}
            label={`Will Call`}
          />
          <Form.Check
            type="radio"
            className="check_row_cls"
            id={2}
            name="radVenue"
            value={`Event Mismatch`}
            onChange={evt => {
              blacklistReason = evt.target.value;
              blacklistReasonSelected = evt.target.value;
            }}
            label={`Event Mismatch`}
          />
          <Form.Check
            type="radio"
            className="check_row_cls"
            id={3}
            name="radVenue"
            value={`No Seats Available`}
            onChange={evt => {
              blacklistReason = evt.target.value;
              blacklistReasonSelected = evt.target.value;
            }}
            label={`No Seats Available`}
          />
          <Form.Check
            type="radio"
            className="check_row_cls"
            id={4}
            name="radVenue"
            value={`Verified Resale`}
            onChange={evt => {
              blacklistReason = evt.target.value;
              blacklistReasonSelected = evt.target.value;
            }}
            label={`Verified Resale`}
          />
          <Form.Group>
            <Form.Check
              type="radio"
              className="check_row_cls"
              id={5}
              name="radVenue"
              value={`Other`}
              onChange={evt => {
                blacklistReasonSelected = evt.target.value;
              }}
              label={`Other`}
            />
            <Form.Control
              style={{ color: "#666", backgroundColor: "white" }}
              type="text"
              id={6}
              name="radVenue"
              onChange={evt => {
                blacklistReason =
                  blacklistReasonSelected === "Other"
                    ? evt.target.value
                    : blacklistReason;
              }}
            />
          </Form.Group>
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
            if (dropRowKeys !== undefined) {
              updateIsBlackListRequest({
                eventId: dropRowKeys,
                is_blackList: true,
                blacklistReason
              });
              next();
              setIsBlackList(true);
            } else {
              updateIsBlackListRequest({
                eventId: [next.row._id],
                is_blackList: next.is_blackList,
                blacklistReason
              });
              setIsBlackList(next.is_blackList);
            }
          }
        }
      ]
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-3 actions_toggle m-xl-0 mb-2">
          <label className="switch">
            <input
              type="checkbox"
              checked={
                eventInfoById.is_JockeyAlgoReprice !== undefined
                  ? eventInfoById.is_JockeyAlgoReprice == 1
                    ? true
                    : is_JockeyAlgoReprice
                  : is_JockeyAlgoReprice
              }
              defaultValue={is_JockeyAlgoReprice}
              onChange={evt => {
                const is_JokeyAlgo = evt.target.checked === true ? true : false;
                setIsJockeyAlgoReprice(evt.target.checked);
                updateManagedEventsRequest({
                  eventId,
                  body: {
                    is_JokeyAlgo
                  }
                });
              }}
            />
            <div className="slider"></div>
          </label>
          <label className="label-name">JockeyAlgo Only</label>
        </div>
        <div className="col-xl-3 actions_toggle m-xl-0 mb-2">
          <label className="switch">
            <input
              type="checkbox"
              checked={
                eventInfoById.is_blackList !== undefined
                  ? eventInfoById.is_blackList
                    ? true
                    : is_blackList
                  : is_blackList
              }
              defaultValue={is_blackList}
              onChange={evt => {
                const payload = {
                  eventId: eventInfoById._id,
                  is_blackList: evt.target.checked,
                  row: eventInfoById
                };
                customConfirm(payload);
              }}
            />
            <div className="slider"></div>
          </label>
          <label className="label-name">BlackList</label>
        </div>

        <div className="col-xl-3 actions_toggle m-xl-0 mb-2">
          <label className="switch">
            <input
              type="checkbox"
              checked={
                eventInfoById.is_broadcast !== undefined
                  ? eventInfoById.is_broadcast
                    ? true
                    : broadcastState
                  : broadcastState
              }
              defaultValue={broadcastState}
              onChange={evt => {
                setIsBroadCast(evt.target.checked);
                const payload = {
                  eventIds: [eventInfoById._id],
                  isBroadcasting: evt.target.checked
                };
                broadcastListingRequest(payload);
              }}
            />
            <div className="slider"></div>
          </label>
          <label className="label-name">BroadCast</label>
        </div>

        {/* <div className="col-xl-3 actions_toggle m-xl-0 mb-0">
          <div className="btn-group">
            <Button
              className="icon_btn"
              active
              color="primary"
              aria-pressed="true"
              onClick={() => {
                // setEventId(row.eventId)
                setIsBlackList(
                  eventInfoById.is_blackList !== undefined
                    ? eventInfoById.is_blackList
                    : ""
                )
                setBlacklistedSections(eventInfoById.blacklistedSections)
                blackListData =
                  eventInfoById.blackListData !== undefined
                    ? eventInfoById.blackListData
                    : []
                setBlackListSectionModal(true)
              }}
            >
              BlackList Info
            </Button>
          </div>
        </div> */}

        {blackListSectionModel ? (
          <BlackListSection
            isBlackListingFetching={isBlackListingFetching}
            isAddBlackListFetching={isAddBlackListFetching}
            addBlackListPriceSectionRequest={addBlackListPriceSectionRequest}
            FetchBlackListPriceSectionRequest={
              FetchBlackListPriceSectionRequest
            }
            updateIsBlackListRequest={updateIsBlackListRequest}
            blackListInfo={blackListInfo ? blackListInfo : []}
            eventId={eventId}
            blackListData={blackListData}
            is_blackList={is_blackList}
            blacklistedSections={blacklistedSections}
            isBlackListModal={isBlackListModalOpen =>
              setBlackListSectionModal(isBlackListModalOpen)
            }
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default JockeyActions;
