import { db as prisma } from "~/server/db";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const event = (await req.json()) as WebhookEvent;
		const { id: clerkUserId } = event.data;
		if (!clerkUserId) {
			return NextResponse.json(
				{ error: "No user ID provided" },
				{ status: 400 },
			);
		}
		let user = null;
		switch (event.type) {
			case "user.created": {
				user = await prisma.user.upsert({
					where: { clerkUserId },
					update: { clerkUserId },
					create: { clerkUserId },
				});
				break;
			}
			case "user.deleted": {
				user = await prisma.user.delete({
					where: { clerkUserId },
				});
				break;
			}
			default:
				break;
		}

		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
