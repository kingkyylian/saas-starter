/**
 * types/index.ts
 *
 * Customize ActionType and Target to match your product's domain.
 * Examples:
 *   ActionType: "summarize" | "translate" | "analyze"
 *   Target:     "slack" | "email" | "report"
 */

export type ActionType = "default" | "summarize" | "transform" | "analyze";

export type Target =
  | "output_a"
  | "output_b"
  | "output_c"
  | "output_d"
  | "output_e"
  | "output_f";

export const TARGET_LABELS: Record<Target, string> = {
  output_a: "Output A",
  output_b: "Output B",
  output_c: "Output C",
  output_d: "Output D",
  output_e: "Output E",
  output_f: "Output F",
};

export const ACTION_TYPE_LABELS: Record<ActionType, string> = {
  default: "Default",
  summarize: "Summarize",
  transform: "Transform",
  analyze: "Analyze",
};

export interface ActionInput {
  title?: string;
  body: string;
  type: ActionType;
  targets: Target[];
}

export interface OutputMetadata {
  hashtags?: string[];
  characterCount?: number;
  [key: string]: unknown;
}

export interface GeneratedOutput {
  target: Target;
  body: string;
  metadata?: OutputMetadata;
}

export interface ActionResult {
  contentId: string;
  outputs: GeneratedOutput[];
}

export type SubscriptionPlan = "free" | "pro";

export interface PlanLimits {
  creditsPerMonth: number;
  targets: Target[];
  maxInputLength: number;
  priority: boolean;
}

export const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  free: {
    creditsPerMonth: 5,
    targets: ["output_a", "output_b", "output_c"],
    maxInputLength: 5000,
    priority: false,
  },
  pro: {
    creditsPerMonth: 100,
    targets: ["output_a", "output_b", "output_c", "output_d", "output_e", "output_f"],
    maxInputLength: 50000,
    priority: true,
  },
};

export interface UserCredits {
  used: number;
  limit: number;
  remaining: number;
  plan: SubscriptionPlan;
}
