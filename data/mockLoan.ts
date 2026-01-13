import { Loan } from "../lib/types";

export const MOCK_LOAN: Loan = {
    id: "LN-2024-001",
    name: "Omega Shipping - Term Loan B",
    agreementDate: "2023-01-15T00:00:00Z",
    totalFacilityAmount: 250000000,
    currency: "USD",
    parties: [
        { id: "agent", name: "Iron Bank Global", role: "Agent", avatar: "IB", color: "bg-blue-600" },
        { id: "lender_a", name: "Evergreen Capital", role: "Lender", avatar: "EC", color: "bg-green-600" },
        { id: "lender_b", name: "Highline Debt Fund", role: "Lender", avatar: "HL", color: "bg-purple-600" },
        { id: "borrower", name: "Omega Shipping Corp", role: "Borrower", avatar: "OS", color: "bg-slate-800" },
        { id: "system", name: "Auto-Covenant Bot", role: "System", avatar: "AI", color: "bg-indigo-500" },
    ],
    events: [
        {
            id: "ev_001",
            loanId: "LN-2024-001",
            type: "Notice",
            title: "Closing & Initial Funding",
            description: "Execution of Facility Agreement and initial drawdown of $100M.",
            assertedBy: "agent",
            assertedAt: "2023-01-15T10:00:00Z",
            requiredAcknowledgements: ["agent", "borrower", "lender_a", "lender_b"],
            acknowledgements: [
                { partyId: "agent", acknowledgedAt: "2023-01-15T10:05:00Z" },
                { partyId: "borrower", acknowledgedAt: "2023-01-15T10:10:00Z" },
                { partyId: "lender_a", acknowledgedAt: "2023-01-15T10:30:00Z" },
                { partyId: "lender_b", acknowledgedAt: "2023-01-15T11:00:00Z" },
            ],
        },
        {
            id: "ev_002",
            loanId: "LN-2024-001",
            type: "Amendment",
            title: "Admin Amendment 01",
            description: "Correction of typo in definition of 'EBITDA'.",
            assertedBy: "agent",
            assertedAt: "2023-06-01T09:00:00Z",
            requiredAcknowledgements: ["agent", "borrower"],
            acknowledgements: [
                { partyId: "agent", acknowledgedAt: "2023-06-01T09:00:00Z" },
                { partyId: "borrower", acknowledgedAt: "2023-06-02T14:00:00Z" },
            ],
        },
        {
            id: "ev_003",
            loanId: "LN-2024-001",
            type: "CovenantTest",
            title: "Q3 2023 Financials - Net Leverage",
            description: "Routine quarterly covenant testing. System validated.",
            assertedBy: "borrower",
            assertedAt: "2023-10-15T09:00:00Z",
            covenantDetails: {
                metricName: "Net Leverage Ratio",
                measuredValue: 3.5,
                testOperator: "<=",
                thresholdValue: 4.5,
                isPassing: true,
                rawDocumentUrl: "#"
            },
            requiredAcknowledgements: ["agent"], // Only agent needs to tick this off
            acknowledgements: [
                { partyId: "agent", acknowledgedAt: "2023-10-16T10:00:00Z", note: "Verified against compliance cert." }
            ]
        },
        {
            id: "ev_004",
            loanId: "LN-2024-001",
            type: "DrawRequest",
            title: "Drawdown Request #2",
            description: "Request for $50M for working capital purposes.",
            assertedBy: "borrower",
            assertedAt: "2024-01-10T09:00:00Z",
            requiredAcknowledgements: ["agent"],
            acknowledgements: [] // NO ACKS YET -> ASSERTED
        },
        {
            id: "ev_005",
            loanId: "LN-2024-001",
            type: "CovenantTest",
            title: "Q4 2023 Financials - Interest Coverage",
            description: "Automated analysis of Q4 Financials.",
            assertedBy: "system", // The 'Auto-Covenant' bot
            assertedAt: "2024-01-12T08:00:00Z",
            covenantDetails: {
                metricName: "Interest Coverage Ratio",
                measuredValue: 2.1,
                testOperator: ">=",
                thresholdValue: 2.50,
                isPassing: false, // FAILING!
            },
            evidenceLinks: ["doc-q4-fin.pdf"],
            requiredAcknowledgements: ["agent", "borrower"], // Needs both to agree on the failure
            acknowledgements: [
                // Borrower hasn't acknowledged the failure yet, creating built-in tension
                { partyId: "agent", acknowledgedAt: "2024-01-12T08:05:00Z", note: "Bot result confirmed." }
            ]
        }
    ]
};
