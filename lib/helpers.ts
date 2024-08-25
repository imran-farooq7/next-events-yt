import { prisma } from "@/prisma/prisma";
import { unstable_cache } from "next/cache";

export const formatDate = (dateStr: string, isYear: boolean) => {
	const date = new Date(dateStr);
	const formattedDate = date.toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		weekday: isYear ? "long" : undefined,
		year: isYear ? "numeric" : undefined,
	});
	return formattedDate;
};

export const cachedEvents = unstable_cache(async (page: number) => {
	const events = await prisma.event.findMany({
		take: 8,
		skip: (page! - 1) * 8,
	});
	return events;
});
export const cachedCityEvents = unstable_cache(async (city: string) => {
	const events = await prisma.event.findMany({
		where: {
			city: {
				equals: city,
				mode: "insensitive",
			},
		},
	});
	return events;
});
