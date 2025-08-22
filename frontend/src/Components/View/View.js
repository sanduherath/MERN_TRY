import React, { useEffect, useRef, useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import User from "../User/User";
// removed react-to-print; preview/download handled via html2canvas + jsPDF
// switched to server-side PDF generation; removed html2canvas/jsPDF

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data.users || res.data);
};
function View() {
  const [users, setUsers] = React.useState([]);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const pdfBlobRef = useRef(null);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  // remove a user locally after successful delete to avoid full page reload
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));
  };
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data));
  }, []);

  // search
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetchHandler()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data && data.users) || [];
        setAllUsers(list);
        setUsers(list);
      })
      .catch((err) => console.error("fetch users", err));
  }, []);

  const handleSearch = (q) => {
    const query = (q !== undefined ? q : searchQuery)
      .toString()
      .toLowerCase()
      .trim();
    setSearchQuery(q !== undefined ? q : searchQuery);

    if (!query) {
      setUsers(allUsers);
      setNoResults(allUsers.length === 0);
      return;
    }

    const filteredUsers = (allUsers || []).filter((user) =>
      Object.values(user || {}).some((field) =>
        String(field || "")
          .toLowerCase()
          .includes(query)
      )
    );
    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  };

  // PDF preview/download setup
  const componentRef = useRef(null);

  // Generate PDF blob from the printable component and show preview modal
  const previewPdf = async () => {
    try {
      setPdfGenerating(true);
      // Request server-generated PDF
      const resp = await fetch(`${URL}/report`, { method: "GET" });
      if (!resp.ok) {
        throw new Error("Failed to fetch PDF report");
      }
      const blob = await resp.blob();

      // prepare preview URL
      if (pdfBlobRef.current) {
        try {
          URL.revokeObjectURL(pdfBlobRef.current);
        } catch (e) {}
      }
      const objectUrl =
        typeof URL !== "undefined" && typeof URL.createObjectURL === "function"
          ? URL.createObjectURL(blob)
          : null;

      if (objectUrl) {
        pdfBlobRef.current = objectUrl;
        setPdfPreviewUrl(objectUrl);
        setPreviewOpen(true);
      } else {
        // fallback to dataURL
        const reader = new FileReader();
        reader.onload = () => {
          pdfBlobRef.current = reader.result;
          setPdfPreviewUrl(reader.result);
          setPreviewOpen(true);
        };
        reader.onerror = () => {
          throw new Error("Failed to read PDF blob");
        };
        reader.readAsDataURL(blob);
      }
      setPdfGenerating(false);
    } catch (err) {
      setPdfGenerating(false);
      console.error("previewPdf error", err);
      alert("Failed to prepare PDF preview: " + (err?.message || err));
    }
  };

  const closePreview = () => {
    setPreviewOpen(false);
    if (pdfBlobRef.current) {
      try {
        URL.revokeObjectURL(pdfBlobRef.current);
      } catch (e) {}
      pdfBlobRef.current = null;
    }
    setPdfPreviewUrl(null);
  };



  //send wap msg
const handleSendReport = () => {
  const phoneNumber = "+94716125714";
  const message = "Here is the report you requested.";
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};


  // Download handled via preview or separate page action; removed inline download function to satisfy linter
  return (
    <div>
      <Nav />
      <h1>View Users</h1>
      <input
        type="text"
        name="search"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ padding: "6px 8px", width: "280px" }}
      />
      {noResults ? (
        <p>No results found</p>
      ) : (
        <div ref={componentRef}>
          <div>
            {users &&
              users.map((user) => (
                <div key={user._id || user.id}>
                  <User user={user} onDelete={handleDelete} />
                </div>
              ))}
          </div>
        </div>
      )}
      <button onClick={previewPdf} disabled={!users || users.length === 0}>
        Print Users Report
      </button>

      {previewOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "80%",
              height: "80%",
              background: "#fff",
              borderRadius: 6,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: 8,
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <button onClick={closePreview}>Close</button>
            </div>
            <div style={{ flex: 1, overflow: "auto" }}>
              {pdfGenerating ? (
                <div style={{ padding: 20, textAlign: "center" }}>
                  Generating PDF preview...
                </div>
              ) : pdfPreviewUrl ? (
                <iframe
                  title="PDF Preview"
                  src={pdfPreviewUrl}
                  style={{
                    width: "100%",
                    color: "black",
                    height: "100%",
                    border: "none",
                  }}
                />
              ) : (
                <div style={{ padding: 20 }}>No preview available</div>
              )}
            </div>
          </div>
        </div>
      )}
      <button onClick={handleSendReport}>Send WhatsApp Report</button>
    </div>
  );
}

export default View;
