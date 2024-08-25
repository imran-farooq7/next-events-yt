import { Suspense } from "react";
import Events from "../components/Events";
import Loading from "./loading";
interface Props {
	searchParams: {
		page: string;
	};
}

const EventsPage = async ({ searchParams }: Props) => {
	const page = searchParams.page || 1;

	return (
		<main className="mx-auto py-12 max-w-7xl px-4 sm:px-6 flex flex-col items-center">
			<h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
				All Events
			</h1>
			<Suspense key={page} fallback={<Loading />}>
				<Events page={+page} />
			</Suspense>
		</main>
	);
};

export default EventsPage;
