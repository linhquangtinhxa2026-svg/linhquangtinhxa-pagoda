import type { ActivityIconKey } from "@/data/publicData";

const ICON_PATHS: Record<ActivityIconKey, React.ReactNode> = {
  education: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.42A12.02 12.02 0 0121 16.5c0 1.37-.28 2.68-.79 3.87M12 14l-6.16-3.42A12.02 12.02 0 003 16.5c0 1.37.28 2.68.79 3.87M12 14v7"
    />
  ),
  medicine: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v16m8-8H4"
    />
  ),
  memorial: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v3m0 0a6 6 0 016 6c0 3-2 5-3 6.5S13 21 12 21s-2-1-3-1.5S6 15 6 12a6 6 0 016-6z"
    />
  ),
  practice: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6a3 3 0 100 6 3 3 0 000-6zm0 6v9m-6-4c1.5 1.5 3.5 2.5 6 2.5s4.5-1 6-2.5"
    />
  ),
};

export function ActivityIcon({ iconKey }: { iconKey: ActivityIconKey }) {
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
