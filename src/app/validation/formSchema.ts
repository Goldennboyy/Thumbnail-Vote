import { z } from "zod";

const MAX_DOCUMENT_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const Accepted_Image_Types = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/jpg",
];

function sizeinMB(sizeInBytes: number): number {
	const result = (sizeInBytes / 1024 / 1024).toFixed(2);
	return Number.parseInt(result);
}

export const formThumbnailSchema = z.object({
	title: z
		.string()
		.min(3, {
			message: "Title must be at least 3 characters",
		})
		.max(20),

	image: z
		.custom<FileList>()
		.refine((files) => {
			return Array.from(files ?? []).length !== 0;
		}, "Image is required")
		.refine((files) => {
			return Array.from(files ?? []).every(
				(file) => sizeinMB(file.size) <= MAX_DOCUMENT_FILE_SIZE,
			);
		}, `The maximum image size is ${MAX_DOCUMENT_FILE_SIZE}MB`)
		.refine((files) => {
			return Array.from(files ?? []).every((file) =>
				Accepted_Image_Types.includes(file.type),
			);
		}, "File type is not supported"),

	// image: z
	// .instanceof(File)
	// .refine((file) => file.size <= MAX_DOCUMENT_FILE_SIZE, {
	// 	message: "File must be smaller than 5MB",
	// })
	// .refine((file) => Accepted_Image_Types.includes(file.type), {
	// 	message: "Only .jpeg, .png, .webp, .jpg formats are supported.",
	// }),
});

export type ThumbnailSchema = z.infer<typeof formThumbnailSchema>;
