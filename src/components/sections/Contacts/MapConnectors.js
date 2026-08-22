import ConnectorLine from "@/components/sections/Contacts/ConnectorLine";


/**
 * Figma connector paths + map markers. Desktop only (lg+).
 * Rounded U-shapes from each pin toward the branch title.
 */
export default function MapConnectors({branches, embedded = false}) {
    const [left, right] = branches;
    if (!left?.marker || !right?.marker) return null;

    return (
        <div className="pointer-events-none absolute inset-0 z-2 hidden lg:block" aria-hidden>
            <ConnectorLine side="left" marker={left.marker} embedded={embedded}/>
            <ConnectorLine side="right" marker={right.marker} embedded={embedded}/>

            <span
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-light"
                style={{left: `${left.marker.x}%`, top: `${left.marker.y}%`}}
            />
            <span
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-light"
                style={{left: `${right.marker.x}%`, top: `${right.marker.y}%`}}
            />
        </div>
    );
}
