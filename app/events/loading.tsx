import SkeletonCard from "@/app/components/SkeletonCard";

const Loading = () => {
	return (
		<div className="flex flex-wrap gap-8 mx-auto max-w-7xl justify-center mt-20">
			{Array.from({ length: 12 }).map((item, i) => {
				return <SkeletonCard key={i} />;
			})}
		</div>
	);
};

export default Loading;
