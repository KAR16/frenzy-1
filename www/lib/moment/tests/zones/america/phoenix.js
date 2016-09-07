"use strict";

var helpers = require("../../helpers/helpers");

exports["America/Phoenix"] = {
	"guess" : helpers.makeTestGuess("America/Phoenix", { offset: true, abbr: true }),

	"1918" : helpers.makeTestYear("America/Phoenix", [
		["1918-03-31T08:59:59+00:00", "01:59:59", "MST", 420],
		["1918-03-31T09:00:00+00:00", "03:00:00", "MDT", 360],
		["1918-10-27T07:59:59+00:00", "01:59:59", "MDT", 360],
		["1918-10-27T08:00:00+00:00", "01:00:00", "MST", 420]
	]),

	"1919" : helpers.makeTestYear("America/Phoenix", [
		["1919-03-30T08:59:59+00:00", "01:59:59", "MST", 420],
		["1919-03-30T09:00:00+00:00", "03:00:00", "MDT", 360],
		["1919-10-26T07:59:59+00:00", "01:59:59", "MDT", 360],
		["1919-10-26T08:00:00+00:00", "01:00:00", "MST", 420]
	]),

	"1942" : helpers.makeTestYear("America/Phoenix", [
		["1942-02-09T08:59:59+00:00", "01:59:59", "MST", 420],
		["1942-02-09T09:00:00+00:00", "03:00:00", "MWT", 360]
	]),

	"1944" : helpers.makeTestYear("America/Phoenix", [
		["1944-01-01T06:00:59+00:00", "00:00:59", "MWT", 360],
		["1944-01-01T06:01:00+00:00", "23:01:00", "MST", 420],
		["1944-04-01T07:00:59+00:00", "00:00:59", "MST", 420],
		["1944-04-01T07:01:00+00:00", "01:01:00", "MWT", 360],
		["1944-10-01T06:00:59+00:00", "00:00:59", "MWT", 360],
		["1944-10-01T06:01:00+00:00", "23:01:00", "MST", 420]
	]),

	"1967" : helpers.makeTestYear("America/Phoenix", [
		["1967-04-30T08:59:59+00:00", "01:59:59", "MST", 420],
		["1967-04-30T09:00:00+00:00", "03:00:00", "MDT", 360],
		["1967-10-29T07:59:59+00:00", "01:59:59", "MDT", 360],
		["1967-10-29T08:00:00+00:00", "01:00:00", "MST", 420]
	])
};