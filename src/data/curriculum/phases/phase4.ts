import { SyllabusPhase } from '../../../types/curriculum';
import { PHASE_CAPSTONES } from '../capstones';

export const PHASE_4: SyllabusPhase = {
  id: 'phase-4',
  number: 4,
  title: 'User Interfaces',
  tagline: 'Phase 4 · Weeks 11-13 · ~24 Hours',
  description:
    'Master modern enterprise frontend development on SAP BTP. Understand SAP Fiori design principles, metadata-driven Fiori Elements applications, SAPUI5 MVC architecture, two-way data binding, and the SAP Application Router (Approuter).',
  coreObjective:
    'Build production-ready enterprise user interfaces. Generate metadata-driven Fiori Elements List Report and Object Page apps using CDS UI annotations, author custom freestyle UI5 controllers and XML views with ODataModel v4 two-way data binding, and secure microservice endpoints using the standalone or managed Approuter.',
  estimatedHours: 24,
  suggestedWeeks: 'Weeks 11-13',
  badgeCategory: 'core',
  capstone: PHASE_CAPSTONES[4]!,
  modules: [
    {
      id: 'mod-4-1',
      code: '4.1',
      phaseId: 'phase-4',
      title: 'Fiori Elements (first)',
      tagline: 'Metadata-Driven UIs, CDS Annotations, and List Report / Object Page Patterns',
      summary:
        'Discover the highest-productivity frontend framework in the enterprise world. Learn how SAP Fiori Elements uses OData $metadata and Core Data Services (CDS) UI annotations to generate responsive, accessible, enterprise-grade web applications with zero manual JavaScript UI code.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'The SAP Fiori Design System: 5 core principles (Role-based, Adaptive, Simple, Coherent, Delightful) and modern Morning Horizon / Evening Horizon visual themes.',
        'The Fiori Elements paradigm: Why enterprise IT prefers metadata-driven UIs over custom hand-coded HTML/CSS/JavaScript.',
        'Standard floorplans: List Report & Object Page (LROP), Analytical List Page, Overview Page, and Worklist.',
        'Core CDS UI Annotations: `@UI.LineItem` (table columns), `@UI.SelectionFields` (search filter bar), `@UI.HeaderInfo` (page title & badges), `@UI.Identification` (form fields).',
        'Flexible Column Layout (FCL): Multi-column desktop master-detail layouts with automatic mobile drill-down.',
        'Draft handling: Automatic draft saving, concurrency locking, and discard/save lifecycles out-of-the-box.',
      ],
      practicalImplementation:
        'Add comprehensive `@UI` annotations to a CAP CDS service definition. Launch the Fiori application generator and preview a live List Report and Object Page application featuring interactive search filters, column sorting, and responsive table layouts.',
      masteryCheck:
        'Explain how adding `@UI.LineItem: [{Value: title}, {Value: price}]` in CDS generates interactive table columns in the browser without writing a single line of frontend JavaScript. Configure `@UI.SelectionFields` to create filter bars.',
      learningObjectives: [
        'Explain the 5 core principles of the SAP Fiori design system.',
        'Understand the architecture of metadata-driven user interfaces in Fiori Elements.',
        'Use CDS annotations to configure table columns, filter bars, and header titles.',
        'Differentiate between List Report, Object Page, and Overview Page floorplans.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Fiori Design Philosophy: Beyond Raw HTML',
          subtitle: 'The 5 principles transforming enterprise software UX',
          explanation:
            'Historically, enterprise software was notorious for cluttered, confusing screens with 200 input boxes on a single window (like classic SAP GUI transaction codes). In 2013, SAP introduced SAP Fiori, a human-centered design system built on five golden principles: 1) Role-Based: Users see only the applications and data relevant to their specific job function. 2) Adaptive: Works seamlessly across mobile phones, tablets, and desktop workstations with responsive layouts. 3) Simple: Focuses on the 20% of features used 80% of the time, hiding complexity behind progressive disclosure. 4) Coherent: Identical visual design, icons, and keyboard shortcuts across all applications. 5) Delightful: Clean modern typography, accessible contrast, and polished micro-interactions using the Horizon theme.',
          keyIdea:
            'Fiori transforms complex enterprise transactions into simple, role-based, accessible web experiences.',
          taskInstruction: 'Review the 5 Fiori design principles in the interactive fiori-horizon diagram below.',
          hint: 'Fiori is a design system; SAPUI5 and Fiori Elements are the technologies that implement it.',
        },
        {
          stepNumber: 2,
          title: 'The Metadata-Driven UI Paradigm',
          subtitle: 'Why writing manual UI code is obsolete for standard enterprise apps',
          explanation:
            'In traditional frontend frameworks (React, Angular, Vue), creating a data table requires writing hundreds of lines of boilerplate: rendering table headers, mapping array items to rows, implementing pagination, writing filter inputs, formatting dates, and managing loading spinners. If the backend adds a new database column, the frontend developer must manually update HTML, state, and CSS. SAP Fiori Elements inverts this: the UI framework is a generic rendering engine that reads the OData `$metadata` and CDS annotations published by the backend CAP service. You declare what data should appear where using annotations, and Fiori Elements generates the complete interactive UI automatically.',
          keyIdea:
            'In Fiori Elements, you do not write HTML or CSS; you declare annotations in CDS, and the framework renders accessible, responsive UIs automatically.',
          taskInstruction: 'Examine the metadata flow diagram below to trace how annotations produce live buttons and tables.',
          hint: 'Fiori Elements applications automatically stay compliant with accessibility (WCAG 2.1) and theme guidelines.',
        },
        {
          stepNumber: 3,
          title: 'Floorplans: List Report and Object Page (LROP)',
          subtitle: 'The bread and butter of enterprise business software',
          explanation:
            '85% of all enterprise applications follow the List Report and Object Page pattern: 1) List Report: The entry screen. Displays a Filter Bar at the top (search criteria) and a responsive Table below (listing business records such as Purchase Orders, Invoices, or Employees). 2) Object Page: The detail screen reached by clicking any row in the List Report. Displays a Header Facet (key KPIs, status badges, actions) followed by detailed form sections, tabs, and child tables (e.g., the line items of that specific order).',
          keyIdea:
            'List Report lets users search and filter records; Object Page lets users inspect, edit, and act on a specific business object.',
          taskInstruction: 'Inspect the Floorplan layout in the code example.',
          hint: 'Fiori Elements also supports Analytical List Pages for charts and Overview Pages for executive dashboards.',
        },
        {
          stepNumber: 4,
          title: 'Essential CDS UI Annotations',
          subtitle: 'Controlling the user interface from backend CDS models',
          explanation:
            'Developers control the Fiori Elements UI directly in CDS using `@UI` annotations: 1) `@UI.HeaderInfo`: Defines the entity singular/plural title and title property. 2) `@UI.SelectionFields`: Array of properties rendered as search input fields in the filter bar (e.g., `[category_ID, status]`). 3) `@UI.LineItem`: Array of column descriptors rendered in the main table (e.g., `[{Value: title}, {Value: price}]`). 4) `@UI.Identification`: Controls which fields appear in the primary form on the Object Page.',
          keyIdea:
            'Adding annotations to CDS is like writing declarative UI blueprints that Fiori Elements brings to life.',
          taskInstruction: 'Review the annotated CDS service definition in the technical example below.',
          warning: 'Syntax errors in annotations will prevent Fiori Elements from rendering specific columns or filter bars.',
        },
        {
          stepNumber: 5,
          title: 'Draft Handling: Concurrency and Auto-Save Out-of-the-Box',
          subtitle: 'How Fiori Elements prevents data loss during editing',
          explanation:
            'In consumer apps, if your laptop battery dies while filling out a multi-page form, your entered data is lost. In enterprise software, losing an hour of complex data entry on a 50-item procurement order is unacceptable. When a CAP entity is annotated with `@odata.draft.enabled`, Fiori Elements automatically activates Draft Handling: 1) The moment a user clicks "Create" or "Edit", CAP creates an isolated draft copy in the database. 2) Every keystroke is saved asynchronously. 3) The record is locked, preventing other users from editing it simultaneously. 4) The user can close their laptop, reopen it three days later, and click "Save" to commit the draft or "Discard" to purge it.',
          keyIdea:
            'Draft handling provides automated auto-save, pessimistic concurrency locking, and safe editing lifecycles with zero manual frontend code.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Enabling draft in CAP requires adding `@odata.draft.enabled` to your service entity projection.',
        },
      ],
      diagramType: 'fiori-elements-annotations',
      analogy: {
        concept: 'Fiori Elements Metadata-Driven UI',
        analogy: 'The Universal Modern Theater Stage and Actor Script Annotations',
        explanation:
          'Custom hand-coded frontend development (React/HTML) is like hiring a team of carpenters, electricians, and painters to build an entirely new physical theater building from concrete and brick every time you want to put on a new play. SAP Fiori Elements is a world-class, multi-million-dollar automated Broadway theater (the Fiori Elements rendering engine). The stage has automated hydraulic lifts, synchronized lighting, digital projection backdrops, and surround sound speakers already installed. All the director (the backend developer) needs to do is hand the stage manager a 2-page script with margin annotations (`@UI.LineItem: spotlight on center stage; @UI.SelectionFields: open curtain at 8 PM`). The stage machinery reads the script annotations and executes the entire theatrical spectacle flawlessly.',
        transition:
          'Where the automated stage turns script notes into theatrical performances, Fiori Elements turns CDS annotations into enterprise web applications.',
      },
      conceptExplanation: {
        whatItIs:
          'SAP Fiori Elements is a framework that provides pre-built, standard user interface floorplans based on SAPUI5 that render responsive, accessible web applications driven entirely by OData metadata and annotations.',
        whyItExists:
          'Custom frontend coding is expensive, slow, inconsistent across development teams, and prone to accessibility and responsive design defects.',
        problemSolved:
          'Reduces frontend development time by up to 80%, enforces 100% design consistency across corporate enterprise apps, guarantees WCAG accessibility compliance, and decouples UI rendering from backend business logic.',
        howItWorks:
          'The frontend Fiori Elements application boots up in the browser, fetches the OData v4 `$metadata` XML and annotation files from the CAP backend, and dynamically constructs the UI5 controls (Smart Tables, Filter Bars, Object Pages) in memory according to the declared annotations.',
        btpFit:
          'Fiori Elements is the standard, primary UI framework recommended by SAP for all transactional applications on SAP BTP and SAP S/4HANA.',
      },
      jargonTerms: [
        {
          term: 'Fiori Elements',
          simpleMeaning: 'A framework that automatically creates enterprise web screens using metadata instead of manual UI code.',
          familiarEquivalent: 'An automated 3D printer that reads a digital blueprint and builds the object automatically.',
        },
        {
          term: 'Annotation (@UI...)',
          simpleMeaning: 'A declarative tag attached to data fields in CDS that tells the UI where and how to display that data.',
          familiarEquivalent: 'Post-it notes stuck on blueprints telling workers which wall to paint blue.',
        },
        {
          term: 'List Report / Object Page',
          simpleMeaning: 'The standard two-screen floorplan: a searchable list table (List Report) leading to a detailed form (Object Page).',
          familiarEquivalent: 'Browsing products on an e-commerce catalog and clicking an item to see its detailed specs.',
        },
        {
          term: 'Draft Handling',
          simpleMeaning: 'Automatic background saving and editing locks that prevent data loss when creating or editing records.',
          familiarEquivalent: 'Google Docs automatically saving your document with every keystroke.',
        },
      ],
      technicalExample: {
        title: 'Core Data Services (CDS) UI Annotations for Fiori Elements Floorplan',
        language: 'sql',
        code: `// srv/order-annotations.cds - Declarative UI Metadata for Fiori Elements
using { OrderService } from './order-service';

annotate OrderService.PurchaseOrders with @(
  // 1. Header Information
  UI.HeaderInfo: {
    TypeName: 'Purchase Order',
    TypeNamePlural: 'Purchase Orders',
    Title: { Value: orderNumber },
    Description: { Value: description }
  },

  // 2. Search Filter Bar (Selection Fields at top of screen)
  UI.SelectionFields: [
    status,
    currency
  ],

  // 3. Main List Report Table Columns (Line Items)
  UI.LineItem: [
    {
      $Type: 'UI.DataField',
      Value: orderNumber,
      Label: 'PO Number'
    },
    {
      $Type: 'UI.DataField',
      Value: description,
      Label: 'Description'
    },
    {
      $Type: 'UI.DataField',
      Value: totalNetAmount,
      Label: 'Total Amount'
    },
    {
      $Type: 'UI.DataField',
      Value: status,
      Label: 'Approval Status',
      Criticality: #Positive // Renders clean green/amber/red status badge!
    }
  ],

  // 4. Object Page Facets (Detail Screen Tabs and Sections)
  UI.Facets: [
    {
      $Type: 'UI.ReferenceFacet',
      Target: '@UI.Identification',
      Label: 'General Information'
    },
    {
      $Type: 'UI.ReferenceFacet',
      Target: 'to_Items/@UI.LineItem',
      Label: 'Itemized Order Lines'
    }
  ]
);`,
        purpose:
          'Demonstrates professional UI annotations: configuring HeaderInfo, filter bar SelectionFields, table LineItems with color criticality badges, and Object Page multi-facet tabs.',
        lineExplanations: [
          { lines: '5-10', explanation: 'UI.HeaderInfo: Defines page headings and dynamic title mapping to orderNumber.' },
          { lines: '13-16', explanation: 'UI.SelectionFields: Generates interactive dropdown filter inputs at the top of the List Report.' },
          { lines: '19-41', explanation: 'UI.LineItem: Declares table columns; Criticality: #Positive formats status badges with semantic colors.' },
          { lines: '44-55', explanation: 'UI.Facets: Renders organized tabs on the Object Page, including child items table.' },
        ],
        expectedOutput:
          'Fiori Elements renders an interactive, responsive List Report and Object Page application with zero frontend JavaScript code.',
        commonMistakes: [
          'Misspelling annotation targets (e.g., writing UI.lineItem with lowercase "l").',
          'Not exposing child associations in service projections, causing empty facet tables on Object Pages.',
        ],
      },
      businessScenario: {
        title: 'Global Supplier Invoice Approval Portal Delivery',
        context:
          'An oil and gas corporation needs an invoice auditing portal for 500 accounts payable accountants within a 2-week delivery deadline.',
        workflowSteps: [
          'Backend developer models `Invoices` and `InvoiceItems` in SAP CAP.',
          'Developer authors 40 lines of `@UI` annotations in `srv/invoice-annotations.cds`.',
          'Runs SAP Fiori Application Generator in BAS: selects "List Report Page" template pointing to the CAP service.',
          'Application renders a responsive desktop/tablet invoice portal with search filters, total amount sorting, and PDF preview facets.',
          'Accountants begin approving invoices with zero training required due to familiar Fiori UX.',
        ],
        businessImpact:
          'Delivers a fully functional enterprise web application in 4 days instead of 3 months, saving €140,000 in custom frontend design and testing costs.',
      },
      practicalActivity:
        'Explore your CAP project: create `srv/annotations.cds` and add `@UI.SelectionFields` to an entity to see filter inputs appear automatically in Fiori preview.',
      keyTakeaways: [
        'Fiori Elements generates enterprise UIs automatically from OData metadata and CDS annotations.',
        'The List Report & Object Page floorplan covers the vast majority of transactional business apps.',
        'Use @UI.LineItem for table columns and @UI.SelectionFields for filter bar search inputs.',
        'Draft handling (@odata.draft.enabled) provides auto-save and editing locks with zero custom code.',
      ],
      quizQuestions: [
        {
          id: 'mod-4-1-q1',
          question:
            'How does SAP Fiori Elements generate an interactive web table with sorting, filtering, and pagination without requiring the developer to write manual HTML or JavaScript UI components?',
          options: [
            {
              id: 'a',
              text: 'The framework reads the backend OData service $metadata and CDS "@UI.LineItem" annotations, dynamically constructing the required accessible UI5 controls in the browser.',
              isCorrect: true,
              explanation:
                'Correct. Fiori Elements is metadata-driven: it translates backend annotations into interactive UI controls automatically.',
            },
            {
              id: 'b',
              text: 'It takes a screenshot of the database and displays it as an image.',
              isCorrect: false,
              explanation:
                'Incorrect. Fiori Elements generates live interactive DOM elements.',
            },
            {
              id: 'c',
              text: 'It relies on web scrapers to steal code from public websites.',
              isCorrect: false,
              explanation:
                'Incorrect. Fiori Elements is an enterprise framework developed by SAP.',
            },
            {
              id: 'd',
              text: 'Fiori Elements can only render plain text files and cannot display tables.',
              isCorrect: false,
              explanation:
                'Incorrect. Fiori Elements specializes in complex interactive enterprise tables and forms.',
            },
          ],
        },
        {
          id: 'mod-4-1-q2',
          question:
            'Which CDS UI annotation is used to specify which properties appear as searchable input filters in the top Filter Bar of a Fiori Elements List Report?',
          options: [
            {
              id: 'a',
              text: '@UI.SelectionFields',
              isCorrect: true,
              explanation:
                'Correct. @UI.SelectionFields defines the array of properties rendered in the filter bar at the top of a List Report.',
            },
            {
              id: 'b',
              text: '@UI.LineItem',
              isCorrect: false,
              explanation:
                'Incorrect. @UI.LineItem defines columns in the table below the filter bar.',
            },
            {
              id: 'c',
              text: '@UI.HeaderInfo',
              isCorrect: false,
              explanation:
                'Incorrect. @UI.HeaderInfo defines the entity title and header badges.',
            },
            {
              id: 'd',
              text: '@UI.BadgeOnly',
              isCorrect: false,
              explanation:
                'Incorrect. BadgeOnly is not a valid Fiori Elements annotation.',
            },
          ],
        },
        {
          id: 'mod-4-1-q3',
          question:
            'What major enterprise capability is activated when an entity projection is annotated with "@odata.draft.enabled" in SAP CAP?',
          options: [
            {
              id: 'a',
              text: 'Draft Handling: creates isolated draft records during editing, auto-saves keystrokes, locks records against concurrent edits, and enables safe Save/Discard workflows.',
              isCorrect: true,
              explanation:
                'Correct. Draft handling prevents data loss and manages transactional editing state automatically.',
            },
            {
              id: 'b',
              text: 'It forces the application to run only when connected to home Wi-Fi.',
              isCorrect: false,
              explanation:
                'Incorrect. Draft handling is independent of network type.',
            },
            {
              id: 'c',
              text: 'It sends an unencrypted postcard to the customer home address.',
              isCorrect: false,
              explanation:
                'Incorrect. Draft handling is a software data-isolation pattern.',
            },
            {
              id: 'd',
              text: 'It converts your database into an Adobe Photoshop file.',
              isCorrect: false,
              explanation:
                'Incorrect. Draft handling has nothing to do with graphic design files.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-4-2',
      code: '4.2',
      phaseId: 'phase-4',
      title: 'SAPUI5 Basics',
      tagline: 'MVC Architecture, Two-Way Data Binding, and ODataModel v4',
      summary:
        'Master custom frontend engineering using SAPUI5: SAP enterprise JavaScript/HTML5 UI framework. Learn Model-View-Controller (MVC) architecture, declarative XML views, two-way data binding, formatters, and the ODataModel v4.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'What is SAPUI5: Enterprise JavaScript UI library, 500+ accessible enterprise controls, and internationalization (i18n).',
        'Model-View-Controller (MVC) architecture: Separation of visual layout (View), business logic (Controller), and data state (Model).',
        'XML Views: Declarative, strictly-typed UI layout syntax (`<mvc:View>`, `<Table>`, `<Input>`, `<Button>`).',
        'Two-Way Data Binding: How user input in an `<Input>` control automatically synchronizes with the underlying JSON or OData model without manual DOM queries.',
        'Data models in UI5: JSONModel (client-side state), ResourceModel (i18n translations), and ODataModel v4 (backend server synchronization).',
        'Custom Formatters: Formatting numbers, dates, currencies, and status badge colors dynamically in the UI.',
        'Application lifecycle: `manifest.json` (application descriptor) and `Component.js` (root container).',
      ],
      practicalImplementation:
        'Author an SAPUI5 XML View containing an interactive table bound to an ODataModel v4. Implement a JavaScript controller with custom event handlers (`onApprove`, `onSearch`), custom formatters, and message toast notifications.',
      masteryCheck:
        'Explain how Two-Way Data Binding synchronizes input values between the UI and model. Differentiate when an enterprise project requires custom freestyle SAPUI5 versus standard Fiori Elements.',
      learningObjectives: [
        'Explain the Model-View-Controller (MVC) design pattern in SAPUI5.',
        'Create declarative user interface layouts using XML Views.',
        'Implement two-way data binding to synchronize UI controls with data models.',
        'Use ODataModel v4 to perform CRUD operations from custom UI5 controllers.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'What is SAPUI5?',
          subtitle: 'The enterprise UI framework powering thousands of business apps',
          explanation:
            'While consumer web apps use lightweight UI libraries like React, enterprise applications have vastly stricter requirements: strict keyboard accessibility for visually impaired users (WCAG 2.1 AA), built-in translation across 40 languages (RTL right-to-left Hebrew/Arabic support), high-density data tables handling 100,000 rows, and strict corporate theme compliance. SAPUI5 (and its open-source core OpenUI5) is SAP flagship enterprise UI framework. It contains over 500 pre-built, tested, accessible UI controls ranging from basic buttons to complex interactive Gantt charts, split-app containers, and analytical micro-charts.',
          keyIdea:
            'SAPUI5 provides enterprise-grade accessibility, internationalization, and hundreds of complex business controls out-of-the-box.',
          taskInstruction: 'Review the UI5 freestyle diagram below to understand the MVC separation.',
          hint: 'OpenUI5 is the free, open-source core of SAPUI5.',
        },
        {
          stepNumber: 2,
          title: 'The Model-View-Controller (MVC) Pattern in UI5',
          subtitle: 'Clean architectural separation of responsibilities',
          explanation:
            'SAPUI5 strictly enforces the Model-View-Controller (MVC) design pattern: 1) View (XML View): Defines the visual layout and hierarchy of UI controls declaratively (e.g., `view/Main.view.xml`). Never contains JavaScript logic. 2) Controller (JavaScript): Handles user interaction events (button clicks, value changes) and coordinates business logic (e.g., `controller/Main.controller.js`). 3) Model: Holds the data. Models can be client-side (`JSONModel`), internationalized translation text (`ResourceModel`), or server-synchronized (`v4.ODataModel`).',
          keyIdea:
            'Views handle visual layout; Controllers handle event logic; Models handle data and state.',
          taskInstruction: 'Inspect the XML View and Controller pairing in the code example.',
          warning: 'Never write manual DOM manipulation code (like document.getElementById) in UI5 controllers; always use data binding.',
        },
        {
          stepNumber: 3,
          title: 'Declarative XML Views: Structure Without Scripting',
          subtitle: 'Why UI5 prefers XML over raw JavaScript for UI layout',
          explanation:
            'In SAPUI5, 99% of views are authored in XML. XML provides a clean, hierarchical, declarative tree of controls: `<mvc:View controllerName="my.app.controller.Main" xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m"> <Page title="Purchase Orders"> <Table items="{/Orders}"> <columns> ... </columns> </Table> </Page> </mvc:View>`. XML views enforce complete separation of presentation from code, allow visual drag-and-drop editors in BAS, and enable fast asynchronous parsing during application startup.',
          keyIdea:
            'XML views define the control tree declaratively, making layouts readable, tool-friendly, and maintainable.',
          taskInstruction: 'Review the XML view syntax in the technical example below.',
          hint: 'The default namespace `xmlns="sap.m"` provides standard mobile and desktop controls (Page, Table, Button, Input).',
        },
        {
          stepNumber: 4,
          title: 'Two-Way Data Binding: Automated State Synchronization',
          subtitle: 'Eliminating manual UI-to-data synchronization code',
          explanation:
            'In legacy JavaScript, reading a user\'s input required: 1) Finding the DOM input element, 2) Reading `element.value`, 3) Converting the type, and 4) Writing it to your data object. In SAPUI5, Two-Way Data Binding automates this: when you bind an input control to a model property (`<Input value="{/user/name}" />`), any character typed by the user immediately updates the underlying model in memory. Conversely, if your controller changes the model in code (`model.setProperty("/user/name", "Alice")`), the input on the screen updates instantly with zero DOM code.',
          keyIdea:
            'Two-Way Data Binding automatically synchronizes the screen with the data model in both directions.',
          taskInstruction: 'Trace how data binding operates in the interactive diagram.',
          hint: 'Curly braces `{/propertyName}` denote a data binding path in UI5.',
        },
        {
          stepNumber: 5,
          title: 'Freestyle UI5 vs Fiori Elements: When to Choose Which',
          subtitle: 'The architectural decision matrix',
          explanation:
            'Enterprise teams must choose between Fiori Elements and Freestyle UI5: 1) Choose Fiori Elements for: Standard enterprise transactional workflows (List Reports, Object Pages, Worklists, Approvals). Covers 85% of corporate applications with 80% less code. 2) Choose Custom Freestyle UI5 for: Highly customized, non-standard visual experiences that do not fit standard floorplans (e.g., custom warehouse 3D spatial bin layouts, airline seat-selection maps, interactive shop-floor manufacturing monitors).',
          keyIdea:
            'Use Fiori Elements by default; use Custom Freestyle UI5 only when business requirements demand unique, non-standard visual interactions.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'You can embed custom Freestyle UI5 sections inside standard Fiori Elements Object Pages using "Custom Building Blocks".',
        },
      ],
      diagramType: 'ui5-freestyle',
      analogy: {
        concept: 'SAPUI5 Model-View-Controller (MVC) Architecture',
        analogy: 'The Modern Restaurant Kitchen: Kitchen, Menu, and Waitstaff',
        explanation:
          'Think of dining at an upscale restaurant. 1) The Model (The Kitchen & Pantry): The kitchen holds the ingredients, fresh vegetables, steaks, and wines (the data state). The chef does not talk directly to customers. 2) The View (The Printed Menu & Dining Table): The menu presents the dishes attractively to diners with typography and pricing (the visual XML layout). 3) The Controller (The Waitstaff): When a diner points to the steak and orders it (user click event), the waiter intercepts the request, verifies that the kitchen is open (event handling), communicates with the kitchen (model update), and brings the hot plate back to the table.',
        transition:
          'Where the waiter coordinates diners and the kitchen, the UI5 controller coordinates user clicks and the backend OData model.',
      },
      conceptExplanation: {
        whatItIs:
          'SAPUI5 is an enterprise-grade HTML5/JavaScript user interface library developed by SAP that provides a rich set of responsive UI controls, Model-View-Controller (MVC) architecture, and data binding abstractions tailored for enterprise business applications.',
        whyItExists:
          'Building complex enterprise applications requiring accessibility (WCAG), enterprise theming, multi-language localization, and high-density data grids with consumer libraries requires stitching together dozens of uncoordinated open-source plugins.',
        problemSolved:
          'Delivers 500+ pre-built enterprise UI controls, enforces accessible contrast and screen-reader compliance out-of-the-box, provides built-in internationalization (i18n), and binds natively to OData v4 backend services.',
        howItWorks:
          'Applications boot using `index.html` which loads the UI5 core library (`sap-ui-core.js`). The core parses `manifest.json` (the application descriptor), instantiates the root View (`View.xml`), initializes the Controller (`Controller.js`), and binds controls to the `v4.ODataModel` connected to your backend CAP service.',
        btpFit:
          'SAPUI5 is the official frontend technology powering both SAP Fiori and all custom web applications on SAP BTP and SAP S/4HANA.',
      },
      jargonTerms: [
        {
          term: 'SAPUI5',
          simpleMeaning: 'SAP\'s enterprise JavaScript UI framework containing 500+ accessible business controls.',
          familiarEquivalent: 'An industrial-strength enterprise version of React pre-packaged with all required business controls.',
        },
        {
          term: 'XML View',
          simpleMeaning: 'A declarative XML file defining the visual layout and hierarchy of UI controls.',
          familiarEquivalent: 'A structured blueprint of a website layout written in tags.',
        },
        {
          term: 'Two-Way Data Binding',
          simpleMeaning: 'Automatic synchronization where typing in an input updates the model, and updating the model refreshes the input.',
          familiarEquivalent: 'Two mirrors facing each other: changing an object in front of one instantly reflects in the other.',
        },
        {
          term: 'manifest.json (App Descriptor)',
          simpleMeaning: 'The central configuration file in UI5 declaring data sources, models, routes, and dependencies.',
          familiarEquivalent: 'The passport and configuration manifest of a software application.',
        },
      ],
      technicalExample: {
        title: 'Custom SAPUI5 XML View and Controller with ODataModel v4 Action',
        language: 'xml',
        code: `<!-- 1. VIEW: webapp/view/OrderApproval.view.xml -->
<mvc:View
  controllerName="sap.btp.procurement.controller.OrderApproval"
  xmlns:mvc="sap.ui.core.mvc"
  xmlns="sap.m"
  xmlns:core="sap.ui.core">
  <Page title="{i18n>appTitle}" showNavButton="false">
    <content>
      <Table id="ordersTable" items="{path: '/PurchaseOrders', parameters: {$select: 'ID,orderNumber,totalNetAmount,status'}}">
        <headerToolbar>
          <OverflowToolbar>
            <Title text="{i18n>pendingOrdersTableTitle}" />
            <ToolbarSpacer />
            <Button text="{i18n>approveSelectedButton}" type="Emphasized" press=".onApprovePress" />
          </OverflowToolbar>
        </headerToolbar>
        <columns>
          <Column><Text text="{i18n>orderNumberCol}" /></Column>
          <Column><Text text="{i18n>amountCol}" /></Column>
          <Column><Text text="{i18n>statusCol}" /></Column>
        </columns>
        <items>
          <ColumnListItem>
            <cells>
              <Text text="{orderNumber}" />
              <ObjectNumber number="{totalNetAmount}" unit="EUR" state="Success" />
              <ObjectStatus text="{status}" state="{= \${status} === 'Approved' ? 'Success' : 'Warning'}" />
            </cells>
          </ColumnListItem>
        </items>
      </Table>
    </content>
  </Page>
</mvc:View>`,
        purpose:
          'Demonstrates professional SAPUI5: declarative XML view, internationalized text bindings ({i18n>key}), ODataModel v4 table binding with parameters, and conditional formatting expressions.',
        lineExplanations: [
          { lines: '7', explanation: 'Page title="{i18n>appTitle}": Binds heading to translatable text file for multi-language support.' },
          { lines: '9', explanation: 'items="{path: \'/PurchaseOrders\'...}": Binds table rows directly to backend OData v4 entity set.' },
          { lines: '14', explanation: 'press=".onApprovePress": Binds button click to controller method onApprovePress.' },
          { lines: '26', explanation: 'Expression binding: Computes status color (Success vs Warning) dynamically in the XML view.' },
        ],
        expectedOutput:
          'Renders accessible Fiori table with real-time OData data, live sorting, and semantic status color badges.',
        commonMistakes: [
          'Hardcoding English strings in XML instead of using i18n properties files.',
          'Missing the leading dot in event handlers (writing press="onPress" instead of press=".onPress").',
        ],
      },
      businessScenario: {
        title: 'Custom Warehouse 3D Bin Visualizer on SAP BTP',
        context:
          'A logistics warehouse uses custom RFID scanners and requires an interactive spatial visualizer showing physical rack heatmaps that standard Fiori Elements cannot accommodate.',
        workflowSteps: [
          'Developer creates a custom Freestyle SAPUI5 application in BAS.',
          'Authors custom XML view incorporating a custom HTML5 canvas control alongside standard SAP Fiori buttons.',
          'Controller binds to CAP backend ODataModel v4, streaming live warehouse stock coordinates.',
          'Forklift drivers touch bin locations on ruggedized tablet screens; UI5 controller triggers real-time stock transfer.',
          'Audit status updates instantly in SAP S/4HANA core via backend destination.',
        ],
        businessImpact:
          'Reduces warehouse picking errors by 35% and accelerates pallet loading times by 18 minutes per freight truck.',
      },
      practicalActivity:
        'Open any UI5 sample in the SAPUI5 Demo Kit (ui5.sap.com) and test how changing input properties triggers two-way data binding updates.',
      keyTakeaways: [
        'SAPUI5 provides 500+ accessible enterprise UI controls complying with Fiori design guidelines.',
        'MVC architecture separates visual XML views from JavaScript event controllers and data models.',
        'Two-way data binding eliminates manual DOM queries by keeping models and screen inputs in sync.',
        'Use Fiori Elements for standard business apps; use Freestyle UI5 for custom non-standard visual experiences.',
      ],
      quizQuestions: [
        {
          id: 'mod-4-2-q1',
          question:
            'What happens when a user types a new value into an SAPUI5 "<Input value=\\"{/user/name}\\" />" control that is bound via Two-Way Data Binding?',
          options: [
            {
              id: 'a',
              text: 'The underlying model property ("/user/name") is automatically updated in memory with the new text immediately without writing any manual DOM retrieval code.',
              isCorrect: true,
              explanation:
                'Correct. Two-way data binding keeps screen inputs and in-memory data models perfectly synchronized in both directions.',
            },
            {
              id: 'b',
              text: 'The computer keyboard locks for 10 seconds to verify user spelling.',
              isCorrect: false,
              explanation:
                'Incorrect. Data binding occurs smoothly and asynchronously in milliseconds.',
            },
            {
              id: 'c',
              text: 'The browser forces a full page reload from the web server.',
              isCorrect: false,
              explanation:
                'Incorrect. SAPUI5 is a Single Page Application (SPA); no page reload occurs.',
            },
            {
              id: 'd',
              text: 'The text is deleted because XML views are read-only.',
              isCorrect: false,
              explanation:
                'Incorrect. XML views define interactive, editable input controls.',
            },
          ],
        },
        {
          id: 'mod-4-2-q2',
          question:
            'Why should developers store UI labels and button text in "i18n.properties" files instead of hardcoding English strings inside XML views?',
          options: [
            {
              id: 'a',
              text: 'To support Internationalization (i18n): it allows the application to automatically display translated text in German, Japanese, Spanish, or French based on the user browser language settings.',
              isCorrect: true,
              explanation:
                'Correct. Internationalization (i18n) separates text strings from code, enabling seamless global translation.',
            },
            {
              id: 'b',
              text: 'Because hardcoding text in XML causes computer monitors to overheat.',
              isCorrect: false,
              explanation:
                'Incorrect. Monitors do not overheat from text.',
            },
            {
              id: 'c',
              text: 'Because XML files can only store numbers and cannot store English words.',
              isCorrect: false,
              explanation:
                'Incorrect. XML supports full unicode text.',
            },
            {
              id: 'd',
              text: 'Because i18n files encrypt your code against corporate espionage.',
              isCorrect: false,
              explanation:
                'Incorrect. i18n files are plain text translation dictionaries, not encryption.',
            },
          ],
        },
        {
          id: 'mod-4-2-q3',
          question:
            'When should an enterprise software team choose Custom Freestyle SAPUI5 over standard SAP Fiori Elements?',
          options: [
            {
              id: 'a',
              text: 'When the business requirement demands unique, non-standard visual layouts (e.g., interactive 3D floor maps or custom graphical editors) that cannot be satisfied by standard Fiori floorplans.',
              isCorrect: true,
              explanation:
                'Correct. Freestyle UI5 is used when unique custom UI interaction patterns are mandatory.',
            },
            {
              id: 'b',
              text: 'Whenever an application needs to connect to an SAP HANA database.',
              isCorrect: false,
              explanation:
                'Incorrect. Both Fiori Elements and Freestyle connect to SAP HANA identically.',
            },
            {
              id: 'c',
              text: 'Whenever the project deadline is tomorrow morning.',
              isCorrect: false,
              explanation:
                'Incorrect. Fiori Elements is much faster to build than Freestyle UI5.',
            },
            {
              id: 'd',
              text: 'Because Fiori Elements is prohibited in production enterprise environments.',
              isCorrect: false,
              explanation:
                'Incorrect. Fiori Elements is SAP\'s premier recommended framework for production applications.',
            },
          ],
        },
      ],
    },
    {
      id: 'mod-4-3',
      code: '4.3',
      phaseId: 'phase-4',
      title: 'App Integration',
      tagline: 'Application Router (Approuter), Route Security, and Fiori Launchpad',
      summary:
        'Master the enterprise entry point of SAP BTP applications. Understand how the SAP Application Router (@sap/approuter) acts as a single point of entry, terminates sessions, enforces OAuth authentication with XSUAA, prevents CSRF attacks, and embeds apps into SAP Build Work Zone.',
      estimatedMinutes: 35,
      level: 'Beginner',
      subtopics: [
        'The Single Point of Entry pattern: Why frontend UIs must never call backend microservices directly on disparate cloud domains.',
        'The SAP Application Router (@sap/approuter): Reverse proxy, static content serving, authentication enforcement, and route dispatching.',
        'Routing descriptor (xs-app.json): Configuring routes, service destinations, authentication methods (`route`, `none`), and local static directories.',
        'Cross-Origin Resource Sharing (CORS) and Same-Origin Policy: How Approuter eliminates CORS errors by serving UI and APIs under a single domain.',
        'Session handling and CSRF management: Managing HTTP session cookies and automated `X-CSRF-Token` forwarding.',
        'SAP Build Work Zone (Standard & Advanced Edition): Embedding Fiori applications as interactive tiles inside the central corporate enterprise launchpad.',
      ],
      practicalImplementation:
        'Configure an `xs-app.json` routing descriptor that maps `/` to local static UI5 files, forwards `/api/` to a backend CAP microservice destination with OAuth authentication, and tests CSRF token forwarding.',
      masteryCheck:
        'Explain why placing an Approuter in front of microservices eliminates browser CORS errors. Trace the step-by-step route forwarding when a browser calls `/srv/odata/v4/catalog/Books` via the Approuter.',
      learningObjectives: [
        'Explain the Single Point of Entry pattern implemented by the SAP Application Router.',
        'Author valid xs-app.json routing configurations with proper authentication scopes.',
        'Explain how the Approuter solves browser Same-Origin Policy (CORS) restrictions.',
        'Integrate custom BTP applications into SAP Build Work Zone and Fiori Launchpad.',
      ],
      steps: [
        {
          stepNumber: 1,
          title: 'The Single Point of Entry Architectural Pattern',
          subtitle: 'Why microservices must not be exposed directly to web browsers',
          explanation:
            'In a distributed cloud application, you might have: a static HTML/UI5 frontend container, a Node.js CAP service container, a Python AI microservice, and an on-premise S/4HANA system. If a user\'s web browser attempts to call these separate services directly, two major problems occur: 1) Cross-Origin Resource Sharing (CORS) blocks: Web browsers enforce the Same-Origin Policy; calling APIs across different domains or ports triggers security rejections. 2) Security Vulnerability: The browser would have to manage separate authentication tokens, cookies, and CORS headers for every microservice. The solution is the Single Point of Entry pattern implemented via the SAP Application Router.',
          keyIdea:
            'The Approuter is the single front door: browsers talk only to the Approuter; the Approuter authenticates the user and proxies requests to backend microservices.',
          taskInstruction: 'Review the Single Point of Entry diagram in the concept explanation.',
          hint: 'The Approuter serves both the HTML user interface and reverse-proxies API calls under one unified URL.',
        },
        {
          stepNumber: 2,
          title: 'The SAP Application Router (@sap/approuter)',
          subtitle: 'The enterprise reverse proxy for SAP BTP',
          explanation:
            'The SAP Application Router (`@sap/approuter`) is a lightweight Node.js-based reverse proxy provided by SAP. It handles four critical enterprise tasks: 1) Static File Serving: Serves UI5 HTML, CSS, and JavaScript bundles. 2) Authentication Gateway: Intercepts unauthenticated requests and redirects the browser to XSUAA/IAS for OAuth login. 3) Reverse Proxying: Forwards API calls to target backend microservices based on routing rules. 4) CSRF Protection: Manages the `X-CSRF-Token` handshake, protecting state-changing requests.',
          keyIdea:
            'The Approuter handles login redirects, session cookies, and reverse proxying so backend services remain clean microservices.',
          taskInstruction: 'Inspect the xs-app.json routing configuration in the technical example below.',
          hint: 'Approuter is available as both a standalone microservice container or as a BTP Managed Approuter service.',
        },
        {
          stepNumber: 3,
          title: 'Authoring xs-app.json: The Routing Blueprint',
          subtitle: 'Mapping URL paths to backend destinations',
          explanation:
            'The behavior of the Approuter is strictly governed by `xs-app.json`. Inside `routes`, you define an ordered array of route objects: 1) `source`: A regular expression matching the incoming URL path (e.g., `^/catalog/(.*)$`). 2) `target`: How the path is rewritten when forwarded (e.g., `/odata/v4/catalog/$1`). 3) `destination`: The named destination or BTP service instance hosting the backend. 4) `authenticationType`: `"xsuaa"` (requires logged-in user with valid JWT) or `"none"` (public route, e.g., images).',
          keyIdea:
            'Routes in xs-app.json are evaluated in order from top to bottom; the first matching regex wins.',
          taskInstruction: 'Examine the route ordering in the code example.',
          warning: 'Always place generic catch-all routes (like `^/(.*)$`) at the very bottom of the routes array.',
        },
        {
          stepNumber: 4,
          title: 'Solving CORS via Same-Origin Routing',
          subtitle: 'Why Approuter eliminates cross-origin errors forever',
          explanation:
            'Browser Same-Origin Policy forbids JavaScript on `https://ui.mycompany.com` from making `POST` requests to `https://backend.mycompany.com` unless complex CORS pre-flight headers are configured. Because the Approuter hosts the UI at `https://app.mycompany.com/` and exposes the API at `https://app.mycompany.com/api/...`, the browser sees both as originating from the exact same domain, protocol, and port. The browser considers all requests "Same-Origin", completely eliminating CORS pre-flight latency and cross-origin blocking errors.',
          keyIdea:
            'Because the browser only speaks to the Approuter domain, cross-origin security errors are eliminated completely.',
          taskInstruction: 'Verify that all frontend OData service URLs in manifest.json use relative paths (e.g., `/catalog/`).',
          hint: 'Never hardcode absolute URLs (like http://localhost:4004) in frontend production code.',
        },
        {
          stepNumber: 5,
          title: 'Integration into SAP Build Work Zone',
          subtitle: 'Embedding applications in the central corporate Launchpad',
          explanation:
            'In an enterprise, employees do not bookmark 50 separate URLs for 50 separate applications. They open SAP Build Work Zone (the modern SAP Fiori Launchpad). Work Zone provides a personalized central digital workplace: 1) Applications are registered as Fiori Tiles or Cards organized by business catalogs (Finance, Procurement, HR). 2) Clicking a tile launches the application seamlessly inside the common enterprise shell with unified header bars, user profiles, and notifications. 3) Applications deployed with an Approuter integrate natively into Work Zone via the BTP HTML5 Application Repository.',
          keyIdea:
            'SAP Build Work Zone provides a unified corporate launchpad where employees access all custom BTP and standard S/4HANA applications in one place.',
          taskInstruction: 'Complete the knowledge check questions below.',
          hint: 'Build Work Zone Standard Edition was previously known as the SAP Launchpad Service.',
        },
      ],
      diagramType: 'fiori-horizon',
      analogy: {
        concept: 'SAP Application Router (Approuter)',
        analogy: 'The Grand Hotel Concierge and Security Desk',
        explanation:
          'Imagine a luxurious 5-star hotel (your application architecture). Inside the hotel, there is a Kitchen (CAP Backend), an Art Gallery (Static UI5 Files), and an Executive Vault (SAP HANA Database). You do not allow random tourists from the street to wander freely into the kitchen or vault through back alley fire escapes (direct microservice access). Instead, every guest must enter through the Front Revolving Door into the Grand Lobby, where the Chief Concierge sits (the Approuter). 1) If the guest has no room key, the Concierge directs them to Registration to show ID (XSUAA Login). 2) If an authenticated guest asks for dinner, the Concierge calls the kitchen via internal private intercom and brings the food (reverse proxy). 3) The guest never knows the kitchen layout or internal telephone numbers; they only speak to the Concierge.',
        transition:
          'Where the concierge protects hotel facilities and assists guests, the Approuter protects backend microservices and proxies web traffic securely.',
      },
      conceptExplanation: {
        whatItIs:
          'The SAP Application Router (@sap/approuter) is a reverse proxy and entry-point service that serves static web assets, manages user authentication flows, enforces session cookies, and dispatches API requests to backend microservices.',
        whyItExists:
          'Modern cloud applications are partitioned into independent microservices. Exposing multiple microservices directly to client web browsers causes CORS security errors, complex authentication coordination, and vulnerability to CSRF attacks.',
        problemSolved:
          'Implements the Single Point of Entry pattern, eliminates browser Cross-Origin Resource Sharing (CORS) rejections, centralizes OAuth 2.0 authentication redirects, and manages CSRF protection tokens.',
        howItWorks:
          'The Approuter runs as a lightweight Node.js service. When a user requests a URL, the Approuter evaluates `xs-app.json`. If unauthenticated, it redirects to the XSUAA login page. Once logged in, it sets an encrypted session cookie in the browser, forwards API requests to backend destinations with an injected JWT Bearer token, and returns the response.',
        btpFit:
          'The Approuter is the standard entry-point architecture for all Multi-Target Applications (MTAs) and SAP Build Work Zone integrations on SAP BTP.',
      },
      jargonTerms: [
        {
          term: 'Approuter',
          simpleMeaning: 'The single front door reverse proxy that receives all web traffic, handles login, and forwards requests to backends.',
          familiarEquivalent: 'The reception security desk in an office building.',
        },
        {
          term: 'xs-app.json',
          simpleMeaning: 'The configuration file for Approuter that defines URL routing rules and security requirements.',
          familiarEquivalent: 'The building directory map directing visitors to Room 101 or Floor 4.',
        },
        {
          term: 'Reverse Proxy',
          simpleMeaning: 'A server that sits in front of backend servers and forwards client requests to those servers.',
          familiarEquivalent: 'A waiter taking your order to the kitchen so you don\'t walk into the kitchen yourself.',
        },
        {
          term: 'SAP Build Work Zone',
          simpleMeaning: 'The central corporate enterprise launchpad where employees access all Fiori apps and tiles.',
          familiarEquivalent: 'The smartphone home screen displaying app icons for all installed apps.',
        },
      ],
      technicalExample: {
        title: 'Production xs-app.json Routing Configuration for Approuter',
        language: 'json',
        code: `// xs-app.json - Application Router Routing Blueprint
{
  "welcomeFile": "/index.html",
  "authenticationMethod": "route",
  "routes": [
    {
      "source": "^/catalog/(.*)$",
      "target": "/odata/v4/catalog/$1",
      "destination": "srv-api",
      "authenticationType": "xsuaa",
      "csrfProtection": true
    },
    {
      "source": "^/user-api/currentUser$",
      "target": "/currentUser",
      "service": "sap-approuter-user-service",
      "authenticationType": "xsuaa"
    },
    {
      "source": "^/resources/(.*)$",
      "target": "/resources/$1",
      "authenticationType": "none",
      "destination": "ui5"
    },
    {
      "source": "^/(.*)$",
      "target": "$1",
      "localDir": "webapp",
      "authenticationType": "none"
    }
  ]
}`,
        purpose:
          'Demonstrates professional Approuter routing: forwarding OData APIs with XSUAA authentication and CSRF protection, querying current user identity, and serving local static UI5 web assets.',
        lineExplanations: [
          { lines: '2', explanation: 'welcomeFile: Default landing page served when accessing root URL.' },
          { lines: '3', explanation: 'authenticationMethod: "route" enforces per-route authentication rules.' },
          { lines: '6-12', explanation: 'OData Route: Intercepts /catalog/ and forwards to srv-api destination with XSUAA JWT injection and CSRF protection.' },
          { lines: '24-29', explanation: 'Static Fallback: Generic localDir rule placed at the very bottom to serve HTML/CSS/JS files.' },
        ],
        expectedOutput:
          'All web traffic routes cleanly under a single domain with automated authentication and zero browser CORS errors.',
        commonMistakes: [
          'Placing the catch-all `^/(.*)$` route at the top of the array, preventing subsequent API routes from ever matching.',
          'Disabling csrfProtection on state-modifying backend routes in production.',
        ],
      },
      businessScenario: {
        title: 'Corporate Procurement Suite Integration into SAP Build Work Zone',
        context:
          'A multi-national corporation needs to unify 15 custom BTP applications into a single corporate Fiori Launchpad for 20,000 employees.',
        workflowSteps: [
          'DevOps team deploys custom CAP Procurement service and UI5 web app using Approuter.',
          'Application is published to the BTP HTML5 Application Repository.',
          'Administrator opens SAP Build Work Zone Cockpit: imports the HTML5 app into the "Procurement Catalog".',
          'Assigns the tile to the corporate role collection "Global_Buyers".',
          'Buyers log in once to their corporate launchpad, click the "Purchase Orders" tile, and execute transactions seamlessly.',
        ],
        businessImpact:
          'Consolidates 15 disjointed software URLs into one secure, unified digital workplace, reducing employee navigation time by 45 minutes per week.',
      },
      practicalActivity:
        'Inspect your project `xs-app.json` file and verify that the API destination route precedes the localDir static assets route.',
      keyTakeaways: [
        'The Approuter implements the Single Point of Entry pattern, serving UI and proxying APIs under one domain.',
        'Using an Approuter eliminates browser Cross-Origin Resource Sharing (CORS) errors completely.',
        'Configure xs-app.json with specific API routes at the top and generic static fallback routes at the bottom.',
        'SAP Build Work Zone provides the unified corporate launchpad where custom BTP apps live as tiles.',
      ],
      quizQuestions: [
        {
          id: 'mod-4-3-q1',
          question:
            'How does placing an SAP Application Router (Approuter) in front of your frontend UI and backend microservices eliminate browser Cross-Origin Resource Sharing (CORS) errors?',
          options: [
            {
              id: 'a',
              text: 'Because the web browser communicates exclusively with the single Approuter domain (e.g. app.com/ for UI and app.com/api/ for APIs), the browser treats all requests as Same-Origin, completely bypassing cross-origin restrictions.',
              isCorrect: true,
              explanation:
                'Correct. The reverse proxy serves UI and APIs under a single origin, satisfying browser Same-Origin policies.',
            },
            {
              id: 'b',
              text: 'Because the Approuter disables the internet connection for 5 seconds.',
              isCorrect: false,
              explanation:
                'Incorrect. Disabling connections does not solve CORS.',
            },
            {
              id: 'c',
              text: 'Because CORS only applies to websites written in PHP.',
              isCorrect: false,
              explanation:
                'Incorrect. CORS is an international browser web security standard that applies universally.',
            },
            {
              id: 'd',
              text: 'Because the Approuter encrypts all files using Bitcoin.',
              isCorrect: false,
              explanation:
                'Incorrect. Approuter uses standard TLS/HTTPS, not cryptocurrency.',
            },
          ],
        },
        {
          id: 'mod-4-3-q2',
          question:
            'In an "xs-app.json" file with multiple routes, why must generic catch-all rules like "source": "^/(.*)$" always be placed at the very bottom of the routes array?',
          options: [
            {
              id: 'a',
              text: 'Because routes are evaluated in order from top to bottom: placing a catch-all route at the top would match every single URL, preventing subsequent backend API routes from ever executing.',
              isCorrect: true,
              explanation:
                'Correct. Route ordering is critical in xs-app.json; the first regular expression that matches the incoming path wins.',
            },
            {
              id: 'b',
              text: 'Because the JSON file parser crashes if files end with letters.',
              isCorrect: false,
              explanation:
                'Incorrect. JSON syntax permits any valid property order.',
            },
            {
              id: 'c',
              text: 'Because Cloud Foundry requires all files to be alphabetized.',
              isCorrect: false,
              explanation:
                'Incorrect. Cloud Foundry does not require alphabetization.',
            },
            {
              id: 'd',
              text: 'It does not matter; routes execute randomly in parallel.',
              isCorrect: false,
              explanation:
                'Incorrect. Routes are strictly evaluated sequentially from top to bottom.',
            },
          ],
        },
        {
          id: 'mod-4-3-q3',
          question:
            'What is the role of SAP Build Work Zone (formerly SAP Launchpad Service) in an enterprise SAP landscape?',
          options: [
            {
              id: 'a',
              text: 'It provides a centralized, personalized corporate digital workplace where employees access custom BTP applications, standard S/4HANA transactions, and third-party tools as interactive Fiori tiles.',
              isCorrect: true,
              explanation:
                'Correct. Work Zone is the central corporate launchpad unifying all enterprise cloud applications.',
            },
            {
              id: 'b',
              text: 'It is a mobile game designed to teach children how to build houses.',
              isCorrect: false,
              explanation:
                'Incorrect. Work Zone is an enterprise business launchpad platform.',
            },
            {
              id: 'c',
              text: 'It is a physical construction helmet worn by factory workers.',
              isCorrect: false,
              explanation:
                'Incorrect. Work Zone is enterprise cloud software.',
            },
            {
              id: 'd',
              text: 'It is a database backup software used only on mainframe computers.',
              isCorrect: false,
              explanation:
                'Incorrect. Work Zone is an end-user digital workplace, not database backup software.',
            },
          ],
        },
      ],
    },
  ],
};
