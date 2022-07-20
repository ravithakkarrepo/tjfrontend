import React, { useState } from "react";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Button, Modal, Form } from "react-bootstrap";

const TicketPurchased = ({
  isPurchasedFromRedOrder,
  userInfo,
  fromRedTable,
  purchasedKey,
  ticketPurchasedRequest,
  isOpen,
  isTicketPurchase
}) => {
  const [orderNum, setOrderNum] = useState("");
  const [ticketModal, setTicketModal] = useState(true);

  return (
    <div className="animated">
      <Modal
        size="md"
        centered
        show={ticketModal}
        onHide={() => {
          setTicketModal(false);
          // eslint-disable-next-line eqeqeq
          if (isTicketPurchase != undefined) isTicketPurchase(false);
        }}
      >
        <Modal.Header closeButton style={{ background: "blue" }}>
          <Modal.Title className="order_title">
            {isPurchasedFromRedOrder
              ? "Enter Seconadary Market Order Number"
              : "Enter Order Number"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group controlId="formOrderNumber">
                <Form.Label>
                  {isPurchasedFromRedOrder
                    ? "Seconadary Market Order Number"
                    : "Order Number"}
                  <span className="order_error" style={{ color: "red" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="Order_txt"
                  value={orderNum}
                  placeholder="Order Number..."
                  onChange={evt => setOrderNum(evt.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setTicketModal(false);
              // eslint-disable-next-line eqeqeq
              if (isTicketPurchase != undefined) isTicketPurchase(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!orderNum}
            style={{ background: !orderNum ? "grey" : "skyblue" }}
            onClick={() => {
              ticketPurchasedRequest({
                username: userInfo.username ? userInfo.username : null,
                listingIds: purchasedKey,
                orderNum: orderNum,
                fromProblemeticOrder: fromRedTable
              });
              setTicketModal(false);
              setOrderNum("");
              // eslint-disable-next-line eqeqeq
              if (isOpen != undefined) isOpen(false);
            }}
          >
            Ticket Purchased
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TicketPurchased;
