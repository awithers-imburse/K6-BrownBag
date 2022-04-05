import { requestExchangeToken } from '/mnt/identityHelper.js';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
  scenarios: {
    cosmos: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 3,
      maxDuration: '300s',
      tags: { scenario: 'cosmos' },
    }
  },
  minIterationDuration: '3s' // <-- to allow identity Actors to passivate
};

const users = new SharedArray('users', function () {
  return JSON.parse(open('/mnt/tenant-api-users-all.json')).users;
});

export default function () {

  var user = users[__VU-1];

  var useCosmosPoc = true;
  
  const response = requestExchangeToken(
    user.publicKey, 
    user.accountId, 
    user.tenantId,
    useCosmosPoc);
  
  check(response, { 'status was 200': (r) => r.status == 200 });
}