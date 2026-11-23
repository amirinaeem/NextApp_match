import { differenceInYears, format } from "date-fns";
import { ActionResult } from "./types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";


export function calculateAge(dob: string | Date) {
    return differenceInYears(new Date(), new Date(dob));
}

export function formatShortDateTime(date: Date) {
    return format(date, 'dd MMM yy h:mm a');
}


export function transformImageUrl(imageUrl?: string | null) {
    if (!imageUrl) return null;

    if (!imageUrl.includes('cloudinary.com')) {
        return imageUrl;
    }

    const uploadPath = '/upload/';
    const uploadIndex = imageUrl.indexOf(uploadPath);

    if (uploadIndex === -1) return imageUrl;

    const insertIndex = uploadIndex + uploadPath.length;

    const transformation = 'c_fill,w_640,h_640,g_face/';

    return (
        imageUrl.slice(0, insertIndex) +
        transformation +
        imageUrl.slice(insertIndex)
    );
}


export function handlePrismaError<T>(error: unknown): ActionResult<T> {

    if (error instanceof PrismaClientKnownRequestError || error instanceof Error) {
        return { status: 'error', error: error.message }
    } else {
        return { status: 'error', error: 'Something went wrong' }
    }
}
