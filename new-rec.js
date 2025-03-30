// Creator: Grafana k6 Browser Recorder 1.0.7

import { sleep, group } from 'k6'
import http from 'k6/http'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  vus: 10,
  iterations: 20,
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
  discardResponseBodies: true,
  setupTimeout: '30s',
  teardownTimeout: '30s',
  insecureSkipTLSVerify: true,
  noConnectionReuse: true,
  maxRedirects: 0
}

export default function main() {
  let response

  group('page_1 - https://test.k6.io/', function () {
    response = http.get('https://test.k6.io/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://test.k6.io/static/css/site.css', {
      headers: {
        referer: 'https://test.k6.io/',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://test.k6.io/static/js/prisms.js', {
      headers: {
        referer: 'https://test.k6.io/',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
    response = http.get('https://test.k6.io/static/favicon.ico', {
      headers: {
        referer: 'https://test.k6.io/',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
  })

  group('page_2 - https://test.k6.io/my_messages.php', function () {
    response = http.get('https://test.k6.io/my_messages.php', {
      headers: {
        referer: 'https://test.k6.io/',
        'upgrade-insecure-requests': '1',
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })
  })

  group('page_3 - https://test.k6.io/login.php', function () {
    response = http.post(
      'https://test.k6.io/login.php',
      {
        redir: '1',
        csrftoken: 'OTU1MjExNjYz',
        login: 'admin',
        password: '123',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'https://test.k6.io',
          referer: 'https://test.k6.io/my_messages.php',
          'upgrade-insecure-requests': '1',
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
  })

  group('page_4 - https://test.k6.io/login.php', function () {
    response = http.post(
      'https://test.k6.io/login.php',
      {
        redir: '1',
        csrftoken: 'MzY5NDg3NDg4',
      },
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          origin: 'https://test.k6.io',
          referer: 'https://test.k6.io/my_messages.php',
          'upgrade-insecure-requests': '1',
          'user-agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
        },
      }
    )
  })

  // Automatically added sleep
  sleep(1)
}

export function handleSummary(data) {
  return {
    "new-rec-result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true })
  };
}
