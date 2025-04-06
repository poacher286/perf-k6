import { check } from 'k6';
import http from 'k6/http'

export const options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '10s', target: 100 },
        { duration: '5s', target: 0 }
    ]
}

export default function () {
    const res = http.get("https://test.k6.io");
    check(res, {
        'status was 200': (r) => r.status === 200,
        'response time was acceptable': (r) => r.timings.duration < 500,
    });
}

