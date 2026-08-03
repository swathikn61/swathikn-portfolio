import Badge from '../components/Badge'
import Card from '../components/Card'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/content'

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 0.08}>
      <Card hover className="flex h-full flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="text-accent-800 dark:text-accent-400 text-lg font-semibold tracking-tight">
            {project.title}
          </h3>
          <Badge variant="accent">{project.tag}</Badge>
        </div>

        <p className="text-ink-600 dark:text-ink-400 mt-3 mb-6 text-sm leading-relaxed text-pretty">
          {project.description}
        </p>

        {/* mt-auto pins the stack row to the card bottom so it lines up across the grid. */}
        <div className="border-ink-100 dark:border-ink-800/70 mt-auto flex flex-wrap gap-2 border-t pt-5">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="ghost">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        description="A collection of projects where I've explored backend engineering, cloud, and AI."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
