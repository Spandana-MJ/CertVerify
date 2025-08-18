// // // // import { useState } from "react";
// // // // import Navbar from "./components/Navbar";
// // // // import AdminDashboard from "./components/AdminDashboard";
// // // // import StudentDashboard from "./components/StudentDashboard";
// // // // import VerifyCertificate from "./components/VerifyCertificate";

// // // // function App() {
// // // //   const [account, setAccount] = useState(null);
// // // //   const [isAdmin, setIsAdmin] = useState(false);
// // // //   const [activeTab, setActiveTab] = useState("home");

// // // //   const adminAddress = import.meta.env.VITE_ADMIN_ADDRESS; // Replace with your real admin address

// // // //   const connectWallet = async () => {
// // // //     if (!window.ethereum) return alert("Install MetaMask");
// // // //     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
// // // //     setAccount(accounts[0]);
// // // //     setIsAdmin(accounts[0].toLowerCase() === adminAddress.toLowerCase());
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <Navbar account={account} connectWallet={connectWallet} />

// // // //       {/* Navigation Tabs */}
// // // //       <div className="flex justify-center gap-4 mt-4">
// // // //         <button
// // // //           onClick={() => setActiveTab("home")}
// // // //           className={`px-4 py-2 rounded-lg ${activeTab === "home" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
// // // //         >
// // // //           Home
// // // //         </button>
// // // //         <button
// // // //           onClick={() => setActiveTab("verify")}
// // // //           className={`px-4 py-2 rounded-lg ${activeTab === "verify" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
// // // //         >
// // // //           Verify
// // // //         </button>
// // // //         {account && isAdmin && (
// // // //           <button
// // // //             onClick={() => setActiveTab("admin")}
// // // //             className={`px-4 py-2 rounded-lg ${activeTab === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
// // // //           >
// // // //             Admin
// // // //           </button>
// // // //         )}
// // // //         {account && !isAdmin && (
// // // //           <button
// // // //             onClick={() => setActiveTab("student")}
// // // //             className={`px-4 py-2 rounded-lg ${activeTab === "student" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
// // // //           >
// // // //             Student
// // // //           </button>
// // // //         )}
// // // //       </div>

// // // //       {/* Page Content */}
// // // //       <div className="p-6">
// // // //         {activeTab === "home" && (
// // // //           <div className="text-center mt-10">
// // // //             <h1 className="text-3xl font-bold mb-4">Welcome to CertVerify</h1>
// // // //             <p className="text-gray-600 mb-6">
// // // //               A decentralized platform for issuing, storing, and verifying certificates securely.
// // // //             </p>
// // // //             {!account && (
// // // //               <button
// // // //                 onClick={connectWallet}
// // // //                 className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
// // // //               >
// // // //                 Connect Wallet to Continue
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {activeTab === "verify" && <VerifyCertificate />}
// // // //         {activeTab === "admin" && account && isAdmin && <AdminDashboard account={account} />}
// // // //         {activeTab === "student" && account && !isAdmin && <StudentDashboard account={account} />}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;


// // // // import { useState } from "react";
// // // // import { Routes, Route, Navigate } from "react-router-dom";
// // // // import Navbar from "./components/Navbar";
// // // // import AdminDashboard from "./components/AdminDashboard";
// // // // import StudentDashboard from "./components/StudentDashboard";
// // // // import VerifyCertificate from "./components/VerifyCertificate";

// // // // export default function App() {
// // // //   const [account, setAccount] = useState(null);

// // // //   const adminAddress = import.meta.env.VITE_ADMIN_ADDRESS?.toLowerCase();

// // // //   const connectWallet = async () => {
// // // //     if (!window.ethereum) return alert("Install MetaMask");
// // // //     const accounts = await window.ethereum.request({
// // // //       method: "eth_requestAccounts",
// // // //     });
// // // //     setAccount(accounts[0]);
// // // //   };

// // // //   const isAdmin = account?.toLowerCase() === adminAddress;

// // // //   return (
// // // //     <div>
// // // //       <Navbar account={account} connectWallet={connectWallet} />
// // // //       <Routes>
// // // //         {/* Home */}
// // // //         <Route
// // // //           path="/"
// // // //           element={
// // // //             <div className="text-center mt-10">
// // // //               <h1 className="text-3xl font-bold mb-4">Welcome to CertVerify</h1>
// // // //               <p className="text-gray-600 mb-6">
// // // //                 A decentralized platform for issuing, storing, and verifying
// // // //                 certificates securely.
// // // //               </p>
// // // //               {!account && (
// // // //                 <button
// // // //                   onClick={connectWallet}
// // // //                   className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
// // // //                 >
// // // //                   Connect Wallet to Continue
// // // //                 </button>
// // // //               )}
// // // //             </div>
// // // //           }
// // // //         />

