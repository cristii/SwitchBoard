import { AuthRequired } from "../../../components/auth-required";
import { Eyebrow } from "../../../components/ds";
import { Icon } from "../../../components/icons";
import { AuthRequiredError, getActivity } from "../../../lib/api";
import { activityMeta, relativeTime } from "../../../lib/view-models";

export const dynamic = "force-dynamic";

export default async function ActivityPage() {
  try {
    const { activity } = await getActivity();

    return (
      <section className="screen narrow" data-screen-label="Activity">
        <Eyebrow>Activity</Eyebrow>
        <h1 className="page-title small">Everything you&apos;ve tried</h1>
        <p className="activity-intro">
          A running log of what you built, tested, and how it scored &mdash; your learning trail.
        </p>

        {activity.length === 0 ? (
          <div className="empty-state">
            <div className="card-title">Nothing here yet</div>
            <div className="card-copy">Build and test a bot &mdash; your activity shows up here.</div>
          </div>
        ) : (
          <div className="timeline">
            {activity.map((item) => {
              const meta = activityMeta[item.type];

              return (
                <div className="timeline-item" key={item.id}>
                  <div className="timeline-rail">
                    <div className="timeline-icon" style={{ color: meta.color }}>
                      <Icon name={meta.icon} size={17} />
                    </div>
                    <div className="timeline-line" />
                  </div>
                  <div className="timeline-body">
                    <div className="timeline-meta">
                      <span className="timeline-kind" style={{ color: meta.color }}>
                        {meta.kind}
                      </span>
                      <span className="timeline-when">{relativeTime(item.createdAt)}</span>
                    </div>
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-detail">{item.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  } catch (error) {
    if (error instanceof AuthRequiredError) {
      return <AuthRequired />;
    }

    throw error;
  }
}

