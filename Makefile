test:
	./test.sh

setup: # https://smallstep.com/docs/step-cli/reference/crypto/jwk
	step-cli crypto jwk create pub.json priv.json
	cat pub.json | step-cli crypto jwk keyset add ks.json

list: 
	step-cli crypto jwk keyset list ks.json

createToken:
	echo -n message | step-cli crypto jws sign --key priv.json
