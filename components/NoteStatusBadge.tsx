type NoteStatusBadgeProps = {
  status: "Free Online";
};

export default function NoteStatusBadge({ status }: NoteStatusBadgeProps) {
  const styles = {
    "Free Online": "border-green-200 bg-green-50 text-green-700",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
