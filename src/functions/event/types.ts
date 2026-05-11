export type TimeAmount = {
    hours: number
    minutes: number
}

export type WeekSummary = {
    totalTime: TimeAmount
    totalWeekendTime: TimeAmount
    salary: number
}

export type Response = {
    weeks: WeekSummary[]
    totalTime: TimeAmount
    totalWeekendTime: TimeAmount
    totalSalary: number
}
