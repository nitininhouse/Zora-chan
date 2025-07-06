import { PinataSDK } from "pinata-web3";

export const pinataClient = new PinataSDK({
  pinataJwt: "", // 
  pinataGateway: "https://gateway.pinata.cloud/ipfs/"
});