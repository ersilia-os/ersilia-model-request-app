import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";
import { normalizeFilename } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

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

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_CLIENT_EMAIL,
      key: process.env.GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const normalizedFilename = normalizeFilename(file.name);

    const newFile = await drive.files.create({
      requestBody: {
        name: normalizedFilename,
        mimeType: file.type,
        parents: [process.env.GOOGLE_SERVICE_SHARED_DRIVE_ID],
      },
      media: {
        mimeType: file.type,
        body: Readable.from(buffer),
      },
      fields: "id, name, webViewLink",
      supportsAllDrives: true,
    });

    const link = newFile.data.webViewLink;
    const fileName = newFile.data.name;

    return NextResponse.json({
      link,
      fileName,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Something went wrong, please try again",
      },
      { status: 500 }
    );
  }
}
