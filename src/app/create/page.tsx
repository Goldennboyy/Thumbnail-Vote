import React from "react";
import AddThumbnailForm from "./components/addThumbnailForm";

const CreateThumbnail = () => {
	return (
		<section className="container flex flex-col pt-10 mx-auto max-w-7xl">
			<div className="space-y-8">
				<h1 className="text-3xl font-bold">Create a Thumbnail Test</h1>
				<p className="text-xl max-w-xl tracking-tight">
					Create your test so that other people can vote on their favorite
					thumbnail and help you redesign or pick the best options.
				</p>
			</div>
			<AddThumbnailForm />
		</section>
	);
};

export default CreateThumbnail;
