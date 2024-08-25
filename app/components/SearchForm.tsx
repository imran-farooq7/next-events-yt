"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchForm = () => {
	const [search, setSearch] = useState("");
	const router = useRouter();
	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!search) {
			return;
		}
		router.push(`/events/${search}`);
	};
	return (
		<form onSubmit={handleSearch}>
			<input
				name="search"
				value={search}
				type="search"
				onChange={(e) => setSearch(e.target.value)}
				required
				placeholder="Search events in any city..."
				className="block px-6 w-full rounded-2xl border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		</form>
	);
};

export default SearchForm;
