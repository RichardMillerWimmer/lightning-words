<script>

	import { generateWordTable } from "$lib/generateWordTable";
    import { weekState } from "$lib/createWeek";
    import Select from "$lib/components/Select/Select.svelte";

    let isPlaying = false;

    const handleStart = () => {
        isPlaying = true;
    }

    weekState.subscribe((/** @type {number} */ value) => {
        console.log(value);
    });

    const wordTable = generateWordTable(1)
    let i = 0;
    const handleWordAdvance = () => {
        if(i < 39) {
            i = i + 1
        }
    }

    const handleWordAdvanceOnSpace = (/** @type {{ key: string; code: string; keyCode: number; }} */ e) => {
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
<div>
    {#if !isPlaying}
    <div>
        <button on:click={handleStart}>Start</button>
    </div>
    {/if}
    {#if isPlaying}
        <div>
                {wordTable[i]}
        </div>
        <button on:click={handleWordAdvance}>Next</button>
    {/if}
</div>

<svelte:window
    on:keydown={handleWordAdvanceOnSpace}
/>