'use client';

import { CldImage } from "next-cloudinary"
import { Photo } from "../../generated/prisma/client"
import Image from 'next/image';
import { useOverlayState } from "@heroui/react";
import AppModal from "./AppModal";



type Props = {
    photo: Photo,
    enableLightbox?: boolean
}


export default function MemberImage({ photo }: Props) {
    return (
        <div>
            {photo.publicId ? (
                <CldImage
                    alt="Image of member"
                    src={photo.publicId}
                    width={500}
                    height={500}
                    crop='fill'
                    gravity="face"
                    className="rounded-xl"
                />
            ) : (
                <Image
                    alt='image of member'
                    width={500}
                    height={500}
                    src={photo.url}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="aspect-square object-cover rounded-xl relative"
                />
            )}
        </div>
    )
}