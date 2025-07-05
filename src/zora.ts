import { setApiKey } from "@zoralabs/coins-sdk";


if (process.env.NEXT_PUBLIC_ZORA_API_KEY) {
  setApiKey(process.env.NEXT_PUBLIC_ZORA_API_KEY);
}

export * from "@zoralabs/coins-sdk";
