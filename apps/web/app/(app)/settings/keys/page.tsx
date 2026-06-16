import { AuthRequired } from "../../../../components/auth-required";
import { Eyebrow } from "../../../../components/ds";
import { Icon } from "../../../../components/icons";
import { AuthRequiredError, getProviderKeys } from "../../../../lib/api";
import { parseProvider, providerIcon, providerKeyRows } from "../../../../lib/view-models";
import { deleteKeyAction, saveKeyAction } from "./actions";

export const dynamic = "force-dynamic";

type KeysPageProps = {
  searchParams?: {
    saved?: string;
  };
};

export default async function KeysPage({ searchParams }: KeysPageProps) {
  try {
    const { keys } = await getProviderKeys();
    const rows = providerKeyRows(keys, parseProvider(searchParams?.saved));

    return (
      <section className="screen keys-screen" data-screen-label="API keys">
        <Eyebrow>Bring your own keys</Eyebrow>
        <h1 className="page-title keys-title">Connect a model. It&apos;s yours.</h1>
        <p className="keys-intro">
          Scenarios, bot replies, and validation all run on{" "}
          <b style={{ color: "#15211F" }}>your</b> provider &mdash; real API calls,
          billed to you. Keys are stored only in this browser, never on our servers.
        </p>
        <div className="keys-note">
          &rarr; no key? the playground falls back to a built-in demo model so you can
          still poke around
        </div>

        <div className="provider-list">
          {rows.map((row) => (
            <div className="provider-row" key={row.provider}>
              <div className="provider-icon">
                <Icon name={providerIcon(row.provider)} size={20} />
              </div>
              <div className="provider-copy">
                <div className="provider-name">{row.name}</div>
                <div className="provider-models">{row.models}</div>
              </div>

              <form action={saveKeyAction} className="provider-key-form">
                <input type="hidden" name="provider" value={row.provider} />
                <label className="provider-input">
                  <Icon name="key" size={17} />
                  <input
                    name="key"
                    type="password"
                    placeholder={row.placeholder}
                    autoComplete="off"
                    required
                  />
                </label>
                <button
                  className={`provider-save ${row.buttonLabel === "Saved \u2713" ? "saved" : ""}`}
                  type="submit"
                >
                  {row.buttonLabel}
                </button>
              </form>

              {row.saved ? (
                <form action={deleteKeyAction} className="provider-delete-form">
                  <input type="hidden" name="provider" value={row.provider} />
                  <button className="provider-remove" type="submit">
                    Remove
                  </button>
                </form>
              ) : null}
            </div>
          ))}
        </div>

        <div className="channel-credentials">
          <div className="channel-credentials-title">Channel credentials</div>
          <div className="channel-credentials-copy">
            When you&apos;re ready to ship a bot to a real channel, add its tokens here
            &mdash; WhatsApp Cloud API, Messenger Page tokens, Telegram bot keys,
            Twilio SID, SMTP/IMAP. The playground keeps them scoped to each project.
          </div>
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
