
<script lang="ts">
    import type {ICharState} from "../TypeDef";
    import {CharState} from "../TypeDef";
    import WordCol from "./WordCol.svelte";
    import words from "../assets/words.txt?raw"
    let wordArr : string[] = words.toString().split("\n")
    const GAME_ROWS = 6
    let activeRow = 0;
    let activeCol = 0;
    let rows : ICharState[][] = []
    let daysSinceEP = Math.floor(new Date().getTime() / 1000 / 60 / 24)
    let chosenWord = wordArr[daysSinceEP % wordArr.length]
    let keyboard = ["qwertyuiop".toUpperCase(),"asdfghjkl".toUpperCase(),"zxcvbnm".toUpperCase()]
    let win = false;

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
    function checkWin() {
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
            win=true
        }
    }
    function onInput(ev:KeyboardEvent) {
        let k = ev.key.toLowerCase();
        if (win) return;
        if (k == "backspace") {
            console.log(activeRow)
            UpdateX(activeRow-1,"",CharState.None)
            return
        } else if (k == "enter" && rows[activeCol].every(v=>v.char!="")) {
            checkWin()
            activeCol++;
            activeRow=0
            return
        }
        else if (ev.key.length > 1) return;
        updateNext(k,CharState.Entered)
    }

    $:{
        console.log(chosenWord,daysSinceEP)
    }
</script>

<div class="content max-w-lg mx-auto w-full">

    <div class="flex flex-col justify-center items-center justify-center h-full space-y-4" >
        <div class="board max-w-sm w-full mt-5 flex justify-items-center items-center" >
            <div class="w-full aspect dark:bg-zinc-900 rounded-xl border-solid dark:border-zinc-800 border-2 shadow-lg bg-neutral-100 border-neutral-200">
                {#each rows as w,i}
                    <WordCol word={w}/>
                {/each}
            </div>
        </div>
<!--        the code under is horrendous, im sorry. -->
        <div class="flex-1 w-full h-auto" >
            <div class="grid grid-rows-3 gap-3 select-none" >
                <div class="grid grid-cols-10 gap-2" >
                    {#each keyboard[0] as char}
                        <div on:click={()=>onInput({key:char})} class="KeyboardButton" >{char}</div>
                    {/each}
                </div>
                <div class="grid grid-cols-9 gap-2 px-5" >
                    {#each keyboard[1] as char}
                        <div on:click={()=>onInput({key:char})} class="KeyboardButton" >{char}</div>
                    {/each}
                </div>
                <div class="grid grid-cols-11 gap-2" >
                    <div on:click={()=>onInput({key:"Enter"})} class="KeyboardButton col-span-2" >ENTER</div>
                    {#each keyboard[2] as char}
                        <div on:click={()=>onInput({key:char})} class="KeyboardButton" >{char}</div>
                    {/each}
                    <div on:click={()=>onInput({key:"Backspace"})} class="KeyboardButton col-span-2" >{"<-"}</div>
                </div>
            </div>
        </div>
    </div>
</div>

<svelte:window on:keydown={onInput} />