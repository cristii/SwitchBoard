import Link from "next/link";
import { AuthRequired } from "../../../components/auth-required";
import { Badge, Eyebrow, HandUnderline, Stat } from "../../../components/ds";
import { Icon } from "../../../components/icons";
import { AuthRequiredError, getProjects } from "../../../lib/api";
import {
  difficultyText,
  difficultyVariant,
  platformIcon,
  platformName,
  relativeTime,
  scoreColor
} from "../../../lib/view-models";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  try {
    const { projects, stats } = await getProjects();

    return (
      <section className="screen" data-screen-label="Library">
        <div className="hero-row" style={{ marginBottom: 6 }}>
          <div>
            <Eyebrow>Your library</Eyebrow>
            <h1 className="page-title">
              Build a bot. Break it.
              <br />
              Learn <HandUnderline>what holds.</HandUnderline>
            </h1>
          </div>
          <div className="note">
            &rarr; every project runs on real API calls &mdash; not pretend ones
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <Stat value={String(stats.projectCount)} label="Chatbots in your library" />
          </div>
          <div className="stat-card">
            <Stat
              value={`${stats.averageScore}%`}
              label="Average validation score"
              color="#3F7A4E"
            />
          </div>
          <div className="stat-card">
            <Stat
              value={String(stats.channelsPractised)}
              label="Channels practised"
              color="#B45309"
            />
          </div>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <Icon name="search" size={17} />
            <input placeholder="Search your chatbots..." readOnly />
          </div>
          <div className="count-label">{projects.length} projects</div>
        </div>

        <div className="card-grid">
          <Link className="start-card" href="/new">
            <div className="big-plus">
              <Icon name="plus" size={24} />
            </div>
            <div className="card-title">Start a new project</div>
            <div className="card-copy" style={{ maxWidth: 200 }}>
              Pick a channel, get an AI scenario, start building in seconds.
            </div>
          </Link>

          {projects.map((project) => (
            <Link className="project-card" href={`/projects/${project.id}`} key={project.id}>
              <div className="card-head">
                <div className="platform-head">
                  <div className="icon-tile">
                    <Icon name={platformIcon(project.channel)} size={21} />
                  </div>
                  <div className="platform-name">{platformName(project.channel)}</div>
                </div>
                <Badge variant={difficultyVariant(project.difficulty)}>
                  {difficultyText(project.difficulty)}
                </Badge>
              </div>

              <div style={{ flex: 1 }}>
                <div className="card-title">{project.name}</div>
                <div className="card-copy">{project.scenario}</div>
              </div>

              <div className="project-foot">
                <div className="score-wrap">
                  {project.isDraft || project.score === null ? (
                    <span className="draft-pill">Draft</span>
                  ) : (
                    <span className="score-wrap" style={{ color: scoreColor(project.score) }}>
                      <Icon name="target" size={15} />
                      <b
                        style={{
                          color: "#15211F",
                          fontFamily: "Bricolage Grotesque",
                          fontSize: "0.92rem",
                          fontWeight: 800
                        }}
                      >
                        {project.score}
                      </b>
                    </span>
                  )}
                  <span className="meta-right">{relativeTime(project.updatedAt)}</span>
                </div>
                <span className="open-label">Open &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return <AuthRequired />;
    }

    throw error;
  }
}

