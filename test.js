import http from 'k6/http'
// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { check } from 'k6';

export const options = {
    vus: 10,
    duration: '1m',
}

export default function () {
    let res = http.get("https://test.k6.io/");
    check(res, {
        'status was 200': (r) => r.status === 200
    });
    console.log(res.status);
}

export function handleSummary(data) {
    return {
        "./report/result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}