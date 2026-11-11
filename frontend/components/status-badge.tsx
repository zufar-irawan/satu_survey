export default function StatusBadge({ status }: { status: string }) {
  const normalized = (status || "").toLowerCase();
  const style =
    normalized === "completed"
      ? "border-[#006c4e]/30 bg-[rgba(0,108,78,0.08)] text-[#006c4e]"
      : normalized === "failed"
        ? "border-[#801313]/30 bg-[rgba(128,19,19,0.08)] text-[#801313]"
        : normalized === "processing"
          ? "border-[#a16207]/30 bg-[rgba(161,98,7,0.08)] text-[#a16207]"
          : normalized === "queued"
            ? "border-[#e7e0d3] bg-[#f3efe6] text-[#635d5c]"
            : "border-[#e7e0d3] bg-[#f3efe6] text-[#635d5c]";
  return (
    <span
      className={`inline-flex rounded-xl border px-2 py-[2px] font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-[0.5px] ${style}`}
    >
      {status || "unknown"}
    </span>
  );
}