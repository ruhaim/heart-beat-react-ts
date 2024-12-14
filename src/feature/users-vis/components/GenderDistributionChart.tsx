import React, { FC } from "react";

import { useAppSelector } from "../../../store/storeHooks";
import { getFrequencyList } from "../utils/chartFreqUtils";

import { BarChart } from "./BarChart";

export const GenderDistributionChart: FC = () => {
  const userList = useAppSelector((state) => {
    return state.userListState.userList;
  });

  const data = React.useMemo(() => {
    return getFrequencyList("gender", userList);
  }, [userList]);

  return <BarChart bottomAxisText="Gender" data={data} />;
};
