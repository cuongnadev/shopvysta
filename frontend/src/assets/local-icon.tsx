import React from "react";

import { logo_icon, search_icon, filter_icon, arrow_icon, finland_icon, usa_icon } from ".";

const icon = {
  logo_icon,
  search_icon,
  filter_icon,
  arrow_icon,
  finland_icon,
  usa_icon
} satisfies Record<
  string,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
>;

type ReactIconProps = React.SVGProps<SVGSVGElement> & {
  iconName: keyof typeof icon;
  height?: number | "auto";
  width?: number | "auto";
};

/**
 * generator svg icon
 * @param param0
 * @returns
 */
export const LocalIcon = ({
  iconName,
  height = 24,
  width = 24,
  ...props
}: ReactIconProps) => {
  const Comp = icon[iconName];
  return (
    <Comp
      {...(height !== "auto" && { height })}
      {...(width !== "auto" && { width })}
      {...props}
    />
  );
};
