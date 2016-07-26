exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec-mock.js'],
  params: {
    url: "http://localhost:8080"
  }
}
