
'use client';

import { MessageDto } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Avatar, Button, Table, toast, } from "@heroui/react";
import { transformImageUrl } from "@/lib/util";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "@/server/actions/messages";
import { useTransition } from "react";


type Props = {
    messages: MessageDto[];
    container: string;
};

function MessageTable({ messages, container }: Props) {
    const router = useRouter();

    const [isDeleting, startTransition] = useTransition();



    const isOutBox = container === 'outbox';
    const partyLabel = isOutBox ? 'Recipient' : 'Sender';

    const handleDelete = (messageId: string) => {
        startTransition(async () => {
            const result = await deleteMessage(messageId, isOutBox);
            if (result.status === 'error') toast.danger(result.error as string)
        });
    };

    return (
        <Table>
            <Table.ScrollContainer className="max-h-[65vh] overflow-y-auto">
                <Table.Content aria-label="Messages table">
                    <Table.Header>
                        <Table.Column id="party" isRowHeader>
                            {partyLabel}
                        </Table.Column>

                        <Table.Column id="text">Message</Table.Column>
                        <Table.Column id="created">Date</Table.Column>
                        <Table.Column id="actions">Actions</Table.Column>
                    </Table.Header>

                    <Table.Body
                        items={messages}
                        renderEmptyState={() => "No messages to display"}
                    >
                        {(message) => {
                            const name = isOutBox
                                ? message.recipientName
                                : message.senderName;

                            const image = isOutBox
                                ? message.recipientImage
                                : message.senderImage;

                            const partyId = isOutBox
                                ? message.recipientId
                                : message.senderId;

                            // Treat both null and undefined as unread
                            const isUnread = !isOutBox && message.dateRead == null;

                            return (
                                <Table.Row
                                    id={message.id}
                                    onAction={() => router.push(`/members/${partyId}/chat`)}
                                    className={`
                                        cursor-pointer transition-colors
                                        ${isUnread
                                            ? '!bg-blue-50 dark:!bg-blue-950/50'
                                            : 'hover:bg-default-100'
                                        }
                                    `}
                                >
                                    <Table.Cell>
                                        <div className={`
                                            flex items-center gap-3 py-1
                                            ${isUnread ? 'border-l-4 border-blue-500 pl-2' : ''}
                                        `}>
                                            <Avatar>
                                                <Avatar.Image
                                                    alt={name}
                                                    src={transformImageUrl(image) || '/images/user.png'}
                                                />
                                            </Avatar>

                                            <div className="flex flex-col gap-1">
                                                <span className={`
                                                    ${isUnread
                                                        ? 'font-bold text-blue-950 dark:text-blue-100'
                                                        : 'font-medium'
                                                    }
                                                `}>
                                                    {name}
                                                </span>

                                                {isUnread && (
                                                    <span className="w-fit rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                                                        UNREAD
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className={`
                                            line-clamp-1
                                            ${isUnread
                                                ? 'font-bold text-default-900 dark:text-white'
                                                : 'text-default-500'
                                            }
                                        `}>
                                            {message.text}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className={`
                                            ${isUnread
                                                ? 'font-semibold text-default-800 dark:text-default-200'
                                                : 'text-default-500'
                                            }
                                        `}>
                                            {message.created}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div onPointerDown={e => e.stopPropagation()}>
                                            <Button onClick={() => handleDelete(message.id)}
                                                isIconOnly
                                                variant="danger-soft"
                                                aria-label="Delete message"
                                                isPending={isDeleting}
                                            >
                                                <AiFillDelete size={18} />
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        }}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}

export default MessageTable;
