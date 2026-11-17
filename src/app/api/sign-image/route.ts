
import { requireAuthUser } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // 1. Make sure the user is authenticated
    await requireAuthUser();

    // 2. Read the parameters sent by Cloudinary
    const { paramsToSign } = await request.json();

    // 3. Check that the required parameters exist
    if (!paramsToSign || typeof paramsToSign !== "object") {
        return NextResponse.json(
            { error: "Invalid upload parameters" },
            { status: 400 }
        );
    }

    // 4. Make sure the API secret is configured
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiSecret) {
        throw new Error("CLOUDINARY_API_SECRET is not configured");
    }

    // 5. Generate the Cloudinary signature
    const signature = cloudinary.v2.utils.api_sign_request(
        paramsToSign,
        apiSecret
    );

    // 6. Return the signature
    return NextResponse.json({ signature });
}
