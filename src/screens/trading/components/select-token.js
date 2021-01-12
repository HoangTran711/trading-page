import React from 'react'
import './select-token.css'
import { MyContext } from 'Context/MyContext'
import { Icon,IconButton  , getTheme,PersonaPresence, mergeStyleSets, getFocusStyle,Persona, FocusZoneDirection,  FocusZone, List } from '@fluentui/react'

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
const onRenderCell = (item, index, isScrolling) => {
    
    const tokensPersona = {
        imageUrl: item?.Icon,
        imageInitials: item?.Name[0] + item?.Name[1],
        text: item?.Name,
        secondaryText: item?.PSymbol || item?.Symbol,
      };
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <Persona {...tokensPersona} presence={item.Verified ? PersonaPresence.online : PersonaPresence.offline} imageAlt="Image" />
      </div>
    );
  }
const ListTokens = ({tokens}) => {
    
    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <div className={classNames.container} data-is-scrollable>
          <List items={tokens} onRenderCell={onRenderCell} />
        </div>
      </FocusZone>
    );
};
  
export const SelectToken = () => {
    const data = React.useContext(MyContext)
    console.log(data.tokens)
    return (
        <div className="select-token">
            <div className="overlay"/>
            <div className="select-token-panel">
                <div className="heading-primary">
                    <h3>Select Token</h3>
                    <IconButton iconProps={{ iconName: 'ChromeClose' }} title="Close" ariaLabel="Close" />
                </div>
                <div className="input-token">
                    <input type="text" placeholder="Search name or paste address"/>
                </div>
                {
                    data.fetchTokensSuccess ? <ListTokens tokens={data.tokens}/> : null
                }
            </div>
        </div>
    )

}