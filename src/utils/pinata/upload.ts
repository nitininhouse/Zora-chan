// import { pinata } from "@/utils/ipfs/config";
// export const uploadToIPFS = async (file: File): Promise<string> => {
//   try {
//     const keyRequest = await fetch("/api/key");
//     const keyData = await keyRequest.json();

//     const upload = await pinata.upload.file(file)
//       .key(keyData.JWT)
//       .addMetadata({
//         name: file.name,
//         keyValues: {
//           type: 'character-content',
//           timestamp: new Date().toISOString()
//         }
//       });

//     const url = `https://w3s.link/ipfs/${upload.IpfsHash}`;
//     return url;
//   } catch (error) {
//     console.error("IPFS upload error:", error);
//     throw new Error(`Pinata upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
//   }
// };
