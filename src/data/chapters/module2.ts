import { Chapter } from '../../types/curriculum';

export const MODULE_2_CHAPTERS: Chapter[] = [
  {
    id: 'ch-2-1',
    moduleId: 'module-2',
    order: 1,
    number: '2.1',
    title: 'The SAP Fiori Experience & Horizon Philosophy',
    subtitle: 'Enterprise UX designed for delight, high contrast and WCAG accessibility',
    estimatedMinutes: 8,
    summary:
      'Learn what SAP Fiori is, explore the 5 core design pillars, discover the modern SAP Horizon design system (Morning and Evening Horizon), and understand why consistency matters in mission-critical operations.',
    learningObjectives: [
      'Define SAP Fiori and contrast it with legacy SAP GUI screens.',
      'Explain the 5 core design pillars of SAP Fiori.',
      'Understand the SAP Horizon theme family and WCAG 2.2 AA accessibility requirements.',
    ],
    analogy: {
      concept: 'Fiori Design Consistency',
      analogy: 'Standardized Commercial Airplane Cockpits',
      explanation:
        'Commercial airline pilots can transition between Boeing and Airbus aircraft because altitude meters, airspeed gauges, and throttles operate using consistent universal conventions. Legacy enterprise software was chaotic: every developer used different fonts, colors, button placements, and shortcut keys. Fiori standardizes the entire enterprise UI cockpit so workers never need 20 hours of training to use a new business screen.',
      transition:
        'Fiori is not a single library; it is SAP’s master design system guiding every web, tablet, and mobile interface across the enterprise portfolio.',
    },
    conceptExplanation: {
      whatItIs:
        'SAP Fiori is the design system and user experience (UX) paradigm for SAP software. The SAP Horizon theme is the latest visual generation, featuring rounded geometry, generous whitespace, accessible contrast, and distinct light and dark palettes.',
      whyItExists:
        'Legacy enterprise software was notorious for dense, intimidating screens with 80 input fields and cryptic transaction codes (like `VA01` or `ME21N`). Fiori breaks work down into role-based, intuitive tasks.',
      problemSolved:
        'Drastically reduces human data entry error, eliminates expensive employee training programs, and guarantees accessibility compliance.',
      howItWorks:
        'Fiori applications decompose complex ERP processes into focused apps: a warehouse worker sees an app optimized for barcode scanners; a CFO sees an app optimized for interactive KPI executive dashboards.',
      btpFit:
        'Frontends built on SAP BTP use Fiori design principles so custom applications look and behave identically to standard SAP cloud products.',
    },
    diagramType: 'fiori-horizon',
    jargonTerms: [
      {
        term: 'SAP Fiori',
        simpleMeaning: 'The official design system, guidelines, and visual look-and-feel of SAP.',
        familiarEquivalent: 'Apple Human Interface Guidelines or Google Material Design for enterprise software.',
      },
      {
        term: 'SAP Horizon',
        simpleMeaning: 'The latest modern visual theme (Morning Horizon light mode, Evening Horizon dark mode).',
        familiarEquivalent: 'A clean, modern Tailwind-style UI theme with rounded corners and high accessibility contrast.',
      },
      {
        term: 'Role-Based UX',
        simpleMeaning: 'Each screen only shows the data and buttons needed for that specific employee’s job.',
        familiarEquivalent: 'Netflix showing child-safe UI for children and full controls for account owners.',
      },
    ],
    technicalExample: {
      title: 'Configuring SAP Horizon Theme in a Web Application',
      language: 'css',
      code: `/* Applying SAP Horizon Design Tokens in CSS */
:root {
  /* Morning Horizon (Light Mode Tokens) */
  --sapHorizonBrandColor: #0070F2;      /* Primary Action Blue */
  --sapHorizonBackgroundColor: #F5F6F7; /* Clean Soft Canvas */
  --sapHorizonCardBackground: #FFFFFF;  /* High-Contrast Card Surface */
  --sapHorizonTextColor: #1D2D3E;       /* WCAG 2.2 AA Compliant Text */
  --sapHorizonBorderRadius: 0.75rem;     /* Modern Rounded Geometry (12px) */
}

.dark {
  /* Evening Horizon (Dark Mode Tokens) */
  --sapHorizonBackgroundColor: #12171C; /* Deep Slate Base */
  --sapHorizonCardBackground: #1D232A;  /* Elevated Card Layer */
  --sapHorizonTextColor: #F5F6F7;       /* Crisp Accessible Light Text */
}`,
      purpose:
        'Demonstrates how SAP Horizon design tokens enforce consistent color contrast, surface elevation, and typography across light and dark modes.',
      lineExplanations: [
        { lines: '4', explanation: 'Brand color `#0070F2` provides high-contrast interactive focus indicators.' },
        { lines: '7', explanation: 'Text color `#1D2D3E` achieves WCAG AA 4.5:1 minimum contrast against light background.' },
        { lines: '8', explanation: 'Rounded 12px corners represent the signature Horizon geometry.' },
      ],
      expectedOutput:
        'Web application surfaces render with polished enterprise aesthetics, instant dark mode switching, and accessible contrast.',
      commonMistakes: [
        'Over-styling with neon colors and unreadable light-gray text on white backgrounds.',
        'Ignoring keyboard focus outlines (`focus-visible`), which breaks accessibility for screen-reader and keyboard users.',
      ],
    },
    businessScenario: {
      title: 'Warehouse Mobile Receiving Efficiency',
      context:
        'A shipping dock receives 400 pallets of goods every hour. Workers use handheld barcode scanners in bright daylight and dark storage bays.',
      workflowSteps: [
        'Worker opens the Fiori Goods Receipt app on a ruggedized Android scanner.',
        'Role-based UI shows only 2 huge buttons: "Scan Pallet" and "Confirm Quantity".',
        'High-contrast Horizon theme ensures scan numbers are legible under glaring sunlight and dim warehouse aisles.',
      ],
      businessImpact:
        'Scannable error rate drops from 8% to under 0.1%, accelerating dock-to-shelf inventory turnaround by 45 minutes per truck.',
    },
    quizQuestions: [
      {
        id: 'q-2-1-1',
        question: 'Which of the following is NOT one of the 5 core design pillars of SAP Fiori?',
        options: [
          {
            id: 'opt-a',
            text: 'Role-Based',
            isCorrect: false,
            explanation: 'Role-based is a foundational pillar: tailoring each app to a specific job role.',
          },
          {
            id: 'opt-b',
            text: 'Overwhelming and Dense',
            isCorrect: true,
            explanation: 'Correct! Fiori strictly rejects overwhelming, dense screens; it champions "Simple" and "Coherent" design.',
          },
          {
            id: 'opt-c',
            text: 'Adaptive',
            isCorrect: false,
            explanation: 'Adaptive is a core pillar: working seamlessly across mobile, tablet, and desktop.',
          },
          {
            id: 'opt-d',
            text: 'Coherent',
            isCorrect: false,
            explanation: 'Coherent is a core pillar: ensuring identical design patterns across all applications.',
          },
        ],
      },
      {
        id: 'q-2-1-2',
        question: 'What is "Evening Horizon" in the SAP design system?',
        options: [
          {
            id: 'opt-a',
            text: 'A scheduled downtime when servers turn off for the night.',
            isCorrect: false,
            explanation: 'Evening Horizon is a visual design theme, not server downtime.',
          },
          {
            id: 'opt-b',
            text: 'The official dark-mode color theme of the SAP Horizon design system.',
            isCorrect: true,
            explanation: 'Correct! Evening Horizon provides accessible, high-contrast dark mode aesthetics.',
          },
          {
            id: 'opt-c',
            text: 'A flight simulator application built for pilots.',
            isCorrect: false,
            explanation: 'Horizon is a design system theme, not a flight simulator.',
          },
          {
            id: 'opt-d',
            text: 'A database query language.',
            isCorrect: false,
            explanation: 'Database query languages are SQL and CQL, not Horizon.',
          },
        ],
      },
      {
        id: 'q-2-1-3',
        question: 'Why does enterprise software place such strict emphasis on WCAG 2.2 AA accessibility?',
        options: [
          {
            id: 'opt-a',
            text: 'Because government contracts and corporate regulations legally require equal access for all employees, including those with visual or motor impairments.',
            isCorrect: true,
            explanation: 'Correct! Accessibility is legally mandated in enterprise environments to ensure all workers can perform their jobs.',
          },
          {
            id: 'opt-b',
            text: 'Because accessible websites use less electricity.',
            isCorrect: false,
            explanation: 'Accessibility is about human usability and legal compliance, not electrical power consumption.',
          },
          {
            id: 'opt-c',
            text: 'To prevent users from using dark mode.',
            isCorrect: false,
            explanation: 'Accessibility requires supporting high-contrast modes, including dark mode.',
          },
          {
            id: 'opt-d',
            text: 'Accessibility only applies to smartphone gaming apps.',
            isCorrect: false,
            explanation: 'Accessibility applies to all enterprise software.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'SAP Fiori replaces dense transaction screens with role-based, intuitive tasks.',
      'The 5 Fiori pillars: Role-Based, Adaptive, Simple, Coherent, and Delightful.',
      'The SAP Horizon theme balances modern aesthetics with WCAG AA accessibility compliance.',
    ],
    practicalActivity:
      'Inspect an enterprise screen and identify 3 elements that violate the "Simple" or "Coherent" design principles.',
  },
  {
    id: 'ch-2-2',
    moduleId: 'module-2',
    order: 2,
    number: '2.2',
    title: 'Metadata-Driven Apps with Fiori Elements',
    subtitle: 'Generating complete interactive UIs directly from CDS annotations',
    estimatedMinutes: 9,
    summary:
      'Discover Fiori Elements: the metadata-driven framework where CDS UI annotations (`@UI.LineItem`, `@UI.SelectionField`, `@UI.HeaderInfo`) automatically generate List Reports and Object Pages without writing HTML or CSS.',
    learningObjectives: [
      'Understand the architecture of metadata-driven user interfaces.',
      'Contrast Fiori Elements with manual custom frontend development.',
      'Declare CDS UI annotations to generate search fields, tables, and detail pages.',
    ],
    analogy: {
      concept: 'Metadata-Driven UI',
      analogy: 'Smart Form Generators vs Hand-Coded HTML',
      explanation:
        'If you use a smart form builder (like Google Forms), you don’t write HTML `<input>` tags, CSS grids, or validation scripts. You simply declare: "Question 1 is a Date, Question 2 is Multiple Choice, Question 3 is Required". The engine generates the entire interactive, responsive interface. Fiori Elements does this for enterprise software: you annotate your CDS backend with `@UI` labels, and Fiori automatically renders search bars, interactive tables, sorting, and detail views.',
      transition:
        'In enterprise development, 80% of apps are standard List-and-Detail screens. Fiori Elements lets developers ship them in hours without writing single lines of custom frontend JavaScript.',
    },
    conceptExplanation: {
      whatItIs:
        'SAP Fiori Elements provides pre-built, standardized page templates (List Report, Object Page, Analytical Dashboard, Worklist) that read OData v4 annotations and generate responsive web interfaces at runtime.',
      whyItExists:
        'Writing repetitive React or HTML tables for 500 different enterprise entities (customers, suppliers, products, invoices) takes months of manual frontend work that breaks whenever backend schemas change.',
      problemSolved:
        'Cuts frontend development time by up to 80% and guarantees 100% adherence to Fiori design and accessibility standards.',
      howItWorks:
        'Developers attach `@UI` annotations to their CDS service models. The Fiori Elements runtime reads the `$metadata` and annotation XML files and instantiates ready-to-use UI controls automatically.',
      btpFit:
        'Fiori Elements is the default, recommended frontend pattern for SAP CAP applications deployed on SAP BTP.',
    },
    diagramType: 'fiori-elements-annotations',
    jargonTerms: [
      {
        term: 'Fiori Elements',
        simpleMeaning: 'Pre-fabricated enterprise UI templates driven entirely by backend metadata.',
        familiarEquivalent: 'An automated Admin dashboard generator like Django Admin or React Admin.',
      },
      {
        term: '@UI.LineItem',
        simpleMeaning: 'A CDS annotation that specifies which columns appear in the main data table.',
        familiarEquivalent: 'Defining `columns = [{ field: "name" }, { field: "price" }]` in a data grid.',
      },
      {
        term: '@UI.SelectionField',
        simpleMeaning: 'A CDS annotation that puts a search/filter input into the top filter bar.',
        familiarEquivalent: 'Adding a search dropdown filter above a table.',
      },
    ],
    technicalExample: {
      title: 'Annotating a CDS Service for Fiori Elements (`srv/annotations.cds`)',
      language: 'cds',
      code: `using { LeaveService } from './leave-service';

annotate LeaveService.LeaveRequests with @(
  // 1. Header Information for the Detail Object Page
  UI.HeaderInfo: {
    TypeName: 'Leave Request',
    TypeNamePlural: 'Leave Requests',
    Title: { Value: employee.name },
    Description: { Value: reason }
  },

  // 2. Search Filter Bar fields
  UI.SelectionFields: [
    status,
    startDate
  ],

  // 3. Main List Report Table Columns
  UI.LineItem: [
    { $Type: 'UI.DataField', Value: employee.name,   Label: 'Employee' },
    { $Type: 'UI.DataField', Value: startDate,       Label: 'Start Date' },
    { $Type: 'UI.DataField', Value: endDate,         Label: 'End Date' },
    { $Type: 'UI.DataField', Value: daysCount,       Label: 'Days Requested' },
    { $Type: 'UI.DataField', Value: status,          Label: 'Status' }
  ]
);`,
      purpose:
        'Demonstrates how pure declarative annotations configure the filter bar, table columns, and page titles of a production-grade Fiori Elements application.',
      lineExplanations: [
        { lines: '5-10', explanation: 'Configures the header title and description displayed when opening an item.' },
        { lines: '13-16', explanation: 'Automatically creates search filter inputs for `status` and `startDate` above the table.' },
        { lines: '19-25', explanation: 'Renders an interactive, sortable, paginated table with these exact 5 columns.' },
      ],
      expectedOutput:
        'Generates a fully functional responsive web app with search, filtering, table sorting, export to Excel, and detail drill-down.',
      commonMistakes: [
        'Attempting to manually code an HTML table in React when standard Fiori Elements can generate it from CDS in 5 minutes.',
        'Spelling annotation property names incorrectly (e.g. `UI.LineItems` instead of `UI.LineItem`).',
      ],
    },
    businessScenario: {
      title: 'Rapid Deployment of Employee Leave Management App',
      context:
        'HR needs a working web application for managers to review leave requests before the annual corporate shutdown.',
      workflowSteps: [
        'Backend developer authors CDS domain and service models in CAP.',
        'Developer appends `@UI.LineItem` and `@UI.SelectionFields` annotations.',
        'SAP Business Application Studio generates a Fiori Elements app in 30 seconds.',
        'App is published to SAP BTP and accessible to 500 managers on desktop and iPad.',
      ],
      businessImpact:
        'Project delivered in 2 days instead of 3 weeks; zero bugs related to pagination, table rendering, or CSS styling.',
    },
    quizQuestions: [
      {
        id: 'q-2-2-1',
        question: 'What is the primary advantage of Fiori Elements over building enterprise screens manually from scratch?',
        options: [
          {
            id: 'opt-a',
            text: 'Fiori Elements generates interactive, accessible, responsive screens from backend metadata, saving up to 80% of frontend coding time.',
            isCorrect: true,
            explanation: 'Correct! By leveraging metadata, developers eliminate thousands of lines of boilerplate HTML and table logic.',
          },
          {
            id: 'opt-b',
            text: 'It completely replaces the need for an internet browser.',
            isCorrect: false,
            explanation: 'Fiori Elements apps run directly in standard web browsers.',
          },
          {
            id: 'opt-c',
            text: 'It automatically turns off all database security rules.',
            isCorrect: false,
            explanation: 'Fiori Elements enforces standard OData authentication and authorization.',
          },
          {
            id: 'opt-d',
            text: 'It can only display black and white text.',
            isCorrect: false,
            explanation: 'Fiori Elements implements the rich, accessible SAP Horizon theme.',
          },
        ],
      },
      {
        id: 'q-2-2-2',
        question: 'Which CDS annotation determines the columns that appear in the main data table of a Fiori Elements List Report?',
        options: [
          {
            id: 'opt-a',
            text: '@UI.LineItem',
            isCorrect: true,
            explanation: 'Correct! `@UI.LineItem` defines the ordered collection of table fields rendered in the list view.',
          },
          {
            id: 'opt-b',
            text: '@UI.DeleteEverything',
            isCorrect: false,
            explanation: 'There is no such annotation in the SAP vocabulary.',
          },
          {
            id: 'opt-c',
            text: '@UI.SelectionFields',
            isCorrect: false,
            explanation: '`@UI.SelectionFields` controls the filter search inputs above the table, not the table columns.',
          },
          {
            id: 'opt-d',
            text: '@UI.HeaderInfo',
            isCorrect: false,
            explanation: '`@UI.HeaderInfo` defines the entity title and subtitle headers on detail pages.',
          },
        ],
      },
      {
        id: 'q-2-2-3',
        question: 'When should a team choose "Freestyle UI5" or custom React instead of Fiori Elements?',
        options: [
          {
            id: 'opt-a',
            text: 'When the application requires a non-standard, highly specialized UI (like a 3D floor layout, drag-and-drop designer, or custom canvas).',
            isCorrect: true,
            explanation: 'Correct! Fiori Elements is ideal for standard CRUD, tables, and dashboards; custom freestyle is for unique specialized workflows.',
          },
          {
            id: 'opt-b',
            text: 'When the developers do not want to write any code.',
            isCorrect: false,
            explanation: 'Freestyle requires writing significantly MORE manual code than Fiori Elements.',
          },
          {
            id: 'opt-c',
            text: 'When the database contains more than 10 rows.',
            isCorrect: false,
            explanation: 'Fiori Elements easily handles millions of rows with server-side pagination.',
          },
          {
            id: 'opt-d',
            text: 'Freestyle development is not supported on SAP BTP.',
            isCorrect: false,
            explanation: 'Freestyle UI5, React, and Vue are fully supported on BTP.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'Fiori Elements generates full enterprise web apps from CDS annotations and OData metadata.',
      '`@UI.LineItem` controls table columns; `@UI.SelectionFields` controls search filters.',
      'Metadata-driven architecture ensures frontend and backend never drift out of sync.',
    ],
    practicalActivity:
      'Write a CDS annotation block that adds a "Department" filter input and displays a "Remaining Vacation Days" column in a Fiori table.',
  },
  {
    id: 'ch-2-3',
    moduleId: 'module-2',
    order: 3,
    number: '2.3',
    title: 'Freestyle UI5 & Frontend-Backend Communication',
    subtitle: 'Building custom enterprise interfaces with MVC and UI5 Web Components',
    estimatedMinutes: 8,
    summary:
      'Explore Freestyle SAPUI5 development: Model-View-Controller (MVC) architecture, two-way data binding, XML views, controllers, and how to integrate SAP UI5 Web Components into modern React applications.',
    learningObjectives: [
      'Understand when to use Freestyle UI5 over Fiori Elements templates.',
      'Explain the Model-View-Controller (MVC) architecture of SAPUI5.',
      'Learn how UI5 Web Components enable standard React apps to adopt Fiori design natively.',
    ],
    analogy: {
      concept: 'Freestyle vs Template',
      analogy: 'Custom Tailored Suit vs Ready-to-Wear Standard Sizing',
      explanation:
        'Fiori Elements is a high-end, off-the-rack tailored suit: it fits 85% of people perfectly with zero effort and looks professional. But if you are an athlete with unique measurements or need custom pockets for specialized tools, you visit an artisan tailor for a custom-sculpted garment (Freestyle UI5). You have to measure, cut, and stitch every seam by hand, but you gain 100% control over the finished product.',
      transition:
        'Freestyle development gives you complete canvas freedom when enterprise workflows exceed standard list and detail tables.',
    },
    conceptExplanation: {
      whatItIs:
        'SAPUI5 is an open-source enterprise JavaScript framework developed by SAP. It uses the Model-View-Controller (MVC) pattern, declarative XML views, and two-way data binding. UI5 Web Components wrap these UI elements into standard Custom Elements usable in React.',
      whyItExists:
        'Certain enterprise tasks (interactive manufacturing plant floor maps, complex drag-and-drop logistics planning, visual diagram builders) cannot be expressed through standard table templates.',
      problemSolved:
        'Provides pixel-level UI control while maintaining accessibility and Fiori theme styling.',
      howItWorks:
        'The View (`View.xml`) declares UI controls. The Controller (`Controller.js`) handles user events (button clicks, input changes). The Model (`ODataModel`) synchronizes data with the backend CAP service automatically.',
      btpFit:
        'Freestyle applications are packaged into HTML5 Application Repositories on SAP BTP and served to users through the SAP BTP Approuter.',
    },
    diagramType: 'ui5-freestyle',
    jargonTerms: [
      {
        term: 'SAPUI5',
        simpleMeaning: 'The full enterprise JavaScript framework with MVC architecture and hundreds of UI controls.',
        familiarEquivalent: 'Angular or React combined with an enterprise design framework.',
      },
      {
        term: 'UI5 Web Components',
        simpleMeaning: 'Lightweight HTML Custom Elements (`<ui5-button>`) that can be used directly inside React or Vue.',
        familiarEquivalent: 'Using Tailwind UI or Material UI components inside a standard React project.',
      },
      {
        term: 'Two-Way Data Binding',
        simpleMeaning: 'When the user types in an input, the model updates automatically; when model updates, UI updates.',
        familiarEquivalent: 'React `value` and `onChange` state synchronization handled automatically.',
      },
    ],
    technicalExample: {
      title: 'Using SAP UI5 Web Components in a React Component',
      language: 'javascript',
      code: `import React, { useState } from 'react';
// 1. Import UI5 Web Components for React
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/Card.js';

export function LeaveApprovalCard({ employeeName, daysRequested, onApprove }) {
  const [approving, setApproving] = useState(false);

  const handleApprove = async () => {
    setApproving(true);
    await onApprove();
    setApproving(false);
  };

  return (
    <ui5-card class="horizon-card">
      <div slot="header" className="p-3 font-bold text-sm">
        Leave Request: {employeeName}
      </div>
      <div className="p-4 space-y-3">
        <p className="text-xs text-slate-600">
          Requested Duration: <strong>{daysRequested} days</strong>
        </p>
        <div className="flex gap-2">
          {/* Native UI5 Accessible Buttons running in React */}
          <ui5-button design="Emphasized" onClick={handleApprove}>
            {approving ? 'Approving...' : 'Approve Leave'}
          </ui5-button>
          <ui5-button design="Negative">
            Reject
          </ui5-button>
        </div>
      </div>
    </ui5-card>
  );
}`,
      purpose:
        'Demonstrates how modern web developers use standard React with SAP UI5 Web Components to achieve 100% Fiori design compliance with React state ergonomics.',
      lineExplanations: [
        { lines: '3-5', explanation: 'Imports custom HTML elements that bundle Fiori styling and accessibility.' },
        { lines: '24', explanation: '`ui5-button design="Emphasized"` automatically renders the official Fiori Horizon primary button.' },
        { lines: '27', explanation: '`ui5-button design="Negative"` renders the accessible destructive red button style.' },
      ],
      expectedOutput:
        'Renders accessible enterprise cards with keyboard navigation, hover states, and seamless React state hooks.',
      commonMistakes: [
        'Trying to write custom CSS to copy SAP buttons from scratch instead of using official UI5 Web Components.',
        'Neglecting the difference between custom XML views in classic UI5 and modern React UI5 Web Components.',
      ],
    },
    businessScenario: {
      title: 'Interactive Logistics Warehouse Loading Map',
      context:
        'A global freight forwarder needs a drag-and-drop map of a cargo ship where operators drag containers into cargo bays.',
      workflowSteps: [
        'Because standard table templates cannot represent a 3D ship hull, the team builds a Freestyle UI5 application.',
        'XML View declares an interactive SVG canvas with draggable container nodes.',
        'Controller listens for drop events, validates weight distribution, and updates CAP backend via OData.',
      ],
      businessImpact:
        'Operators visually balance ship weight, preventing vessel capsizing risks and speeding up port loading by 2 hours.',
    },
    quizQuestions: [
      {
        id: 'q-2-3-1',
        question: 'What does the MVC pattern stand for in SAPUI5 development?',
        options: [
          {
            id: 'opt-a',
            text: 'Model-View-Controller',
            isCorrect: true,
            explanation: 'Correct! Model (data), View (UI layout), and Controller (event handling business logic).',
          },
          {
            id: 'opt-b',
            text: 'Modern-Visual-Computing',
            isCorrect: false,
            explanation: 'MVC is a classic software architecture pattern.',
          },
          {
            id: 'opt-c',
            text: 'Multiple-Virtual-Containers',
            isCorrect: false,
            explanation: 'Containers relate to Docker/Cloud Foundry, not frontend architecture.',
          },
          {
            id: 'opt-d',
            text: 'Manual-Video-Conversion',
            isCorrect: false,
            explanation: 'MVC is an architectural design pattern.',
          },
        ],
      },
      {
        id: 'q-2-3-2',
        question: 'What are "SAP UI5 Web Components"?',
        options: [
          {
            id: 'opt-a',
            text: 'Physical computer chips soldered onto cloud server motherboards.',
            isCorrect: false,
            explanation: 'Web Components are software browser custom elements, not physical computer chips.',
          },
          {
            id: 'opt-b',
            text: 'Lightweight, framework-agnostic HTML custom elements (`<ui5-button>`) that allow React, Vue, or Angular apps to use official Fiori UI controls.',
            isCorrect: true,
            explanation: 'Correct! UI5 Web Components enable standard modern web frameworks to render Fiori-compliant controls natively.',
          },
          {
            id: 'opt-c',
            text: 'A replacement for CSS styles that turns off computer screens.',
            isCorrect: false,
            explanation: 'They provide accessible, styled UI controls.',
          },
          {
            id: 'opt-d',
            text: 'They can only be used on Windows 95 computers.',
            isCorrect: false,
            explanation: 'They are built on modern W3C Web Component standards.',
          },
        ],
      },
      {
        id: 'q-2-3-3',
        question: 'How does two-way data binding in SAPUI5 benefit form development?',
        options: [
          {
            id: 'opt-a',
            text: 'It automatically transmits all keystrokes to social media platforms.',
            isCorrect: false,
            explanation: 'Data binding synchronizes with the local data model, not social networks.',
          },
          {
            id: 'opt-b',
            text: 'Changes made by a user in an input field automatically update the underlying data model, and model changes instantly update the screen without manual DOM queries.',
            isCorrect: true,
            explanation: 'Correct! Two-way data binding eliminates tedious `document.getElementById()` and manual state syncing.',
          },
          {
            id: 'opt-c',
            text: 'It locks the user’s keyboard so they cannot backspace.',
            isCorrect: false,
            explanation: 'Users have full standard keyboard editing capabilities.',
          },
          {
            id: 'opt-d',
            text: 'It slows down web pages intentionally.',
            isCorrect: false,
            explanation: 'Data binding is optimized for fast, reactive UI updates.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'Freestyle UI5 offers pixel-level control when standard templates do not meet unique UX needs.',
      'SAPUI5 follows Model-View-Controller (MVC) with two-way data binding.',
      'UI5 Web Components allow React and Vue applications to adopt Fiori design natively.',
    ],
    practicalActivity:
      'Evaluate whether a customer return portal, an interactive factory floor heat map, and an invoice search table should use Fiori Elements or Freestyle.',
  },
];
