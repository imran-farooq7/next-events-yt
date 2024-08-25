import Events from "@/app/components/Events";
import { Suspense } from "react";
import Loading from "../loading";

interface Props {
	params: {
		city: string;
	};
}
export function generateMetadata({ params }: Props) {
	const city = params.city;
	return {
		title: `Events in ${city.charAt(0).toLocaleUpperCase() + city.slice(1)}`,
	};
}
const EventsCityPage = async ({ params }: Props) => {
	return (
		<div className="mx-auto py-12 max-w-7xl px-4 sm:px-6">
			<h1 className="text-3xl font-bold text-center tracking-tight text-white sm:text-5xl">
				Events in <span className="capitalize">{params.city}</span>
			</h1>
			<Suspense fallback={<Loading />}>
				<Events city={params.city} />
			</Suspense>
		</div>
	);
};

export default EventsCityPage;
