"use client";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { User } from "next-auth";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
interface Props {
	user: User;
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}
export default function Navbar({ user }: Props) {
	const pathName = usePathname();
	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 justify-between">
							<div className="flex">
								<div className="flex flex-shrink-0 items-center">
									<Link href={"/"} className="font-bold text-3xl">
										NextEvent
									</Link>
								</div>
								<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
									{/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
									<Link
										href="/"
										className={`relative inline-flex items-center   px-1 pt-1 text-sm font-medium text-gray-900 ${
											pathName === "/" ? "text-indigo-600" : ""
										}`}
									>
										Home
										{pathName === "/" && (
											<motion.div
												initial={{ width: 0 }}
												animate={{
													width: "82%",
													transition: {
														duration: 0.3,
													},
												}}
												className="h-1 bg-indigo-500 w-[82%] absolute bottom-[15px]"
											></motion.div>
										)}
									</Link>
									<Link
										href="/events"
										className={`relative inline-flex items-center   px-1 pt-1 text-sm font-medium text-gray-900 ${
											pathName === "/events"
												? "text-indigo-600"
												: "border-transparent"
										}`}
									>
										Events
										{pathName === "/events" && (
											<motion.div
												initial={{ width: 0 }}
												animate={{
													width: "82%",
													transition: {
														duration: 0.3,
													},
												}}
												className="h-1 bg-indigo-500 w-[82%] absolute bottom-[15px]"
											></motion.div>
										)}
									</Link>
								</div>
							</div>
							<div className="hidden sm:ml-6 sm:flex sm:items-center">
								{/* Profile dropdown */}
								{user && (
									<Menu as="div" className="relative ml-3">
										<div>
											<MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
												<span className="absolute -inset-1.5" />
												<span className="sr-only">Open user menu</span>
												<Image
													src={user?.image!}
													width={40}
													height={40}
													className="object-cover rounded-full"
													alt="avatar"
												/>
											</MenuButton>
										</div>
										<Transition
											enter="transition ease-out duration-200"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<MenuItem>
													{({ focus }) => (
														<Link
															href="/events/myevents"
															className={classNames(
																focus ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															My Events
														</Link>
													)}
												</MenuItem>

												<MenuItem>
													{({ focus }) => (
														<button
															onClick={() => signOut()}
															className={classNames(
																focus ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Sign out
														</button>
													)}
												</MenuItem>
											</MenuItems>
										</Transition>
									</Menu>
								)}
								{!user && (
									<button
										type="button"
										className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										onClick={() => signIn("github")}
									>
										Sign in
									</button>
								)}
							</div>
							<div className="-mr-2 flex items-center sm:hidden">
								{/* Mobile menu button */}
								<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</DisclosureButton>
							</div>
						</div>
					</div>

					<DisclosurePanel className="sm:hidden">
						<div className="space-y-1 pb-3 pt-2">
							{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
							<DisclosureButton
								as="a"
								href="#"
								className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
							>
								Home
							</DisclosureButton>
							<DisclosureButton
								as="a"
								href="#"
								className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
							>
								All Events
							</DisclosureButton>
						</div>
						<div className="border-t border-gray-200 pb-3 pt-4">
							<div className="flex items-center px-4">
								<div className="flex-shrink-0">
									<Image
										src={user?.image!}
										width={20}
										height={20}
										className="object-cover"
										alt="avatar"
									/>
								</div>
								<div className="ml-3">
									<div className="text-base font-medium text-gray-800">
										{user?.name}
									</div>
									<div className="text-sm font-medium text-gray-500">
										{user?.email}
									</div>
								</div>
							</div>
							<div className="mt-3 space-y-1">
								<Link
									href="/events/myevents"
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
								>
									My Events
								</Link>
								<DisclosureButton
									as="a"
									href="#"
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
								>
									Sign out
								</DisclosureButton>
							</div>
						</div>
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
}
