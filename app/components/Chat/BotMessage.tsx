export default function BotMessage({ text }: { text: string }) {
  return (
    <div className="flex items-end">
      <div
        className="p-2 rounded-4xl bg-blue-600
      "
      >
        <p className="text-white">{text}</p>
      </div>
    </div>
  );
}
