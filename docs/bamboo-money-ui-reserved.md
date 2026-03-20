# Bamboo Money UI Reserved and Aspirational Notes

Status: Reserved  
Authority: Non-canonical supporting document  
Last Updated: 2026-03-15  
Primary Audience: Design, Product, Engineering, Agentic AI planning/review agents  

Purpose: This file stores reserved, future-facing, exploratory, and not-yet-standardized UI knowledge.

Implementation status: Non-canonical.  
Do not use this file as the primary source for current implementation decisions.  
For current UI rules, use `bamboo-money-ui-spec.md`.  
For system values and tokens, use `bamboo-money-design-tokens.json`.

Companion Files:
- `bamboo-money-ui-spec.md` — canonical source for active UI behavior
- `bamboo-money-design-tokens.json` — canonical reusable design values

## How to Use This File

Status: Active  
Priority: High  
Applies To: Entire document  

### Purpose
This file exists to preserve future directions, reserved sections, open questions, and patterns that may become important later. It keeps design memory and planning context out of the active implementation spec.

### Usage Rules
- Treat this file as planning context, not active implementation authority.
- Use this file when evaluating future product evolution, reviewing design decisions, or recording emerging patterns not yet ready for standardization.
- Move content from this file into the canonical UI spec only when the pattern is active, repeatable, and ready to enforce.
- Avoid mixing speculative notes with current implementation work.

### Section Format
Reserved sections should use the following fields when possible:
- **Status** — Reserved / Under Evaluation / Deferred / Deprecated
- **Implementation Status** — Not Active / Pilot / Proposed
- **Reason for Reservation** — why this topic is not part of the active spec
- **Potential Future Scope** — where the topic may expand
- **Activation Criteria** — what must become true before the topic moves into the active spec
- **Notes** — supporting observations, cautions, or partial decisions

---

## Reserved Shell Regions and Navigation Expansion

Status: Reserved  
Priority: High  
Applies To: Desktop and large-screen layouts  

### Reason for Reservation
The current product shell intentionally stays lean: primary navigation, main content, and optional secondary content only. Future growth may justify more persistent shell regions or richer navigation affordances, but these are not yet active.

### Potential Future Scope
- Persistent right-side utility panel
- Collapsible desktop sidebar behavior
- Context-aware action rail
- Role-based or household-based navigation variations
- Workspace switching if Bamboo Money evolves into a multi-context product

### Activation Criteria
- At least two major screen families require persistent secondary desktop tools.
- The product gains enough navigational complexity that the current shell cannot expose important actions clearly.
- Household or collaborative workflows require faster context switching than current navigation supports.

### Notes
Any shell expansion should preserve the current principle of visible primary navigation and should not create an overly busy enterprise-style frame.

---

## Household and Multi-User Collaboration Patterns

Status: Under Evaluation  
Priority: High  
Applies To: Future household or collaborative financial workflows  
Implementation Status: Proposed  

### Reason for Reservation
The active UI spec assumes an individual user model. Bamboo Money may later support shared budgets, household finances, partner visibility, delegated tasks, or other collaborative behaviors.

### Potential Future Scope
- Shared household dashboards
- Permission-aware budget editing
- Visibility controls for accounts or categories
- Approval flows for major changes
- “Assigned to” or “owned by” indicators for tasks and goals

### Activation Criteria
- Household collaboration becomes a confirmed product requirement.
- More than one screen requires role or ownership indicators.
- Permissions, visibility, or approval logic materially affect how information is displayed.

### Notes
If activated, the active spec will need new guidance for role labeling, privacy boundaries, shared actions, and conflict prevention.

---

## Monthly Review and Month-Close Experience

Status: Under Evaluation  
Priority: Medium  
Applies To: Dashboard, budget, reporting, and reflection flows  
Implementation Status: Proposed  

### Reason for Reservation
The product has a strong opportunity to support end-of-month review, reflection, and closure, but the active experience is not yet defined.

### Potential Future Scope
- Monthly close screen or guided flow
- Reflection prompts with measurable categories
- Month-over-month financial comparison summary
- “What changed this month” narrative panels
- Archive or snapshot behavior for completed months

### Activation Criteria
- The product confirms monthly reflection as a core user job.
- At least one flow requires special month-end behavior beyond normal dashboard reporting.
- Product strategy favors habit formation and progress review as part of the main experience.

