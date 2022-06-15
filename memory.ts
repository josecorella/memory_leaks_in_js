import {
    KmsKeyringNode,
    buildClient,
    CommitmentPolicy,
    MessageHeader,
} from '@aws-crypto/client-node'
import {AlgorithmSuiteIdentifier} from '@aws-crypto/material-management'

const { encryptStream, decryptUnsignedMessageStream } = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
)

import { finished } from 'stream'
import { createReadStream, createWriteStream, read } from 'fs'
import { promisify } from 'util'
const finishedAsync = promisify(finished)

export async function kmsEncryptStream(filename:string) {
    const generatorKeyId = 
        'arn:aws:kms:us-west-2:362326186324:key/667bbd52-851c-494a-8aa2-2b2c6ff3ff3a'
    const keyring = new KmsKeyringNode({ generatorKeyId })
    const context = {
        stage: 'demo',
        purpose: 'simple demonstration app',
        origin: 'us-west-2',
    }

    const readable = createReadStream(filename)
    const encFile = filename + '.encrypted'
    const writeable = createWriteStream(encFile)
    
    readable.pipe(writeable)

    writeable.on('finish', () => {
        console.log(`The new file name is ${encFile}.`);
    })
    
    
    
    
    // .on('readable', function() {
    //     var chunk: any;
    //     while (null !== (chunk = readable.read(1))) {
    //         console.log(chunk);
    //     }
    // })
    await finishedAsync(readable)
}

