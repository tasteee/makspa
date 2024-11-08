<script lang="ts">import { initRapier } from './initRapier.svelte';
  import InnerWorld from './InnerWorld.svelte';
  let { fallback, children, ...rest } = $props();
  </script>
  
  {#await initRapier() then _}
    <InnerWorld {...rest}>
      {@render children?.()}
    </InnerWorld>
  {:catch error}
    {@render fallback?.(error)}
  {/await}
  