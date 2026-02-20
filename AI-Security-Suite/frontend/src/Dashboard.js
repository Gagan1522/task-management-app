import React, { useState } from "react";
import { scanWebsite } from "./api";

function Dashboard() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      const res = await scanWebsite(url);
      setResult(res);
    } catch (err) {
      alert("Scan failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>AI Security Scanner</h2>

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <button onClick={handleScan} style={{ marginLeft: "10px" }}>
        Scan
      </button>

      {loading && <p>Scanning...</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result</h3>
          <p>Status: {result.status}</p>
          <p>Threat Level: {result.threatLevel}</p>
          <p>Time: {result.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard