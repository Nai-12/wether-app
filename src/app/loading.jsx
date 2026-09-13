export default function Loading() {
  return (
    <div className="absolute h-full w-full flex justify-center items-center">
      <span className="flex justify-center items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f5f5f5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-loader-circle animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <p className="font-pop text-sm text-white font-semibold">
          Tunggu Sebentar
        </p>
      </span>
    </div>
  );
}
