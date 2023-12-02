import { Box, Flex, MantineColor, parseThemeColor, useMantineTheme } from '@mantine/core';

interface CounterCirclesProps {
  radius: number;
  count: number;
  max: number;
  gap?: number;
  color: MantineColor;
}

export default function CounterCircles(props: CounterCirclesProps) {
  const { radius, count, max, gap, color } = props;
  const theme = useMantineTheme();
  const { value: colorHex } = parseThemeColor({ color, theme });

  function CounterCircle({ filled }: { filled: boolean }) {
    return (
      <Box
        style={{ borderRadius: '50%', border: `2px solid ${colorHex}` }}
        bg={filled ? color : undefined}
        c="red"
        h={radius}
        w={radius}
      />
    );
  }

  return (
    <Flex gap={gap || 15} align="center" justify="space-between" aria-details={`Periods: ${count}`}>
      {Array(max)
        .fill(0)
        .map((_, i) => (
          <CounterCircle key={i} filled={i < count} />
        ))}
    </Flex>
  );
}
