import Link from "next/link";

export default function BannedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-red-500 p-6">
      <div className="max-w-xl text-center border border-red-700 rounded-2xl p-10 shadow-lg">
        <h1 className="text-5xl font-bold mb-4">PERMANENTLY BANNED</h1>

        <p className="text-lg mb-2">
          Your LinkedOut account has been permanently suspended. As a result, your job prospects have fallen to rock bottom without LinkedOut.
        </p>

        <p className="text-sm text-red-300 mb-8">
          Reason: using slurs against AI.
        </p>
      </div>
    </main>
  );
}