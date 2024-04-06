import { Injectable } from '@nestjs/common';
import { GetPayDTO, PostPayDTO } from 'src/dto/pay.dto';
import {
  Connection,
  Keypair,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import {
  createTransferCheckedInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMint,
} from '@solana/spl-token';

@Injectable()
export class PayService {
  splToken: PublicKey;
  merchantWallet: PublicKey;

  constructor() {
    this.splToken = new PublicKey(process.env.USDC_MINT);
    this.merchantWallet = new PublicKey(process.env.MERCHANT_WALLET);
  }

  getPay(): GetPayDTO {
    const label = 'AidEyeKit';
    const icon = 'https://aideyekit.com/images/Logo.svg';

    return new GetPayDTO(label, icon);
  }

  async postPay(body: any): Promise<PostPayDTO> {
    const accountField = body.account;
    if (!accountField) throw new Error('missing account');

    const sender = new PublicKey(accountField);

    const splTransferIx = await createSplTransferIx(sender, Connection);

    const transaction = new VersionedTransaction(
      new TransactionMessage({
        payerKey: sender,
        recentBlockhash: '11111111111111111111111111111111',
        instructions: [splTransferIx],
      }).compileToV0Message(),
    );

    const serializedTransaction = transaction.serialize();

    const base64Transaction = Buffer.from(serializedTransaction).toString(
      'base64',
    );
    const message = 'Thank you for your purchase';

    return new PostPayDTO(base64Transaction, message);
  }
}

async function createSplTransferIx(sender, connection) {
  const senderInfo = await connection.getAccountInfo(sender);
  if (!senderInfo) throw new Error('sender not found');

  const senderATA = await getAssociatedTokenAddress(this.splToken, sender);
  const senderAccount = await getAccount(connection, senderATA);
  if (!senderAccount.isInitialized) throw new Error('sender not initialized');
  if (senderAccount.isFrozen) throw new Error('sender frozen');

  const merchantATA = await getAssociatedTokenAddress(
    this.splToken,
    this.merchantWallet,
  );
  const merchantAccount = await getAccount(connection, merchantATA);
  if (!merchantAccount.isInitialized)
    throw new Error('merchant not initialized');
  if (merchantAccount.isFrozen) throw new Error('merchant frozen');

  const mint = await getMint(connection, this.splToken);
  if (!mint.isInitialized) throw new Error('mint not initialized');

  let amount = calculateCheckoutAmount();
  amount = amount
    .times(new BigNumber(10).pow(mint.decimals))
    .integerValue(BigNumber.ROUND_FLOOR);

  const tokens = BigInt(String(amount));
  if (tokens > senderAccount.amount) throw new Error('insufficient funds');

  const splTransferIx = createTransferCheckedInstruction(
    senderATA,
    this.splToken,
    merchantATA,
    sender,
    tokens,
    mint.decimals,
  );

  const references = [new Keypair().publicKey];

  for (const pubkey of references) {
    splTransferIx.keys.push({ pubkey, isWritable: false, isSigner: false });
  }

  return splTransferIx;
}

function calculateCheckoutAmount(): BigNumber {
  // This is a placeholder value. Replace this with your actual logic to calculate the checkout amount.
  // For example, you might fetch the prices of items in a shopping cart, apply discounts, add taxes, etc.
  return new BigNumber(10);
}
