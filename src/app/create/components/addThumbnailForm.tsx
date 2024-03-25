"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
	type ThumbnailSchema,
	formThumbnailSchema,
} from "../../validation/formSchema";

const AddThumbnailForm = () => {
	const form = useForm<ThumbnailSchema>({
		resolver: zodResolver(formThumbnailSchema),
		defaultValues: {
			title: undefined,
			image: undefined,
		},
	});

	const { register, handleSubmit, formState } = form;

	const [selectedImage, setSelectedImage] = useState<File | undefined>();

	console.log(selectedImage);

	// toDO remove the form component and just use the basic one instead of this then create trpc mutation

	const onSubmit: SubmitHandler<ThumbnailSchema> = (data: ThumbnailSchema) => {
		const res = formThumbnailSchema.safeParse(data);
		console.log(res);
		if (res.success) {
			console.log({ res });
		}
	};

	const fileRef = register("image", { required: true });

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={"space-y-8 max-w-md pt-14"}
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="The title of your Thumbnail"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				{formState.errors.title && (
					<p className="text-destructive">{formState.errors.title.message}</p>
				)}

				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Upload Thumbnail</FormLabel>
							<FormControl>
								<Input
									type="file"
									placeholder="Upload your Thumbnail"
									{...fileRef}
									onChange={(e) => {
										if (e.target.files) {
											console.log(e.target.files);
											field.onChange(e.target.files);
											setSelectedImage(e.target.files[0] ?? undefined);
										}
									}}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				{formState.errors.image && (
					<p className="text-destructive text-base">
						{formState.errors.image.message}
					</p>
				)}
				<Button
					type="submit"
					variant={"default"}
					disabled={formState.isLoading}
					onClick={handleSubmit(onSubmit)}
				>
					Submit Thumbnail
				</Button>
			</form>
		</Form>
	);
};

export default AddThumbnailForm;
