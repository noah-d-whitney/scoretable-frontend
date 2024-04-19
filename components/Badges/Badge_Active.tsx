import { Badge, BadgeProps } from "@mantine/core";
import { ReactElement } from "react";

export default function Badge_Active(props: { active: boolean, badgeProps: BadgeProps }): ReactElement {
  const badgeProps = { ...props.badgeProps };
  badgeProps.variant = "dot";

  if (!props.active) {
    badgeProps.color = "red";
    return (
      <Badge {...badgeProps}>Inactive</Badge>
    );
  } else {
    badgeProps.color = "green";
    return (
      <Badge {...badgeProps}>Active</Badge>
    );
  }
}
