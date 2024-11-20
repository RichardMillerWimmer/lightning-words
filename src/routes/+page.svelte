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

<style>
    .LightningWord-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    h1 {
        font-size: 3rem;
    }
    
    h2 {
        font-size: 1.8rem;
    }

    button {
        margin-top: 1rem;
        padding: 0.5rem;
        font-size: 1rem;
        width: 100px;
        border-radius: 2rem;
        background-color: rgb(36, 105, 255);
        color: white;
        border: none;
    }
    
    .LightningWord-word {
        font-size: 5rem;
        margin-top: 1rem;
        text-align: center;
    }
</style>

<main class="LightningWord-main">
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
            <button on:click={handleWordAdvance}>Next</button>
            <div class="LightningWord-word">
                {wordTable[i]}
            </div>
        {/if}
        {#if elapsedTime > 0 && state === STATE.STOPPED} 
            <div>
                <p>Your Time: {Math.floor(elapsedTime/1000)} seconds</p>
            </div>
        {/if}
    </div>
</main>


<svelte:window
    on:keydown={handleWordAdvanceOnSpace}
/>