import { lightningWords } from "./lightningWords";

export const generateWordTable = (week: number): string[] => { 
    const selectedWeek = lightningWords[week];
    const randomWordTable = []; 
    for (let i = 0; i < 40; i++) {
        const randomIndex = Math.floor(Math.random() * selectedWeek.length);
        randomWordTable.push(selectedWeek[randomIndex]);
    }
    return randomWordTable;
}