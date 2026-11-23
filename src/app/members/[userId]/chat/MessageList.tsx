
'use client';

type Message = {
    id: string;
    text: string;
};

type Props = {
    messages: Message[];
};

export default function MessageList({ messages }: Props) {

    return (
        <div className="relative flex flex-col flex-1">
            <ul>
                {messages.map(message => (
                    <li key={message.id}>
                        <p>{message.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
