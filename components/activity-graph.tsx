"use client";

import type { ReactNode } from "react";
import {
  type ActivityDay,
  formatActivityTip,
  groupActivityWeeks,
  totalContributions,
} from "@/lib/activity";
import { TooltipAnchor, TooltipRegion } from "./tooltip-anchor";

const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export function ActivityGraph({ days }: { days: ActivityDay[] }) {
  const weeks = groupActivityWeeks(days);
  const total = totalContributions(days);

  return (
    <div className="activity-card">
      <p className="activity-meta">
        {total} contributions in the last 3 months
      </p>
      <TooltipRegion className="activity-graph">
        {weeks.map((week, weekIndex) => {
          const weekStart = week[0]?.date ?? `week-${weekIndex}`;
          return (
            <div key={weekStart} className="activity-week">
              {WEEKDAYS.map((weekday, dayIndex) => {
                const day = week[dayIndex];
                if (!day) {
                  return (
                    <span
                      key={`${weekStart}-empty-${weekday}`}
                      className="activity-day activity-day-empty"
                      aria-hidden
                    />
                  );
                }

                const tip = formatActivityTip(day);
                return (
                  <span
                    key={day.date}
                    className="activity-day"
                    role="img"
                    data-level={day.level}
                    data-tip={tip}
                    aria-label={tip}
                    style={{
                      backgroundColor: `var(--color-contrib-${day.level})`,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </TooltipRegion>
    </div>
  );
}

export function WritingCode({
  children,
  days,
}: {
  children: ReactNode;
  days: ActivityDay[];
}) {
  return (
    <TooltipAnchor
      className="keyword"
      variant="card"
      tooltip={<ActivityGraph days={days} />}
    >
      {children}
    </TooltipAnchor>
  );
}