### Notes
If activated, this area should balance reflective guidance with financial seriousness. It should not become overly motivational or gamified.

---

## Insights, Recommendations, and Coach-Like Guidance

Status: Under Evaluation  
Priority: Medium  
Applies To: Dashboard, budget, transactions, goals  
Implementation Status: Proposed  

### Reason for Reservation
Bamboo Money may later offer more interpretive guidance, recommendations, or proactive coaching, but that system is not standardized yet.

### Potential Future Scope
- Spending anomaly detection
- Savings recommendations
- Bill timing or cash-flow guidance
- Personalized educational prompts
- Explainable AI-driven suggestions

### Activation Criteria
- Insight generation becomes a confirmed product capability.
- Recommendations appear in more than one primary screen.
- The product defines a trust model for how guidance is labeled, explained, and overridden.

### Notes
Any insight system must preserve user autonomy and avoid sounding overly authoritative unless the underlying confidence and explanation quality justify it.

---

## Motion System

Status: Reserved  
Priority: Low  
Applies To: Cross-screen transitions, drawers, confirmations, micro-interactions  
Implementation Status: Not Active  

### Reason for Reservation
The current product direction favors minimal motion. A formal motion system is not yet necessary.

### Potential Future Scope
- Drawer and modal transitions
- Inline success feedback
- Screen transition rules
- Expand/collapse timing guidance
- Motion tokens for reduced and standard motion modes

### Activation Criteria
- Motion meaningfully improves comprehension in at least three recurring patterns.
- The product defines a motion language beyond default platform behavior.
- Motion tokens become necessary for consistency.

### Notes
If activated, motion must remain subtle and should reinforce stability rather than spectacle.

---

## Data Visualization Expansion

Status: Under Evaluation  
Priority: Medium  
Applies To: Dashboard, goals, reports, budget  
Implementation Status: Proposed  

### Reason for Reservation
The active spec allows charts when they improve understanding, but it does not define a broader chart system yet.

### Potential Future Scope
- Net worth history charts
- Budget trend visualizations
- Savings progress timelines
- Forecasting and what-if scenario visualizations
- Standard chart grammar and accessibility rules

### Activation Criteria
- More than one chart family is needed across major product areas.
- The product begins relying on visual trends as a recurring interpretation layer.
- Chart-specific accessibility and legend standards become necessary.

### Notes
Financial charts must never hide the exact values users need to make decisions.

---

## Reporting and Export-Oriented Views

Status: Reserved  
Priority: Medium  
Applies To: Desktop, settings, reports, account history  
Implementation Status: Proposed  

### Reason for Reservation
The current product is centered on operational money management rather than formal reports, but users may later need printable, exportable, or audit-style views.

### Potential Future Scope
- Printable monthly summaries
- Tax-oriented transaction exports
- CSV/PDF reporting flows
- Read-only summary pages optimized for sharing

### Activation Criteria
- Reporting becomes a visible user request or product requirement.
- Export and print flows require layout guidance distinct from interactive screens.
- At least two major use cases depend on formal summaries rather than operational views.

### Notes
If activated, report layouts should prioritize accuracy and clear grouping over screen-style aesthetics.

---

## Notifications and Attention Management

Status: Under Evaluation  
Priority: Medium  
Applies To: Global product system, mobile, dashboard  
Implementation Status: Proposed  

### Reason for Reservation
The active spec includes notifications as utility behavior but does not yet define a notification system or attention strategy.

### Potential Future Scope
- Notification center patterns
- Priority ladders for financial alerts
- Snooze or dismiss behavior
- Cross-device notification consistency
- Urgent vs informational visual treatments

### Activation Criteria
- Notifications become a substantial part of product value.
- More than one alert channel requires consistent system treatment.
- Attention load needs deliberate governance to prevent fatigue.

### Notes
Financial notifications must be useful, not noisy. Attention is a scarce resource.

---

## Empty State Illustrations and Brand Expression

Status: Deferred  
Priority: Low  
Applies To: Empty states, onboarding, educational prompts  
Implementation Status: Proposed  

### Reason for Reservation
The active UI direction is trust-first and structured. Stronger visual brand expression may become useful later, but it is not central to current implementation.

### Potential Future Scope
- Branded illustrations for onboarding or empty states
- More expressive use of mascot/brand elements
- Seasonal or milestone visual moments

