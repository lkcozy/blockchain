import { useState, FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from 'src/store'
import sha256 from 'crypto-js/sha256'

const Home: FC = () => {
  return (
    <main>
      <Title />
      <Form />
      <Transactions />
      <Blocks />
    </main>
  )
}

const Title: FC = observer(() => {
  const { numberBlocks, valid } = useStore()

  return (
    <h1>
      {numberBlocks} Blocks ({valid ? 'Valid' : 'Invalid'})
    </h1>
  )
})

const Form: FC = () => {
  const [message, setMessage] = useState('')
  const store = useStore()

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        store.addTransaction(message)
        setMessage('')
      }}
    >
      <input
        type='text'
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder='message'
        required
      />
      <button type='submit'>Add</button>
    </form>
  )
}

const Transactions: FC = observer(() => {
  const store = useStore()

  return store.transactions.length > 0 ? (
    <div>
      <h2>Pending Transactions</h2>
      <ul className='pending'>
        {store.transactions.map(transaction => (
          <li key={sha256(transaction).toString()}>{transaction}</li>
        ))}
      </ul>
    </div>
  ) : null
})

const Blocks: FC = observer(() => {
  const { blocks } = useStore()

  return (
    <div>
      <h2>Blocks</h2>
      <ul className='blocks'>
        {[...blocks].reverse().map(block => (
          <li key={block.hash}>
            <h3>{block.hash}</h3>
            <pre>{JSON.stringify(block.transactions, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Home
