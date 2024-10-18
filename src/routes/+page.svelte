<script>

	import { generateWordTable } from "$lib/generateWordTable";
	import { weeks } from "$lib/weeks";
    import { weekState } from "$lib/createWeek";

    weekState.subscribe((/** @type {number} */ value) => {
        console.log(value);
    });

</script>
<h1>Lightning Words</h1>
<form>
    <label for="Week">Week:</label>
    <select name="Week" id="Week" on:change={(event) => weekState.setWeek(+event?.currentTarget?.value)}>
        {#each weeks as week}
            <option value={week}>{week}</option>
        {/each}
    </select>
</form>
<span>
    {generateWordTable(1)}
</span>