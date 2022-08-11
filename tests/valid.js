import test from 'tape';
import nrmc from '../index.js';

test('I returns 1.', (t) => {
  t.equal(nrmc("I"), 1);

  t.end();
});

test('IV returns 4.', (t) => {
  t.equal(nrmc("IV"), 4);

  t.end();
});

test('MIX returns 1009.', (t) => {
  t.equal(nrmc("MIX"), 1009);

  t.end();
});

test('MDCCLXXVI returns 1776.', (t) => {
  t.equal(nrmc("MDCCLXXVI"), 1776);

  t.end();
});

test('MMXIX returns 2019.', (t) => {
  t.equal(nrmc("MMXIX"), 2019);

  t.end();
});

test('VIV returns IX when reduced.', (t) => {
  t.equal(nrmc("VIV", true), "IX");

  t.end();
});

test('MMVLXIV returns MMLIX when reduced.', (t) => {
  t.equal(nrmc("MMVLXIV", true), "MMLIX");

  t.end();
});


test('MMMCMXCIX returns 3999.', (t) => {
  t.equal(nrmc("MMMCMXCIX"), 3999);

  t.end();
});

test('19 returns XIX.', (t) => {
  t.equal(nrmc(19), "XIX");

  t.end();
});

test('49 returns XLIX.', (t) => {
  t.equal(nrmc(49), "XLIX");

  t.end();
});
MMMCMXCIX

test('489 returns CDLXXXIX.', (t) => {
  t.equal(nrmc(489), "CDLXXXIX");

  t.end();
});


test('3999 returns MMMCMXCIX.', (t) => {
  t.equal(nrmc(3999), "MMMCMXCIX");

  t.end();
});
