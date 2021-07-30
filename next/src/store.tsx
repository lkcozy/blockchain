import { makeAutoObservable } from 'mobx'
import sha256 from 'crypto-js/sha256'
import { createContext, useContext, useEffect, FC } from 'react'

interface IBlock {
  hash: string
  transactions: Array<string>
}

const getBlockHash = (prevBlock: IBlock, block: IBlock): string => {
  return sha256(
    `${prevBlock.hash}${JSON.stringify(block.transactions)}`
  ).toString()
}

class BlockchainStore {
  blocks: Array<IBlock> = []
  transactions: Array<string> = []

  constructor() {
    makeAutoObservable(this)
  }

  get numberBlocks() {
    return this.blocks.length
  }

  get valid() {
    return this.blocks.every((block, index) => {
      const prevBlock = this.blocks[index - 1] ?? { hash: '' }
      const hash = getBlockHash(prevBlock, block)
      return hash === block.hash
    })
  }

  addTransaction(message: string) {
    this.transactions.push(message)
  }

  writeBlock() {
    if (this.transactions.length === 0) {
      return
    }

    const transactions = [...this.transactions]
    this.transactions = []
    const prevBlock = this.blocks[this.blocks.length - 1] ?? { hash: '' }
    const block = { hash: '', transactions }
    const hash = getBlockHash(prevBlock, block)
    this.blocks.push({ hash, transactions })
  }
}

const StoreContext = createContext<BlockchainStore>(new BlockchainStore())

const StoreProvider: FC<{
  store: BlockchainStore
  transactionsPendingInterval?: number
}> = ({ store, children, transactionsPendingInterval = 5000 }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      store.writeBlock()
    }, transactionsPendingInterval)

    return () => clearInterval(interval)
  }, [store])

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

const useStore = () => useContext(StoreContext)

export { BlockchainStore, StoreProvider, useStore }
