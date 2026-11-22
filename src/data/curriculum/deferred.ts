import { DeferredTopic } from '../../types/curriculum';

export const DEFERRED_TOPICS: DeferredTopic[] = [
  {
    id: 'deferred-java-services',
    title: 'Java Services',
    description:
      'Enterprise Java development for SAP BTP, utilizing Spring Boot and the SAP Cloud Application Programming Model for Java.',
    subtopics: [
      'Java language basics and enterprise memory management',
      'Spring Boot framework fundamentals',
      'Dependency injection and inversion of control',
      'REST controllers and request mapping',
      'Configuration management in Cloud Foundry',
      'Structured application logging with SLF4J',
      'CAP Java SDK (cds4j) architecture and event handlers',
    ],
    revisitWhen:
      'Revisit when an enterprise client team mandates CAP on Java or requires integration with legacy Spring Boot microservices.',
  },
  {
    id: 'deferred-kyma-kubernetes',
    title: 'Kyma and Kubernetes',
    description:
      'Container-native application development and deployment using open-source Kubernetes and SAP BTP Kyma runtime.',
    subtopics: [
      'Kubernetes cluster architecture and API primitives',
      'Namespaces, Pods, Deployments, and Services',
      'Ingress controllers and API gateways',
      'ConfigMaps and Kubernetes Secrets management',
      'Helm charts packaging and release lifecycle',
      'Health, readiness, and liveness probes',
      'Container images and multi-stage Docker builds',
      'Kubernetes declarative manifests and GitOps',
    ],
    revisitWhen:
      'Revisit when a project deploys to the SAP BTP Kyma runtime or demands polyglot containerized workloads beyond Cloud Foundry.',
  },
  {
    id: 'deferred-api-management',
    title: 'API Management',
    description:
      'Enterprise API lifecycle governance, security policies, rate-limiting, and developer portal publication on SAP Integration Suite.',
    subtopics: [
      'API proxies and endpoint virtualization',
      'Pre-flow and post-flow policy execution',
      'Rate limiting, quotas, and spike arrests',
      'OAuth 2.0 policy enforcement and API key verification',
      'API product bundling and monetization',
      'Developer portal publishing and documentation',
      'Real-time API analytics, monitoring, and SLA tracking',
    ],
    revisitWhen:
      'Revisit when your organization must expose internal SAP APIs securely to external partners or public consumers.',
  },
  {
    id: 'deferred-event-driven-integration',
    title: 'Event-Driven Integration',
    description:
      'Asynchronous, loosely-coupled event streaming and messaging using SAP Event Mesh and CloudEvents standards.',
    subtopics: [
      'SAP Event Mesh architecture and message brokers',
      'Queues, topics, and topic hierarchies',
      'Publishers, subscribers, and fan-out topologies',
      'Dead-letter queues and automated retry handling',
      'CloudEvents 1.0 JSON specification',
      'Consuming S/4HANA enterprise business events',
      'Webhook subscriptions and event delivery guarantees',
    ],
    revisitWhen:
      'Revisit when an integration demands high-throughput, asynchronous event-driven architectures and decoupled background processing.',
  },
  {
    id: 'deferred-scale-and-reliability',
    title: 'Scale and Reliability',
    description:
      'Production high-availability engineering, horizontal container autoscaling, performance profiling, and fault tolerance.',
    subtopics: [
      'Instance sizing and container memory limits',
      'Horizontal autoscaling rules based on CPU and latency',
      'Cloud Foundry resource quotas and disk allocations',
      'Automated load testing and capacity planning',
      'Graceful shutdown and connection draining',
      'Circuit breakers and bulkhead resilience patterns',
      'Timeouts, exponential backoff, and retry budgets',
    ],
    revisitWhen:
      'Revisit when your deployed cloud service encounters significant concurrent traffic or strict enterprise enterprise uptime SLAs.',
  },
  {
    id: 'deferred-advanced-architecture',
    title: 'Advanced Architecture',
    description:
      'Principles of distributed systems, domain-driven design, clean core extensions, and cost optimization on cloud platforms.',
    subtopics: [
      'Twelve-Factor application methodology',
      'Stateless services and session replication',
      'API-first contract design',
      'Microservices versus modular monolith trade-offs',
      'Bounded contexts and domain boundaries',
      'Runtime selection: Cloud Foundry versus Kyma versus ABAP Environment',
      'Data ownership and CQRS patterns',
      'Enterprise security architecture and threat modeling',
      'Cloud cost optimization and commercial model trade-offs',
    ],
    revisitWhen:
      'Revisit after you have shipped and operated the capstone for several months and are stepping into lead cloud architect roles.',
  },
];
