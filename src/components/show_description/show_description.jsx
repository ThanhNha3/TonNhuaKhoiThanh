import React from "react";
import DOMPurify from "dompurify";
import { Box } from "zmp-ui";

const ShowDescription = ({ htmlContent }) => {
  let sanitizedHtml = DOMPurify.sanitize(htmlContent);

  const stringsToRemove = [
    '<li><u><a href="https://www.facebook.com/TonNgoiNhuaKhoiThanh">Facebook</a></u>: Tôn Ngói Nhựa Khởi Thành</li>',
    '<li><u><a href="https://khoithanhgroup.com/">Website</a></u>: khoithanhgroup.com</li>',
    '<p>🌐 <strong>Website:</strong> <a rel="noopener" href="https://tonnhuakhoithanh.vn/">tonnhuakhoithanh.vn</a> hoặc <a rel="noopener" href="https://khoithanhgroup.com/">khoithanhgroup.com</a></p>',
    '<li>🌐 <strong>Facebook:</strong> <a rel="noopener" href="https://www.facebook.com/TonNgoiNhuaKhoiThanh">Tôn Ngói Nhựa Khởi Thành</a></li>',
    '<li>🌐 <strong>Website:</strong> <a rel="noopener" href="https://khoithanhgroup.com/">khoithanhgroup.com</a></li>',
    '<li>🌐 <a rel="noopener" href="https://www.facebook.com/TonNgoiNhuaKhoiThanh">Facebook</a>: Tôn Ngói Nhựa Khởi Thành</li>',
    '<li>🌐 <a rel="noopener" href="https://khoithanhgroup.com/">Website</a>: khoithanhgroup.com</li>',
    '<li>🌐&nbsp;<a rel="noopener" href="https://www.facebook.com/TonNgoiNhuaKhoiThanh">Facebook</a>: Tôn Ngói Nhựa Khởi Thành</li>',
    '<li>🌐&nbsp;<a rel="noopener" href="https://khoithanhgroup.com/">Website</a>: khoithanhgroup.com</li>',
    '<p>🌐&nbsp;<strong>Website:</strong>&nbsp;<a rel="noopener" href="https://tonnhuakhoithanh.vn/">tonnhuakhoithanh.vn</a>&nbsp;hoặc&nbsp;<a rel="noopener" href="https://khoithanhgroup.com/">khoithanhgroup.com</a></p>'
  ];

  stringsToRemove.forEach((str) => {
    sanitizedHtml = sanitizedHtml.replace(str, "");
  });

  const customStyles = {
    lineHeight: "2",
    overflowWrap: "break-word",
    height: "max-content",
    paddingBottom: "100px",
  };
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      style={customStyles}
    />
  );
};

export default ShowDescription;
