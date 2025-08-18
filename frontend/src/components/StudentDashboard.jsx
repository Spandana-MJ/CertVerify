


import { useState } from "react";

// ✅ Helper function for formatting date
function formatDate(dateInput) {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d)) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function StudentDashboard() {
  const [wallet, setWallet] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [certs, setCerts] = useState([]);

  // ✅ Handle login
  const handleLogin = () => {
    const allCerts = JSON.parse(localStorage.getItem("certificates")) || [];

    // Support both old `walletAddress` and new `studentAddress`
    const myCerts = allCerts.filter((c) => {
      const address = c.studentAddress || c.walletAddress;
      return address && address.toLowerCase() === wallet.toLowerCase();
    });

    if (myCerts.length > 0) {
      setCerts(myCerts);
      setLoggedIn(true);
    } else {
      alert("❌ No certificates found for this wallet address.");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    setWallet("");
    setLoggedIn(false);
    setCerts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-indigo-200 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8">
        {!loggedIn ? (
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
              🎓 Student Login
            </h2>
            <p className="text-gray-600 mb-4">
              Enter your wallet address to access your certificates
            </p>
            <input
              type="text"
              placeholder="🔑 Wallet Address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="border border-gray-300 p-3 rounded-xl w-full mb-4 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <button
              onClick={handleLogin}
              className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold px-6 py-3 rounded-xl w-full shadow-lg"
            >
              🔓 Login
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                📜 My Certificates
              </h2>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg shadow-md"
              >
                🚪 Logout
              </button>
            </div>

            {/* Certificates */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certs.map((c) => (
                <div
                  key={c.certId}
                  className="border border-gray-200 rounded-2xl shadow-md p-6 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl hover:scale-105 transition transform duration-200"
                >
                  <p className="text-gray-700 mb-2">
                    <strong className="text-gray-900">👤 Name:</strong>{" "}
                    {c.studentName}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong className="text-gray-900">📅 Date:</strong>{" "}
                    {formatDate(c.dateOfIssue)}
                  </p>
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${c.ipfsHash}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow transition"
                  >
                    🔗 View Certificate
                  </a>
                </div>
              ))}
            </div>

            {/* No certs fallback */}
            {certs.length === 0 && (
              <p className="text-center text-gray-500 mt-6">
                🚫 No certificates available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

