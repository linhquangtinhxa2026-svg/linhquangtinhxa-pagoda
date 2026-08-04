export type VisitIconKey =
  | "location"
  | "clock"
  | "car"
  | "bus"
  | "sightseeing"
  | "pray"
  | "wish"
  | "festival"
  | "check"
  | "cross"
  | "medicine";

const ICON_PATHS: Record<VisitIconKey, React.ReactNode> = {
  location: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s-7-6.4-7-11.5A7 7 0 0119 9.5C19 14.6 12 21 12 21zm0-9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
    />
  ),
  clock: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  car: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16V11l2-5h12l2 5v5m-16 0h16m-16 0a1.5 1.5 0 003 0m13 0a1.5 1.5 0 01-3 0"
    />
  ),
  bus: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16V6a1 1 0 011-1h14a1 1 0 011 1v10m-16 0a1.5 1.5 0 003 0m-3 0h16m-16 0a1.5 1.5 0 013 0m10 0a1.5 1.5 0 003 0m-3 0a1.5 1.5 0 013 0M4 12h16"
    />
  ),
  sightseeing: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z"
    />
  ),
  pray: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21v-7m0 0a3 3 0 003-3V4l-3 2-3-2v7a3 3 0 003 3z"
    />
  ),
  wish: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2m0 14v2M5 12H3m18 0h-2M6.3 6.3L4.9 4.9m14.2 1.4l-1.4 1.4M6.3 17.7l-1.4 1.4m14.2-1.4l-1.4-1.4M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  ),
  festival: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2v3m-5 2a5 5 0 0110 0v6a5 5 0 01-10 0V7zm0 4h10"
    />
  ),
  check: <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />,
  cross: <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />,
  medicine: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v8m-4-4h8m-9 7h10a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  ),
};

export function VisitIcon({ iconKey }: { iconKey: VisitIconKey }) {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICON_PATHS[iconKey]}
    </svg>
  );
}
