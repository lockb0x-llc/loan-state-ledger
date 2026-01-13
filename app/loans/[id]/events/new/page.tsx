"use client";

import { useLoan } from "@/lib/LoanContext";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import { LoanEvent, EventStatus } from "@/lib/types";

export default function NewEventPage() {
    const { id } = useParams();
    const { getLoan, addEvent } = useLoan();
    const router = useRouter();

    const loanId = (Array.isArray(id) ? id[0] : id) || "";
    const loan = getLoan(loanId);

    const [formData, setFormData] = useState({
        type: "Notice",
        title: "",
        description: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newEvent: LoanEvent = {
            id: `ev_${Date.now()}`,
            loanId: loanId,
            type: formData.type as any,
            title: formData.title,
            description: formData.description,
            assertedBy: "agent", // Mocking as Agent
            assertedAt: new Date().toISOString(),
            requiredAcknowledgements: ["agent", "borrower"], // Default logic
            acknowledgements: [
                { partyId: "agent", acknowledgedAt: new Date().toISOString(), note: "Self-asserted" }
            ]
        };

        addEvent(loanId, newEvent);
        router.push(`/loans/${loanId}`);
    };

    if (!loan) return <div>Loan not found</div>;

    return (
        <main className="p-8 max-w-3xl mx-auto min-h-screen flex flex-col justify-center">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition">
                <ArrowLeft className="w-4 h-4" />
                Back to Ledger
            </button>

            <div className="glass-panel p-8 rounded-2xl border border-zinc-700/50 shadow-2xl relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                    <h1 className="text-3xl font-bold text-white mb-2">Assert New Event</h1>
                    <p className="text-zinc-400 mb-8">Create a new state transition for {loan.name}. This will be appended to the ledger pending reconciliation.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Event Type</label>
                            <select
                                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="Notice">Administrative Notice</option>
                                <option value="Amendment">Amendment</option>
                                <option value="Waiver">Waiver</option>
                                <option value="DrawRequest">Drawdown Request</option>
                                <option value="CovenantTest">Covenant Compliance Test</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Title</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. Q1 Compliance Certificate"
                                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Description</label>
                            <textarea
                                required
                                rows={4}
                                placeholder="Provide details about this event..."
                                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 pb-2">
                            <div className="border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl p-8 flex flex-col items-center justify-center text-zinc-500 cursor-pointer transition bg-zinc-900/20 hover:bg-zinc-900/40">
                                <UploadCloud className="w-8 h-8 mb-3 opacity-50" />
                                <div className="text-sm font-medium">Drag supporting documents here</div>
                                <div className="text-xs opacity-50 mt-1">PDF, DOCX, XLSX up to 10MB</div>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center justify-between border-t border-zinc-800">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">IB</div>
                                <div className="text-xs text-zinc-400">
                                    <span className="block text-zinc-200 font-medium">Iron Bank Global</span>
                                    Signing as Agent
                                </div>
                            </div>
                            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-indigo-600/25 transition flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Sign & Assert
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
