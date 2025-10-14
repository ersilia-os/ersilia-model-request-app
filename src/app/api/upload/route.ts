import { google } from "googleapis";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: Request) {
  try {
    const { link } = (await req.json()) as { link: string };
    if (!link) return NextResponse.json({ error: "No link provided" }, { status: 400 });

    const match = link.match(/[-\w]{25,}/);
    if (!match) return NextResponse.json({ error: "Invalid link" }, { status: 400 });

    const fileId = match[0];

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    const token = await auth.getAccessToken();
    const downloadUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

    const fileResponse = await fetch(downloadUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!fileResponse.ok) throw new Error(`Could not download file: ${fileResponse.statusText}`);

    const arrayBuffer = await fileResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);

    const folderId = "1ypkYYSR7sZzYLJpLVcw22T_lHGcuSTHj";
    const uploadRes = await drive.files.create({
      requestBody: {
        name: `uploaded_${Date.now()}.pdf`,
        mimeType: "application/pdf",
        parents: [folderId],
      },
      media: {
        mimeType: "application/pdf",
        body: stream,
      },
      fields: "id",
      supportsAllDrives: true,
    });

    const uploadedFileId = uploadRes.data.id;

    return NextResponse.json({
      success: true,
      uploadedFileId,
      link: `https://drive.google.com/file/d/${uploadedFileId}/view`,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
}