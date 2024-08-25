import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "../loading";
import Events from "@/app/components/Events";

const MyEventPage = async () => {
	const session = await auth();
	if (!session) {
		return redirect("/api/auth/signin");
	}
	return (
		<main className="mx-auto py-12 max-w-7xl px-4 sm:px-6 flex flex-col items-center">
			<h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
				My Events
			</h1>
			<Suspense fallback={<Loading />}>
				<Events myEvents />
			</Suspense>
		</main>
	);
};

export default MyEventPage;
