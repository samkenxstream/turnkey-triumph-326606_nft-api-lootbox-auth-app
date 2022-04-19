import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

interface Data {
  isAuthenticated: boolean;
}

interface ResponseError {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ResponseError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Only POST requests allowed',
    });
  }

  const { accountAddress } = req.body;
  // need to specifically check for the OpenSea contract
  // this contract doesn't show up on etherscan
  // OpenSea used 1 contract for all NFTs minted on their site
  // so we need to do an extra check for a specific token id as well
  if (
    process.env.CONTRACT_ADDRESS ===
    '0x495f947276749Ce646f68AC8c248420045cb7b5e'
  ) {
    const response = await axios.get('https://api.opensea.io/api/v1/assets', {
      headers: {
        'X-API-KEY': '',
      },
      params: {
        owner: accountAddress,
        asset_contract_address: process.env.CONTRACT_ADDRESS,
        token_ids: process.env.TOKEN_ID,
      },
    });
    const data = response.data;
    return res.status(200).json({
      isAuthenticated: data.assets && data.assets.length > 0,
    });
  } else {
    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'tokenbalance',
        contractaddress: process.env.CONTRACT_ADDRESS,
        address: accountAddress,
        tag: 'latest',
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });
    const data = response.data;
    return res.status(200).json({
      isAuthenticated: data.result > 0,
    });
  }
}
