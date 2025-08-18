


import { useState, useRef } from "react";
import axios from "axios";
import { User, Wallet, Upload } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [studentName, setStudentName] = useState("");
  const [studentAddress, setStudentAddress] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Upload to Pinata
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

  // Issue certificate
  const issueCertificate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!file) {
        alert("Please upload a certificate file.");
        return;
      }

      const ipfsHash = await uploadToIPFS();

      const certId = Date.now().toString();
      const newCert = {
        certId,
        studentName,
        studentAddress,
        ipfsHash,
        dateOfIssue: new Date().toISOString(),
      };

      let certs = JSON.parse(localStorage.getItem("certificates")) || [];
      certs.push(newCert);
      localStorage.setItem("certificates", JSON.stringify(certs));

      alert("✅ Certificate issued successfully!");

      setStudentName("");
      setStudentAddress("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error issuing certificate:", err);
      alert("Failed to issue certificate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white/70 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 border border-white/30"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">
            🎓 Issue Certificate
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Fill in details below to issue a blockchain-verified certificate
          </p>
        </div>

        {/* Form */}
        <form onSubmit={issueCertificate} className="space-y-6">
          {/* Student Name */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="peer w-full pl-10 border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-transparent"
              required
            />
            <label className="absolute left-10 top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-purple-600">
              Student Full Name
            </label>
          </div>

          {/* Wallet Address */}
          <div className="relative">
            <Wallet className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              value={studentAddress}
              onChange={(e) => setStudentAddress(e.target.value)}
              className="peer w-full pl-10 border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-transparent"
              required
            />
            <label className="absolute left-10 top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-purple-600">
              Student Wallet Address
            </label>
          </div>

          {/* File Upload */}
          <div className="relative">
            <Upload className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full pl-10 border rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-transparent"
              required
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            {loading ? "⏳ Issuing..." : "✅ Issue Certificate"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
