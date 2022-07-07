# @feltcoop/svelte-gettable-stores

npm: [`@feltcoop/svelte-gettable-stores`](https://www.npmjs.com/package/@feltcoop/svelte-gettable-stores)

**‼ This library can cause tricky bugs**
**and there may be good reasons the Svelte team supports**
**[`get`](https://svelte.dev/docs#run-time-svelte-store-get)**
**and not `.get()`.**
(some discussion on [this issue](https://github.com/sveltejs/svelte/issues/2060#issuecomment-667555847))
Please do not use this unless you really truly know what you're doing 🤒
The only benefit is performance, which may not be relevant for your usage.

Adds a **non-reactive** `.get()` to Svelte stores
(as well as [`@feltcoop/svelte-mutable-store`](https://github.com/feltcoop/svelte-mutable-store)).
It copypastes the original implementations and makes
[these changes](https://github.com/feltcoop/svelte-gettable-stores/compare/4d0ed2d..fc5e577#diff-276a0044b7db537e1835eb8b2c20368b8a7437a3fde350198bff4db2b9e418fe).

See the [tests](src/lib/store.test.ts) for more.
The implementation was partially inspired by
[`svelte-store2`](https://github.com/vkurko/svelte-store2).
Discussion is welcome in issues and privately.

## motivation

Svelte offers the standalone [`get`](https://svelte.dev/docs#run-time-svelte-store-get)
function to non-reactively access store values,
but it costs more than necessary in most cases. From the Svelte docs:

> "This works by creating a subscription, reading the value, then unsubscribing.
> It's therefore not recommended in hot code paths."
> ([svelte.dev/docs](https://svelte.dev/docs#run-time-svelte-store-get))

In many cases, this cost is either negligible or architecturally irrelevant.
In other cases, like nested stores and collections
processed in non-reactive contexts like event handlers,
the cost can be undesirably high.
(we can provide open source examples, open an issue if you'd like to discuss)

This library adds `.get()` to the original store implementations
to access values without the cost of a subscription+unsubscription
in all cases except `derived` stores with zero subscribers.
In that case, it uses the `get` builtin.

## license

[MIT](LICENSE.md)
(copy of [Svelte's license](https://github.com/sveltejs/svelte/blob/master/LICENSE.md))

everything else: [Unlicense](https://wikipedia.org/wiki/Unlicense) (public domain)
