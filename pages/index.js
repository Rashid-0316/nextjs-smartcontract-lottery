import Header from "components/Header"
import LotteryEntrance from "components/LotteryEntrance"
import Head from "next/head"


export default function Home() {
    return (
        <>
            <Head>
                <title>Smart Contract Lottery</title>
                <meta name="description" content="Our Smart contract lottery" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {/* <ManualHeader /> */}
            <Header />
            <LotteryEntrance/>
        </>
    )
}
