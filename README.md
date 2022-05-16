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
[these changes](https://github.com/feltcoop/svelte-gettable-stores/commit/41df06d236ca8951e3a14f4fc4d945717a0d392a#diff-276a0044b7db537e1835eb8b2c20368b8a7437a3fde350198bff4db2b9e418fe).

Also adds a second function property to all stores that returns the subscriber count.
It's used by `derived` stores to detect if they need to use the Svelte builtin `get`
to retrieve correct values when there are no subscribers.
It can be accessed with the exported symbol key `store[SUBSCRIBER_COUNT]`,
and may also be useful for debugging and diagnostic purposes.
For these reasons and also consistency, it's included on all stores.
(maybe it shouldn't be?)

> `store[SUBSCRIBER_COUNT]` is an enumerable property with a `Symbol` key,
> so it does not appear with `Object.keys(store)` and `for (key in store)`
> but it does get included with `{...store}` and others.
> (maybe this isn't best? maybe a better name is `GET_SUBSCRIBER_COUNT` or `COUNT_SUBSCRIBERS`?)
> Learn [more at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties).

See [the store diff](https://github.com/feltcoop/svelte-gettable-stores/commit/41df06d236ca8951e3a14f4fc4d945717a0d392a#diff-276a0044b7db537e1835eb8b2c20368b8a7437a3fde350198bff4db2b9e418fe)
and [tests](src/lib/store.test.ts) for more.
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
(copy of [Svelte's license](https://github.com/sveltejs/svelte/blob/master/LICENSE.md),
no affiliation)

everything else: [Unlicense](https://wikipedia.org/wiki/Unlicense) (public domain)
