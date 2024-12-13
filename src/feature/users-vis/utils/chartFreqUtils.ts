import { User } from "../../users/userTypes"

export type KeyFrequency = {
    key: string,
    frequency: number
}
export const getFrequencyList = (keyname: keyof Pick<User, 'gender' | 'city'>, userList: User[]): KeyFrequency[] => {
    const frequencyMap = userList.reduce<Record<string, number>>((acc, user) => {
        const count = acc[user[keyname]] ?? 0
        return {
            ...acc,
            [user[keyname]]: count + 1
        }
    }, {})
    return Object.entries(frequencyMap).sort((a, b) => (a[0]).localeCompare(b[0]))
        .map(([key, frequency]) => {
            return { key, frequency }
        })

}


// Accessors
export const getKey = (d: KeyFrequency) => d.key;
export const getKeyFrequency = (d: KeyFrequency) => d.frequency;