// // // //         {/* Verify */}
// // // //         <Route path="/verify" element={<VerifyCertificate />} />

// // // //         {/* Admin (Protected Route) */}
// // // //         <Route
// // // //           path="/admin/dashboard"
// // // //           element={
// // // //             isAdmin ? (
// // // //               <AdminDashboard account={account} />
// // // //             ) : (
// // // //               <Navigate to="/" />
// // // //             )
// // // //           }
// // // //         />
// // // //         <Route
// // // //           path="/admin/upload"
// // // //           element={
// // // //             isAdmin ? (
// // // //               <AdminDashboard account={account} mode="upload" />
// // // //             ) : (
// // // //               <Navigate to="/" />
// // // //             )
// // // //           }
// // // //         />

// // // //         {/* Student (Protected Route) */}
// // // //         <Route
// // // //           path="/student/dashboard"
// // // //           element={
// // // //             account && !isAdmin ? (
// // // //               <StudentDashboard account={account} />
// // // //             ) : (
// // // //               <Navigate to="/" />
// // // //             )
// // // //           }
// // // //         />
// // // //       </Routes>
// // // //     </div>
// // // //   );
// // // // }








// // // import { useState } from "react";
// // // import { Routes, Route } from "react-router-dom";
// // // import Navbar from "./components/Navbar";
// // // import AdminDashboard from "./components/AdminDashboard";
// // // import StudentDashboard from "./components/StudentDashboard";
// // // import VerifyCertificate from "./components/VerifyCertificate";

// // // function App() {
// // //   const [account, setAccount] = useState(null);
// // //   const [isAdmin, setIsAdmin] = useState(false);

// // //   const adminAddress = import.meta.env.VITE_ADMIN_ADDRESS;

// // //   // ✅ Connect wallet
// // //   const connectWallet = async () => {
// // //     if (!window.ethereum) return alert("Install MetaMask");
// // //     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
// // //     setAccount(accounts[0]);
// // //     setIsAdmin(accounts[0].toLowerCase() === adminAddress.toLowerCase());
// // //   };

// // //   return (
// // //     <div>
// // //       <Navbar account={account} connectWallet={connectWallet} />

// // //       <div className="p-6">
// // //         <Routes>
// // //           {/* Home */}
// // //           <Route
// // //             path="/"
// // //             element={
// // //               <div className="text-center mt-10">
// // //                 <h1 className="text-3xl font-bold mb-4">Welcome to CertVerify</h1>
// // //                 <p className="text-gray-600 mb-6">
// // //                   A decentralized platform for issuing, storing, and verifying certificates securely.
// // //                 </p>
// // //                 {!account && (
// // //                   <button
// // //                     onClick={connectWallet}
// // //                     className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
// // //                   >
// // //                     Connect Wallet to Continue
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             }
// // //           />

// // //           {/* Verify Page */}
// // //           <Route path="/verify" element={<VerifyCertificate />} />

// // //           {/* Admin Page (only if admin) */}
// // //           {account && isAdmin && (
// // //             <Route path="/admin/dashboard" element={<AdminDashboard account={account} />} />
// // //           )}

// // //           {/* Student Page (only if NOT admin) */}
// // //           {account && !isAdmin && (
// // //             <Route path="/student/dashboard" element={<StudentDashboard account={account} />} />
// // //           )}
// // //         </Routes>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default App;


// // import { useState } from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import Navbar from "./components/Navbar";
// // import AdminDashboard from "./components/AdminDashboard";
// // import StudentDashboard from "./components/StudentDashboard";
// // import VerifyCertificate from "./components/VerifyCertificate";

// // function App() {
// //   const [account, setAccount] = useState(null);
// //   const [isAdmin, setIsAdmin] = useState(false);

// //   const adminAddress = import.meta.env.VITE_ADMIN_ADDRESS;

// //   // ✅ Connect wallet
// //   const connectWallet = async () => {
// //     if (!window.ethereum) return alert("Install MetaMask");
// //     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
// //     setAccount(accounts[0]);
// //     setIsAdmin(accounts[0].toLowerCase() === adminAddress.toLowerCase());
// //   };

// //   return (
// //     <div>
// //       <Navbar account={account} connectWallet={connectWallet} />

// //       <div className="p-6">
// //         <Routes>
// //           {/* Home */}
// //           <Route
// //             path="/"
// //             element={
// //               <div className="text-center mt-10">
// //                 <h1 className="text-3xl font-bold mb-4">Welcome to CertVerify</h1>
// //                 <p className="text-gray-600 mb-6">
// //                   A decentralized platform for issuing, storing, and verifying certificates securely.
// //                 </p>
// //                 {!account && (
// //                   <button
// //                     onClick={connectWallet}
// //                     className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
// //                   >
// //                     Connect Wallet to Continue
// //                   </button>
// //                 )}
// //               </div>
// //             }
// //           />