### Activation Criteria
- Brand identity work expands beyond the core operational shell.
- The product defines a visual expression system that does not undermine seriousness.
- Illustration or mascot usage becomes systematic instead of occasional.

### Notes
Brand expression should support warmth and memorability without making the product feel frivolous.

---

## Onboarding and Guided Setup Flows

Status: Under Evaluation  
Priority: High  
Applies To: First-run and setup experiences  
Implementation Status: Proposed  

### Reason for Reservation
The active spec focuses on steady-state product usage. First-run experiences may need different guidance for pace, reassurance, and staged disclosure.

### Potential Future Scope
- Institution connection onboarding
- Household setup
- Goal setup wizards
- Guided budget initialization
- Checklist-style progress tracking

### Activation Criteria
- Setup flows become a major product differentiator.
- Onboarding spans multiple screens or branching paths.
- The steady-state design language is insufficient for early trust-building.

### Notes
Onboarding should lower stress and clarify value quickly. It should not overwhelm users with configuration before they see usefulness.

---

## Advanced Search, Filters, and Querying

Status: Reserved  
Priority: Medium  
Applies To: Transactions, accounts, future reports  
Implementation Status: Proposed  

### Reason for Reservation
The active spec supports basic search and common filters. A more advanced system may emerge later but is not ready for standardization.

### Potential Future Scope
- Multi-condition filter builder
- Saved filters or views
- Advanced search syntax
- Bulk review workflows
- Query history or recent filter chips

### Activation Criteria
- Transaction volume and user workflows justify more than common filter sets.
- Users need repeatable research or auditing behavior.
- Search and filter complexity becomes a recurring design challenge.

### Notes
Advanced querying should not degrade the clarity of the default transaction review experience.

---

## AI-Driven Interfaces and Agent Surfaces

Status: Under Evaluation  
Priority: Medium  
Applies To: Help, insights, automation, future productivity flows  
Implementation Status: Proposed  

### Reason for Reservation
Bamboo Money may later expose agentic or assistant-driven features, but the active UI spec does not yet define their presence or boundaries.

### Potential Future Scope
- Conversational financial help
- Task automation suggestions
- Guided transaction categorization assistance
- AI-generated summaries or explanations
- Voice or chat-based interaction surfaces

### Activation Criteria
- AI-driven product surfaces become active beyond background analysis.
- Users interact directly with agents inside core workflows.
- The product defines trust, reviewability, and override patterns for AI outputs.

### Notes
If activated, AI features must be explainable, clearly labeled, and subordinate to user control.

---

## Future Accessibility Expansion

Status: Reserved  
Priority: Medium  
Applies To: Accessibility beyond current baseline  
Implementation Status: Not Active  

### Reason for Reservation
The active spec targets WCAG AA. Future expansion may push deeper into personalization, financial accessibility, localization, and assistive workflows.

### Potential Future Scope
- Financial literacy assistive modes
- Enhanced readable-density controls
- Color-blind-safe data visualization defaults
- Reading level adjustments
- Localization and bilingual UI guidance

### Activation Criteria
- Accessibility or inclusion requirements expand beyond baseline compliance.
- Multiple user groups require alternate presentation modes.
- The product intentionally supports broader accessibility personalization.

### Notes
This section should expand only with concrete needs, not vague good intentions.

---

## Open Questions Log

Status: Active  
Priority: Medium  
Applies To: Entire document  

### Current Open Questions
- How central should monthly review and month-close become in the core experience?
- When household workflows arrive, should collaboration be embedded into current screens or treated as a parallel mode?
- What level of interpretive guidance will feel helpful without becoming intrusive?
- When should Bamboo Money introduce a richer chart system instead of mostly numeric summaries?
- What level of brand warmth is appropriate before trust begins to erode?
- If AI surfaces are added, where should they live so they remain helpful but non-disruptive?

### Maintenance Rules
- Remove a question from this log when it has been resolved and incorporated into the active spec or explicitly deferred.
- Avoid storing resolved implementation decisions here.
- Prefer concrete unresolved questions over generic brainstorming prompts.

---

## Change Log

Status: Active  
Priority: Medium  
Applies To: Entire document  

| Date | Section | Summary of Change |
|------|---------|-------------------|
| 2026-03-15 | Initial Draft | Created Bamboo Money reserved and aspirational UI notes |
