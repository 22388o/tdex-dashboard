import './list-markets.less';
import { MarketListEmpty } from '../../home/MarketListEmpty';
import { useListMarketsQuery } from '../operator.api';

import { MarketListItem } from './MarketListItem';

export const ListMarkets = (): JSX.Element => {
  const { data: listMarkets, error: listMarketsError } = useListMarketsQuery();

  return (
    <div id="list-markets">
      {listMarkets?.marketsList.length ? (
        listMarkets?.marketsList.map((marketInfo, index) => (
          <MarketListItem marketInfo={marketInfo} key={index} />
        ))
      ) : (
        <MarketListEmpty />
      )}
      {listMarketsError && <p>{listMarketsError}</p>}
    </div>
  );
};
