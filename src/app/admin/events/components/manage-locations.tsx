import { EventType } from "./delete-event";
import LocationsList from "./locations-list";
import ManageLocationsDialog from "./manage-locations-dialog";

export default function ManageLocations({ event }: { event: EventType }) {
    return (
        <ManageLocationsDialog eventId={event.id} eventName={event.eventName}>
            <div>
                <LocationsList eventId={event.id} />
            </div>
        </ManageLocationsDialog>
    )
}