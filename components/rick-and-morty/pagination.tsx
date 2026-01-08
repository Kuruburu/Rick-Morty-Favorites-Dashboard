type Props = {
  page: number;
  next: number | null;
  prev: number | null;
  onChange: (page: number) => void;
};

export default function Pagination({ page, next, prev, onChange }: Props) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        disabled={!prev}
        onClick={() => prev && onChange(prev)}
        className="px-4 py-2 rounded bg-zinc-800 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="px-4 py-2 text-sm text-zinc-400">Page {page}</span>

      <button
        disabled={!next}
        onClick={() => next && onChange(next)}
        className="px-4 py-2 rounded bg-zinc-800 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
