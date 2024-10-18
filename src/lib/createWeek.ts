function createWeek(week: number) {
    // keep track of subscribers
    const subscribers = new Set<(value: number) => void>()

    // add subscriber
    function subscribe(subscriber: (value: number) => void) {
        subscribers.add(subscriber)
    }

    // set week
    function setWeek(newWeek: number) {
        week = newWeek
        console.log('week', week)
        subscribers.forEach(subscriber => subscriber(week))
    }

     // notify subscribers
     function updateSubscriber(updater: (week: number) => number) {
        setWeek(updater(week))
    }

    return {subscribe, setWeek, updateSubscriber}
}

export const weekState = createWeek(1)
