import React, { FC } from "react"
import { useAppSelector } from "../../../store/storeHooks"
import { BarChart } from "./BarChart"
import { getFrequencyList } from "../utils/chartFreqUtils"

export const GenderDistributionChart: FC = () => {

    const userList = useAppSelector(state => { return state.userListState.userList })

    const data = React.useMemo(() => {
        return getFrequencyList("gender", userList)
    }, [userList])

    return <BarChart bottomAxisText="Gender" data={data} />

}