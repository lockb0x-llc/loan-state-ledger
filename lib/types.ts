export type PartyId = "agent" | "lender_a" | "lender_b" | "borrower" | "system";

export interface Party {
  id: PartyId;
  name: string;
  role: "Agent" | "Lender" | "Borrower" | "System";
  avatar: string; // Initials or Code
  color: string; // Tailwind color class for avatar
}

export type EventType = "Amendment" | "Waiver" | "Notice" | "CovenantTest" | "DrawRequest";

export type EventStatus = "ASSERTED" | "PENDING" | "EFFECTIVE";

export interface Acknowledgement {
  partyId: PartyId;
  acknowledgedAt: string; // ISO Date String
  note?: string;
}

export interface CovenantDetails {
  metricName: string;
  measuredValue: number;
  testOperator: "<" | ">" | "<=" | ">=" | "=";
  thresholdValue: number;
  isPassing: boolean;
  rawDocumentUrl?: string; // Link to the 'evidence'
}

export interface LoanEvent {
  id: string;
  loanId: string;
  type: EventType;
  title: string;
  description: string;
  assertedBy: PartyId;
  assertedAt: string; // ISO Date String
  
  // The 'Rule' part of the distributed system
  requiredAcknowledgements: PartyId[];
  
  // The 'State' part
  acknowledgements: Acknowledgement[];
  
  // Optional specific payload
  covenantDetails?: CovenantDetails;
  evidenceLinks?: string[];
}

export interface Loan {
  id: string;
  name: string;
  agreementDate: string;
  totalFacilityAmount: number;
  currency: string;
  parties: Party[];
  events: LoanEvent[];
}
