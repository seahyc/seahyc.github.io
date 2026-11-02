# Market evidence: enterprise malleable software

Researched 2026-11-02. Primary vendor pages fetched directly with web search/open, including product documentation and release announcements. These establish advertised capabilities, not independently measured reliability, adoption or customer willingness to pay. No product hands-on testing or buyer interviews performed. Page bodies were opened; navigation and marketing examples are not treated as proof of shipped behavior.

## Decision-relevant finding

**A generic “employees build apps; IT gets secure hosting and governance” gap is contradicted by current primary evidence.** Replit, Lovable, Retool, Airtable, Microsoft and Google already advertise substantial pieces of this proposition. Retool announced essentially the builder-independent governed runtime thesis in June 2026. A founder needs a narrower, demonstrably underserved job, not merely an enterprise wrapper around an AI builder.

The strongest bear case is incumbent bundling: enterprise buyers can obtain building, runtime, identity, data permissions and lifecycle tools from an existing supplier. Google includes AppSheet Core in many Workspace licenses; Microsoft's governance is an entitlement of qualifying premium licenses. Existing permissions and procurement relationships can outweigh a better standalone interface. This is an inference from capabilities and licensing, not measured win/loss evidence.

## Source ledger (12 primary sources)

1. **Replit Enterprise**, undated live page, accessed 2026-11-02. https://replit.com/enterprise
   - Supports: SSO, SCIM, roles, searchable security audit logs, isolated execution, required security scans/review workflows, dependency vulnerability identification and patch preparation. Advertises BYOC data-plane options. Explicitly says natural-language building is accessible beyond engineering but technical review/testing still matter for critical software. Custom enterprise pricing.
   - Tool evidence: opened page lines 702–738: “Run the data plane in your company’s cloud tenant”; “prepare patches for newly disclosed vulnerabilities”.
   - Limit: broad product marketing; BYOC eligibility, regions, runtime application authorization and patch service guarantees not verified. Example dashboards are illustrations, not evidence of those exact product workflows.

2. **Lovable security**, undated live page, accessed 2026-11-02. https://lovable.dev/security
   - Supports: SAML/OIDC, SCIM, server-enforced role permissions, separate editing/approval/publishing rights, encrypted secrets, EU/US/APAC hosting options, logical isolation, publish security checks and critical-finding blocking. Business/Enterprise data excluded from training.
   - Tool evidence: lines 27–36: “Editing, approval, and publishing are separate permissions”; regional hosting described explicitly.
   - Limit: website claims not a contract or penetration-test result. No basis to say Lovable lacks hosting, enterprise identity, approvals or ongoing scanning.

3. **Lovable Security overview**, undated documentation, accessed 2026-11-02. https://docs.lovable.dev/features/security
   - Supports: quick/deep scans, database access checks, dependency audits and optional security integrations; expressly retains app-owner responsibility for use-case requirements and sensitive/critical functionality.
   - Tool evidence: body: “they do not replace a thorough security review.”
   - Limit: security tools reduce risks without guaranteeing app correctness. Documentation and marketing differ on scheduled-scan tier wording; verify entitlement before claiming Business availability. This is evidence of residual responsibility, not a quantified breach rate.

4. **Retool enterprise governance launch**, published 2026-06-17. https://retool.com/newsroom/retool-extends-enterprise-governance-to-vibe-coded-apps
   - Supports: announced production deployment of apps built using other AI coding tools, including Lovable/Replit, with inherited resource policies, permissions and audit trails. Also names imported React codebases.
   - Tool evidence: lines 18–20: “Build from anywhere. Ship in Retool.”
   - Limit: independent app/framework compatibility, migration friction and enforcement were not tested. Vendor survey percentages are not used as market prevalence estimates. The headline's “first” claim is not independently verified.

5. **Airtable Omni app building**, undated live page, accessed 2026-11-02. https://www.airtable.com/platform/app-building
   - Supports: plain-language creation and subsequent editing of connected tables, interfaces and workflows; existing permissions/audit logs, undo/revert, and review before generated automations run.
   - Tool evidence: lines 298–304 explicitly describe improving existing apps and revising supported components.
   - Limit: component-dependent editability; no inference of arbitrary full-stack code support or universal correctness. “Production-ready” is a vendor assertion.

6. **Airtable Enterprise Hub overview**, search-rendered update 2026-10-12; live body says updated 17 days ago. https://support.airtable.com/articles/5204974218-enterprise-hub-in-airtable-overview
   - Supports: Enterprise Scale centralized SSO/SCIM, user/workspace visibility, org units, inherited security defaults, organization-wide API/EKM/DLP/audit rules.
   - Tool evidence: lines 5–13 list plan availability and super-admin controls.
   - Limit: live relative date conflicts with search's absolute date; cite accessed 2026-11-02 if precise update date matters. Audit-log coverage, retention and data-plane semantics not tested.

7. **Google AppSheet security**, undated live page, accessed 2026-11-02. https://about.appsheet.com/security/
   - Supports: hosted platform updates without customer platform patching; app/user/data governance, data-source policy, usage monitoring and identity-provider authentication. Data is primarily in a chosen source, with some temporary platform storage.
   - Tool evidence: lines 31–36: “no need for patching”; body explains platform configuration remains stored in Google Cloud.
   - Limit: platform patching does not eliminate business-logic maintenance, source-schema changes or permissions configuration. Security filtering still requires appropriate app configuration.

