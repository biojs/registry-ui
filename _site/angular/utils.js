function updateSnippets(c) {
  var baseURL = "http://workmen.biojs.net/demo/" + c.name;
  var jsBinURL = "http://workmen.biojs.net/jsbin/" + c.name;
  var codePenURL = "http://workmen.biojs.net/codepen/" + c.name;
  var plunkerURL = "http://workmen.biojs.net/plunker/" + c.name;

  c.snipURL = baseURL;
  c.selectedSnipURL = baseURL + "/" + c.selectedSnip;
  c.selectedSnipBinURL = jsBinURL + "/" + c.selectedSnip;
  c.selectedSnipCodePenURL = codePenURL + "/" + c.selectedSnip;
  c.selectedSnipPlunkerURL = plunkerURL + "/" + c.selectedSnip;

  // refresh event console
  c.eventsReceived = [];
}
