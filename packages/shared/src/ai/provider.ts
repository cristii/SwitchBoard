import type { ProviderKind } from "../enums";

export interface ChatTurn {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface CompleteOpts {
  system?: string;
  messages: ChatTurn[];
  temperature?: number;
  maxTokens?: number;
  json?: boolean;
}

export interface AiProvider {
  readonly kind: ProviderKind;
  complete(opts: CompleteOpts): Promise<string>;
  stream(opts: CompleteOpts): AsyncIterable<string>;
}

