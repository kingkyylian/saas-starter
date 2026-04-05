/**
 * actions.ts — Core AI logic
 *
 * Uses Anthropic claude-haiku by default (fast + cheap).
 * Swap the model or provider here — function signatures stay the same.
 *
 * To switch to OpenAI:
 *   npm install openai
 *   import OpenAI from "openai"
 *   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
 */

import Anthropic from "@anthropic-ai/sdk";
import type { ActionType, Target, GeneratedOutput } from "@/types";
import { TARGET_LABELS, ACTION_TYPE_LABELS } from "@/types";

function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function buildPrompt(input: string, actionType: ActionType, target: Target): string {
  const actionLabel = ACTION_TYPE_LABELS[actionType];
  const targetLabel = TARGET_LABELS[target];

  return `You are a professional content editor. Your task is to perform a "${actionLabel}" action on the provided content and produce an output optimized for "${targetLabel}".

Instructions:
- Action: ${actionLabel}
- Output target: ${targetLabel}
- Be concise and high quality
- Match the tone and style appropriate for ${targetLabel}
- Return only the output content — no preamble, no meta-commentary

Content:
${input}`;
}

export async function processAction(
  input: string,
  actionType: ActionType,
  target: Target,
): Promise<GeneratedOutput> {
  // If no API key is set, return a labeled stub so the app still runs
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      target,
      body: `[${ACTION_TYPE_LABELS[actionType]} → ${TARGET_LABELS[target]}]\n\n${input.slice(0, 200)}...`,
      metadata: { characterCount: input.length },
    };
  }

  const client = getClient();

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: buildPrompt(input, actionType, target),
      },
    ],
  });

  const body =
    message.content[0].type === "text" ? message.content[0].text : "";

  return {
    target,
    body,
    metadata: { characterCount: body.length },
  };
}

export async function processMultipleTargets(
  input: string,
  actionType: ActionType,
  targets: Target[],
): Promise<GeneratedOutput[]> {
  return Promise.all(targets.map((target) => processAction(input, actionType, target)));
}
