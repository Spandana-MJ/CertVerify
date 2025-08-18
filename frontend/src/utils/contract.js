// import { ethers } from "ethers";
// import contractABI from "./CertificateVerification.json"; // ABI after compilation

// const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS; // your deployed address

// export const getContract = () => {
//   if (!window.ethereum) throw new Error("MetaMask not found!");
//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const signer = provider.getSigner();
//   return new ethers.Contract(contractAddress, contractABI, signer);
// };


import contractData from "../contracts/CertificateVerification.json";

const contractABI = contractData.abi;
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export const getContract = () => {
  const { ethereum } = window;
  if (!ethereum) throw new Error("MetaMask not found!");

  const provider = new ethers.BrowserProvider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};
