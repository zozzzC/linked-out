export default function FeedPost({
  name,
  title,
  body,
}: {
  name: string;
  title: string;
  body: string;
}) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex gap-3">
        <div className="h-11 w-11 rounded-full bg-gray-300"></div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-800">{body}</p>

      <div className="mt-4 border-t pt-3 flex justify-between text-sm text-gray-500">
        <button className="hover:text-blue-700">Terminate</button>
        <button className="hover:text-blue-700">Comment</button>
        <button className="hover:text-blue-700">Escalate</button>
      </div>
    </article>
  );
}
