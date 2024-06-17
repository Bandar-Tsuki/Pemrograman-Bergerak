import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Card, Row } from "antd";
import bgProfile from "../../assets/bg_profile.jpeg";
import profile from "../../assets/profile.jpg";
import {
  FieldTimeOutlined,
  RightOutlined,
  CameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const Index = () => {
  const [isHoveredClose, setIsHoveredClose] = useState(false);
  const [isHoveredHistory, setIsHoveredHistory] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnterHistory = () => {
    setIsHoveredHistory(true);
  };

  const handleMouseLeaveHistory = () => {
    setIsHoveredHistory(false);
  };

  const handleMouseEnterClose = () => {
    setIsHoveredClose(true);
  };

  const handleMouseLeaveClose = () => {
    setIsHoveredClose(false);
  };

  const handleClose = () => {
    window.open("", "_self").close();
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bgProfile})`,
          backgroundSize: "cover",
          alignItems: "center",
          height: "40vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={profile}
          alt=""
          style={{
            width: "10vw",
            borderRadius: "50%",
            ...(window.innerWidth <= 760 && { width: "25vw" }),
          }}
        />
      </div>
      <div
        style={{
          backgroundColor: "red",
          backgroundSize: "cover",
          alignItems: "center",
          height: "10vh",
        }}
      ></div>
      <div className="" style={{ padding: 10 }}>
        <Card
          style={{
            backgroundColor: isHoveredHistory ? "lightgrey" : "inherit",
          }}
          onMouseEnter={handleMouseEnterHistory}
          onMouseLeave={handleMouseLeaveHistory}
        >
          <Link to="/history">
            <div>
              <Row align="middle">
                <Col span={4}>
                  <FieldTimeOutlined style={{ color: "blue", fontSize: 16 }} />
                </Col>
                <Col span={16}>
                  <p>History</p>
                </Col>
                <Col span={4}>
                  <RightOutlined />
                </Col>
              </Row>
            </div>
          </Link>
        </Card>
      </div>
      <div
        style={{
          padding: 10,
        }}
      >
        <Card
          style={{
            backgroundColor: isHovered ? "lightgrey" : "inherit",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/choice">
            <div>
              <Row align="middle">
                <Col span={4}>
                  <CameraOutlined style={{ color: "blue", fontSize: 16 }} />
                </Col>
                <Col span={16}>
                  <p>Camera</p>
                </Col>
                <Col span={4}>
                  <RightOutlined style={{ fontSize: 16 }} />
                </Col>
              </Row>
            </div>
          </Link>
        </Card>
      </div>
      <div
        style={{
          padding: 10,
        }}
      >
        <Card
          onClick={handleClose}
          style={{
            backgroundColor: isHoveredClose ? "lightgrey" : "inherit",
          }}
          onMouseEnter={handleMouseEnterClose}
          onMouseLeave={handleMouseLeaveClose}
        >
          <Row align="middle">
            <Col span={4}>
              <LogoutOutlined style={{ fontSize: 16, color: "red" }} />
            </Col>
            <Col span={16}>
              <p style={{ color: "red" }}>Close</p>
            </Col>
            <Col span={4}>
              <RightOutlined />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Index;
