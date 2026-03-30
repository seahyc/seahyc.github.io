import { DEFAULT_DESTINATION_COSTS } from "../constants.js";
export function buildLifestyleEquivalents(discretionaryAnnual, assumptions = DEFAULT_DESTINATION_COSTS) {
    return Object.entries(assumptions).map(([key, item]) => {
        const perTrip = item.airfare + item.insurance + item.duration * (item.hotelPerNight + item.dailySpend);
        const trips = discretionaryAnnual / perTrip;
        return {
            key,
            label: `${item.duration}-day ${item.label} trip`,
            perTrip,
            trips,
        };
    });
}
