import { useState } from "react";
import { uploadService } from "../services/upload.service";

export function ImgUploader({ onUploaded = null, imgData, setImgData }) {
  const [isUploading, setIsUploading] = useState(false);

  async function uploadImg(ev) {
    setIsUploading(true);
    const { secure_url, height, width } = await uploadService.uploadImg(ev);
    setImgData({ imgUrl: secure_url, width, height });
    setIsUploading(false);
    onUploaded && onUploaded(secure_url);
  }

  function getUploadLabel() {
    // if (imgData.imgUrl) return "Upload Another?";
    return isUploading ? "Uploading...." : "";
  }

  return (
    <div className="upload-preview">
      {imgData.imgUrl && (
        <img src={imgData.imgUrl} style={{ maxWidth: "200px" }} />
      )}
      <label htmlFor="imgUpload">{getUploadLabel()}</label>
      <input
        type="file"
        onChange={uploadImg}
        accept="img/*"
        id="imgUpload"
        required
      />
    </div>
  );
}
