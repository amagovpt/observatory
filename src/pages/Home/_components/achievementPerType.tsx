import { useTranslation } from 'react-i18next';
import { Icon } from 'ama-design-system';
import { BadgeSummary, DeclarationSummary, ComplianceStatus, BadgesCount } from '@/types';

export type MetricItem = ComplianceStatus | BadgesCount;

interface MetricConfig {
  title: string;
  icon: string;
  translationType: 'declaration' | 'badge';
  getKeys: (metrics: MetricItem) => { good: number; semi: number; bad: number };
  colors: { good: string; semi: string; bad: string };
  colorTitles: { good: string; semi: string; bad: string };
}

interface AchievementPerTypeProps {
  data: DeclarationSummary | BadgeSummary;
  config: MetricConfig;
}

export function AchievementPerType({ data, config }: AchievementPerTypeProps) {
  const { t } = useTranslation();
  const { websites, apps } = data.total;

  const webValues = config.getKeys(websites);
  const appValues = config.getKeys(apps);

  const valueGood = webValues.good + appValues.good;
  const valueSemi = webValues.semi + appValues.semi;
  const valueBad = webValues.bad + appValues.bad;
  const total = valueGood + valueSemi + valueBad;

  const calcPercentage = (val: number) => (total > 0 ? (val * 100) / total : 0);

  const renderBarRow = (
    marginBottom: string, 
    quantity: number, 
    barColor: string, 
    rowTitle: string
  ) => (
    <div className={`d-flex ${marginBottom} w-100 row_st_dc align-items-center`}>
      <p className="d-flex w-50">
        <span className="ama-typography-display-6 bold quantity">{quantity}</span>
        <span className={`d-flex ps-2 ${barColor} conform_container ama-typography-body bold align-items-center`}>
          {rowTitle}
        </span>
      </p>
      <progress className={`bar ${barColor}`} value={calcPercentage(quantity)} max={100} />
    </div>
  );

  return (
    <div className="d-flex group_container p-5 mb-5 mt-4">
      <p className="d-flex flex-column first_column">
        <span className="ama-typography-body-larger bold mb-3">{config.title}</span>
        <span className="d-flex flex-row align-items-center ama-typography-display-1">
          {total}
          <Icon name={config.icon} />
        </span>
      </p>
      <div className="d-flex flex-column second_column">
        <div className="ama-typography-body mb-3 align-self-end">
          {t(`NUMBERS.${config.translationType}.percentTitle`)}
        </div>
        {renderBarRow('mb-5', valueGood, config.colors.good, config.colorTitles.good)}
        {renderBarRow('mb-5', valueSemi, config.colors.semi, config.colorTitles.semi)}
        {renderBarRow('', valueBad, config.colors.bad, config.colorTitles.bad)}
      </div>
    </div>
  );
}