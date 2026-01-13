import { MOCK_LOAN } from "@/data/mockLoan";
import { EventCard } from "@/components/EventCard";
import { deriveEventStatus } from "@/lib/stateResolver";
import { ShieldCheck, AlertTriangle, Users } from "lucide-react";

export default function Home() {
  const loan = MOCK_LOAN;

  // Derived Global Stats
  const pendingCount = loan.events.filter(e => deriveEventStatus(e) === "PENDING").length;
  const assertedCount = loan.events.filter(e => deriveEventStatus(e) === "ASSERTED").length;
  const isHealthy = pendingCount === 0 && assertedCount === 0;

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-zinc-500 font-mono text-sm mb-2 flex items-center gap-2">
              <span>{loan.id}</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full" />
              <span>{loan.currency} {loan.totalFacilityAmount.toLocaleString()}</span>
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              {loan.name}
            </h1>
          </div>

          <div className="flex gap-4">
            <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-3">
              <ShieldCheck className={isHealthy ? "text-emerald-500" : "text-zinc-600"} />
              <div>
                <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Ledger State</div>
                <div className="font-mono text-sm font-bold text-zinc-200">
                  {isHealthy ? "EFFECTIVE" : "PENDING RECONCILIATION"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Timeline Column */}
        <div className="lg:col-span-7">
          <div className="flex justify-between items-center mb-6 pl-8">
            <h2 className="text-xl font-semibold text-zinc-200">Event Ledger</h2>
            <span className="text-xs text-zinc-500 font-mono">APPEND-ONLY • IMMUTABLE</span>
          </div>

          <div className="relative">
            {loan.events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                parties={loan.parties}
                isLast={index === loan.events.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-8 sticky top-8 self-start">

          {/* Pending Actions / Risk View */}
          {(pendingCount > 0 || assertedCount > 0) && (
            <div className="glass-panel p-6 rounded-xl border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-2 mb-4 text-amber-500">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold">Pending Acknowledgements</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-4">
                The current state is not fully effective. The following events are blocked pending cryptographic signature or acknowledgement.
              </p>

              <div className="space-y-3">
                {loan.events
                  .filter(e => ["PENDING", "ASSERTED"].includes(deriveEventStatus(e)))
                  .map(event => (
                    <div key={event.id} className="bg-black/40 p-3 rounded border border-amber-500/30">
                      <div className="font-semibold text-zinc-200 text-sm">{event.title}</div>
                      <div className="text-xs text-zinc-500 mt-1 flex gap-2">
                        <span>Waiting on:</span>
                        {/* Calculate who is missing */}
                        <div className="flex -space-x-1">
                          {event.requiredAcknowledgements
                            .filter(r => !event.acknowledgements.map(a => a.partyId).includes(r))
                            .map(missingId => {
                              const p = loan.parties.find(x => x.id === missingId);
                              return (
                                <span key={missingId} className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center text-[8px]">
                                  {p?.avatar}
                                </span>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* System Explanation */}
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="font-bold text-zinc-200 mb-3">System of Record</h3>
            <div className="space-y-4 text-sm text-zinc-400">
              <p>
                This view represents the <strong>Authoritative State</strong> of the loan.
              </p>
              <div className="pl-4 border-l-2 border-indigo-500/30 space-y-2">
                <p>1. Events are asserted by Parties.</p>
                <p>2. State is derived deterministically.</p>
                <p>3. Ambiguity is mathematically impossible.</p>
              </div>
              <p className="text-xs pt-4 border-t border-white/5">
                Connected to: Azure AI Document Intelligence (Auto-Covenant).
              </p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-zinc-500" />
              <h3 className="font-bold text-zinc-200">Active Parties</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {loan.parties.map(party => (
                <div key={party.id} className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${party.color}`}>
                    {party.avatar}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm font-medium text-zinc-200 truncate">{party.name}</div>
                    <div className="text-[10px] text-zinc-500 uppercase">{party.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
