import {ConnectButton} from 'web3uikit'

const Header = () => {
    return (
        <div className="p-5 border-b-2 flex flex-row justify-between">
            <h1 className='py-4 px-4 font-blog text-3xl'>Decentralized Lottery</h1>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}

export default Header