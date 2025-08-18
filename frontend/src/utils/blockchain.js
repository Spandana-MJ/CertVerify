// // import { ethers } from "ethers";
// // import contractABI from "../contracts/CertificateVerification.json";

// // const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS; // replace with deployed address

// // export const getContract = () => {
// //   if (!window.ethereum) throw new Error("MetaMask not installed");

// //   const provider = new ethers.BrowserProvider(window.ethereum);
// //   const signer = provider.getSigner();
// //   return new ethers.Contract(contractAddress, contractABI, signer);
// // };

// import { ethers } from "ethers";
// import contractABI from "../contracts/CertificateVerification.json";

// const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

// export const getContract = () => {
//   if (!window.ethereum) throw new Error("MetaMask not installed");

//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const signer = provider.getSigner();
//   // 👇 use contractABI.abi instead of contractABI
//   return new ethers.Contract(contractAddress, contractABI.abi, signer);
// };


import { ethers } from "ethers";
import contractABI from "../contracts/CertificateVerification.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS; // from your .env

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(); // ✅ must await
  return new ethers.Contract(contractAddress, contractABI.abi, signer);
};
