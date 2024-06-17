import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";

const Index = () => {
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
  return (
    <div>
      <div
        style={{
          backgroundColor: "#FFE5B4",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          height: "20vh",
        }}
      >
        <Link to="/">
          <ArrowLeftOutlined
            style={{ color: "red", fontSize: 20, marginLeft: 20 }}
          />
        </Link>
        <h1 style={{ color: "red", margin: "0 auto" }}>Choice</h1>
      </div>
      <div style={{ padding: "10px" }}>
        <div className="" style={{ padding: 10 }}>
          <Card
            style={{
              backgroundColor: isHoveredHistory ? "lightgrey" : "inherit",
            }}
            onMouseEnter={handleMouseEnterHistory}
            onMouseLeave={handleMouseLeaveHistory}
          >
            <Link to="/insert">
              <div>
                <Row align="middle">
                  <Col span={16}>
                    <p>Insert</p>
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
            <Link to="/camera">
              <div>
                <Row align="middle">
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
      </div>
    </div>
  );
};

export default Index;
