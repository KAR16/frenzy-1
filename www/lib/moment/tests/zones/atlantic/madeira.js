"use strict";

var helpers = require("../../helpers/helpers");

exports["Atlantic/Madeira"] = {
	"1912" : helpers.makeTestYear("Atlantic/Madeira", [
		["1912-01-01T01:07:35+00:00", "23:59:59", "FMT", 4056 / 60],
		["1912-01-01T01:07:36+00:00", "00:07:36", "MADT", 60]
	]),

	"1916" : helpers.makeTestYear("Atlantic/Madeira", [
		["1916-06-17T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1916-06-18T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1916-11-01T00:59:59+00:00", "00:59:59", "MADST", 0],
		["1916-11-01T01:00:00+00:00", "00:00:00", "MADT", 60]
	]),

	"1917" : helpers.makeTestYear("Atlantic/Madeira", [
		["1917-02-28T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1917-03-01T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1917-10-14T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1917-10-15T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1918" : helpers.makeTestYear("Atlantic/Madeira", [
		["1918-03-01T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1918-03-02T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1918-10-14T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1918-10-15T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1919" : helpers.makeTestYear("Atlantic/Madeira", [
		["1919-02-28T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1919-03-01T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1919-10-14T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1919-10-15T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1920" : helpers.makeTestYear("Atlantic/Madeira", [
		["1920-02-29T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1920-03-01T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1920-10-14T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1920-10-15T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1921" : helpers.makeTestYear("Atlantic/Madeira", [
		["1921-02-28T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1921-03-01T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1921-10-14T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1921-10-15T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1924" : helpers.makeTestYear("Atlantic/Madeira", [
		["1924-04-16T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1924-04-17T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1924-10-14T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1924-10-15T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1926" : helpers.makeTestYear("Atlantic/Madeira", [
		["1926-04-17T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1926-04-18T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1926-10-02T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1926-10-03T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1927" : helpers.makeTestYear("Atlantic/Madeira", [
		["1927-04-09T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1927-04-10T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1927-10-01T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1927-10-02T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1928" : helpers.makeTestYear("Atlantic/Madeira", [
		["1928-04-14T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1928-04-15T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1928-10-06T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1928-10-07T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1929" : helpers.makeTestYear("Atlantic/Madeira", [
		["1929-04-20T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1929-04-21T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1929-10-05T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1929-10-06T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1931" : helpers.makeTestYear("Atlantic/Madeira", [
		["1931-04-18T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1931-04-19T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1931-10-03T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1931-10-04T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1932" : helpers.makeTestYear("Atlantic/Madeira", [
		["1932-04-02T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1932-04-03T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1932-10-01T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1932-10-02T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1934" : helpers.makeTestYear("Atlantic/Madeira", [
		["1934-04-07T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1934-04-08T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1934-10-06T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1934-10-07T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1935" : helpers.makeTestYear("Atlantic/Madeira", [
		["1935-03-30T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1935-03-31T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1935-10-05T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1935-10-06T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1936" : helpers.makeTestYear("Atlantic/Madeira", [
		["1936-04-18T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1936-04-19T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1936-10-03T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1936-10-04T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1937" : helpers.makeTestYear("Atlantic/Madeira", [
		["1937-04-03T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1937-04-04T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1937-10-02T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1937-10-03T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1938" : helpers.makeTestYear("Atlantic/Madeira", [
		["1938-03-26T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1938-03-27T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1938-10-01T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1938-10-02T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1939" : helpers.makeTestYear("Atlantic/Madeira", [
		["1939-04-15T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1939-04-16T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1939-11-18T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1939-11-19T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1940" : helpers.makeTestYear("Atlantic/Madeira", [
		["1940-02-24T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1940-02-25T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1940-10-05T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1940-10-06T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1941" : helpers.makeTestYear("Atlantic/Madeira", [
		["1941-04-05T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1941-04-06T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1941-10-05T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1941-10-06T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1942" : helpers.makeTestYear("Atlantic/Madeira", [
		["1942-03-14T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1942-03-15T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1942-04-25T22:59:59+00:00", "22:59:59", "MADST", 0],
		["1942-04-25T23:00:00+00:00", "00:00:00", "MADMT", -60],
		["1942-08-15T22:59:59+00:00", "23:59:59", "MADMT", -60],
		["1942-08-15T23:00:00+00:00", "23:00:00", "MADST", 0],
		["1942-10-24T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1942-10-25T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1943" : helpers.makeTestYear("Atlantic/Madeira", [
		["1943-03-13T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1943-03-14T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1943-04-17T22:59:59+00:00", "22:59:59", "MADST", 0],
		["1943-04-17T23:00:00+00:00", "00:00:00", "MADMT", -60],
		["1943-08-28T22:59:59+00:00", "23:59:59", "MADMT", -60],
		["1943-08-28T23:00:00+00:00", "23:00:00", "MADST", 0],
		["1943-10-30T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1943-10-31T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1944" : helpers.makeTestYear("Atlantic/Madeira", [
		["1944-03-11T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1944-03-12T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1944-04-22T22:59:59+00:00", "22:59:59", "MADST", 0],
		["1944-04-22T23:00:00+00:00", "00:00:00", "MADMT", -60],
		["1944-08-26T22:59:59+00:00", "23:59:59", "MADMT", -60],
		["1944-08-26T23:00:00+00:00", "23:00:00", "MADST", 0],
		["1944-10-28T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1944-10-29T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1945" : helpers.makeTestYear("Atlantic/Madeira", [
		["1945-03-10T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1945-03-11T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1945-04-21T22:59:59+00:00", "22:59:59", "MADST", 0],
		["1945-04-21T23:00:00+00:00", "00:00:00", "MADMT", -60],
		["1945-08-25T22:59:59+00:00", "23:59:59", "MADMT", -60],
		["1945-08-25T23:00:00+00:00", "23:00:00", "MADST", 0],
		["1945-10-27T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1945-10-28T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1946" : helpers.makeTestYear("Atlantic/Madeira", [
		["1946-04-06T23:59:59+00:00", "22:59:59", "MADT", 60],
		["1946-04-07T00:00:00+00:00", "00:00:00", "MADST", 0],
		["1946-10-05T23:59:59+00:00", "23:59:59", "MADST", 0],
		["1946-10-06T00:00:00+00:00", "23:00:00", "MADT", 60]
	]),

	"1947" : helpers.makeTestYear("Atlantic/Madeira", [
		["1947-04-06T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1947-04-06T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1947-10-05T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1947-10-05T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1948" : helpers.makeTestYear("Atlantic/Madeira", [
		["1948-04-04T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1948-04-04T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1948-10-03T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1948-10-03T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1949" : helpers.makeTestYear("Atlantic/Madeira", [
		["1949-04-03T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1949-04-03T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1949-10-02T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1949-10-02T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1951" : helpers.makeTestYear("Atlantic/Madeira", [
		["1951-04-01T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1951-04-01T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1951-10-07T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1951-10-07T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1952" : helpers.makeTestYear("Atlantic/Madeira", [
		["1952-04-06T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1952-04-06T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1952-10-05T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1952-10-05T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1953" : helpers.makeTestYear("Atlantic/Madeira", [
		["1953-04-05T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1953-04-05T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1953-10-04T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1953-10-04T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1954" : helpers.makeTestYear("Atlantic/Madeira", [
		["1954-04-04T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1954-04-04T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1954-10-03T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1954-10-03T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1955" : helpers.makeTestYear("Atlantic/Madeira", [
		["1955-04-03T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1955-04-03T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1955-10-02T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1955-10-02T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1956" : helpers.makeTestYear("Atlantic/Madeira", [
		["1956-04-01T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1956-04-01T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1956-10-07T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1956-10-07T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1957" : helpers.makeTestYear("Atlantic/Madeira", [
		["1957-04-07T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1957-04-07T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1957-10-06T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1957-10-06T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1958" : helpers.makeTestYear("Atlantic/Madeira", [
		["1958-04-06T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1958-04-06T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1958-10-05T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1958-10-05T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1959" : helpers.makeTestYear("Atlantic/Madeira", [
		["1959-04-05T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1959-04-05T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1959-10-04T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1959-10-04T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1960" : helpers.makeTestYear("Atlantic/Madeira", [
		["1960-04-03T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1960-04-03T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1960-10-02T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1960-10-02T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1961" : helpers.makeTestYear("Atlantic/Madeira", [
		["1961-04-02T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1961-04-02T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1961-10-01T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1961-10-01T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1962" : helpers.makeTestYear("Atlantic/Madeira", [
		["1962-04-01T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1962-04-01T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1962-10-07T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1962-10-07T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1963" : helpers.makeTestYear("Atlantic/Madeira", [
		["1963-04-07T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1963-04-07T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1963-10-06T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1963-10-06T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1964" : helpers.makeTestYear("Atlantic/Madeira", [
		["1964-04-05T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1964-04-05T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1964-10-04T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1964-10-04T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1965" : helpers.makeTestYear("Atlantic/Madeira", [
		["1965-04-04T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1965-04-04T03:00:00+00:00", "03:00:00", "MADST", 0],
		["1965-10-03T02:59:59+00:00", "02:59:59", "MADST", 0],
		["1965-10-03T03:00:00+00:00", "02:00:00", "MADT", 60]
	]),

	"1966" : helpers.makeTestYear("Atlantic/Madeira", [
		["1966-04-03T02:59:59+00:00", "01:59:59", "MADT", 60],
		["1966-04-03T03:00:00+00:00", "03:00:00", "WET", 0]
	]),

	"1977" : helpers.makeTestYear("Atlantic/Madeira", [
		["1977-03-26T23:59:59+00:00", "23:59:59", "WET", 0],
		["1977-03-27T00:00:00+00:00", "01:00:00", "WEST", -60],
		["1977-09-24T23:59:59+00:00", "00:59:59", "WEST", -60],
		["1977-09-25T00:00:00+00:00", "00:00:00", "WET", 0]
	]),

	"1978" : helpers.makeTestYear("Atlantic/Madeira", [
		["1978-04-01T23:59:59+00:00", "23:59:59", "WET", 0],
		["1978-04-02T00:00:00+00:00", "01:00:00", "WEST", -60],
		["1978-09-30T23:59:59+00:00", "00:59:59", "WEST", -60],
		["1978-10-01T00:00:00+00:00", "00:00:00", "WET", 0]
	]),

	"1979" : helpers.makeTestYear("Atlantic/Madeira", [
		["1979-03-31T23:59:59+00:00", "23:59:59", "WET", 0],
		["1979-04-01T00:00:00+00:00", "01:00:00", "WEST", -60],
		["1979-09-30T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1979-09-30T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1980" : helpers.makeTestYear("Atlantic/Madeira", [
		["1980-03-29T23:59:59+00:00", "23:59:59", "WET", 0],
		["1980-03-30T00:00:00+00:00", "01:00:00", "WEST", -60],
		["1980-09-28T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1980-09-28T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1981" : helpers.makeTestYear("Atlantic/Madeira", [
		["1981-03-29T00:59:59+00:00", "00:59:59", "WET", 0],
		["1981-03-29T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1981-09-27T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1981-09-27T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1982" : helpers.makeTestYear("Atlantic/Madeira", [
		["1982-03-28T00:59:59+00:00", "00:59:59", "WET", 0],
		["1982-03-28T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1982-09-26T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1982-09-26T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1983" : helpers.makeTestYear("Atlantic/Madeira", [
		["1983-03-27T01:59:59+00:00", "01:59:59", "WET", 0],
		["1983-03-27T02:00:00+00:00", "03:00:00", "WEST", -60],
		["1983-09-25T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1983-09-25T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1984" : helpers.makeTestYear("Atlantic/Madeira", [
		["1984-03-25T00:59:59+00:00", "00:59:59", "WET", 0],
		["1984-03-25T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1984-09-30T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1984-09-30T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1985" : helpers.makeTestYear("Atlantic/Madeira", [
		["1985-03-31T00:59:59+00:00", "00:59:59", "WET", 0],
		["1985-03-31T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1985-09-29T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1985-09-29T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1986" : helpers.makeTestYear("Atlantic/Madeira", [
		["1986-03-30T00:59:59+00:00", "00:59:59", "WET", 0],
		["1986-03-30T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1986-09-28T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1986-09-28T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1987" : helpers.makeTestYear("Atlantic/Madeira", [
		["1987-03-29T00:59:59+00:00", "00:59:59", "WET", 0],
		["1987-03-29T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1987-09-27T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1987-09-27T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1988" : helpers.makeTestYear("Atlantic/Madeira", [
		["1988-03-27T00:59:59+00:00", "00:59:59", "WET", 0],
		["1988-03-27T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1988-09-25T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1988-09-25T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1989" : helpers.makeTestYear("Atlantic/Madeira", [
		["1989-03-26T00:59:59+00:00", "00:59:59", "WET", 0],
		["1989-03-26T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1989-09-24T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1989-09-24T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1990" : helpers.makeTestYear("Atlantic/Madeira", [
		["1990-03-25T00:59:59+00:00", "00:59:59", "WET", 0],
		["1990-03-25T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1990-09-30T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1990-09-30T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1991" : helpers.makeTestYear("Atlantic/Madeira", [
		["1991-03-31T00:59:59+00:00", "00:59:59", "WET", 0],
		["1991-03-31T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1991-09-29T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1991-09-29T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1992" : helpers.makeTestYear("Atlantic/Madeira", [
		["1992-03-29T00:59:59+00:00", "00:59:59", "WET", 0],
		["1992-03-29T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1992-09-27T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1992-09-27T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1993" : helpers.makeTestYear("Atlantic/Madeira", [
		["1993-03-28T00:59:59+00:00", "00:59:59", "WET", 0],
		["1993-03-28T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1993-09-26T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1993-09-26T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1994" : helpers.makeTestYear("Atlantic/Madeira", [
		["1994-03-27T00:59:59+00:00", "00:59:59", "WET", 0],
		["1994-03-27T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1994-09-25T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1994-09-25T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1995" : helpers.makeTestYear("Atlantic/Madeira", [
		["1995-03-26T00:59:59+00:00", "00:59:59", "WET", 0],
		["1995-03-26T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1995-09-24T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1995-09-24T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1996" : helpers.makeTestYear("Atlantic/Madeira", [
		["1996-03-31T00:59:59+00:00", "00:59:59", "WET", 0],
		["1996-03-31T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1996-10-27T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1996-10-27T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1997" : helpers.makeTestYear("Atlantic/Madeira", [
		["1997-03-30T00:59:59+00:00", "00:59:59", "WET", 0],
		["1997-03-30T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1997-10-26T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1997-10-26T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1998" : helpers.makeTestYear("Atlantic/Madeira", [
		["1998-03-29T00:59:59+00:00", "00:59:59", "WET", 0],
		["1998-03-29T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1998-10-25T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1998-10-25T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"1999" : helpers.makeTestYear("Atlantic/Madeira", [
		["1999-03-28T00:59:59+00:00", "00:59:59", "WET", 0],
		["1999-03-28T01:00:00+00:00", "02:00:00", "WEST", -60],
		["1999-10-31T00:59:59+00:00", "01:59:59", "WEST", -60],
		["1999-10-31T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2000" : helpers.makeTestYear("Atlantic/Madeira", [
		["2000-03-26T00:59:59+00:00", "00:59:59", "WET", 0],
		["2000-03-26T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2000-10-29T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2000-10-29T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2001" : helpers.makeTestYear("Atlantic/Madeira", [
		["2001-03-25T00:59:59+00:00", "00:59:59", "WET", 0],
		["2001-03-25T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2001-10-28T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2001-10-28T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2002" : helpers.makeTestYear("Atlantic/Madeira", [
		["2002-03-31T00:59:59+00:00", "00:59:59", "WET", 0],
		["2002-03-31T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2002-10-27T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2002-10-27T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2003" : helpers.makeTestYear("Atlantic/Madeira", [
		["2003-03-30T00:59:59+00:00", "00:59:59", "WET", 0],
		["2003-03-30T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2003-10-26T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2003-10-26T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2004" : helpers.makeTestYear("Atlantic/Madeira", [
		["2004-03-28T00:59:59+00:00", "00:59:59", "WET", 0],
		["2004-03-28T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2004-10-31T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2004-10-31T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2005" : helpers.makeTestYear("Atlantic/Madeira", [
		["2005-03-27T00:59:59+00:00", "00:59:59", "WET", 0],
		["2005-03-27T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2005-10-30T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2005-10-30T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2006" : helpers.makeTestYear("Atlantic/Madeira", [
		["2006-03-26T00:59:59+00:00", "00:59:59", "WET", 0],
		["2006-03-26T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2006-10-29T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2006-10-29T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2007" : helpers.makeTestYear("Atlantic/Madeira", [
		["2007-03-25T00:59:59+00:00", "00:59:59", "WET", 0],
		["2007-03-25T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2007-10-28T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2007-10-28T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2008" : helpers.makeTestYear("Atlantic/Madeira", [
		["2008-03-30T00:59:59+00:00", "00:59:59", "WET", 0],
		["2008-03-30T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2008-10-26T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2008-10-26T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2009" : helpers.makeTestYear("Atlantic/Madeira", [
		["2009-03-29T00:59:59+00:00", "00:59:59", "WET", 0],
		["2009-03-29T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2009-10-25T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2009-10-25T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2010" : helpers.makeTestYear("Atlantic/Madeira", [
		["2010-03-28T00:59:59+00:00", "00:59:59", "WET", 0],
		["2010-03-28T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2010-10-31T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2010-10-31T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2011" : helpers.makeTestYear("Atlantic/Madeira", [
		["2011-03-27T00:59:59+00:00", "00:59:59", "WET", 0],
		["2011-03-27T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2011-10-30T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2011-10-30T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2012" : helpers.makeTestYear("Atlantic/Madeira", [
		["2012-03-25T00:59:59+00:00", "00:59:59", "WET", 0],
		["2012-03-25T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2012-10-28T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2012-10-28T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2013" : helpers.makeTestYear("Atlantic/Madeira", [
		["2013-03-31T00:59:59+00:00", "00:59:59", "WET", 0],
		["2013-03-31T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2013-10-27T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2013-10-27T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2014" : helpers.makeTestYear("Atlantic/Madeira", [
		["2014-03-30T00:59:59+00:00", "00:59:59", "WET", 0],
		["2014-03-30T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2014-10-26T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2014-10-26T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2015" : helpers.makeTestYear("Atlantic/Madeira", [
		["2015-03-29T00:59:59+00:00", "00:59:59", "WET", 0],
		["2015-03-29T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2015-10-25T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2015-10-25T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2016" : helpers.makeTestYear("Atlantic/Madeira", [
		["2016-03-27T00:59:59+00:00", "00:59:59", "WET", 0],
		["2016-03-27T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2016-10-30T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2016-10-30T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2017" : helpers.makeTestYear("Atlantic/Madeira", [
		["2017-03-26T00:59:59+00:00", "00:59:59", "WET", 0],
		["2017-03-26T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2017-10-29T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2017-10-29T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2018" : helpers.makeTestYear("Atlantic/Madeira", [
		["2018-03-25T00:59:59+00:00", "00:59:59", "WET", 0],
		["2018-03-25T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2018-10-28T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2018-10-28T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2019" : helpers.makeTestYear("Atlantic/Madeira", [
		["2019-03-31T00:59:59+00:00", "00:59:59", "WET", 0],
		["2019-03-31T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2019-10-27T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2019-10-27T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2020" : helpers.makeTestYear("Atlantic/Madeira", [
		["2020-03-29T00:59:59+00:00", "00:59:59", "WET", 0],
		["2020-03-29T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2020-10-25T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2020-10-25T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2021" : helpers.makeTestYear("Atlantic/Madeira", [
		["2021-03-28T00:59:59+00:00", "00:59:59", "WET", 0],
		["2021-03-28T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2021-10-31T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2021-10-31T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2022" : helpers.makeTestYear("Atlantic/Madeira", [
		["2022-03-27T00:59:59+00:00", "00:59:59", "WET", 0],
		["2022-03-27T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2022-10-30T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2022-10-30T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2023" : helpers.makeTestYear("Atlantic/Madeira", [
		["2023-03-26T00:59:59+00:00", "00:59:59", "WET", 0],
		["2023-03-26T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2023-10-29T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2023-10-29T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2024" : helpers.makeTestYear("Atlantic/Madeira", [
		["2024-03-31T00:59:59+00:00", "00:59:59", "WET", 0],
		["2024-03-31T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2024-10-27T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2024-10-27T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2025" : helpers.makeTestYear("Atlantic/Madeira", [
		["2025-03-30T00:59:59+00:00", "00:59:59", "WET", 0],
		["2025-03-30T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2025-10-26T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2025-10-26T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2026" : helpers.makeTestYear("Atlantic/Madeira", [
		["2026-03-29T00:59:59+00:00", "00:59:59", "WET", 0],
		["2026-03-29T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2026-10-25T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2026-10-25T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2027" : helpers.makeTestYear("Atlantic/Madeira", [
		["2027-03-28T00:59:59+00:00", "00:59:59", "WET", 0],
		["2027-03-28T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2027-10-31T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2027-10-31T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2028" : helpers.makeTestYear("Atlantic/Madeira", [
		["2028-03-26T00:59:59+00:00", "00:59:59", "WET", 0],
		["2028-03-26T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2028-10-29T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2028-10-29T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2029" : helpers.makeTestYear("Atlantic/Madeira", [
		["2029-03-25T00:59:59+00:00", "00:59:59", "WET", 0],
		["2029-03-25T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2029-10-28T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2029-10-28T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2030" : helpers.makeTestYear("Atlantic/Madeira", [
		["2030-03-31T00:59:59+00:00", "00:59:59", "WET", 0],
		["2030-03-31T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2030-10-27T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2030-10-27T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2031" : helpers.makeTestYear("Atlantic/Madeira", [
		["2031-03-30T00:59:59+00:00", "00:59:59", "WET", 0],
		["2031-03-30T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2031-10-26T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2031-10-26T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2032" : helpers.makeTestYear("Atlantic/Madeira", [
		["2032-03-28T00:59:59+00:00", "00:59:59", "WET", 0],
		["2032-03-28T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2032-10-31T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2032-10-31T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2033" : helpers.makeTestYear("Atlantic/Madeira", [
		["2033-03-27T00:59:59+00:00", "00:59:59", "WET", 0],
		["2033-03-27T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2033-10-30T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2033-10-30T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2034" : helpers.makeTestYear("Atlantic/Madeira", [
		["2034-03-26T00:59:59+00:00", "00:59:59", "WET", 0],
		["2034-03-26T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2034-10-29T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2034-10-29T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2035" : helpers.makeTestYear("Atlantic/Madeira", [
		["2035-03-25T00:59:59+00:00", "00:59:59", "WET", 0],
		["2035-03-25T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2035-10-28T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2035-10-28T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2036" : helpers.makeTestYear("Atlantic/Madeira", [
		["2036-03-30T00:59:59+00:00", "00:59:59", "WET", 0],
		["2036-03-30T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2036-10-26T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2036-10-26T01:00:00+00:00", "01:00:00", "WET", 0]
	]),

	"2037" : helpers.makeTestYear("Atlantic/Madeira", [
		["2037-03-29T00:59:59+00:00", "00:59:59", "WET", 0],
		["2037-03-29T01:00:00+00:00", "02:00:00", "WEST", -60],
		["2037-10-25T00:59:59+00:00", "01:59:59", "WEST", -60],
		["2037-10-25T01:00:00+00:00", "01:00:00", "WET", 0]
	])
};