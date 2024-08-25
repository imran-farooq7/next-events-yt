"use client";
// import { formatDate } from "@/lib/helpers";
import { formatDate } from "@/lib/helpers";
import { Event } from "@prisma/client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const EventCard = ({ event }: { event: Event }) => {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["0 1", "1.5 1"],
	});
	const scaleIt = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
	const opacIt = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
	return (
		<motion.div
			key={event.id}
			ref={ref}
			initial={{ opacity: 0, scale: 0.8 }}
			style={{ scale: scaleIt, opacity: opacIt }}
		>
			<div className="relative hover:scale-105 transition-all ease-in-out">
				<div className="relative h-72 w-full overflow-hidden rounded-lg ">
					<Image
						src={event.imageUrl}
						alt={event.name}
						width={500}
						height={280}
						className="h-full w-full object-cover object-center"
					/>
				</div>
				<div className="relative mt-4 text-center text-white">
					<h3 className="text-base font-bold ">{event.name}</h3>
					<h4>{event.location}</h4>
				</div>
				<div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
					<div
						aria-hidden="true"
						className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
					/>
					<p className="relative text-lg font-semibold text-white">
						{formatDate(event.date, false)}
					</p>
				</div>
			</div>
		</motion.div>
	);
};

export default EventCard;
