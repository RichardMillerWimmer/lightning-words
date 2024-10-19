<script>

	import { generateWordTable } from "$lib/generateWordTable";
    import { weekState } from "$lib/createWeek";
    import Select from "$lib/components/Select/Select.svelte";

    weekState.subscribe((/** @type {number} */ value) => {
        console.log(value);
    });

</script>
<h1>Lightning Words</h1>
<Select />
<span>
    {generateWordTable(1)}
</span>