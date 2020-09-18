module.exports = {
    "preset": "ts-jest",
    "collectCoverage": true,
    "coverageThreshold": {
        "global": {
            "branches": 100,
            "functions": 100,
            "lines": 100,
            "statements": 100
        }
    },
    "coverageReporters": [
        ["lcov", {"projectRoot": "/"}],
        "text-summary"
    ],
};