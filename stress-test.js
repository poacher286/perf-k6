import { check } from 'k6';
import http from 'k6/http'

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
    stages: [
        { duration: '1m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '30s', target: 0 }
    ]
}

export default function () {
    const res = http.get("https://test.k6.io");
    check(res, {
        'status was 200': (r) => r.status === 200,
        'response time was acceptable': (r) => r.timings.duration < 500,
    });
}

export function handleSummary(data) {
    return {
        "./report/result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
