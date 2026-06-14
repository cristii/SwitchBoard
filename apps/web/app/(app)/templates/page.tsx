import Link from "next/link";
import { AuthRequired } from "../../../components/auth-required";
import { Badge, Eyebrow } from "../../../components/ds";
import { Icon } from "../../../components/icons";
import { AuthRequiredError, getTemplates } from "../../../lib/api";
import {
  difficultyText,
  difficultyVariant,
  platformIcon,
  platformName
} from "../../../lib/view-models";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  try {
    const { templates } = await getTemplates();

    return (
      <section className="screen" data-screen-label="Templates">
        <Eyebrow>Starter templates</Eyebrow>
        <div className="hero-row" style={{ marginTop: 8 }}>
          <h1 className="page-title small">
            Skip the blank page.
            <br />
            Start from a proven build.
          </h1>
          <div className="note">&rarr; each one drops you straight into a ready scenario</div>
        </div>

        <div className="card-grid" style={{ marginTop: 26 }}>
          {templates.map((template) => (
            <div className="template-card" key={template.id}>
              <div className="card-head">
                <div className="platform-head">
                  <div className="icon-tile">
                    <Icon name={platformIcon(template.channel)} size={21} />
                  </div>
                  <div className="platform-name">{platformName(template.channel)}</div>
                </div>
                <Badge variant={difficultyVariant(template.difficulty)}>
                  {difficultyText(template.difficulty)}
                </Badge>
              </div>

              <div style={{ flex: 1 }}>
                <div className="card-title">{template.name}</div>
                <div className="card-copy">{template.blurb}</div>
              </div>

              <div className="tag-row">
                {template.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <Link className="template-action" href={`/new?template=${template.id}`}>
                <Icon name="spark" size={15} />
                Use this template
              </Link>
            </div>
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

