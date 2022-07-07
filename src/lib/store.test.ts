import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {readable, writable, derived} from '$lib/store';

test('readable', () => {
	const a = readable('a');
	assert.is(a.get(), 'a');
});

test('writable', () => {
	const a = writable('a');
	assert.is(a.get(), 'a');
	a.set('b');
	assert.is(a.get(), 'b');
});

test('derived with subscription', () => {
	const a = writable('a');
	const b = writable('b');
	const c = derived([a, b], ([$a, $b]) => $a + $b);
	c.subscribe((_) => _);
	assert.is(c.get(), 'ab');
});

test.only('derived without subscription', () => {
	const a = writable('a');
	const b = writable('b');
	const c = derived([a, b], ([$a, $b]) => $a + $b);
	assert.is(c.get(), 'ab');
});

test.run();
