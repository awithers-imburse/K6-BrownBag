import crypto from 'k6/crypto';
import encoding from 'k6/encoding'
import http from 'k6/http';

const authenticationApiRoot = 'http://host.docker.internal:6001';
const exchangeApiRoot = 'http://host.docker.internal:6002';

function generateHmac(publicKey) {

  // We have disabled signature validation in Authentication API 
  // meaning we do not need to know the real private keys during HMAC signing.
  const privateKey64 = '******HqfY6ih6ROgVITbrEF9teDIA4kuwlbp+wRskM=';

  const timestamp = (new Date).getTime() / 1000;
  const nonce = timestamp;
  const bodySignature = '';

  const privateKey = encoding.b64decode(privateKey64, 'std', 's');
  const unsignedSignature = publicKey + ":" + nonce + ":" + timestamp + ":" + bodySignature;
  
  const hasher = crypto.createHMAC('sha256', privateKey);
  hasher.update(unsignedSignature);
  
  const hashedSignature = hasher.digest('base64url');
  const signedSignature = encoding.b64encode(hashedSignature);
  const hmac = publicKey + ":" + nonce + ":" + timestamp + ":" + signedSignature;

  return hmac;
}

function requestJwtTokenFromHmac(hmac) {

  const url = authenticationApiRoot + '/v1/identity/hmac'

  const params = {
    headers: {
      'Authorization': 'HMAC ' + hmac
    },
  };

  const res = http.post(url, '', params);

  return res.json('accessToken');
}

function requestJwtTokenExchange(jwtToken, accountId, tenantId, useCosmos) {

  const url = exchangeApiRoot + '/'

  let params = {
    headers: {
      'Authorization': 'Bearer ' + jwtToken,
      'x-account-id': accountId
    }
  };

  if (tenantId)
    params.headers['x-tenant-id'] = tenantId;

  if (useCosmos)
    params.headers['x-poc'] = "enabled";

  return http.get(url, params);
}

export function requestExchangeToken(publicKey, accountId, tenantId, useCosmos) {
    
  const hmac = generateHmac(publicKey);
  const jwtToken = requestJwtTokenFromHmac(hmac);
  return requestJwtTokenExchange(jwtToken, accountId, tenantId, useCosmos);
}