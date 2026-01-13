"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Settings, PlusCircle, Link as LinkIcon } from 'lucide-react';

export function Navigation() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'Loan Details', href: '/loans/LN-2024-001', icon: FileText },
        { name: 'New Event', href: '/loans/LN-2024-001/events/new', icon: PlusCircle },
        { name: 'Smart Covenants', href: '/covenants', icon: LinkIcon },
        // { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <nav className="w-64 border-r border-zinc-800 bg-zinc-950/50 backdrop-blur flex-col fixed inset-y-0 left-0 hidden lg:flex">
            <div className="p-6">
                <div className="flex items-center gap-3 text-zinc-100 font-bold text-xl tracking-tight">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white">L</span>
                    </div>
                    LoanLedger
                </div>
            </div>

            <div className="px-4 py-2 space-y-1">
                <div className="text-xs font-semibold text-zinc-500 uppercase px-2 mb-2">Platform</div>
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                                    ? 'bg-indigo-500/10 text-indigo-400'
                                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto p-6 border-t border-zinc-800/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs">
                        IB
                    </div>
                    <div className="overflow-hidden">
                        <div className="text-sm font-medium text-zinc-200 truncate">Iron Bank Global</div>
                        <div className="text-xs text-zinc-500">Agent View</div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
