"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addToMyEvents = async (event: Event) => {
	const session = await auth();
	if (!session) {
		return redirect("/api/auth/signin");
	}
	const addedEvent = await prisma.user.update({
		where: {
			id: session.user?.id!,
		},
		data: {
			myEvents: {
				connect: {
					id: event.id,
				},
			},
		},
	});
	if (addedEvent) {
		revalidatePath("/events/myevents");
		return {
			status: "success",
			message: "Added event successfully",
		};
	} else {
		return {
			status: "error",
			message: "Error adding event",
		};
	}
};
