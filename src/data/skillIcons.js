import {
  SiApachekafka,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiGit,
  SiGithubactions,
  SiJsonwebtokens,
  SiNodedotjs,
  SiOllama,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiSpringboot,
  SiSqlite,
  SiSwagger,
  SiTypescript,
} from 'react-icons/si'
import { FaAws, FaJs } from 'react-icons/fa'
import {
  BookOpenCheck,
  Boxes,
  Cpu,
  Database,
  GitBranch,
  Network,
  Puzzle,
  Repeat,
  Search,
  Sparkles,
  Workflow,
} from 'lucide-react'

/**
 * Maps a skill label (as written in content.js) to an icon and, for real
 * brand marks, that brand's own color. Anything without an official logo
 * (bare concepts, in-house AI terms) falls back to a neutral lucide icon
 * so the grid still reads as one system rather than a mix of styles.
 */
export const skillIcons = {
  // Languages
  'C++': { Icon: SiCplusplus, color: '#00599C' },
  Java: { Icon: SiOpenjdk, color: '#437291' },
  Python: { Icon: SiPython, color: '#3776AB' },
  JavaScript: { Icon: FaJs, color: '#F7DF1E' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  SQL: { Icon: Database },

  // Backend
  'Spring Boot': { Icon: SiSpringboot, color: '#6DB33F' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  'Express.js': { Icon: SiExpress, color: '#000000' },
  FastAPI: { Icon: SiFastapi, color: '#009688' },
  'REST APIs': { Icon: Network },
  Microservices: { Icon: Boxes },
  Kafka: { Icon: SiApachekafka, color: '#231F20' },
  JWT: { Icon: SiJsonwebtokens, color: '#000000' },

  // Databases & Caching
  PostgreSQL: { Icon: SiPostgresql, color: '#4169E1' },
  Redis: { Icon: SiRedis, color: '#FF4438' },
  FAISS: { Icon: Search },
  SQLite: { Icon: SiSqlite, color: '#003B57' },

  // Cloud & DevOps
  'AWS EC2': { Icon: FaAws, color: '#FF9900' },
  'AWS S3': { Icon: FaAws, color: '#FF9900' },
  'AWS Lambda': { Icon: FaAws, color: '#FF9900' },
  Docker: { Icon: SiDocker, color: '#2496ED' },
  'GitHub Actions': { Icon: SiGithubactions, color: '#2088FF' },
  'CI/CD': { Icon: Workflow },

  // AI / ML
  LangChain: { Icon: Sparkles },
  LangGraph: { Icon: Workflow },
  RAG: { Icon: BookOpenCheck },
  Ollama: { Icon: SiOllama, color: '#000000' },
  Embeddings: { Icon: Boxes },
  'LLM-as-judge': { Icon: Sparkles },

  // Tools & Practices
  Git: { Icon: SiGit, color: '#F05032' },
  'Agile / Scrum': { Icon: Repeat },
  'Unit Testing': { Icon: BookOpenCheck },
  'OpenAPI / Swagger': { Icon: SiSwagger, color: '#85EA2D' },

  // Core Concepts
  'Data Structures & Algorithms': { Icon: GitBranch },
  'System Design': { Icon: Boxes },
  OOP: { Icon: Puzzle },
  DBMS: { Icon: Database },
  'Operating Systems': { Icon: Cpu },
  'Computer Networks': { Icon: Network },
}
