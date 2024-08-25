"use client";
import { HeartIcon } from "@heroicons/react/16/solid";
import { Event } from "@prisma/client";
import { useState } from "react";
import { addToMyEvents } from "../actions/actions";
import toast from "react-hot-toast";

const Button = ({ event }: { event: Event }) => {
	const [loading, setLoading] = useState(false);
	const handleAddEvent = async (event: Event) => {
		try {
			setLoading(true);
			const evnt = await addToMyEvents(event);
			if (
				evnt.status === "success" &&
				evnt.message === "Added event successfully"
			) {
				toast.success(evnt.message);
			} else {
				toast.error(evnt.message);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
	};
	return (
		<button
			onClick={() => handleAddEvent(event)}
			className="w-1/2 flex justify-center items-center bg-sky-500 gap-2 text-white my-12 font-bold px-7 py-3 rounded-xl hover:scale-105 transition-all ease-in-out"
		>
			{loading ? (
				<span className="animate-pulse">Adding....</span>
			) : (
				<>
					Add to my events <HeartIcon color="red" width={30} height={30} />
				</>
			)}
		</button>
	);
};

export default Button;
