  import { NextResponse } from "next/server";
  import { pinata } from "@/utils/ipfs/server-config"

  export const dynamic = "force-dynamic";

  export async function GET() {
    try {
      const uuid =     crypto.randomUUID();
      const keyData = await pinata.keys.create({
        keyName: uuid.toString(),
        permissions: {
          endpoints: {
            pinning: {
              pinFileToIPFS: true,
            },
          },
        },
        maxUses: 1,
      })
      console.log("API Key Response:", keyData);
      return NextResponse.json(keyData, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ text: "Error creating API Key:" }, { status: 500 });
    }
  }