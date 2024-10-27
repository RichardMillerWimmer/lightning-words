<script>

	import { generateWordTable } from "$lib/generateWordTable";
    import { weekState } from "$lib/createWeek";
    import Select from "$lib/components/Select/Select.svelte";

    weekState.subscribe((/** @type {number} */ value) => {
        console.log(value);
    });

    const wordTable = generateWordTable(1)
    let i = 0;
    const handleWordAdvance = () => {
        i = i + 1;
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
    <span>
        {wordTable[i]}
    </span>
</div>
<button on:click={handleWordAdvance}>Next</button>

<svelte:window
    on:keydown={handleWordAdvanceOnSpace}
/>