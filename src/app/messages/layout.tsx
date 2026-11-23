import { buttonVariants, Card, Separator } from "@heroui/react";
import MessageNav from "./MessageNav";
import Link from "next/link";
import { Suspense } from "react";
import SectionTitle from "./SectionTitle";



export default function Layout(props: LayoutProps<"/messages">) {

    return (
        <div className="grid grid-cols-12 gap-5 h-[80vh]">
            <div className="col-span-3">
                <Card className="w-full mt-6 items-center h-[80vh]">
                    <Card.Content>
                        <MessageNav />
                    </Card.Content>
                    <Card.Footer className="w-full">
                        <Link href='/members' className={buttonVariants({
                            variant: 'primary',
                            className: 'w-full'
                        })}>
                            Go Back
                        </Link>
                    </Card.Footer>
                </Card>
            </div>
            <div className="col-span-9">
                <Card className="w-full mt-6 h-[80vh]">
                    <Card.Header>
                        <Suspense>
                            <SectionTitle />
                        </Suspense>
                    </Card.Header>
                    <Separator />
                    <Card.Content className="overflow-y-auto">
                        {props.children}
                    </Card.Content>
                </Card>
            </div>
        </div>
    )
}