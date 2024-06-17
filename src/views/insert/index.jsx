import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, SmileOutlined } from "@ant-design/icons";
import { Input, Image, Button, notification } from "antd";
import axios from "axios";

const Index = () => {
  const [imageURL, setImageURL] = useState(null);
  const [isDataImage, setIsDataImage] = useState();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setIsDataImage(file);
    reader.onload = () => {
      setImageURL(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = new FormData();
      data.append("image", isDataImage);

      const response = await axios.post(
        `${process.env.REACT_APP_LOCAL}classify`,
        data
      );
      const hasil = response.data?.label;
      openNotification(hasil);
      setIsLoading(false);
      navigate("/history");
    } catch {
      openNotificationError();
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {contextHolder}
      <div
        style={{
          backgroundColor: "#FFE5B4",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          height: "20vh",
          width: "100%",
        }}
      >
        <Link to="/">
          <ArrowLeftOutlined
            style={{ color: "red", fontSize: 20, marginLeft: 20 }}
          />
        </Link>
        <h1 style={{ color: "red", margin: "0 auto" }}>Insert Photo</h1>
      </div>
      {imageURL && (
        <div style={{ textAlign: "center", padding: 20 }}>
          <Image src={imageURL} width={"50vw"} />
        </div>
      )}
      <div style={{ width: "30vw", textAlign: "center", marginTop: "20px" }}>
        <Input type="file" onChange={handleFileChange} />
      </div>
      <div style={{ padding: 20 }}>
        <Button
          loading={isLoading}
          onClick={handleSubmit}
          style={{
            padding: "20px",
            backgroundColor: "red",
            color: "white",
            width: "20vw",
          }}
        >
          {isLoading ? "Loading..." : "Simpan"}
        </Button>
      </div>
    </div>
  );
};

export default Index;
