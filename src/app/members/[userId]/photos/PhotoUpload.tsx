import { addImage } from "@/server/actions/members";
import { toast } from "@heroui/react";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from 'react-icons/hi2'

export default function PhotoUpload() {
    return (
        <CldUploadButton
            options={{
                maxFiles: 1,
                folder: 'my-nextmatch'
            }}
            onSuccess={async (result) => {
                if (result.info && typeof result.info === 'object') {
                    await addImage(result.info.secure_url, result.info.public_id)
                }
            }}

            onError={e => {
                if (e && typeof e === 'object') {
                    toast.danger(e.statusText)
                } else {
                    toast.danger('Problem with uploading to cloundinary or saving from cloudinary to db')
                }
            }}

            signatureEndpoint='/api/sign-image'
            className="flex items-center bg-accent text-white gap-2 rounded-lg py-2 px-4 hover:bg-background-secondary/70 cursor-pointer"
        >



            <HiPhoto size={28} />
            Upload new Image

        </CldUploadButton>
    )
}