
<script lang="ts">
    import type {ICharState} from "../TypeDef";
    import {CharState} from "../TypeDef";
    import WordCol from "./WordCol.svelte";

    const GAME_ROWS = 6
    let activeRow = 0;
    let activeCol = 0;
    let rows : ICharState[][] = []
    let chosenWord = "poger"

    for (let i =0;i<GAME_ROWS;i++) {
        rows[i] = []
        for (let j=0;j<5;j++) {
            rows[i][j] = {char:'',state:CharState.None}
        }
    }
    const updateNext = (char:string,state:CharState)=>{
        if (activeRow >= 5) {
            console.log("next")
            return
        }
        rows[activeCol][activeRow] = {char,state}
        activeRow++;
        if (activeRow >= 5) {
            console.log("next")
            return
        }
        rows[activeCol][activeRow] = {...rows[activeCol][activeRow],state:CharState.Active}
    }
    const UpdateX = (x:number,char:string,state:CharState) => {
        rows[activeCol][x] = {char,state}
        activeRow--;
        rows[activeCol][activeRow] = {state:CharState.Active,char:char}
    }

    function onInput(ev:KeyboardEvent) {
        if (ev.key == "Backspace") {
            UpdateX(activeRow,"",CharState.None)
        }
        if (ev.key.length > 1) return;
        updateNext(ev.key,CharState.Entered)
    }
    $:{
        if (activeRow == 5 && activeCol != 5) {
            // let
            for (let i in rows[activeCol]) {
                let charData = rows[activeCol][i];
                if (chosenWord[i] == charData.char) {
                    rows[activeCol][i] = {char:charData.char,state:CharState.Correct}
                } else if (chosenWord.includes(charData.char)) {
                    rows[activeCol][i] = {char:charData.char,state:CharState.WrongPos}
                }
            }
            if (rows[activeCol].every(cd=>cd.state==CharState.Correct)) {
                console.log("win!")
            } else {
                activeCol++;
                activeRow=0
            }
        }
        console.log(activeRow == 5,activeCol)
    }
</script>

<div class="content max-w-sm mx-auto w-full">

    <div class="flex flex-col justify-center items-center justify-center h-full space-y-4" >
        <div class="board w-full mt-5 flex justify-items-center items-center" >
            <div class="w-full aspect dark:bg-zinc-900 rounded-xl border-solid dark:border-zinc-800 border-2 shadow-lg bg-neutral-100 border-neutral-200">
                {#each rows as w,i}
                    <WordCol word={w}/>
                {/each}
            </div>
        </div>
        <div class="flex-1 bg-amber-300 h-auto" >
            hh
        </div>
    </div>
</div>

<svelte:window on:keydown={onInput} />