import { Chapter } from '../../types/curriculum';

export const MODULE_4_CHAPTERS: Chapter[] = [
  {
    id: 'ch-4-1',
    moduleId: 'module-4',
    order: 1,
    number: '4.1',
    title: 'Multi-Target Applications (MTA) & Packaging',
    subtitle: 'The gold standard for packaging distributed microservices and database deployers',
    estimatedMinutes: 9,
    summary:
      'Master Multi-Target Applications (MTA): the enterprise packaging standard that bundles frontends, Node.js/Java backends, and database deployers into a single `.mtar` archive orchestrated by `mta.yaml`.',
    learningObjectives: [
      'Explain what a Multi-Target Application (MTA) is and why it exists.',
      'Understand the 3 core building blocks of `mta.yaml`: Modules, Resources, and Dependencies.',
      'Build a deployable `.mtar` archive using the Cloud MTA Build Tool (`mbt`).',
    ],
    analogy: {
      concept: 'MTA Architecture',
      analogy: 'A Flat-Pack Furniture Assembly Kit (e.g. IKEA)',
      explanation:
        'When you buy a wardrobe, it comes in a single sealed flat box (`.mtar`). Inside are distinct modules: wooden panels (the database deployer), hinges and doors (the backend service), and mirrors/handles (the frontend UI). Also inside is the step-by-step assembly manual (`mta.yaml`): it tells you that the frame (database) must be erected first before attaching the doors (backend), and that handle screws (service keys) must be bound into pre-drilled holes.',
      transition:
        'An MTA packages diverse technologies (HTML5, Node.js, HANA tables, XSUAA) into a single archive with an explicit dependency order so cloud engines deploy the whole system reliably.',
    },
    conceptExplanation: {
      whatItIs:
        'A Multi-Target Application (MTA) is an SAP standard for defining, building, and deploying multi-module cloud applications with multiple runtimes sharing the same lifecycle.',
      whyItExists:
        'Deploying a distributed application manually requires running 8 separate commands in the exact right order (create database service, wait for provision, inject credentials, deploy backend, deploy Approuter). One mistake breaks the entire system.',
      problemSolved:
        'Automates dependency resolution, service instance provisioning, and credential binding in a single transactional deployment.',
      howItWorks:
        'The developer authors `mta.yaml`. Running `mbt build` compiles all modules into an `archive.mtar`. Running `cf deploy archive.mtar` reads the manifest and orchestrates zero-downtime blue-green deployments.',
      btpFit:
        'MTA is the universal packaging and deployment standard across all SAP BTP environments.',
    },
    diagramType: 'mta-lifecycle',
    jargonTerms: [
      {
        term: 'mta.yaml',
        simpleMeaning: 'The deployment recipe describing all modules, services, and required dependencies.',
        familiarEquivalent: 'A `docker-compose.yml` or Kubernetes Helm chart values file.',
      },
      {
        term: '.mtar Archive',
        simpleMeaning: 'A single zip archive containing all compiled binaries and the deployment manifest.',
        familiarEquivalent: 'A `.jar` file or bundled zip package ready for production release.',
      },
      {
        term: 'Resource',
        simpleMeaning: 'A cloud service provisioned by BTP (like HANA Cloud, XSUAA, or Destination).',
        familiarEquivalent: 'An AWS managed service (like Amazon RDS or SQS queue) bound to your container.',
      },
    ],
    technicalExample: {
      title: 'Production `mta.yaml` Manifest for a Full-Stack CAP Application',
      language: 'yaml',
      code: `_schema-version: '3.1'
ID: leave-management-system
version: 1.0.0
description: "Leave Management System on SAP BTP"

modules:
  # 1. Backend CAP Service Module
  - name: leave-srv
    type: nodejs
    path: gen/srv
    requires:
      - name: leave-db
      - name: leave-auth
    provides:
      - name: srv-api
        properties:
          srv-url: \${default-url}

  # 2. Database Deployer Module
  - name: leave-db-deployer
    type: hdb
    path: gen/db
    requires:
      - name: leave-db

resources:
  # Managed HANA Database Container
  - name: leave-db
    type: com.sap.xs.hdi-container
    parameters:
      service: hana
      service-plan: hdi-shared

  # Managed Security Broker
  - name: leave-auth
    type: org.cloudfoundry.managed-service
    parameters:
      service: xsuaa
      service-plan: application
      path: ./xs-security.json`,
      purpose:
        'Demonstrates an orchestrated manifest linking a Node.js backend container to an HDI HANA database container and an XSUAA security instance.',
      lineExplanations: [
        { lines: '7-15', explanation: 'Declares the Node.js backend module and specifies that it requires `leave-db` and `leave-auth`.' },
        { lines: '18-22', explanation: 'Database deployer module runs automatically on deployment to apply schema migrations to HANA.' },
        { lines: '25-36', explanation: 'Resources declare cloud services that Cloud Foundry must automatically provision if they don\'t exist.' },
      ],
      expectedOutput:
        '`mbt build` creates `mta_archives/leave-management-system_1.0.0.mtar` ready for `cf deploy`.',
      commonMistakes: [
        'Incorrect YAML indentation (YAML requires exact 2-space indentation).',
        'Referencing a resource name in `requires` that does not exist in the `resources` section.',
      ],
    },
    businessScenario: {
      title: 'Zero-Downtime Release of Healthcare Patient Portal',
      context:
        'A hospital network needs to deploy a major software update to their patient appointment system on Friday evening without disconnecting emergency room staff.',
      workflowSteps: [
        'CI/CD pipeline builds `hospital-portal_2.0.0.mtar`.',
        'Cloud Foundry deployer inspects `mta.yaml` and deploys new version alongside old version (blue-green).',
        'Database migrations run safely without dropping active tables.',
        'Router seamlessly flips traffic to the new version with zero patient portal downtime.',
      ],
      businessImpact:
        'Zero patient care disruption; eliminates need for 2:00 AM weekend maintenance downtime.',
    },
    quizQuestions: [
      {
        id: 'q-4-1-1',
        question: 'What is the role of `mta.yaml` in an SAP BTP project?',
        options: [
          {
            id: 'opt-a',
            text: 'It describes all application modules, cloud service resources, and deployment dependency order in a single manifest.',
            isCorrect: true,
            explanation: 'Correct! `mta.yaml` is the deployment recipe that orchestrates multi-module applications on SAP BTP.',
          },
          {
            id: 'opt-b',
            text: 'It translates English audio recordings into text.',
            isCorrect: false,
            explanation: '`mta.yaml` is a deployment configuration descriptor.',
          },
          {
            id: 'opt-c',
            text: 'It deletes all code files from GitHub.',
            isCorrect: false,
            explanation: 'It configures deployment, not git deletion.',
          },
          {
            id: 'opt-d',
            text: 'It only runs on desktop calculators.',
            isCorrect: false,
            explanation: 'It is parsed by the Cloud MTA Build Tool and Cloud Foundry deployers.',
          },
        ],
      },
      {
        id: 'q-4-1-2',
        question: 'What command compiles a CAP project into a deployable `.mtar` archive file?',
        options: [
          {
            id: 'opt-a',
            text: '`mbt build` (Cloud MTA Build Tool)',
            isCorrect: true,
            explanation: 'Correct! `mbt build` parses `mta.yaml` and bundles compiled binaries into an `.mtar` archive.',
          },
          {
            id: 'opt-b',
            text: '`git push --force`',
            isCorrect: false,
            explanation: 'Git push transmits code to version control; it does not build MTAR archives.',
          },
          {
            id: 'opt-c',
            text: '`rm -rf *`',
            isCorrect: false,
            explanation: 'This dangerous command deletes local files.',
          },
          {
            id: 'opt-d',
            text: '`cf logout`',
            isCorrect: false,
            explanation: '`cf logout` ends a terminal CLI session.',
          },
        ],
      },
      {
        id: 'q-4-1-3',
        question: 'In `mta.yaml`, what is the difference between a `module` and a `resource`?',
        options: [
          {
            id: 'opt-a',
            text: 'A `module` is code you build and deploy (e.g. Node.js backend); a `resource` is a cloud service provisioned by BTP (e.g. HANA DB, XSUAA).',
            isCorrect: true,
            explanation: 'Correct! Modules are deployable application components; resources are managed service bindings.',
          },
          {
            id: 'opt-b',
            text: 'They are synonyms with zero technical difference.',
            isCorrect: false,
            explanation: 'Modules execute code; resources represent infrastructure instances.',
          },
          {
            id: 'opt-c',
            text: 'Modules are for graphics; resources are for fonts.',
            isCorrect: false,
            explanation: 'Both represent software components and cloud infrastructure.',
          },
          {
            id: 'opt-d',
            text: 'Resources cannot be used on Cloud Foundry.',
            isCorrect: false,
            explanation: 'Resources are actively bound to Cloud Foundry containers.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'MTA packages multi-tier applications into a single `.mtar` archive.',
      '`mta.yaml` orchestrates deployment order (database first, then backend, then router).',
      'The Cloud MTA Build Tool (`mbt`) automates compilation and dependency resolution.',
    ],
    practicalActivity:
      'Inspect an `mta.yaml` file and trace the dependency chain from the Approuter down to the HANA database container.',
  },
  {
    id: 'ch-4-2',
    moduleId: 'module-4',
    order: 2,
    number: '4.2',
    title: 'Cloud Foundry CLI & Deployment Lifecycle',
    subtitle: 'From local code to running enterprise containers with zero-downtime releases',
    estimatedMinutes: 9,
    summary:
      'Master the Cloud Foundry CLI (`cf`): learn how buildpacks compile droplets, inspect running applications with `cf apps`, and understand the complete cloud deployment lifecycle from code staging to container health checks.',
    learningObjectives: [
      'Master essential Cloud Foundry commands (`cf login`, `cf push`, `cf apps`, `cf logs`).',
      'Understand how buildpacks detect technologies and compile execution droplets.',
      'Explain application lifecycle stages: staging, starting, health checks, and running.',
    ],
    analogy: {
      concept: 'Cloud Foundry Buildpacks',
      analogy: 'An Automated Cargo Container Loading Dock',
      explanation:
        'When you deliver raw loose cargo (your Node.js source files) to a shipping dock, dock workers don’t make you build a ship. The dock foreman inspects your cargo, says: "This is Node.js! I will provide a standard certified steel shipping container (Buildpack), install the exact runtime engine, seal the container (Droplet), and hoist it onto the cargo vessel (Diego Cell container runner)." All you did was deliver the code.',
      transition:
        'With Cloud Foundry, developers focus on writing business code without having to maintain Linux OS kernels, Dockerfiles, or security patches.',
    },
    conceptExplanation: {
      whatItIs:
        'Cloud Foundry is the open-source Platform-as-a-Service (PaaS) runtime environment powering SAP BTP. The `cf` CLI is the command-line tool developers use to manage apps, service instances, and domains.',
      whyItExists:
        'Managing raw virtual machines or manual Docker containers requires dedicated DevOps teams to handle OS patching, security hardening, and load balancer wiring.',
      problemSolved:
        'Enables developer self-service: one command (`cf push` or `cf deploy`) takes raw code, builds containers, wires up routing URLs, and scales instances automatically.',
      howItWorks:
        'When code is pushed, the Cloud Controller detects the technology via Buildpack (e.g. `nodejs_buildpack`), installs dependencies (`npm install --production`), packages a Droplet, and starts the container with automated HTTP health checks.',
      btpFit:
        'Cloud Foundry is the primary runtime for standard SAP CAP microservices, Fiori Approuters, and enterprise APIs on SAP BTP.',
    },
    diagramType: 'cf-deployment',
    jargonTerms: [
      {
        term: 'Buildpack',
        simpleMeaning: 'A script that examines your code, downloads the runtime (Node.js/Java), and builds the container.',
        familiarEquivalent: 'An automated Dockerfile generator that chooses the best base image for you.',
      },
      {
        term: 'Droplet',
        simpleMeaning: 'The compiled, sealed package containing your code, dependencies, and runtime engine ready to run.',
        familiarEquivalent: 'A compiled Docker image ready to be spun up as a container.',
      },
      {
        term: 'Health Check',
        simpleMeaning: 'An automated ping to verify the application has started and is responding before routing traffic.',
        familiarEquivalent: 'Kubernetes readiness and liveness probes.',
      },
    ],
    technicalExample: {
      title: 'Essential Cloud Foundry Command Cheat Sheet',
      language: 'bash',
      code: `# 1. Log in to SAP BTP Cloud Foundry environment
cf login -a https://api.cf.eu10.hana.ondemand.com --sso

# 2. View all running applications, memory usage, and URLs in current space
cf apps

# 3. View all provisioned cloud services (HANA, XSUAA, Destinations)
cf services

# 4. Tail real-time streaming application logs (critical for debugging)
cf logs leave-srv

# 5. Retrieve the last 200 log lines from a crashed application
cf logs leave-srv --recent

# 6. Restart an application after updating an environment variable
cf restart leave-srv`,
      purpose:
        'Provides the primary commands every BTP developer runs daily to manage and inspect running cloud applications.',
      lineExplanations: [
        { lines: '2', explanation: 'Authenticates with enterprise single sign-on.' },
        { lines: '5', explanation: 'Lists all active containers, their disk/RAM quotas, and public route URLs.' },
        { lines: '11', explanation: 'Streams live console outputs, HTTP requests, and unhandled errors.' },
        { lines: '14', explanation: 'Extracts recent logs from the buffer to identify why a crashed app died.' },
      ],
      expectedOutput:
        `Getting apps in org MyOrg / space dev as developer...\nname         requested state   instances   memory   disk   urls\nleave-srv    started           1/1         512M     1G     leave-srv.cfapps.eu10.hana.ondemand.com`,
      commonMistakes: [
        'Trying to run `cf logs` without specifying the exact application name.',
        'Not checking `cf apps` to confirm whether an application is in `started` or `crashed` state.',
      ],
    },
    businessScenario: {
      title: 'Scaling an HR Application for Annual Open Enrollment',
      context:
        'During benefits open enrollment week, 50,000 employees log into the HR portal simultaneously.',
      workflowSteps: [
        'DevOps engineer checks container metrics using `cf apps`.',
        'Engineer executes `cf scale hr-portal-srv -i 5 -m 1G`.',
        'Cloud Foundry spins up 4 additional container instances in 15 seconds.',
        'Load balancer distributes employee traffic evenly across all 5 containers with zero downtime.',
      ],
      businessImpact:
        'Handles a 500% traffic spike smoothly without site crashes or payroll data corruption.',
    },
    quizQuestions: [
      {
        id: 'q-4-2-1',
        question: 'What is a Cloud Foundry "Buildpack"?',
        options: [
          {
            id: 'opt-a',
            text: 'A physical backpack given to developers on their first day of work.',
            isCorrect: false,
            explanation: 'Buildpacks are software scripts in Cloud Foundry.',
          },
          {
            id: 'opt-b',
            text: 'A system that automatically detects your application code (e.g. Node.js), installs dependencies, and compiles the execution droplet.',
            isCorrect: true,
            explanation: 'Correct! Buildpacks free developers from writing and maintaining low-level Dockerfiles.',
          },
          {
            id: 'opt-c',
            text: 'A tool that deletes code after deployment.',
            isCorrect: false,
            explanation: 'Buildpacks assemble the runtime droplet.',
          },
          {
            id: 'opt-d',
            text: 'A video game console.',
            isCorrect: false,
            explanation: 'Buildpacks are cloud automation tools.',
          },
        ],
      },
      {
        id: 'q-4-2-2',
        question: 'Which Cloud Foundry command retrieves recent log output from an application that crashed on startup?',
        options: [
          {
            id: 'opt-a',
            text: '`cf logs <app-name> --recent`',
            isCorrect: true,
            explanation: 'Correct! The `--recent` flag dumps the buffered crash logs to your terminal so you can diagnose the error.',
          },
          {
            id: 'opt-b',
            text: '`cf delete-everything`',
            isCorrect: false,
            explanation: 'There is no such command.',
          },
          {
            id: 'opt-c',
            text: '`git checkout main`',
            isCorrect: false,
            explanation: 'Git commands manage local version control, not Cloud Foundry container runtime logs.',
          },
          {
            id: 'opt-d',
            text: '`cf logout`',
            isCorrect: false,
            explanation: '`cf logout` logs you out without showing logs.',
          },
        ],
      },
      {
        id: 'q-4-2-3',
        question: 'What happens during the "Health Check" phase of Cloud Foundry application startup?',
        options: [
          {
            id: 'opt-a',
            text: 'The server verifies that the developer has had 8 hours of sleep.',
            isCorrect: false,
            explanation: 'Health checks monitor application container responsiveness.',
          },
          {
            id: 'opt-b',
            text: 'Cloud Foundry pings the application’s HTTP port or process to verify it is responsive before routing real user traffic to it.',
            isCorrect: true,
            explanation: 'Correct! Health checks prevent broken or booting containers from receiving live user traffic.',
          },
          {
            id: 'opt-c',
            text: 'The cloud shuts down the internet connection permanently.',
            isCorrect: false,
            explanation: 'Health checks guarantee smooth routing.',
          },
          {
            id: 'opt-d',
            text: 'It checks if the computer monitor is turned on.',
            isCorrect: false,
            explanation: 'Health checks verify server process health.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'The `cf` CLI is the primary management tool for BTP Cloud Foundry environments.',
      'Buildpacks compile source code into execution droplets automatically.',
      'Use `cf logs <app> --recent` to inspect crash traces and diagnose failures.',
    ],
    practicalActivity:
      'Practice interpreting `cf apps` terminal output to identify container memory consumption and public routing URLs.',
  },
  {
    id: 'ch-4-3',
    moduleId: 'module-4',
    order: 3,
    number: '4.3',
    title: 'Troubleshooting, Logging & Production Debugging',
    subtitle: 'Diagnosing HTTP 401, 403, 404, 500, 502, 503 and crash loops like a senior engineer',
    estimatedMinutes: 9,
    summary:
      'Learn systematic production debugging: decode HTTP status codes (401, 403, 404, 500, 502, 503), trace destination failures, analyze memory exhaustion (OOM), and locate root causes using Cloud Foundry logs.',
    learningObjectives: [
      'Diagnose the exact root cause of enterprise HTTP errors: 401, 403, 404, 500, 502, and 503.',
      'Differentiate between application code errors (500) and infrastructure/gateway timeouts (502/503).',
      'Diagnose out-of-memory (OOM) crashes and broken BTP destination configurations.',
    ],
    analogy: {
      concept: 'Production Diagnostic Logging',
      analogy: 'An Aircraft Flight Data Recorder (The Black Box)',
      explanation:
        'When an airplane engine sputters at 30,000 feet, technicians don’t guess by guessing in the dark. They download the flight data recorder: exact timestamps, fuel line pressure readings, valve positions, and electrical voltages. Cloud Foundry logs (`cf logs --recent`) are your application black box: every uncaught promise rejection, memory spike, and database timeout is timestamped with microscopic precision.',
      transition:
        'Senior engineers never say "the server is broken". They inspect the HTTP status code and log trace to pinpoint the exact broken component in seconds.',
    },
    conceptExplanation: {
      whatItIs:
        'Enterprise troubleshooting is the systematic methodology of identifying, isolating, and resolving production failures across the web layer, Approuter, microservices, and databases.',
      whyItExists:
        'Distributed cloud systems involve multiple moving parts (browser, reverse proxy, auth broker, microservice, remote database). When an error occurs, inexperienced developers waste hours guessing where the failure occurred.',
      problemSolved:
        'Provides an instant decision tree to determine whether a failure is caused by expired tokens (401), missing roles (403), wrong URLs (404), JavaScript crashes (500), or proxy timeouts/crashes (502/503).',
      howItWorks:
        'By analyzing the HTTP response code alongside `cf logs <app> --recent`, developers immediately identify which tier originated the error and fix it with surgical precision.',
      btpFit:
        'Mastering these diagnostics is the final milestone transforming a beginner student into a production-ready SAP BTP developer.',
    },
    diagramType: 'http-troubleshooting',
    jargonTerms: [
      {
        term: 'HTTP 502 Bad Gateway',
        simpleMeaning: 'The reverse proxy (Approuter) reached the server, but the backend crashed or died before answering.',
        familiarEquivalent: 'A receptionist answers your phone call, puts you on hold to connect you to an office, but the office phone was unplugged.',
      },
      {
        term: 'HTTP 503 Service Unavailable',
        simpleMeaning: 'The server is overloaded or down for maintenance and cannot handle requests right now.',
        familiarEquivalent: 'A restaurant putting up a "Temporarily Closed for Cleaning" sign on the door.',
      },
      {
        term: 'Out of Memory (OOM)',
        simpleMeaning: 'The container exceeded its allocated RAM limit and was killed by the cloud operating system.',
        familiarEquivalent: 'A computer freezing and restarting because you opened 500 browser tabs simultaneously.',
      },
    ],
    technicalExample: {
      title: 'Enterprise HTTP Status Code Diagnostic Matrix',
      language: 'markdown',
      code: `| HTTP Code | Technical Meaning | Probable Root Cause in SAP BTP | Immediate Diagnostic Step |
|---|---|---|---|
| **401** | Unauthorized | Missing, malformed, or expired JWT token | Inspect authorization header; re-authenticate via Approuter |
| **403** | Forbidden | Token is valid, but user lacks required Scope/Role | Check Role Collection assignment in BTP Cockpit |
| **404** | Not Found | Target endpoint or entity key does not exist | Verify service URL route or database entity ID |
| **500** | Internal Server Error | Uncaught exception or null-pointer in Node.js code | Run \`cf logs <app> --recent\` to see stack trace |
| **502** | Bad Gateway | Backend container crashed or failed to respond | Check if container is crashing on boot or ran out of RAM |
| **503** | Service Unavailable | Service is overloaded or route registration pending | Check \`cf apps\` to ensure instances are 1/1 started |`,
      purpose:
        'Provides an instant reference table mapping HTTP status codes directly to BTP root causes and corrective actions.',
      lineExplanations: [
        { lines: '3', explanation: '401 is always an authentication / token problem.' },
        { lines: '4', explanation: '403 is an authorization / permission role problem.' },
        { lines: '6', explanation: '500 indicates a bug in your JavaScript / Java code.' },
        { lines: '7-8', explanation: '502/503 indicates an infrastructure, proxy, or container crash problem.' },
      ],
      expectedOutput:
        'Developers diagnose the root cause in under 60 seconds without random trial-and-error.',
      commonMistakes: [
        'Confusing 401 (Authentication) with 403 (Authorization).',
        'Blaming the network for a 500 error when it is actually an unhandled null exception in backend code.',
      ],
    },
    businessScenario: {
      title: 'Post-Deployment Out-of-Memory (OOM) Crisis Resolution',
      context:
        'Immediately after a midnight release, users report that opening the sales portal returns "502 Bad Gateway".',
      workflowSteps: [
        'Developer runs `cf apps` and notices container state: `0/1 crashed`.',
        'Developer executes `cf logs leave-srv --recent` and spots: `[CELL/0] Out of memory: Kill process (PID 14)`.',
        'Root cause identified: The app allocated 256MB RAM, but loaded a 300MB Excel template on boot.',
        'Developer scales container: `cf scale leave-srv -m 1G` and re-deploys in 2 minutes.',
        'Status changes to `1/1 started`, and 502 Bad Gateway disappears immediately.',
      ],
      businessImpact:
        'Incident resolved in 4 minutes, preventing an executive escalation and customer service backlog.',
    },
    quizQuestions: [
      {
        id: 'q-4-3-1',
        question: 'A user attempts to view a report and sees "HTTP 502 Bad Gateway". What does this specifically indicate in a BTP architecture?',
        options: [
          {
            id: 'opt-a',
            text: 'The Approuter / reverse proxy could not communicate with the backend microservice because the backend container crashed or is not listening on the expected port.',
            isCorrect: true,
            explanation: 'Correct! 502 Bad Gateway means the gateway reached out to the backend container, but the backend dropped or never returned a response.',
          },
          {
            id: 'opt-b',
            text: 'The user’s monitor cable is unplugged.',
            isCorrect: false,
            explanation: 'The user received an HTTP 502 status code over the network, so the monitor is clearly working.',
          },
          {
            id: 'opt-c',
            text: 'The user typed their password incorrectly.',
            isCorrect: false,
            explanation: 'Password errors produce HTTP 401 Unauthorized, not 502.',
          },
          {
            id: 'opt-d',
            text: 'The database has deleted all customer records.',
            isCorrect: false,
            explanation: '502 is a proxy/gateway communication failure with the application container.',
          },
        ],
      },
      {
        id: 'q-4-3-2',
        question: 'What is the first command you should execute in your terminal when a deployed BTP application crashes unexpectedly?',
        options: [
          {
            id: 'opt-a',
            text: '`cf logs <app-name> --recent`',
            isCorrect: true,
            explanation: 'Correct! Tailing recent logs dumps the uncaught exception, stack trace, or OOM kernel kill notice.',
          },
          {
            id: 'opt-b',
            text: '`git reset --hard HEAD~10`',
            isCorrect: false,
            explanation: 'Blindly wiping 10 commits without diagnosing the error destroys valuable work.',
          },
          {
            id: 'opt-c',
            text: '`format C:`',
            isCorrect: false,
            explanation: 'Formatting your drive is catastrophic and does not diagnose cloud errors.',
          },
          {
            id: 'opt-d',
            text: 'Turn off your home router.',
            isCorrect: false,
            explanation: 'The crash is on the cloud container, not your home router.',
          },
        ],
      },
      {
        id: 'q-4-3-3',
        question: 'An application log displays: `[CELL/0] Out of memory: Kill process (PID 21)`. How should this issue be resolved?',
        options: [
          {
            id: 'opt-a',
            text: 'Scale the application container memory limit using `cf scale <app> -m <new-memory>` (or in `mta.yaml`) and investigate any memory leaks in code.',
            isCorrect: true,
            explanation: 'Correct! Increasing the allocated memory quota gives the container headroom while developers optimize memory usage.',
          },
          {
            id: 'opt-b',
            text: 'Disable all logging and pretend the error never occurred.',
            isCorrect: false,
            explanation: 'Ignoring memory crashes causes continuous container death cycles.',
          },
          {
            id: 'opt-c',
            text: 'Delete the database.',
            isCorrect: false,
            explanation: 'The application container ran out of RAM, not the database.',
          },
          {
            id: 'opt-d',
            text: 'Convert all code to plain text textfiles.',
            isCorrect: false,
            explanation: 'Appropriate container memory allocation solves OOM issues.',
          },
        ],
      },
    ],
    keyTakeaways: [
      'Learn the HTTP code matrix: 401 (AuthN), 403 (AuthZ), 404 (Route), 500 (Code), 502/503 (Gateway/OOM).',
      '`cf logs <app> --recent` is your flight data recorder for root-cause diagnosis.',
      'OOM crashes require scaling memory limits (`cf scale -m 1G`) and eliminating memory leaks.',
    ],
    practicalActivity:
      'Given an error log showing an unhandled promise rejection at line 42 of a service handler, identify the targeted fix.',
  },
];
