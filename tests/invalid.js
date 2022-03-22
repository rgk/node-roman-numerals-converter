import test from 'tape';
import nrmc from '../index.js';

test('"ABC" returns "Invalid".', (t) => {
  t.equal(nrmc("ABC"), "Invalid");

  t.end();
});

test('"123" returns "Invalid".', (t) => {
  t.equal(nrmc("123"), "Invalid");

  t.end();
});

test('"X V" returns "Invalid".', (t) => {
  t.equal(nrmc("X V"), "Invalid");

  t.end();
});
