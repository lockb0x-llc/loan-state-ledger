# Loan State Ledger (LSL)

## Overview
Loan State Ledger (LSL) is a desktop-first web prototype that demonstrates a novel approach to managing the current state of syndicated and agented loans. Instead of relying on fragmented email threads, spreadsheets, and siloed internal systems, LSL models loans as deterministic state machines, with explicit events, acknowledgements, and effective timestamps. This provides a single, authoritative view of a loan’s status at any given time.

This application implements the lockb0x protocol, an open standard for proving the existence, integrity, and custodianship of digital data. https://datatracker.ietf.org/doc/draft-tomlinson-lockb0x/00

## Problem Statement
In syndicated loans, multiple parties—agent banks, lenders, borrowers, and legal counsel—maintain separate interpretations of key events such as amendments, waivers, notices, and conditions precedent. This leads to disputes, operational inefficiencies, and legal ambiguity. Current tools primarily focus on documents or reporting, leaving the problem of state ambiguity largely unsolved.

## Solution
LSL introduces a deterministic, append-only ledger that tracks loan events from assertion through acknowledgement to effective status. It visualizes loan state in a clear timeline and highlights ambiguities, making the current status of any loan transparent and auditable. The prototype demonstrates how a distributed-system-inspired model can reduce disputes and operational risk without replacing existing systems.

## Core Features
- Append-only loan event ledger capturing every action and acknowledgement.
- Deterministic derivation of event state: **ASSERTED**, **PENDING**, or **EFFECTIVE**.
- Visual timeline showing the progression of events and highlighting ambiguity.
- Event detail view displaying required acknowledgements, evidence links, and current status.
- Ambiguity view that flags unresolved or partially acknowledged events.
- System-of-record explanation view showing how LSL overlays existing platforms and workflows.

## Technology Stack
- **Languages:** TypeScript
- **Frameworks & Libraries:** Next.js (App Router), React, Tailwind CSS
- **Platform:** Desktop-first web application
- **Cloud / Hosting:** Vercel (prototype deployment)
- **Data:** In-memory application state and static JSON mock data
- **APIs & Logic:** Internal deterministic state derivation using pure functions, no external APIs
- **Architecture Concepts:** Append-only event ledger, immutable event log, distributed-system-inspired loan state resolution
- **Development Tools:** Node.js, GitHub

## Design and Architecture
The application is structured around a simple but powerful data model. Each loan event is immutable and includes the asserting party, timestamp, required acknowledgements, and optional evidence links. A pure function computes the effective status of each event based on the presence or absence of required acknowledgements. The UI presents the loan as a timeline, clearly distinguishing events that are fully effective, partially acknowledged, or pending. Ambiguity is visually emphasized to make operational risk immediately apparent.

## Mock Data
The prototype uses a single sample loan, four parties (agent, two lenders, and a borrower), and a series of five to seven events that demonstrate:  
- Fully effective events  
- Partially acknowledged events  
- Events with unresolved status to highlight ambiguit
- See addiotnal sreen mockups in the /public/mockups/ folder.

## Target Users
- Loan operations teams  
- Agent banks  
- Credit officers  
- Legal and compliance departments

## Commercial Value
LSL provides operational clarity that reduces disputes, accelerates loan workflows, and mitigates legal and financial risk. It acts as a coordination layer above existing systems, making loan state visible and actionable without requiring replacement of legacy platforms.

## Success Criteria
The prototype is successful if a user can immediately determine the current effective state of a loan and understand why, with unresolved events clearly highlighted. This demonstrates the value of deterministic state management in complex, multi-party financial workflows.

## Disclaimer
This project is a hackathon prototype built to demonstrate concept and architecture. It is not intended for production use.
