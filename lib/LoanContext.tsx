"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Loan, LoanEvent } from './types';
import { MOCK_LOAN } from '@/data/mockLoan';

interface LoanContextType {
  loans: Loan[];
  getLoan: (id: string) => Loan | undefined;
  addEvent: (loanId: string, event: LoanEvent) => void;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export function LoanProvider({ children }: { children: ReactNode }) {
  const [loans, setLoans] = useState<Loan[]>([MOCK_LOAN]);

  const getLoan = (id: string) => loans.find(l => l.id === id);

  const addEvent = (loanId: string, event: LoanEvent) => {
    setLoans(prev => prev.map(loan => {
      if (loan.id === loanId) {
        return {
          ...loan,
          events: [...loan.events, event]
        };
      }
      return loan;
    }));
  };

  return (
    <LoanContext.Provider value={{ loans, getLoan, addEvent }}>
      {children}
    </LoanContext.Provider>
  );
}

export function useLoan() {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
}
