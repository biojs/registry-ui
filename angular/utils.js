function updateSnippets(c) {
  var baseURL = REGISTRY_URL + "/demo/" + c.name;
  var jsBinURL = REGISTRY_URL + "/jsbin/" + c.name;
  var codePenURL = REGISTRY_URL + "/codepen/" + c.name;
  var plunkerURL = REGISTRY_URL + "/plunker/" + c.name;

  c.snipURL = baseURL;
  c.selectedSnipURL = baseURL + "/" + c.selectedSnip;
  c.selectedSnipBinURL = jsBinURL + "/" + c.selectedSnip;
  c.selectedSnipCodePenURL = codePenURL + "/" + c.selectedSnip;
  c.selectedSnipPlunkerURL = plunkerURL + "/" + c.selectedSnip;

  // refresh event console
  c.eventsReceived = [];
}
