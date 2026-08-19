import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/config";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { cookies } from "next/headers";

interface Params {
  slug: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;

  try {
    const docRef = doc(db, "views", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ views: docSnap.data().count || 0 });
    } else {
      return NextResponse.json({ views: 0 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<Params> },
) {
  const { slug } = await params;

  try {
    const host = request.headers.get("host");
    if (host?.includes("localhost:3000")) {
      return NextResponse.json({ message: "Views not counted on localhost" });
    }

    const cookieStore = await cookies();
    const viewCookie = cookieStore.get(`viewed-${slug}`);

    if (viewCookie) {
      return NextResponse.json({ message: "View already registered" });
    }

    const docRef = doc(db, "views", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, { count: increment(1) });
    } else {
      await setDoc(docRef, { count: 1 });
    }

    cookieStore.set(`viewed-${slug}`, "true", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ message: "View registered successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
