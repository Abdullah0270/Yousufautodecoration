// import { NextRequest, NextResponse } from "next/server";
// import cloudinary from "@/lib/cloudinary";

// export async function POST(req: NextRequest) {
//   const data = await req.formData();

//   const file = data.get("file") as File;

//   if (!file)
//     return NextResponse.json(
//       { error: "No File" },
//       { status: 400 }
//     );

//   const bytes = await file.arrayBuffer();

//   const buffer = Buffer.from(bytes);

//   const result = await new Promise<any>((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream(
//         {
//           folder: "decoration-shop",
//         },
//         (err, result) => {
//           if (err) reject(err);
//           else resolve(result);
//         }
//       )
//       .end(buffer);
//   });

//   return NextResponse.json({
//     url: result.secure_url,
//   });
// }
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file selected" },
        { status: 400 }
      );
    }

    // Detect file type
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      return NextResponse.json(
        {
          error: "Only image and video files are allowed.",
        },
        { status: 400 }
      );
    }

    // Image max size: 10 MB
    if (isImage && file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: "Image size must be less than 10 MB.",
        },
        { status: 400 }
      );
    }

    // Video max size: 100 MB
    if (isVideo && file.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        {
          error: "Video size must be less than 100 MB.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "decoration-shop",
            resource_type: isVideo ? "video" : "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      resourceType: isVideo ? "video" : "image",
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    return NextResponse.json(
      {
        error: "File upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}