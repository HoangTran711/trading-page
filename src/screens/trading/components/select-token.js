import React from 'react'
import './select-token.css'
import { MyContext } from 'Context/MyContext'
import { useSearchableTokenList } from 'queries/token.queries'
import { IconButton, getTheme,PersonaPresence, mergeStyleSets, getFocusStyle,Persona, FocusZoneDirection,  FocusZone, List } from '@fluentui/react'
import { orderBy, filter } from 'lodash'
const theme = getTheme();
const { palette, semanticColors, fonts } = theme;
const classNames = mergeStyleSets({
  container: {
    overflow: 'auto',
    maxHeight: 500,
  },
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyDivider}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: palette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
})
const onRenderCell = (item, index, isScrolling, onHandleSelectToken, dataContext) => {
    const tokensPersona = {
        imageUrl: item?.Icon,
        imageInitials: item?.Name[0] + item?.Name[1],
        text: item?.Name,
        secondaryText: item?.PSymbol || item?.Symbol,
      };
    return (
      <div onClick={() => onHandleSelectToken(item)}  className={`${(dataContext.tokenSell?.Symbol === item.Symbol || dataContext.tokenReceive?.Symbol === item.Symbol) ? 'opacity-50': ''} cursor-pointer ${classNames.itemCell}`} data-is-focusable={true}>
        <Persona {...tokensPersona} presence={item.Verified ? PersonaPresence.online : PersonaPresence.offline} imageAlt="Image" />
      </div>
    );
  }
const ListTokens = ({tokens, onHandleSelectToken, dataContext}) => {
    
    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <div className={classNames.container} data-is-scrollable>
          <List items={tokens} onRenderCell={(item, index, isScrolling) => onRenderCell(item, index, isScrolling, onHandleSelectToken, dataContext)} />
        </div>
      </FocusZone>
    );
};
  
export const SelectToken = () => {
    const data = React.useContext(MyContext)
    const { data: searchIndex, isSuccess } = useSearchableTokenList('Symbol', 'PSymbol', 'Name', 'TokenID')
    const onHandleSelectToken = (item) => {
      if(data.tokenActive === 'sell'){
        data.setTokenSell(item)
      } else if (data.tokenActive === 'receive') {
        data.setTokenReceive(item)
      }
      data.onHandleSelectTokens()
    }
    
    const tokenList = React.useMemo(() => {
      if(isSuccess) {
        if (!data.tokens) {
          return []
        }
        if (`${data.valueInputSearch}`.trim() !== '') {
          const baseSearch = searchIndex
          return baseSearch.search(`^${data.valueInputSearch}`).map((i) => i.item)
        }
        
        return orderBy(filter(data.tokens, { Verified: false }), ['Verified', 'Symbol', 'PSymbol', 'IsCustom'], ['desc', 'asc', 'asc', 'desc'])
      }
      return []
    }, [data.tokens, data.valueInputSearch, searchIndex, isSuccess])
    return (
        <div className="select-token">
            <div onClick={data.onHandleSelectTokens} className="overlay"/>
            <div className="select-token-panel">
                <div className="heading-primary">
                    <h3>Select Token</h3>
                    <IconButton onClick={data.onHandleSelectTokens} iconProps={{ iconName: 'ChromeClose' }} title="Close" ariaLabel="Close" />
                </div>
                <div className="input-token">
                    <input onChange={(e) => data.setValueInputSearch(e.target.value)}value={data.valueInputSearch} type="text" placeholder="Search name or paste address"/>
                </div>
                <div className="list-token">
                  <div className="token-heading">
                    <p>Token Name</p>
                    <IconButton iconProps={{ iconName: 'SortLines' }} title="Close" ariaLabel="Close" />
                  </div>
                {
                    data.fetchTokensSuccess ? <ListTokens dataContext={data} onHandleSelectToken={onHandleSelectToken} tokens={tokenList}/> : null
                }
                </div>
            </div>
        </div>
    )

}