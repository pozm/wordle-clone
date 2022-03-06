<script lang="ts">
    import {CharState, ICharState} from "../TypeDef";

    export let word : ICharState[]
    function isActive(st:CharState) {
        return st == CharState.Entered
    }
    function getClassForState(st:CharState) {
        switch (st) {
            case CharState.Entered: return "border-pink-500/70";
            case CharState.Correct: return "border-green-500/70"
            case CharState.None: return "border-pink-500/30"
            case CharState.Active: return "border-pink-500/30"
            case CharState.WrongPos: return "border-amber-500/70"
        }
    }
</script>

<div class={"w-full grid grid-cols-5 p-2 gap-2"} >
    {#each word as letter,i}
        <div class={`border-2 border-solid ${getClassForState(letter.state)} aspect-square rounded-lg`} >
            <div class={"w-full h-full prose dark:prose-invert prose-2xl m-auto text-center text-5xl flex items-center justify-center"} >{letter.char.toUpperCase()}</div>
        </div>
    {/each}
    <!--{word.map((letter,i)=>{-->
    <!--    console.log("updating word ROW")-->
    <!--    return <div key={Math.random()} className={`border-2 border-solid ${(active && activeCol >= i) ? "border-pink-500/70" : "border-pink-500/30"} aspect-square rounded-lg`}>-->
    <!--        <div className={"w-full h-full prose dark:prose-invert prose-2xl m-auto text-center text-5xl flex items-center justify-center"} >{letter.char.toUpperCase()}</div>-->
    <!--    </div>-->
    <!--})}-->
</div>