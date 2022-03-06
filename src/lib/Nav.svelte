<script>
    let dm = false;
    function toggleDarkMode() {
        if (dm) {
            dm = false
            document.documentElement.classList.remove('dark')
            return
        }
        document.documentElement.classList.add('dark')
        dm=true;
    }

</script>


<div class="w-full border-b-2 dark:border-neutral-700 border-solid h-14 flex-wrap flex nav" >
    <div class="relative w-full h-full" >
        <div class="absolute w-full h-full" >
            <p class="prose prose-stone prose-2xl dark:prose-invert mx-auto text-center flex justify-center items-center content-center h-full">Wordle</p>
        </div>
        <div class="flex content-center items-center h-full z-30 relative select-none ml-2" >
            {#if (dm)}
                <svg on:click={toggleDarkMode} xmlns="http://www.w3.org/2000/svg" class="dark:stroke-white stroke-black max-h-full w-10 aspect-square cursor-pointer" fill="none" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
            {:else}
                <svg on:click={toggleDarkMode} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="dark:stroke-white stroke-black max-h-full w-10 aspect-square cursor-pointer" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>

            {/if}
        </div>
    </div>
</div>