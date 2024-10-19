<script>
	import { weekState } from "$lib/createWeek";
	import { weeks } from "$lib/weeks";


</script>

<form>
    <label for="Week">Week:</label>
    <select name="Week" id="Week" on:change={(event) => weekState.setWeek(+event?.currentTarget?.value)}>
        {#each weeks as week}
            <option value={week}>{week}</option>
        {/each}
    </select>
</form>