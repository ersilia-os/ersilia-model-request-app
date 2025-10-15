// app/api/upload-to-drive/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (
      !process.env.GOOGLE_SERVICE_CLIENT_EMAIL ||
      !process.env.GOOGLE_SERVICE_PRIVATE_KEY ||
      !process.env.GOOGLE_SERVICE_SHARED_DRIVE_ID
    ) {
      console.error("Missing Google credentials");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Initialize Google Drive API
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_CLIENT_EMAIL,
      key: process.env.GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to your shared folder
    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: [process.env.GOOGLE_SERVICE_SHARED_DRIVE_ID],
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer),
      },
      fields: "id, name, webViewLink",
    });

    console.log("✅ Upload successful! File ID:", response.data.id);

    return NextResponse.json({
      fileId: response.data.id,
      fileName: response.data.name,
      webViewLink: response.data.webViewLink,
    });
  } catch (error: any) {
    console.error("❌ Error uploading to Google Drive:", error.message);
    return NextResponse.json(
      {
        error: "Failed to upload file to Google Drive",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
