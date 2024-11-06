<script>

	import { generateWordTable } from "$lib/generateWordTable";
    import { weekState } from "$lib/createWeek";
    import Select from "$lib/components/Select/Select.svelte";

    // weekState.subscribe((/** @type {number} */ value) => {
    //     console.log(value);
    // });

    let isPlaying = false;

    const handleStart = () => {
        isPlaying = true;
    }

    let week = 0;
    /**
	 * @type {string[]}
	 */
    let wordTable = []
    weekState.subscribe(value => {
        console.log(value);
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
<h2>{#if week}Week {week}{:else}Select A Week{/if}</h2>
<div>
    {#if !isPlaying}
    <div>
        <button on:click={handleStart}>Start</button>
    </div>
    {/if}
    {#if isPlaying && wordTable.length}
        <div>
            {wordTable[i]}
        </div>
        <button on:click={handleWordAdvance}>Next</button>
    {/if}
</div>

<svelte:window
    on:keydown={handleWordAdvanceOnSpace}
/>