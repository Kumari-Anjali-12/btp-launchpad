import { SyllabusPhase } from '../../../types/curriculum';
import { PHASE_CAPSTONES } from '../capstones';

export const PHASE_5: SyllabusPhase = {
  id: 'phase-5',
  number: 5,
  title: 'Security and Integration',
  tagline: 'Phase 5 · Weeks 14-16 · ~24 Hours',
  description:
    'Master enterprise cloud application security and hybrid on-premise system integration on SAP BTP. Understand OAuth 2.0 and JWT token validation with XSUAA, fine-grained role-based access control, the BTP Destination service, the SAP Cloud Connector, and Principal Propagation to SAP S/4HANA.',
  coreObjective:
    'Secure distributed cloud applications and integrate enterprise backends safely. Protect CAP services with declarative security annotations (@requires, @restrict), configure SAP Cloud Connector reverse tunnels with zero open inbound firewall ports, establish Principal Propagation using short-lived X.509 client certificates, and consume on-premise RFCs/OData services via the SAP Cloud SDK.',
  estimatedHours: 24,
  suggestedWeeks: 'Weeks 14-16',
  badgeCategory: 'core',
  capstone: PHASE_CAPSTONES[5]!,
  modules: [
    {
      id: 'mod-5-1',
      code: '5.1',
      phaseId: 'phase-5',
      title: 'Authentication',
      tagline: 'OAuth 2.0 Flows, XSUAA Service, and Enterprise Identity Federation',
      summary:
        'Master the authentication infrastructure of SAP BTP. Understand the complete OAuth 2.0 Authorization Code flow with PKCE, the role of the XSUAA service, SAP Cloud Identity Services (IAS), and how cryptographic JWT signatures are validated across microservices.',
      estimatedMinutes: 35,
      level: 'Intermediate',
      subtopics: [
        'The enterprise identity architecture: Corporate Identity Provider (Microsoft Entra ID, Okta) &rarr; SAP Cloud Identity Services (IAS) &rarr; SAP BTP XSUAA &rarr; Application.',
        'OAuth 2.0 grant types in BTP: Authorization Code with PKCE (interactive user logins) vs Client Credentials (automated machine-to-machine backend integrations).',
        'XSUAA Service internal mechanics: Binding, service keys, `VCAP_SERVICES`, and the JWKS public key endpoint.',
        'JSON Web Token (JWT) cryptographic validation: Verifying RS256 signatures, checking issuer (`iss`), validating expiration (`exp`), and matching audience (`aud`).',
        'Single Sign-On (SSO): Seamless cross-application authentication across S/4HANA, BTP, and SuccessFactors.',
      ],
      practicalImplementation:
        'Bind an XSUAA service instance to a CAP Node.js application. Use `@sap/xssec` security middleware to intercept incoming HTTP requests, decode the JWT Bearer token, and inspect user identity claims.',
      masteryCheck:
        'Trace the 7-step sequence of an OAuth 2.0 Authorization Code exchange from the initial browser redirect to final token verification. Explain why microservices must reject tokens with mismatched "aud" (audience) claims.',
      learningObjectives: [
        'Diagram the enterprise authentication flow between Corporate IdPs, SAP IAS, and XSUAA.',
        'Differentiate between Authorization Code and Client Credentials grant flows.',
        'Implement cryptographic JWT verification using official SAP security libraries (@sap/xssec).',
        'Validate critical security claims (iss, aud, exp) to prevent token spoofing attacks.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Multi-Tier Enterprise Identity Architecture',
          subtitle: 'Why BTP uses a two-tier identity proxy model',
          explanation:
            'In enterprise architecture, software security relies on clean separation of concerns: 1) The Corporate Identity Provider (e.g., Microsoft Entra ID / Okta) is the primary authority that owns employee usernames, passwords, and Multi-Factor Authentication (MFA). 2) SAP Cloud Identity Services (IAS) acts as the enterprise broker: it federates with Entra ID using SAML 2.0 or OpenID Connect. 3) SAP BTP XSUAA (SAP Authorization and Trust Management Service) acts as the application token issuer: it receives identity claims from IAS, translates corporate user groups into BTP scopes, and issues cryptographically signed OAuth 2.0 JSON Web Tokens (JWT) for microservices.',
          keyIdea:
            'Corporate IdP verifies the password; SAP IAS brokers the trust; XSUAA issues the application-specific JWT access token.',
          taskInstruction: 'Review the multi-tier identity diagram below.',
          hint: 'This architecture ensures that if a company switches from Okta to Entra ID, zero application code needs to change on BTP.',
        },
        {
          stepNumber: 2,
          title: 'OAuth 2.0 Grant Types: Users vs Machines',
          subtitle: 'Choosing the right flow for human logins vs automated services',
          explanation:
            'BTP applications utilize two primary OAuth 2.0 grant types: 1) Authorization Code Grant with PKCE: Used for interactive human users accessing web applications via browsers. The user enters their credentials at the IdP; the IdP issues a temporary authorization code; the Approuter exchanges this code directly with XSUAA for an access token over a secure backend channel. 2) Client Credentials Grant: Used for automated machine-to-machine integrations (e.g., a scheduled batch job running in SAP Integration Suite). There is no human user; the calling service presents a client ID and client secret directly to XSUAA to obtain an application-level token.',
          keyIdea:
            'Use Authorization Code for human browser apps; use Client Credentials for automated background system-to-system integrations.',
          taskInstruction: 'Examine the grant type decision matrix in the concept explanation.',
          warning: 'Never use the deprecated Resource Owner Password Credentials (ROPC) grant; it exposes passwords directly to application code.',
        },
        {
          stepNumber: 3,
          title: 'The XSUAA Service and VCAP_SERVICES Binding',
          subtitle: 'How microservices receive security configuration',
          explanation:
            'When an application deploys to Cloud Foundry and binds to an XSUAA service instance (`xsuaa_service`), Cloud Foundry injects the service credentials into the container\'s environment variables under `VCAP_SERVICES`. Key properties include: 1) `clientid`: The application OAuth client ID. 2) `clientsecret`: The confidential client password. 3) `url`: The OAuth token server URL. 4) `identityzone`: The tenant security zone. 5) `verificationkey`: The public RSA key (or JWKS URL) used by backend microservices to verify incoming JWT signatures.',
          keyIdea:
            '`VCAP_SERVICES` contains the public keys and endpoints your application needs to validate tokens automatically.',
          taskInstruction: 'Inspect the VCAP_SERVICES JSON snippet in the technical example below.',
          hint: 'The official `@sap/xssec` package reads `VCAP_SERVICES` automatically with zero manual parsing code.',
        },
        {
          stepNumber: 4,
          title: 'Cryptographic JWT Token Validation',
          subtitle: 'What a secure backend must verify on every single HTTP request',
          explanation:
            'When a client sends `Authorization: Bearer <token>`, a secure backend microservice executes four mandatory checks: 1) Signature Verification: Uses the XSUAA public key (RS256) to verify that the token was signed by XSUAA and has not been tampered with. 2) Expiration Check (`exp`): Verifies `currentTime < exp`; rejects expired tokens immediately with HTTP 401. 3) Issuer Verification (`iss`): Confirms the token was issued by the expected subaccount XSUAA instance. 4) Audience Verification (`aud`): Confirms that this specific application is listed in the `aud` array. If App A receives a token intended exclusively for App B, it must reject the token.',
          keyIdea:
            'Never trust a token just because it decodes; always mathematically verify the cryptographic signature and audience claim.',
          taskInstruction: 'Trace the token validation logic in the code example.',
          warning: 'Failing to check the "aud" (audience) claim allows cross-application token reuse attacks.',
        },
        {
          stepNumber: 5,
          title: 'Single Sign-On (SSO) Across the Hybrid Landscape',
          subtitle: 'Seamless navigation without repeated password prompts',
          explanation:
            'In an integrated enterprise landscape, an employee starts in the SAP Build Work Zone portal, navigates to a custom CAP application on BTP, and clicks a button that queries live inventory from on-premise SAP S/4HANA. Single Sign-On (SSO) ensures the user is never prompted to re-enter their password. The user\'s authenticated security context is preserved and propagated across all boundaries: the browser holds a secure session cookie with the Approuter, the Approuter forwards JWT tokens to CAP, and the CAP backend propagates the user identity to S/4HANA via the BTP Destination service.',
          keyIdea:
            'SSO delivers zero-friction employee productivity while maintaining complete end-to-end security auditability.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'SSO requires corporate identity federation with SAP Cloud Identity Services.',
        },
      ],
      diagramType: 'xsuaa-oauth',
      analogy: {
        concept: 'OAuth 2.0 and JWT Token Validation with XSUAA',
        analogy: 'The State Department Passport Agency and Embassy Visas',
        explanation:
          'Imagine traveling abroad. You do not show your birth certificate, medical records, and utility bills at every foreign train station (sharing passwords). Instead, you visit your National Passport Agency (Corporate IdP / Entra ID): you show proof of citizenship, and they issue you a standardized, tamper-evident Passport (Identity Authentication). When you want to visit a specialized foreign country (SAP BTP Application), their consulate (XSUAA) inspects your passport and stamps an official Tourist Visa into your passport (the JWT Access Token). The visa contains a cryptographic holographic watermark (the RSA signature), an expiration date (`exp: 30 days`), and specific allowed activities (`scope: Tourism, no employment`). When you board a domestic train inside that country (calling a backend microservice), the conductor does not call the president; they inspect the holographic watermark with a blacklight (verifying public key signature) and let you ride.',
        transition:
          'Where the embassy visa grants verified, limited travel permissions, the XSUAA JWT token grants verified, limited API access permissions to enterprise microservices.',
      },
      conceptExplanation: {
        whatItIs:
          'Authentication in SAP BTP is the enterprise security framework that verifies the identity of users and systems using industry-standard protocols—primarily OAuth 2.0, OpenID Connect (OIDC), and SAML 2.0—managed through SAP Cloud Identity Services and the XSUAA service.',
        whyItExists:
          'Enterprise software manages confidential corporate assets. Password-based authentication between microservices is insecure, violates compliance mandates, and creates severe credential management overhead.',
        problemSolved:
          'Eliminates password sharing, enables Single Sign-On (SSO) across enterprise cloud and on-premise systems, and allows microservices to verify identities cryptographically with sub-millisecond latency.',
        howItWorks:
          'The user authenticates with their corporate IdP via SAP IAS. XSUAA issues an RS256-signed JSON Web Token (JWT). The client includes this token in the `Authorization: Bearer <token>` HTTP header. The backend microservice uses `@sap/xssec` security middleware and public keys from XSUAA to verify the signature and authorize the request.',
        btpFit:
          'Authentication via XSUAA is the mandatory foundation for all secure applications and services on SAP BTP.',
      },
      jargonTerms: [
        {
          term: 'OAuth 2.0',
          simpleMeaning: 'An open standard authorization framework that grants applications secure delegated access using tokens instead of passwords.',
          familiarEquivalent: 'Giving a valet parking attendant a special valet key that starts the car but cannot open the locked glovebox.',
        },
        {
          term: 'XSUAA',
          simpleMeaning: 'SAP\'s internal OAuth 2.0 authorization server on BTP that issues and validates JWT security tokens.',
          familiarEquivalent: 'The high-security badge printing office in an enterprise skyscraper.',
        },
        {
          term: 'Bearer Token',
          simpleMeaning: 'A security token transmitted in the HTTP Authorization header where possession proves authorization.',
          familiarEquivalent: 'A physical theater ticket: whoever holds the ticket is admitted to the show.',
        },
        {
          term: 'JWKS (JSON Web Key Set)',
          simpleMeaning: 'A standard public web endpoint where the authorization server publishes its cryptographic public keys.',
          familiarEquivalent: 'A public notary directory where anyone can look up the official signature seal of a certified notary.',
        },
      ],
      technicalExample: {
        title: 'Backend JWT Security Middleware Configuration in Node.js with @sap/xssec',
        language: 'javascript',
        code: `// Express / CAP Custom Security Middleware using @sap/xssec
import express from 'express';
import passport from 'passport';
import { JWTStrategy } from '@sap/xssec';
import xsenv from '@sap/xsenv';

const app = express();

// 1. Load XSUAA service credentials from VCAP_SERVICES environment
xsenv.loadEnv();
const xsuaaCredentials = xsenv.getServices({ xsuaa: { tag: 'xsuaa' } }).xsuaa;

// 2. Configure Passport with the official SAP JWTStrategy
passport.use(new JWTStrategy(xsuaaCredentials));
app.use(passport.initialize());

// 3. Protect all /api routes with JWT Bearer Token validation
app.use('/api', passport.authenticate('JWT', { session: false }), (req, res, next) => {
  // At this point, @sap/xssec has already:
  // - Verified the cryptographic RS256 signature using XSUAA public key
  // - Confirmed the token is not expired (currentTime < exp)
  // - Confirmed issuer and audience match this application

  // Inspect verified security context
  const user = req.user;
  console.log(\`[Auth Success] Authenticated User: \${user.getId()} | Email: \${user.getEmail()}\`);

  next();
});

// 4. Protected Business Endpoint
app.get('/api/payroll', (req, res) => {
  // Check granular technical scope
  if (!req.authInfo.checkLocalScope('Payroll.Read')) {
    return res.status(403).json({ error: 'Forbidden: Missing Payroll.Read scope' });
  }
  res.json({ status: 'Authorized', data: [/* sensitive financial records */] });
});`,
        purpose:
          'Demonstrates professional enterprise backend security in Node.js: loading XSUAA credentials from VCAP_SERVICES, configuring Passport with @sap/xssec JWTStrategy, and enforcing cryptographic token validation and scope checks.',
        lineExplanations: [
          { lines: '11', explanation: 'xsenv.getServices: Extracts xsuaa credentials (client ID, verification key) from VCAP_SERVICES.' },
          { lines: '14', explanation: 'passport.use(new JWTStrategy): Instantiates official SAP cryptographic verification strategy.' },
          { lines: '18', explanation: 'passport.authenticate("JWT"): Intercepts requests, validates Bearer tokens, and rejects invalid calls with 401.' },
          { lines: '31', explanation: 'req.authInfo.checkLocalScope: Enforces technical scope authorization before returning sensitive payroll records.' },
        ],
        expectedOutput:
          'Unauthenticated calls are blocked with 401; unauthorized users receive 403; verified calls execute securely.',
        commonMistakes: [
          'Using generic open-source JWT libraries that do not validate SAP XSUAA tenant isolation and multi-tenancy rules.',
          'Not validating scopes on backend API routes, relying mistakenly on frontend UI hiding.',
        ],
      },
      businessScenario: {
        title: 'Global Financial Ledger Single Sign-On Architecture',
        context:
          'A multi-national banking conglomerate operates a customer banking portal on SAP BTP and must enforce strict single sign-on across 50,000 branch workstations.',
        workflowSteps: [
          'Bank teller opens BTP Portal and authenticates using corporate Microsoft Entra ID with FIDO2 hardware security keys.',
          'SAP Cloud Identity Services (IAS) validates the multi-factor assertion and notifies BTP XSUAA.',
          'XSUAA issues an RS256-signed JWT token carrying scopes `Teller.Deposit` and `Teller.BalanceInquiry`.',
          'Teller web application sends authenticated OData requests with `Authorization: Bearer <token>`.',
          'Backend CAP service validates the cryptographic signature in 0.4 milliseconds and commits ledger transactions with verified audit user stamps.',
        ],
        businessImpact:
          'Eliminates password reuse vulnerabilities, provides 100% cryptographic auditability for financial regulators, and prevents unauthorized transaction injection.',
      },
      practicalActivity:
        'Launch Practice Drill "Authentication vs Authorization" (/practice?tab=drills&id=sec-authn-authz) to test your authentication knowledge.',
      keyTakeaways: [
        'XSUAA is SAP\'s OAuth 2.0 authorization server that issues and validates cryptographically signed JWT access tokens.',
        'Always validate token signatures, expiration (exp), issuer (iss), and audience (aud) before trusting incoming requests.',
        'Use the official @sap/xssec library to handle enterprise JWT validation in Node.js applications.',
      ],
      quizQuestions: [
        {
          id: 'mod-5-1-q1',
          question:
            'What is the primary role of the SAP BTP XSUAA service during an application authentication workflow?',
          options: [
            {
              id: 'a',
              text: 'It acts as the OAuth 2.0 Authorization Server that receives identity assertions from the Identity Provider, translates corporate user groups into BTP scopes, and issues cryptographically signed JWT access tokens.',
              isCorrect: true,
              explanation:
                'Correct. XSUAA is the core authorization and token-issuing engine for SAP BTP microservices.',
            },
            {
              id: 'b',
              text: 'It stores employee home addresses and sends monthly paper bills.',
              isCorrect: false,
              explanation:
                'Incorrect. XSUAA is a digital security service, not a paper mailer.',
            },
            {
              id: 'c',
              text: 'It replaces the Linux operating system inside Cloud Foundry containers.',
              isCorrect: false,
              explanation:
                'Incorrect. XSUAA is an application-level security service.',
            },
            {
              id: 'd',
              text: 'It automatically translates English source code into German.',
              isCorrect: false,
              explanation:
                'Incorrect. XSUAA handles security, not natural language translation.',
            },
          ],
        },
        {
          id: 'mod-5-1-q2',
          question:
            'Why must an enterprise backend microservice verify the "aud" (audience) claim in an incoming JWT token before processing a request?',
          options: [
            {
              id: 'a',
              text: 'To confirm that the token was explicitly issued for this specific application, preventing an attacker from reusing a token stolen from an unrelated low-security application to access a high-security service.',
              isCorrect: true,
              explanation:
                'Correct. Audience validation prevents cross-application token reuse attacks in multi-service environments.',
            },
            {
              id: 'b',
              text: 'To check how many people are currently watching the user screen.',
              isCorrect: false,
              explanation:
                'Incorrect. Audience refers to the target application client ID, not human spectators.',
            },
            {
              id: 'c',
              text: 'Because tokens expire immediately if the audience claim is inspected.',
              isCorrect: false,
              explanation:
                'Incorrect. Inspecting claims does not cause tokens to expire.',
            },
            {
              id: 'd',
              text: 'Because audience checks are legally required only for radio broadcasting apps.',
              isCorrect: false,
              explanation:
                'Incorrect. Audience verification is an essential standard across all web security frameworks.',
            },
          ],
        },
        {
          id: 'mod-5-1-q3',
          question:
            'Which OAuth 2.0 grant type should be chosen when configuring an automated, non-interactive backend integration between two cloud microservices with no human user involvement?',
          options: [
            {
              id: 'a',
              text: 'Client Credentials Grant',
              isCorrect: true,
              explanation:
                'Correct. Client Credentials is the standard OAuth 2.0 flow for automated machine-to-machine integrations.',
            },
            {
              id: 'b',
              text: 'Authorization Code Grant with PKCE',
              isCorrect: false,
              explanation:
                'Incorrect. Authorization Code is designed for interactive human logins with browser redirects.',
            },
            {
              id: 'c',
              text: 'Implicit Grant (deprecated)',
              isCorrect: false,
              explanation:
                'Incorrect. Implicit grant is insecure and deprecated in modern OAuth standards.',
            },
            {
              id: 'd',
              text: 'Manual Password Entry Flow',
              isCorrect: false,
              explanation:
                'Incorrect. Storing manual passwords in code is strictly prohibited.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-5-2',
      code: '5.2',
      phaseId: 'phase-5',
      title: 'Authorization',
      tagline: 'Scopes, Roles, Role Collections, and Declarative CDS Security',
      summary:
        'Master granular authorization and access control in SAP BTP. Learn how developers define technical scopes in code, how administrators assign business Role Collections, and how to enforce declarative security in Core Data Services using @requires and @restrict.',
      estimatedMinutes: 35,
      level: 'Intermediate',
      subtopics: [
        'Role-Based Access Control (RBAC) vs Attribute-Based Access Control (ABAC): When roles alone are insufficient and data row-level security is required.',
        'The scope naming convention: `$XSAPPNAME.ScopeName` (e.g., `$XSAPPNAME.Admin`, `$XSAPPNAME.OrderApprover`).',
        'Declarative security in CDS: `@requires` (service-level authentication check) and `@restrict` (granular entity-level CRUD grants and WHERE filters).',
        'Row-level data authorization: Enforcing data tenant isolation using CDS `@restrict: [{ grant: \'READ\', where: \'country = $user.country\' }]`.',
        'Programmatic authorization in Node.js: `req.user.is(\'Role\')` and `req.user.attr.AttributeName`.',
        'Principal Propagation: Forwarding authenticated user identity across microservices and on-premise systems without re-entering credentials.',
      ],
      practicalImplementation:
        'Add declarative `@requires` and `@restrict` annotations to an enterprise CAP service definition. Enforce row-level security where managers can only read purchase orders matching their assigned organizational country code.',
      masteryCheck:
        'Author a complete CDS `@restrict` annotation block granting read-only access to standard employees, full CRUD access to managers, and restricting visible records where `plant = $user.plant`.',
      learningObjectives: [
        'Design role-based and attribute-based access control models for enterprise apps.',
        'Implement declarative service and entity security in CDS using @requires and @restrict.',
        'Enforce row-level data filtering based on dynamic user attributes ($user.attribute).',
        'Execute programmatic authorization checks in custom Node.js event handlers.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'RBAC vs ABAC: Moving Beyond Simple Roles',
          subtitle: 'Why modern enterprises require row-level security',
          explanation:
            'In simple applications, Role-Based Access Control (RBAC) suffices: "Users with role Admin can edit; users with role Viewer can read." However, large multinational enterprises require Attribute-Based Access Control (ABAC): a regional sales manager has the "SalesManager" role, but should only be allowed to view sales orders originating in their specific territory (e.g., Germany), not sales orders from Japan or Brazil. ABAC evaluates user attributes (department, country, company code, cost center) against data row attributes dynamically at query time.',
          keyIdea:
            'RBAC determines WHICH features you can access; ABAC determines WHICH SPECIFIC DATA ROWS you can see.',
          taskInstruction: 'Review the RBAC vs ABAC comparison in the concept explanation.',
          hint: 'CAP supports both RBAC and ABAC natively through CDS annotations.',
        },
        {
          stepNumber: 2,
          title: 'Declarative Service Security: @requires',
          subtitle: 'Securing entire services with a single annotation',
          explanation:
            'In SAP CAP, you do not write hundreds of repetitive `if (!user.isLoggedIn())` checks inside your code. Security is declarative: 1) `@requires: \'authenticated-user\'`: Restricts the entire service to users who have logged in with a valid JWT token. Anonymous calls receive HTTP 401. 2) `@requires: \'Admin\'`: Restricts the service strictly to users holding the Admin role. Non-admin users receive HTTP 403 Forbidden automatically before any event handlers execute.',
          keyIdea:
            'Use `@requires` at the service level to enforce baseline authentication and high-level role checks effortlessly.',
          taskInstruction: 'Inspect the service-level `@requires` annotation in the code example.',
          hint: 'Annotating a service with `@requires: \'authenticated-user\'` should be your default starting point for all enterprise services.',
        },
        {
          stepNumber: 3,
          title: 'Granular Entity Security: @restrict',
          subtitle: 'Fine-grained CRUD permissions per entity',
          explanation:
            'For granular control, CAP provides the `@restrict` annotation on individual entities. It accepts an array of grant rules: 1) `grant: \'READ\'`, `to: \'Employee\'`: Allows employees to query the entity. 2) `grant: [\'CREATE\', \'UPDATE\']`, `to: \'Manager\'`: Allows managers to create and edit records. 3) `grant: \'*\'`, `to: \'Admin\'`: Grants full administrative control. If an employee attempts a `DELETE` request, CAP intercepts the call and returns HTTP 403 Forbidden with zero custom JavaScript code required.',
          keyIdea:
            '`@restrict` gives you surgical control over which roles can execute CREATE, READ, UPDATE, or DELETE on specific entities.',
          taskInstruction: 'Review the `@restrict` syntax in the technical example below.',
          warning: 'If an entity has an `@restrict` block, any role not explicitly granted access is denied by default (deny-all principle).',
        },
        {
          stepNumber: 4,
          title: 'Row-Level Security: Dynamic WHERE Clauses',
          subtitle: 'Filtering data automatically based on the logged-in user',
          explanation:
            'One of CAP\'s most powerful enterprise features is row-level security using the `where` clause inside `@restrict`. For example: `@restrict: [{ grant: \'READ\', to: \'SalesAgent\', where: \'country = $user.country\' }]`. When a sales agent queries `GET /Orders`, the CAP database adapter automatically injects `AND country = ?` into the generated SQL query, binding the agent\'s verified country attribute from their JWT token. An agent from France literally cannot receive data from Germany; the database engine filters the rows before data ever reaches memory.',
          keyIdea:
            'The `$user` variable in CDS `@restrict` dynamically injects SQL WHERE clauses based on claims inside the user\'s verified JWT token.',
          taskInstruction: 'Examine the row-level filtering query in the code example.',
          hint: 'This completely eliminates the need for developers to remember to add manual `where({ country: req.user.attr.country })` in every query.',
        },
        {
          stepNumber: 5,
          title: 'Programmatic Authorization Checks in Handlers',
          subtitle: 'When business logic requires complex runtime permission checks',
          explanation:
            'While declarative annotations handle 90% of security, complex edge cases require programmatic checks inside Node.js event handlers: 1) `req.user.is(\'RoleName\')`: Returns true if the user possesses the specified role. 2) `req.user.attr.AttributeName`: Reads custom claims from the token (e.g., `req.user.attr.costCenter`). 3) For example, a handler might check: `if (order.amount > 50000 && !req.user.is(\'VP\')) return req.reject(403, \'Approval requires VP scope\');`.',
          keyIdea:
            'Use declarative CDS annotations for standard access rules; use programmatic `req.user.is()` for complex conditional business logic.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Always combine declarative baseline rules with programmatic edge-case checks.',
        },
      ],
      diagramType: 'xsuaa-oauth',
      analogy: {
        concept: 'Declarative Authorization and Row-Level Security',
        analogy: 'The Hospital Records Department and Patient File Vault',
        explanation:
          'Think of hospital medical records. 1) `@requires: \'authenticated-user\'` (The Front Door): You must wear a hospital employee ID badge to enter the building. Unbadged visitors are turned away at the revolving door (HTTP 401). 2) `@restrict` Roles (Department Access): Nurses can read patient vital signs (READ); Doctors can write prescriptions (UPDATE); only the Chief Medical Officer can delete a record (DELETE). 3) Row-Level ABAC Security (`where: department = $user.dept`): A pediatric cardiologist has the "Doctor" role, but when they open the patient filing cabinet, they are only legally permitted to open folders for children in the Pediatric Cardiology Ward. Even though they are a doctor, they cannot open patient files from the Oncology or Psychiatric wards.',
        transition:
          'Where hospital regulations restrict doctor access to their specific patients, CDS `@restrict` annotations restrict corporate employees to data records matching their organizational attributes.',
      },
      conceptExplanation: {
        whatItIs:
          'Authorization in SAP BTP is the security mechanism that determines what authenticated users and systems are permitted to do, governing both functional feature access (Role-Based Access Control) and specific data record visibility (Attribute-Based Access Control).',
        whyItExists:
          'Enterprises must enforce the Principle of Least Privilege and maintain compliance with data privacy regulations (GDPR, CCPA) by ensuring users only access the minimal data required for their job duties.',
        problemSolved:
          'Eliminates unauthorized data modification, prevents cross-departmental data leaks, automates row-level database filtering, and simplifies security maintenance through declarative metadata.',
        howItWorks:
          'Developers declare security rules in CDS using `@requires` and `@restrict`. The CAP framework inspects the user\'s verified JWT scopes and attributes on every request. If rules are satisfied, queries proceed with automatically injected SQL filtering clauses; if violated, the transaction rejects immediately with HTTP 403 Forbidden.',
        btpFit:
          'Declarative authorization in CAP is the standard mechanism for securing enterprise OData APIs on SAP BTP.',
      },
      jargonTerms: [
        {
          term: 'RBAC (Role-Based Access Control)',
          simpleMeaning: 'Restricting access based on assigned job roles (e.g., Manager, Auditor, Staff).',
          familiarEquivalent: 'Keys that open all doors in a department.',
        },
        {
          term: 'ABAC (Attribute-Based Access Control)',
          simpleMeaning: 'Restricting access based on dynamic user attributes (e.g., country, department, spending limit).',
          familiarEquivalent: 'A keycard that only opens doors if your department matches the room label.',
        },
        {
          term: '@requires',
          simpleMeaning: 'A CDS annotation that enforces baseline authentication or role requirements at the service level.',
          familiarEquivalent: 'A "Staff Only" sign posted on an office door.',
        },
        {
          term: '@restrict',
          simpleMeaning: 'A granular CDS annotation specifying exact CRUD permissions and row-level SQL WHERE filters per entity.',
          familiarEquivalent: 'A detailed security clearance matrix specifying who can read, copy, or shred each document.',
        },
      ],
      technicalExample: {
        title: 'Declarative CDS Security with Role Grants and Row-Level ABAC Filtering',
        language: 'sql',
        code: `// srv/procurement-service.cds - Declarative Enterprise Authorization
using { sap.btp.procurement as my } from '../db/schema';

// 1. Service-Level Authentication Requirement
@requires: 'authenticated-user'
service ProcurementService {

  // 2. Entity-Level Granular CRUD Grants and Row-Level Filtering
  @restrict: [
    // Standard Employees: Can read and create orders in their own country
    {
      grant: ['READ', 'CREATE'],
      to: 'Employee',
      where: 'country = $user.country'
    },
    // Procurement Managers: Can update orders in their own purchasing organization
    {
      grant: ['UPDATE'],
      to: 'ProcurementManager',
      where: 'purchasingOrg = $user.purchasingOrg'
    },
    // Compliance Auditors: Full read access across all countries and orgs
    {
      grant: 'READ',
      to: 'ComplianceAuditor'
    },
    // System Administrators: Unrestricted full access
    {
      grant: '*',
      to: 'SystemAdmin'
    }
  ]
  entity PurchaseOrders as projection on my.PurchaseOrders;

  // Read-only catalog accessible to all authenticated users
  @readonly
  entity Products as projection on my.Products;
}`,
        purpose:
          'Demonstrates enterprise declarative authorization in CDS: service-level authentication requirement, granular CRUD role assignments, and automated row-level ABAC filtering using dynamic $user attributes.',
        lineExplanations: [
          { lines: '4', explanation: '@requires: "authenticated-user": Rejects unauthenticated anonymous traffic with HTTP 401.' },
          { lines: '8-14', explanation: 'Employee Grant: Automatically appends "AND country = \'<user-country>\'" to all SQL SELECT queries.' },
          { lines: '15-20', explanation: 'Manager Grant: Restricts UPDATE operations to orders matching the manager\'s purchasingOrg attribute.' },
          { lines: '21-25', explanation: 'Auditor Grant: Read-only access across all global records with no WHERE restrictions.' },
          { lines: '26-30', explanation: 'Admin Grant: grant: "*" allows CREATE, READ, UPDATE, and DELETE unconditionally.' },
        ],
        expectedOutput:
          'CAP database adapter compiles queries with dynamic WHERE filters; unauthorized CRUD attempts receive HTTP 403 Forbidden.',
        commonMistakes: [
          'Forgetting that @restrict enforces default-deny: if a role is not listed in @restrict, it has zero access.',
          'Hardcoding static attribute values instead of referencing dynamic token claims via $user.attribute.',
        ],
      },
      businessScenario: {
        title: 'Multi-National Defense Contractor Data Isolation',
        context:
          'A defense aerospace manufacturer develops military hardware for 5 NATO nations and must legally prevent engineers in Nation A from viewing classified blueprints from Nation B.',
        workflowSteps: [
          'Engineers log into the BTP technical engineering portal using their national military smartcards.',
          'Identity Provider injects verified national security attribute `clearance_country` into the user\'s JWT token.',
          'CAP service evaluates `@restrict: [{ grant: \'READ\', where: \'ITAR_Country = $user.clearance_country\' }]`.',
          'Database executes optimized SQL in SAP HANA Cloud: queries for blueprints from non-cleared nations return zero rows.',
          'Audit log records that the engineer only received documents permitted under their statutory clearance.',
        ],
        businessImpact:
          'Guarantees 100% legal compliance with International Traffic in Arms Regulations (ITAR) and eliminates catastrophic multi-million-dollar defense contracting security breaches.',
      },
      practicalActivity:
        'Launch Practice Drill "Securing Routes with JWT" (/practice?tab=drills&id=sec-jwt-xsuaa) and "Route Protection" (/practice?tab=drills&id=sec-route-protection).',
      keyTakeaways: [
        'RBAC governs functional permissions; ABAC governs row-level data visibility based on user attributes.',
        'Use @requires at the service level and @restrict on individual entities.',
        'The $user.attribute syntax in CDS automatically filters database queries at runtime without manual SQL coding.',
      ],
      quizQuestions: [
        {
          id: 'mod-5-2-q1',
          question:
            'In an SAP CAP service, what is the effect of adding the annotation "@restrict: [{ grant: \'READ\', to: \'SalesAgent\', where: \'country = $user.country\' }]" to an Orders entity?',
          options: [
            {
              id: 'a',
              text: 'The CAP database adapter automatically injects a SQL "WHERE country = ?" clause into queries made by SalesAgents, dynamically restricting visible rows to records matching their verified JWT country attribute.',
              isCorrect: true,
              explanation:
                'Correct. Dynamic row-level filtering ensures users only ever receive records matching their verified identity attributes.',
            },
            {
              id: 'b',
              text: 'It permanently deletes all orders from foreign countries from the hard drive.',
              isCorrect: false,
              explanation:
                'Incorrect. Row-level filtering filters queries; it never deletes database records.',
            },
            {
              id: 'c',
              text: 'It forces the user to fly to that country before they can log in.',
              isCorrect: false,
              explanation:
                'Incorrect. Country attribute refers to organizational data, not physical travel.',
            },
            {
              id: 'd',
              text: 'It translates the order descriptions into that country\'s native language.',
              isCorrect: false,
              explanation:
                'Incorrect. Language translation is handled by localized fields, not @restrict.',
            },
          ],
        },
        {
          id: 'mod-5-2-q2',
          question:
            'If an entity has an "@restrict" block with rules defined for "Employee" and "Manager", what happens if a user with role "Contractor" attempts to read records from that entity?',
          options: [
            {
              id: 'a',
              text: 'The request is rejected with HTTP 403 Forbidden, because @restrict enforces a strict "deny-all" default: any role not explicitly granted access is denied.',
              isCorrect: true,
              explanation:
                'Correct. Once an entity has an @restrict block, any role not granted access is denied by default.',
            },
            {
              id: 'b',
              text: 'The contractor is granted full administrative access automatically.',
              isCorrect: false,
              explanation:
                'Incorrect. Unlisted roles are denied, not elevated.',
            },
            {
              id: 'c',
              text: 'The server crashes with an unhandled exception.',
              isCorrect: false,
              explanation:
                'Incorrect. Authorization rejection is graceful and returns HTTP 403.',
            },
            {
              id: 'd',
              text: 'The contractor receives all records, but with scrambled letters.',
              isCorrect: false,
              explanation:
                'Incorrect. Denied requests return zero data.',
            },
          ],
        },
        {
          id: 'mod-5-2-q3',
          question:
            'What is the difference between service-level "@requires: \'authenticated-user\'" and entity-level "@restrict"?',
          options: [
            {
              id: 'a',
              text: '"@requires" enforces high-level authentication or role gates on the entire service, while "@restrict" provides fine-grained, per-operation (CRUD) grants and row-level SQL WHERE filtering on individual entities.',
              isCorrect: true,
              explanation:
                'Correct. @requires is coarse-grained (service entry), whereas @restrict is fine-grained (entity CRUD and row-filtering).',
            },
            {
              id: 'b',
              text: '"@requires" is only for Java; "@restrict" is only for Node.js.',
              isCorrect: false,
              explanation:
                'Incorrect. Both annotations work identically across Node.js and Java in CAP.',
            },
            {
              id: 'c',
              text: '"@requires" can only be used on weekends.',
              isCorrect: false,
              explanation:
                'Incorrect. Both annotations operate 24/7.',
            },
            {
              id: 'd',
              text: '"@restrict" disables all database security completely.',
              isCorrect: false,
              explanation:
                'Incorrect. @restrict defines strict security rules.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-5-3',
      code: '5.3',
      phaseId: 'phase-5',
      title: 'Destinations',
      tagline: 'Destination Service, Cloud Connector, and Principal Propagation',
      summary:
        'Master enterprise hybrid connectivity on SAP BTP. Learn how the BTP Destination service decouples technical connection details from application code, how the SAP Cloud Connector creates secure reverse tunnels through corporate firewalls, and how Principal Propagation preserves user identity to on-premise SAP S/4HANA systems.',
      estimatedMinutes: 35,
      level: 'Intermediate',
      subtopics: [
        'The Destination Service: Managed connection address book storing URLs, authentication types, and certificates in the BTP Cockpit.',
        'The SAP Cloud Connector (SCC): An on-premise reverse proxy creating an outbound reverse TLS tunnel to SAP BTP without opening inbound firewall ports.',
        'Virtual to Internal mapping: Hiding internal hostnames (`s4hana.internal.corp`) behind virtual aliases (`S4_ONPREM_ERP`).',
        'Authentication types: NoAuthentication, BasicAuthentication, OAuth2ClientCredentials, and PrincipalPropagation.',
        'Principal Propagation in-depth: How BTP generates short-lived X.509 client certificates to log into on-premise SAP systems as the exact logged-in cloud user.',
        'Consuming destinations via the SAP Cloud SDK: `@sap-cloud-sdk/connectivity` and `@sap-cloud-sdk/http-client`.',
      ],
      practicalImplementation:
        'Configure a destination in the BTP Cockpit pointing to an on-premise system. Author a Node.js utility using the `@sap-cloud-sdk/http-client` that executes a live OData query through the Cloud Connector using Principal Propagation.',
      masteryCheck:
        'Explain why network security teams approve the SAP Cloud Connector: explain why outbound reverse TLS tunnels require ZERO open inbound firewall ports. Diagram how Principal Propagation translates a cloud JWT token into an on-premise X.509 certificate.',
      learningObjectives: [
        'Configure managed HTTP, RFC, and Mail destinations in the SAP BTP Cockpit.',
        'Explain the security architecture of the SAP Cloud Connector reverse tunnel.',
        'Map virtual hostnames to internal corporate systems to prevent network topology disclosure.',
        'Implement Principal Propagation to execute on-premise ERP transactions under the end-user identity.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The BTP Destination Service: Managed Enterprise Address Book',
          subtitle: 'Never hardcode URLs or passwords in application code',
          explanation:
            'In naive cloud development, developers hardcode connection URLs (`https://erp.mycompany.com/sap/opu/odata/...`) and passwords directly in code or environment variables. This creates severe security risks, breaks when credentials rotate, and requires re-deploying applications to change a server address. The SAP BTP Destination Service acts as a centralized, managed connection directory: 1) Administrators configure named Destinations in the BTP Cockpit (e.g., `S4_PRODUCTION_ERP`). 2) The destination securely stores the target URL, proxy type, authentication credentials, and TLS certificates. 3) Application code simply requests the destination by name (`executeHttpRequest({ destinationName: \'S4_PRODUCTION_ERP\' })`). The platform injects credentials automatically at runtime.',
          keyIdea:
            'The Destination Service decouples connection URLs and passwords from code, allowing credentials to rotate with zero application downtime.',
          taskInstruction: 'Review the destination configuration in the technical example below.',
          hint: 'Destinations can be defined at the Subaccount level (shared) or Service Instance level (private).',
        },
        {
          stepNumber: 2,
          title: 'The SAP Cloud Connector: Zero Inbound Firewall Ports',
          subtitle: 'The gold standard for hybrid enterprise cloud-to-on-premise connectivity',
          explanation:
            'The greatest challenge in enterprise cloud adoption is connecting cloud apps on BTP to core ERP systems sitting inside private on-premise corporate data centers. Corporate network security teams strictly forbid opening inbound firewall ports from the public internet into corporate networks (doing so invites port scans and cyber attacks). The SAP Cloud Connector (SCC) solves this elegantly: 1) SCC is software installed inside the private corporate on-premise network behind the firewall. 2) Upon startup, SCC opens an OUTBOUND TLS tunnel to SAP BTP. 3) Because firewalls allow outbound connections, no inbound firewall ports are opened! 4) BTP sends requests over this existing established reverse tunnel into the on-premise network.',
          keyIdea:
            'The Cloud Connector uses outbound reverse TLS tunnels: corporate network firewalls require ZERO open inbound ports.',
          taskInstruction: 'Trace the reverse tunnel architecture in the interactive cloud-connector-tunnel diagram below.',
          hint: 'This is the number one reason enterprise CISOs approve SAP BTP over generic cloud platforms.',
        },
        {
          stepNumber: 3,
          title: 'Virtual Host Mapping: Hiding Corporate Network Topology',
          subtitle: 'Preventing internal network reconnaissance',
          explanation:
            'To prevent cloud developers and external contractors from knowing internal corporate IP addresses or server hostnames, the Cloud Connector enforces Virtual Mapping: 1) An internal SAP server might be named `s4app01.prod.internal.corp:44300`. 2) The on-premise administrator configures a Virtual Host in SCC: `virtual-s4-erp:443`. 3) In BTP Cockpit destinations, developers configure `URL: http://virtual-s4-erp:443`. 4) When BTP calls this virtual host, SCC intercepts the request, verifies that the specific API path is whitelisted, translates the address to the internal server, and forwards the call.',
          keyIdea:
            'Virtual hostnames hide internal server IPs and ensure only explicitly whitelisted API paths can be reached from the cloud.',
          taskInstruction: 'Understand how virtual hostnames protect internal networks.',
          warning: 'If an API path is not explicitly set to "Accessible" in the Cloud Connector whitelist, requests receive HTTP 403.',
        },
        {
          stepNumber: 4,
          title: 'Principal Propagation: Identity Preservation to On-Premise',
          subtitle: 'Executing on-premise ERP transactions as the real user',
          explanation:
            'In legacy integrations, cloud applications connected to on-premise ERP using a single shared technical user (e.g., `BTP_TECH_USER`). If 1,000 employees used the cloud app to approve purchase orders, the ERP audit log recorded `BTP_TECH_USER` for every transaction, destroying audit trails and bypassing individual employee authorization checks in S/4HANA. Principal Propagation solves this: 1) An employee logs into BTP as Alice. 2) The BTP Destination Service extracts Alice\'s identity from her cloud JWT token. 3) BTP sends the request through the Cloud Connector. 4) The Cloud Connector acts as an internal Certificate Authority (CA): it generates a short-lived X.509 client certificate containing Alice\'s identity. 5) S/4HANA authenticates the certificate and executes the transaction as Alice!',
          keyIdea:
            'Principal Propagation forwards the user\'s identity to on-premise ERP using short-lived X.509 certificates, preserving 100% auditability and ERP role checks.',
          taskInstruction: 'Review the Principal Propagation flow diagram in the concept explanation.',
          hint: 'In S/4HANA transaction ST05, you will see the exact corporate user ID executing the query.',
        },
        {
          stepNumber: 5,
          title: 'Consuming Destinations with the SAP Cloud SDK',
          subtitle: 'The enterprise developer client library',
          explanation:
            'Writing manual Node.js code to query the BTP Destination service, fetch auth tokens, configure HTTP proxies through Cloud Connector, and attach headers takes dozens of lines of code. The SAP Cloud SDK (`@sap-cloud-sdk/connectivity`, `@sap-cloud-sdk/http-client`) automates this into two lines: `import { executeHttpRequest } from \'@sap-cloud-sdk/http-client\'; const response = await executeHttpRequest({ destinationName: \'S4_ERP\' }, { method: \'get\', url: \'/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner\' });`. The SDK automatically fetches destination credentials, configures proxy tunnels, validates certificates, and handles retries.',
          keyIdea:
            'Always use the SAP Cloud SDK to consume destinations; it handles proxy tunneling, certificate management, and token caching automatically.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'The SAP Cloud SDK is available for both JavaScript/TypeScript and Java.',
        },
      ],
      diagramType: 'cloud-connector-tunnel',
      analogy: {
        concept: 'SAP Cloud Connector and Principal Propagation',
        analogy: 'The Secret Service Secure Courier and Temporary Diplomatic Credentials',
        explanation:
          'Imagine a secure Military Command Bunker deep inside a mountain (On-Premise S/4HANA). The bunker has 5-meter thick steel blast doors and zero telephone lines connected to the outside world (air-gapped firewall; zero open inbound ports). To communicate with the President traveling abroad (SAP BTP Cloud), the bunker sends a Trusted Courier out of the mountain to an overseas diplomatic station (establishing an outbound reverse TLS tunnel). When an Ambassador (Alice the employee) sends an urgent treaty approval, the overseas station passes the message down the tunnel to the courier. The courier verifies the Ambassador\'s biometric signature and issues a Temporary Diplomatic Seal (X.509 Certificate) stamped with the Ambassador\'s exact name. The Generals inside the bunker inspect the seal, verify it belongs to the Ambassador, and record their exact name in the permanent military war room ledger.',
        transition:
          'Where the secure courier connects the mountain bunker without opening blast doors, the SAP Cloud Connector connects your on-premise ERP to BTP without opening firewall ports.',
      },
      conceptExplanation: {
        whatItIs:
          'Enterprise Connectivity on SAP BTP comprises the Destination Service, the SAP Cloud Connector, and the SAP Cloud SDK, enabling secure, managed, and audited communication between cloud applications and on-premise or cloud backends.',
        whyItExists:
          'Enterprises cannot migrate multi-billion-dollar on-premise ERP systems to the cloud overnight. Cloud extensions on BTP must connect to existing on-premise databases and business systems securely without exposing corporate internal networks to the public internet.',
        problemSolved:
          'Eliminates hardcoded passwords in application source code, connects cloud-to-on-premise systems with zero open inbound firewall ports, and preserves individual user auditability through Principal Propagation.',
        howItWorks:
          'The Cloud Connector establishes an encrypted outbound TLS tunnel to the BTP subaccount. Administrators define Destinations in BTP Cockpit specifying virtual hosts and proxy type `OnPremise`. Applications call destinations using the SAP Cloud SDK. Traffic routes through the reverse tunnel to on-premise systems with short-lived X.509 certificate authentication.',
        btpFit:
          'Destinations and Cloud Connector are the fundamental integration backbone enabling SAP Clean Core side-by-side extensions.',
      },
      jargonTerms: [
        {
          term: 'Destination Service',
          simpleMeaning: 'A managed cloud address book that stores connection URLs, credentials, and certificates.',
          familiarEquivalent: 'Your smartphone contact book that stores phone numbers so you don\'t have to memorize them.',
        },
        {
          term: 'Cloud Connector',
          simpleMeaning: 'An on-premise software agent that creates a secure outbound reverse tunnel to BTP without opening inbound firewall ports.',
          familiarEquivalent: 'A secure underground private tunnel connecting a bank vault to an airport terminal.',
        },
        {
          term: 'Virtual Host',
          simpleMeaning: 'A fake alias hostname used by cloud apps that the Cloud Connector translates to a real internal IP.',
          familiarEquivalent: 'A postal PO Box address that forwards letters to your confidential home address.',
        },
        {
          term: 'Principal Propagation',
          simpleMeaning: 'Forwarding the logged-in cloud user\'s exact identity into on-premise ERP systems using X.509 certificates.',
          familiarEquivalent: 'Showing a certified photo ID issued by your embassy that a foreign airport accepts as proof of identity.',
        },
      ],
      technicalExample: {
        title: 'BTP Destination Configuration and SAP Cloud SDK Consumption in Node.js',
        language: 'javascript',
        code: `// 1. SAMPLE BTP DESTINATION CONFIGURATION IN COCKPIT
/*
Destination Name: S4_ONPREM_PROCUREMENT
Type: HTTP
URL: http://virtual-s4-erp:44300
ProxyType: OnPremise
Authentication: PrincipalPropagation
CloudConnectorLocationId: Frankfurt-DC
*/

// 2. CONSUMING DESTINATIONS USING SAP CLOUD SDK IN NODE.JS
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';

export async function fetchOnPremisePurchaseOrders(userJwtToken) {
  try {
    // Execute HTTP GET request through Cloud Connector with Principal Propagation
    const response = await executeHttpRequest(
      {
        destinationName: 'S4_ONPREM_PROCUREMENT',
        jwt: userJwtToken // Automatically generates X.509 certificate for this user!
      },
      {
        method: 'get',
        url: '/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder?$top=10',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    console.log(\`Successfully retrieved \${response.data.d.results.length} orders from on-premise ERP.\`);
    return response.data.d.results;

  } catch (error) {
    console.error('Failed to connect to on-premise S/4HANA via Cloud Connector:', error.message);
    throw new Error('On-Premise ERP connection failed: ' + error.message);
  }
}`,
        purpose:
          'Demonstrates professional enterprise integration: defining an OnPremise destination with PrincipalPropagation, and consuming it via the SAP Cloud SDK with automated proxy tunneling and user identity forwarding.',
        lineExplanations: [
          { lines: '5', explanation: 'URL: http://virtual-s4-erp:44300: Uses virtual hostname mapped in Cloud Connector.' },
          { lines: '7', explanation: 'Authentication: PrincipalPropagation: Instructs BTP to forward user identity via X.509 certificates.' },
          { lines: '19', explanation: 'destinationName: Matches Cockpit destination identifier; SDK fetches credentials automatically.' },
          { lines: '20', explanation: 'jwt: userJwtToken: Passes active cloud JWT so Cloud Connector can generate short-lived user certificate.' },
          { lines: '24', explanation: 'url: On-premise OData service path; must be whitelisted in Cloud Connector access control.' },
        ],
        expectedOutput:
          'Live data returned from on-premise S/4HANA with zero open inbound ports; ERP audit log records logged-in cloud user ID.',
        commonMistakes: [
          'Using ProxyType: Internet instead of OnPremise when connecting through Cloud Connector.',
          'Forgetting to pass the user JWT token when PrincipalPropagation is enabled, causing 401 unauthenticated errors.',
          'Not whitelisting the exact OData API path in the Cloud Connector Access Control panel.',
        ],
      },
      businessScenario: {
        title: 'Global Manufacturing Hybrid Plant Floor Maintenance Portal',
        context:
          'An industrial steel mill operates an on-premise SAP S/4HANA core in a private data center and needs a modern BTP mobile app for 2,000 factory maintenance technicians.',
        workflowSteps: [
          'IT team installs SAP Cloud Connector in factory data center; connects outbound to BTP subaccount.',
          'Configures destination `S4_MAINTENANCE` with Principal Propagation and maps virtual host `virtual-s4-plant`.',
          'Field technician logs into mobile app on BTP using corporate single sign-on.',
          'Technician scans broken machine motor barcode: app queries on-premise maintenance work orders via SAP Cloud SDK.',
          'S/4HANA authenticates technician via X.509 certificate and checks their specific plant maintenance security roles.',
          'Technician updates motor status to "Repaired": S/4HANA records the repair with technician\'s exact employee ID.',
        ],
        businessImpact:
          'Enables modern mobile cloud workflows with zero firewall vulnerabilities and 100% compliance with OSHA safety audit trails.',
      },
      practicalActivity:
        'Launch Practice Drill "Debugging Destination Connectivity" (/practice?tab=drills&id=debug-destination-connectivity) to test your integration troubleshooting skills.',
      keyTakeaways: [
        'The Destination Service decouples connection URLs and passwords from code.',
        'The SAP Cloud Connector creates an outbound reverse TLS tunnel: ZERO open inbound firewall ports required.',
        'Principal Propagation forwards cloud user identity into on-premise ERP using short-lived X.509 certificates.',
        'Use the SAP Cloud SDK (@sap-cloud-sdk/http-client) to consume destinations cleanly in Node.js.',
      ],
      quizQuestions: [
        {
          id: 'mod-5-3-q1',
          question:
            'Why do enterprise corporate network security teams approve the SAP Cloud Connector for connecting cloud apps on BTP to private on-premise ERP systems?',
          options: [
            {
              id: 'a',
              text: 'Because the Cloud Connector initiates an OUTBOUND reverse TLS tunnel from inside the corporate network to SAP BTP, requiring ZERO open inbound firewall ports from the public internet.',
              isCorrect: true,
              explanation:
                'Correct. Outbound connections are permitted by corporate firewalls; closing all inbound ports protects the internal network from external attacks.',
            },
            {
              id: 'b',
              text: 'Because the Cloud Connector completely turns off all corporate firewalls.',
              isCorrect: false,
              explanation:
                'Incorrect. Cloud Connector works within strict enterprise firewall rules.',
            },
            {
              id: 'c',
              text: 'Because it only transfers data between 2 AM and 3 AM.',
              isCorrect: false,
              explanation:
                'Incorrect. Cloud Connector provides continuous real-time connectivity.',
            },
            {
              id: 'd',
              text: 'Because the Cloud Connector is physically installed inside the computer keyboard.',
              isCorrect: false,
              explanation:
                'Incorrect. Cloud Connector is enterprise server software.',
            },
          ],
        },
        {
          id: 'mod-5-3-q2',
          question:
            'What is the primary operational advantage of "Principal Propagation" over using a single generic technical user account (e.g. "BTP_USER") when connecting to on-premise SAP S/4HANA?',
          options: [
            {
              id: 'a',
              text: 'Principal Propagation translates the logged-in cloud user identity into a short-lived X.509 certificate, ensuring transactions in S/4HANA execute under the real human user identity, preserving 100% auditability and ERP role checks.',
              isCorrect: true,
              explanation:
                'Correct. Principal Propagation ensures that S/4HANA knows exactly which human user executed the transaction.',
            },
            {
              id: 'b',
              text: 'It eliminates the need for any internet connection.',
              isCorrect: false,
              explanation:
                'Incorrect. Cloud-to-on-premise communication requires network connectivity.',
            },
            {
              id: 'c',
              text: 'It makes database queries run 500 times faster by skipping database indexes.',
              isCorrect: false,
              explanation:
                'Incorrect. Principal Propagation is an authentication mechanism, not a database index optimizer.',
            },
            {
              id: 'd',
              text: 'It automatically approves all financial transactions without manager review.',
              isCorrect: false,
              explanation:
                'Incorrect. S/4HANA still enforces all standard role checks on the propagated user.',
            },
          ],
        },
        {
          id: 'mod-5-3-q3',
          question:
            'What happens if an application on SAP BTP attempts to call an on-premise API URL path that has NOT been added to the "Access Control" whitelist in the SAP Cloud Connector?',
          options: [
            {
              id: 'a',
              text: 'The Cloud Connector blocks the request immediately and returns an HTTP 403 Forbidden error, preventing unauthorized network traversal.',
              isCorrect: true,
              explanation:
                'Correct. Cloud Connector strictly enforces an explicit path whitelist; unlisted URL paths are rejected with HTTP 403.',
            },
            {
              id: 'b',
              text: 'The Cloud Connector reformats the hard drive of the on-premise server.',
              isCorrect: false,
              explanation:
                'Incorrect. Cloud Connector acts as a protective proxy; it does not harm hardware.',
            },
            {
              id: 'c',
              text: 'The request is redirected to Google.com.',
              isCorrect: false,
              explanation:
                'Incorrect. The request is rejected with HTTP 403.',
            },
            {
              id: 'd',
              text: 'The request succeeds anyway because whitelisting is completely optional.',
              isCorrect: false,
              explanation:
                'Incorrect. Whitelisting is strictly mandatory in Cloud Connector.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-5-4',
      code: '5.4',
      phaseId: 'phase-5',
      title: 'Secure Development',
      tagline: 'OWASP Top 10, Injection Prevention, Secrets Management, and Audit Logging',
      summary:
        'Master defense-in-depth secure coding practices for SAP BTP. Learn how to defend against the OWASP Top 10 vulnerabilities, prevent SQL/CQL injection and Cross-Site Scripting (XSS), implement secure secret rotation, and integrate regulatory compliance audit logging.',
      estimatedMinutes: 35,
      level: 'Intermediate',
      subtopics: [
        'The OWASP Top 10 for enterprise cloud applications: Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Security Misconfiguration.',
        'Injection prevention in SAP CAP: How Core Data Services (CDS) and CQL parameterized queries prevent SQL/CQL injection automatically.',
        'Cross-Site Scripting (XSS) defense: Automated output encoding in SAPUI5/Fiori and sanitizing user inputs.',
        'State-changing attack mitigation: Enforcing `X-CSRF-Token` handshakes across all POST/PUT/PATCH/DELETE endpoints.',
        'Secrets and credential hygiene: Zero hardcoded secrets, rotating credentials, using BTP Credential Store, and automated static code scanning (SonarQube/GitGuardian).',
        'Regulatory Compliance Audit Logging: Integrating the SAP Audit Log Service (`@sap/audit-logging`) for GDPR, HIPAA, and SOX audit trails.',
      ],
      practicalImplementation:
        'Audit a vulnerable Node.js microservice: identify an intentional CQL injection vulnerability caused by string concatenation, refactor it into a parameterized CQL query, and add enterprise audit logging using `@sap/audit-logging`.',
      masteryCheck:
        'Explain why string concatenation in database queries (`SELECT.from(T).where("ID = " + input)`) causes severe injection vulnerabilities. Write the parameterized equivalent and explain how parameterized queries separate executable code from user data.',
      learningObjectives: [
        'Identify and remediate the most common OWASP Top 10 enterprise cloud vulnerabilities.',
        'Write parameterized database queries in CAP to eliminate SQL/CQL injection risks.',
        'Explain how SAPUI5 prevents Cross-Site Scripting (XSS) through automated output encoding.',
        'Integrate the SAP Audit Log Service for sensitive personal data access tracking.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The OWASP Top 10 in Enterprise Cloud Architecture',
          subtitle: 'The standard playbook of web application vulnerabilities',
          explanation:
            'The Open Worldwide Application Security Project (OWASP) publishes the authoritative Top 10 security risks: 1) Broken Access Control: Failing to enforce scopes and tenant isolation. 2) Cryptographic Failures: Storing passwords in plain text or using weak hashing algorithms. 3) Injection (SQL/CQL/Command): Blending untrusted user input directly into executable query strings. 4) Security Misconfiguration: Leaving default admin accounts active or exposing verbose stack traces in production. 5) Vulnerable Components: Using outdated npm packages with known CVE vulnerabilities.',
          keyIdea:
            'Enterprise security is defense-in-depth: every layer (gateway, approuter, backend code, database) must enforce independent security controls.',
          taskInstruction: 'Review the OWASP vulnerabilities and their BTP mitigations in the concept explanation.',
          hint: 'Broken Access Control is currently the #1 most common security defect worldwide.',
        },
        {
          stepNumber: 2,
          title: 'Eliminating SQL and CQL Injection via Parameterization',
          subtitle: 'Why string concatenation in queries is strictly prohibited',
          explanation:
            'SQL/CQL injection occurs when an application concatenates untrusted user input directly into a database query string: `SELECT.from(Users).where("username = \'" + userInput + "\'")`. If an attacker enters `\' OR 1=1 --`, the query evaluates to `WHERE username = \'\' OR 1=1`, returning every user in the database and bypassing authentication! The solution is Parameterized Queries: `SELECT.from(Users).where({ username: userInput })` or using placeholders `WHERE username = ?`. Parameterization passes the user input separately from the SQL command structure: the database engine treats input strictly as literal data, making query structure alteration impossible.',
          keyIdea:
            'Never concatenate variables into query strings; always use object-based parameters (`where({ id })`) or placeholders (`?`).',
          taskInstruction: 'Compare the vulnerable vs secure code examples below.',
          warning: 'A single SQL injection vulnerability can expose an entire corporate SAP HANA database to public exfiltration.',
        },
        {
          stepNumber: 3,
          title: 'Cross-Site Scripting (XSS) Prevention',
          subtitle: 'Stopping malicious script execution in enterprise browsers',
          explanation:
            'Cross-Site Scripting (XSS) occurs when malicious JavaScript entered by an attacker (e.g., `<script>stealTokens()</script>`) is saved in a database and later rendered unencoded on another user\'s screen. SAPUI5 and Fiori Elements protect against XSS automatically: 1) Automated Context-Aware Output Encoding: When UI5 binds data into controls (`<Text text="{comments}" />`), it automatically encodes HTML special characters (`<` becomes `&lt;`, `>` becomes `&gt;`). The browser renders the text literally and refuses to execute it as code. 2) Content Security Policy (CSP): HTTP headers instructing the browser to reject inline script execution.',
          keyIdea:
            'SAPUI5 encodes output by default; never bypass this by writing raw `innerHTML` or `dangerouslySetInnerHTML`.',
          taskInstruction: 'Understand how UI5 data binding sanitizes user input automatically.',
          hint: 'Always configure Content Security Policy (CSP) headers in your Approuter.',
        },
        {
          stepNumber: 4,
          title: 'Secrets Management: BTP Credential Store',
          subtitle: 'Eliminating cleartext passwords and keys forever',
          explanation:
            'Hardcoding API keys, private certificates, or database passwords in source code or `.env` files is a major enterprise violation. SAP BTP provides the SAP Credential Store service: 1) A centralized, HSM-backed encrypted repository for keys, passwords, and certificates. 2) Microservices retrieve secrets dynamically at runtime using secure REST APIs with automated caching. 3) Credentials can be rotated automatically every 90 days without re-deploying or restarting application containers.',
          keyIdea:
            'Store secrets in the BTP Credential Store or Destination service, never in Git repositories or source files.',
          taskInstruction: 'Review secrets hygiene best practices in the code example.',
          warning: 'Run automated scanners like GitGuardian in your CI/CD pipeline to reject commits containing API tokens.',
        },
        {
          stepNumber: 5,
          title: 'Regulatory Compliance: The SAP Audit Log Service',
          subtitle: 'Tracking access to sensitive personal and financial data',
          explanation:
            'Under regulations like GDPR, HIPAA, and SOX, enterprises are legally required to prove who accessed sensitive personal data (e.g., patient health records, employee salaries, bank details). Standard application logs (`console.log`) are insufficient because they can be deleted or altered by administrators. The SAP Audit Log Service (`@sap/audit-logging`) provides a tamper-proof, append-only compliance audit trail: 1) Logs Data Access events (read access to sensitive fields). 2) Logs Data Modification events (changes to master data). 3) Logs Security events (login attempts, failed authorizations). Audit logs are stored in encrypted, immutable storage and retained for statutory compliance periods (typically 7 to 10 years).',
          keyIdea:
            'The SAP Audit Log Service provides tamper-proof, append-only logs for legal regulatory compliance.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'CAP provides automated audit logging plugins that hook directly into entity definitions.',
        },
      ],
      diagramType: 'http-troubleshooting',
      analogy: {
        concept: 'Secure Coding and Injection Prevention',
        analogy: 'The Bank Teller Pneumatic Capsule vs The Unchecked Open Mailbox',
        explanation:
          'SQL injection is like sending a letter to an automated bank processing department. 1) Vulnerable String Concatenation: You write a check payable to "Alice" on a postcard. In the memo line, you add: "...AND TRANSFER $1,000,000 TO MY ACME ACCOUNT". If the bank clerk mechanically reads the entire sentence and obeys every command without separating instructions from names, the bank executes the theft. 2) Parameterized Queries: The bank uses a pneumatic steel capsule with separate locked compartments: Compartment 1 holds the pre-printed, immutable legal contract ("Transfer funds to payee"); Compartment 2 holds only a photograph of the recipient. No matter what words you write on the photograph, the bank machine only looks at the photo and obeys the pre-printed contract in Compartment 1.',
        transition:
          'Where the separated capsule prevents fraud, parameterized queries prevent user input from ever being executed as database commands.',
      },
      conceptExplanation: {
        whatItIs:
          'Secure Development in SAP BTP is the systematic discipline of designing, coding, testing, and operating cloud applications according to enterprise security standards—preventing OWASP Top 10 vulnerabilities, protecting credentials, and ensuring regulatory compliance.',
        whyItExists:
          'A single security vulnerability can result in catastrophic ransomware infections, multi-million-euro GDPR regulatory penalties, customer data theft, and irreversible corporate brand damage.',
        problemSolved:
          'Eliminates SQL/CQL injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF); prevents secret leakage; and provides tamper-proof audit trails for statutory auditing.',
        howItWorks:
          'Developers use parameterized CQL queries in CAP, leverage automated HTML encoding in SAPUI5, enforce X-CSRF-Token handshakes in Approuter, store secrets in BTP Credential Store, and log access to sensitive data via the SAP Audit Log Service.',
        btpFit:
          'Secure development principles are mandatory for all production applications deployed on SAP BTP.',
      },
      jargonTerms: [
        {
          term: 'SQL / CQL Injection',
          simpleMeaning: 'A cyberattack where malicious SQL commands are injected into input fields to manipulate the database.',
          familiarEquivalent: 'Adding "and give me all the money in the vault" onto the end of a bank deposit slip.',
        },
        {
          term: 'Parameterized Query',
          simpleMeaning: 'A query where user input is passed as separate literal values rather than concatenated into the SQL command.',
          familiarEquivalent: 'Putting ingredients into separate sealed measuring cups rather than dumping everything in blindly.',
        },
        {
          term: 'Cross-Site Scripting (XSS)',
          simpleMeaning: 'An attack where malicious JavaScript is injected into a website and executed in other users\' browsers.',
          familiarEquivalent: 'Slipping a fake instruction flyer into a company handbook that tricks employees into giving up their keys.',
        },
        {
          term: 'Audit Log Service',
          simpleMeaning: 'An SAP BTP service that records tamper-proof logs of who accessed or modified sensitive data.',
          familiarEquivalent: 'A secure black-box flight recorder on an airplane that cannot be erased.',
        },
      ],
      technicalExample: {
        title: 'Vulnerable vs Secure Parameterized Queries and Audit Logging in CAP',
        language: 'javascript',
        code: `// 1. INSECURE ANTI-PATTERN (VULNERABLE TO CQL INJECTION - DO NOT USE!)
/*
export async function getInsecureUser(req) {
  const userInput = req.data.username;
  // DANGER! String concatenation allows injection (e.g. ' OR 1=1 --)
  return cds.run(\`SELECT * FROM Users WHERE username = '\${userInput}'\`);
}
*/

// 2. SECURE PRODUCTION IMPLEMENTATION (PARAMETERIZED QUERY + AUDIT LOG)
import cds from '@sap/cds';

export class UserService extends cds.ApplicationService {
  async init() {
    const { Users, SensitiveFinancials } = this.entities;

    // Secure Parameterized Query (100% Injection Proof!)
    this.on('getUserProfile', async (req) => {
      const { username } = req.data;

      // Clean parameterized object syntax
      const user = await SELECT.one.from(Users).where({ username: username });
      if (!user) return req.reject(404, 'User not found');

      return user;
    });

    // Sensitive Data Access with Mandatory Audit Logging (GDPR / SOX)
    this.after('READ', 'SensitiveFinancials', async (records, req) => {
      // Connect to SAP BTP Audit Log Service
      const auditLog = await cds.connect.to('audit-log');

      await auditLog.emit('dataAccess', {
        user: req.user.id,
        tenant: req.user.tenant,
        object: {
          type: 'EmployeeSalaryRecord',
          id: { key: records[0]?.ID || 'BATCH_READ' }
        },
        attributes: ['baseSalary', 'bonusAmount'],
        action: 'READ'
      });

      console.log(\`[Audit Compliance] Logged data read on sensitive financial records by '\${req.user.id}'.\`);
    });

    await super.init();
  }
}`,
        purpose:
          'Demonstrates the difference between dangerous string concatenation and secure parameterized CQL queries, alongside automated compliance audit logging using the SAP Audit Log service.',
        lineExplanations: [
          { lines: '5', explanation: 'Vulnerable snippet: String interpolation allows attackers to break out of SQL quotes and alter query logic.' },
          { lines: '19', explanation: 'Secure Parameterized Query: SELECT.from(Users).where({ username }) passes data as bound parameters.' },
          { lines: '26', explanation: 'Sensitive Data Interception: Executes audit logging whenever salary or financial data is accessed.' },
          { lines: '28', explanation: 'audit-log connection: Communicates with tamper-proof BTP Audit Log Service.' },
        ],
        expectedOutput:
          'Zero injection vulnerabilities; all sensitive employee financial queries are permanently logged for GDPR compliance.',
        commonMistakes: [
          'Using raw string concatenation in SQL queries (e.g., `WHERE id = ${id}`).',
          'Logging passwords or credit card numbers in standard application logs (console.log).',
        ],
      },
      businessScenario: {
        title: 'Banking Application Penetration Testing Remediation',
        context:
          'A third-party ethical cybersecurity firm conducts an annual penetration test on a BTP customer loan application before launch.',
        workflowSteps: [
          'Security researchers attempt SQL injection by injecting malicious payloads into loan search fields.',
          'CAP parameterized CQL queries evaluate inputs as literal strings, neutralizing 100% of injection attempts.',
          'Researchers attempt Cross-Site Scripting (XSS) by submitting `<script>` tags in loan comments.',
          'SAPUI5 output encoding neutralizes script tags into harmless `&lt;script&gt;` text.',
          'Application passes external penetration test with zero high-severity findings and launches to 2,000,000 banking customers.',
        ],
        businessImpact:
          'Prevents potential €20M regulatory GDPR fines and protects millions of customer financial records from exfiltration.',
      },
      practicalActivity:
        'Audit your CAP services: verify that every `SELECT` query uses object parameters (`.where({ ... })`) and zero string concatenation.',
      keyTakeaways: [
        'Never concatenate user input into SQL/CQL queries; always use parameterized queries.',
        'SAPUI5 automatically prevents XSS through context-aware output encoding.',
        'Never store cleartext secrets in source code or Git; use the BTP Credential Store.',
        'Use the SAP Audit Log Service to maintain tamper-proof audit trails for sensitive data access.',
      ],
      quizQuestions: [
        {
          id: 'mod-5-4-q1',
          question:
            'Why does the query "SELECT.from(Users).where({ username: userInput })" protect against SQL/CQL injection, whereas "SELECT * FROM Users WHERE username = \'" + userInput + "\'" is vulnerable?',
          options: [
            {
              id: 'a',
              text: 'Because parameterized queries pass user input as separate literal data values to the database engine, preventing user characters (like quotes or semicolons) from altering the executable SQL query structure.',
              isCorrect: true,
              explanation:
                'Correct. Parameterization completely separates the executable SQL command from the data parameters.',
            },
            {
              id: 'b',
              text: 'Because parameterized queries automatically delete the user account if an injection is attempted.',
              isCorrect: false,
              explanation:
                'Incorrect. Parameterization renders input harmless as plain data; it does not delete accounts.',
            },
            {
              id: 'c',
              text: 'Because parameterized queries run only on computers located in Switzerland.',
              isCorrect: false,
              explanation:
                'Incorrect. Parameterized queries operate across all database engines globally.',
            },
            {
              id: 'd',
              text: 'Because string concatenation is faster than parameterization.',
              isCorrect: false,
              explanation:
                'Incorrect. String concatenation is insecure and offers no performance advantage.',
            },
          ],
        },
        {
          id: 'mod-5-4-q2',
          question:
            'How does SAPUI5 protect web applications against Cross-Site Scripting (XSS) attacks by default?',
          options: [
            {
              id: 'a',
              text: 'Through automated context-aware output encoding: when binding data into UI controls, special characters like "<" and ">" are automatically converted into safe HTML entities ("&lt;" and "&gt;"), preventing browser script execution.',
              isCorrect: true,
              explanation:
                'Correct. Context-aware output encoding ensures user text is rendered as literal characters, not executable code.',
            },
            {
              id: 'b',
              text: 'By shutting down the user internet router if a script is detected.',
              isCorrect: false,
              explanation:
                'Incorrect. UI5 sanitizes browser DOM rendering safely.',
            },
            {
              id: 'c',
              text: 'By requiring all users to wear computer glasses.',
              isCorrect: false,
              explanation:
                'Incorrect. Glasses have zero impact on software security.',
            },
            {
              id: 'd',
              text: 'SAPUI5 does not protect against XSS and requires external antivirus software.',
              isCorrect: false,
              explanation:
                'Incorrect. SAPUI5 has built-in enterprise-grade XSS protection out-of-the-box.',
            },
          ],
        },
        {
          id: 'mod-5-4-q3',
          question:
            'What is the purpose of the SAP Audit Log Service in an enterprise cloud application?',
          options: [
            {
              id: 'a',
              text: 'To record immutable, tamper-proof audit trails tracking who accessed or modified sensitive personal, financial, or security data to satisfy regulatory compliance laws (GDPR, HIPAA, SOX).',
              isCorrect: true,
              explanation:
                'Correct. Audit Log Service provides encrypted, append-only logs for statutory compliance auditing.',
            },
            {
              id: 'b',
              text: 'To print daily news articles on the office printer.',
              isCorrect: false,
              explanation:
                'Incorrect. Audit logging is security compliance technology.',
            },
            {
              id: 'c',
              text: 'To measure how fast employees type on their keyboards.',
              isCorrect: false,
              explanation:
                'Incorrect. It records data access events, not typing speed.',
            },
            {
              id: 'd',
              text: 'To replace the SAP HANA database completely.',
              isCorrect: false,
              explanation:
                'Incorrect. Audit Log Service is a specialized compliance logging service, not a business database.',
            },
          ],
        },
      ],
    },
  ],
};
