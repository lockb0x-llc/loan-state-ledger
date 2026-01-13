"use client";

import { useLoan } from "@/lib/LoanContext";
import { Link as LinkIcon, Save, RefreshCw, CheckCircle, Database } from "lucide-react";

export default function CovenantsPage() {
    return (
        <main className="p-8 max-w-5xl mx-auto space-y-12">
            <header className="flex justify-between items-end border-b border-zinc-800 pb-8">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-2">
                        Smart Covenant Config
                    </h1>
                    <p className="text-zinc-400">Manage automated compliance verification rules and data sources.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition text-sm font-medium">
                        <RefreshCw className="w-4 h-4" />
                        Sync Rules
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition text-sm font-medium shadow-lg shadow-indigo-600/20">
                        <Save className="w-4 h-4" />
                        Save Configuration
                    </button>
                </div>
            </header>

            <div className="space-y-8">
                {/* Logic Block 1 */}
                <section className="glass-panel p-6 rounded-xl">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex gap-4">
                            <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                                <LinkIcon className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-200">Financial Covenants</h3>
                                <p className="text-zinc-500 text-sm">Automated extraction from quarterly compliance certificates.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Active</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CovenantRow
                            name="Net Leverage Ratio"
                            metric="EBITDA / Total Debt"
                            operator="<="
                            threshold="4.50"
                            frequency="Quarterly"
                        />
                        <CovenantRow
                            name="Interest Coverage Ratio"
                            metric="EBITDA / Interest Expense"
                            operator=">="
                            threshold="2.50"
                            frequency="Quarterly"
                        />
                        <CovenantRow
                            name="Capital Expenditure"
                            metric="Total CapEx"
                            operator="<="
                            threshold="50,000,000"
                            frequency="Annually"
                            isInactive
                        />
                    </div>
                </section>

                {/* Logic Block 2 */}
                <section className="glass-panel p-6 rounded-xl">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex gap-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                                <Database className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-200">Data Sources</h3>
                                <p className="text-zinc-500 text-sm">Authorized sources for oracle attestation.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-700/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                                    <span className="font-bold text-blue-600">A</span>
                                </div>
                                <div className="text-sm font-medium text-zinc-300">Azure Document Intelligence</div>
                            </div>
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>

                        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-700/50 flex items-center justify-between opacity-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-[#FCA12D] flex items-center justify-center">
                                    <span className="font-bold text-white">AWS</span>
                                </div>
                                <div className="text-sm font-medium text-zinc-300">Amazon Textract</div>
                            </div>
                            <div className="text-xs text-zinc-500 border border-zinc-700 px-2 py-1 rounded">Connect</div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function CovenantRow({ name, metric, operator, threshold, frequency, isInactive }: any) {
    return (
        <div className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg border ${isInactive ? 'bg-zinc-900/30 border-zinc-800 opacity-50' : 'bg-zinc-800/40 border-zinc-700/50'}`}>
            <div className="col-span-4">
                <div className="font-medium text-zinc-200">{name}</div>
                <div className="text-xs text-zinc-500 font-mono">{metric}</div>
            </div>
            <div className="col-span-2">
                <div className="text-[10px] uppercase text-zinc-500 font-bold">Operator</div>
                <div className="font-mono text-zinc-300 bg-zinc-900 px-2 py-1 rounded inline-block border border-zinc-700">{operator}</div>
            </div>
            <div className="col-span-3">
                <div className="text-[10px] uppercase text-zinc-500 font-bold">Threshold</div>
                <div className="font-mono text-indigo-300">{threshold}x</div>
            </div>
            <div className="col-span-2">
                <div className="text-[10px] uppercase text-zinc-500 font-bold">Freq</div>
                <div className="text-sm text-zinc-400">{frequency}</div>
            </div>
            <div className="col-span-1 flex justify-end">
                <div className={`w-8 h-4 rounded-full p-0.5 ${isInactive ? 'bg-zinc-700' : 'bg-emerald-500'} flex items-center ${isInactive ? 'justify-start' : 'justify-end'}`}>
                    <div className="w-3 h-3 bg-white rounded-full shadow-md" />
                </div>
            </div>
        </div>
    )
}
