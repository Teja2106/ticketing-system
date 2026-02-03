import { Card, CardHeader, CardDescription, CardTitle } from "../ui/card";

export default function TicketCounter() {
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardDescription>
                        Total Tickets Sold
                    </CardDescription>
                    <CardTitle className="text-3xl">
                        12,450
                    </CardTitle>
                </CardHeader>
            </Card>

            <Card className="max-w-xl w-full">
                <CardHeader>
                    <CardDescription>
                        Total Check-ins
                    </CardDescription>
                    <CardTitle className="text-3xl">
                        8,920
                    </CardTitle>
                </CardHeader>
            </Card>
        </>
    )
}