8. **AppSheet organization licensing**, undated documentation, accessed 2026-11-02. https://support.google.com/appsheet/answer/16563370?hl=en
   - Supports: many Workspace licenses include Core; Enterprise Plus adds governance/team settings/app transfers. Required user tier depends on app creator's license; User Pass has distinct governance treatment.
   - Tool evidence: lines 30–37 directly enumerate licenses and creator-dependent rules.
   - Limit: “Google already bundles all enterprise governance” would be false: Core and Enterprise Plus differ. No prices asserted here.

9. **Microsoft Managed Environments overview**, updated 2026-10-16. https://learn.microsoft.com/en-us/power-platform/admin/managed-environment-overview
   - Supports: admin control at scale, environment groups, sharing limits, data policies, pipelines, solution checker, firewall, customer-managed keys, backups, app conditional access and monitoring export.
   - Tool evidence: lines 34–58 enumerate capabilities and premium entitlements.
   - Limit: configuration, region and feature-specific availability require separate checks. Not all Microsoft 365 users automatically receive these premium rights.

10. **Microsoft Managed Environments licensing**, current documentation accessed 2026-11-02. https://learn.microsoft.com/en-us/power-platform/admin/managed-environment-licensing
    - Supports: active usage requires qualifying standalone licenses or meters; per-app PAYG covers Power Apps, not automatically Power Automate. Says users without appropriate licenses will be blocked from opening apps starting February 2027 after notifications.
    - Tool evidence: lines 45 and 49–56 spell out licensing scope and announced enforcement.
    - Limit: future enforcement is announced policy, not observed execution. Licensing complexity might create friction but is not evidence buyers will switch.

11. **Microsoft Power Platform pipelines**, current documentation accessed 2026-11-02. https://learn.microsoft.com/en-us/power-platform/alm/pipelines
    - Supports: citizen and professional developer ALM, centrally configured safeguards, approvals, prevalidated deployments, saved solution artifacts and sequential stages. Solutions exclude Dataverse table data; professional developers can extend pipelines.
    - Tool evidence: lines 31–48 describe maker/admin tooling and managed maintenance; FAQ states the same solution artifact passes through stages.
    - Limit: Microsoft manages pipeline machinery, not all app semantics. Some supported deployment scope limitations remain. The page includes an authorization banner, but public body content was returned and read.

12. **Power Apps pricing**, US public page, accessed 2026-11-02. https://www.microsoft.com/en-us/power-platform/products/power-apps/pricing
    - Verified list prices: Premium USD20/user/month paid yearly; USD12/user/month paid yearly with a 2,000-seat minimum; Dataverse database capacity USD40/GB/month paid yearly. Free Developer Plan is for building/testing.
    - Tool evidence: lines 49–89 show those amounts and billing units.
    - Limit: region, tax, discounts, connector/data/AI costs and negotiated contracts alter total cost. Do not compare this list price directly with an unquoted new-product enterprise contract.

## Residual problems: supported vs unverified

**Supported:** creation is not the full lifecycle; security configuration and review remain necessary even with automated checks. Incumbents supply lifecycle machinery and managed infrastructure, so maintenance cannot be framed as completely absent. Arbitrary business correctness, least-privilege configuration, schema compatibility and organizational ownership are not guaranteed by the cited feature lists.

**Unverified:** how often apps become orphaned; real security incident prevalence; the number of nontechnical employees blocked from shipping; incumbent total cost for a target buyer; willingness to accept a new runtime; willingness to pay for ongoing semantic maintenance; reliable automatic patching without engineering review; cross-vendor portability and connector coverage. No defensible TAM or conversion estimate follows from these pages.

## Buyer and wedge hypotheses (not findings)

- **Buyer:** platform engineering or business systems leader with an existing backlog of small operational tools, paired with a department head who owns the workflow. Test who owns budget and post-launch failures; do not assume IT buys merely to restrict shadow software.
- **Possible wedge:** one bounded operational workflow with costly recurring changes, measurable manual reconciliation and established access rules. Sell a maintained outcome with explicit business invariants and named ownership, rather than app-generation volume.
- **Possible differentiated layer:** cross-builder inventory, ownership handover, business-behavior regression checks and repair commitments across existing runtimes. Retool already claims cross-builder governance, so validate what remains painful after a Retool/Power Platform evaluation.
- **Design constraint:** put data permissions and credential access beneath generated code, isolate risky writes and require approvals for consequential changes. This is table stakes supported by incumbent approaches, not unique differentiation.

## Falsification work before building a broad platform

Interview buyers already using these incumbents. Ask for the last three deployed employee-built apps, the last post-launch change, permission incident, owner departure and repair invoice. Observe the entire change-to-production workflow. Offer a narrow paid maintenance pilot on one real low-risk app; measure approval time, human repair work and whether the customer would renew. Stop the broad thesis if incumbent configuration solves the job at acceptable cost or if the buyer prefers its existing vendor despite a better demo.
