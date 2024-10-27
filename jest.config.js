module.exports = {
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!axios)",
    ],
    moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
    testEnvironment: "jsdom",
    testMatch: [
        "<rootDir>/src/tests/**/*.test.js"  
    ],
};
