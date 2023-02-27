// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useRouter } from "next/router";
import {useEffect, useRef, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Event {
    title: string;
    start: string;
    end: string;
    extendedProps: { department: string };
    description: string;
}

export default function Ade() {
    const router = useRouter();
    const {formation} = router.query;
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        let tmpEvents: Event[] = [];

        if(formation !== undefined) {
            const data = require(`@/public/ade/${formation}.json`);
            for (let indexEvents in data.VCALENDAR[0].VEVENT) {
                tmpEvents.push(
                    {
                        "title": data.VCALENDAR[0].VEVENT[indexEvents].SUMMARY + " - " + data.VCALENDAR[0].VEVENT[indexEvents].LOCATION,
                        "start": data.VCALENDAR[0].VEVENT[indexEvents].DTSTART,
                        "end": data.VCALENDAR[0].VEVENT[indexEvents].DTEND,
                        "extendedProps": {
                            "department": 'Informatique'
                        },
                        "description": data.VCALENDAR[0].VEVENT[indexEvents].DESCRIPTION,
                    }
                );
            }
            setEvents(tmpEvents);
        }
    }, [formation]);

    const calendarRef = useRef(null);

    return (
            <div>
                <h1 className="font-mono text-3xl text-center font-bold mb-5 mt-5">
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a href="/edt">
                        Retour à l'emploi du temps 📖
                    </a>
                </h1>
                <FullCalendar
                    innerRef={calendarRef}
                    locale="fr"
                    events={events}
                    plugins={[timeGridPlugin, interactionPlugin]}
                    editable
                    selectable
                    droppable
                    weekNumberCalculation="ISO"
                    hiddenDays={[0, 6]}
                />
            </div>
    );
}
