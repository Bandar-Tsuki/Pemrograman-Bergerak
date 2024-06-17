import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import axios from "axios";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [convertedData, setConvertedData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function base64ToImage(base64String) {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64String}`;
    return img;
  }

  const handleConvert = (data) => {
    const newData = data.map((item) => {
      const base64String = item.image.replace("http://localhost:3000/", "");
      const image = base64ToImage(base64String);
      return {
        ...item,
        image: image.src,
      };
    });
    setConvertedData(newData);
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_LOCAL}history`);
      const data = response.data;
      handleConvert(data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  const Base64Image = ({ base64 }) => {
    return (
      <div>
        <img src={base64} alt="Base64 Gambar" style={styles.images} />
      </div>
    );
  };

  return (
    <div
    // // className="Container-fluid"
    >
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
        <h1 style={{ color: "red", margin: "0 auto" }}>History</h1>
      </div>
      <div style={{ padding: "10px" }}>
        <Card loading={isLoading}>
          {convertedData &&
            convertedData.map((item, i) => (
              <Row key={i}>
                <Col>
                  <Base64Image base64={item.image} />
                </Col>
                <Col style={{ paddingLeft: 20 }}>
                  <h3>
                    <b>{item.label}</b>
                  </h3>
                  <p style={{ paddingTop: "50px" }}>{item.date}</p>
                </Col>
              </Row>
            ))}
        </Card>
      </div>
    </div>
  );
};

export default Index;

const styles = {
  images: {
    width: "200px",
    borderRadius: "10%",
  },
};
