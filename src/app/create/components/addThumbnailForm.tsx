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
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
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
			title: "",
		},
	});

	const { register, handleSubmit, formState } = form;

	const [selectedImage, setSelectedImage] = useState<File | undefined>();

	const { toast } = useToast();

	const createThumbnail = api.thumbnail.create.useMutation({
		onSuccess: () => {
			toast({
				title: "Thumbnail created",
				description: "Your thumbnail has been created",
			});
		},
		onError: () => {
			toast({
				variant: "destructive",
				title: "Thumbnail failed",
				description: "Your thumbnail has not been created",
			});
			form.reset();
			setSelectedImage(undefined);
		},
	});

	const onSubmit: SubmitHandler<ThumbnailSchema> = (data: ThumbnailSchema) => {
		const res = formThumbnailSchema.safeParse(data);
		const { title, image } = data;
		if (res.success) {
			createThumbnail.mutate({
				title: title,
				image: image[0]?.name ?? "",
			});
		}
		form.reset();
		setSelectedImage(undefined);
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

				{selectedImage && (
					<div className="flex">
						<Image
							alt="selectedImage"
							width={200}
							height={200}
							// create a preview of the selected image
							src={URL.createObjectURL(selectedImage)}
							className="object-cover rounded-sm"
						/>
					</div>
				)}

				<Button
					type="submit"
					variant={"default"}
					disabled={formState.isLoading}
					onClick={handleSubmit(onSubmit)}
				>
					{formState.isLoading ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
};

export default AddThumbnailForm;
