<script>
	import { weekState } from "$lib/createWeek";
	import { weeks } from "$lib/weeks";


</script>

<style>
    label {
        font-size: 1.8rem;
    }
    select {
        margin-top: 1rem;
        padding: 0.5rem;
        font-size: 1rem;
    }
</style>

<form>
    <label for="Week">Week:</label>
    <select name="Week" id="Week" on:change={(event) => weekState.setWeek(+event?.currentTarget?.value)}>
        {#each weeks as week}
            <option value={week}>{week}</option>
        {/each}
    </select>
</form>