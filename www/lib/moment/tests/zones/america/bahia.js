"use strict";

var helpers = require("../../helpers/helpers");

exports["America/Bahia"] = {
	"1914" : helpers.makeTestYear("America/Bahia", [
		["1914-01-01T02:34:03+00:00", "23:59:59", "LMT", 9244 / 60],
		["1914-01-01T02:34:04+00:00", "23:34:04", "BRT", 180]
	]),

	"1931" : helpers.makeTestYear("America/Bahia", [
		["1931-10-03T13:59:59+00:00", "10:59:59", "BRT", 180],
		["1931-10-03T14:00:00+00:00", "12:00:00", "BRST", 120]
	]),

	"1932" : helpers.makeTestYear("America/Bahia", [
		["1932-04-01T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1932-04-01T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1932-10-03T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1932-10-03T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1933" : helpers.makeTestYear("America/Bahia", [
		["1933-04-01T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1933-04-01T02:00:00+00:00", "23:00:00", "BRT", 180]
	]),

	"1949" : helpers.makeTestYear("America/Bahia", [
		["1949-12-01T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1949-12-01T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1950" : helpers.makeTestYear("America/Bahia", [
		["1950-04-16T02:59:59+00:00", "00:59:59", "BRST", 120],
		["1950-04-16T03:00:00+00:00", "00:00:00", "BRT", 180],
		["1950-12-01T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1950-12-01T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1951" : helpers.makeTestYear("America/Bahia", [
		["1951-04-01T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1951-04-01T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1951-12-01T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1951-12-01T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1952" : helpers.makeTestYear("America/Bahia", [
		["1952-04-01T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1952-04-01T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1952-12-01T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1952-12-01T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1953" : helpers.makeTestYear("America/Bahia", [
		["1953-03-01T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1953-03-01T02:00:00+00:00", "23:00:00", "BRT", 180]
	]),

	"1963" : helpers.makeTestYear("America/Bahia", [
		["1963-12-09T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1963-12-09T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1964" : helpers.makeTestYear("America/Bahia", [
		["1964-03-01T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1964-03-01T02:00:00+00:00", "23:00:00", "BRT", 180]
	]),

	"1965" : helpers.makeTestYear("America/Bahia", [
		["1965-01-31T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1965-01-31T03:00:00+00:00", "01:00:00", "BRST", 120],
		["1965-03-31T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1965-03-31T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1965-12-01T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1965-12-01T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1966" : helpers.makeTestYear("America/Bahia", [
		["1966-03-01T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1966-03-01T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1966-11-01T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1966-11-01T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1967" : helpers.makeTestYear("America/Bahia", [
		["1967-03-01T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1967-03-01T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1967-11-01T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1967-11-01T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1968" : helpers.makeTestYear("America/Bahia", [
		["1968-03-01T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1968-03-01T02:00:00+00:00", "23:00:00", "BRT", 180]
	]),

	"1985" : helpers.makeTestYear("America/Bahia", [
		["1985-11-02T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1985-11-02T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1986" : helpers.makeTestYear("America/Bahia", [
		["1986-03-15T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1986-03-15T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1986-10-25T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1986-10-25T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1987" : helpers.makeTestYear("America/Bahia", [
		["1987-02-14T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1987-02-14T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1987-10-25T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1987-10-25T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1988" : helpers.makeTestYear("America/Bahia", [
		["1988-02-07T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1988-02-07T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1988-10-16T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1988-10-16T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1989" : helpers.makeTestYear("America/Bahia", [
		["1989-01-29T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1989-01-29T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1989-10-15T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1989-10-15T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1990" : helpers.makeTestYear("America/Bahia", [
		["1990-02-11T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1990-02-11T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1990-10-21T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1990-10-21T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1991" : helpers.makeTestYear("America/Bahia", [
		["1991-02-17T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1991-02-17T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1991-10-20T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1991-10-20T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1992" : helpers.makeTestYear("America/Bahia", [
		["1992-02-09T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1992-02-09T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1992-10-25T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1992-10-25T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1993" : helpers.makeTestYear("America/Bahia", [
		["1993-01-31T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1993-01-31T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1993-10-17T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1993-10-17T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1994" : helpers.makeTestYear("America/Bahia", [
		["1994-02-20T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1994-02-20T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1994-10-16T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1994-10-16T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1995" : helpers.makeTestYear("America/Bahia", [
		["1995-02-19T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1995-02-19T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1995-10-15T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1995-10-15T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1996" : helpers.makeTestYear("America/Bahia", [
		["1996-02-11T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1996-02-11T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1996-10-06T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1996-10-06T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1997" : helpers.makeTestYear("America/Bahia", [
		["1997-02-16T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1997-02-16T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1997-10-06T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1997-10-06T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1998" : helpers.makeTestYear("America/Bahia", [
		["1998-03-01T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1998-03-01T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1998-10-11T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1998-10-11T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"1999" : helpers.makeTestYear("America/Bahia", [
		["1999-02-21T01:59:59+00:00", "23:59:59", "BRST", 120],
		["1999-02-21T02:00:00+00:00", "23:00:00", "BRT", 180],
		["1999-10-03T02:59:59+00:00", "23:59:59", "BRT", 180],
		["1999-10-03T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"2000" : helpers.makeTestYear("America/Bahia", [
		["2000-02-27T01:59:59+00:00", "23:59:59", "BRST", 120],
		["2000-02-27T02:00:00+00:00", "23:00:00", "BRT", 180],
		["2000-10-08T02:59:59+00:00", "23:59:59", "BRT", 180],
		["2000-10-08T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"2001" : helpers.makeTestYear("America/Bahia", [
		["2001-02-18T01:59:59+00:00", "23:59:59", "BRST", 120],
		["2001-02-18T02:00:00+00:00", "23:00:00", "BRT", 180],
		["2001-10-14T02:59:59+00:00", "23:59:59", "BRT", 180],
		["2001-10-14T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"2002" : helpers.makeTestYear("America/Bahia", [
		["2002-02-17T01:59:59+00:00", "23:59:59", "BRST", 120],
		["2002-02-17T02:00:00+00:00", "23:00:00", "BRT", 180],
		["2002-11-03T02:59:59+00:00", "23:59:59", "BRT", 180],
		["2002-11-03T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"2003" : helpers.makeTestYear("America/Bahia", [
		["2003-02-16T01:59:59+00:00", "23:59:59", "BRST", 120],
		["2003-02-16T02:00:00+00:00", "23:00:00", "BRT", 180]
	]),

	"2011" : helpers.makeTestYear("America/Bahia", [
		["2011-10-16T02:59:59+00:00", "23:59:59", "BRT", 180],
		["2011-10-16T03:00:00+00:00", "01:00:00", "BRST", 120]
	]),

	"2012" : helpers.makeTestYear("America/Bahia", [
		["2012-02-26T01:59:59+00:00", "23:59:59", "BRST", 120],
		["2012-02-26T02:00:00+00:00", "23:00:00", "BRT", 180]
	])
};