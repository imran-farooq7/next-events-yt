import { events } from "@/lib/events";
import Events from "./Events";
const FeaturedEvents = () => {
	return (
		<div className="mx-auto text-center py-3 max-w-7xl px-4 sm:px-6 lg:px-8">
			<h1 className="mb-3 mt-4 text-xl font-bold lg:text-3xl text-white">
				Featured Events
			</h1>{" "}
			<div className="">
				<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
					<Events isFeatured />
				</div>
			</div>
		</div>
	);
};

export default FeaturedEvents;
