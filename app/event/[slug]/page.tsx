import Button from "@/app/components/Button";
import { events } from "@/lib/events";
import { formatDate } from "@/lib/helpers";
import { prisma } from "@/prisma/prisma";
import delay from "delay";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
	params: {
		slug: string;
	};
}
export async function generateStaticParams() {
	const events = await prisma.event.findMany();
	return events.map((event) => ({
		slug: event.slug,
	}));
}
export function generateMetadata({ params }: Props) {
	const event = events.find((event) => event.slug === params.slug);
	return {
		title: event?.name,
	};
}
const EventDetailPage = async ({ params }: Props) => {
	const event = await prisma.event.findUnique({
		where: {
			slug: params.slug,
		},
	});
	if (!event) {
		return notFound();
	}
	return (
		<div className="flex max-w-7xl mx-auto flex-col md:flex-row justify-between gap-12 p-12 text-white">
			<Image
				src={event?.imageUrl!}
				width={400}
				height={200}
				className="object-cover border-white rounded-lg"
				alt="event image"
			/>
			<div>
				<div className="flex gap-4">
					<p className="font-bold text-lime-500 text-2xl">
						{formatDate(event?.date!, true)}
					</p>
				</div>
				<h1 className="font-bold text-2xl lg:text-5xl text-white my-">
					{event?.name}
				</h1>
				<p className="text-white mt-4">
					Organized By:{" "}
					<span className="font-bold text-lime-500">
						{event?.organizerName}
					</span>
				</p>
				<p className="my-4 max-w-4xl leading-7">{event?.description}</p>
				<p className="my-4">
					Location:{" "}
					<span className="font-bold text-lime-500">{event?.location}</span>
				</p>
				<Button event={event} />
			</div>
		</div>
	);
};

export default EventDetailPage;
