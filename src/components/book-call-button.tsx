"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { calConfig } from "@/config/cal";

type BookCallButtonProps = ComponentProps<typeof Button>;

const calDataConfig = JSON.stringify(calConfig.embedConfig);

export function BookCallButton({ onClick, ...props }: BookCallButtonProps) {
  return (
    <Button
      data-cal-link={calConfig.link}
      data-cal-config={calDataConfig}
      onClick={onClick}
      {...props}
    />
  );
}
