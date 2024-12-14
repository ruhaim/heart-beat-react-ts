import React, { FC } from "react";

import { useAppSelector } from "../../../store/storeHooks";
import { getFrequencyList } from "../utils/chartFreqUtils";

import { BarChart } from "./BarChart";

export const CityDistributionChart: FC = () => {
  const userList = useAppSelector((state) => {
    return state.userListState.userList;
  });

  const data = React.useMemo(() => {
    return getFrequencyList("city", userList);
  }, [userList]);

  return <BarChart bottomAxisText="City" data={data} />;
};
