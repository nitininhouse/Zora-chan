import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!,
  pinataGateway: "https://cf-ipfs.com/ipfs/"
});