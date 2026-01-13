"use client";

import { useLoan } from "@/lib/LoanContext";
import Link from "next/link";
import { ArrowUpRight, Activity, Percent, Shield, AlertTriangle, CheckCircle2, TrendingUp, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const { loans } = useLoan();

  // Aggregate Stats
  const totalCommitment = loans.reduce((acc, l) => acc + l.totalFacilityAmount, 0);
  const activeLoans = loans.length;
  // Mock healthy/attention count
  const attentionRequired = 1;

  return (
    <main className="p-8 max-w-7xl mx-auto space-y-12">
      <header>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-2">
          Portfolio Overview
        </h1>
        <p className="text-zinc-400">Global view of all syndicated facilities and state ledgers.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Exposure"
          value={`$${(totalCommitment / 1000000).toFixed(0)}M`}
          sub="Across all active facilities"
          icon={DollarSign}
          trend="+5.2%"
        />
        <KpiCard
          title="Active Facilities"
          value={activeLoans.toString()}
          sub="Syndicated & Bilateral"
          icon={Activity}
        />
        <KpiCard
          title="Weighted Avg Spread"
          value="325 bps"
          sub="Over SOFR"
          icon={Percent}
        />
        <KpiCard
          title="Action Required"
          value={attentionRequired.toString()}
          sub="Pending signatures/approvals"
          icon={AlertTriangle}
          className="border-amber-500/30 bg-amber-500/5 text-amber-500"
        />
      </div>

      {/* Loan List */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-semibold text-zinc-200">Active Facilities</h2>
          <button className="text-xs font-mono text-zinc-500 hover:text-white transition">VIEW ARCHIVED</button>
        </div>

        <div className="grid gap-4">
          {loans.map(loan => (
            <Link key={loan.id} href={`/loans/${loan.id}`}>
              <div className="glass-card group p-6 rounded-xl flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-lg text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {loan.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-zinc-200 group-hover:text-white transition">{loan.name}</div>
                    <div className="text-zinc-500 text-sm font-mono flex gap-4">
                      <span>{loan.id}</span>
                      <span>•</span>
                      <span>{loan.currency} {loan.totalFacilityAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Status</div>
                    <div className="flex items-center gap-2 justify-end">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-emerald-500/50 shadow-lg" />
                      <span className="text-sm font-medium text-emerald-400">Live</span>
                    </div>
                  </div>
                  <ArrowUpRight className="text-zinc-600 group-hover:text-white transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}

          {/* Mock extra loan for visual density */}
          <div className="glass-card p-6 rounded-xl flex items-center justify-between opacity-50 grayscale">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-lg text-zinc-600">
                AD
              </div>
              <div>
                <div className="font-bold text-lg text-zinc-400">Alpha Dynamics - Revolver</div>
                <div className="text-zinc-600 text-sm font-mono flex gap-4">
                  <span>LN-2023-884</span>
                  <span>•</span>
                  <span>USD 50,000,000</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="text-[10px] uppercase text-zinc-600 font-bold tracking-wider">Status</div>
                <div className="text-sm font-medium text-zinc-500">Matured</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function KpiCard({ title, value, sub, icon: Icon, trend, className = "" }: any) {
  return (
    <div className={`glass-panel p-6 rounded-xl relative overflow-hidden ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="text-zinc-400 text-sm font-medium">{title}</div>
        <Icon className="w-5 h-5 opacity-50" />
      </div>
      <div className="text-3xl font-bold text-zinc-100 mb-1">{value}</div>
      <div className="text-xs text-zinc-500 flex justify-between items-center">
        <span>{sub}</span>
        {trend && <span className="text-emerald-400 font-medium">{trend}</span>}
      </div>
    </div>
  )
}
