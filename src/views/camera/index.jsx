import React, { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { ArrowLeftOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import axios from "axios";

const Index = () => {
  const webcamRef = useRef(null);
  const [isDataImage, setIsDataImage] = useState("");
  const [isDataSave, setIsDataSave] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = (hasil) => {
    api.open({
      message: "Sukses",
      description: `Hasil klasifikasi adalah ${hasil}`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const openNotificationError = () => {
    api.open({
      message: "Gagal",
      description: `Tidak berhasil mengklasifikasikan`,
    });
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageData = imageSrc.replace(
      /^data:image\/(png|jpg|jpeg);base64,/,
      ""
    );
    setIsDataImage(imageSrc);
    setIsDataSave(imageData);
  }, [webcamRef]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = {
        image: isDataSave,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL}classify`,
        data
      );
      console.log("response", response);
      const datas = response.data.label;
      openNotification(datas);
      setIsLoading(false);
      navigate("/history");
    } catch {
      openNotificationError();
      setIsLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <div
        style={{
          backgroundColor: "#FFE5B4",
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
        <h1 style={{ color: "red", margin: "0 auto" }}>Camera</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Webcam
          style={{ width: "100vw", maxWidth: "800px" }}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Button
          onClick={capture}
          style={{
            padding: "20px",
            backgroundColor: "red",
            color: "white",
            width: "20vw",
            maxWidth: "200px",
          }}
        >
          Capture
        </Button>
      </div>
      {isDataImage && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "20px" }}>
            <img
              src={isDataImage}
              alt="Captured"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <Button
            loading={isLoading}
            onClick={handleSubmit}
            style={{
              padding: "20px",
              backgroundColor: "red",
              color: "white",
              width: "20vw",
              maxWidth: "200px",
            }}
          >
            {isLoading ? "Loading" : "Simpan"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
