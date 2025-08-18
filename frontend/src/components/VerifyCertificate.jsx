


import { useState, useRef } from "react";
import axios from "axios";

export default function PublicVerify() {
  const [studentName, setStudentName] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // ✅ Upload file to Pinata
  const uploadToIPFS = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
        },
      }
    );
    return res.data.IpfsHash;
  };

  // ✅ Verification Handler
  const verifyCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!file) {
        alert("Please upload a certificate file.");
        return;
      }

      const uploadedHash = await uploadToIPFS();
      const allCerts = JSON.parse(localStorage.getItem("certificates")) || [];

      const cert = allCerts.find(
        (c) =>
          c.studentName.toLowerCase() === studentName.toLowerCase() &&
          c.ipfsHash === uploadedHash
      );

      if (cert) {
        setResult({
          status: "✅ Verified",
          details: cert,
        });
      } else {
        setResult({
          status: "❌ Not Verified",
          details: null,
        });
      }

      // Reset inputs
      setStudentName("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Verification failed:", err);
      setResult({
        status: "⚠️ Error during verification",
        details: null,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🔍 Public Certificate Verification
        </h2>

        {/* Form */}
        <form onSubmit={verifyCertificate} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium text-white shadow transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Verifying..." : "Verify Certificate"}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div
            className={`mt-6 p-5 rounded-xl shadow-inner ${
              result.status.includes("✅")
                ? "bg-green-50 border border-green-200"
                : result.status.includes("❌")
                ? "bg-red-50 border border-red-200"
                : "bg-yellow-50 border border-yellow-200"
            }`}
          >
            <p className="text-lg font-semibold">{result.status}</p>

            {result.details && (
              <div className="mt-3 space-y-1 text-gray-700">
                <p>
                  <strong>Name:</strong> {result.details.studentName}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(result.details.dateOfIssue).toLocaleDateString()}
                </p>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${result.details.ipfsHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-indigo-600 hover:underline"
                >
                  🔗 View Original Certificate
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}




