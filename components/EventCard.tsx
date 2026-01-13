import { LoanEvent, Party, EventStatus } from "@/lib/types";
import { deriveEventStatus } from "@/lib/stateResolver";
import { CheckCircle2, Clock, AlertCircle, FileText, Activity, Bot } from "lucide-react";
import clsx from "clsx";

interface EventCardProps {
    event: LoanEvent;
    parties: Party[];
    isLast?: boolean;
}

export function EventCard({ event, parties, isLast }: EventCardProps) {
    const status = deriveEventStatus(event);

    const getStatusIcon = (s: EventStatus) => {
        switch (s) {
            case "EFFECTIVE": return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
            case "PENDING": return <Clock className="w-5 h-5 text-amber-400" />;
            case "ASSERTED": return <AlertCircle className="w-5 h-5 text-zinc-400" />;
        }
    };

    const getStatusStyle = (s: EventStatus) => {
        switch (s) {
            case "EFFECTIVE": return "status-badge-effective";
            case "PENDING": return "status-badge-pending";
            case "ASSERTED": return "status-badge-asserted";
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "CovenantTest": return <Activity className="w-4 h-4" />;
            case "Notice": return <FileText className="w-4 h-4" />;
            case "DrawRequest": return <FileText className="w-4 h-4" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    // Resolve parties
    const asserter = parties.find(p => p.id === event.assertedBy);

    return (
        <div className="relative pl-8 pb-12">
            {/* Timeline Line */}
            {!isLast && (
                <div className="absolute left-[11px] top-8 bottom-0 w-px bg-zinc-800" />
            )}

            {/* Status Dot on Line */}
            <div className={clsx(
                "absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center bg-zinc-950 z-10",
                status === "EFFECTIVE" ? "border-emerald-500/50" :
                    status === "PENDING" ? "border-amber-500/50" : "border-zinc-700"
            )}>
                {getStatusIcon(status)}
            </div>

            <div className="glass-card rounded-xl p-5 w-full max-w-2xl">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <span className={clsx("text-xs font-mono uppercase px-2 py-0.5 rounded flex items-center gap-1",
                            event.type === "CovenantTest" ? "bg-indigo-500/20 text-indigo-300" : "bg-zinc-700/30 text-zinc-400"
                        )}>
                            {event.type === "CovenantTest" && <Bot className="w-3 h-3" />}
                            {event.type}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                            {new Date(event.assertedAt).toLocaleDateString()}
                        </span>
                    </div>

                    <div className={clsx("text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider", getStatusStyle(status))}>
                        {status}
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-zinc-100 mb-1">{event.title}</h3>
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{event.description}</p>

                {/* Covenant Specific View */}
                {event.covenantDetails && (
                    <div className="mb-4 bg-black/20 rounded-lg p-3 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-zinc-500 uppercase">Test Metric</span>
                            <span className="text-xs text-zinc-500 uppercase">Result</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-zinc-300">{event.covenantDetails.metricName}</span>
                            <div className="flex items-center gap-3">
                                <div className="font-mono text-sm">
                                    <span className="text-zinc-400">{event.covenantDetails.measuredValue}</span>
                                    <span className="mx-2 text-zinc-600">{event.covenantDetails.testOperator}</span>
                                    <span className="text-zinc-400">{event.covenantDetails.thresholdValue}</span>
                                </div>
                                {event.covenantDetails.isPassing ? (
                                    <span className="text-emerald-400 text-xs font-bold px-2 py-0.5 bg-emerald-900/30 rounded">PASS</span>
                                ) : (
                                    <span className="text-red-400 text-xs font-bold px-2 py-0.5 bg-red-900/30 rounded">FAIL</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Acknowledgements Section */}
                <div className="border-t border-white/5 pt-3 mt-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span>Asserted by</span>
                            <div className="flex items-center gap-1.5 bg-white/5 pr-2 rounded-full">
                                <div className={clsx("w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold", asserter?.color)}>
                                    {asserter?.avatar}
                                </div>
                                <span className="text-zinc-300">{asserter?.name}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-500">Required Acks:</span>
                            <div className="flex -space-x-2">
                                {event.requiredAcknowledgements.map(reqId => {
                                    const party = parties.find(p => p.id === reqId);
                                    const hasAcked = event.acknowledgements.some(a => a.partyId === reqId);

                                    if (!party) return null;

                                    return (
                                        <div key={reqId} className={clsx(
                                            "w-6 h-6 rounded-full border-2 border-zinc-900 flex items-center justify-center text-[10px] font-bold text-white transition-all",
                                            party.color,
                                            !hasAcked ? "opacity-30 grayscale saturate-0" : "opacity-100"
                                        )} title={hasAcked ? `Acknowledged by ${party.name}` : `Waiting for ${party.name}`}>
                                            {party.avatar}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
