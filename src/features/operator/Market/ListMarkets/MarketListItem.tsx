import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import type { MarketInfo } from '../../../../api-spec/generated/js/operator_pb';
import checkmark from '../../../../assets/images/checkmark.svg';
import { CurrencyIcon } from '../../../../common/CurrencyIcon';
import { MARKET_OVERVIEW_ROUTE } from '../../../../routes/constants';
import { useGetAssetDataQuery } from '../../../liquid.api';

interface MarketListItemProps {
  marketInfo: MarketInfo.AsObject;
}

export const MarketListItem = ({ marketInfo }: MarketListItemProps): JSX.Element => {
  const navigate = useNavigate();
  const { tradable } = marketInfo;
  const { data: baseAssetFromQuery, error: baseAssetError } = useGetAssetDataQuery(
    marketInfo.market?.baseAsset || ''
  );
  const { data: quoteAssetFromQuery, error: quoteAssetError } = useGetAssetDataQuery(
    marketInfo.market?.quoteAsset || ''
  );
  // Last resort if GetAssetData fails
  const baseAsset = baseAssetError
    ? {
        asset_id: marketInfo.market?.baseAsset,
        ticker: marketInfo.market?.baseAsset?.substring(0, 4).toUpperCase(),
      }
    : baseAssetFromQuery;
  const quoteAsset = quoteAssetError
    ? {
        asset_id: marketInfo.market?.quoteAsset,
        ticker: marketInfo.market?.quoteAsset?.substring(0, 4).toUpperCase(),
      }
    : quoteAssetFromQuery;

  const handleClickMarketDetails = () => {
    navigate(MARKET_OVERVIEW_ROUTE, { state: { baseAsset, quoteAsset } });
  };

  return (
    <div className="w-100 mb-2 market-list-item" onClick={handleClickMarketDetails}>
      <Row className="w-100">
        <Col span={4}>
          <div className="icons">
            <CurrencyIcon className="base-icon" currency={baseAsset?.ticker || ''} size={32} />
            <CurrencyIcon className="quote-icon" currency={quoteAsset?.ticker || ''} size={32} />
          </div>
        </Col>
        <Col span={12}>
          <span className="tickers">{`${baseAsset?.ticker} / ${quoteAsset?.ticker} Markets`}</span>
        </Col>
        <Col span={8}>
          <span className="">
            {tradable ? (
              <span className="status__open">
                <span className="mr-1">Open</span>
                <img className="checkmark" src={checkmark} alt="checkmark" />
              </span>
            ) : (
              <span className="status__close">Close</span>
            )}
          </span>
        </Col>
      </Row>
    </div>
  );
};