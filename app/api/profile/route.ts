import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const { bgImage } = await req.json();

    const newProfile = await db.profile.update({
      where: {
        id: profile.id
      },
      data: {
        bgImage
      }
    });

    return NextResponse.json(newProfile);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    await db.profile.delete({
      where: {
        id: profile.id
      }
    });

    db.server.deleteMany({
      where: {
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN]
            }
          }
        }
      }
    });

    return new NextResponse("Profile deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
