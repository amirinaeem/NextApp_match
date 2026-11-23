'use client';

import { chatSchema, ChatSchema } from "@/lib/schemas/chatSchema";
import { createMessage } from "@/server/actions/messages";
import { Button, InputGroup, InputGroupSuffix, toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";


export default function ChatForm() {

    const params = useParams<{ userId: string }>();

    const { register, handleSubmit, resetField, formState: { isValid, isSubmitting } } = useForm<ChatSchema>({
        resolver: zodResolver(chatSchema)
    })

    const onSubmit = async (data: ChatSchema) => {
        const result = await createMessage(params.userId, data);
        if (result.status === 'error') toast.danger(result.error as string);
        else {
            resetField('text')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full items-center gap-2 flex flex-col">
            <InputGroup className='w-full py-2'>
                <InputGroup.Input
                    aria-label="chat input"
                    placeholder="Enter Your Message"
                    className='w-full'
                    {...register('text')}
                />

                <InputGroupSuffix>
                    <Button
                        isIconOnly
                        type="submit"
                        isPending={isSubmitting}
                        isDisabled={!isValid}
                        className='rounded-full'>
                        <HiPaperAirplane size={18} />
                    </Button>
                </InputGroupSuffix>

            </InputGroup>
        </form>
    )
}