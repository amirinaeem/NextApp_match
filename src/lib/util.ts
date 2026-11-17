import { differenceInYears } from "date-fns";


export function calculateAge(dob: string | Date) {
    return differenceInYears(new Date(), new Date(dob));
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
