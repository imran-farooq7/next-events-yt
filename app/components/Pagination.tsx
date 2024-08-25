import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
interface Props {
	page: number;
	totalEvents: number;
}
const Pagination = ({ page, totalEvents }: Props) => {
	const prevPath = page > 1 ? `/events?page=${page - 1}` : "";
	const nextPath = totalEvents > page * 8 ? `/events?page=${page + 1}` : "";
	return (
		<nav className="flex items-center justify-between bg-transparent w-full p-4 sm:px-6">
			{prevPath && (
				<Link
					href={prevPath}
					className="relative inline-flex items-center rounded-md bg-cyan-500 px-8 py-4 text-sm font-semibold text-white hover:bg-cyan-700 gap-x-2"
				>
					<ArrowLeftIcon className="size-5 text-white font-bold" />
					Previous
				</Link>
			)}
			{nextPath && (
				<Link
					href={nextPath}
					className="relative inline-flex items-center rounded-md bg-cyan-500 px-8 py-4 text-sm font-semibold text-white ml-auto hover:bg-cyan-700 gap-x-2"
				>
					<ArrowRightIcon className="size-5 text-white font-bold" />
					Next
				</Link>
			)}
		</nav>
	);
};

export default Pagination;
