import axios from "axios";
export async function fetchParams(apiBase: string){
  try {
    const r = await axios.get(`${apiBase}/params`);
    return r.data;
  } catch {
    return {
      flatFee: true, fee: 1000,
      firstRound: 1, lastRound: 10_000_000,
      genesisHash: "wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=",
      genesisID: "testnet-v1.0", minFee: 1000
    };
  }
}
