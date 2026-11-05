'use client';

import { Spinner, Tab, Tabs } from "@heroui/react";
import { Member } from "../../../generated/prisma/client";
import MemberCard from "../members/MemberCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useTransition } from "react";


type Props = {
    members: Member[];
    likeIds: string[];
}


const tabs = [
    { id: 'target', label: 'Members I have liked' },
    { id: 'source', label: 'Members that like me' },
    { id: 'mutual', label: 'Mutual Likes' }
]


export default function ListTabs({ members, likeIds }: Props) {

    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('type') ?? 'target';
    const [isPending, startTransition] = useTransition();

    const handleChange = (id: Key) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            params.set('type', id.toString());
            router.replace(`${pathName}?${params.toString()}`)
        })
    }

    return (
        <div className="flex flex-col mt-10 gap-5 w-full">
            <Tabs onSelectionChange={id => handleChange(id)} selectedKey={currentTab}>
                <div className="flex items-center">
                    <Tabs.ListContainer className="w-2xl flex">
                        <Tabs.List aria-label="Like tabs">
                            {tabs.map(tab => (
                                <Tabs.Tab className={currentTab === tab.id ? 'text-white' : ''} key={tab.id} id={tab.id}>
                                    {tab.label}
                                    <Tabs.Indicator className="bg-accent" />
                                </Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Tabs.ListContainer>
                </div>

                {isPending && (
                    <Spinner size="md" color="accent" className="ml-2" />
                )}

                {tabs.map(tab => (
                    <Tabs.Panel key={tab.id} id={tab.id}>
                        {members.length > 0 ? (
                            <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                                {members.map(member => (
                                    <MemberCard key={member.id} likeIds={likeIds} member={member} />
                                ))}
                            </div>
                        ) : (
                            <div>No Members for this filer </div>
                        )}
                    </Tabs.Panel>
                ))}
            </Tabs>
        </div>
    )
}