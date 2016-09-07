"use strict";

var helpers = require("../../helpers/helpers");

exports["Asia/Magadan"] = {
	"guess" : helpers.makeTestGuess("Asia/Magadan", { offset: false, abbr: true }),

	"1924" : helpers.makeTestYear("Asia/Magadan", [
		["1924-05-01T13:56:47+00:00", "23:59:59", "LMT", -36192 / 60],
		["1924-05-01T13:56:48+00:00", "23:56:48", "MAGT", -600]
	]),

	"1930" : helpers.makeTestYear("Asia/Magadan", [
		["1930-06-20T13:59:59+00:00", "23:59:59", "MAGT", -600],
		["1930-06-20T14:00:00+00:00", "01:00:00", "MAGT", -660]
	]),

	"1981" : helpers.makeTestYear("Asia/Magadan", [
		["1981-03-31T12:59:59+00:00", "23:59:59", "MAGT", -660],
		["1981-03-31T13:00:00+00:00", "01:00:00", "MAGST", -720],
		["1981-09-30T11:59:59+00:00", "23:59:59", "MAGST", -720],
		["1981-09-30T12:00:00+00:00", "23:00:00", "MAGT", -660]
	]),

	"1982" : helpers.makeTestYear("Asia/Magadan", [
		["1982-03-31T12:59:59+00:00", "23:59:59", "MAGT", -660],
		["1982-03-31T13:00:00+00:00", "01:00:00", "MAGST", -720],
		["1982-09-30T11:59:59+00:00", "23:59:59", "MAGST", -720],
		["1982-09-30T12:00:00+00:00", "23:00:00", "MAGT", -660]
	]),

	"1983" : helpers.makeTestYear("Asia/Magadan", [
		["1983-03-31T12:59:59+00:00", "23:59:59", "MAGT", -660],
		["1983-03-31T13:00:00+00:00", "01:00:00", "MAGST", -720],
		["1983-09-30T11:59:59+00:00", "23:59:59", "MAGST", -720],
		["1983-09-30T12:00:00+00:00", "23:00:00", "MAGT", -660]
	]),

	"1984" : helpers.makeTestYear("Asia/Magadan", [
		["1984-03-31T12:59:59+00:00", "23:59:59", "MAGT", -660],
		["1984-03-31T13:00:00+00:00", "01:00:00", "MAGST", -720],
		["1984-09-29T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1984-09-29T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1985" : helpers.makeTestYear("Asia/Magadan", [
		["1985-03-30T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1985-03-30T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1985-09-28T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1985-09-28T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1986" : helpers.makeTestYear("Asia/Magadan", [
		["1986-03-29T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1986-03-29T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1986-09-27T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1986-09-27T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1987" : helpers.makeTestYear("Asia/Magadan", [
		["1987-03-28T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1987-03-28T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1987-09-26T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1987-09-26T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1988" : helpers.makeTestYear("Asia/Magadan", [
		["1988-03-26T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1988-03-26T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1988-09-24T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1988-09-24T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1989" : helpers.makeTestYear("Asia/Magadan", [
		["1989-03-25T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1989-03-25T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1989-09-23T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1989-09-23T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1990" : helpers.makeTestYear("Asia/Magadan", [
		["1990-03-24T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1990-03-24T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1990-09-29T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1990-09-29T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1991" : helpers.makeTestYear("Asia/Magadan", [
		["1991-03-30T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1991-03-30T15:00:00+00:00", "02:00:00", "MAGST", -660],
		["1991-09-28T15:59:59+00:00", "02:59:59", "MAGST", -660],
		["1991-09-28T16:00:00+00:00", "02:00:00", "MAGT", -600]
	]),

	"1992" : helpers.makeTestYear("Asia/Magadan", [
		["1992-01-18T15:59:59+00:00", "01:59:59", "MAGT", -600],
		["1992-01-18T16:00:00+00:00", "03:00:00", "MAGT", -660],
		["1992-03-28T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1992-03-28T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1992-09-26T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1992-09-26T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1993" : helpers.makeTestYear("Asia/Magadan", [
		["1993-03-27T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1993-03-27T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1993-09-25T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1993-09-25T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1994" : helpers.makeTestYear("Asia/Magadan", [
		["1994-03-26T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1994-03-26T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1994-09-24T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1994-09-24T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1995" : helpers.makeTestYear("Asia/Magadan", [
		["1995-03-25T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1995-03-25T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1995-09-23T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1995-09-23T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1996" : helpers.makeTestYear("Asia/Magadan", [
		["1996-03-30T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1996-03-30T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1996-10-26T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1996-10-26T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1997" : helpers.makeTestYear("Asia/Magadan", [
		["1997-03-29T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1997-03-29T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1997-10-25T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1997-10-25T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1998" : helpers.makeTestYear("Asia/Magadan", [
		["1998-03-28T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1998-03-28T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1998-10-24T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1998-10-24T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"1999" : helpers.makeTestYear("Asia/Magadan", [
		["1999-03-27T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["1999-03-27T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["1999-10-30T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["1999-10-30T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2000" : helpers.makeTestYear("Asia/Magadan", [
		["2000-03-25T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2000-03-25T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2000-10-28T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2000-10-28T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2001" : helpers.makeTestYear("Asia/Magadan", [
		["2001-03-24T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2001-03-24T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2001-10-27T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2001-10-27T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2002" : helpers.makeTestYear("Asia/Magadan", [
		["2002-03-30T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2002-03-30T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2002-10-26T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2002-10-26T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2003" : helpers.makeTestYear("Asia/Magadan", [
		["2003-03-29T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2003-03-29T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2003-10-25T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2003-10-25T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2004" : helpers.makeTestYear("Asia/Magadan", [
		["2004-03-27T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2004-03-27T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2004-10-30T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2004-10-30T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2005" : helpers.makeTestYear("Asia/Magadan", [
		["2005-03-26T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2005-03-26T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2005-10-29T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2005-10-29T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2006" : helpers.makeTestYear("Asia/Magadan", [
		["2006-03-25T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2006-03-25T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2006-10-28T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2006-10-28T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2007" : helpers.makeTestYear("Asia/Magadan", [
		["2007-03-24T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2007-03-24T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2007-10-27T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2007-10-27T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2008" : helpers.makeTestYear("Asia/Magadan", [
		["2008-03-29T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2008-03-29T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2008-10-25T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2008-10-25T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2009" : helpers.makeTestYear("Asia/Magadan", [
		["2009-03-28T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2009-03-28T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2009-10-24T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2009-10-24T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2010" : helpers.makeTestYear("Asia/Magadan", [
		["2010-03-27T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2010-03-27T15:00:00+00:00", "03:00:00", "MAGST", -720],
		["2010-10-30T14:59:59+00:00", "02:59:59", "MAGST", -720],
		["2010-10-30T15:00:00+00:00", "02:00:00", "MAGT", -660]
	]),

	"2011" : helpers.makeTestYear("Asia/Magadan", [
		["2011-03-26T14:59:59+00:00", "01:59:59", "MAGT", -660],
		["2011-03-26T15:00:00+00:00", "03:00:00", "MAGT", -720]
	]),

	"2014" : helpers.makeTestYear("Asia/Magadan", [
		["2014-10-25T13:59:59+00:00", "01:59:59", "MAGT", -720],
		["2014-10-25T14:00:00+00:00", "00:00:00", "MAGT", -600]
	]),

	"2016" : helpers.makeTestYear("Asia/Magadan", [
		["2016-04-23T15:59:59+00:00", "01:59:59", "MAGT", -600],
		["2016-04-23T16:00:00+00:00", "03:00:00", "MAGT", -660]
	])
};