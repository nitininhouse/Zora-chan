
import { setApiKey } from "@zoralabs/coins-sdk";

if (typeof window !== "undefined") {
  setApiKey(process.env.NEXT_PUBLIC_ZORA_API_KEY!);
}


export * from "@zoralabs/coins-sdk";
