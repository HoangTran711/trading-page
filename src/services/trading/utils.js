import { PRV } from './fee/pairsData'
import { BigNumber } from 'bignumber.js'
import { toHumanAmount } from './convert'
import { fixedNumber, amount, amountFull } from './format'
import { PRV_TOKEN_ID } from 'constant/token'
import _, { isNaN, floor, ceil } from 'lodash';

export const calculateOutputValue = (pair, inputToken, inputValue, outputToken) => {
  try {
    if (!pair) {
      return 0
    }
    // const [inputPool, outputPool] = getCouplePair(inputToken, outputToken)
    const inputPool = pair[inputToken.id]
    const outputPool = pair[outputToken.id]
    const initialPool = inputPool * outputPool

    const newInputPool = inputPool + inputValue
    const newOutputPoolWithFee = _.ceil(initialPool / newInputPool)
    return outputPool - newOutputPoolWithFee
  } catch (error) {
    console.debug('CALCULATE OUTPUT', error)
  }
}
export const calculateInputValue = (pair, inputToken, outputValue, outputToken) => {
  try {
    const inputPool = pair[inputToken.id]
    const outputPool = pair[outputToken.id]
    const initialPool = inputPool * outputPool
    return _.ceil(initialPool / (outputPool - outputValue)) - inputPool
  } catch (error) {
    console.debug('CALCULATE OUTPUT', error)
  }
}
export const calculateInputValueCrossPool = (pairs, inputToken, outputValue, outputToken) => {
  const firstPair = _.get(pairs, 0)
  const secondPair = _.get(pairs, 1)
  let currentOutputToken = inputToken
  let inputValue = outputValue

  if (secondPair) {
    inputValue = calculateInputValue(secondPair, PRV, inputValue, outputToken)
    currentOutputToken = PRV
    inputValue = calculateInputValue(firstPair, inputToken, inputValue, currentOutputToken)
  } else {
    inputValue = calculateInputValue(firstPair, currentOutputToken, inputValue, outputToken)
  }

  if (inputValue < 0) {
    inputValue = 0
  }

  return inputValue
}
export const calculateOutputValueCrossPool = (pairs, inputToken, inputValue, outputToken) => {
  const [firstPair, secondPair] = getCouplePair(inputToken, outputToken,pairs)
  let currentInputToken = inputToken
  let outputValue = inputValue
  if (secondPair) {
    outputValue = calculateOutputValue(firstPair, currentInputToken, outputValue, PRV)
    currentInputToken = PRV
  }

  outputValue = calculateOutputValue(secondPair || firstPair, currentInputToken, outputValue, outputToken)
  console.log(outputValue)
  if (outputValue < 0) {
    outputValue = 0
  }
  return outputValue
}

const getImpact = (input, output) => {
  input = new BigNumber(input)
  output = new BigNumber(output)
  return output.minus(input).dividedBy(input).multipliedBy(100).toNumber()
}
export const calculateSizeImpact = (inputValue, inputToken, outputValue, outputToken, inputPriceUsd, inputPDecimals,  outputPriceUsd, outputPDecimals) => {
  const totalInputUsd   = toHumanAmount(inputValue * inputPriceUsd, inputPDecimals);
  const totalOutputUsd  = toHumanAmount(outputValue * outputPriceUsd, outputPDecimals);
  console.log('test1',totalInputUsd, totalOutputUsd)
  if (totalInputUsd && totalOutputUsd) {
    
    const impact = fixedNumber(getImpact(totalInputUsd, totalOutputUsd), 3);
    if (!isNaN(impact)) {
      const formatSeparator = amount(impact);
      return {
        impact: impact > 0 ? `+${formatSeparator}` : formatSeparator,
        showWarning: impact < -5
      };
    }
  }
  return {
    impact: null,
    showWarning: false
  };
};
export const calculatorOriginalOutputSlippage = (outputValue, slippage) => (
  ceil(outputValue / getSlippagePercent(slippage))
)
export const getSlippagePercent = (slippage) => ((100 - slippage) / 100)
export const calculateOutputIncognitoNetWork = (payload) => {
  try {
    const {
      pair,
      inputToken,
      inputValue,
      outputToken,
      slippage
    } = payload;
    const outputValue = calculateOutputValueCrossPool(pair, inputToken, inputValue, outputToken);

    const minimumAmount = floor(outputValue * getSlippagePercent(slippage));

    let outputText = amountFull(minimumAmount, outputToken?.pDecimals);

    if (outputValue === 0 || minimumAmount === 0 || isNaN(minimumAmount)) {
      outputText = 0;
    }

    outputText = outputText + '';

    return {
      minimumAmount,
      quote: null,
      outputText,
    };
  } catch (error) {
    console.debug('TRADE CALCULATOR TRADE STAGE INCOGNITO ERROR: ', error);
  }
};
export const getCouplePair = (inputToken, outputToken, pairs) => {
  try {
    if (inputToken && outputToken) {
      // InputToken or OutputToken is PRV
      if (inputToken?.id === PRV_TOKEN_ID || outputToken?.id === PRV_TOKEN_ID) {
        const pair = pairs.find(
          (item) =>
            item.keys.includes(inputToken?.id) &&
            item.keys.includes(outputToken?.id),
        );
        return [pair];
      } else {
        // Dont have PRV in InputToken & OutputToken
        const inPair = pairs.find(
          (item) =>
            item.keys.includes(inputToken?.id) &&
            item.keys.includes(PRV_TOKEN_ID),
        );
        const outPair = pairs.find(
          (item) =>
            item.keys.includes(outputToken?.id) &&
            item.keys.includes(PRV_TOKEN_ID),
        );
        if (inPair && outPair) {
          return [inPair, outPair];
        }
      }
    }
    return [];
  } catch (error) {
    console.debug('TRADE GET PAIR WITH ERROR', error);
  }
}
export const getPoolSize = (inputToken,outputToken, pairs) => {
  const [firstPair,secondPair]= getCouplePair(inputToken, outputToken,pairs)
  if(firstPair) {
    var inputPool = firstPair[inputToken?.id] || 0;
    const outputPool = firstPair[PRV_TOKEN_ID] || 0;
    if(inputToken.id === PRV_TOKEN_ID) {
      inputPool = firstPair[outputToken?.id] || 0
    }
    console.log('input-pool: ',firstPair, inputPool)
    const formattedInputPool = amount(
      inputPool,
      inputToken.id ===PRV_TOKEN_ID?outputToken?.pDecimals : inputToken?.pDecimals,
      true,
    );
    const formattedOutputPool = amount(
      outputPool,
      PRV.pDecimals,
      true,
    );
    if(secondPair) {
      const inputPool2 = secondPair[outputToken?.id] || 0;
      const outputPool2 = secondPair[PRV_TOKEN_ID] || 0;
      const formattedInputPool2 = amount(
        inputPool2,
        outputToken?.pDecimals,
        true,
      );
      const formattedOutputPool2 = amount(
        outputPool2,
        PRV.pDecimals,
        true,
      );
      return {
        output1: [formattedInputPool, formattedOutputPool],
        output2: [formattedInputPool2, formattedOutputPool2]
      }
    }
    return {
      output1: [formattedInputPool, formattedOutputPool],
      output2: null
    }
  }
  return {
    output1: null,
    output2: null
  }
} 
