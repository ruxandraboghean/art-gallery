module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "\\.(svg)$": "./jest-svg-transformer.js",
  },
  setupFiles: ["dotenv/config"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/tests/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/src/tests/__mocks__/fileMock.js",
  },
};
