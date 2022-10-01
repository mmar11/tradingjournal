import fetch from 'node-fetch';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


let stocksList = ['PETR4', 'VALE3']
let i = 0

async function getMktData(stocks) {
    let stocksData = []
    while (stocks[i]) {

        await fetch(`https://api.oplab.com.br/v3/market/stocks/${stocks[i]}`, {
            method: 'GET',
            headers: { 'Access-Token': process.env.TOKEN }
        }).then(res => res.json())
            .then(data => {
                let n = new Date();
                let y = n.getFullYear();
                let m = n.getMonth() + 1;
                let d = n.getDate();

                let resData = {
                    symbol: data.symbol,
                    name: data.name,
                    open: data.open,
                    high: data.high,
                    low: data.low,
                    close: data.close,
                    volume: data.volume,
                    financial_volume: data.financial_volume,
                    bid: data.bid,
                    ask: data.ask,
                    variation: data.variation,
                    iv_1y_rank: data.iv_1y_rank,
                    iv_current: data.iv_current,
                    stdv_1y: data.stdv_1y,
                    stdv_5d: data.stdv_5d,
                    date: `${d}/${m}/${y}`
                }
                stocksData.push(resData)
                i++
                console.log(i)
            })

    }
    i = 0
    return stocksData
}

export default getMktData