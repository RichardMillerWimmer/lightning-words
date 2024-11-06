<script lang="ts">

	import { generateWordTable } from "$lib/generateWordTable";
    import { weekState } from "$lib/createWeek";
    import Select from "$lib/components/Select/Select.svelte";


    enum STATE {
        RUNNING,
        STOPPED,
    };

    let startTime: number = 0;
    let elapsedTime: number = 0;
    let interval: number;
    let state: STATE = STATE.STOPPED;

    const startTimer = () => {
        elapsedTime = 0;
        startTime = Date.now();
        state = STATE.RUNNING;
        interval = setInterval(() => {
        if (state === STATE.RUNNING) {
            const endTime = Date.now();
            elapsedTime = endTime - startTime;
        }
        });
    };

    const endResetTimer = () => {
        console.log(elapsedTime);
        state = STATE.STOPPED;
        clearInterval(interval);
    };                   

    let isPlaying = false;

    const handleStart = () => {
        isPlaying = true;
        startTimer();
    }

    let week = 0;
    let wordTable: string[] = []
    weekState.subscribe(value => {
        isPlaying = false;
        week = value;
        wordTable = generateWordTable(value);
    });
    
    let i = 0;

    const handleWordAdvance = () => {
        if(i < 39) {
            i = i + 1
        }
        if(i === 39) {
            isPlaying = false;
            i = 0;
            endResetTimer();
        }
    }

    const handleWordAdvanceOnSpace = (e: KeyboardEvent) => {
        if (e.key == " " ||
            e.code == "Space" ||      
            e.keyCode == 32      
            ) {
                handleWordAdvance()
        }
    }
</script>

<h1>Lightning Words</h1>
<Select />
<h2>{#if week}Week {week}{:else}Select A Week{/if}</h2>
<div>
    {#if !isPlaying}
    <div>
        <button disabled='{!Boolean(week)}' on:click={handleStart}>Start</button>
    </div>
    {/if}
    {#if isPlaying && wordTable.length}
        <div>
            {wordTable[i]}
        </div>
        <button on:click={handleWordAdvance}>Next</button>
    {/if}
    {#if elapsedTime > 0 && state === STATE.STOPPED} 
        <div>
            <p>Your Time: {elapsedTime}</p>
        </div>
    {/if}
</div>

<svelte:window
    on:keydown={handleWordAdvanceOnSpace}
/>