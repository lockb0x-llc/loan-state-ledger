import { LoanEvent, EventStatus, Party, PartyId } from "./types";

/**
 * PURE FUNCTION
 * Derives the current status of an event based ONLY on its deterministic state.
 * 
 * Rules:
 * - ASSERTED: Exists but no acknowledgements (or just the asserter).
 * - PENDING: Has some acknowledgements but strictly less than required.
 * - EFFECTIVE: Has ALL required acknowledgements.
 */
export function deriveEventStatus(event: LoanEvent): EventStatus {
    // If no required acknowledgements, it's effectively auto-effective, but let's stick to the rule.
    if (!event.requiredAcknowledgements || event.requiredAcknowledgements.length === 0) {
        return "EFFECTIVE";
    }

    const ackedPartyIds = new Set(event.acknowledgements.map((a) => a.partyId));
    const missing = event.requiredAcknowledgements.filter(
        (reqId) => !ackedPartyIds.has(reqId)
    );

    if (missing.length === 0) {
        return "EFFECTIVE";
    }

    // If we have at least one ack from someone OTHER than the asserter (if they are required),
    // or just if the logic implies it's in flight.
    // Simple rule: Asserted = 0 acks (or just asserter?).
    // Let's say: if acks.length == 0 => ASSERTED.
    // if 0 < acks < required => PENDING.
    // BUT the asserter usually "acks" their own assertion implicitly or explicitly.
    // For this prototype, we'll assume the asserter DOES NOT sign their own ack in the array,
    // or if they do, we count it.
    // Let's go by count of 'required' that are met.

    const metCount = event.requiredAcknowledgements.reduce((acc, reqId) => {
        return acc + (ackedPartyIds.has(reqId) ? 1 : 0);
    }, 0);

    if (metCount === 0) {
        return "ASSERTED";
    }

    return "PENDING";
}

export function getMissingParties(event: LoanEvent, allParties: Party[]): Party[] {
    const ackedPartyIds = new Set(event.acknowledgements.map((a) => a.partyId));
    const missingIds = event.requiredAcknowledgements.filter(
        (reqId) => !ackedPartyIds.has(reqId)
    );
    return allParties.filter((p) => missingIds.includes(p.id));
}

export function getBadges(event: LoanEvent): string[] {
    const badges = [];
    if (event.covenantDetails) {
        badges.push("Automated Check");
        if (event.covenantDetails.isPassing) {
            badges.push("Passing");
        } else {
            badges.push("FAILING");
        }
    }
    return badges;
}
