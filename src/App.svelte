<script lang="ts">
  import logo from './assets/svelte.png'
  import Counter from './lib/Counter.svelte'
  import Nav from "./lib/Nav.svelte";
  import GameBoard from "./lib/GameBoard.svelte";
  import './assets/app.css'
  // document.documentElement.classList.add('dark')
</script>

<main>
  <div class="App h-screen flex flex-col">
    <Nav/>
    <GameBoard/>
  </div>
</main>

<style>

</style>
