export default function HumanMessage({ text }: { text: string }) {
  return (
    <div className="flex items-end">
      <div
        className="rounded-4xl bg-gray-600
      "
      >
        <p className="text-white">{text}</p>
      </div>
    </div>
  );
}
