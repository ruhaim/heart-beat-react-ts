import { AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';

import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { format } from 'd3-format';
import React, { FC, useMemo } from 'react';
import { ParentSize } from '@visx/responsive';
import { Text } from '@visx/text';


import { KeyFrequency, getKey, getKeyFrequency } from '../utils/chartFreqUtils';
import { useTheme } from '@mui/material/styles';

const verticalMargin = 120;
const horizontalMargin = 30;


type BarChartImplProps = {
    width: number,
    height: number
    bottomAxisText: string,
    data: KeyFrequency[]
}
const BarChartImpl: FC<BarChartImplProps> = ({ width, height, data, bottomAxisText }) => {

    const theme = useTheme();

    const background = theme.palette.background.default
    const barColor = theme.palette.secondary.main
    const textColor = theme.palette.text.secondary



    // Bounds
    const xMax = Math.max(width - horizontalMargin, 1);
    const yMax = Math.max(height - verticalMargin, 1);

    // Scales (memoize for performance)
    // More info: https://observablehq.com/@d3/d3-scaleband
    const xScale = useMemo(
        () =>
            scaleBand({
                range: [0, xMax],
                // round: true,
                domain: data.map(getKey),
                padding: 0.4,
            }),
        [data, xMax]
    );

    const yScale = useMemo(
        () =>
            scaleLinear({
                range: [yMax, 0],
                // round: true,
                domain: [0, Math.max(...data.map(getKeyFrequency))],
            }),
        [data, yMax]
    );

    return (
        <svg width={width} height={height}>
            <rect width={width} height={height} fill={background} rx={14} />
            <Group left={horizontalMargin / 2} top={verticalMargin / 2}>
                {data.map((d) => {
                    const key = getKey(d);
                    const keyFrequency = getKeyFrequency(d);

                    const barWidth = xScale.bandwidth();
                    const barHeight = yMax - (yScale(keyFrequency) ?? 0);

                    const barX = xScale(key);
                    const barY = yMax - barHeight;

                    return (
                        <React.Fragment key={`labeled-bar-${key}`}>
                            <Bar
                                key={`bar-${key}`}
                                x={barX}
                                y={barY}
                                width={barWidth}
                                height={barHeight}
                                fill={barColor}
                            />
                            <Text
                                key={`text-label-${key}`}
                                x={barX}
                                y={barY}
                                dx={barWidth / 2}
                                dy="-.25em"
                                fontSize={8}
                                textAnchor="middle"
                                fill={textColor}

                            >
                                {/* Breakpoint: https://tailwindcss.com/docs/breakpoints */}
                                {format("")(keyFrequency)}
                            </Text>
                        </React.Fragment>
                    );
                })}
                {/* Default values: https://github.com/airbnb/visx/blob/master/packages/visx-axis/src/axis/AxisBottom.tsx */}
                <AxisBottom
                    scale={xScale}
                    label={bottomAxisText}
                    top={yMax}
                    numTicks={data.length}
                    labelProps={{ fill: textColor }}
                    tickLabelProps={{ fill: textColor }}
                    tickLineProps={{ stroke: textColor, }}
                    stroke={textColor}

                />
            </Group>
        </svg>
    );

}

export type BarChartProps = Omit<BarChartImplProps, "width" | 'height'>

export const BarChart: FC<BarChartProps> = (props) => {
    return (<ParentSize>
        {({ width, height }) => <BarChartImpl width={width} height={height} bottomAxisText={props.bottomAxisText} data={props.data} />}
    </ParentSize>)
}