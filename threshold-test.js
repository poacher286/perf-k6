import { check } from 'k6';
import http from 'k6/http'

export const options = {
    vus: 2,
    iterations: 2,
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<200', 'p(90)<195', 'p(99)<300']
    }
}

const url = "https://k6.io"

export default function () {

    const res = http.get(url);

    check(res, {
        'status was 200': (r) => r.status === 200,
        'response time was acceptable': (r) => r.timings.duration < 500,
    });
    console.log(res.status);
    console.log(res.status_text);
}