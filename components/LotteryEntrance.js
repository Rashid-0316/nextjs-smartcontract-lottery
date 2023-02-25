import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import {useMoralis} from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from 'ethers';
import {useNotification} from "web3uikit"
function LotteryEntrance() {
  const { chainId: chaindIdHex,isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chaindIdHex)
  const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const [entranceFee, setEntranceFee] = useState("0")
  const [numPlayer, setNumPlayer] = useState("0")
  const [recenteWinnder, setRecenteWinnder] = useState("0")
  const dispatch = useNotification()
  const { runContractFunction:getEntranceFee } = useWeb3Contract({
    abi:abi,
    contractAddress: raffleAddress,
    functionName:"getEntranceFee",
    params:{},
  })
  const { runContractFunction:enterRaffle,isFetching,isLoading } = useWeb3Contract({
      abi:abi,
      contractAddress: raffleAddress,
      functionName:"enterRaffle",
      params:{},
      msgValue:entranceFee,
  })
    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })
    const { runContractFunction:getRecentWinner } = useWeb3Contract({
        abi:abi,
      contractAddress: raffleAddress,
        functionName:"getRecentWinner",
        params:{},
    })
  
  const handleNotification = function () {
    dispatch({
      type: "info",
      message: "Transaction Complete",
      title: "Tx Notification",
      position: "topR",
      icon:"bell",
    })
  }
  async function updateUI() {
      const getEntranceFeeFromContract = await getEntranceFee()
      const numPlayerFromCall = await getNumberOfPlayers()
      const getRecentWinnerFromCall = await getRecentWinner()
      setEntranceFee(getEntranceFeeFromContract.toString())
      setNumPlayer(numPlayerFromCall.toString())
      setRecenteWinnder(getRecentWinnerFromCall.toString())
  }
  useEffect(() => {
      if (isWeb3Enabled) {
          
          updateUI()
      }
  }, [isWeb3Enabled])
  const handleSuccess = async function (tx) {
      await tx.wait(1)
      handleNotification(tx)
      updateUI()
  }
  return (
      <div className="p-5">
          LotteryEntrance <br />
          {raffleAddress ? (
              <div>
                  <button
                      onClick={async function () {
                          await enterRaffle({
                              onSuccess: handleSuccess,
                              onError: (error) => console.log(error),
                          })
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      disabled={(isFetching||isLoading)}
                  >
                      Enter Raffle
                  </button>
                  Entrance Fee: {ethers.utils.formatUnits(entranceFee)} <br />
                  Number of Players: {numPlayer} <br />
                  Recent Winner: {recenteWinnder}
              </div>
          ) : (
              <div>No Raffle Address detected</div>
          )}
      </div>
  )
}

export default LotteryEntrance