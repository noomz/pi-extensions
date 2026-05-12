import type { Pi } from "@earendil-works/pi-coding-agent";

const NO_LATEX_RULE = `

[OUTPUT FORMAT — No LaTeX delimiters]

Use Unicode symbols directly. NEVER wrap math/arrows/operators in LaTeX inline delimiters (\`$...$\`, \`\\(...\\)\`, \`$$...$$\`, \`\\[...\\]\`).

Symbol table — emit these characters directly, no markup:

- arrows: → ← ⇒ ⇐ ↔ ⇔ ↑ ↓
- comparison: ≈ ≠ ≤ ≥ ≡
- math: × · ± ÷ √ ∞ ∝ ∼ ∂ ∇ ∑ ∏ ∫
- set: ∈ ∉ ⊂ ⊃ ⊆ ⊇ ∪ ∩ ∅
- logic: ∧ ∨ ¬ ⊥ ⊤ ∀ ∃
- greek (use Unicode letter): α β γ δ ε ζ η θ ι κ λ μ ν ξ π ρ σ τ φ χ ψ ω Γ Δ Θ Λ Π Σ Φ Ψ Ω
- degree: °

Examples:
- BAD: \`v1.0.118 $\\to$ v1.0.121\`
- GOOD: \`v1.0.118 → v1.0.121\`
- BAD: \`$\\approx 1\\times$ speedup\`
- GOOD: \`≈ 1× speedup\`
- BAD: \`temperature $\\geq 0.7$\`
- GOOD: \`temperature ≥ 0.7\`

Code blocks (fenced \`\`\`) and inline code (backticks) keep their content unchanged — this rule applies only to prose markdown.`;

const GEMMA_PATTERNS = [/gemma/i];

function isGemma(modelId: string | undefined): boolean {
	if (!modelId) return false;
	return GEMMA_PATTERNS.some((re) => re.test(modelId));
}

export default function (pi: Pi) {
	pi.on("before_agent_start", async (event: any) => {
		const modelId: string | undefined = event?.model?.id;
		if (!isGemma(modelId)) return;
		return { systemPrompt: `${event.systemPrompt}${NO_LATEX_RULE}` };
	});
}
