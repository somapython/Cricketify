import React, { useEffect } from "react";

const GoogleAd = ({ adSlot }) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7aeec7bb62d84533a981c4ac72294814"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7aeec7bb62d84533a981c4ac72294814"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
};

export default GoogleAd;
