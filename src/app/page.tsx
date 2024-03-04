import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import thumbnail from "../../public/assets/image.webp";

export default async function Home() {
	return (
		<div className="bg-slate-300 dark:bg-slate-800">
			<section className="flex justify-center w-full min-h-screen mx-auto ">
				<div className="flex flex-col items-center pt-24 space-y-8 p-4">
					<Image
						alt="Thumbnail"
						width={350}
						height={300}
						src={thumbnail}
						className="object-cover rounded-md"
					/>

					<h1 className="max-w-2xl text-2xl md:text-4xl font-extrabold leading-none tracking-tight text-center">
						The platform that allows you to get easy feedback on your thumbnails
						by the community
					</h1>

					<p className="max-w-xl text-xl leading-tight text-slate-200 font-semibold text-center font-base">
						Upload your thumbnails variations and send links to your friends to
						help you hone in your design skills.
					</p>

					<Link href={"/create"}>
						<Button variant="default" type="button">
							Create Thumbnail
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
