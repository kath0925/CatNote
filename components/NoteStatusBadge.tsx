type NoteStatusBadgeProps = {
  status: "Free Preview" | "Register" | "Unlock";
};

export default function NoteStatusBadge({ status }: NoteStatusBadgeProps) {
    const styles = {
    "Free Preview": "border-green-200 bg-green-50 text-green-700",
    Register: "border-blue-200 bg-blue-50 text-blue-700",
    Unlock: "border-neutral-300 bg-neutral-100 text-neutral-700",
    };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
