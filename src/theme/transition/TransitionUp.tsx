import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions/transition";
import React from "react";

export const TransitionUp = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});