// //           {/* Verify Page */}
// //           <Route path="/verify" element={<VerifyCertificate />} />

// //           {/* Admin Dashboard (protected) */}
// //           <Route
// //             path="/admin/dashboard"
// //             element={
// //               account && isAdmin ? (
// //                 <AdminDashboard account={account} />
// //               ) : (
// //                 <Navigate to="/" />
// //               )
// //             }
// //           />

// //           {/* Student Dashboard (protected) */}
// //           <Route
// //             path="/student/dashboard"
// //             element={
// //               account && !isAdmin ? (
// //                 <StudentDashboard account={account} />
// //               ) : (
// //                 <Navigate to="/" />
// //               )
// //             }
// //           />
// //         </Routes>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import { useState } from "react";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import AdminDashboard from "./components/AdminDashboard";
// import StudentDashboard from "./components/StudentDashboard";
// import VerifyCertificate from "./components/VerifyCertificate";

// function App() {
//   const [account, setAccount] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const adminAddress = import.meta.env.VITE_ADMIN_ADDRESS?.toLowerCase();
//   const navigate = useNavigate();

//   // ✅ Connect wallet
//   const connectWallet = async () => {
//     if (!window.ethereum) return alert("Install MetaMask");
//     const accounts = await window.ethereum.request({
//       method: "eth_requestAccounts",
//     });
//     setAccount(accounts[0]);
//     const adminCheck = accounts[0].toLowerCase() === adminAddress;
//     setIsAdmin(adminCheck);

//     // ✅ Redirect after login
//     if (adminCheck) {
//       navigate("/admin/dashboard");
//     } else {
//       navigate("/student/dashboard");
//     }
//   };

//   return (
//     <div>
//       <Navbar account={account} connectWallet={connectWallet} isAdmin={isAdmin} />

//       <div className="p-6">
//         <Routes>
//           {/* Home */}
//           <Route
//             path="/"
//             element={
//               <div className="text-center mt-10">
//                 <h1 className="text-3xl font-bold mb-4">Welcome to CertVerify</h1>
//                 <p className="text-gray-600 mb-6">
//                   A decentralized platform for issuing, storing, and verifying certificates securely.
//                 </p>
//                 {!account && (
//                   <button
//                     onClick={connectWallet}
//                     className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
//                   >
//                     Connect Wallet to Continue
//                   </button>
//                 )}
//               </div>
//             }
//           />

//           {/* Verify Page */}
//           <Route path="/verify" element={<VerifyCertificate />} />

//           {/* Admin Protected Route */}
//           <Route
//             path="/admin/dashboard"
//             element={isAdmin ? <AdminDashboard account={account} /> : <Navigate to="/" />}
//           />

//           {/* Student Protected Route */}
//           <Route
//             path="/student/dashboard"
//             element={account && !isAdmin ? <StudentDashboard account={account} /> : <Navigate to="/" />}
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import VerifyCertificate from "./components/VerifyCertificate";

function App() {
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminAddress = import.meta.env.VITE_ADMIN_ADDRESS?.toLowerCase();
  const navigate = useNavigate();

  // ✅ Only for Admin: connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    const adminCheck = accounts[0].toLowerCase() === adminAddress;
    setIsAdmin(adminCheck);

    // ✅ Redirect after login
    if (adminCheck) {
      navigate("/admin/dashboard");
    } else {
      alert("❌ You are not admin. Students must login manually.");
      navigate("/student/dashboard");
    }
  };

  return (
    <div>
      <Navbar account={account} connectWallet={connectWallet} isAdmin={isAdmin} />

      <div className="p-6">
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <div className="text-center mt-10">
                <h1 className="text-3xl font-bold mb-4">Welcome to CertVerify</h1>
                <p className="text-gray-600 mb-6">
                  A decentralized platform for issuing, storing, and verifying certificates securely.
                </p>
                {!account && (
                  <button
                    onClick={connectWallet}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow"
                  >
                    Admin Login
                  </button>
                )}
              </div>
            }
          />

          {/* Verify Page */}
          <Route path="/verify" element={<VerifyCertificate />} />

          {/* Admin Protected Route */}
          <Route
            path="/admin/dashboard"
            element={isAdmin ? <AdminDashboard account={account} /> : <Navigate to="/" />}
          />

          {/* Student Dashboard - Always accessible (manual login form inside component) */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
