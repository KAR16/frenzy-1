"use strict";

var helpers = require("../../helpers/helpers");

exports["Asia/Karachi"] = {
	"guess" : helpers.makeTestGuess("Asia/Karachi", { offset: true, abbr: true }),

	"1906" : helpers.makeTestYear("Asia/Karachi", [
		["1906-12-31T19:31:47+00:00", "23:59:59", "LMT", -16092 / 60],
		["1906-12-31T19:31:48+00:00", "01:01:48", "IST", -330]
	]),

	"1942" : helpers.makeTestYear("Asia/Karachi", [
		["1942-08-31T18:29:59+00:00", "23:59:59", "IST", -330],
		["1942-08-31T18:30:00+00:00", "01:00:00", "IST", -390]
	]),

	"1945" : helpers.makeTestYear("Asia/Karachi", [
		["1945-10-14T17:29:59+00:00", "23:59:59", "IST", -390],
		["1945-10-14T17:30:00+00:00", "23:00:00", "IST", -330]
	]),

	"1951" : helpers.makeTestYear("Asia/Karachi", [
		["1951-09-29T18:29:59+00:00", "23:59:59", "IST", -330],
		["1951-09-29T18:30:00+00:00", "23:30:00", "KART", -300]
	]),

	"1971" : helpers.makeTestYear("Asia/Karachi", [
		["1971-03-25T18:59:59+00:00", "23:59:59", "KART", -300],
		["1971-03-25T19:00:00+00:00", "00:00:00", "PKT", -300]
	]),

	"2002" : helpers.makeTestYear("Asia/Karachi", [
		["2002-04-06T18:59:59+00:00", "23:59:59", "PKT", -300],
		["2002-04-06T19:00:00+00:00", "01:00:00", "PKST", -360],
		["2002-10-05T17:59:59+00:00", "23:59:59", "PKST", -360],
		["2002-10-05T18:00:00+00:00", "23:00:00", "PKT", -300]
	]),

	"2008" : helpers.makeTestYear("Asia/Karachi", [
		["2008-05-31T18:59:59+00:00", "23:59:59", "PKT", -300],
		["2008-05-31T19:00:00+00:00", "01:00:00", "PKST", -360],
		["2008-10-31T17:59:59+00:00", "23:59:59", "PKST", -360],
		["2008-10-31T18:00:00+00:00", "23:00:00", "PKT", -300]
	]),

	"2009" : helpers.makeTestYear("Asia/Karachi", [
		["2009-04-14T18:59:59+00:00", "23:59:59", "PKT", -300],
		["2009-04-14T19:00:00+00:00", "01:00:00", "PKST", -360],
		["2009-10-31T17:59:59+00:00", "23:59:59", "PKST", -360],
		["2009-10-31T18:00:00+00:00", "23:00:00", "PKT", -300]
	])
};