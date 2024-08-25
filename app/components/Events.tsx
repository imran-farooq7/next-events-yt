import { prisma } from "@/prisma/prisma";
import { Event } from "@prisma/client";
import Link from "next/link";
import EventCard from "./EventCard";
import Pagination from "./Pagination";
import { auth } from "@/auth";
import { cachedCityEvents, cachedEvents } from "@/lib/helpers";
interface Props {
	isFeatured?: boolean;
	city?: string;
	page?: number;
	myEvents?: boolean;
}

const Events = async ({ isFeatured, city, page, myEvents }: Props) => {
	const session = await auth();
	const totalEvents = await prisma.event.count();
	let Events: Event[];
	if (isFeatured) {
		const events = await prisma.event.findMany({
			where: {
				isFeatured: true,
			},
		});
		Events = events;
	} else if (city) {
		const events = await cachedCityEvents(city);
		Events = events;
	} else if (myEvents) {
		const events = await prisma.user.findMany({
			where: {
				id: session?.user?.id,
			},
			select: {
				myEvents: true,
			},
		});
		const { myEvents } = events[0];
		Events = myEvents;
	} else {
		const events = await cachedEvents(page!);
		Events = events;
	}

	return (
		<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
			<div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
				{Events.map((event) => (
					<Link key={event.id} href={`/event/${event.slug}`}>
						<EventCard event={event} />
					</Link>
				))}
			</div>
			<Pagination page={page!} totalEvents={totalEvents} />
		</div>
	);
};

export default Events;
