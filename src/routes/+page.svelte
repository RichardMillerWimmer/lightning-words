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

</script>
<h1>Lightning Words</h1>
<Select />
<div>
    <span>
        {wordTable[i]}
    </span>
</div>
<button on:click={handleWordAdvance}>Next</button>